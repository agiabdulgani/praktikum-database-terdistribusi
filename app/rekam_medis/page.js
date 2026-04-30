'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Untuk menangkap data dari URL
import Link from 'next/link';
import { 
  ArrowLeft, Activity, Heart, Thermometer, Droplets, 
  FileText, Pill, User, Stethoscope, ShieldCheck, Save, Plus, Database, Users, UserPlus, ClipboardList
} from 'lucide-react';

function RekamMedisContent() {
  const searchParams = useSearchParams();
  
  // MENGAMBIL NAMA & ID DARI URL (Secara Otomatis)
  // Jika tidak ada data di URL, maka akan muncul 'Pasien Baru' sebagai default
  const namaPasien = searchParams.get('nama') || 'Pasien Baru';
  const idPasien = searchParams.get('id') || 'RM-2026-XXX';

  const [isInputMode, setIsInputMode] = useState(false);
  
  // State Vitals (Data kiri)
  const [vitals, setVitals] = useState({
    bpm: '78',
    bp: '120/80',
    temp: '36.5',
    spo2: '98%'
  });

  // State Riwayat (Data kanan)
  const [history, setHistory] = useState([
    { 
      date: "29 April 2026", 
      title: "Pemeriksaan Umum (Check-up)", 
      doctor: "dr. Sarah Wijaya", 
      note: "Tekanan darah stabil.", 
      tag: "Rawat Jalan", 
      color: "bg-emerald-500" 
    }
  ]);

  const [formData, setFormData] = useState({ tensi: '', suhu: '', keluhan: '' });

  const handleSimpan = (e) => {
    e.preventDefault();
    
    const dataBaru = {
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: "Pemeriksaan Baru (SIRS-T)",
      doctor: "Petugas: Sistem Otomatis",
      note: `Tensi: ${formData.tensi} | Suhu: ${formData.suhu}°C | Keluhan: ${formData.keluhan}`,
      tag: "Terbaru",
      color: "bg-orange-500"
    };

    setHistory([dataBaru, ...history]);
    setVitals(prev => ({
      ...prev,
      bp: formData.tensi,
      temp: formData.suhu
    }));

    setIsInputMode(false);
    alert(`Data rekam medis untuk ${namaPasien} berhasil diperbarui!`);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-emerald-950 text-white hidden lg:flex flex-col h-screen sticky top-0 z-50">
        <div className="p-8 text-2xl font-black border-b border-white/5 flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-xl"><Database size={24} className="text-emerald-950" /></div>
          <span>SIRS-T <span className="text-emerald-500 font-light">PRO</span></span>
        </div>
        <nav className="flex-1 p-6 space-y-2 mt-4">
          <MenuLink href="/" icon={<Activity size={20} />} label="Dashboard" />
          <MenuLink href="/pasien" icon={<Users size={20} />} label="Data Pasien" />
          <MenuLink href="/registrasi" icon={<UserPlus size={20} />} label="Registrasi Baru" />
          <MenuLink href="/rekam_medis" icon={<ClipboardList size={20} />} label="Rekam Medis" active />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/pasien" className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft size={20} className="text-slate-600" />
            </Link>
            <h2 className="font-black text-xl text-slate-800 uppercase tracking-tight">Detail Rekam Medis</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsInputMode(!isInputMode)}
              className={`px-6 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg ${isInputMode ? 'bg-slate-800 text-white shadow-slate-200' : 'bg-orange-500 text-white shadow-orange-100'}`}
            >
              {isInputMode ? <FileText size={16}/> : <Plus size={16}/>} 
              {isInputMode ? 'LIHAT RIWAYAT' : 'PERIKSA SEKARANG'}
            </button>
          </div>
        </header>

        <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* KOLOM KIRI: PROFIL PASIEN (Sekarang Dinamis) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-200/60 relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-28 h-28 bg-emerald-50 rounded-[32px] flex items-center justify-center text-emerald-600 mb-6 border-4 border-white shadow-xl">
                  {/* Tampilan Huruf Depan Nama Pasien */}
                  <span className="text-4xl font-black">{namaPasien.charAt(0)}</span>
                </div>
                {/* NAMA PASIEN DINAMIS */}
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight leading-none mb-2">
                  {namaPasien}
                </h2>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {idPasien}
                </span>
                
                <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Gol. Darah</p>
                    <p className="font-black text-emerald-600 text-xl">O+</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Usia</p>
                    <p className="font-black text-emerald-600 text-xl">20 Thn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-2 gap-4">
              <VitalCard icon={<Heart />} label="BPM" val={vitals.bpm} status="Normal" color="text-red-500" bg="bg-red-50" />
              <VitalCard icon={<Activity />} label="BP" val={vitals.bp} status="Optimal" color="text-blue-500" bg="bg-blue-50" />
              <VitalCard icon={<Thermometer />} label="Temp" val={vitals.temp} status="Normal" color="text-orange-500" bg="bg-orange-50" />
              <VitalCard icon={<Droplets />} label="SPO2" val={vitals.spo2} status="Normal" color="text-sky-500" bg="bg-sky-50" />
            </div>
          </div>

          {/* KOLOM KANAN: FORM & RIWAYAT */}
          <div className="lg:col-span-8 space-y-8">
            {isInputMode ? (
              <div className="bg-white rounded-[40px] p-10 shadow-sm border-2 border-emerald-500 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center">
                    <Stethoscope size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Periksa: {namaPasien}</h3>
                </div>
                
                <form onSubmit={handleSimpan} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tensi (120/80)</label>
                      <input type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold" placeholder="Masukkan Tensi" onChange={(e)=>setFormData({...formData, tensi: e.target.value})} required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suhu (°C)</label>
                      <input type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold" placeholder="Masukkan Suhu" onChange={(e)=>setFormData({...formData, suhu: e.target.value})} required />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Diagnosa / Keluhan</label>
                    <textarea rows="4" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold" placeholder="Tulis diagnosa di sini..." onChange={(e)=>setFormData({...formData, keluhan: e.target.value})} required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-[24px] shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95">
                    <Save size={20} /> SIMPAN REKAM MEDIS
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-200/60">
                <h3 className="text-xl font-black text-slate-800 uppercase mb-10 flex items-center gap-3">
                  <ClipboardList className="text-emerald-500" /> Riwayat Pemeriksaan
                </h3>
                <div className="space-y-10 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  {history.map((item, index) => (
                    <TimelineItem key={index} {...item} />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

// Komponen Pembantu
function MenuLink({ href, icon, label, active = false }) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${active ? 'bg-emerald-500 text-emerald-950 font-black shadow-lg' : 'text-emerald-100/50 hover:bg-white/5 hover:text-white'}`}>
        {icon} <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
}

function VitalCard({ icon, label, val, status, color, bg }) {
  return (
    <div className="p-6 rounded-[32px] bg-white border border-slate-200 shadow-sm flex flex-col items-center group hover:shadow-xl transition-all">
      <div className={`mb-4 p-3 ${bg} rounded-2xl transition-transform group-hover:scale-110`}>{React.cloneElement(icon, { className: color, size: 24 })}</div>
      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{label}</p>
      <p className="text-2xl font-black text-slate-800">{val}</p>
      <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mt-3 uppercase">{status}</span>
    </div>
  );
}

function TimelineItem({ date, title, doctor, note, tag, color }) {
  return (
    <div className="relative pl-16 group">
      <div className={`absolute left-0 top-0 w-12 h-12 ${color} rounded-[20px] border-4 border-white shadow-lg z-10 flex items-center justify-center text-white transition-all`}>
        <Activity size={20} />
      </div>
      <div className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 transition-all hover:bg-white hover:shadow-md">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{date}</p>
          <span className="text-[9px] font-black px-3 py-1 bg-white border border-slate-100 rounded-full text-slate-400 uppercase">{tag}</span>
        </div>
        <h4 className="font-black text-slate-800 text-lg mb-1">{title}</h4>
        <p className="text-[10px] text-slate-400 font-bold mb-4 uppercase tracking-wider italic font-bold">Pemeriksa: {doctor}</p>
        <div className="bg-white/80 p-4 rounded-2xl text-sm text-slate-600 font-medium border border-slate-50">"{note}"</div>
      </div>
    </div>
  );
}

export default function RekamMedisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-emerald-950 text-emerald-500 font-black">MEMUAT REKAM MEDIS...</div>}>
      <RekamMedisContent />
    </Suspense>
  );
}