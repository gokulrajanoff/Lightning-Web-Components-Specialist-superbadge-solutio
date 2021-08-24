import { LightningElement ,api, wire} from 'lwc';
import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// imports
const LABEL_YOU_ARE_HERE = 'You are here!';
const ICON_STANDARD_USER = 'standard:user';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';
export default class BoatsNearMe extends LightningElement {
  @api boatTypeId = '';
  mapMarkers = [];
  isLoading = true;
  isRendered;
  latitude;
  longitude;
  
  // Add the wired method from the Apex Class
  // Name it getBoatsByLocation, and use latitude, longitude and boatTypeId
  // Handle the result and calls createMapMarkers
  @wire(getBoatsByLocation,{ boatTypeId: '$boatTypeId',latitude: '$latitude',longitude: '$longitude' })
  wiredBoatsJSON({error, data}) { 
    if(data){
      this.createMapMarkers(data);
    }else{
      const evt = new ShowToastEvent({
        title: ERROR_TITLE,
        message: error,
        variant: ERROR_VARIANT,
      });
      this.dispatchEvent(evt);
      this.isLoading = false;
    }
  }
  
  // Controls the isRendered property
  // Calls getLocationFromBrowser()
  renderedCallback() {
    if(!this.isRendered){
    this.getLocationFromBrowser();
     this.isRendered = true;  
  }
   }
  
  // Gets the location from the Browser
  // position => {latitude and longitude}
  getLocationFromBrowser() { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
  
  // Creates the map markers
  createMapMarkers(boatData) {
    if(boatData){
      const newMarkers = JSON.parse(boatData).map(boat => {
        return {
          title:boat.Name,
          location: {
              Latitude: boat.Geolocation__Latitude__s,
              Longitude: boat.Geolocation__Longitude__s
          }
      }
      });
      newMarkers.unshift({
        title:LABEL_YOU_ARE_HERE,
        icon:ICON_STANDARD_USER,
        location: {
          Latitude: this.latitude,
          Longitude: this.longitude
      }
      });
      this.mapMarkers = newMarkers;
      this.isLoading = false;
   }
  }
}