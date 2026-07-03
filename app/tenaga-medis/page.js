'use client';
import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, UserPlus, FileText, Search, 
  Users, Activity, Database, ClipboardList, 
  Pill, Settings, Stethoscope, Plus, MapPin, Globe, Clock, ShieldCheck
} from 'lucide-react'; 
import Link from 'next/link';

export default function TenagaMedisPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('dokter'); // 'dokter' atau 'staf'
  const [searchTerm, setSearchTerm] = useState('');

  // Data Simulasi Tenaga Medis (Dokter & Perawat)
  const [tenagaMedisList] = useState([
    { id: 'DR-001', nama: 'dr. Ahmad Fauzi, Sp.PD', tipe: 'dokter', spesialisasi: 'Spesialis Penyakit Dalam', jadwal: 'Senin - Kamis (08:00 - 14:00)', status: 'Aktif', origin: 'Lokal' },
    { id: 'DR-002', nama: 'dr. Siti Rahma, Sp.A', tipe: 'dokter', spesialisasi: 'Spesialis Anak', jadwal: 'Selasa - Jumat (10:00 - 16:00)', status: 'Aktif', origin: 'Pusat (FDW)' },
    { id: 'DR-003', nama: 'dr. Budi Setiawan, Sp.B', tipe: 'dokter', spesialisasi: 'Spesialis Bedah Umum', jadwal: 'Senin & Rabu (13:00 - 19:00)', status: 'Izin', origin: 'Lokal' },
    { id: 'NS-001', nama: 'Ners. Dian Permana, S.Kep', tipe: 'staf', spesialisasi: 'Perawat Gawat Darurat', jadwal: 'Shift Pagi (07:00 - 14:00)', status: 'Aktif', origin: 'Lokal' },
    { id: 'NS-002', nama: 'Ners. Rina Lestari, S.Kep', tipe: 'staf', spesialisasi: 'Perawat Poliklinik Anak', jadwal: 'Shift Siang (14:00 - 21:00)', status: 'Aktif', origin: 'Pusat (FDW)' },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#F1F5F9] text-slate-900 p-10 font-bold">Loading Modul Tenaga Medis...</div>;
  }

  // Filter data berdasarkan Tab aktif dan kolom pencarian nama/spesialisasi
  const filteredStaf = tenagaMedisList.filter(t => 
    t.tipe === activeTab &&
    (t.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.spesialisasi.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      
      {/* SIDEBAR SINKRON */}
      <aside className="w-72 bg-emerald-950 text-white hidden lg:flex flex-col shadow-2xl h-screen sticky top-0">
        <div className="p-8 text-2xl font-black border-b border-white/5 flex items-center gap-3">
          <div className="bg-emerald-50 p-2 rounded-xl">
            <Database size={24} className="text-emerald-950" />
          </div>
          <span>SIRS-T <span className="text-emerald-500 font-light">PRO</span></span>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 mt-4 overflow-y-auto">
          <p className="text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.25em] px-4 mb-4">Sistem Navigasi</p>
          
          <Link href="/" className="flex items-center gap-3 p-4 rounded-2xl text-emerald-100/50 hover:bg-white/5 hover:text-white transition-all">
            <Activity size={20} /> <span className="text-sm">Overview</span>
          </Link>
          
          <Link href="/pasien" className="flex items-center gap-3 p-4 rounded-2xl text-emerald-100/50 hover:bg-white/5 hover:text-white transition-all">
            <Users size={20} /> <span className="text-sm">Data Pasien</span>
          </Link>
          
          <Link href="/registrasi" className="flex items-center gap-3 p-4 rounded-2xl text-emerald-100/50 hover:bg-white/5 hover:text-white transition-all">
            <UserPlus size={20} /> <span className="text-sm">Registrasi Baru</span>
          </Link>
          
          <Link href="/tenaga-medis" className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500 text-emerald-950 font-black shadow-lg shadow-emerald-500/20 transition-all">
            <Stethoscope size={20} /> <span className="text-sm">Tenaga Medis</span>
          </Link>
          
          <Link href="/rekam_medis" className="flex items-center gap-3 p-4 rounded-2xl text-emerald-100/50 hover:bg-white/5 hover:text-white transition-all">
            <ClipboardList size={20} /> <span className="text-sm">Rekam Medis</span>
          </Link>
          
          <Link href="/farmasi" className="flex items-center gap-3 p-4 rounded-2xl text-emerald-100/50 hover:bg-white/5 hover:text-white transition-all">
            <Pill size={20} /> <span className="text-sm">Farmasi & Obat</span>
          </Link>
          
          <Link href="/monitoring" className="flex items-center gap-3 p-4 rounded-2xl text-emerald-100/50 hover:bg-white/5 hover:text-white transition-all">
            <Settings size={20} /> <span className="text-sm">Konfigurasi</span>
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft size={20} className="text-slate-600" />
            </Link>
            <h2 className="font-black text-xl text-slate-800 tracking-tight uppercase">Database Staf & Tenaga Medis</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari nama atau keahlian..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/20 font-bold"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-200 active:scale-95 transition-all">
              <Plus size={18} /> TAMBAH SDM
            </button>
          </div>
        </header>

        {/* SUB-NAVIGASI TAB */}
        <div className="px-10 mt-8 flex gap-4">
          <button 
            onClick={() => { setActiveTab('dokter'); setSearchTerm(''); }}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 border transition-all ${
              activeTab === 'dokter' 
                ? 'bg-white border-slate-300 text-emerald-700 shadow-sm' 
                : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Stethoscope size={16} /> Tim Dokter Spesialis
          </button>
          <button 
            onClick={() => { setActiveTab('staf'); setSearchTerm(''); }}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 border transition-all ${
              activeTab === 'staf' 
                ? 'bg-white border-slate-300 text-emerald-700 shadow-sm' 
                : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <ShieldCheck size={16} /> Perawat & Staf Klinis
          </button>
        </div>

        {/* AREA TABEL DATA */}
        <div className="p-10 pt-4">
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 uppercase tracking-wider">
                    {activeTab === 'dokter' ? 'Daftar Dokter Praktik' : 'Daftar Perawat / Staf'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Manajemen SDM Berbasis PostgreSQL FDW</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.15em] border-b border-slate-100">
                    <th className="px-8 py-5">Nama Lengkap / ID</th>
                    <th className="px-8 py-5">Spesialisasi & Bidang</th>
                    <th className="px-8 py-5">Jadwal Praktik / Shift</th>
                    <th className="px-8 py-5">Asal Simpul Data</th>
                    <th className="px-8 py-5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredStaf.length > 0 ? (
                    filteredStaf.map((t) => (
                      <tr key={t.id} className="group hover:bg-slate-50/80 transition-all">
                        <td className="px-8 py-6">
                          <div>
                            <span className="font-black text-slate-700 uppercase text-sm block tracking-tight">{t.nama}</span>
                            <span className="text-[10px] text-emerald-600 font-black tracking-wider uppercase">{t.id}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold text-slate-600 uppercase tracking-tight">
                          {t.spesialisasi}
                        </td>
                        <td className="px-8 py-6">
                          <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                            <Clock size={14} className="text-slate-400" /> {t.jadwal}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className={`flex items-center gap-2 text-[10px] font-black uppercase px-3 py-1 rounded-lg border w-fit ${
                            t.origin === 'Lokal' 
                            ? 'bg-blue-50 text-blue-600 border-blue-100' 
                            : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {t.origin === 'Lokal' ? <MapPin size={12} /> : <Globe size={12} />}
                            {t.origin}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                            t.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-24 text-center opacity-40">
                        <Search size={48} className="mx-auto text-slate-300" />
                        <p className="mt-4 font-bold uppercase tracking-[0.2em] text-[10px]">Staf tidak ditemukan</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}