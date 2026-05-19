type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
};

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
}: FormFieldProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1 px-4">
      <label htmlFor={name} className="text-sm text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
      />
      {error && (
        <span className="text-center text-[13px] text-red-500">{error}</span>
      )}
    </div>
  );
}
