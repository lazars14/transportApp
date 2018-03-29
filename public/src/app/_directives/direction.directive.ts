import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, OnInit, OnChanges } from '@angular/core';
declare var google: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'direction'
})
export class DirectionDirective implements OnInit {

  @Input() origin;
  @Input() destination;
  @Input() waypoints;
  @Input() visible;
  @Input() drawing;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.drawDirection();
  }

  drawDirection() {
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
        waypoints: this.waypoints, // [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Bad Direction Request');
        }
      });

    });
  }

  removeDirection() {
    console.log();
    // this.directionsDisplay.setPanel(null);
    // this.directionsDisplay.setMap(null);
    // this.directionsDisplay = undefined;
  }

}
