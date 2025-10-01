import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const MetricCard = ({ icon, label, value, trend, trendUp, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 bg-gradient-to-br from-surface to-background hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
            <ApperIcon name={icon} className="text-white" size={24} />
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 text-sm font-medium ${trendUp ? "text-success" : "text-error"}`}>
              <ApperIcon name={trendUp ? "TrendingUp" : "TrendingDown"} size={16} />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <h3 className="text-3xl font-bold text-accent mb-1 bg-gradient-to-r from-accent to-amber-600 bg-clip-text text-transparent">
          {value}
        </h3>
        <p className="text-sm text-secondary font-medium">{label}</p>
      </Card>
    </motion.div>
  );
};

export default MetricCard;