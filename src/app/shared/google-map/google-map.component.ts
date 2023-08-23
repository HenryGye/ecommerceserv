import { Component, OnInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  zoom = 12;
  center: google.maps.LatLngLiteral = {
    lat: -2.1480791,
    lng: -79.9080458
  };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  marker: any = {
    position: {
      lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
      lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
    }
  };

  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  // ngOnInit(): void {
  //   this.initMap();
  // }

  // initMap(): void {
  //   const map = new google.maps.Map(document.getElementById('map'), {
  //     center: { lat: -2.1480791, lng: -79.9080458 },
  //     zoom: 8
  //   });
  // }
}
