
import React, { useState } from 'react';
import DeletionForm from './components/DeletionForm';
import ResultDisplay from './components/ResultDisplay';
import { processDeletionRequest } from './services/geminiService';
import { DeletionFormData, AIResponse } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);

  const handleSubmit = async (formData: DeletionFormData) => {
    setLoading(true);
    try {
      const aiResponse = await processDeletionRequest(formData);
      setResult(aiResponse);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 py-6 px-4">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <div className="bg-black text-white p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Privacy Portal</h1>
            <p className="text-sm text-gray-500">Manage your personal data requests</p>
          </div>
        </div>
      </header>

      <main className="flex-grow px-4 py-8">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Deletion Request</h2>
              <p className="text-gray-600 text-sm">
                Please provide your details to request data removal. All requests are manually reviewed by our privacy team.
              </p>
            </div>
            <DeletionForm onSubmit={handleSubmit} isLoading={loading} />
          </div>

          {result && <ResultDisplay result={result} />}

          {/* Footer commitment section */}
          {!result && (
            <section className="mt-8 text-center px-4">
              <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">Privacy Framework</h3>
              <div className="grid grid-cols-3 gap-2 opacity-60">
                <div className="p-3">
                  <p className="text-xs font-bold text-gray-700">Manual Audit</p>
                  <p className="text-[9px] text-gray-500">Human verified</p>
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-gray-700">Confidential</p>
                  <p className="text-[9px] text-gray-500">Private handling</p>
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-gray-700">Systemic</p>
                  <p className="text-[9px] text-gray-500">Standardized flow</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="w-full py-6 px-4 text-center border-t border-gray-100 bg-white">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Privacy Request Portal
        </p>
      </footer>
    </div>
  );
};

export default App;
