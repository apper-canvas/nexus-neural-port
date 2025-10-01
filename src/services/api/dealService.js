import dealsData from "@/services/mockData/deals.json";

const STORAGE_KEY = "nexus_crm_deals";

const loadDeals = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dealsData));
  return dealsData;
};

const saveDeals = (deals) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dealService = {
  async getAll() {
    await delay(300);
    return [...loadDeals()];
  },

  async getById(id) {
    await delay(200);
    const deals = loadDeals();
    const deal = deals.find(d => d.Id === parseInt(id));
    return deal ? { ...deal } : null;
  },

  async getByContactId(contactId) {
    await delay(200);
    const deals = loadDeals();
    return deals.filter(d => d.contactId === parseInt(contactId));
  },

async create(dealData) {
    await delay(300);
    const deals = loadDeals();
    const maxId = deals.reduce((max, d) => Math.max(max, d.Id), 0);
    const newDeal = {
      ...dealData,
      Id: maxId + 1,
      salesRepId: dealData.salesRepId ? parseInt(dealData.salesRepId) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    deals.push(newDeal);
    saveDeals(deals);
    return { ...newDeal };
  },

async update(id, dealData) {
    await delay(300);
    const deals = loadDeals();
    const index = deals.findIndex(d => d.Id === parseInt(id));
    if (index === -1) return null;
    
    deals[index] = {
      ...deals[index],
      ...dealData,
      Id: parseInt(id),
      salesRepId: dealData.salesRepId ? parseInt(dealData.salesRepId) : undefined,
      updatedAt: new Date().toISOString()
    };
    saveDeals(deals);
    return { ...deals[index] };
  },

  async delete(id) {
    await delay(300);
    const deals = loadDeals();
    const filtered = deals.filter(d => d.Id !== parseInt(id));
    saveDeals(filtered);
    return true;
  },

  async updateStage(id, stage) {
    await delay(250);
    const deals = loadDeals();
    const index = deals.findIndex(d => d.Id === parseInt(id));
    if (index === -1) return null;
    
    deals[index] = {
      ...deals[index],
      stage,
      updatedAt: new Date().toISOString()
    };
    saveDeals(deals);
    return { ...deals[index] };
  }
};