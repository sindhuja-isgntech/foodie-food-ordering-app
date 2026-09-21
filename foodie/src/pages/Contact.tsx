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
          <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">We are here to help.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-gray-600">
            Have a question about an order, a restaurant, or your Foodie experience? Send us a note and our team will get back to you.
          </p>
          <div className="mt-8 space-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-orange-500" /> hello@foodie.example</div>
            <div className="flex items-center gap-3"><MessageCircle className="h-5 w-5 text-orange-500" /> We reply within one business day</div>
          </div>
        </section>

        <section className="rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-xl shadow-orange-900/10 backdrop-blur-sm sm:p-8">
          {sent ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600"><Check className="h-7 w-7" /></div>
              <h2 className="mt-5 text-2xl font-black text-gray-900">Message sent</h2>
              <p className="mt-2 text-sm text-gray-600">Thanks for reaching out. We will be in touch soon.</p>
              <button type="button" onClick={() => setSent(false)} className="mt-6 font-bold text-orange-600 hover:text-orange-700">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-gray-700">Name<input required name="name" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" /></label>
                <label className="text-sm font-semibold text-gray-700">Email<input required type="email" name="email" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" /></label>
              </div>
              <label className="block text-sm font-semibold text-gray-700">Subject<input required name="subject" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" /></label>
              <label className="block text-sm font-semibold text-gray-700">Message<textarea required name="message" rows={5} className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" /></label>
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"><Send className="h-4 w-4" /> Send message</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default Contact;
