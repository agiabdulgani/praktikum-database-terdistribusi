'use client';
import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, UserPlus, FileText, Search, 
  Users, Activity, Database, ClipboardList, 
  MoreVertical, Trash2, Droplets, Calendar
} from 'lucide-react'; 
import Link from 'next/link';

export default function DataPasien() {
  const [pasienList, setPasienList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  // Load data dari localStorage saat halaman dibuka
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('data_pasien') || '[]');
    setPasienList(storedData);
  }, []);

  // Fungsi Hapus Pasien (Logika dari kodingan kamu)
  const handleDelete = (id, nama) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data pasien: ${nama}?`)) {
      const updatedList = pasienList.filter(p => p.id !== id);
      setPasienList(updatedList);
      localStorage.setItem('data_pasien', JSON.stringify(updatedList));
      setOpenMenuId(null);
    }
  };

  // Logika Pencarian berdasarkan Nama atau NIK (Logika dari kodingan kamu)
  const filteredPasien = pasienList.filter(p => 
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.nik.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      
      {/* SIDEBAR - Menggunakan referensi desain dari {6E292325-B6E2-47E5-AFF9-24134303507B}.png */}
      <aside className="w-72 bg-emerald-950 text-white hidden lg:flex flex-col shadow-2xl h-screen sticky top-0">
        <div className="p-8 text-2xl font-black border-b border-white/5 flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-xl">
            <Database size={24} className="text-emerald-950" />
          </div>
          <span>SIRS-T <span className="text-emerald-500 font-light">PRO</span></span>
        </div>
        <nav className="flex-1 p-6 space-y-2 mt-4">
          <MenuLink href="/" icon={<Activity size={20} />} label="Dashboard" />
          <MenuLink href="/pasien" icon={<Users size={20} />} label="Data Pasien" active />
          <MenuLink href="/registrasi" icon={<UserPlus size={20} />} label="Registrasi Baru" />
          <MenuLink href="/rekam_medis" icon={<ClipboardList size={20} />} label="Rekam Medis" />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* HEADER DENGAN FITUR PENCARIAN */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft size={20} className="text-slate-600" />
            </Link>
            <h2 className="font-black text-xl text-slate-800 tracking-tight uppercase">Database Pasien</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari Nama atau NIK..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/20"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href="/registrasi">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-200 active:scale-95 transition-all">
                <UserPlus size={18} /> REGISTRASI BARU
              </button>
            </Link>
          </div>
        </header>

        <div className="p-10">
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-200/60 overflow-hidden">
            {/* STATS HEADER */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 uppercase tracking-wider">Daftar Pasien Terdaftar</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Database: {filteredPasien.length} Pasien</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.15em] border-b border-slate-100">
                    <th className="px-8 py-5">Info Pasien</th>
                    <th className="px-8 py-5">Identitas NIK</th>
                    <th className="px-8 py-5">Klinis (Usia/Gol)</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredPasien.length > 0 ? (
                    filteredPasien.map((p) => (
                      <tr key={p.id} className="group hover:bg-slate-50/80 transition-all">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-11 h-11 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border border-emerald-200/50">
                                {p.nama.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="font-black text-slate-700 uppercase text-sm block tracking-tight">{p.nama}</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.gender}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6 font-mono text-xs text-slate-500 font-bold">{p.nik}</td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col gap-1">
                              <span className="flex items-center gap-2 text-xs font-black text-slate-600 uppercase">
                                <Calendar size={12} className="text-emerald-500" /> {p.usia || '--'} Thn
                              </span>
                              <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                <Droplets size={12} className="text-red-400" /> Golongan {p.golongan_darah || '-'}
                              </span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase border border-emerald-100">Aktif</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex justify-center gap-3 relative">
                            {/* TOMBOL REKAM MEDIS DENGAN PARAMETER LENGKAP */}
                            <Link href={`/rekam_medis?nama=${p.nama}&id=${p.id}&usia=${p.usia || '20'}&golongan_darah=${p.golongan_darah || 'O+'}`}>
                              <button title="Lihat Rekam Medis" className="bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 p-2.5 rounded-xl transition-all shadow-sm active:scale-90">
                                <FileText size={18} />
                              </button>
                            </Link>
                            
                            {/* TOMBOL MENU DROPDOWN (HAPUS) */}
                            <div className="relative">
                              <button 
                                onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)}
                                className={`p-2.5 rounded-xl transition-all border active:scale-90 ${openMenuId === p.id ? 'bg-slate-800 text-white' : 'bg-white text-slate-400 border-slate-200 shadow-sm'}`}
                              >
                                <MoreVertical size={18} />
                              </button>

                              {openMenuId === p.id && (
                                <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 shadow-2xl rounded-2xl z-[100] py-2 animate-in fade-in zoom-in duration-200">
                                  <button 
                                    onClick={() => handleDelete(p.id, p.nama)}
                                    className="w-full px-4 py-3 text-left text-[11px] font-black text-red-500 hover:bg-red-50 flex items-center gap-3 uppercase tracking-widest transition-colors"
                                  >
                                    <Trash2 size={16} /> Hapus Data Pasien
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-24 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-40">
                          <Search size={48} className="text-slate-300" />
                          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Data tidak ditemukan</p>
                        </div>
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

function MenuLink({ href, icon, label, active = false }) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 p-4 rounded-2xl transition-all cursor-pointer group active:scale-95 ${active ? 'bg-emerald-500 text-emerald-950 font-black shadow-lg shadow-emerald-500/20' : 'text-emerald-100/50 hover:bg-white/5 hover:text-white hover:pl-6'}`}>
        <span>{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
}