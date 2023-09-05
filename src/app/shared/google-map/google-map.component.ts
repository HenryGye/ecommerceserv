import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

declare const google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  zoom = 16;

  center: google.maps.LatLngLiteral = {
    lat: -2.1480791,
    lng: -79.9080458
  };
  
  marker: any = new google.maps.Marker({
    position: this.center,
    map: null,
  });

  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 16,
    minZoom: 8,
  };

  constructor(private sharedService: SharedService) {
    this.sharedService.getDireccion().subscribe((direccion) => {
      if (direccion) {
        this.searchAddress(direccion);
      }
    });
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  searchAddress(direccion: string) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: direccion }, (results: any, status: any) => {
      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        this.center = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        this.marker.setPosition(this.center);
        this.marker.map = this.options;
        this.sharedService.setResultadoDireccion(this.center);

        console.log('result map ', results);
        console.log(this.center);
      } else {
        this.sharedService.setResultadoDireccion(-1);
        console.error('No se pudo encontrar la dirección.');
      }
    });
  }
}
