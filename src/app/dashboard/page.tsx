"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {vazirmatn} from "@/app/fonts";

interface UserData {
  phoneNumber: string
  timestamp: string
  sessionId: string
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const storedData = localStorage.getItem("iranPhoneData")

        if (!storedData) {
          // No data found, redirect to auth
          router.push("/auth")
          return
        }

        const parsedData: UserData = JSON.parse(storedData)

        // Validate the data structure
        if (!parsedData.phoneNumber || !parsedData.sessionId) {
          // Invalid data structure, redirect to auth
          localStorage.removeItem("userAuth")
          router.push("/auth")
          return
        }

        // Check if session is not too old (optional: 24 hours)
        const sessionTime = new Date(parsedData.timestamp).getTime()
        const currentTime = new Date().getTime()
        const hoursDiff = (currentTime - sessionTime) / (1000 * 60 * 60)

        if (hoursDiff > 24) {
          // Session expired, redirect to auth
          localStorage.removeItem("userAuth")
          router.push("/auth")
          return
        }

        // Valid data found, set user data
        setUserData(parsedData)
        setIsLoading(false)
      } catch (error) {
        // Error parsing data, redirect to auth
        localStorage.removeItem("iranPhoneData")
        router.push("/auth")
      }
    }

    checkAuthentication()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userAuth")
    router.push("/auth")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div  dir={'rtl'} className={`${vazirmatn.className} min-h-screen bg-background`}>
      {/* Header */}
      <header className="bg-background shadow-sm border-b border-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-primary">داشبورد</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <strong>خروج</strong>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-card rounded-lg shadow p-6 justify-center items-center flex flex-col">
            {/* Conditional Paragraph - Main Requirement */}
            {userData && (
              <p className="text-lg text-secondary mb-6">
              به داشبورد خوش آمدید. 🎉
              </p>
            )}

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 border border-blue-200 dark:bg-blue-300 rounded-lg p-4 flex flex-col justify-center items-center">
                <h3 className="text-lg font-medium text-blue-900 mb-2">اطلاعات کاربر</h3>
                <div className="space-y-2 text-sm text-blue-800 flex flex-col justify-center items-center">
                  <p>
                    <strong>شماره همراه:</strong> {userData?.phoneNumber}
                  </p>
                  <p>
                    <strong>آیدی سشن:</strong> {userData?.sessionId.substring(0, 8)}...
                  </p>
                </div>
              </div>
              <div
                className="bg-green-50 dark:bg-green-300 border border-green-200 rounded-lg p-4 flex flex-col justify-center items-center">
                <h3 className="text-lg font-medium text-green-900 dark:text-green-950 mb-2">وضعیت سشن</h3>
                <div className="space-y-2 text-sm text-green-800 dark:text-green-900 flex flex-col justify-center items-center">
                  <p>
                    <strong>وضعیت:</strong> فعال
                  </p>
                  <span className={'flex gap-1'}>
                    <strong>زمان ورود:</strong> <p>{new Date(userData?.timestamp || "").toLocaleString()}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
