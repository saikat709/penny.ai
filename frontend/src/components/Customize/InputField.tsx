type Props = {
  label: string;
  value: string | string[];
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function InputField({ label, value, onChange, placeholder }: Props) {
  const stringValue = Array.isArray(value) ? value.join(', ') : (value ?? '');

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 dark:text-gray-300 mb-2">{label}</label>
      <input value={stringValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="p-3 rounded border w-full focus:ring-2 focus:ring-primary-400" />
    </div>
  );
}
