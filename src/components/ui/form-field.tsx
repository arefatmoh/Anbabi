import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

type FieldShellProps = {
  label: string;
  htmlFor: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
};

function FieldShell({
  label,
  htmlFor,
  description,
  error,
  children,
}: FieldShellProps) {
  const helpId = `${htmlFor}-help`;

  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-bold">
        {label}
      </label>
      {description ? (
        <p id={helpId} className="text-ink/65 mt-1 text-sm">
          {description}
        </p>
      ) : null}
      {children}
      {error ? (
        <p className="text-danger mt-2 text-sm font-semibold" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
  error?: string;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    { id, label, description, error, className, ...props },
    ref,
  ) {
    if (!id) {
      throw new Error("InputField requires an id.");
    }

    return (
      <FieldShell
        label={label}
        htmlFor={id}
        description={description}
        error={error}
      >
        <input
          ref={ref}
          id={id}
          aria-describedby={description ? `${id}-help` : undefined}
          aria-invalid={Boolean(error)}
          className={cn(
            "border-ink/70 bg-cream focus:border-brand-orange-deep focus:ring-brand-orange/25 mt-2 min-h-12 w-full rounded-2xl border-2 px-4 text-base transition outline-none focus:ring-3",
            className,
          )}
          {...props}
        />
      </FieldShell>
    );
  },
);

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  description?: string;
  error?: string;
};

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(function TextareaField(
  { id, label, description, error, className, ...props },
  ref,
) {
  if (!id) {
    throw new Error("TextareaField requires an id.");
  }

  return (
    <FieldShell
      label={label}
      htmlFor={id}
      description={description}
      error={error}
    >
      <textarea
        ref={ref}
        id={id}
        aria-describedby={description ? `${id}-help` : undefined}
        aria-invalid={Boolean(error)}
        className={cn(
          "border-ink/70 bg-cream focus:border-brand-orange-deep focus:ring-brand-orange/25 mt-2 min-h-36 w-full resize-y rounded-2xl border-2 px-4 py-3 text-base transition outline-none focus:ring-3",
          className,
        )}
        {...props}
      />
    </FieldShell>
  );
});
