"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { CheckCircle2 } from "lucide-react"
import { useTranslation } from "react-i18next"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export function ContactForm() {
  // console.log("--- Rendering ContactForm component ---");
  const { t } = useTranslation('contact-form');
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    const formData = {
      ...values,
      // IMPORTANT: Replace this with your actual Web3Forms Access Key
      access_key: "3e6cf92b-79fb-4675-bcb7-677fcb6ab6ba",
      subject: "NUEVA Cotización de JAL Construction",
      replyto: values.email,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        toast.success(t('successTitle'), {
          description: t('successDescription'),
        });
      } else {
        console.error("Error submitting form:", result);
        toast.error("Submission Error", {
          description: result.message || "There was an error submitting your form. Please try again.",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Network Error", {
        description: "There was a network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
          <h3 className="text-2xl font-semibold">{t('successTitle')}</h3>
          <p className="text-muted-foreground">
            {t('successDescription')}
          </p>
          <Button onClick={() => {
            form.reset();
            setIsSubmitted(false);
          }} variant="outline" className="mt-4">
            {t('submitAnotherButton')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fullNameLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('fullNamePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('emailLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('emailPlaceholder')} type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phoneLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('phonePlaceholder')} type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('detailsLabel')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('detailsPlaceholder')}
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('detailsDescription')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t('submittingButton') : t('submitButton')}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {t('agreementText')}
          </p>
        </form>
      </Form>
    </div>
  )
}