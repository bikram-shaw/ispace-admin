import { Component, OnInit,EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Loader } from "@googlemaps/js-api-loader"
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
declare var google;
@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  title: string;
  lat:any;
  lng:any;
  map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;
  loader:any;
  marker:any;
  public event: EventEmitter<any> = new EventEmitter();
  mylatlng=[];

  constructor(public bsModalRef: BsModalRef) {
    this.loader = new Loader({
      apiKey: "AIzaSyCbePvwMcshaIdxGC_df-UgLJbldXvkxHE",
      version: "weekly",

    });

  }
   initMap(): void {
    this.loader.load().then(() => {

      if(this.lat==null && this.lng==null)
      {
        //if user does't enter any location then open user's device location
        this.showCurrentLocation();
      }
      else
      {
        this.showUsersInputLocation();
      }

    });


     // Place a draggable marker on the map

  }


  ngOnInit() {
   this.initMap();
  }

 async setLocation()
 {
  const result = await this.getReverseGeocodingData(this.marker.getPosition().lat(),this.marker.getPosition().lng());

   this.mylatlng.push({lat:this.marker.getPosition().lat(),lng:this.marker.getPosition().lng(),add:result})
   this.event.emit(this.mylatlng);
   this.bsModalRef.hide();
 }

 showCurrentLocation()
 {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position) => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 10,
      });
      this.marker = new google.maps.Marker({
        position: { lat: position.coords.latitude, lng: position.coords.longitude },
        map: this.map,
        draggable:true,
        title:"Drag me!"
      });

    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
 }

 showUsersInputLocation()
 {

  this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: this.lat, lng: this.lng },
    zoom: 10,
  });
  this.marker = new google.maps.Marker({
    position: { lat: this.lat, lng: this.lng },
    map: this.map,
    draggable:true,
    title:"Drag me!"
  });
 }

  getReverseGeocodingData(lat, lng) {
    return new Promise(resolve=>
      {
        var latlng = new google.maps.LatLng(lat, lng);
        // This is making the Geocode request
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, (results, status) =>{
            if (status !== google.maps.GeocoderStatus.OK) {
                alert(status);
                return resolve("error");
            }
            // This is checking to see if the Geoeode Status is OK before proceeding
          else if (status == google.maps.GeocoderStatus.OK) {

               const address= results[2].formatted_address;
               resolve(address);

            }
            else
            return resolve("error");;
          }
        );
      });

}


}
