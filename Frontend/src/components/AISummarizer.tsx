import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface AISummarizerProps {
  content: string;
}

export const AISummarizer = (props: AISummarizerProps) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const cleanContent = (htmlContent: string) => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    return doc.body.textContent || '';
  };

  const handleSummarize = async () => {
    setShowSummary(true);
    if (summary) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const textToSummarize = cleanContent(props.content);

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/summarize`,
        { content: textToSummarize },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSummary(response.data.summary);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.error || 
        'Failed to generate summary. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 mb-6">
      {!showSummary && (
        <button
          onClick={handleSummarize}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200/50 rounded-full transition-all duration-300 shadow-xs cursor-pointer active:scale-98"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.096.813z"
            />
          </svg>
          Summarize with AI
        </button>
      )}

      {showSummary && (
        <div className="bg-linear-to-r from-indigo-50/40 to-purple-50/40 border border-indigo-100/70 rounded-2xl p-5 relative overflow-hidden shadow-xs transition-all duration-500 ease-in-out">
          <div className="absolute right-3 top-3 text-indigo-200/20 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.096.813z" />
            </svg>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-indigo-100 text-indigo-700 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.096.813z" />
                </svg>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">AI Summary</span>
            </div>
            
            <button 
              onClick={() => setShowSummary(false)}
              className="text-gray-400 hover:text-gray-600 text-xs transition-colors cursor-pointer"
            >
              Hide
            </button>
          </div>

          {loading && (
            <div className="space-y-2 py-1 animate-pulse">
              <div className="h-3.5 bg-indigo-100/50 rounded w-full"></div>
              <div className="h-3.5 bg-indigo-100/50 rounded w-11/12"></div>
              <div className="h-3.5 bg-indigo-100/50 rounded w-4/5"></div>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50/50 p-3 rounded-lg border border-red-100">
              <p className="font-semibold">Generation failed</p>
              <p className="text-xs mt-0.5">{error}</p>
              <button 
                onClick={handleSummarize} 
                className="text-xs font-semibold text-red-700 underline mt-2 block cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && summary && (
            <p className="text-gray-800 leading-relaxed font-serif text-base italic pl-3 border-l-2 border-indigo-400">
              "{summary}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};
