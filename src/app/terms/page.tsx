import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
          <span>/</span>
          <span className="font-bold text-gray-900">Terms and Conditions</span>
        </div>

        <div className="border-b border-gray-100 pb-8 mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-brand-red">
            Customer Agreement
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mt-2">
            Terms & Conditions
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Last Updated: November 2026 • KOMBAN CUTS, Coimbatore
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6 text-xs sm:text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">1. Fresh Meat Ordering & Availability</h2>
            <p>
              All products listed on KOMBAN CUTS are subject to daily catch and butchery availability. Due to natural livestock and seafood variations, weights are measured within industry tolerances post cleaning and dressing.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">2. Delivery Zones & Delivery Timelines</h2>
            <p>
              Express delivery (45-60 minutes) is available within designated Coimbatore municipal boundaries. Severe weather conditions, local traffic disruptions, or unforeseen events may occasionally affect delivery schedules.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">3. Shop Pickup Policy</h2>
            <p>
              For orders placed under the "Shop Pickup" option, customers are requested to collect their package from our store counter (142 Cross Cut Road, Gandhipuram) within the selected pickup slot to ensure cold-chain temperature freshness.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">4. Quality Guarantee & Refund Policy</h2>
            <p>
              Because raw meat and seafood are perishable foods, please inspect your delivery package upon arrival. If any product arrives damaged, warm, or does not meet our high standards, report it immediately with a photograph via WhatsApp within 2 hours of delivery for a 100% prompt replacement or refund.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">5. Governing Law</h2>
            <p>
              These terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts located in Coimbatore, Tamil Nadu.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
