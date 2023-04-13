const fs = require('fs/promises');
const path = require('path');

const {nanoid} = require("nanoid");
const id = nanoid();

const contactsPath = path.join(__dirname, './db/contacts.json');
console.log(contactsPath);

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return (result);
}

async function getContactById(contactId) {
    const allContacts = await listContacts();
    const result = allContacts.find(item => item.id === contactId);
    return result ? result : null;
}

async function removeContact(contactId) {
    const allContacts = await listContacts();
    const contactIndex = allContacts.findIndex(contact => contact.id === contactId);
    const deletedContact = allContacts[contactIndex];
    if(contactIndex !== -1){
        allContacts.splice(contactIndex, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    }
    return deletedContact ? deletedContact : null;
}

async function addContact(name, email, phone) {
    const newContact = {id, name, email, phone};
    const allContacts = await listContacts();
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}