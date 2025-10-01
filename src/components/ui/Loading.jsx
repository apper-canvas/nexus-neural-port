import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full mx-auto mb-4"
        />
        <p className="text-sm text-secondary">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;