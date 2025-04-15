import React from 'react';
import { FolderKanban } from 'lucide-react';
import type { ProjectUsage } from '../types/api';

interface ProjectBreakdownProps {
  projectUsage: ProjectUsage[];
}

export function ProjectBreakdown({ projectUsage }: ProjectBreakdownProps) {
  if (!projectUsage || projectUsage.length === 0) {
    return null;
  }

  const totalCost = projectUsage.reduce((sum, project) => sum + project.totalCost, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <FolderKanban className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-semibold">Project Breakdown</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                % of Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Est. Tokens
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projectUsage.map((project) => (
              <tr key={project.project_id || 'default'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {project.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${project.totalCost.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {totalCost > 0 ? ((project.totalCost / totalCost) * 100).toFixed(1) : '0'}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.totalTokens.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        {projectUsage.map((project) => (
          <div key={project.project_id || 'default'} className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{project.name}</span>
              <span>${project.totalCost.toFixed(2)} ({totalCost > 0 ? ((project.totalCost / totalCost) * 100).toFixed(1) : '0'}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${totalCost > 0 ? (project.totalCost / totalCost) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 