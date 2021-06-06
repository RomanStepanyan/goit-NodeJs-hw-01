const path = require("path");
const fs = require("fs");

const contactsPath = path.join("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const parsedData = JSON.parse(data);
    console.table(parsedData);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const contactFilteredById = JSON.parse(data).find(
      (data) => data.id.toString() === contactId
    );

    console.table(contactFilteredById);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const idFilteredData = JSON.parse(data).filter(
      (data) => data.id.toString() !== contactId
    );
    console.log(idFilteredData);

    fs.writeFile(contactsPath, JSON.stringify(idFilteredData), console.log);

    console.log(
      JSON.parse(data).find((data) => data.id.toString() === contactId).name,
      "was successfully deleted"
    );
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.log(error.message);
    }
    const contacts = JSON.parse(data);
    const shortid = require("shortid");
    const newContact = { id: shortid.generate(), name, email, phone };
    const contactsList = JSON.stringify([newContact, ...contacts], null, "\t");
    fs.writeFile(contactsPath, contactsList, (error) => {
      if (error) {
        return console.error(error);
      }
      console.log(newContact.name, "was successfully added");
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  contactsPath,
};
