'use client';

import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, Paperclip, Smile, Send, Trash2 } from 'lucide-react';
import { useAppSelector } from '@/app/redux/store';
import Image from 'next/image';

type MessageType = {
  sender: 'me' | 'them';
  text: string;
  time: string;
};

type ContactType = {
  id: number;
  name: string;
  avatar: string;
  messages: MessageType[];
  active: boolean;
};

export default function Message() {
  const profile = useAppSelector((state) => state.user);
  const firstLetter = profile?.name?.charAt(0).toUpperCase() || 'U';

  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [activeContactId, setActiveContactId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('chatContacts');
    if (stored) setContacts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('chatContacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    if (profile?.name) {
      setContacts((prev) => {
        const alreadyExists = prev.some((c) => c.name === profile.name);
        if (alreadyExists) return prev;

        return [
          {
            id: Date.now(),
            name: profile.name ?? '',
            avatar: profile?.image || '',
            active: true,
            messages: [
              { sender: 'me', text: 'Hey! This is my new account 😄', time: 'Just now' },
              { sender: 'them', text: 'Hi! I’m your AI chat buddy 🤖', time: 'Just now' },
            ],
          },
          ...prev,
        ];
      });
    }
  }, [profile]);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeContact = contacts.find((c) => c.id === activeContactId);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeContactId) return;

    const messageText = newMessage;
    setNewMessage('');

    // Add user message
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContactId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { sender: 'me', text: messageText, time: 'Just now' },
              ],
            }
          : c
      )
    );

    // Simulated AI reply after a short delay
    setTimeout(() => {
      const reply = getAIReply(messageText);
      setContacts((prev) =>
        prev.map((c) =>
          c.id === activeContactId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { sender: 'them', text: reply, time: 'Just now' },
                ],
              }
            : c
        )
      );
    }, 1200);
  };

  // 🔹 Simple AI reply generator
  const getAIReply = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes('hello') || text.includes('hi')) {
      return 'Hello! 👋 How are you today?';
    } else if (text.includes('how are you')) {
      return "I'm just a bot, but I'm feeling great 😄 What about you?";
    } else if (text.includes('your name')) {
      return "I'm your AI assistant 🤖 — here to chat with you!";
    } else if (text.includes('bye')) {
      return 'Goodbye! 👋 Talk to you soon.';
    } else if (text.includes('thanks')) {
      return "You're very welcome 😊";
    } else {
      // default random replies
      const replies = [
        "That's interesting! Tell me more.",
        "Hmm 🤔 I see what you mean.",
        "Really? That’s cool!",
        "I’m listening 👂 go on...",
        "Haha 😄 that’s funny!",
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }
  };

  const handleDeleteChat = (id: number) => {
    if (confirm('Are you sure you want to delete this chat?')) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (activeContactId === id) setActiveContactId(null);
      setShowDeleteMenu(false);
    }
  };

  return (
    <div className='p-8'>
    <div className="h-full flex bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          {profile?.image ? (
            <Image
              src={profile.image}
              alt={profile.name || 'User'}
              className="w-10 h-10 rounded-full object-cover"
              width={40}
              height={40}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
              {firstLetter}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-slate-800">{profile?.name || 'User'}</h3>
            <p className="text-xs text-slate-500">Online</p>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveContactId(contact.id)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-slate-50 border-b border-slate-100 ${
                activeContactId === contact.id ? 'bg-slate-50' : ''
              }`}
            >
              {contact.avatar ? (
                <Image
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-slate-800 truncate">{contact.name}</h4>
                  <span className="text-xs text-slate-500">
                    {contact.messages[contact.messages.length - 1]?.time}
                  </span>
                </div>
                <p className="text-sm truncate text-slate-500">
                  {contact.messages[contact.messages.length - 1]?.text}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col relative">
        {activeContact ? (
          <>
            <div className="p-4 border-b border-slate-200 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                {activeContact.avatar ? (
                  <Image
                    src={activeContact.avatar}
                    alt={activeContact.name}
                    className="w-10 h-10 rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                    {activeContact.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-slate-800">{activeContact.name}</h3>
                  <p className="text-xs text-teal-600">Active now</p>
                </div>
              </div>

              <div className="relative">
                <button
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  onClick={() => setShowDeleteMenu(!showDeleteMenu)}
                >
                  <MoreVertical size={20} className="text-slate-600" />
                </button>

                {showDeleteMenu && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleDeleteChat(activeContact.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-50 w-full"
                    >
                      <Trash2 size={16} /> Delete Chat
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeContact.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-md">
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-teal-500 text-white rounded-tr-sm'
                          : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span
                      className={`text-xs text-slate-500 mt-1 block px-2 ${
                        msg.sender === 'me' ? 'text-right' : ''
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200">
              <div className="flex items-end gap-3">
                <div className="flex-1 bg-slate-50 rounded-lg border border-slate-200 focus-within:border-teal-500 transition-colors">
                  <textarea
                    placeholder="Type your message here..."
                    rows={1}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full px-4 py-3 bg-transparent resize-none focus:outline-none text-slate-800"
                  />
                  <div className="px-3 pb-2 flex items-center gap-2">
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <Paperclip size={18} className="text-slate-600" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <Smile size={18} className="text-slate-600" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
