'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { Button } from '@/components';
import { Input } from '@/components';
import { Label } from '@/components';
import { Checkbox } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/assets/logo.png';
import { useRouter } from 'next/navigation';
import {
  CONTINUE_WITH,
  CREATE_ACCOUNT,
  DONT_HAVE_ACCOUNT,
  FORGOT_PASSWORD,
  LOGIN_CONTENT,
  OUR_INSURANCE_POLICIES,
  PLEASE_LOGIN,
  POLICY_CONTENT,
  REMEMBER_ME,
  SMART_CHOICE,
  WELCOME_BACK,
} from '@/constants/content';
import { useAppSelector } from '@/app/redux/store';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  // 🔹 Autofill email from Redux or localStorage
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || '',
      }));
    } else {
      const stored = localStorage.getItem('signupData');
      if (stored) {
        const parsed = JSON.parse(stored);
        setFormData((prev) => ({
          ...prev,
          email: parsed.emailAddress || '',
        }));
      }
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 🔹 Validation function
  const validDataform = () => {
    const errors: { email?: string; password?: string } = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validDataform();

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));

    router.push('/insurancePackages');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row p-5 gap-5 bg-white">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 relative overflow-hidden rounded-[12px] min-h-[250px]">
        <Image
          src="/assets/insurance.jpg"
          alt="Insurance"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-between items-start px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8 md:py-12 bg-black/40 text-white">
          <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-5 leading-tight">
            {OUR_INSURANCE_POLICIES} <br />
            {SMART_CHOICE}
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-xs sm:max-w-sm md:max-w-md">
            {POLICY_CONTENT}
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 bg-white rounded-[12px]">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 md:mb-8">
            <Image src={logo} alt="Company Logo" width={300} height={40} className="mx-auto" />
          </div>

          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-2xl md:text-[40px] font-poppins text-[#3C3C3C] font-bold mb-2">
              {WELCOME_BACK}
            </h3>
            <p className="text-[#1C1C1C] text-sm md:text-base">{PLEASE_LOGIN}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Email */}
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Username or Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, rememberMe: !!checked }))
                  }
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
                  {REMEMBER_ME}
                </Label>
              </div>
              <a
                href="#"
                className="text-sm text-green-500 hover:text-green-600 font-medium transition-colors"
              >
                {FORGOT_PASSWORD}
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#03A765] cursor-pointer hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
            >
              {LOGIN_CONTENT}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
                {DONT_HAVE_ACCOUNT}{' '}
                <Link href="/signup" className="text-[#008EB1] font-medium transition-colors">
                  {CREATE_ACCOUNT}
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500">Or</span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-12 cursor-pointer bg-white border-gray-200 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {CONTINUE_WITH}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
