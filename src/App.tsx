import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { ValueProposition } from './components/ValueProposition';
import { VideoSection } from './components/VideoSection';
import { UploadForm } from './components/UploadForm';
import { PrivacyNotice } from './components/PrivacyNotice';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-rose-400 via-teal-400 to-blue-500">
        <div className="min-h-screen bg-white/10 backdrop-blur-sm">
          <Header />
          <main className="container mx-auto px-4 py-8 pb-12">
            <ValueProposition />
            <VideoSection />
            <UploadForm />
            <PrivacyNotice />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;