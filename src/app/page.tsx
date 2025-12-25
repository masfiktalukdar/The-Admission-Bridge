'use client';

import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, FileText, AlertCircle, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { University, UserStats, FilterState } from '@/types';
import { AnimatedHero } from '@/components/hero/AnimatedHero';
import { TuitionSlider } from '@/components/university/TuitionSlider';
import { UniversityCard } from '@/components/university/UniversityCard';
import { CompareModal } from '@/components/modals/CompareModal';
import { ApplyModal } from '@/components/modals/ApplyModal';
import { CongratulationsModal } from '@/components/modals/CongratulationsModal';
import { ApplicationsListModal } from '@/components/modals/ApplicationsListModal';
import Image from 'next/image';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filterState, setFilterState] = useState<FilterState>({
    query: '',
    country: '',
    degree: '',
    maxTuition: 60000
  });
  
  const [userStats, setUserStats] = useState<UserStats>({
    gpa: 3.5,
    ielts: 7.0
  });

  const [compareList, setCompareList] = useState<number[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [applicationModalData, setApplicationModalData] = useState<University | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isAppsListOpen, setIsAppsListOpen] = useState(false);

  // Authentication & Data Fetching
  useEffect(() => {
    const init = async () => {
      // Auth
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      // Fetch Universities
      const { data: uniData } = await supabase
        .from('universities')
        .select('*');
      
      if (uniData) {
        setUniversities(uniData);
      }
      setLoading(false);

      return () => subscription.unsubscribe();
    };
    init();
  }, []);

  // Filter Logic
  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      const matchesQuery = uni.name.toLowerCase().includes(filterState.query.toLowerCase());
      const matchesCountry = filterState.country ? uni.country === filterState.country : true;
      const matchesDegree = filterState.degree ? uni.degree_level === filterState.degree : true;
      const matchesTuition = uni.tuition_usd <= filterState.maxTuition;
      
      return matchesQuery && matchesCountry && matchesDegree && matchesTuition;
    });
  }, [filterState, universities]);

  const handleSearchUpdate = (key: keyof FilterState, value: string | number) => {
    setFilterState(prev => ({ ...prev, [key]: value }));
  };

  const toggleCompare = (id: number) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) {
        alert("Maximum 3 universities allowed for side-by-side comparison.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const selectedForCompare = universities.filter(u => compareList.includes(u.id));
  const canCompare = compareList.length >= 2;

  const handleApplyFromCompare = (uni: University) => {
    setIsCompareModalOpen(false);
    setApplicationModalData(uni);
  };

  const handleApplicationSuccess = () => {
    setApplicationModalData(null);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      
      <div className="flex-1">
        <AnimatedHero onSearch={handleSearchUpdate} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 shrink-0 space-y-6">
              
              {/* Student Stats Box */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-indigo-600" /> Your Profile
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">GPA (4.0 Scale)</label>
                      <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{userStats.gpa}</span>
                    </div>
                    <input 
                      type="range" min="0" max="4.0" step="0.1" 
                      value={userStats.gpa}
                      onChange={(e) => setUserStats(s => ({...s, gpa: Number(e.target.value)}))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">IELTS Score</label>
                      <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{userStats.ielts}</span>
                    </div>
                    <input 
                      type="range" min="0" max="9.0" step="0.5" 
                      value={userStats.ielts}
                      onChange={(e) => setUserStats(s => ({...s, ielts: Number(e.target.value)}))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <TuitionSlider value={filterState.maxTuition} onChange={(v) => handleSearchUpdate('maxTuition', v)} />
                </div>

                <div className="mt-4 bg-blue-50 p-3 rounded-lg flex gap-3 items-start">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Adjusting these sliders updates your eligibility status on all university cards in real-time.
                  </p>
                </div>
              </div>
            </aside>

            {/* Main Content Grid */}
            <main className="flex-1">
              <div className="mb-6 flex justify-between items-end border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Top Universities
                  </h2>
                  <p className="text-gray-500 mt-1">Based on your preferences and eligibility.</p>
                </div>
                <div className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {filteredUniversities.length} Results
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-24">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : filteredUniversities.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center">
                  <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">No universities found</h3>
                  <p className="mt-2 text-gray-500 max-w-xs mx-auto">Try adjusting your tuition slider or broadening your search filters.</p>
                  <button 
                    onClick={() => handleSearchUpdate('maxTuition', 60000)}
                    className="mt-6 text-indigo-600 font-bold text-sm hover:underline"
                  >
                    Reset Tuition Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredUniversities.map((uni) => (
                      <UniversityCard 
                        key={uni.id} 
                        uni={uni} 
                        userStats={userStats}
                        isSelected={compareList.includes(uni.id)}
                        onToggleCompare={toggleCompare}
                        onApply={() => setApplicationModalData(uni)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Floating Compare Bar */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 inset-x-0 mx-auto w-[90%] max-w-4xl bg-gray-900 text-white rounded-2xl shadow-2xl p-3 z-50 flex items-center justify-between border border-gray-800"
          >
            <div className="flex items-center gap-4 pl-2">
              <div className="flex -space-x-3">
                {selectedForCompare.map(u => (
                  <Image 
                    key={u.id} 
                    src={u.image_url} 
                    sizes='(max-width: 768px) 100vw, 33vw'
                    loading='eager'
                    className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover bg-gray-800" 
                    title={u.name}
                    alt=""
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">
                  {compareList.length} University Selected
                </span>
                {!canCompare && (
                  <span className="text-xs text-gray-400 font-medium">Select at least 2 to compare</span>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
               <button 
                onClick={() => setCompareList([])}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Clear
              </button>
              <button 
                disabled={!canCompare}
                onClick={() => setIsCompareModalOpen(true)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2
                  ${canCompare 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105' 
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'}
                `}
              >
                Compare Universities <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <CompareModal 
        isOpen={isCompareModalOpen} 
        onClose={() => setIsCompareModalOpen(false)} 
        universities={selectedForCompare} 
        onApply={handleApplyFromCompare}
      />

      <ApplyModal 
        isOpen={!!applicationModalData} 
        onClose={() => setApplicationModalData(null)} 
        university={applicationModalData}
        userStats={userStats}
        userId={user?.id}
        onSuccess={handleApplicationSuccess}
      />
      
      <CongratulationsModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onViewApps={() => {
          setIsSuccessModalOpen(false);
          setIsAppsListOpen(true);
        }}
      />
      
      <ApplicationsListModal 
        isOpen={isAppsListOpen}
        onClose={() => setIsAppsListOpen(false)}
        userId={user?.id}
      />

    </div>
  );
}
