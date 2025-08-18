type Message = {
  from?: 'me' | 'ai';
  type?: 'income' | 'expense' | 'text';
  text: string;
  amount?: number;
};

export default function MessageBubble({ message }: { message: Message }) {
  const { from, type, text, amount } = message;
  const isMe = from === 'me';

  const base = `inline-block px-4 py-2 rounded-lg max-w-[70%] break-words`;

  let style = 'bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100';
  if (type === 'income') style = 'bg-gradient-to-r from-green-100 to-green-50 border border-green-200 text-green-900';
  if (type === 'expense') style = 'bg-red-50 border border-red-200 text-red-900';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col items-${isMe ? 'end' : 'start'} space-y-2`}> 
        <div className={`${base} ${style} ${isMe ? 'rounded-br-none' : 'rounded-bl-none'}`}>
          <div className="whitespace-pre-wrap">{text}</div>
        </div>

        {type === 'expense' && amount ? (
          <div className={`mt-0 ${isMe ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center space-x-2 px-3 py-2 bg-red-100 border border-red-200 rounded-lg">
              <div className="text-sm font-semibold text-red-700">-${amount.toFixed(2)}</div>
              <div className="text-xs text-red-500">Expense</div>
            </div>
          </div>
        ) : null}

        {type === 'income' && amount ? (
          <div className={`mt-0 ${isMe ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center space-x-2 px-3 py-2 bg-green-100 border border-green-200 rounded-lg">
              <div className="text-sm font-semibold text-green-700">+${amount.toFixed(2)}</div>
              <div className="text-xs text-green-500">Income</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
