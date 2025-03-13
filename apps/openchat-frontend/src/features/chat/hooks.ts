import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useChat, Message } from '@ai-sdk/react';
import { ModelKey } from './types';

const CHAT_STORAGE_KEY = 'chat_messages';
const SELECTED_MODEL_STORAGE_KEY = "selectedModel";

export function useChatHook() {
  const { messages, setMessages, input, handleInputChange, handleSubmit } = useChat({
    api: 'http://localhost:8000/api/v1/chat',
    streamProtocol: 'text',
  });
  const queryClient = useQueryClient();

  const { data: storedMessages, isLoading, error } = useQuery<Message[]>({
    queryKey: [CHAT_STORAGE_KEY],
    queryFn: async () => {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (storedMessages && storedMessages.length > 0 && messages.length === 0) {
      setMessages(storedMessages);
    }
  }, [storedMessages, messages, setMessages]);


  useEffect(() => {
    if(messages.length > 0) localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const addMessageMutation = useMutation({
    mutationFn: async (newMessage: Message) => {
      const currentMessages = storedMessages || messages || [];
      const updatedMessages = [...currentMessages, newMessage];
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedMessages));
      return updatedMessages;
    },
    onSuccess: (updatedMessages: Message[]) => {
      queryClient.setQueryData([CHAT_STORAGE_KEY], updatedMessages);
      setMessages(updatedMessages);
    },
  });

  const addMessage = (message: Message) => {
    addMessageMutation.mutate(message);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    addMessage,
    isLoading,
    error,
  };
};

export function useSelectedModel() {
  const { data: selectedModel, refetch } = useQuery({
    queryKey: [SELECTED_MODEL_STORAGE_KEY],
    queryFn: () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(SELECTED_MODEL_STORAGE_KEY);
        return stored ? (stored as ModelKey) : "meta-llama/Llama-3.3-70B-Instruct-Turbo";
      }
      return "meta-llama/Llama-3.3-70B-Instruct-Turbo";
    }
  });

  const setSelectedModelMutation = useMutation({
    mutationFn: async (model: ModelKey) => {
      console.log('set a new model: ', model);
      if (typeof window !== "undefined") {
        localStorage.setItem(SELECTED_MODEL_STORAGE_KEY, model);
      }
      return model;
    },
    onSuccess: () => refetch() 
});

  const setSelectedModel = (model: ModelKey) => {
    setSelectedModelMutation.mutate(model);
  };

  return {
    selectedModel,
    setSelectedModel,
  };
}
