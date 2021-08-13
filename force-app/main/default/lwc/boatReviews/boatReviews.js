import { LightningElement } from 'lwc';

// imports
export default class BoatReviews extends LightningElement {
    // Private
    boatId;
    error;
    boatReviews;
    isLoading;
    
    // Getter and Setter to allow for logic to run on recordId change
    get recordId() { }
    set recordId(value) {
      //sets boatId attribute
      //sets boatId assignment
      //get reviews associated with boatId
    }
    
    // Getter to determine if there are reviews to display
    get reviewsToShow() { }
    
    // Public method to force a refresh of the reviews invoking getReviews
    refresh() { }
    
    // Imperative Apex call to get reviews for given boat
    // returns immediately if boatId is empty or null
    // sets isLoading to true during the process and false when it’s completed
    // Gets all the boatReviews from the result, checking for errors.
    getReviews() { }
    
    // Helper method to use NavigationMixin to navigate to a given record on click
    navigateToRecord(event) {  }
  }
  