import { LightningElement,wire } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';
const COLUMNS = [
    { label: 'FirstName', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'LastName', fieldName: LASTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'Email' }
];
export default class ContactList extends LightningElement {
    columns = COLUMNS;
    @wire(getContacts)
    contacts;

    get errors(){
        console.log(this.contacts.error);
        return (this.contacts.error) ? reduceErrors(this.contacts.error) : [];
    }
}