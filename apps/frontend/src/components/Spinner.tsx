export default function Spinner({
  className = 'h-5 w-5 border-blue-600',
}: {
  className?: string;
}) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-t-transparent ${className}`}
    />
  );
}
