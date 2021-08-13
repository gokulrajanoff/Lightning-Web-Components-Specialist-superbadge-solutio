import { LightningElement } from 'lwc';

// imports
// import getBoatTypes from the BoatDataService => getBoatTypes method';
export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    
    // Private
    error = undefined;
    
    searchOptions;
    
    // Wire a custom Apex method
      boatTypes({ error, data }) {
      if (data) {
        this.searchOptions = data.map(type => {
          // TODO: complete the logic
        });
        this.searchOptions.unshift({ label: 'All Types', value: '' });
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
      }
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
      // Create the const searchEvent
      // searchEvent must be the new custom event search
      searchEvent;
      this.dispatchEvent(searchEvent);
    }
  }
  