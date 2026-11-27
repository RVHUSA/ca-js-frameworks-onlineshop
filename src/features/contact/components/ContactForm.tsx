"use client";

import { useState } from "react";
import { ContactFormData, ContactFormErrors } from "../types";
import { validateContactForm } from "../validation";

const EMPTY_FORM: ContactFormData = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};

// Shared styling for all fields
const FIELD_CLASS =
  "mt-1 w-full rounded-xl bg-surface px-4 py-3 text-sm shadow-sm outline-none transition placeholder:text-muted focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500/60";

// Contact form with validation, shows a confirmation when it is sent
export function ContactForm() {
  const [values, setValues] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Update one field and clear its error while the user types
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.target.name as keyof ContactFormData;
    setValues((prev) => ({ ...prev, [name]: event.target.value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validateContactForm(values);
    setErrors(newErrors);

    // Only continue if there are no errors
    if (Object.keys(newErrors).length > 0) return;

    // There is no server to send to, so we just confirm and clear the form
    setSubmitted(true);
    setValues(EMPTY_FORM);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Confirmation after a valid submit */}
      {submitted && (
        <p
          role="status"
          className="rounded-xl bg-surface px-4 py-3 text-sm font-medium"
        >
          Thank you! Your message has been sent.
        </p>
      )}

      <div>
        <label htmlFor="fullName" className="text-sm font-medium">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={FIELD_CLASS}
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1 text-sm text-red-700">
            {errors.fullName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={FIELD_CLASS}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-700">
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={FIELD_CLASS}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={FIELD_CLASS}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
      >
        Submit
      </button>
    </form>
  );
}
