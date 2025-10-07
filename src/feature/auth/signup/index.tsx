'use client';

import { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Lock } from 'lucide-react';
import { Button } from '@/components';
import { Input } from '@/components';
import { Label } from '@/components';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/assets/logo.png';
import {
  ALREADY_HAVE_ACCOUNT,
  CONTINUE_WITH_CLICK,
  FOR_SMOKER,
  LOGIN_CONTENT,
  OUR_INSURANCE_POLICIES,
  PLEASE_LOGIN,
  POLICY_CONTENT,
  PRIVACY_POLICY,
  SIGNUP_CONTENT,
  SMART_CHOICE,
  TERMS_AND_CONDITIONS,
  WELCOME_BACK,
} from '@/constants/content';
import { useAppDispatch } from '@/app/redux/store';
import { updateProfile } from '@/app/redux/userSlice';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    age: '',
    zipCode: '',
    smoker: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSmokerChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      smoker: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(updateProfile({
      name: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
    }));
    localStorage.setItem('signupData', JSON.stringify(formData));
    console.log('Signup data saved to Redux:', formData);
    router.push('/'); 
  };

  return (
    <div className="h-screen min-h-screen flex flex-col lg:flex-row p-5 gap-5">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 relative overflow-hidden rounded-[12px] min-h-[250px]">
        <Image
          src="/assets/insurance.jpg"
          alt="Insurance"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="flex flex-col justify-between items-start p-4 sm:p-6 md:p-10 lg:p-12 text-white relative z-10 h-full bg-black/40">
          <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-5 leading-tight">
            {OUR_INSURANCE_POLICIES} <br />
            {SMART_CHOICE}
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-xs sm:max-w-sm md:max-w-md">
            {POLICY_CONTENT}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 bg-white rounded-[12px]">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6 md:mb-8">
            <Image src={logo} alt="Company Logo" width={300} height={40} className="mx-auto" />
          </div>

          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-2xl md:text-[40px] font-poppins text-[#3C3C3C] font-bold mb-2">
              {WELCOME_BACK}
            </h3>
            <p className="text-[#1C1C1C] text-sm md:text-base">{PLEASE_LOGIN}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Your Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="pl-10 h-11 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 text-sm"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="pl-10 h-11 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 text-sm"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className="pl-10 h-11 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 text-sm"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 h-11 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  name="age"
                  placeholder="Enter Your Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="pl-10 h-11 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 text-sm"
                  required
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  name="zipCode"
                  placeholder="Area Zip Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="pl-10 h-11 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 text-sm"
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Label className="text-sm font-medium text-[#03A765]">{FOR_SMOKER}</Label>
              <RadioGroup
                value={formData.smoker}
                onValueChange={handleSmokerChange}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="yes"
                    id="yes"
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <Label htmlFor="yes" className="text-sm text-gray-600 cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="no"
                    id="no"
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <Label htmlFor="no" className="text-sm text-gray-600 cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="text-center text-xs text-gray-500 leading-relaxed">
              {CONTINUE_WITH_CLICK}{' '}
              <a href="#" className="text-[#1C1C1C] hover:text-green-600 font-medium">
                {TERMS_AND_CONDITIONS}
              </a>{' '}
              With{' '}
              <a href="#" className="text-[#1C1C1C] hover:text-green-600 font-medium">
                {PRIVACY_POLICY}
              </a>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-[#03A765] hover:bg-green-600 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {SIGNUP_CONTENT}
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {ALREADY_HAVE_ACCOUNT}{' '}
                <Link href="/" className="text-[#008EB1] font-medium transition-colors">
                  {LOGIN_CONTENT}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
