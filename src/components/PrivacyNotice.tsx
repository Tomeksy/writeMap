import React from 'react';
import { Shield } from 'lucide-react';

export function PrivacyNotice() {
  return (
    <div className="max-w-xl mx-auto mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-sm text-slate-700">
          Deine hochgeladenen Texte werden nicht gespeichert, sondern sofort nach Bearbeitung gelöscht. 
          Bitte stell trotzdem sicher, dass keine vertraulichen Daten Dritter in deinen Texten enthalten sind.
        </p>
      </div>
    </div>
  );
}