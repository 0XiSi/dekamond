"use client"

import { useState, useEffect } from "react"
import {vazirmatn} from "@/app/fonts";
import {useRouter} from "next/navigation";

export default function AuthForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isValidIranNumber, setIsValidIranNumber] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const router = useRouter()

  // Iranian phone number patterns
  const iranPhonePatterns = [
    /^(\+98|0098|98)?9\d{9}$/, // Mobile numbers
    /^09\d{9}$/, // Mobile without country code
  ]

  const validateIranPhoneNumber = (phone: string) => {
    const cleanPhone = phone.replace(/[\s\-()]/g, "")
    return iranPhonePatterns.some((pattern) => pattern.test(cleanPhone))
  }

  useEffect(() => {
    if (phoneNumber.length > 0) {
      setShowValidation(true)
      setIsValidIranNumber(validateIranPhoneNumber(phoneNumber))
    } else {
      setShowValidation(false)
      setIsValidIranNumber(false)
    }
    setIsSaved(false)
  }, [phoneNumber])

  const handleProceed = () => {
    if (isValidIranNumber) {
      const phoneData = {
        phoneNumber: phoneNumber,
        timestamp: new Date().toISOString(),
        country: "Iran",
        sessionId: Math.random().toString(36).substring(2) + Date.now().toString(36),
      }

      localStorage.setItem("iranPhoneData", JSON.stringify(phoneData))
      setIsSaved(true)
      router.push("/dashboard")

      console.log("Phone number saved to localStorage:", phoneData)
    }
  }

  return (
    <div className={`${vazirmatn.className} w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200`}>
      {/* Header */}
      <div className="text-center p-6 border-b border-gray-100">
        <div className="flex justify-center mb-3">
          <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">تایید شماره همراه</h2>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            شماره همراه
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="09123456789"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              showValidation
                ? isValidIranNumber
                  ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                  : "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
          />

          {/* Validation Message */}
          {showValidation && (
            <div
              className={`flex items-center gap-2 text-sm mt-2 ${
                isValidIranNumber ? "text-green-600" : "text-red-600"
              }`}
            >
              {isValidIranNumber ? (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span>
                {isValidIranNumber ? "شماره معتبر است" : "لطفا یک شماره معتبر وارد کنید"}
              </span>
            </div>
          )}

          {/* Format Examples */}
          <div className="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded-md">
            <p className="font-medium mb-1">شماره همراه باید یکی از دو حالت زیر باشد</p>
            <ul className="space-y-1">
              <li>• +98 912 345 6789 (با کد کشور)</li>
              <li>• 09123456789 (موبایل)</li>
            </ul>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!isValidIranNumber}
          className={`w-full py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            isValidIranNumber
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSaved ? "با موفقیت ثبت شد" : "ذخیره"}
        </button>

        {/* Success Message */}
        {isSaved && (
          <div className="text-center text-sm text-green-600 bg-green-50 border border-green-200 p-3 rounded-md">
            <div className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              شماره موبایل ذخیره شد
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
