"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";
import { University, UserStats } from "@/types";
import { supabase } from "@/lib/supabase";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  university: University | null;
  userStats: UserStats;
  userId: string | undefined;
  onSuccess: () => void;
}

export const ApplyModal = ({
  isOpen,
  onClose,
  university,
  userStats,
  userId,
  onSuccess,
}: ApplyModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    statement: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen || !university) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (
        userStats.gpa < university.gpa_required ||
        userStats.ielts < university.ielts_required
      ) {
        throw new Error(
          "Application Rejected: Your academic scores do not meet the minimum requirements."
        );
      }

      if (!userId) {
        throw new Error(
          "Authentication Error: You must be signed in to apply."
        );
      }

      const { error: insertError } = await supabase
        .from("applications")
        .insert({
          user_id: userId,
          university_id: university.id,
          university_name: university.name,
          university_image: university.image_url,
          degree_level: university.degree_level,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          statement: formData.statement,
          user_gpa: userStats.gpa,
          user_ielts: userStats.ielts,
          status: "pending",
        });

      if (insertError) throw insertError;

      // Trigger success flow in parent instead of alert
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 text-white">
          <h2 className="text-2xl font-bold">Apply to {university.name}</h2>
          <div className="flex items-center gap-2 mt-2">
            <div
              className={`h-1 flex-1 rounded-full ${
                step >= 1 ? "bg-white" : "bg-white/30"
              }`}
            />
            <div
              className={`h-1 flex-1 rounded-full ${
                step >= 2 ? "bg-white" : "bg-white/30"
              }`}
            />
          </div>
          <p className="text-indigo-200 text-sm mt-3 font-medium">
            Step {step} of 2
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex-1 overflow-y-auto">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md flex items-start gap-3 animate-pulse">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  Academic Verification
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <span className="block text-gray-500 text-xs uppercase font-semibold">
                      Your GPA
                    </span>
                    <span
                      className={`font-mono text-lg font-bold ${
                        userStats.gpa < university.gpa_required
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {userStats.gpa}
                    </span>
                    <span className="text-xs text-gray-400 block mt-1">
                      Req: {university.gpa_required}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <span className="block text-gray-500 text-xs uppercase font-semibold">
                      Your IELTS
                    </span>
                    <span
                      className={`font-mono text-lg font-bold ${
                        userStats.ielts < university.ielts_required
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {userStats.ielts}
                    </span>
                    <span className="text-xs text-gray-400 block mt-1">
                      Req: {university.ielts_required}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Statement of Purpose
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
                  value={formData.statement}
                  onChange={(e) =>
                    setFormData({ ...formData, statement: e.target.value })
                  }
                  placeholder="Tell us why you are a good fit for this program..."
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-bold transition-colors"
              >
                Back
              </button>
            )}
            {step === 1 ? (
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.fullName || !formData.email}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all shadow-lg shadow-indigo-200"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all shadow-lg shadow-indigo-200 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  "Submit Application"
                )}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-500 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
