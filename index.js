// console.log(123456789);

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  contactsPath,
} = require("./contacts.js");
// console.log(listContacts());
// console.log(getContactById(5));
// console.log(removeContact(10));
// console.log(addContact("Mango", "mango@gmail.com", "322-22-22"));

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
