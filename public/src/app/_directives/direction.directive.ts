import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, OnInit, Output, EventEmitter } from '@angular/core';
declare var google: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'direction'
})
export class DirectionDirective implements OnInit {

  @Input() origin;
  @Input() destination;
  @Input() waypoints;
  @Output() calculate = new EventEmitter<Array<Object>>();

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
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Bad Direction Request');
        }
      });

    });
  }

  calculateBestRoute(waypoints) {
    // const waypointsDeep = this.waypoints.map(x => Object.assign({}, x));
    let shortestRoute;
    let shortestWaypoints = [];

    for (let index = 0; index < waypoints.length; index++) {
      const waypointsDeep = this.waypoints.map(x => Object.assign({}, x));
      // 2 after index, because as stopover we have the request startLocation and endLocation
      waypointsDeep.splice(index, 2);

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
          waypoints: waypointsDeep,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
          // for not losing scope (response, status) => ; if it was function (response, status) this object wouldn't be visible
        }, (response, status) => {
          if (status === 'OK') {
            const routeDistance = this.calculateRouteDistance(response);
            if (routeDistance < shortestRoute) {
              shortestRoute = routeDistance;
              shortestWaypoints = waypointsDeep;
            }
          } else {
            window.alert('Bad Direction Request');
          }
        });
      });
    }

    this.calculate.emit([shortestRoute, shortestWaypoints]);
  }

  calculateRouteDistance(response) {
    let total = 0;
    const myroute = response.routes[0];
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    // total / 1000 because it is in meters and I need it in km's
    return total / 1000;
  }

}
