import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ApiKeyInput } from './components/ApiKeyInput';
import { UsageChart } from './components/UsageChart';
import { ProjectBreakdown } from './components/ProjectBreakdown';
import { fetchUsageData, PRICING_DATA } from './utils/api';
import type { UsageResponse, PricingData } from './types/api';
import { LineChart, Wallet, AlertCircle, Info } from 'lucide-react';

function App() {
  const [apiKey, setApiKey] = useState<string>(import.meta.env.VITE_OPENAI_API_KEY || '');
  const [usageData, setUsageData] = useState<UsageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    if (apiKey) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const endDate = new Date().toISOString().split('T')[0];
          const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0];
          const data = await fetchUsageData(apiKey, startDate, endDate);
          setUsageData(data);
        } catch (error) {
          console.error('Failed to fetch usage data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [apiKey]);

  const renderPricingInfo = (pricingData: PricingData) => (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">OpenAI Pricing</h2>
        <button 
          onClick={() => setShowPricing(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Hide
        </button>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Models</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input (per 1M tokens)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Output (per 1M tokens)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pricingData.models.map((model) => (
                <tr key={model.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${model.input_per_1M_tokens.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${model.output_per_1M_tokens.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Tools</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pricingData.tools.map((tool) => (
                <tr key={tool.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tool.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tool.cost.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tool.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <LineChart className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">OpenAI Cost Tracker</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPricing(!showPricing)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Info className="h-4 w-4 mr-1" />
              {showPricing ? 'Hide Pricing' : 'Show Pricing'}
            </button>
            
            {!apiKey && (
              <div className="flex-1 max-w-md">
                <ApiKeyInput onApiKeySubmit={setApiKey} />
              </div>
            )}
          </div>
        </div>

        {showPricing && renderPricingInfo(PRICING_DATA)}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-amber-800">API Information</h3>
              <p className="text-sm text-amber-700 mt-1">
                This application uses OpenAI's organization costs endpoint for cost tracking:
                <br />
                - <code>/v1/organization/costs</code> - Gets detailed breakdown of API expenses
                <br />
                <br />
                The API returns cost data in daily buckets with project_id grouping.
                Token usage is estimated based on costs and pricing data.
                This endpoint requires admin access to your OpenAI organization.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
          </div>
        ) : usageData ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Wallet className="h-6 w-6 text-blue-500" />
                  <h2 className="text-xl font-semibold">Total Cost</h2>
                </div>
                <p className="text-4xl font-bold text-gray-900">
                  ${usageData.totalCost.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  (API usage from last 30 days)
                </p>
              </div>
            </div>

            <ProjectBreakdown projectUsage={usageData.projectUsage} />
            <UsageChart data={usageData.dailyUsage} />
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            Enter your OpenAI API key to view usage statistics
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
