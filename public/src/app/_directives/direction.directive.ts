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
      for (let i = 0, p = Promise.resolve({}); i < waypoints.length; i += 2) {
        p = p.then(() => new Promise(async res => {
          const waypointsDeep = this.waypoints.map(x => Object.assign({}, x));

          removedWaypoints = {
            startLocation: waypointsDeep[i],
            endLocation: waypointsDeep[i + 1]
          };

          // 2 after index, because as stopover we have the request startLocation and endLocation
          waypointsDeep.splice(i, 2);

          console.log('this is i ', i);
          console.log('removed waypoints ', removedWaypoints);
          console.log('waypoints deep ', waypointsDeep);

          // remove duplicates

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
            requestToRemove = _.cloneDeep(removedWaypoints);
          }

          if (i === waypoints.length - 2) {
            resolve(data);
          }

          res();
        }));

      }

      // resolve();

    });

    promise.then(() => {
      console.log('gonna emit');
      this.calculate.emit({
        distance: shortestRoute,
        duration: shortestDuration,
        waypoints: shortestWaypoints,
        requestToRemove: requestToRemove,
        legs: legs
      });
    });

  }

  // for (let i = 0; i < waypoints.length; i += 2) {
  //   const waypointsDeep = this.waypoints.map(x => Object.assign({}, x));

  //   removedWaypoints = {
  //     startLocation: waypointsDeep[i],
  //     endLocation: waypointsDeep[i + 1]
  //   };

  //   // 2 after index, because as stopover we have the request startLocation and endLocation
  //   waypointsDeep.splice(i, 2);

  //   for (let index = 0; index < waypointsDeep.length; index++) {
  //     setTimeout(() => {
  //       this.gmapsApi.getNativeMap().then(map => {
  //         const directionsService = new google.maps.DirectionsService;
  //         directionsService.route({
  //           origin: {
  //             lat: this.origin.lat,
  //             lng: this.origin.lng
  //           },
  //           destination: {
  //             lat: this.destination.lat,
  //             lng: this.destination.lng
  //           },
  //           waypoints: waypointsDeep,
  //           optimizeWaypoints: true,
  //           travelMode: 'DRIVING'
  //         }, (response, status) => {
  //           console.log('request status ', status);
  //           if (status === 'OK') {
  //             console.log('index is ', index);
  //             const routeDuration = this.calculateRouteTime(response);
  //             if (!shortestDuration) {
  //               shortestDuration += routeDuration + 2;
  //             }
  //             if (shortestDuration < routeDuration) {
  //               shortestRoute = this.calculateRouteDistance(response);
  //               shortestDuration = routeDuration;
  //               shortestWaypoints = waypointsDeep;
  //               legs = response.routes[0].legs;
  //               requestToRemove = requestToRemove.map(x => Object.assign({}, x));
  //             }
  //           } else {
  //             window.alert('Bad Direction Request');
  //           }
  //         });
  //       });
  //     }, 250);

  //   }

  // }

  // this.calculate.emit({
  //   distance: shortestRoute,
  //   duration: shortestDuration,
  //   waypoints: shortestWaypoints,
  //   requestToRemove: requestToRemove,
  //   legs: legs
  // });

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
