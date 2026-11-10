'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const WhatsAppFloating: React.FC = () => {
  const { settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const cleanNumber = (settings.whatsappNumber || '+918489542722').replace(/[^0-9]/g, '');

  const quickMessages = [
    'Hello KOMBAN CUTS, what are today’s fresh meat & fish specials?',
    'Hi, do you deliver fresh mutton to my area in Coimbatore?',
    'I would like to place an order via WhatsApp.',
    'I need help tracking my order status.',
  ];

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  <span>KOMBAN CUTS Support</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </h4>
                <p className="text-[11px] text-emerald-100">Coimbatore • Typically replies in 5 mins</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white p-1 rounded-lg"
              aria-label="Close WhatsApp Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-emerald-50/30 max-h-80 overflow-y-auto space-y-3">
            <div className="bg-white p-3 rounded-xl shadow-sm text-xs text-gray-700 border border-gray-100">
              <p className="font-semibold text-gray-900 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                <span>Vanakkam! Welcome to Komban Cuts!</span>
              </p>
              <p className="text-gray-600">
                How can we assist you with your fresh chicken, mutton, seafood, or egg order in Coimbatore today?
              </p>
            </div>

            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider px-1">
              Quick Inquiries:
            </div>

            <div className="space-y-1.5">
              {quickMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(msg)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-xs text-gray-800 transition-colors flex items-center justify-between group shadow-2xs"
                >
                  <span className="line-clamp-1">{msg}</span>
                  <Send className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customMsg.trim()) {
                  handleSend(customMsg.trim());
                  setCustomMsg('');
                }
              }}
              placeholder="Type your WhatsApp message..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#25D366]"
            />
            <button
              onClick={() => {
                if (customMsg.trim()) {
                  handleSend(customMsg.trim());
                  setCustomMsg('');
                }
              }}
              className="bg-[#25D366] text-white p-2 rounded-xl hover:bg-[#1EBE5D] transition-colors"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden sm:inline-block font-bold text-xs tracking-wide">
          Order on WhatsApp
        </span>
      </button>
    </div>
  );
};

