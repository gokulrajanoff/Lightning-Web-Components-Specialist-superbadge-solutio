public with sharing class ContactController {
    public ContactController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        throw new AuraHandledException('Forced error');
          
        } 
    
}