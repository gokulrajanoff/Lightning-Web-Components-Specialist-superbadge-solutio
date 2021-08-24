public with sharing class ContactController {
    public ContactController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        //return [select FirstName, LastName, Email from Contact]; // uncomment for the previous modules
        throw new AuraHandledException('Forced error');
    }
}