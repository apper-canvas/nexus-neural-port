import { cn } from "@/utils/cn";

const Card = ({ className, children, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        "bg-surface rounded-lg border border-slate-200 shadow-sm",
        hover && "hover:shadow-md transition-shadow duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;