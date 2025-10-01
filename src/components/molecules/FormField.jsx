import Input from "@/components/atoms/Input";

const FormField = ({ label, error, required, ...props }) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <Input {...props} />
      {error && (
        <p className="text-xs text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;