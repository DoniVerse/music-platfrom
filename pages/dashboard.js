import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getStoredUser, getStoredSession, clearSession, isAuthenticated } from '../lib/api'
import CreatePlaylistForm from "@/components/CreatePlaylistForm";

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    // Get user data
    const userData = getStoredUser()
    const sessionData = getStoredSession()
    
    if (userData && sessionData) {
      setUser(userData)
    } else {
      // If no user data in localStorage, redirect to login
      router.push('/login')
    }
    
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    clearSession()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect from useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard | Music Platform</title>
        <meta name="description" content="Your music dashboard" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name || 'User'}</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your music and playlists</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign out
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Playlist</h2>
            <CreatePlaylistForm />
          </div>
        </div>
      </div>
    </div>
  )
}
