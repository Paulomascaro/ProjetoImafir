import { Component, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import * as L from 'leaflet';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {
  @Input() showOutorgas: boolean = true;
  @Input() showPivos: boolean = true;
  @Input() showPropriedades: boolean = true;

  map!: L.Map;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initializeMap();
    // Não chame readAndAddMarkersFromXLSX() aqui, pois ela será chamada quando houver uma mudança nos filtros
  }

  ngAfterViewInit() {
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  private initializeMap() {
    const primaveraDoLesteCoords: L.LatLngTuple = [-15.5441, -54.2817];
  
    this.map = L.map('map').setView(primaveraDoLesteCoords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  // Adicione a lógica para ler e adicionar marcadores com base nos filtros
  public readAndAddMarkersFromXLSX(xlData: any[]) {
    if (this.map) {
      // Limpar marcadores existentes
      this.clearMarkers();

      xlData.forEach(data => {
        const latitude = parseFloat(data.Latitude);
        const longitude = parseFloat(data.Longitude);

        // Adicionar marcadores de acordo com as configurações dos checkboxes
        if (this.showOutorgas && data.Type === 'Outorga') {
          this.addMarker([latitude, longitude], data.Description);
        }

        if (this.showPivos && data.Type === 'Pivo') {
          this.addMarker([latitude, longitude], data.Description);
        }

        if (this.showPropriedades && data.Type === 'Propriedade') {
          this.addMarker([latitude, longitude], data.Description);
        }
      });
    }
  }

  private addMarker(coords: L.LatLngTuple, description: string) {
    L.marker(coords).addTo(this.map).bindPopup(description);
  }

  private clearMarkers() {
    this.map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });
  }
}