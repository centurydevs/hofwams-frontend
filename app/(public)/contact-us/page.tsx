import { ContactForm, ContactHero, ContactInfo } from "@/components/public";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Section */}
      <section className="py-20 bg-green-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <ContactInfo />

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
