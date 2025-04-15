import React from 'react';
import { ModelUsage } from '../types/api';

interface ModelBreakdownProps {
  modelUsage: ModelUsage[];
}

export function ModelBreakdown({ modelUsage }: ModelBreakdownProps) {
  const totalCost = modelUsage.reduce((sum, model) => sum + model.totalCost, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Model Usage Breakdown</h2>
      <div className="space-y-4">
        {modelUsage.map((model) => (
          <div key={model.model}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">{model.model}</span>
              <span className="text-gray-900 font-medium">
                ${model.totalCost.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 rounded-full h-2"
                style={{
                  width: `${(model.totalCost / totalCost) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}