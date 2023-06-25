import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
//import '../../../../node_modules/leaflet/dist/leaflet.css';
import { CastleService } from 'src/app/services/castle.service';

const iconRetinaUrl = '../../assets/Images/Markers/marker-icon-2x.png';
const iconUrl = '../../assets/Images/Markers/marker-icon.png';
const shadowUrl = '../../assets/Images/Markers/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41] 
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss', "../../../../node_modules/leaflet/dist/leaflet.css"]
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private castleService: CastleService) { }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 50.777500, 11.431111 ],
      zoom: 6,
      worldCopyJump: true
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.castleService.getCastles().subscribe(castles => {
      castles.forEach(castle => {
        const marker = L.marker([castle.latitude, castle.longitude]).addTo(this.map);
        marker.bindPopup(castle.name);
      });
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}

