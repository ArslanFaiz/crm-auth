'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Bell, Globe, Moon, Sun, Save } from 'lucide-react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { updateProfile } from '@/app/redux/userSlice';
import Profile from '../../../public/assets/profile.png';

export default function Setting() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user);

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(updateProfile({ image: imageUrl }));
    }
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'
      } shadow-sm rounded-xl p-6 overflow-y-auto`}
    >
      {/* Header */}
      <div className={`mb-6 border-b pb-4 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Manage your profile, preferences, and security.
        </p>
      </div>

      {/* Profile Section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="text"
                value={profile.name}
                onChange={(e) => dispatch(updateProfile({ name: e.target.value }))}
                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 border ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => dispatch(updateProfile({ email: e.target.value }))}
                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 border ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => dispatch(updateProfile({ phone: e.target.value }))}
                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 border ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              />
            </div>
          </div>

          {/* ✅ Profile Image or First Letter */}
          <div className="flex items-center gap-4 mt-2">
            {profile.image ? (
              <Image
                src={profile.image || Profile}
                alt="Profile"
                width={50}
                height={50}
                className="w-14 h-14 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-14 h-14 flex items-center justify-center rounded-full border border-slate-300 bg-teal-600 text-white text-xl font-semibold">
                {profile.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}

            <label className="text-teal-500 text-sm font-medium hover:underline cursor-pointer">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
        <div className="space-y-4">
          {/* Dark Mode */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg border transition ${
              darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="text-slate-200" size={18} />
              ) : (
                <Sun className="text-slate-700" size={18} />
              )}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-slate-500">
                  Switch between light and dark themes.
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full relative transition ${
                darkMode ? 'bg-teal-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition ${
                  darkMode ? 'translate-x-6' : ''
                }`}
              ></div>
            </button>
          </div>

          {/* Notifications */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg border transition ${
              darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bell className="text-slate-700 dark:text-slate-200" size={18} />
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-slate-500">
                  Enable or disable email notifications.
                </p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full relative transition ${
                notifications ? 'bg-teal-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition ${
                  notifications ? 'translate-x-6' : ''
                }`}
              ></div>
            </button>
          </div>

          {/* Language */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg border transition ${
              darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Globe className="text-slate-700 dark:text-slate-200" size={18} />
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-slate-500">
                  Choose your preferred language.
                </p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`rounded-lg px-3 py-1 focus:ring-2 focus:ring-teal-500 focus:outline-none border ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <option>English</option>
              <option>Urdu</option>
              <option>Arabic</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Password */}
          <div>
            <label className="text-sm font-medium mb-1 block">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="password"
                autoComplete="off"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 border ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm font-medium mb-1 block">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="password"
                autoComplete="off"
                value={passwords.newPass}
                onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 border ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium mb-1 block">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="password"
                autoComplete="off"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 border ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-teal-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-600 transition-colors"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
