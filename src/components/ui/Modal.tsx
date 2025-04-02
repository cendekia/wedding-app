import React, { Fragment } from 'react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          className={cn(
            'w-full max-w-md rounded-lg bg-background p-6 shadow-lg',
            'max-h-[85vh] overflow-y-auto',
            'transform transition-all',
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || description) && (
            <div className="mb-4">
              {title && (
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}

          {/* Content */}
          <div>{children}</div>

          {/* Close button */}
          <button
            className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </Fragment>
  );
} 