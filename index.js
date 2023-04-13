const contactsOperations = require("./contacts");
const {program} = require("commander");

async function invokeAction({action, id, name, email, phone}) {
    switch (action) {
        case "list":
            const allContacts = await contactsOperations.listContacts();
            console.table(allContacts);
            break;

        case "get":
            const someContact = await contactsOperations.getContactById(id);
            console.table(someContact);
            break;

        case "add":
            const newContact = await contactsOperations.addContact(name, email, phone);
            console.table(newContact);
            break;

        case "remove":
            const deletedContact = await contactsOperations.removeContact(id);
            console.table(deletedContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

program
    .option('-a, --action <type>', 'contact operation')
    .option('-i, --id <type>', 'contact id')
    .option('-n, --name <type>', 'contact name')
    .option('-em, --email <type>', 'contact email')
    .option('-ph, --phone <type>', 'contact phone');

program.parse();
const options = program.opts();

invokeAction(options);
