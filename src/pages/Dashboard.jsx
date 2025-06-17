import React, { useState, useRef } from 'react';

import { LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';
import Footer from '../components/Footer';
import DashboardNavbar from '../components/DashboardNavbar';
import axios from 'axios';

const trendingQuestions = [
  'What are the 2025 eCommerce trends in Africa?',
  'Top growth sectors in Nigeria?',
  'How is inflation impacting retail?',
  'AI adoption in Sub-Saharan startups?',
];
const industries = ['Finance', 'Health', 'Agriculture', 'Retail', 'Tech', 'Energy'];
const countries = ['Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Egypt'];
const mockDataset = [
  { Name: 'Alice', Sales: 120, Region: 'West' },
  { Name: 'Bob', Sales: 90, Region: 'East' },
  { Name: 'Carol', Sales: 150, Region: 'West' },
];
const datasetVersions = [
  { name: 'Dataset_v1.csv', url: 'https://cloudinary.com/mock1', timestamp: '2025-06-01 10:00' },
  { name: 'Dataset_v2.csv', url: 'https://cloudinary.com/mock2', timestamp: '2025-06-10 14:30' },
];
const savedQueries = [
  { id: 1, query: 'Market Outlook for Q3', tags: ['Finance', 'Q3'], lastRun: '2025-06-10', result: 'Growth expected at 8%.' },
  { id: 2, query: 'Growth Forecast in Health', tags: ['Health'], lastRun: '2025-06-09', result: 'Steady increase in telemedicine.' },
];
const queryTemplates = [
  'Market Outlook',
  'Growth Forecast',
  'Risk Assessment',
  'Competitor Analysis',
];
const swot = { S: ['Strong brand', 'Growing market'], W: ['Limited capital'], O: ['Expansion to new regions'], T: ['Competition'] };
const pest = { P: ['Stable government'], E: ['Rising GDP'], S: ['Urbanization'], T: ['Mobile adoption'] };
const tabs = [
  { key: 'ai', label: 'AI Insight Search', icon: '🧠' },
  { key: 'dataset', label: 'Dataset Upload', icon: '📂' },
  { key: 'reports', label: 'Visual Reports', icon: '📊' },
  { key: 'saved', label: 'Market Outlook', icon: '🤖' },
  { key: 'decision', label: 'Decision Toolkit', icon: '🛠️' },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const [aiQuery, setAiQuery] = useState('');
  const [aiChat, setAiChat] = useState([]);
  const [industry, setIndustry] = useState(industries[0]);
  const [country, setCountry] = useState(countries[0]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(datasetVersions[0]);
  const [viewMode, setViewMode] = useState('Summary');
  const [confidence, setConfidence] = useState('All');
  const [selectedQueries, setSelectedQueries] = useState([]);
  const [decisionInput, setDecisionInput] = useState('');
  const [summaryMode, setSummaryMode] = useState('Executive');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [datasetFile, setDatasetFile] = useState(null);
  const [datasetUploadLoading, setDatasetUploadLoading] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef(null);
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);
  const [datasetAiResponse, setDatasetAiResponse] = useState('');
  const [visualReportsAiResponse, setVisualReportsAiResponse] = useState('');
  const [marketOutlookResponse, setMarketOutlookResponse] = useState('');
  const [decisionSummary, setDecisionSummary] = useState('');
  

  // Helper to get token
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };


  //*FEATURES HANDLER----------

  
  //*1 AI Insight Search
  const handleAiSubmit = async () => {
    if (!aiQuery.trim()) return;
    setIsLoading(true);
    try {
      const res = await axios.post('https://insightpilot-api.onrender.com/insight/ask', { query: aiQuery }, { headers: getAuthHeader() });
      setAiChat([...aiChat, { user: aiQuery, ai: { text: res.data.answer } }]);
      setAiQuery('');
      setShowSuggestions(false);
    } catch (err) {
      setAiChat([...aiChat, { user: aiQuery, ai: { text: 'AI error.' } }]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };



  //*2 Dataset Analysis
  const handleDatasetAsk = async () => {
    if (!aiQuery.trim()) return;
    setIsLoading(true);
    setDatasetAiResponse('');
    try {
      const res = await axios.post('https://insightpilot-api.onrender.com/insight/dataset', { query: aiQuery }, { headers: getAuthHeader() });
      setDatasetAiResponse(res.data.answer);
    } catch (err) {
      setDatasetAiResponse('AI error.');
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };



  //*3 Visual Reports AI Handler
  const handleVisualReportsAsk = async () => {
    if (!aiQuery.trim()) return;
    setIsLoading(true);
    setVisualReportsAiResponse('');
    try {
      const res = await axios.post('https://insightpilot-api.onrender.com/insight/ask', { query: aiQuery }, { headers: getAuthHeader() });
      setVisualReportsAiResponse(res.data.answer);
    } catch (err) {
      setVisualReportsAiResponse('AI error.');
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Market Outlook AI Handler
  const handleMarketOutlookAsk = async () => {
    if (!aiQuery.trim()) return;
    setIsLoading(true);
    setMarketOutlookResponse('');
    try {
      const res = await axios.post('http://localhost:5000/api/insight/ask', { query: aiQuery }, { headers: getAuthHeader() });
      setMarketOutlookResponse(res.data.answer);
    } catch (err) {
      setMarketOutlookResponse('AI error.');
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };



  const handleAiQuery = (q) => {
    setAiQuery(q);
    setShowSuggestions(q.length > 0);
  };





  //* File upload handler
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDatasetFile(e.target.files[0]);
    }
  };



  const handleFileUpload = async () => {
    if (!datasetFile) return;
    setDatasetUploadLoading(true);
    setUploadedFileInfo(null);
    try {
      const formData = new FormData();
      formData.append('file', datasetFile);
      const res = await axios.post('https://insightpilot-api.onrender.com/insight/dataset-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', ...getAuthHeader() },
      });
      setUploadedFileInfo(res.data.file);
      alert('File uploaded successfully!');
    } catch (err) {
      alert('File upload failed!');
      console.log(err);
    } finally {
      setDatasetUploadLoading(false);
    }
  };

  // Voice input handler
  const handleVoiceInput = () => {
    setVoiceError('');
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setVoiceError('Speech recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
    }
    setVoiceLoading(true);
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAiQuery(transcript);
      setVoiceLoading(false);
    };
    recognitionRef.current.onerror = (event) => {
      setVoiceError('Voice recognition error: ' + event.error);
      setVoiceLoading(false);
    };
    recognitionRef.current.onend = () => {
      setVoiceLoading(false);
    };
    recognitionRef.current.start();
  };

  // Remove unused function to solve lint error



  const handleSelectQuery = (id) => {
    setSelectedQueries(
      selectedQueries.includes(id)
        ? selectedQueries.filter(q => q !== id)
        : [...selectedQueries, id]
    );
  };





  //* Decision Toolkit (Get AI Summary)
  const handleDecisionSummary = async () => {
    if (!decisionInput.trim()) return;
    setIsLoading(true);
    setDecisionSummary('');
    try {
      const res = await axios.post('https://insightpilot-api.onrender.com/insight/decision', { query: decisionInput }, { headers: getAuthHeader() });
      setDecisionSummary(res.data.answer);
    } catch (err) {
      setDecisionSummary('AI error.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };




  //* Helper to format AI response as structured content
  const formatAIContent = (text) => {
    // Try to split into paragraphs and bullet points for basic structure
    if (!text) return null;
    // If the text contains bullet points, split accordingly
    if (text.includes('\n- ') || text.includes('\n• ')) {
      return (
        <ul className="list-disc pl-6 space-y-1">
          {text.split(/\n[-•] /).filter(Boolean).map((item, i) => <li key={i}>{item.trim()}</li>)}
        </ul>
      );
    }
    // Otherwise, split into paragraphs
    return text.split(/\n{2,}/).map((para, i) => <p key={i} className="mb-2">{para}</p>);
  };





  // Copy to clipboard handler
  const handleCopy = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch (err) {
      alert('Failed to copy!');
      console.log(err)
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans flex flex-col">
      <DashboardNavbar />
      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className={`bg-gray-800 shadow-2xl transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-16'} flex flex-col min-h-0 border-r border-gray-900`}> 
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <span className="font-bold text-blue-300 text-lg flex items-center gap-2">
              <span className="transition-all duration-300" style={{ opacity: sidebarOpen ? 1 : 0, width: sidebarOpen ? 'auto' : 0, overflow: 'hidden' }}>Features</span>
            </span>
            <button className="ml-auto text-gray-400 hover:text-blue-400" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              )}
            </button>
          </div>
          <nav className="flex-1 py-4 flex flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 w-full text-left ${activeTab === tab.key ? 'bg-blue-900 text-blue-300 font-bold' : 'text-gray-200 hover:bg-gray-700 hover:text-blue-200'}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span className="text-2xl">{tab.icon}</span>
                {sidebarOpen && <span>{tab.label}</span>}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto max-h-full">
          <div className="max-w-6xl mx-auto py-10 px-4">



            {/* --- AI INSIGHT SEARCH --- */}
            {activeTab === 'ai' && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-blue-700 mb-2">AI Insight Search</h2>
                  <p className="text-blue-700 text-md mb-4">Unleash the power of AI to instantly answer your toughest business questions! Our AI Insight Search helps you discover trends, opportunities, and risks so you can make smarter, faster decisions with confidence.</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                  <div className="flex-1">
                    <label className="block text-lg font-medium mb-2">Ask InsightPilot</label>
                    <input
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-lg"
                      placeholder="Type your question..."
                      value={aiQuery}
                      onChange={e => handleAiQuery(e.target.value)}
                      onFocus={() => setShowSuggestions(aiQuery.length > 0)}
                    />
                    {showSuggestions && (
                      <div className="bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 absolute w-full max-w-md">
                        {trendingQuestions.filter(q => q.toLowerCase().includes(aiQuery.toLowerCase())).map((q, i) => (
                          <div key={i} className="px-4 py-2 hover:bg-blue-50 cursor-pointer" onClick={() => { setAiQuery(q); setShowSuggestions(false); }}>
                            {q}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Industry</label>
                    <select className="rounded-lg border border-gray-300 p-2" value={industry} onChange={e => setIndustry(e.target.value)}>
                      {industries.map(ind => <option key={ind}>{ind}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select className="rounded-lg border border-gray-300 p-2" value={country} onChange={e => setCountry(e.target.value)}>
                      {countries.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <button 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition" 
                    onClick={handleAiSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : 'Ask'}
                  </button>
                </div>
                {/* Chat Thread */}
                <div className="space-y-4">
                  {aiChat.map((msg, idx) => (
                    <div key={idx} className="relative group">
                      <div className="flex items-start mb-1">
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg max-w-xl mr-auto">{msg.user}</div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg max-w-xl ml-auto w-full relative">
                          {/* Copy button */}
                          <button
                            className="absolute top-2 right-2 text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300 focus:outline-none"
                            onClick={() => handleCopy(msg.ai.text, idx)}
                          >
                            {copiedIdx === idx ? 'Copied!' : 'Copy'}
                          </button>
                          {/* Structured content */}
                          {formatAIContent(msg.ai.text)}
                          {msg.ai.chart === 'line' && (
                            <ResponsiveContainer width="100%" height={180}>
                              <LineChart data={mockDataset} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <Line type="monotone" dataKey="Sales" stroke="#2563eb" strokeWidth={3} />
                                <Tooltip />
                              </LineChart>
                            </ResponsiveContainer>
                          )}
                          {msg.ai.chart === 'pie' && (
                            <ResponsiveContainer width="100%" height={180}>
                              <PieChart>
                                <Pie data={mockDataset} dataKey="Sales" nameKey="Region" cx="50%" cy="50%" outerRadius={60} fill="#2563eb">
                                  {mockDataset.map((entry, i) => <Cell key={i} fill={['#2563eb', '#60a5fa', '#818cf8'][i % 3]} />)}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}











            {/* --- DATASET UPLOAD & ANALYSIS SECTION --- */}
            {activeTab === 'dataset' && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                  <h3 className="font-bold mb-2">Dataset Versions</h3>
                  <ul className="space-y-2">
                    {datasetVersions.map((v, i) => (
                      <li key={i} className={`p-2 rounded-lg cursor-pointer ${selectedVersion.name === v.name ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`} onClick={() => setSelectedVersion(v)}>
                        <div className="font-semibold">{v.name}</div>
                        <div className="text-xs">{v.timestamp}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-blue-700 mb-2">Dataset Upload & Analysis</h2>
                    <p className="text-blue-700 text-md mb-4">Upload your data and let InsightPilot do the heavy lifting! Instantly analyze, clean, and extract actionable insights from your datasets to drive data-backed decisions like never before.</p>
                  </div>
                  <div className="mb-4 flex gap-4 items-center">
                    <input type="file" accept=".csv,.xlsx" className="block" onChange={handleFileChange} />
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      onClick={handleFileUpload}
                      disabled={datasetUploadLoading || !datasetFile}
                    >
                      {datasetUploadLoading ? 'Uploading...' : 'Upload'}
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                      onClick={handleVoiceInput}
                      disabled={voiceLoading}
                    >
                      {voiceLoading ? 'Listening...' : 'Voice Input'}
                    </button>
                  </div>
                  {voiceError && <div className="text-red-500 text-sm mb-2">{voiceError}</div>}
                  {uploadedFileInfo && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
                      <div>File uploaded: <b>{uploadedFileInfo.originalname}</b></div>
                      <div>Size: {(uploadedFileInfo.size / 1024).toFixed(2)} KB</div>
                      <div>Type: {uploadedFileInfo.mimetype}</div>
                    </div>
                  )}
                  {/* AI Insight on Uploaded File */}
                  <div className="mb-4">
                    <label className="block text-md font-medium mb-2">Ask AI about this dataset</label>
                    <div className="flex gap-2">
                      <input
                        className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ask a question about the uploaded file..."
                        value={aiQuery}
                        onChange={e => handleAiQuery(e.target.value)}
                      />
                      <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={handleDatasetAsk}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </span>
                        ) : 'Ask'}
                      </button>
                    </div>
                  </div>
                  {datasetAiResponse && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded text-blue-800">
                      <b>AI Response:</b>
                      <div>{formatAIContent(datasetAiResponse)}</div>
                    </div>
                  )}

                  
                  
                </div>
              </div>
            )}
















            {/* --- VISUAL REPORTS SECTION --- */}
            {activeTab === 'reports' && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-blue-700 mb-2">Visual Reports</h2>
                  <p className="text-blue-700 text-md mb-4">Transform complex data into beautiful, interactive visualizations! Visual Reports empower you to spot trends, compare metrics, and communicate insights clearly for confident, data-driven decisions.</p>
                </div>
                {/* AI Insight on Visualized Data */}
                <div className="mb-6">
                  <label className="block text-md font-medium mb-2">Ask AI about visualized data</label>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ask a question about the visualized data..."
                      value={aiQuery}
                      onChange={e => handleAiQuery(e.target.value)}
                    />
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={handleVisualReportsAsk}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </span>
                      ) : 'Ask'}
                    </button>
                  </div>
                  {visualReportsAiResponse && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded text-blue-800">
                      <b>AI Response:</b>
                      <div>{formatAIContent(visualReportsAiResponse)}</div>
                    </div>
                  )}
                </div>







                <div className="flex gap-4 mb-6">
                  <select className="rounded-lg border border-gray-300 p-2" value={viewMode} onChange={e => setViewMode(e.target.value)}>
                    <option>Summary</option>
                    <option>Analytics</option>
                    <option>Strategy</option>
                  </select>
                  <select className="rounded-lg border border-gray-300 p-2" value={confidence} onChange={e => setConfidence(e.target.value)}>
                    <option>All</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <select className="rounded-lg border border-gray-300 p-2" value={industry} onChange={e => setIndustry(e.target.value)}>
                    {industries.map(ind => <option key={ind}>{ind}</option>)}
                  </select>
                  
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                 
                 
                </div>
              </div>
            )}




















            {/* --- MARKET OUTLOOK SECTION --- */}
            {activeTab === 'saved' && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-blue-700 mb-2">Market Outlook</h2>
                  <p className="text-blue-700 text-md mb-4">Stay ahead of the curve with real-time market intelligence! Market Outlook delivers AI-powered answers to your market questions, helping you anticipate changes and seize new opportunities.</p>
                </div>
                {/* AI Insight on Market State */}
                <div className="mb-6">
                  <label className="block text-md font-medium mb-2">Ask AI about the state of the market</label>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ask a question about the market..."
                      value={aiQuery}
                      onChange={e => handleAiQuery(e.target.value)}
                    />
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={handleMarketOutlookAsk}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </span>
                      ) : 'Ask'}
                    </button>
                  </div>
                  {marketOutlookResponse && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded text-blue-800">
                      <b>AI Response:</b>
                      <div>{formatAIContent(marketOutlookResponse)}</div>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 mb-6">
                  <select className="rounded-lg border border-gray-300 p-2">
                    {queryTemplates.map((tpl, i) => <option key={i}>{tpl}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedQueries.map(q => (
                    <div key={q.id} className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={selectedQueries.includes(q.id)} onChange={() => handleSelectQuery(q.id)} />
                        <span className="font-bold">{q.query}</span>
                        {q.tags.map((tag, i) => <span key={i} className="ml-2 px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">{tag}</span>)}
                      </div>
                      <div className="text-gray-700 text-sm">Last run: {q.lastRun}</div>
                      <div className="text-gray-800 mt-2">{q.result}</div>
                      <div className="flex gap-2 mt-2">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs" onClick={() => {}}>Re-run</button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Comparison View */}
                {selectedQueries.length > 1 && (
                  <div className="mt-8 bg-gray-100 rounded-lg p-4">
                    <h4 className="font-bold mb-2">Comparison View</h4>
                    <div className="flex gap-4">
                      {savedQueries.filter(q => selectedQueries.includes(q.id)).map(q => (
                        <div key={q.id} className="flex-1 bg-white rounded-lg p-4 border border-blue-100">
                          <div className="font-bold mb-1">{q.query}</div>
                          <div className="text-gray-800">{q.result}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}









            {/* --- DECSION TOOLKIT --- */}
            {activeTab === 'decision' && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-blue-700 mb-2">Decision Toolkit</h2>
                  <p className="text-blue-700 text-md mb-4">Make complex decisions with clarity! The Decision Toolkit combines scenario modeling, risk analysis, and AI-driven frameworks to guide you toward the best possible outcomes.</p>
                </div>
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2">Ask a Decision Question</label>
                  <input
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="e.g. Should we expand to Nigeria or Kenya?"
                    value={decisionInput}
                    onChange={e => setDecisionInput(e.target.value)}
                  />
                  <div className="flex gap-4 mt-4">
                    <select className="rounded-lg border border-gray-300 p-2" value={summaryMode} onChange={e => setSummaryMode(e.target.value)}>
                      <option>Executive</option>
                      <option>Investor</option>
                      <option>Technical</option>
                    </select>
                    <button 
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                      onClick={handleDecisionSummary}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </span>
                      ) : 'Get AI Summary'}
                    </button>
                  </div>
                  {decisionSummary && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded text-blue-800">
                      <b>AI Response:</b>
                      <div>{formatAIContent(decisionSummary)}</div>
                    </div>
                  )}
                </div>




                {/* Mocked AI Output */}
                <div className="mb-6">
                  <h4 className="font-bold mb-2">Scenario Modeling</h4>
                  <div className="bg-blue-50 rounded-lg p-4 mb-2">AI suggests: Expanding to Nigeria offers higher growth, but Kenya has lower risk.</div>
                  <h4 className="font-bold mb-2">Risk Score Analyzer</h4>
                  <div className="flex gap-4 mb-2">
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg">Nigeria: 7/10</div>
                    <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg">Kenya: 4/10</div>
                  </div>
                  <h4 className="font-bold mb-2">SWOT Analysis</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-green-100 rounded-lg p-2"><span className="font-bold">S:</span> {swot.S.join(', ')}</div>
                    <div className="bg-yellow-100 rounded-lg p-2"><span className="font-bold">W:</span> {swot.W.join(', ')}</div>
                    <div className="bg-blue-100 rounded-lg p-2"><span className="font-bold">O:</span> {swot.O.join(', ')}</div>
                    <div className="bg-red-100 rounded-lg p-2"><span className="font-bold">T:</span> {swot.T.join(', ')}</div>
                  </div>
                  <h4 className="font-bold mt-4 mb-2">PEST Analysis</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-blue-100 rounded-lg p-2"><span className="font-bold">P:</span> {pest.P.join(', ')}</div>
                    <div className="bg-green-100 rounded-lg p-2"><span className="font-bold">E:</span> {pest.E.join(', ')}</div>
                    <div className="bg-yellow-100 rounded-lg p-2"><span className="font-bold">S:</span> {pest.S.join(', ')}</div>
                    <div className="bg-red-100 rounded-lg p-2"><span className="font-bold">T:</span> {pest.T.join(', ')}</div>
                  </div>
                </div>

                
                <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">Summary Mode: <span className="font-bold">{summaryMode}</span></div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
