'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ContactPage() {
  const { settings } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && message) {
      setIsSent(true);
      setName('');
      setPhone('');
      setMessage('');
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
          <span>/</span>
          <span className="font-bold text-gray-900">Contact Us</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-red text-xs font-black uppercase tracking-widest bg-red-50 border border-brand-red/20 px-3.5 py-1 rounded-full">
            We Are Here To Help
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mt-3 tracking-tight">
            Contact KOMBAN CUTS Coimbatore
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Questions about our daily cuts, bulk party orders, or delivery service areas? Reach out to our team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Store Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 space-y-6">
              <h3 className="font-display font-black text-lg text-gray-900 pb-3 border-b border-gray-100">
                Coimbatore Store Location
              </h3>

              <ul className="space-y-4 text-xs text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-brand-red flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Store Address</span>
                    <p className="text-gray-500 mt-0.5">{settings.address}</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-brand-red flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Direct Order Hotline</span>
                    <a
                      href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-brand-red font-bold hover:underline"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">WhatsApp Line</span>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 font-bold hover:underline"
                    >
                      {settings.whatsappNumber} (Chat Now)
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Butchery Counter Hours</span>
                    <p className="text-gray-500 mt-0.5">{settings.openingHours}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Send Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8">
            <h3 className="font-display font-black text-lg text-gray-900 mb-2">
              Send an Online Inquiry
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Fill out the form below and our manager will contact you within 15 minutes during store hours.
            </p>

            {isSent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-base">
                  Inquiry Received!
                </h4>
                <p className="text-xs text-emerald-700">
                  Thank you! Our Coimbatore store representative will reach out to you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-3 px-5 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Senthil Kumar"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 84895 42722"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Message / Special Cut Request *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you are looking for (e.g. 5kg goat biryani cuts for Sunday family function, specific fish varieties)..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

