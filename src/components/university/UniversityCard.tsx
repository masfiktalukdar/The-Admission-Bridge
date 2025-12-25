"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  MapPin,
  GraduationCap,
  DollarSign,
  FileText,
  Scale,
  ArrowRight,
} from "lucide-react";
import { University, UserStats } from "@/types";
import Image from "next/image";

interface UniversityCardProps {
  uni: University;
  userStats: UserStats;
  isSelected: boolean;
  onToggleCompare: (id: number) => void;
  onApply: (uni: University) => void;
}

export const UniversityCard = React.forwardRef<
  HTMLDivElement,
  UniversityCardProps
>(({ uni, userStats, isSelected, onToggleCompare, onApply }, ref) => {
  const isEligible =
    userStats.gpa >= uni.gpa_required && userStats.ielts >= uni.ielts_required;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className={`group bg-white rounded-2xl shadow-sm border transition-all duration-300 flex flex-col h-full overflow-hidden ${
        isSelected
          ? "border-indigo-500 ring-2 ring-indigo-500/20"
          : "border-gray-200 hover:shadow-xl hover:border-indigo-200"
      }`}
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
        <Image
          src={uni.image_url}
          alt={uni.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading="eager"
          className="object-cover transform group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 items-end">
          {isEligible ? (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Eligible
            </motion.span>
          ) : (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-red-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
            >
              <XCircle className="w-3.5 h-3.5" /> Not Eligible
            </motion.span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 z-20">
          <span className="bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
            <MapPin className="w-3 h-3 text-indigo-600" /> {uni.country}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
          {uni.name}
        </h3>

        <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
          {uni.description}
        </p>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-6 bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-2.5 text-gray-700">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span className="font-medium">{uni.degree_level}</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-700">
            <DollarSign className="w-4 h-4 text-indigo-500" />
            <span className="font-medium">
              ${uni.tuition_usd.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-700">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span
              className={
                userStats.gpa < uni.gpa_required
                  ? "text-red-600 font-bold"
                  : "font-medium"
              }
            >
              GPA: {uni.gpa_required}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-700">
            <Scale className="w-4 h-4 text-indigo-500" />
            <span
              className={
                userStats.ielts < uni.ielts_required
                  ? "text-red-600 font-bold"
                  : "font-medium"
              }
            >
              IELTS: {uni.ielts_required}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <label className="flex items-center gap-2 cursor-pointer select-none group/checkbox">
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                isSelected
                  ? "bg-indigo-600 border-indigo-600"
                  : "border-gray-300 group-hover/checkbox:border-indigo-400"
              }`}
            >
              {isSelected && (
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              )}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={isSelected}
              onChange={() => onToggleCompare(uni.id)}
            />
            <span className="text-sm text-gray-600 font-medium group-hover/checkbox:text-indigo-600 transition-colors">
              Compare
            </span>
          </label>

          <button
            onClick={() => onApply(uni)}
            className="bg-gray-900 hover:bg-indigo-600 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all shadow-sm hover:shadow-indigo-200 hover:shadow-lg flex items-center gap-2 transform active:scale-95"
          >
            Apply <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});
UniversityCard.displayName = "UniversityCard";
