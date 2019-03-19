import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  selectMap: any = "Hi there";

  mapList: any[] = ['Albania', 'Amsterdam', 'Panama'];

  constructor(private mapService: MapService) { }

  maploader(selectedVal: any) {
    this.selectMap = selectedVal;
    switch (this.selectMap) {
      case 'Albania':
        {
          var latlng = { 'lat': 41.1185, 'lng': 20.214 }
          var zoomLevel = 6;
          this.initMap(latlng, zoomLevel);
          console.log("Amsterdam:: ", this.selectMap)
        } break;
      case 'Amsterdam':
        {
          var latlng = { 'lat': 52.354775, 'lng': 4.7585389 }
          var zoomLevel = 10;
          this.initMap(latlng, zoomLevel);
          console.log("Amsterdam:: ", this.selectMap)
        } break;
      case 'Panama':
        {
          var latlng = { 'lat': 8.4961532, 'lng': -82.3504484 }
          var zoomLevel = 8;
          this.initMap(latlng, zoomLevel);
          console.log("Amsterdam:: ", this.selectMap)
        } break;
      default:
        {
          var latlng = { 'lat': 28.591757, 'lng': 77.211914 }
          var zoomLevel = 15;
          this.initMap(latlng, zoomLevel);
          console.log("Default:: ", this.selectMap)
        } break;
    }
    console.log(this.selectMap)
  }
  ngOnInit() {
    this.maploader('default')
    // debugger;
  }
  // ngOnChanges() {
  //   this.initMap()
  //   // console.log(this.selectMap)
  // }

  initMap(coord: any, zoom: any) {
    this.mapService.googleReady()
      .subscribe(
        null,
        err => console.log(err),
        () => {

          //var myLatlng = new google.maps.LatLng(28.591757, 77.211914);
          var myLatlng = new google.maps.LatLng(coord.lat, coord.lng);
          const mapOptions = {
            zoom: zoom,
            center: myLatlng,
            scrollwheel: false
          };
          try {
            this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          }
          catch (E) {
            this.map = null;
            console.log('Reload')
          }

          this.map.addListener('click', function (e) {
            console.log("Latlng: " + e.latLng);
            var marker = new google.maps.Marker({
              position: e.latLng,
              map: this.map
            });
            console.log(marker)
            marker.setMap(this.map)
          });

          let markerElement = new google.maps.Marker({
            position: myLatlng,
            map: this.map,
            title: 'Sample Marker',
          })
          let infowindow = new google.maps.InfoWindow({
            content: '<div id="content">Sample Popup</div>'
          })
          markerElement.setMap(this.map);
          markerElement.addListener('mouseover', function () {
            infowindow.open(this.map, markerElement);
          });
          markerElement.addListener('mouseout', function () {
            infowindow.close(this.map, markerElement);
          });

          // //setting up layer
          // var trafficLayer = new google.maps.TrafficLayer();
          // trafficLayer.setMap(this.map);

          //To add simple polygon in map
          // Add Coordinates of polygon in an array
          // var triangleCoords = [
          //   { lat: 27.076246, lng: 86.066895 },
          //   { lat: 28.919227, lng: 82.22168 },
          //   { lat: 25.559787, lng: 81.97998 }
          // ];
          // var Triangle = new google.maps.Polygon({
          //   paths: triangleCoords,
          //   strokeColor: '#FF0000',
          //   strokeOpacity: 0.8,
          //   strokeWeight: 2,
          //   fillColor: '#FF0000',
          //   fillOpacity: 0.35,
          //   editable: false
          // });
          // Triangle.setMap(this.map);

          // var drawingManager = new google.maps.drawing.DrawingManager({
          //   drawingMode: google.maps.drawing.OverlayType.MARKER,
          //   drawingControl: true,
          //   drawingControlOptions: {
          //     position: google.maps.ControlPosition.TOP_CENTER,
          //     drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
          //   },
          //   // markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
          //   circleOptions: {
          //     fillColor: '#f19dc98f',
          //     fillOpacity: 1,
          //     strokeWeight: 2,
          //     clickable: true,
          //     editable: true,
          //     zIndex: 1
          //   }
          // });
          // drawingManager.setMap(this.map);
        }
      );
  }



}

