"use client";

import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    ScatterChart, Scatter, ZAxis
} from 'recharts';
import {
    Brain, Target, Zap,
    TrendingUp, CheckCircle2,
    Split, LayoutGrid, Terminal, Shield,
    Search, Fingerprint, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Tooltip } from '@/components/shared/Tooltip';
import { InfoPanel } from '@/components/shared/InfoPanel';
import { StatCard } from '@/components/shared/StatCard';

// --- Mock Data ---

const SEGMENTS = [
    {
        name: 'Passive Explorer',
        waste: 82,
        uplift: 12,
        organic: 1,
        desc: 'High waste: Converts organically 1% of time, but media has high relative push.',
        color: '#3b82f6'
    },
    {
        name: 'Loyalist',
        waste: 95,
        uplift: 1,
        organic: 22,
        desc: 'Pure waste: Converts anyway. Media spend here is redundant.',
        color: '#27272a'
    },
    {
        name: 'Deal Hunter',
        waste: 45,
        uplift: 42,
        organic: 4,
        desc: 'Balanced: Responsive to promotion and attribution signals.',
        color: '#6366f1'
    },
    {
        name: 'High-Intent',
        waste: 12,
        uplift: 2,
        organic: 45,
        desc: 'Efficient: Low waste because credit matches intent, but baseline is high.',
        color: '#a855f7'
    }
];

const HETEROGENEITY_DATA = [
    { name: 'Social', Baseline: 4000, Incremental: 1200, drift: 0.12 },
    { name: 'Display', Baseline: 6000, Incremental: 800, drift: -0.05 },
    { name: 'Search', Baseline: 2000, Incremental: 4500, drift: 0.34 },
    { name: 'Email', Baseline: 8000, Incremental: 500, drift: 0.02 },
];

const INTENT_MAP = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 1000,
    type: i % 4
}));

