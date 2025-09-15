import type { PropsWithChildren } from 'react';

type AlertProps = PropsWithChildren<{
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}>;

export default function Alert({
  variant = 'info',
  className = '',
  children,
}: AlertProps) {
  const styles: Record<typeof variant, string> = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };
  return (
    <div
      className={`rounded-md border px-3 py-2 text-sm ${styles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
