import { LightningElement } from 'lwc';

// imports
export default class BoatTile extends LightningElement {
    boat;
    selectedBoatId;
    
    // Getter for dynamically setting the background image for the picture
    get backgroundStyle() { }
    
    // Getter for dynamically setting the tile class based on whether the
    // current boat is selected
    get tileClass() { }
    
    // Fires event with the Id of the boat that has been selected.
    selectBoat() { }
  }
  