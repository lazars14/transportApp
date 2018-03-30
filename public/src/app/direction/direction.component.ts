import { GoogleMapsAPIWrapper } from '@agm/core';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit {

  // @Input() origin;
  // @Input() destination;
  @Input() waypoints;
  @Input() markersCount;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
  }

  drawDirection(origin, destination) {
    this.gmapsApi.getNativeMap().then(map => {
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: {
          lat: origin.lat,
          lng: origin.lng
        },
        destination: {
          lat: destination.lat,
          lng: destination.lng
        },
        waypoints: this.waypoints, // [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          this.markersCount = 2;
        } else {
          this.markersCount = 0;
          window.alert('Bad Direction Request');
        }
      });

    });
  }

  removeDirection() {
    console.log('should remove it');
    // this.directionsDisplay.setPanel(null);
    // this.directionsDisplay.setMap(null);
    // this.directionsDisplay = undefined;
  }

}
