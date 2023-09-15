import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit, OnDestroy {
  private direccionSubscription = new Subscription;
  zoom = 16;
  center: google.maps.LatLngLiteral = { lat: -2.1480791, lng: -79.9080458 };
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 16,
    minZoom: 8,
  };
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    const latitud = localStorage.getItem('latitud');
    const longitud = localStorage.getItem('longitud');

    if (latitud && longitud) {
      this.center = {
        lat: +latitud,
        lng: +longitud,
      };
      this.markerPosition = this.center;
    } else {
     this.currentPosition(); 
    }

    this.direccionSubscription = this.sharedService.getDireccion().subscribe((direccion) => {
      if (direccion) this.searchAddress(direccion);
    });
  }

  ngOnDestroy(): void {
    this.direccionSubscription.unsubscribe();
  }

  currentPosition() {
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
        this.markerPosition = this.center;
        this.sharedService.setResultadoDireccion(this.center);
        localStorage.setItem('latitud', this.center.lat.toString());
        localStorage.setItem('longitud', this.center.lng.toString());
      } else {
        this.markerPosition = { lat: 0, lng: 0 };
        this.sharedService.setResultadoDireccion(-1);
        localStorage.removeItem('latitud');
        localStorage.removeItem('longitud');
        console.error('No se pudo encontrar la dirección.');
      }
    });
  }
}
