'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Code2, 
  Mail, 
  FileText, 
  ExternalLink, 
  GraduationCap, 
  Award,
  CheckCircle2
} from 'lucide-react';
import AboutApp from './AboutApp';
import LeetCodeApp from './LeetCodeApp';
import ContactApp from './ContactApp';

export default function ProfileApp() {
  const [activeTab, setActiveTab] = useState<'about' | 'leetcode' | 'contact'>('about');

  return (
    <div className="os-app-container">
      {/* Tab Navigation */}
      <div className="os-app-tabs">
        <button 
          className={`os-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <GraduationCap size={14} />
          <span>Bhuvan A B — BMSCE Background</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'leetcode' ? 'active' : ''}`}
          onClick={() => setActiveTab('leetcode')}
        >
          <Code2 size={14} />
          <span>LeetCode Problem Solving (100+)</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <Mail size={14} />
          <span>Recruiter Contact Dispatcher</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="os-app-scroll-content" style={{ padding: 0 }}>
        {activeTab === 'about' && <AboutApp />}
        {activeTab === 'leetcode' && <LeetCodeApp />}
        {activeTab === 'contact' && <ContactApp />}
      </div>
    </div>
  );
}
