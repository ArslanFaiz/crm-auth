'use client';

import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, Paperclip, Smile, Send, Trash2, Menu } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContactId
          ? {
              ...c,
              messages: [...c.messages, { sender: 'me', text: messageText, time: 'Just now' }],
            }
          : c
      )
    );

    setTimeout(() => {
      const reply = getAIReply(messageText);
      setContacts((prev) =>
        prev.map((c) =>
          c.id === activeContactId
            ? {
                ...c,
                messages: [...c.messages, { sender: 'them', text: reply, time: 'Just now' }],
              }
            : c
        )
      );
    }, 1200);
  };

  const getAIReply = (userText: string): string => {
    const text = userText.toLowerCase();
    if (text.includes('hello') || text.includes('hi')) return 'Hello! 👋 How are you today?';
    if (text.includes('how are you')) return "I'm just a bot, but I'm feeling great 😄 What about you?";
    if (text.includes('your name')) return "I'm your AI assistant 🤖 — here to chat with you!";
    if (text.includes('bye')) return 'Goodbye! 👋 Talk to you soon.';
    if (text.includes('thanks')) return "You're very welcome 😊";
    const replies = [
      "That's interesting! Tell me more.",
      "Hmm 🤔 I see what you mean.",
      "Really? That’s cool!",
      "I’m listening 👂 go on...",
      "Haha 😄 that’s funny!",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleDeleteChat = (id: number) => {
    if (confirm('Are you sure you want to delete this chat?')) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (activeContactId === id) setActiveContactId(null);
      setShowDeleteMenu(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full h-full">
      <div className="h-[85vh] flex flex-col md:flex-row bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed md:static inset-0 md:inset-auto z-40 w-72 md:w-80 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
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
                <h3 className="font-semibold text-slate-800 text-sm md:text-base">{profile?.name || 'User'}</h3>
                <p className="text-xs text-slate-500">Online</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-600 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          <div className="p-3 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => {
                  setActiveContactId(contact.id);
                  setSidebarOpen(false);
                }}
                className={`w-full p-3 md:p-4 flex items-start gap-3 hover:bg-slate-50 border-b border-slate-100 ${
                  activeContactId === contact.id ? 'bg-slate-50' : ''
                }`}
              >
                {contact.avatar ? (
                  <Image
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-slate-800 truncate text-sm md:text-base">
                      {contact.name}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {contact.messages[contact.messages.length - 1]?.time}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm truncate text-slate-500">
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
              {/* Header */}
              <div className="p-3 md:p-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden text-slate-700"
                  >
                    <Menu size={22} />
                  </button>

                  {activeContact.avatar ? (
                    <Image
                      src={activeContact.avatar}
                      alt={activeContact.name}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                      {activeContact.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm md:text-base">{activeContact.name}</h3>
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
                    <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-30">
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

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50">
                {activeContact.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-[80%] sm:max-w-md">
                      <div
                        className={`px-3 md:px-4 py-2 md:py-3 rounded-2xl ${
                          msg.sender === 'me'
                            ? 'bg-teal-500 text-white rounded-tr-sm'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                        }`}
                      >
                        <p className="text-sm md:text-base">{msg.text}</p>
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

              {/* Message Input */}
              <div className="p-3 md:p-4 border-t border-slate-200 bg-white">
                <div className="flex items-end gap-2 md:gap-3">
                  <div className="flex-1 bg-slate-50 rounded-lg border border-slate-200 focus-within:border-teal-500 transition-colors">
                    <textarea
                      placeholder="Type your message..."
                      rows={1}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-transparent resize-none focus:outline-none text-slate-800 text-sm md:text-base"
                    />
                    <div className="px-2 md:px-3 pb-2 flex items-center gap-2">
                      <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
                        <Paperclip size={18} className="text-slate-600" />
                      </button>
                      <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
                        <Smile size={18} className="text-slate-600" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 md:p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3 bg-slate-50">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden bg-teal-500 text-white px-4 py-2 rounded-lg"
              >
                Open Chats
              </button>
              <p className="text-sm md:text-base text-center">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
