import { useMutation, useQuery, useQueryClient } from 'react-query';
import { notify } from '../components/Toast';
import axiosClient from '../services/axios';

// POST: Ask AI

export const useAskAI = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { query: string }) => {
      if (!payload.query.trim()) {
        throw new Error('Question cannot be empty.');
      }
      const res = await axiosClient.post('travel/advice', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['aiConversation']);
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to ask AI.';
      notify(msg, 'error');
    },
  });
};

// G Fetch AI conversation

export const useGetAIConversation = () => {
  const result = useQuery(
    ['aiConversation'],
    async () => {
      const res = await axiosClient.get('travel/history');
      return res.data;
    },
    {
      refetchInterval: 100000,
    }
  );

  return {
    ...result,
    conversation: result.data || [],
  };
};

// G Fetch AI conversation

export const useGetAIConversation2 = () => {
  const result = useQuery(['aiConversation'], async () => {
    const res = await axiosClient.get('travel/history');
    return res.data;
  });

  return {
    ...result,
    conversation: result.data || [],
  };
};
