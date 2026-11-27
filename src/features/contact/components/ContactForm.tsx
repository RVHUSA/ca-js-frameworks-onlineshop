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
    <form onSubmit={handleSubmit} noValidate>
      {/* Confirmation after a valid submit */}
      {submitted && <p role="status">Thank you! Your message has been sent.</p>}

      <div>
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
        />
        {errors.fullName && <p id="fullName-error">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && <p id="subject-error">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error">{errors.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
