// The values in the contact form
export interface ContactFormData {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

// An error message per field, a field has no entry when it is valid
export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;
