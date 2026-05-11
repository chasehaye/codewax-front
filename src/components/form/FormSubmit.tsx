type FormSubmitProps = {
  label: string;
  loading?: boolean;
  error?: string;
};

export default function FormSubmit({
  label,
  loading = false,
  error,
}: FormSubmitProps) {
  return (
    <div className="flex max-w-sm flex-col gap-1">
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md border border-gray-200 bg-gray-100 px-10 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
      >
        {loading ? 'Loading...' : label}
      </button>
      {error && (
        <span className="text-center text-[13px] text-red-500">{error}</span>
      )}
    </div>
  );
}
