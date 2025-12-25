"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, X, MapPin, GraduationCap, ArrowRight } from "lucide-react";
import { University } from "@/types";
import Image from "next/image";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  universities: University[];
  onApply: (uni: University) => void;
}

export const CompareModal = ({
  isOpen,
  onClose,
  universities,
  onApply,
}: CompareModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              University Comparison
            </h2>
            <p className="text-sm text-gray-500">
              Comparing {universities.length} selected programs.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="overflow-x-auto flex-1 relative">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr>
                <th className="p-6 sticky left-0 bg-white/95 backdrop-blur-sm z-20 border-b-2 border-r border-gray-100 min-w-50 text-gray-400 font-bold uppercase text-xs tracking-wider shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  Feature
                </th>
                {universities.map((uni) => (
                  <th
                    key={uni.id}
                    className="p-6 border-b-2 border-gray-100 min-w-[320px] align-top bg-white"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="h-40 rounded-xl overflow-hidden shadow-md relative group cursor-pointer">
                        <Image
                          src={uni.image_url}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          alt=""
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent flex flex-col justify-end p-4">
                          <div className="font-bold text-xl text-white leading-tight shadow-sm">
                            {uni.name}
                          </div>
                          <div className="text-sm text-gray-200 font-medium flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {uni.country}
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="p-6 sticky left-0 bg-white group-hover:bg-gray-50 z-10 border-r border-gray-100 font-semibold text-gray-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  Tuition Fee
                </td>
                {universities.map((uni) => (
                  <td key={uni.id} className="p-6 border-b border-gray-50">
                    <span className="text-2xl font-bold text-indigo-600">
                      ${uni.tuition_usd.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm ml-1 font-medium">
                      / year
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="p-6 sticky left-0 bg-white group-hover:bg-gray-50 z-10 border-r border-gray-100 font-semibold text-gray-600 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  Degree Level
                </td>
                {universities.map((uni) => (
                  <td
                    key={uni.id}
                    className="p-6 border-b border-gray-50 text-gray-600"
                  >
                    <span className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full font-bold text-sm inline-flex items-center gap-1.5 border border-indigo-100">
                      <GraduationCap className="w-4 h-4" />
                      {uni.degree_level}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="p-6 sticky left-0 bg-white group-hover:bg-gray-50 z-10 border-r border-gray-100 font-semibold text-gray-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  GPA Requirement
                </td>
                {universities.map((uni) => (
                  <td key={uni.id} className="p-6 border-b border-gray-50">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-lg">
                          {uni.gpa_required}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          / 4.0 Scale
                        </span>
                      </div>
                      <div className="w-full max-w-50 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-emerald-400 to-emerald-600 rounded-full shadow-sm"
                          style={{ width: `${(uni.gpa_required / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="p-6 sticky left-0 bg-white group-hover:bg-gray-50 z-10 border-r border-gray-100 font-semibold text-gray-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  IELTS Score
                </td>
                {universities.map((uni) => (
                  <td key={uni.id} className="p-6 border-b border-gray-50">
                    <span className="bg-purple-50 text-purple-700 py-1.5 px-3 rounded-lg font-bold border border-purple-100 inline-block">
                      {uni.ielts_required} Band
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 transition-colors group bg-gray-50/50">
                <td className="p-6 sticky left-0 bg-white group-hover:bg-gray-50 z-10 border-r border-gray-100 font-semibold text-gray-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] align-middle">
                  Action
                </td>
                {universities.map((uni) => (
                  <td key={uni.id} className="p-6 border-b border-gray-50">
                    <button
                      onClick={() => onApply(uni)}
                      className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
