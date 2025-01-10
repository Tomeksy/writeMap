import React from 'react';
import { Play, Zap, BarChart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getSubmissionCount } from '../lib/utils';

export function VideoSection() {
  const { data: submissionCount } = useQuery({
    queryKey: ['submissionCount'],
    queryFn: getSubmissionCount,
    initialData: getSubmissionCount,
  });

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-blue-600" />
            Wie funktioniert's?
          </h2>
          <div className="w-full">
            <div className="relative w-full pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/uZzpI9C_NLw"
                title="WriteMap Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">👉🏼 Beispiel und User-Guide im Video zu sehen</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg shadow-sm">
          <Zap className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">
            Powered by GPT-4
          </span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg shadow-sm">
          <BarChart className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">
            {submissionCount} Analysen wurden bereits mit WriteMap erstellt
          </span>
        </div>
      </div>
    </div>
  );
}
