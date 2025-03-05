import React, { useState } from 'react';
import PaymentForm from './components/PaymentForm';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

function App() {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSuccess = () => {
    setPaymentStatus('success');
  };

  const handleError = (error: string) => {
    setPaymentStatus('error');
    setErrorMessage(error);
  };

  const resetStatus = () => {
    setPaymentStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen mesh-background relative overflow-hidden flex items-center justify-center p-4">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="w-full max-w-md animate-slide-up relative">
        {paymentStatus === 'idle' ? (
          <PaymentForm
            amount={99.99}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        ) : paymentStatus === 'success' ? (
          <div className="glass-morphism rounded-2xl shadow-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100/80 p-4 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-8">Thank you for your payment. Your transaction has been completed successfully.</p>
            <button
              onClick={resetStatus}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-8 rounded-xl 
                       hover:from-green-600 hover:to-green-700 transition-all duration-300 
                       transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
                       flex items-center justify-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Make Another Payment</span>
            </button>
          </div>
        ) : (
          <div className="glass-morphism rounded-2xl shadow-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100/80 p-4 rounded-full">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-red-500 mb-4">Payment Failed</h2>
            <p className="text-gray-600 mb-8">{errorMessage}</p>
            <button
              onClick={resetStatus}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-8 rounded-xl 
                       hover:from-red-600 hover:to-red-700 transition-all duration-300 
                       transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
                       flex items-center justify-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Try Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;