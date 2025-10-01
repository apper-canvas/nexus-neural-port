import mockLeads from "@/services/mockData/leads.json";

let leads = [...mockLeads];
let nextId = Math.max(...leads.map(l => l.Id), 0) + 1;

export const leadService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...leads];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const lead = leads.find(l => l.Id === parseInt(id));
    if (!lead) {
      throw new Error("Lead not found");
    }
    return { ...lead };
  },

  create: async (leadData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newLead = {
      ...leadData,
      Id: nextId++
    };
    leads.push(newLead);
    return { ...newLead };
  },

  update: async (id, leadData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = leads.findIndex(l => l.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Lead not found");
    }
    leads[index] = { ...leads[index], ...leadData, Id: parseInt(id) };
    return { ...leads[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = leads.findIndex(l => l.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Lead not found");
    }
    leads.splice(index, 1);
    return true;
  }
};