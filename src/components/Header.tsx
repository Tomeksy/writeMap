import React from 'react';
import { Brain } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full py-6 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Immo-Solutions AI</h1>
            <p className="text-sm text-slate-600">by Harvest Flow</p>
          </div>
        </div>
        
        <p className="text-slate-700 text-center md:text-right font-medium">
          Bring ChatGPT <strong>deine</strong> Schreibweise bei und spar dir Unmengen an Zeit
        </p>
      </div>
    </header>
  );
}