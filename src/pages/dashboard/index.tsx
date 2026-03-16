'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import Loader from '../../components/loader';
import { useGetAIConversation2 } from '../../queries';

type ConversationItem = {
  id: string;
  query: string;
  response?: {
    visa_documentation?: string[];
    passport_requirements?: string[];
    additional_documents?: string[];
    travel_advisories?: string[];
  };
  created_at: string;
};

export default function QAHistoryLanding() {
  const { conversation = [], refetch, isLoading } = useGetAIConversation2();
  const [analytics, setAnalytics] = useState({
    totalQuestions: 0,
    totalResponses: 0,
    lastQuestion: '',
  });

  useEffect(() => {
    const totalQuestions = conversation.length;
    const totalResponses = conversation.filter((c: any) => c.response).length;
    const lastQuestion =
      conversation.length > 0
        ? format(
            new Date(conversation[conversation.length - 1].created_at),
            'PPP p'
          )
        : '';

    setAnalytics({ totalQuestions, totalResponses, lastQuestion });
  }, [conversation]);

  const renderFormattedResponse = (resp: ConversationItem['response']) => {
    if (!resp)
      return (
        <p className="text-gray-500 dark:text-gray-400">No response yet.</p>
      );

    const sections = [
      { title: 'Visa Documentation', data: resp.visa_documentation },
      { title: 'Passport Requirements', data: resp.passport_requirements },
      { title: 'Additional Documents', data: resp.additional_documents },
      { title: 'Travel Advisories', data: resp.travel_advisories },
    ];

    return (
      <div className="space-y-2 mt-2">
        {sections.map(
          (section: any) =>
            section.data?.length > 0 && (
              <div
                key={section.title}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-1">
                  {section.title}
                </h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  {section.data.map((item: any, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4 max-w-4xl mx-auto space-y-6">
          {/* Analytics Panel */}
          <div className="bg-gradient-to-r from-teal-400 to-teal-600 dark:from-teal-700 dark:to-teal-900 text-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h4 className="font-bold">Total Questions</h4>
              <p className="text-2xl">{analytics.totalQuestions}</p>
            </div>
            <div>
              <h4 className="font-bold">Total Responses</h4>
              <p className="text-2xl">{analytics.totalResponses}</p>
            </div>
            <div>
              <h4 className="font-bold">Last Question</h4>
              <p>{analytics.lastQuestion || 'N/A'}</p>
            </div>
          </div>

          {/* QA History */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
              Your QA History
            </h3>

            {conversation.length === 0 && !isLoading && (
              <p className="text-gray-400 dark:text-gray-500">
                No QA history yet.
              </p>
            )}

            {conversation.map((item: any) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-2">
                  <AiOutlineUser className="mt-1 text-teal-500 dark:text-teal-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {item.query}
                    </p>
                    {renderFormattedResponse(item.response)}
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">
                      {format(new Date(item.created_at), 'PPP p')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
