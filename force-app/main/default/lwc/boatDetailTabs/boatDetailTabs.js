import { LightningElement,api,wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import {
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext
} from 'lightning/messageService';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';

// Custom Labels Imports
// import labelDetails for Details
import labelDetails from '@salesforce/label/c.Details';
// import labelReviews for Reviews
import labelReviews from '@salesforce/label/c.Reviews';
// import labelAddReview for Add_Review
import labelAddReview from '@salesforce/label/c.Add_Review';
// import labelFullDetails for Full_Details
import labelFullDetails from '@salesforce/label/c.Full_Details';
// import labelPleaseSelectABoat for Please_select_a_boat
import labelPleaseSelectABoat from '@salesforce/label/c.Please_select_a_boat';

// Boat__c Schema Imports
import BOAT_OBJECT from '@salesforce/schema/Boat__c';

// import BOAT_ID_FIELD for the Boat Id
import BOAT_ID_FIELD from '@salesforce/schema/Boat__c.Id';
// import BOAT_NAME_FIELD for the boat Name
import BOAT_NAME_FIELD from '@salesforce/schema/Boat__c.Name';

import BOAT_TYPE from '@salesforce/schema/Boat__c.BoatType__c';
import BOAT_LENGTH from '@salesforce/schema/Boat__c.Length__c';
import BOAT_PRICE from '@salesforce/schema/Boat__c.Price__c';
import BOAT_DESCRIPTION from '@salesforce/schema/Boat__c.Description__c';
const BOAT_FIELDS = [BOAT_ID_FIELD, BOAT_NAME_FIELD];
export default class BoatDetailTabs extends NavigationMixin(LightningElement)  {
  boatId;

  boatType = BOAT_TYPE;
  boatLength = BOAT_LENGTH;
  boatPrice = BOAT_PRICE;
  boatDescription = BOAT_DESCRIPTION;
  @wire(getRecord, { recordId: '$boatId', fields: BOAT_FIELDS})
  wiredRecord;

  label = {
    labelDetails,
    labelReviews,
    labelAddReview,
    labelFullDetails,
    labelPleaseSelectABoat,
  };
  
  // Decide when to show or hide the icon
  // returns 'utility:anchor' or null
  get detailsTabIconName() { 
    if(this.wiredRecord.data){
      return "utility:anchor";
    }else{
      return null;
    }
  }
  
  @wire(MessageContext)
  messageContext;

  // Utilize getFieldValue to extract the boat name from the record wire
  get boatName() {
    return getFieldValue(this.wiredRecord.data, BOAT_NAME_FIELD);
   }
  
  // Private
  subscription = null;
  
  // Subscribe to the message channel
  subscribeMC() {
    // local boatId must receive the recordId from the message
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        BOATMC,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE }
    );
      return;
    }
  }

  handleMessage(message) {
    this.boatId = message.recordId;
}
  // Calls subscribeMC()
  connectedCallback() { 
    this.subscribeMC();
  }
  
  // Navigates to record page
  navigateToRecordViewPage() { 
    // View a custom object record.
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
          recordId: this.boatId,
          objectApiName: 'Boat__c', // objectApiName is optional
          actionName: 'view'
      }
  });
  }
  
  // Navigates back to the review list, and refreshes reviews component
  handleReviewCreated() {
    try{
    let tabset = this.template.querySelector('lightning-tabset');
    tabset.activeTabValue = 'reviews';
    this.template.querySelector('c-boat-reviews').refresh();
    }catch(error){
      console.log(error);
    }
    
   }
}