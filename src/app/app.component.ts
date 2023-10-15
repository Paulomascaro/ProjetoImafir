import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showOutorgas: boolean = true;
  showPivos: boolean = true;
  showPropriedades: boolean = true;

  readAndAddMarkers(event: any) {
    // Implemente a lógica necessária
  }
}


