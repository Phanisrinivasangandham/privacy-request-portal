
import React from 'react';
import { AIResponse } from '../types';

interface ResultDisplayProps {
  result: AIResponse;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-50 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-900">Request Acknowledged</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Request Category</span>
            <span className="text-sm font-bold text-gray-900">{result.classification}</span>
          </div>
          <div className="flex-1 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Information Status</span>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${result.isComplete ? 'bg-green-500' : 'bg-amber-500'}`}></span>
              <span className="text-sm font-bold text-gray-900">
                {result.isComplete ? 'Complete' : 'Pending Review'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-900 leading-relaxed font-medium italic">
            "{result.confirmationMessage}"
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
        <span className="text-[10px] text-gray-400 italic">Submission Reference: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        <button 
          onClick={() => window.location.reload()}
          className="text-xs font-bold text-gray-900 hover:underline transition-all"
        >
          Clear and Start Over
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
