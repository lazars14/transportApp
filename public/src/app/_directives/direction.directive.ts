import {
  GoogleMapsAPIWrapper
} from '@agm/core';
import {
  Directive,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import * as _ from 'lodash';
declare var google: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'direction'
})
export class DirectionDirective implements OnInit {

  @Input() origin;
  @Input() destination;
  @Input() waypoints;
  @Output() calculate = new EventEmitter < Object > ();

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.drawDirection([]);
  }

  drawDirection(waypoints) {
    this.gmapsApi.getNativeMap().then(map => {
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: {
          lat: this.origin.lat,
          lng: this.origin.lng
        },
        destination: {
          lat: this.destination.lat,
          lng: this.destination.lng
        },
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
        // for not losing scope (response, status) => ; if it was function (response, status) this object wouldn't be visible
      }, (response, status) => {
        if (status === 'OK') {
          console.log(response);
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Bad Direction Request');
        }
      });

    });
  }

  calculateBestRoute(waypoints) {
    let shortestRoute;
    let shortestDuration;
    let shortestWaypoints = [];
    let removedWaypoints;
    let requestToRemove = [];
    let legs;

    const promise = new Promise((resolve, reject) => {
      for (let i = 0, p = Promise.resolve({}); i < waypoints.length; i++) {
        p = p.then(() => new Promise(async res => {
          console.log('waypoints ', waypoints);
          const waypointsDeep = waypoints.map(x => Object.assign({}, x));

          removedWaypoints = {
            location: waypointsDeep[i]
          };

          waypointsDeep.splice(i, 1);

          console.log('this is i ', i);
          console.log('removed waypoints ', removedWaypoints);
          console.log('waypoints deep ', waypointsDeep);

          const data = await this.calculateRoute(waypointsDeep);
          console.log('this is data ', data);

          const routeDuration = await this.calculateRouteTime(data);
          console.log('this is route duration ', routeDuration);
          console.log('this is shortest duration ', shortestDuration);
          if (i === 0 || routeDuration < shortestDuration) {
            console.log('setting min values ');
            shortestRoute = await this.calculateRouteDistance(data);
            console.log('this is the shortest distance ', shortestRoute);
            shortestDuration = routeDuration;
            shortestWaypoints = waypointsDeep;
            legs = data;
            console.log('legs in setting min values ', data);
            requestToRemove = _.cloneDeep(removedWaypoints);
          }

          if (i === waypoints.length - 1) {
            resolve();
          }

          res();
        }));

      }

    });

    promise.then(() => {
      console.log('gonna emit');
      console.log('legs in data in direction ', legs);
      this.calculate.emit({
        distance: shortestRoute,
        duration: shortestDuration,
        waypoints: shortestWaypoints,
        requestToRemove: requestToRemove,
        legs: legs
      });
    });

  }

  calculateRoute(waypoints: Array < Object > ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.gmapsApi.getNativeMap().then(map => {
          const directionsService = new google.maps.DirectionsService;
          directionsService.route({
            origin: {
              lat: this.origin.lat,
              lng: this.origin.lng
            },
            destination: {
              lat: this.destination.lat,
              lng: this.destination.lng
            },
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
          }, (response, status) => {
            console.log('request status ', status);
            if (status === 'OK') {
              resolve(response);
            } else {
              reject(status);
            }
          });
        });
      }, 250);

    });
  }

  calculateRouteDistance(response) {
    return new Promise((resolve, reject) => {
      if (!response) {
        reject('Response empty');
      }
      let total = 0;
      const myroute = response.routes[0];
      for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
      }
      // total / 1000 because it is in meters and I need it in km's
      resolve(total / 1000);
    });
  }

  calculateRouteTime(response) {
    return new Promise((resolve, reject) => {
      if (!response) {
        reject('Response empty');
      }
      let total = 0;
      const myroute = response.routes[0];
      for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].duration.value;
      }
      // total is in seconds
      resolve(total);
    });
  }

}
