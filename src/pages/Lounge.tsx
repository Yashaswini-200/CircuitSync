/**
 * Lounge page — simplified to bubble chat only
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';

const initialMessages = [
  { id: '1', sender: 'Pixel', text: 'What’s the best move for this week?', time: 'Now' },
  { id: '2', sender: 'Nova', text: 'Anyone up for a retro challenge?', time: '1m ago' },
];

const Lounge = () => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      { id: String(Date.now()), sender: 'You', text: chatInput.trim(), time: 'Just now' },
      ...prev,
    ]);
    setChatInput('');
  };

  return (
    <MainLayout>
      <PageShell title="Lounge" description="Bubble chat" accent="purple">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 transition-all duration-300"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Chat</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Bubble chat</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              <span>Live</span>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-gray-400" htmlFor="lounge-chat">
                Say something
              </label>
              <textarea
                id="lounge-chat"
                rows={3}
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                className="input resize-none"
                placeholder="Type a message and press send..."
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-400">Your words become speech bubbles in the lounge.</div>
              <button className="btn btn-primary" onClick={handleSendMessage} disabled={!chatInput.trim()}>
                Send
              </button>
            </div>

            <div className="space-y-3 pt-4">
              {messages.map((message) => (
                <div key={message.id} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-semibold text-white">{message.sender}</span>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="mt-2 text-gray-300">{message.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </PageShell>
    </MainLayout>
  );
};

export default Lounge;
