export default function ChatMessage({ messages }) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';
        return (
          <article
            key={msg.id}
            className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-500">
              {isUser ? 'You' : 'bot'}
            </div>
            <div className={`${isUser ? 'items-end flex flex-col' : 'items-start flex flex-col'}`}>
              <p className={`text-xs font-semibold uppercase tracking-wide ${isUser ? 'text-right text-slate-400' : 'text-left text-slate-400'}`}>
                {isUser ? 'You' : 'bot'}
              </p>
              <p
                className={`mt-2 w-full max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-slate-900 text-slate-100 text-right ml-auto'
                    : 'bg-violet-100 text-slate-800 text-left mr-auto'
                }`}
              >
                {msg.message}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
