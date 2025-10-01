import contactsData from "@/services/mockData/contacts.json";

const STORAGE_KEY = "nexus_crm_contacts";

const loadContacts = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contactsData));
  return contactsData;
};

const saveContacts = (contacts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const contactService = {
  async getAll() {
    await delay(300);
    return [...loadContacts()];
  },

  async getById(id) {
    await delay(200);
    const contacts = loadContacts();
    const contact = contacts.find(c => c.Id === parseInt(id));
    return contact ? { ...contact } : null;
  },

  async create(contactData) {
    await delay(300);
    const contacts = loadContacts();
    const maxId = contacts.reduce((max, c) => Math.max(max, c.Id), 0);
    const newContact = {
      ...contactData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    contacts.push(newContact);
    saveContacts(contacts);
    return { ...newContact };
  },

  async update(id, contactData) {
    await delay(300);
    const contacts = loadContacts();
    const index = contacts.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return null;
    
    contacts[index] = {
      ...contacts[index],
      ...contactData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    saveContacts(contacts);
    return { ...contacts[index] };
  },

  async delete(id) {
    await delay(300);
    const contacts = loadContacts();
    const filtered = contacts.filter(c => c.Id !== parseInt(id));
    saveContacts(filtered);
    return true;
  }
};