"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Loader2, ClipboardList, Calendar, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types";
import Image from "next/image";

interface ApplicationsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | undefined;
}

export const ApplicationsListModal = ({
  isOpen,
  onClose,
  userId,
}: ApplicationsListModalProps) => {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !userId) return;

    const fetchApps = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", userId)
        .order("submitted_at", { ascending: false });

      if (!error && data) {
        setApps(data as Application[]);
      }
      setLoading(false);
    };

    fetchApps();

    // Real-time subscription
    const channel = supabase
      .channel("applications_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "applications",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchApps();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="bg-white p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              My Applications
            </h2>
            <p className="text-sm text-gray-500">
              Track the status of your university submissions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : apps.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                No Applications Yet
              </h3>
              <p className="text-gray-500 mb-6">
                You haven&apos;t applied to any universities yet.
              </p>
              <button
                onClick={onClose}
                className="text-indigo-600 font-bold hover:underline"
              >
                Browse Universities
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {apps.map((application) => (
                <div
                  key={application.id}
                  className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow"
                >
                  <Image
                    src={application.university_image}
                    alt=""
                    width={80}
                    height={80}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="eager"
                    className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {application.university_name}
                      </h3>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
                        {application.degree_level}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(
                          application.submitted_at
                        ).toLocaleDateString()}
                      </span>
                      <span>
                        ID: #{application.id.slice(0, 6).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex justify-between md:block items-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold capitalize
                          ${
                            application.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : ""
                          }
                          ${
                            application.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : ""
                          }
                          ${
                            application.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : ""
                          }
                        `}
                    >
                      {application.status === "pending" && (
                        <Clock className="w-4 h-4" />
                      )}
                      {application.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
