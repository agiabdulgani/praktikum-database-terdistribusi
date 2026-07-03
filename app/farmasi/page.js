'use client';
import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, UserPlus, FileText, Search, 
  Users, Activity, Database, ClipboardList, 
  Droplets, Calendar, Stethoscope, Pill, Settings,
  Plus, Package, ArrowLeftRight, RefreshCw
} from 'lucide-react'; 
import Link from 'next/link';

export default function FarmasiPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('stok'); // 'stok' atau 'mutasi'

  // Data Simulasi Obat di Gudang Farmasi Lokal & FDW Pusat
  const [stokObat, setStokObat] = useState([
    { id: 1, nama: 'Paracetamol 500mg', kategori: 'Analgetik', stok: 120, satuan: 'Tablet', asal: 'Lokal' },
    { id: 2, nama: 'Amoxicillin 500mg', kategori: 'Antibiotik', stok: 45, satuan: 'Kaplet', asal: 'Pusat (FDW)' },
    { id: 3, nama: 'Metformin 500mg', kategori: 'Antidiabetes', stok: 85, satuan: 'Tablet', asal: 'Lokal' },
    { id: 4, nama: 'Cetirizine 10mg', kategori: 'Antihistamin', stok: 200, satuan: 'Tablet', asal: 'Pusat (FDW)' },
    { id: 5, nama: 'Omeprazole 20mg', kategori: 'Antasida', stok: 15, satuan: 'Kapsul', asal: 'Lokal' }, // Stok kritis
  ]);

  // Data Simulasi Mutasi Obat antar Cabang
  const [mutasiObat] = useState([
    { id: 'TRX-001', tanggal: '03 Juli 2026', nama: 'Amoxicillin', jumlah: 50, dari: 'Gudang Pusat', ke: 'Farmasi Lokal', status: 'Selesai' },
    { id: 'TRX-002', tanggal: '02 Juli 2026', nama: 'Paracetamol', jumlah: 100, dari: 'Farmasi Lokal', ke: 'Klinik Cabang Cipasung', status: 'Diproses' },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#F1F5F9] text-slate-900 p-10 font-bold">Loading Modul Farmasi...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      
      {/* SIDEBAR SINKRON */}
      <aside className="w-72 bg-emerald-950 text-white hidden lg:flex flex-col shadow-2xl h-screen sticky top-0">
        <div className="p-8 text-2xl font-black border-b border-white/5 flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-xl">
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
          
          <Link href="/tenaga-medis" className="flex items-center gap-3 p-4 rounded-2xl text-emerald-100/50 hover:bg-white/5 hover:text-white transition-all">
            <Stethoscope size={20} /> <span className="text-sm">Tenaga Medis</span>
          </Link>
          
          <Link href="/rekam_medis" className="flex items-center gap-3 p-4 rounded-2xl text-emerald-100/50 hover:bg-white/5 hover:text-white transition-all">
            <ClipboardList size={20} /> <span className="text-sm">Rekam Medis</span>
          </Link>
          
          <Link href="/farmasi" className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500 text-emerald-950 font-black shadow-lg shadow-emerald-500/20 transition-all">
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
            <h2 className="font-black text-xl text-slate-800 tracking-tight uppercase">Manajemen Farmasi & Obat</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-200 active:scale-95 transition-all">
              <Plus size={18} /> PENGADAAN OBAT
            </button>
          </div>
        </header>

        {/* SUB-NAVIGASI TAB */}
        <div className="px-10 mt-8 flex gap-4">
          <button 
            onClick={() => setActiveTab('stok')}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 border transition-all ${
              activeTab === 'stok' 
                ? 'bg-white border-slate-300 text-emerald-700 shadow-sm' 
                : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Package size={16} /> Stok Gudang Obat
          </button>
          <button 
            onClick={() => setActiveTab('mutasi')}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 border transition-all ${
              activeTab === 'mutasi' 
                ? 'bg-white border-slate-300 text-emerald-700 shadow-sm' 
                : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <ArrowLeftRight size={16} /> Mutasi Antar Cabang
          </button>
        </div>

        {/* AREA DATA */}
        <div className="p-10 pt-4">
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-200/60 overflow-hidden">
            
            {/* JIKA TAB STOK OBAT */}
            {activeTab === 'stok' && (
              <>
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                      <Pill size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 uppercase tracking-wider">Inventori Obat Tersedia</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sinkronisasi Lokal & FDW Pusat Aktif</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.15em] border-b border-slate-100">
                        <th className="px-8 py-5">Nama Obat</th>
                        <th className="px-8 py-5">Kategori</th>
                        <th className="px-8 py-5">Sumber Data</th>
                        <th className="px-8 py-5">Status Stok</th>
                        <th className="px-8 py-5 text-center">Sisa Stok</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {stokObat.map((o) => (
                        <tr key={o.id} className="group hover:bg-slate-50/80 transition-all">
                          <td className="px-8 py-6 font-black text-slate-700 uppercase text-sm tracking-tight">{o.nama}</td>
                          <td className="px-8 py-6 text-xs font-bold text-slate-500 uppercase">{o.kategori}</td>
                          <td className="px-8 py-6">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md border ${
                              o.asal === 'Lokal' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                            }`}>{o.asal}</span>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                              o.stok <= 20 ? 'bg-red-50 text-red-600 border border-red-100 animate-pulse' : 'bg-emerald-50 text-emerald-600'
                            }`}>
                              {o.stok <= 20 ? 'Kritis / Re-order' : 'Aman'}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-center font-bold text-slate-800">{o.stok} {o.satuan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* JIKA TAB MUTASI */}
            {activeTab === 'mutasi' && (
              <>
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                      <ArrowLeftRight size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 uppercase tracking-wider">Log Mutasi & Logistik</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aliran siklus hidup logistik farmasi</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.15em] border-b border-slate-100">
                        <th className="px-8 py-5">ID Mutasi</th>
                        <th className="px-8 py-5">Tanggal</th>
                        <th className="px-8 py-5">Item Obat</th>
                        <th className="px-8 py-5">Alur Distribusi</th>
                        <th className="px-8 py-5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {mutasiObat.map((m) => (
                        <tr key={m.id} className="group hover:bg-slate-50/80 transition-all">
                          <td className="px-8 py-6 text-xs font-black text-emerald-600">{m.id}</td>
                          <td className="px-8 py-6 text-xs font-bold text-slate-400">{m.tanggal}</td>
                          <td className="px-8 py-6 font-bold text-slate-700 uppercase text-sm">{m.nama} <span className="text-slate-400 font-normal">({m.jumlah} Unit)</span></td>
                          <td className="px-8 py-6 text-xs text-slate-600 font-medium uppercase tracking-tight">
                            {m.dari} ➡️ {m.ke}
                          </td>
                          <td className="px-8 py-6 text-center">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                              m.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                            }`}>{m.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}