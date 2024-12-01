import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from '@maplibre/ngx-maplibre-gl';
import { Map, Marker, NavigationControl, Popup } from 'maplibre-gl';
import { catchError, delay, EMPTY, of, tap } from 'rxjs';
import { EventService } from 'src/service/event.service';
import { SharedService } from 'src/service/shared.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private eventsService: EventService,private router:Router, private sharedService: SharedService) { }

  public lat;
  public lng;
  public location:[number, number]


  public ngOnInit(): void {
    this.eventsService.getAllEvents();
    this.getLocation();
  }

  setMap(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=hWjEpZIhCmn8lWkNdta3`,
      center: [this.lng, this.lat],
      zoom: 14
    });

    new Marker({color: "#AF47D2"})
      .setLngLat([this.lng,this.lat])
      .addTo(this.map);
  }

  success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  };
  
  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  getLocation() {
    if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.location = [position.coords.longitude, position.coords.latitude];
            
            this.setMap(); 
            this.getEventsLocations();
          }
        },
        (error) => {
          console.log(error);
        },
        options
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  getEventsLocations(){

   this.eventsService.getAllEventsReq().pipe(
      delay(0),
      tap(() => this.sharedService.isLoading(true)),
      catchError(err => {
        if(err.status !== 200){
          return EMPTY
        }
        else{
          return of(err);
        }
        
      })
    ).subscribe((res:any )=>{
      res.forEach(event => {
          event.image ='data:image/webp;base64, '+event.image;
     });
     res.forEach(x => {
      if (x.latitude && x.longitude) {
        const marker = new Marker({ color: "#2B437F" })
          .setLngLat([+x.longitude, +x.latitude])
          .setPopup(new Popup().setHTML(`<p><a href="/event-details/${x.id}" class="event-link" data-id="${x.id}">${x.header}</a></p>`))
          .addTo(this.map);
      }
    })
      this.sharedService.isLoading(false)
      })
  }

  ngOnDestroy() {
    this.map?.remove();
  }

}