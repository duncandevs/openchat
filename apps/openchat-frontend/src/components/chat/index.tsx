'use client';
import { Flex } from '../common/flex-box';
import ReactMarkdown from "react-markdown";
import { PromptTextarea } from '../common/prompt-textarea';
import { useCallback } from 'react';
import { useChatHook, useSelectedModel } from '@/features/chat/hooks';
import { Text } from '../typography';
import { Avatar } from '../common/avatar';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChatHook();
    const { selectedModel } = useSelectedModel();

    const onSubmit = useCallback(() => {
        handleSubmit({ preventDefault: ()=> null }, { data: { 
            prompt: input,
            model: selectedModel as string
        }});
    }, [selectedModel, input, handleSubmit]);

    return (
        <div className='h-full'>
            <Flex col className='w-full h-full'>
                <Flex className='mb-72' col>
                    {messages.map(message => (
                        <Flex col key={message.id}>
                            {message.role === 'user' ? 
                            <Flex>                      
                                <Avatar />
                                <Flex className='bg-gray-200 min-w-48 w-fit p-4 rounded-[24px] dark:bg-gray-700'>
                                    <Text>{message.content}</Text>
                                </Flex>
                            </Flex> : 
                            <Flex col className='markdown'>
                                <ReactMarkdown>
                                    {message.content}
                                </ReactMarkdown>
                            </Flex>}
                        </Flex>
                    ))}
                </Flex>
                <Flex col className='w-[800px] h-full m-auto'>
                    <div className='fixed w-[800px] pt-8 bottom-0 bg-white dark:bg-[#1B1B1B]'>
                        <PromptTextarea 
                            value={input} 
                            className='m-auto mb-12 mt-1'
                            onChange={handleInputChange} 
                            onSubmit={onSubmit} 
                        />
                    </div>
                </Flex>
            </Flex>
        </div>
    );
};
