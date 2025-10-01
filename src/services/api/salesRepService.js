import salesRepsData from "@/services/mockData/salesReps.json";

const STORAGE_KEY = "nexus_crm_sales_reps";

const loadSalesReps = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(salesRepsData));
  return salesRepsData;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const salesRepService = {
  async getAll() {
    await delay(200);
    return [...loadSalesReps()];
  },

  async getById(id) {
    await delay(150);
    const salesReps = loadSalesReps();
    const salesRep = salesReps.find(sr => sr.Id === parseInt(id));
    return salesRep ? { ...salesRep } : null;
  }
};