import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/molecules/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const LeadTable = ({ leads, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const modifier = sortDirection === "asc" ? 1 : -1;
    
    if (typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal) * modifier;
    }
    return (aVal > bVal ? 1 : -1) * modifier;
  });

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "qualified":
        return "success";
      case "contacted":
        return "info";
      case "lost":
        return "error";
      default:
        return "default";
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-surface rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center space-x-1 text-xs font-semibold text-slate-600 uppercase hover:text-slate-800"
                >
                  <span>Lead</span>
                  <ApperIcon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("company")}
                  className="flex items-center space-x-1 text-xs font-semibold text-slate-600 uppercase hover:text-slate-800"
                >
                  <span>Company</span>
                  <ApperIcon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Contact
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center space-x-1 text-xs font-semibold text-slate-600 uppercase hover:text-slate-800"
                >
                  <span>Status</span>
                  <ApperIcon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("value")}
                  className="flex items-center space-x-1 text-xs font-semibold text-slate-600 uppercase hover:text-slate-800"
                >
                  <span>Value</span>
                  <ApperIcon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Source
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sortedLeads.map((lead, index) => (
              <motion.tr
                key={lead.Id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Avatar name={lead.name} size="md" />
                    <span className="text-sm font-medium text-slate-800">{lead.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">{lead.company}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">
                    <div>{lead.email}</div>
                    <div className="text-xs text-slate-500">{lead.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={getStatusBadgeVariant(lead.status)}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-800">
                    {formatCurrency(lead.value)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">{lead.source}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(lead)}
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(lead.Id)}
                    >
                      <ApperIcon name="Trash2" size={16} className="text-error" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;