"use client";

import Image from "next/image";
import img from "../../../public/assets/profile.png";
import travelInsurance from "../../../public/assets/travelInsurance.jpg";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/store";

export default function Profile() {
  const profile = useAppSelector((state) => state.user);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "231 Oak Park Blvd Oakville, Ontario L6H 7S8, CA",
    zipCode: "12345",
    age: "30",
  });
useEffect(() => {
  const storedData =
    typeof window !== "undefined" ? localStorage.getItem("signup") : null;

  let parsedData: Partial<typeof input> = {}; 

  if (storedData) parsedData = JSON.parse(storedData);

  setInput({
    firstName: profile.name?.split(" ")[0] || parsedData.firstName || "James",
    lastName: profile.name?.split(" ")[1] || parsedData.lastName || "John",
    email: profile.email || parsedData.email || "James123@gmail.com",
    phone: profile.phone || parsedData.phone || "+1 234 567 8901",
    address:
      parsedData.address ||
      "231 Oak Park Blvd Oakville, Ontario L6H 7S8, CA",
    zipCode: parsedData.zipCode || "12345",
    age: parsedData.age || "30",
  });
}, [profile]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("signup", JSON.stringify(input));
    }
  }, [input]);

  return (
    <div className="min-h-screen w-full">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-7xl">
        {/* Banner */}
        <div className="relative">
          <Image
            src={travelInsurance}
            alt="Banner"
            width={1200}
            height={200}
            className="h-90 w-full object-cover rounded-t-lg"
          />
          <div className="absolute -bottom-14 left-8">
            {profile.image ? (
              <Image
                src={profile.image || img}
                alt="Profile"
                width={130}
                height={130}
                className="rounded-xl border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-[130px] h-[130px] flex items-center justify-center rounded-xl border-4 border-white shadow-md bg-teal-600 text-white text-5xl font-bold">
                {input.firstName?.charAt(0) || "U"}
              </div>
            )}
          </div>
        </div>
        <div className="px-8 mt-16">
          <h1 className="text-2xl font-bold text-gray-900">
            {input.firstName} {input.lastName}
          </h1>
          <div className="flex items-center gap-6 text-gray-600 mt-2">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A8.962 8.962 0 0112 15c2.21 0 4.21.805 5.879 2.136M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Teacher
            </span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.5 1.5 0 01-2.121 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Canada
            </span>
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              value={input.firstName}
              readOnly
              onChange={(e) =>
                setInput({ ...input, firstName: e.target.value })
              }
              className="mt-1 w-full border text-gray-400 rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              value={input.lastName}
              readOnly
              onChange={(e) =>
                setInput({ ...input, lastName: e.target.value })
              }
              className="mt-1 w-full border text-gray-400 rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={input.email}
              readOnly
              onChange={(e) =>
                setInput({ ...input, email: e.target.value })
              }
              className="mt-1 w-full border text-gray-400 rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              value={input.phone}
              readOnly
              className="mt-1 w-full border text-gray-400 rounded-md p-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Residence Address
            </label>
            <input
              type="text"
              value={input.address}
              readOnly
              onChange={(e) =>
                setInput({ ...input, address: e.target.value })
              }
              className="mt-1 w-full border text-gray-400 rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Area Zip Code
            </label>
            <input
              type="text"
              value={input.zipCode}
              readOnly
              onChange={(e) =>
                setInput({ ...input, zipCode: e.target.value })
              }
              className="mt-1 w-full border text-gray-400 rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Age</label>
            <input
              type="text"
              value={input.age}
              readOnly
              onChange={(e) =>
                setInput({ ...input, age: e.target.value })
              }
              className="mt-1 w-full border text-gray-400 rounded-md p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
