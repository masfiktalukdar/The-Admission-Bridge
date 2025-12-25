'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, ClipboardList } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ApplicationsListModal } from '@/components/modals/ApplicationsListModal';
import { User } from '@supabase/supabase-js';

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAppsListOpen, setIsAppsListOpen] = useState(false);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    // For this demo, we'll try anonymous sign in if enabled, or just warn
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
        console.error("Anonymous sign-in failed:", error);
        // Fallback or alert
        alert("To enable sign-in, please configure Supabase Auth (Anonymous or Email/Password).");
    }
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="bg-indigo-600 p-1.5 rounded-lg mr-2">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight hidden sm:block">The Admission Bridge</span>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight sm:hidden">TAB</span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsAppsListOpen(true)}
                className="text-sm font-bold text-gray-700 hover:text-indigo-600 bg-gray-100 hover:bg-indigo-50 px-4 py-2 rounded-full transition-colors flex items-center gap-2"
              >
                <ClipboardList className="w-4 h-4" />
                <span className="hidden sm:inline">My Applications</span>
              </button>
              <div className="flex items-center text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                <span className={`w-2 h-2 rounded-full mr-2 ${user ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></span>
                {user ? 'Online' : <button onClick={handleLogin} className="hover:text-indigo-600">Guest (Login)</button>}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ApplicationsListModal 
        isOpen={isAppsListOpen}
        onClose={() => setIsAppsListOpen(false)}
        userId={user?.id}
      />
    </>
  );
};
