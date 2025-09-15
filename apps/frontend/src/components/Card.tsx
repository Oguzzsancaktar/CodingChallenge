import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  className?: string;
  title?: string;
  actions?: React.ReactNode;
}>;

export default function Card({
  className = '',
  title,
  actions,
  children,
}: CardProps) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      {(title || actions) && (
        <div className="mb-3 flex items-center justify-between">
          {title && (
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          )}
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}
