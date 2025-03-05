import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, DollarSign, Lock, Calendar, Shield } from 'lucide-react';

const stripePromise = loadStripe('your_publishable_key');

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onError }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Simulated success for demo
      setTimeout(() => {
        setProcessing(false);
        onSuccess();
      }, 2000);
    } catch (error) {
      setProcessing(false);
      onError(error instanceof Error ? error.message : 'Payment failed');
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="max-w-md w-full mx-auto glass-morphism rounded-2xl shadow-2xl p-8 animate-slide-up">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg animate-float">
          <CreditCard className="w-10 h-10 text-white" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Secure Payment
      </h2>
      <p className="text-center text-gray-500 mb-8">Complete your purchase securely</p>
      
      <div className="mb-8 bg-indigo-50/80 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Amount to Pay</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ${amount.toFixed(2)}
          </span>
        </div>
        <div className="h-2 bg-indigo-100/80 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 w-full animate-pulse-slow"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative group">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="card-input pr-12 group-hover:border-indigo-300"
              required
            />
            <CreditCard className="absolute right-3 top-3 text-gray-400 group-hover:text-indigo-500 transition-colors" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <div className="relative group">
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className="card-input pr-12 group-hover:border-indigo-300"
                required
              />
              <Calendar className="absolute right-3 top-3 text-gray-400 group-hover:text-indigo-500 transition-colors" size={20} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVC
            </label>
            <div className="relative group">
              <input
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="123"
                maxLength={3}
                className="card-input pr-12 group-hover:border-indigo-300"
                required
              />
              <Lock className="absolute right-3 top-3 text-gray-400 group-hover:text-indigo-500 transition-colors" size={20} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className={`w-full button-gradient text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-lg
            ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          <DollarSign size={20} />
          <span className="font-semibold">{processing ? 'Processing...' : 'Pay Now'}</span>
        </button>
      </form>

      <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500 bg-gray-50/80 backdrop-blur-sm rounded-xl p-4">
        <Shield size={16} className="text-indigo-500" />
        <span>Secured by industry-leading encryption</span>
      </div>
    </div>
  );
};

export default PaymentForm;