export default function BehavioralDashboard() {
    const [mounted, setMounted] = useState(false);
    const [activeSeg, setActiveSeg] = useState(SEGMENTS[0]);
    const [activeTerminalLog, setActiveTerminalLog] = useState(0);

    const logs = [
        { time: '14:20:01', event: 'PROPENSITY_SYNC', msg: 'Resolved micro-segment latent intent for UID_8291', status: 'ACTIVE' },
        { time: '14:20:45', event: 'HETEROGENEITY_CALC', msg: 'ITE (Individual Treatment Effect) stable at +14.2%', status: 'CALIBRATED' },
        { time: '14:21:12', event: 'PRIOR_UPDATED', msg: 'Psychographic priors adjusted for seasonal decay', status: 'SYNCED' }
    ];

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setActiveTerminalLog(prev => (prev + 1) % logs.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return <div className="min-h-screen bg-[#020203]" />;

    return (
        <div className="min-h-screen bg-[#020203] text-zinc-100 font-mono selection:bg-blue-500/30 overflow-x-hidden p-10">
            {/* Ambient Background Grid */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />
            <div className="scan-line" />

            <header className="max-w-[1600px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="px-4 py-1.5 glass-surface border border-blue-500/30 text-blue-500 text-[10px] font-black tracking-widest uppercase flex items-center gap-2 clip-tactical animate-in slide-in-from-left duration-700">
                            <Fingerprint size={14} className="animate-pulse" />
                            <span className="text-zinc-500">ENGINE_PROTOCOL::</span>PSYCHOGRAPHIC_PRIORS_V2.1
                        </div>
                        <div className="h-px w-24 bg-gradient-to-r from-blue-600/50 to-transparent" />
                        <span className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.4em] flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                            ANALYSIS_LIVE
                        </span>
                    </div>
                    <h1 className="text-9xl font-black italic tracking-tighter uppercase leading-[0.75] mb-8">
                        BEHAVIORAL <br />
                        <span className="text-blue-500">PROFILING</span>
                    </h1>
                    <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed uppercase tracking-widest font-extrabold border-l-2 border-blue-600/20 pl-8">
                        Identifying <span className="text-zinc-300 italic">ROI waste</span> by separating latent organic intent from incremental media lift via causal heterogeneity mapping.
                    </p>
                </div>

                <div className="flex gap-6 mb-4">
                    <Tooltip content="Percentage of marketing spend credited to organic behavior (people who would have purchased anyway). Lower is better—indicates more efficient attribution.">
                        <StatCard label="Causal Redundancy" value="42%" trend="-3.2% vs Baseline" trendType="down" color="#3b82f6" icon={Zap} />
                    </Tooltip>
                    <Tooltip content="Precision of causal ML model predictions—percentage of correctly identified incremental vs. organic conversions. 94% indicates highly accurate model calibration.">
                        <StatCard label="Uplift Precision" value="94%" trend="OPTIMAL_CONVERGENCE" trendType="up" color="#a855f7" icon={Shield} />
                    </Tooltip>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto space-y-16">
                {/* Method Overview */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-3xl font-black italic uppercase tracking-widest text-zinc-400 flex items-center gap-4">
                            <Tooltip content="Core theoretical framework that powers all psychographic attribution calculations. Based on Causal ML Individual Treatment Effects (ITE).">
                                <Brain size={28} className="text-blue-500" />
                            </Tooltip>
                            Method Overview
                        </h3>
                        <p className="text-zinc-500 text-sm font-medium max-w-3xl leading-relaxed uppercase tracking-widest font-extrabold border-l-2 border-blue-600/20 pl-8">
                            Advanced causal ML framework for psychographic attribution
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-12 gap-10">
                    {/* Segment Explorer */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-black italic uppercase tracking-widest text-zinc-400 flex items-center gap-4">
                                <LayoutGrid size={24} className="text-blue-500" />
                                Micro_Segments
                            </h3>
                            <div className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">RANK::CAUSAL_EFFICIENCY</div>
                        </div>

                        {SEGMENTS.map((seg) => (
                            <motion.div
                                key={seg.name}
                                whileHover={{ x: 10 }}
                                onClick={() => setActiveSeg(seg)}
                                className={`cursor-pointer group relative p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${activeSeg.name === seg.name
                                    ? 'bg-blue-600 border-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.3)]'
                                    : 'bg-zinc-900/20 border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                                    <Target size={60} />
                                </div>

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <h3 className={`text-2xl font-black italic uppercase tracking-tighter ${activeSeg.name === seg.name ? 'text-white' : 'text-zinc-300'}`}>{seg.name}</h3>
                                    {activeSeg.name === seg.name && <CheckCircle2 size={24} className="text-white" />}
                                </div>
                                <p className={`text-xs font-bold mb-8 leading-relaxed uppercase tracking-tight ${activeSeg.name === seg.name ? 'text-blue-100' : 'text-zinc-600'}`}>{seg.desc}</p>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${activeSeg.name === seg.name ? 'text-blue-200' : 'text-zinc-700'}`}>Causal Redundancy Index</span>
                                        <span className={`text-xl font-black italic ${activeSeg.name === seg.name ? 'text-white' : 'text-zinc-400'}`}>{seg.waste}%</span>
                                    </div>
                                    <div className="h-2 bg-black/20 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${seg.waste}%` }}
                                            className={`h-full transition-all duration-1000 ${activeSeg.name === seg.name ? 'bg-white' : 'bg-blue-900/50'}`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Yield Decompositon & Terminal */}
                    <div className="col-span-12 lg:col-span-8 space-y-10">
                        {/* Causal Gap Chart */}
                        <div className="tactical-panel p-12 rounded-[3.5rem] border border-white/5 bg-zinc-900/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.02] text-blue-500 transition-opacity group-hover:opacity-5">
                                <Split size={300} />
                            </div>

                            <div className="flex justify-between items-end mb-16 relative z-10">
                                <div>
                                    <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">Causal Efficiency Gap</h3>
                                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Observed Baseline vs. Theoretical Lift</p>
                                </div>
                                <div className="flex gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 bg-zinc-800 rounded-full" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Natural Intent</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Incremental Lift</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[450px] relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={HETEROGENEITY_DATA} margin={{ top: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 13, fontWeight: 900, fontFamily: 'monospace' }} />
                                        <YAxis hide />
                                        <RechartsTooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                            contentStyle={{ backgroundColor: '#09090b', border: '1px solid #1e293b', borderRadius: '16px' }}
                                        />
                                        <Bar dataKey="Baseline" stackId="a" fill="#18181b" radius={[0, 0, 0, 0]} barSize={80} />
                                        <Bar dataKey="Incremental" stackId="a" fill="#3b82f6" radius={[12, 12, 0, 0]} barSize={80} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-12 p-10 bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] flex items-center justify-between group/uplift transition-all hover:bg-blue-600/15">
                                <div className="flex items-center gap-8">
                                    <div className="p-5 bg-blue-500 text-white rounded-[1.5rem] shadow-2xl shadow-blue-500/30 group-hover:rotate-12 transition-transform">
                                        <TrendingUp size={40} />
                                    </div>
                                    <div>
                                        <h4 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-2">Optimized Uplift Potential</h4>
                                        <p className="text-zinc-500 text-[11px] font-black uppercase tracking-widest">Shifting capital to {activeSeg.name === 'Loyalist' ? 'Passive Explorers' : 'incremental cohorts'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-2">ROAS_SWING_INTEL</span>
                                    <span className="text-6xl font-black text-white italic tracking-tightest transition-all group-hover:text-blue-400">+8.4x</span>
                                </div>
                            </div>
                        </div>

                        {/* Latent Intent Terminal */}
                        <div className="tactical-panel p-10 rounded-[2.5rem] border border-white/5 bg-zinc-900/10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <Terminal size={22} className="text-blue-500" />
                                    <h3 className="text-xl font-black italic uppercase tracking-widest text-zinc-400">Latent_Intent_Log</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                    <span className="text-[10px] font-black text-blue-400/60 uppercase tracking-widest">REAL_TIME_NODE_SCAN</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex gap-6 p-6 rounded-2xl border transition-all cursor-default ${i === activeTerminalLog ? 'bg-blue-500/10 border-blue-500/40 shadow-xl shadow-blue-900/10' : 'bg-black/40 border-white/5'}`}
                                    >
                                        <div className="text-[10px] font-black text-zinc-700 font-mono tracking-widest uppercase py-1">[{log.time}]</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-1">
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded tracking-tighter uppercase ${i === activeTerminalLog ? 'bg-blue-500 text-black' : 'bg-zinc-800 text-zinc-600'}`}>{log.event}</span>
                                                <span className="text-xs font-black uppercase text-zinc-300 italic">{log.msg}</span>
                                            </div>
                                            <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mt-2 flex items-center gap-2">
                                                <div className={`w-1 h-1 rounded-full ${i === activeTerminalLog ? 'bg-blue-500' : 'bg-zinc-800'}`} />
                                                SYSTEM_STATUS::{log.status}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Micro-Segment Drift Visualization */}
                <section className="tactical-panel p-12 rounded-[4rem] border border-white/5 bg-zinc-900/10">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-6">
                            <div className="w-1.5 h-10 bg-blue-500" />
                            <h3 className="text-4xl font-black italic uppercase tracking-tighter">Intent Vector Mapping</h3>
                        </div>
                        <Tooltip content="Scatter plot of individual user conversion probability vs. causal lift. Clusters represent psychographic cohorts.">
                            <div className="flex items-center gap-3 px-6 py-2 bg-black/40 border border-white/5 rounded-full cursor-help">
                                <Search size={14} className="text-zinc-500" />
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Cluster_Integrity::92%</span>
                            </div>
                        </Tooltip>
                    </div>

                    <div className="h-[400px] mb-12">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis type="number" dataKey="x" name="baseline probability" hide />
                                <YAxis type="number" dataKey="y" name="causal lift" hide />
                                <ZAxis type="number" dataKey="z" range={[100, 1000]} name="volume" />
                                <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Passive Explorer" data={INTENT_MAP.slice(0, 5)} fill="#3b82f6" />
                                <Scatter name="Loyalist" data={INTENT_MAP.slice(5, 10)} fill="#27272a" />
                                <Scatter name="Deal Hunter" data={INTENT_MAP.slice(10, 15)} fill="#6366f1" />
                                <Scatter name="High-Intent" data={INTENT_MAP.slice(15, 20)} fill="#a855f7" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Map Entropy', val: '0.14', status: 'LOW' },
                            { label: 'Cluster Density', val: '0.82', status: 'OPTIMAL' },
                            { label: 'Intent Accuracy', val: '96.4%', status: 'CALIBRATED' },
                            { label: 'Compute Speed', val: '14ms', status: 'REALTIME' }
                        ].map((d, i) => (
                            <div key={i} className="bg-black/40 border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/20 transition-all cursor-default group/stat">
                                <div className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors italic">{d.label}</div>
                                <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{d.val}</div>
                                <div className="text-[9px] font-black text-blue-500/60 uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">{d.status}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="mt-40 p-16 border-t border-zinc-900 bg-zinc-900/20 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_15px_#3b82f6] animate-pulse" />
                        <span className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.6em]">BEHAVIORAL_CORE_ACTIVE</span>
                    </div>
                    <div className="h-6 w-px bg-zinc-800" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-800 italic">LAST_HEARTBEAT: 2026-01-31</span>
                </div>
                <div className="flex gap-16 text-[11px] font-black uppercase tracking-[0.4em] text-zinc-800">
                    <span className="cursor-pointer hover:text-white transition-all tracking-widest">CAUSAL_ML_PROTOCOLS</span>
                    <span className="cursor-pointer hover:text-white transition-all tracking-widest">PRIVACY_SHIELD_V2</span>
                    <span className="cursor-pointer hover:text-white transition-all tracking-widest">API_REACH</span>
                </div>
                <div className="text-[11px] font-black text-zinc-950 uppercase tracking-[1em] italic">MAR_SCI_ENGINEERING_PRM</div>
            </footer>
        </div>
    );
}
