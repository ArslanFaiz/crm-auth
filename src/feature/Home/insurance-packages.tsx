'use client';

import { Chrome as HomeIcon, MessageSquare, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { insuranceData } from '@/constants/InsuranceData';
import Image from 'next/image';
import logo from '../../../public/assets/logo.png';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/app/redux/store';

// ✅ Import your components
import Profile from './profile';
import Message from './message';
import Setting from './setting';

interface SignupData {
  firstName?: string;
  lastName?: string;
}

export default function InsurancePackages() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'settings' | 'packages'>('packages');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ✅ Get user from Redux
  const profileData = useAppSelector((state) => state.user);
  const [userName, setUserName] = useState('');

  // ✅ Load name from Redux or localStorage
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
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-[200px] bg-[#1C274C] text-white flex flex-col">
        <div className="p-6">
          <Image src={logo} alt="Logo" className="w-[200px] h-[24px]" />
        </div>

        <nav className="flex-1 py-2 px-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-6 py-4 text-left rounded-md transition-colors cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-[#3d5170]' : 'hover:bg-[#3d5170]'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-6 py-4 text-left rounded-md transition-colors cursor-pointer ${
              activeTab === 'messages' ? 'bg-[#3d5170]' : 'hover:bg-[#3d5170]'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-6 py-4 text-left rounded-md transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#3d5170]' : 'hover:bg-[#3d5170]'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        {/* ✅ User Info in Sidebar */}
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
              <div className="w-10 h-10 rounded-md bg-teal-600 from-cyan-400 to-blue-500 flex items-center justify-center text-sm font-semibold">
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

      {/* Main Content */}
      <main className="flex-1">
        {/* ✅ Header */}
        <header className="bg-[#1C274C] px-8 py-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-white">Welcome Back! {userName}</p>
          </div>
          <Link href="/">
            <Button className="gap-2 bg-[#008EB1] text-white cursor-pointer">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </Link>
        </header>

        {/* ✅ Main Area */}
        <div className="p-8 border rounded-tl-lg bg-white flex-1 min-h-[calc(100vh-80px)]">
          {activeTab === 'dashboard' && (
            <div className="h-full w-full">
              <Profile />
            </div>
          )}

          {/* Packages Section */}
          {activeTab === 'packages' && (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#1C1C1C] mb-2">
                  Latest Insurance Packages
                </h1>
                <p className="text-[#1C1C1C]">Select Your Desired & Good Package</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="p-6">
                      <h3
                        className={`text-xl font-semibold mb-2 ${
                          pkg.id === 1
                            ? 'text-teal-600'
                            : pkg.id === 2
                            ? 'text-green-600'
                            : 'text-gray-700'
                        }`}
                      >
                        {pkg.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        {pkg.description}
                      </p>
                      <div className="mb-4">
                        <p className="text-3xl font-bold text-cyan-500">
                          $ {pkg.price}
                        </p>
                      </div>

                      <label className="flex items-center justify-center gap-2 cursor-pointer w-full py-2.5 rounded-md border border-gray-400 transition-all">
                        <input
                          type="radio"
                          name="insurance"
                          value={pkg.id}
                          checked={selectedId === pkg.id}
                          onChange={() => setSelectedId(pkg.id)}
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

          {activeTab === 'messages' && (
            <div className="h-full w-full">
              <Message />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="h-full w-full">
              <Setting />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
