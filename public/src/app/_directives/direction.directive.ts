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

  directionsService: any;
  directionsDisplay: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.gmapsApi.getNativeMap().then(map => {
      this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.drawDirection([]);
    });
  }

  drawDirection(waypoints) {
    this.gmapsApi.getNativeMap().then(map => {
      this.directionsDisplay.setMap(map);
      this.directionsService.route({
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
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Bad Direction Request');
        }
      });

    });
  }

  calculateBestRoute(waypoints) {
    let shortestRoute;
    let shortestDuration;
    let removedWaypoint;
    let requestToRemove = [];

    const promise = new Promise((resolve, reject) => {
      for (let i = 0, p = Promise.resolve({}); i < waypoints.length; i++) {
        p = p.then(() => new Promise(async res => {
          console.log('waypoints ', waypoints);
          const waypointsDeep = waypoints.map(x => Object.assign({}, x));

          removedWaypoint = {
            location: waypointsDeep[i]
          };

          waypointsDeep.splice(i, 1);

          console.log('this is i ', i);
          console.log('removed waypoints ', removedWaypoint);
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
            console.log('legs in setting min values ', data);
            requestToRemove = _.cloneDeep(removedWaypoint);
          }

          if (i === waypoints.length - 1) {
            resolve({requestToRemove: requestToRemove, waypoints: waypoints});
          }

          res();
        }));

      }

    });

    promise.then(async (data) => {
      console.log('gonna emit');
      // all this from
      const route = await this.calculateRoute(data['waypoints']);
      const routeDistance = await this.calculateRouteDistance(route);
      const routeDuration = await this.calculateRouteTime(route);
      console.log('legs in data in direction ', data);
      this.calculate.emit({
        distance: routeDistance,
        duration: routeDuration,
        waypoints: data['waypoints'],
        requestToRemove: data['requestToRemove'],
        legs: route
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
