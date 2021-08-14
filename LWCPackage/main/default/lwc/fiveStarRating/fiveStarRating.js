//import fivestar static resource, call it fivestar
import { LightningElement, api, wire } from 'lwc';
import fivestar from '@salesforce/resourceUrl/fivestar';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// add constants here
const ERROR_TITLE  = "Error loading five-star";
const ERROR_VARIANT  = "error";
const EDITABLE_CLASS  = 'c-rating';
const READ_ONLY_CLASS   = 'readonly c-rating';
export default class FiveStarRating extends LightningElement {
  //initialize public readOnly and value properties
  @api readOnly="";
  @api value="";

  editedValue;
  isRendered;

  //getter function that returns the correct class depending on if it is readonly
  get starClass() {
    return this.readOnly?READ_ONLY_CLASS:EDITABLE_CLASS;
  }

  // Render callback to load the script once the component renders.
  renderedCallback() {
    if (this.isRendered) {
      return;
    }
    this.loadScript();
    this.isRendered = true;
  }

  //Method to load the 3rd party script and initialize the rating.
  //call the initializeRating function after scripts are loaded
  //display a toast with error message if there is an error loading script
  loadScript() {
    Promise.all([
      loadScript(this, fivestar + '/rating.js'),
      loadStyle(this, fivestar + '/rating.css')
  ])
      .then(() => {
          this.initializeRating();
      })
      .catch(error => {
          this.dispatchEvent(
              new ShowToastEvent({
                  title: ERROR_TITLE,
                  message: error.message,
                  variant: ERROR_VARIANT
              })
          );
      });
  }

  initializeRating() {
    let domEl = this.template.querySelector('ul');
    let maxRating = 5;
    let self = this;
    let callback = function (rating) {
      self.editedValue = rating;
      self.ratingChanged(rating);
    };
    this.ratingObj = window.rating(
      domEl,
      this.value,
      maxRating,
      callback,
      this.readOnly
    );
  }

  // Method to fire event called ratingchange with the following parameter:
  // {detail: { rating: CURRENT_RATING }}); when the user selects a rating
  ratingChanged(rating) {
    const searchEvent = new CustomEvent('ratingchange', { detail: {
      rating : rating
    } });
    this.dispatchEvent(searchEvent);
  }
}