'use client';

import { Chrome as HomeIcon, MessageSquare, Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { insuranceData } from '@/constants/InsuranceData';
import Image from 'next/image';
import logo from '../../../public/assets/logo.png';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/app/redux/store';

import Profile from './profile';
import Message from './message';
import Setting from './setting';
import { Thankyou } from './thankyou';
import Avatar from './avatar'

interface SignupData {
  firstName?: string;
  lastName?: string;
}

export default function InsurancePackages() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'settings' | 'packages' | 'avatar'>('packages');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const profileData = useAppSelector((state) => state.user);
  const [userName, setUserName] = useState('');
  const [showThankyou, setShowThankyou] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedData =
      typeof window !== 'undefined' ? localStorage.getItem('signup') : null;
    let parsedData: SignupData = {};
    if (storedData) parsedData = JSON.parse(storedData);

    const nameFromRedux = profileData?.name;
    const nameFromStorage = parsedData?.firstName
      ? `${parsedData.firstName} ${parsedData.lastName || ''}`.trim()
      : null;

    if (nameFromRedux) {
      setUserName(nameFromRedux);
    } else if (nameFromStorage) {
      setUserName(nameFromStorage);
    }
  }, [profileData]);

  const firstLetter = userName?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`bg-[#1C274C] text-white flex flex-col w-full md:w-[200px] fixed md:static z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 flex justify-between items-center md:block">
          <Image src={logo} alt="Logo" className="w-[150px] h-[20px] md:w-[200px] md:h-[24px]" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white md:hidden text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 py-2 px-2 md:px-4">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 md:px-6 py-3 text-left rounded-md transition-colors cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-[#3d5170]' : 'hover:bg-[#3d5170]'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('messages');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 md:px-6 py-3 text-left rounded-md transition-colors cursor-pointer ${
              activeTab === 'messages' ? 'bg-[#3d5170]' : 'hover:bg-[#3d5170]'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('settings');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 md:px-6 py-3 text-left rounded-md transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#3d5170]' : 'hover:bg-[#3d5170]'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>

          {/* ✅ New Avatar tab */}
          <button
            onClick={() => {
              setActiveTab('avatar');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 md:px-6 py-3 text-left rounded-md transition-colors cursor-pointer ${
              activeTab === 'avatar' ? 'bg-[#3d5170]' : 'hover:bg-[#3d5170]'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Avatar</span>
          </button>
        </nav>

        <div className="p-4 border-t border-[#3d5170]">
          <div className="flex items-center gap-3 mb-4">
            {profileData?.image ? (
              <Image
                src={profileData.image}
                alt={userName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-md object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-md bg-teal-600 flex items-center justify-center text-sm font-semibold">
                {firstLetter}
              </div>
            )}
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-400">Premium</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 relative md:ml-0">
        <Thankyou isOpen={showThankyou} onClose={() => setShowThankyou(false)} />

        {/* Header */}
        <header className="bg-[#1C274C] px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white text-2xl md:hidden"
            >
              ☰
            </button>
            <p className="text-sm md:text-base text-white">
              Welcome Back! {userName}
            </p>
          </div>
          <Link href="/">
            <Button className="gap-2 bg-[#008EB1] text-white cursor-pointer px-3 py-1.5 md:px-4 md:py-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </Link>
        </header>

        {/* Content */}
        <div className="bg-white flex-1 min-h-[calc(100vh-80px)]">
          {activeTab === 'dashboard' && <Profile />}

          {activeTab === 'packages' && (
            <>
              <div className="px-4 md:px-8 py-3 md:py-4">
                <h1 className="text-2xl md:text-4xl font-bold text-[#1C1C1C] mb-1">
                  Latest Insurance Packages
                </h1>
                <p className="text-sm md:text-base text-[#1C1C1C]">
                  Select Your Desired & Good Package
                </p>
              </div>

              <div className="grid px-4 md:px-8 pb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {insuranceData.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[4/2] overflow-hidden relative">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <h3
                        className={`text-lg md:text-xl font-semibold mb-2 ${
                          pkg.id === 1
                            ? 'text-teal-600'
                            : pkg.id === 2
                            ? 'text-green-600'
                            : 'text-gray-700'
                        }`}
                      >
                        {pkg.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 md:mb-6 leading-relaxed">
                        {pkg.description}
                      </p>
                      <div className="mb-3 md:mb-4">
                        <p className="text-2xl md:text-3xl font-bold text-cyan-500">
                          $ {pkg.price}
                        </p>
                      </div>

                      <label className="flex items-center justify-center gap-2 cursor-pointer w-full py-2.5 rounded-md border border-gray-400 transition-all">
                        <input
                          type="radio"
                          name="insurance"
                          value={pkg.id}
                          checked={selectedId === pkg.id}
                          onChange={() => {
                            setSelectedId(pkg.id);
                            setShowThankyou(true);
                            setTimeout(() => setShowThankyou(false), 3000);
                          }}
                          className={`w-4 h-4 cursor-pointer ${
                            selectedId === pkg.id
                              ? 'accent-[#008EB1]'
                              : 'accent-gray-600'
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            selectedId === pkg.id
                              ? 'text-[#1C1C1C]'
                              : 'text-gray-700'
                          }`}
                        >
                          Select
                        </span>
                      </label>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === 'messages' && <Message />}
          {activeTab === 'settings' && <Setting />}
          {activeTab === 'avatar' && <Avatar />} {/* ✅ New tab render */}
        </div>
      </main>
    </div>
  );
}
