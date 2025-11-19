import { useState } from 'react';
import ChatbotInput from './component/ChatbotInput';
import ChatMessage from './component/ChatMessage';
import SidebarContainer from './component/SidebarContainer';

const API_URL = 'https://api.hooklistener.com/w/long-blush-mammal-wnoy';

const initialMessages = [
  {
    sender: 'user',
    message: 'Hi 👋',
    id: 1,
  },
  {
    sender: 'bot',
    message: 'Hey there! Need help prototyping today?',
    id: 2,
  },
];

function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

// setInterval(() => {
//   setIsLoading(true)
// }, 1000);
  // uniqe id 
    const nextId = new Date().getTime();


    //User Message
    const userMessage = {
      sender: 'user',
      message: trimmed,
      id: nextId,
    };


         //update
    setMessages((prev) => [...prev, userMessage]);

// loading after send so we can get response 


    setIsLoading(true);


    // fetch api 
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      // استخراج الرد من النتيجة (حسب شكل الرد من API)
      // قد يكون الرد في result.message أو result.response أو result.text
      const botReply = result.message || result.response || result.text || JSON.stringify(result);
      

      // bot Message
      const botMessage = {
        sender: 'bot',
        message: botReply,
        id: nextId + 1,
      };


      //update
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching bot reply:', error);
      


  // error bot Message
      const errorMessage = {
        sender: 'bot',
        message: 'Sorry, there was an error getting a response. Please try again.',
        id: nextId + 1,
      };


      //update
      setMessages((prev) => [...prev, errorMessage]);
    } 
    
    // done and get the msg
    
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <SidebarContainer>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Recent messages
            </p>
            <p className="text-sm text-slate-500">Glance over the current chat context.</p>
          </div>
          <ul className="space-y-3">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm shadow-sm"
              >
                <p className="font-semibold text-slate-700">{msg.sender === 'user' ? 'You' : 'Bot'}</p>
                <p className="mt-1 text-slate-500">{msg.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </SidebarContainer>

      <div className="mx-auto flex max-w-3xl flex-col rounded-3xl border border-slate-100 bg-white shadow-xl overflow-hidden">
          <header className="border-b border-slate-100 p-6 flex-shrink-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
              bot assistant
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">assistant</h1>
            <p className="mt-1 text-sm text-slate-500">
              Explore tone, persona, and scenarios before writing real prompts.
            </p>
          </header>


       
        <main className="flex-1 p-6 overflow-y-auto">
          <ChatMessage messages={messages} />
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-4">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet-500 border-t-transparent"></div>
              <span>Bot is typing...</span>
            </div>
          )}
        </main>
        <footer className="border-t border-slate-100 p-6 flex-shrink-0">
          <ChatbotInput onSend={handleSendMessage} disabled={isLoading} />
        </footer>
      </div>
    </div>
  );
}

export default App;
