import { Check, X } from "lucide-react";

export function ActionToast({ message, onClose }: { message: string; onClose: () => void }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-3 right-3 z-50 mx-auto max-w-md rounded-lg border bg-white p-3 shadow-soft sm:bottom-5 sm:left-auto sm:right-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Check className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium leading-6">{message}</p>
        </div>
        <button className="text-muted-foreground hover:text-foreground" onClick={onClose} aria-label="Dismiss message">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
