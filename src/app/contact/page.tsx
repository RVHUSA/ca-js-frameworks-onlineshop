import { ContactForm } from "@/features/contact/components/ContactForm";

// Contact page
export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-heading text-2xl font-bold">Contact us</h1>
      <p className="mt-2 text-muted">
        Have a question? Send us a message and we will get back to you.
      </p>

      <div className="mt-8 rounded-2xl bg-card p-6 sm:p-8">
        <ContactForm />
      </div>
    </main>
  );
}
