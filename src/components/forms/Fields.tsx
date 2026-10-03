"use client";

import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from "react";
import { AlertIcon, ChevronDownIcon } from "@/components/Icons";

const CONTROL =
  "w-full rounded-lg border bg-white px-4 py-3 text-[0.98rem] text-navy-900 placeholder:text-ash-400 transition-colors min-h-[50px]";

function controlClass(hasError: boolean): string {
  return `${CONTROL} ${
    hasError
      ? "border-red-600 bg-red-50/40"
      : "border-navy-900/15 hover:border-navy-900/30 focus:border-navy-700"
  }`;
}

type LabelProps = {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  hint?: string;
};

export function FieldLabel({ htmlFor, children, required, hint }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex flex-wrap items-baseline gap-x-2 text-[0.82rem] font-semibold uppercase tracking-[0.07em] text-ash-700"
    >
      <span>
        {children}
        {required ? (
          <span className="ml-1 text-clay-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 normal-case tracking-normal text-ash-400">
            (optional)
          </span>
        )}
      </span>
      {hint ? (
        <span className="text-[0.72rem] font-normal normal-case tracking-normal text-ash-600">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[0.82rem] font-medium text-red-700">
      <AlertIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
};

export function TextField({
  id,
  label,
  error,
  hint,
  containerClassName = "",
  required,
  ...props
}: TextFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={containerClassName}>
      <FieldLabel htmlFor={id} required={required} hint={hint}>
        {label}
      </FieldLabel>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-required={required || undefined}
        className={controlClass(Boolean(error))}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  options: readonly string[];
  placeholder?: string;
  containerClassName?: string;
};

export function SelectField({
  id,
  label,
  error,
  hint,
  options,
  placeholder = "Select an option",
  containerClassName = "",
  required,
  ...props
}: SelectFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={containerClassName}>
      <FieldLabel htmlFor={id} required={required} hint={hint}>
        {label}
      </FieldLabel>
      <div className="relative">
        <select
          id={id}
          name={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-required={required || undefined}
          className={`${controlClass(Boolean(error))} appearance-none pr-11`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ash-600" />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
};

export function TextareaField({
  id,
  label,
  error,
  hint,
  containerClassName = "",
  required,
  rows = 4,
  ...props
}: TextareaFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={containerClassName}>
      <FieldLabel htmlFor={id} required={required} hint={hint}>
        {label}
      </FieldLabel>
      <textarea
        id={id}
        name={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-required={required || undefined}
        className={`${controlClass(Boolean(error))} min-h-[120px] resize-y`}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function ErrorSummary({
  errors,
  idPrefix,
  message,
}: {
  errors: Record<string, string>;
  idPrefix: string;
  message?: string;
}) {
  const entries = Object.entries(errors);
  if (entries.length === 0 && !message) return null;

  return (
    <div
      role="alert"
      className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-[0.92rem] text-red-800"
    >
      <p className="flex items-center gap-2 font-semibold">
        <AlertIcon className="h-4.5 w-4.5" />
        {message ?? "Please review the fields below before submitting."}
      </p>
      {entries.length > 0 ? (
        <ul className="mt-2 list-disc space-y-1 pl-9">
          {entries.map(([field, text]) => (
            <li key={field}>
              <a
                href={`#${idPrefix}-${field}`}
                className="underline underline-offset-2 hover:no-underline"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
