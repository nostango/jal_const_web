import { ContactForm } from "@/components/contact-form"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Request a Free Estimate</h1>
        <p className="text-muted-foreground mb-8">
          Fill out the form below and our team will get back to you with a free estimate for your project.
        </p>
        <ContactForm />
      </div>
    </main>
  )
}
