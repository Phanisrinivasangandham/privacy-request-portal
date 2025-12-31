
import React, { useState } from 'react';
import { DeletionFormData, RequestType } from '../types';

interface DeletionFormProps {
  onSubmit: (data: DeletionFormData) => void;
  isLoading: boolean;
}

const DeletionForm: React.FC<DeletionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<DeletionFormData>({
    fullName: '',
    email: '',
    requestType: RequestType.DELETE_ACCOUNT,
    additionalDetails: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          disabled={isLoading}
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isLoading}
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-1">
          Request Type
        </label>
        <select
          id="requestType"
          name="requestType"
          disabled={isLoading}
          value={formData.requestType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50 appearance-none"
        >
          {Object.values(RequestType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details (Optional)
        </label>
        <textarea
          id="additionalDetails"
          name="additionalDetails"
          rows={4}
          disabled={isLoading}
          value={formData.additionalDetails}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50 resize-none"
          placeholder="Please provide any context that might help our team..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:bg-gray-400"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Submit Request'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center italic mt-4">
        This request will be reviewed by our privacy team. No automatic deletion occurs.
      </p>
    </form>
  );
};

export default DeletionForm;
