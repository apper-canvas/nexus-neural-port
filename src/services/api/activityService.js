import activitiesData from "@/services/mockData/activities.json";

const STORAGE_KEY = "nexus_crm_activities";

const loadActivities = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activitiesData));
  return activitiesData;
};

const saveActivities = (activities) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const activityService = {
  async getAll(limit = 20) {
    await delay(200);
    const activities = loadActivities();
    const sorted = [...activities].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    return sorted.slice(0, limit);
  },

  async getByEntityId(entityType, entityId, limit = 10) {
    await delay(200);
    const activities = loadActivities();
    const filtered = activities
      .filter(a => a.entityType === entityType && a.entityId === parseInt(entityId))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return filtered.slice(0, limit);
  },

  async create(activityData) {
    await delay(200);
    const activities = loadActivities();
    const maxId = activities.reduce((max, a) => Math.max(max, a.Id), 0);
    const newActivity = {
      ...activityData,
      Id: maxId + 1,
      timestamp: new Date().toISOString()
    };
    activities.push(newActivity);
    saveActivities(activities);
    return { ...newActivity };
  }
};