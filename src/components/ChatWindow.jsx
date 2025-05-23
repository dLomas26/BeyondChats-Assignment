import { useState, useRef, useEffect } from 'react';
import { formatTime, suggestions, getAIResponse } from '../data/mockData';
import { IoMenuOutline, IoSendSharp, IoPaperPlaneOutline, IoAttachOutline, IoHappyOutline } from 'react-icons/io5';
import clsx from 'clsx';

function ChatWindow({ conversation, onToggleSidebar, sidebarOpen }) {
  const [newMessage, setNewMessage] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState(conversation.messages);
  
  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatMessageContent = (content) => {
    return content.split('\n').map((line, i) => {
      // Handle bold text
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      
      return <p key={i} className="mb-2">{formattedParts}</p>;
    });
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: `msg-${messages.length + 1}`,
      sender: 'agent',
      content: newMessage,
      timestamp: new Date(),
      status: 'sent'
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');

    // AI recommendation after user message
    setTimeout(() => {
      const aiResponse = getAIResponse(newMessage);
      const aiMsg = {
        id: `msg-${messages.length + 2}`,
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        status: 'sent'
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const handleAIQuery = (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const response = getAIResponse(aiQuery);
    const newMsg = {
      id: `msg-${messages.length + 1}`,
      sender: 'ai',
      content: response,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages([...messages, newMsg]);
    setAiQuery('');
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex flex-1">
      <div className="flex-1 flex flex-col bg-gray-50 relative">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* {!sidebarOpen && (
              <button 
                className="mr-4 text-gray-500 hover:text-gray-700"
                onClick={onToggleSidebar}
              >
                <IoMenuOutline className="h-5 w-5" />
              </button>
            )} */}
            <div className="flex items-center">
              {conversation.customer.avatar ? (
                <img 
                  src={conversation.customer.avatar} 
                  alt={conversation.customer.name} 
                  className="h-10 w-10 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-medium">
                    {conversation.customer.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {conversation.customer.name}
                </h2>
                {conversation.customer.company && (
                  <p className="text-sm text-gray-500">
                    {conversation.customer.company}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin p-4">
            <div className="space-y-4 mb-4">
              {messages.map((message) => (
                <div key={message.id} className={clsx(
                  "animate-fade-in",
                  message.sender === 'customer' && "flex justify-start",
                  message.sender === 'agent' && "flex justify-end",
                  message.sender === 'ai' && "flex justify-start"
                )}>
                  <div className={clsx(
                    "chat-bubble",
                    message.sender === 'customer' && "chat-bubble-customer",
                    message.sender === 'agent' && "chat-bubble-agent",
                    message.sender === 'ai' && "chat-bubble-ai"
                  )}>
                    <div className="flex items-start">
                      {message.sender === 'ai' && (
                        <div className="flex-shrink-0 mr-3">
                          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-medium text-xs">AI</span>
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="whitespace-pre-line">
                          {formatMessageContent(message.content)}
                        </div>
                        <div className="mt-1 text-xs text-gray-500 flex items-center">
                          {message.sender === 'agent' && message.status === 'seen' && (
                            <span className="mr-1">Seen · </span>
                          )}
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="w-80 border-l border-gray-200 bg-white p-4 overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">AI Copilot</h3>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                  <span className="text-primary-600 font-medium text-xs">AI</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Hi, I'm Fin AI Copilot</h4>
                  <p className="text-sm text-gray-500">Ask me anything about this conversation.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested</h4>
              <div className="space-y-2">
                {suggestions.map(suggestion => (
                  <div 
                    key={suggestion.id}
                    className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => setAiQuery(suggestion.content)}
                  >
                    {suggestion.content}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-52">
              <form onSubmit={handleAIQuery} className="relative">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask a question..."
                  className="block w-full border border-gray-300 rounded-lg pl-3 pr-10 py-5 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <IoPaperPlaneOutline className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                className="block w-full border border-gray-300 rounded-lg pl-3 pr-3 py-2 text-sm resize-none min-h-[70px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
              />
              <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <IoAttachOutline className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <IoHappyOutline className="h-5 w-5" />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newMessage.trim()}
            >
              <IoSendSharp className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;