"use client";

import {
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Mail,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Empowering students worldwide to find their dream university.
              Compare, apply, and succeed.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer group">
                <Facebook className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer group">
                <Twitter className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer group">
                <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer group">
                <Instagram className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="hover:text-indigo-400 transition-colors">
                  Browse Universities
                </button>
              </li>
              <li>
                <button className="hover:text-indigo-400 transition-colors">
                  Compare Programs
                </button>
              </li>
              <li>
                <button className="hover:text-indigo-400 transition-colors">
                  Check Eligibility
                </button>
              </li>
              <li>
                <button className="hover:text-indigo-400 transition-colors">
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="hover:text-indigo-400 transition-colors">
                  Student Guides
                </button>
              </li>
              <li>
                <button className="hover:text-indigo-400 transition-colors">
                  Visa Help
                </button>
              </li>
              <li>
                <button className="hover:text-indigo-400 transition-colors">
                  Scholarships
                </button>
              </li>
              <li>
                <button className="hover:text-indigo-400 transition-colors">
                  Blog
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                </div>
                <span>Advanced Noorani Tower, 1 Mohakhali C/A, Dhaka 1212</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-indigo-500" />
                </div>
                <span>admissionbridge@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} The Admission Bridge. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <button className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <button className="hover:text-white transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
