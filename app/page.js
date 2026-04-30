'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Users, Activity, Calendar, UserPlus, Database, 
  ClipboardList, TrendingUp, Search, Bell, Settings,
  ChevronRight, LayoutDashboard
} from 'lucide-react';

export default function DashboardSIRST() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      
      {/* --- SIDEBAR UPGRADE --- */}
      <aside className="w-72 bg-emerald-950 text-white flex flex-col shadow-2xl h-screen sticky top-0 overflow-hidden">
        {/* Logo Area */}
        <div className="p-8 text-2xl font-black border-b border-white/5 flex items-center gap-3 bg-emerald-900/20">
          <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
            <Database size={24} className="text-emerald-950" />
          </div>
          <span className="tracking-tighter">SIRS-T <span className="text-emerald-500 font-light">PRO</span></span>
        </div>
        
        {/* Navigasi dengan Hover Effect Mewah */}
        <nav className="flex-1 p-6 space-y-2 mt-4">
          <p className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-[0.2em] px-4 mb-4">Menu Utama</p>
          
          <MenuLink href="/" icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <MenuLink href="/pasien" icon={<Users size={20} />} label="Data Pasien" />
          <MenuLink href="/registrasi" icon={<UserPlus size={20} />} label="Registrasi Baru" />
          <MenuLink href="/rekam_medis" icon={<ClipboardList size={20} />} label="Rekam Medis" />
        </nav>

        {/* Profil Card di Bawah */}
        <div className="p-6">
          <div className="bg-emerald-900/40 rounded-[24px] p-5 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-black text-emerald-950 shadow-lg">
                AG
              </div>
              <div>
                <p className="text-[10px] text-emerald-400 font-bold uppercase leading-none mb-1">Administrator</p>
                <p className="text-sm font-black text-white leading-none">Agi Abdul Gani</p>
              </div>
            </div>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold transition-all border border-white/5 uppercase tracking-widest">
              Keluar Sistem
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT UPGRADE --- */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-50">
          <div className="relative group w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Cari data pasien atau dokter..." 
              className="w-full pl-12 pr-6 py-2.5 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none" 
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-slate-100 rounded-xl text-slate-500 hover:text-emerald-600 transition-all">
              <Bell size={20} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
               <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Status Server</p>
                  <p className="text-[11px] font-bold text-emerald-600 flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Terhubung
                  </p>
               </div>
            </div>
          </div>
        </header>

        <div className="p-10 space-y-10">
          {/* Welcome Area */}
          <section className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Selamat Pagi, Agi!</h1>
              <p className="text-slate-500 mt-3 font-medium">Ini ringkasan aktivitas rumah sakit hari ini.</p>
            </div>
            <Link href="/registrasi">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-[20px] font-black flex items-center gap-3 transition-all shadow-xl shadow-emerald-200 hover:-translate-y-1 active:scale-95">
                <UserPlus size={20} /> PENDAFTARAN BARU
              </button>
            </Link>
          </section>
          
          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Users />} label="Total Pasien" val="1,284" sub="+12 hari ini" color="emerald" />
            <StatCard icon={<Activity />} label="Kapasitas Kamar" val="85%" sub="12 Bed Tersisa" color="blue" />
            <StatCard icon={<Calendar />} label="Antrean" val="24" sub="Poli Umum" color="orange" />
            <StatCard icon={<TrendingUp />} label="Kepuasan" val="4.8" sub="Dari 5.0" color="purple" />
          </section>

          {/* Bottom Grid: Chart & Info */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-slate-200/60">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-slate-800 text-xl tracking-tight">Tren Kunjungan Pasien</h3>
                <select className="bg-slate-50 border-none rounded-xl text-[10px] font-black p-2 outline-none uppercase tracking-widest text-slate-400">
                  <option>7 Hari Terakhir</option>
                </select>
              </div>
              <div className="flex items-end justify-between gap-4 h-48 px-2">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                    <div 
                      className={`w-full rounded-t-2xl transition-all duration-500 group-hover:brightness-110 shadow-lg ${i === 3 ? 'bg-emerald-500 shadow-emerald-200' : 'bg-slate-100 group-hover:bg-emerald-200'}`} 
                      style={{ height: `${h}%` }}
                    ></div>
                    <span className={`text-[10px] font-black uppercase ${i === 3 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-950 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
               <div className="relative z-10">
                 <h3 className="font-black text-xl mb-6 flex items-center gap-2">
                    <Bell className="text-emerald-400" size={20} /> Pengumuman
                 </h3>
                 <div className="space-y-6">
                    <div className="group cursor-pointer">
                      <p className="text-[10px] font-bold text-emerald-500 uppercase mb-1 tracking-widest">Sistem</p>
                      <p className="text-sm font-bold group-hover:text-emerald-400 transition-colors underline decoration-emerald-800 underline-offset-4">Update Node.js v22 Berhasil</p>
                    </div>
                    <div className="group cursor-pointer">
                      <p className="text-[10px] font-bold text-orange-500 uppercase mb-1 tracking-widest">Peringatan</p>
                      <p className="text-sm font-bold group-hover:text-emerald-400 transition-colors underline decoration-emerald-800 underline-offset-4">Stok Paracetamol Menipis</p>
                    </div>
                 </div>
               </div>
               <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
                  <button className="flex items-center justify-between w-full font-bold text-xs text-emerald-400 group">
                    LIHAT SEMUA LOG <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
               {/* Dekorasi Background */}
               <Database className="absolute -right-10 -bottom-10 w-40 h-40 text-white/5 -rotate-12" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Komponen Pembantu agar kode bersih
function MenuLink({ href, icon, label, active = false }) {
  return (
    <Link href={href}>
      <div className={`
        flex items-center gap-3 p-4 rounded-[20px] transition-all duration-300 cursor-pointer group active:scale-95
        ${active 
          ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/20 font-black' 
          : 'text-emerald-100/50 hover:bg-white/5 hover:text-white hover:pl-6 font-semibold'}
      `}>
        <span className={active ? 'text-emerald-950' : 'group-hover:text-emerald-400'}>{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
}

function StatCard({ icon, label, val, sub, color }) {
  const colors = {
    emerald: 'bg-emerald-500 text-white shadow-emerald-100',
    blue: 'bg-blue-500 text-white shadow-blue-100',
    orange: 'bg-orange-500 text-white shadow-orange-100',
    purple: 'bg-purple-500 text-white shadow-purple-100'
  };
  
  return (
    <div className="bg-white p-7 rounded-[32px] shadow-sm border border-slate-200/60 hover:shadow-xl transition-all duration-500 group">
      <div className={`w-14 h-14 ${colors[color]} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{val}</h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">{sub}</span>
        </div>
      </div>
    </div>
  );
}