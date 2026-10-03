import React, { useState } from 'react';
import { Check, Mail, MessageCircle, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <section>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Get in touch</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">We are here to help.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-stone-600">
            Have a question about an order, a restaurant, or your Foodie experience? Send us a note and our team will get back to you.
          </p>
          <div className="mt-8 space-y-4 text-sm text-stone-700">
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-orange-500" /> hello@foodie.example</div>
            <div className="flex items-center gap-3"><MessageCircle className="h-5 w-5 text-orange-500" /> We reply within one business day</div>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-md shadow-stone-900/5 sm:p-8">
          {sent ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><Check className="h-7 w-7" /></div>
              <h2 className="mt-5 text-2xl font-black text-stone-900">Message sent</h2>
              <p className="mt-2 text-sm text-stone-600">Thanks for reaching out. We will be in touch soon.</p>
              <button type="button" onClick={() => setSent(false)} className="mt-6 font-semibold text-orange-700 hover:text-orange-800">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-stone-700">Name<input required name="name" className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2.5 font-normal outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/15" /></label>
                <label className="text-sm font-semibold text-stone-700">Email<input required type="email" name="email" className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2.5 font-normal outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/15" /></label>
              </div>
              <label className="block text-sm font-semibold text-stone-700">Subject<input required name="subject" className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2.5 font-normal outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/15" /></label>
              <label className="block text-sm font-semibold text-stone-700">Message<textarea required name="message" rows={5} className="mt-2 w-full resize-none rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2.5 font-normal outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/15" /></label>
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-orange-700"><Send className="h-4 w-4" /> Send message</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default Contact;
