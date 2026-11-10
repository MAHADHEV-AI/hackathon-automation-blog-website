import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
          <span>/</span>
          <span className="font-bold text-gray-900">Privacy Policy</span>
        </div>

        <div className="border-b border-gray-100 pb-8 mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-brand-red">
            Legal & Trust
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mt-2">
            KOMBAN CUTS Privacy Policy
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Last Updated: November 2026 • Coimbatore, Tamil Nadu, India
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6 text-xs sm:text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">1. Introduction</h2>
            <p>
              KOMBAN CUTS ("we", "us", or "our") operates the online meat, seafood, and egg ordering platform for Coimbatore, Tamil Nadu. We respect your privacy and are committed to protecting your personal data in compliance with Indian information technology regulations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">2. Information We Collect</h2>
            <p>We collect information necessary to fulfill your meat orders accurately:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Contact details: Name, mobile number, and email address.</li>
              <li>Delivery details: House number, street name, Coimbatore locality, and pincode.</li>
              <li>Order history: Items purchased, weight portions, and transaction timestamps.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">3. Payment Information Security</h2>
            <p>
              We integrate with Razorpay for online payments. KOMBAN CUTS never stores your credit card, debit card, or UPI PIN on our servers. All financial transactions are securely processed through PCI-DSS certified payment gateways.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">4. How We Use Your Data</h2>
            <p>
              Your contact details are strictly used to dispatch your delivery riders, send WhatsApp order tracking updates, and communicate critical status updates regarding your fresh cuts. We never sell or rent your personal information to third-party marketing entities.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">5. Contact Us</h2>
            <p>
              For privacy inquiries, please contact us at <strong>orders@kombancuts.com</strong> or visit our store at 142 Cross Cut Road, Gandhipuram, Coimbatore – 641012.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

