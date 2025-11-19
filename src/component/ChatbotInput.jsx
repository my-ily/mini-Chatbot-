import { useState } from 'react';

function ChatbotInput({ onSend, disabled = false }) {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (disabled || !input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Message bot..."
        onChange={(event) => setInput(event.target.value)}
        value={input}
        disabled={disabled}
        className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100 disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {disabled ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}

export default ChatbotInput;