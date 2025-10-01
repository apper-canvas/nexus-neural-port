import { useState, useEffect } from "react";
import LeadTable from "@/components/organisms/LeadTable";
import LeadModal from "@/components/organisms/LeadModal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { leadService } from "@/services/api/leadService";
import { activityService } from "@/services/api/activityService";
import { toast } from "react-toastify";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const loadLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await leadService.getAll();
      setLeads(data);
    } catch (err) {
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleCreate = () => {
    setSelectedLead(null);
    setModalOpen(true);
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const handleSave = async (leadData) => {
    try {
      if (selectedLead) {
        await leadService.update(selectedLead.Id, leadData);
        await activityService.create({
          type: "lead_updated",
          entityType: "lead",
          entityId: selectedLead.Id,
          description: `Lead ${leadData.name} updated`
        });
        toast.success("Lead updated successfully");
      } else {
        const newLead = await leadService.create(leadData);
        await activityService.create({
          type: "lead_created",
          entityType: "lead",
          entityId: newLead.Id,
          description: `Lead ${leadData.name} created`
        });
        toast.success("Lead created successfully");
      }
      loadLeads();
    } catch (err) {
      toast.error("Failed to save lead");
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    
    try {
      await leadService.delete(id);
      toast.success("Lead deleted successfully");
      loadLeads();
    } catch (err) {
      toast.error("Failed to delete lead");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadLeads} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leads</h1>
          <p className="text-sm text-secondary mt-1">
            Track and manage your sales leads
          </p>
        </div>
        <Button onClick={handleCreate}>
          <ApperIcon name="Plus" size={18} />
          <span>New Lead</span>
        </Button>
      </div>

      {leads.length === 0 ? (
        <Empty
          icon="UserCheck"
          title="No leads yet"
          message="Start building your pipeline by adding your first lead"
          actionLabel="Add Lead"
          onAction={handleCreate}
        />
      ) : (
        <LeadTable
          leads={leads}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lead={selectedLead}
        onSave={handleSave}
      />
    </div>
  );
};

export default Leads;