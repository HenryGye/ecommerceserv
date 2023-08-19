import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  events = [
    'DATOS PERSONALES',
    'COBERTURA',
    'BIOMETRÍA FACIAL',
    'INSTALACIÓN'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
