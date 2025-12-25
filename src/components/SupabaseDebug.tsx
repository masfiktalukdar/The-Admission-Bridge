"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function SupabaseDebug() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      // 1. Static Key Check
      // @ts-ignore
      const key = supabase.supabaseKey || "";
      if (key.startsWith("sb_secret")) {
        setStatus("error");
        setMessage(
          "Invalid Key: You are using a secret key (starts with 'sb_secret'). Use the 'anon' public key from Supabase Dashboard > Settings > API."
        );
        return;
      }
      if (!key.startsWith("ey")) {
        setStatus("error");
        setMessage("Invalid Key Format: Supabase keys usually start with 'eyJ'. Check src/lib/supabase.ts");
        return;
      }

      // 2. Network Check (Auth)
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }

      setStatus("connected");
      setMessage("Supabase Client is configured correctly.");
    } catch (err: any) {
      setStatus("error");
      setMessage(`Connection Failed: ${err.message || "Unknown error"}`);
    }
  };

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg border text-sm max-w-sm z-50 transition-all ${
      status === "connected" ? "bg-green-50 border-green-200 text-green-800 translate-y-20 hover:translate-y-0 opacity-50 hover:opacity-100" : 
      status === "error" ? "bg-red-50 border-red-200 text-red-800" : "bg-gray-50 border-gray-200 text-gray-800"
    }`}>
      <div className="flex items-center gap-2 font-semibold mb-1">
        <div className={`w-2 h-2 rounded-full ${
          status === "connected" ? "bg-green-500" : 
          status === "error" ? "bg-red-500" : "bg-yellow-500 animate-pulse"
        }`} />
        Supabase Status: {status.toUpperCase()}
      </div>
      <p>{message}</p>
    </div>
  );
}
