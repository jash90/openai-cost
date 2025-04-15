import React, { useState } from 'react';
import { KeyRound, Check, X } from 'lucide-react';
import { validateApiKey } from '../utils/api';
import toast from 'react-hot-toast';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export function ApiKeyInput({ onApiKeySubmit }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    
    if (!apiKey?.trim()) {
      toast.error('Please enter an API key');
      setIsValidating(false);
      return;
    }

    try {
      const isValid = await validateApiKey(apiKey);
      if (isValid) {
        onApiKeySubmit(apiKey);
        toast.success('API key validated successfully');
      } else {
        toast.error('Invalid API key');
      }
    } catch (error) {
      toast.error('Failed to validate API key');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
          placeholder="Enter your OpenAI API key"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isValidating || !apiKey}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isValidating ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : apiKey ? (
            <Check className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  );
}