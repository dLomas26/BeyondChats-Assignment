import { useState } from 'react';
import { formatTime } from '../data/mockData';
import { IoMenuOutline, IoSearch, IoFilterOutline } from 'react-icons/io5';
import clsx from 'clsx';

function Sidebar({ conversations, activeConversation, onConversationSelect, isOpen, onToggle }) {
  const [filterStatus, setFilterStatus] = useState('open');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = conversations.filter(conversation => {
    // Filter by status
    if (filterStatus && conversation.status !== filterStatus) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        conversation.customer.name.toLowerCase().includes(query) ||
        conversation.subject.toLowerCase().includes(query) ||
        conversation.snippet.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className={clsx(
      "border-r border-gray-200 flex flex-col bg-white transition-all duration-300",
      isOpen ? "w-80" : "w-0 md:w-16"
    )}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {isOpen ? (
          <>
            <h2 className="text-lg font-medium text-gray-900">Your inbox</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{filterStatus === 'open' ? '5 Open' : 'Waiting longest'}</span>
              <button 
                className="text-gray-500 hover:text-gray-700" 
                onClick={onToggle}
              >
                <IoMenuOutline className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : (
          <button 
            className="text-gray-500 hover:text-gray-700 mx-auto" 
            onClick={onToggle}
          >
            <IoMenuOutline className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {isOpen && (
        <>
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search conversations..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  className={clsx(
                    "px-3 py-1 text-xs font-medium rounded-full",
                    filterStatus === 'open' 
                      ? "bg-primary-100 text-primary-800" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                  onClick={() => setFilterStatus('open')}
                >
                  Open
                </button>
                <button
                  className={clsx(
                    "px-3 py-1 text-xs font-medium rounded-full",
                    filterStatus === 'closed' 
                      ? "bg-primary-100 text-primary-800" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                  onClick={() => setFilterStatus('closed')}
                >
                  Closed
                </button>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <IoFilterOutline className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                className={clsx(
                  "p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors",
                  activeConversation.id === conversation.id && "bg-primary-50 border-l-4 border-l-primary-500"
                )}
                onClick={() => onConversationSelect(conversation)}
              >
                <div className="flex items-start">
                  <div className="relative mr-3 flex-shrink-0">
                    {conversation.customer.avatar ? (
                      <img 
                        src={conversation.customer.avatar} 
                        alt={conversation.customer.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-sm">
                          {conversation.customer.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    {conversation.unread && (
                      <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-primary-500 ring-2 ring-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.customer.name}
                        {conversation.customer.company && ` - ${conversation.customer.company}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTime(conversation.lastMessage)}
                      </p>
                    </div>
                    <p className={clsx(
                      "text-sm truncate",
                      conversation.unread ? "text-gray-900 font-medium" : "text-gray-500"
                    )}>
                      {conversation.snippet}
                    </p>
                    {conversation.priority === 'high' && (
                      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-error-50 text-error-600">
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;