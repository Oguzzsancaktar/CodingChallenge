import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  className?: string;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants: Record<typeof variant, string> = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400',
    ghost:
      'bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-400',
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" />
      )}
      {children}
    </button>
  );
}
