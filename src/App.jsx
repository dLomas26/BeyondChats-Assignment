import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import { conversations } from './data/mockData'

function App() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation)
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  return (
     <div className="h-full flex flex-col bg-white">
    {/* //   <header className="bg-white border-b border-gray-200 px-4 py-3">
    //     <div className="flex items-center">
    //       <h1 className="text-xl font-semibold text-gray-900">Customer Support</h1>
    //     </div>
    //   </header> */}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          conversations={conversations} 
          activeConversation={activeConversation}
          onConversationSelect={handleConversationSelect}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <ChatWindow 
          conversation={activeConversation} 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </div>
  )
}

export default App