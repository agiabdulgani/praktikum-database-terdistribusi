'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Activity, Heart, Thermometer, Droplets, 
  FileText, User, Stethoscope, Save, Plus, Database, 
  Users, UserPlus, ClipboardList, Clock, Scale
} from 'lucide-react';

function RekamMedisContent() {
  const searchParams = useSearchParams();
  
  // Ambil data dinamis dari URL (dikirim dari halaman Data Pasien)
  const patientId = searchParams.get('id') || 'RM-TEMP';
  const namaPasien = searchParams.get('nama') || 'Pasien Baru';
  const usiaPasien = searchParams.get('usia') || '20';
  const golDarah = searchParams.get('golongan_darah') || 'O+';

  const [isInputMode, setIsInputMode] = useState(false);
  const [history, setHistory] = useState([]);
  
  // Vitals State
  const [vitals, setVitals] = useState({
    bpm: '78',
    bp: '120/80',
    temp: '36.5',
    spo2: '98%'
  });

  const [formData, setFormData] = useState({ 
    tensi: '', 
    suhu: '', 
    berat: '',
    keluhan: '', 
    diagnosa: '' 
  });

  // 1. LOAD DATA: Ambil riwayat medis dari localStorage khusus pasien ini
  useEffect(() => {
    if (patientId) {
      const allRecords = JSON.parse(localStorage.getItem('rekam_medis') || '[]');
      const patientRecords = allRecords.filter(r => r.patientId === patientId);
      setHistory(patientRecords.reverse()); // Urutan terbaru di atas

      // Update Vitals Card dengan data pemeriksaan terakhir jika ada
      if (patientRecords.length > 0) {
        const lastCheck = patientRecords[0];
        setVitals(prev => ({
          ...prev,
          bp: lastCheck.tensi || prev.bp,
          temp: lastCheck.suhu || prev.temp
        }));
      }
    }
  }, [patientId]);

  // 2. SIMPAN DATA: Gabungan logika simpan ke localStorage & Update UI
  const handleSimpan = (e) => {
    e.preventDefault();
    
    const newEntry = {
      id: Date.now(),
      patientId: patientId,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      title: "Pemeriksaan Klinis",
      doctor: "Unit SIRS-T PRO",
      tensi: formData.tensi,
      suhu: formData.suhu,
      berat: formData.berat,
      note: formData.keluhan,
      diagnosa: formData.diagnosa,
      tag: "Rawat Jalan",
      color: "bg-emerald-500"
    };

    // Simpan ke database lokal
    const allRecords = JSON.parse(localStorage.getItem('rekam_medis') || '[]');
    localStorage.setItem('rekam_medis', JSON.stringify([...allRecords, newEntry]));

    // Update State UI
    setHistory([newEntry, ...history]);
    setVitals(prev => ({
      ...prev,
      bp: formData.tensi,
      temp: formData.suhu
    }));

    setIsInputMode(false);
    setFormData({ tensi: '', suhu: '', berat: '', keluhan: '', diagnosa: '' });
    alert(`Data rekam medis ${namaPasien} berhasil disimpan!`);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      
      {/* SIDEBAR (Konsisten dengan dashboard kamu) */}
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
              className={`px-6 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg ${isInputMode ? 'bg-slate-800 text-white' : 'bg-orange-500 text-white'}`}
            >
              {isInputMode ? <ClipboardList size={16}/> : <Plus size={16}/>} 
              {isInputMode ? 'LIHAT RIWAYAT' : 'PERIKSA SEKARANG'}
            </button>
          </div>
        </header>

        <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* KOLOM KIRI: PROFIL PASIEN */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-200/60 text-center">
              <div className="w-24 h-24 bg-emerald-50 rounded-[32px] flex items-center justify-center text-emerald-600 mb-6 border-4 border-white shadow-xl mx-auto">
                <span className="text-4xl font-black">{namaPasien.charAt(0)}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-800 uppercase mb-2 leading-tight">{namaPasien}</h2>
              <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                ID: {patientId.slice(-8)}
              </span>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Gol. Darah</p>
                  <p className="font-black text-emerald-600 text-xl">{golDarah}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Usia</p>
                  <p className="font-black text-emerald-600 text-xl">{usiaPasien} Thn</p>
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

          {/* KOLOM KANAN: FORM ATAU RIWAYAT */}
          <div className="lg:col-span-8 space-y-8">
            {isInputMode ? (
              <div className="bg-white rounded-[40px] p-10 shadow-sm border-2 border-emerald-500 animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-4 mb-8 text-emerald-600">
                  <Stethoscope size={24} />
                  <h3 className="text-xl font-black uppercase">Input Pemeriksaan Baru</h3>
                </div>
                
                <form onSubmit={handleSimpan} className="space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                    <InputField label="Tensi (mmHg)" placeholder="120/80" onChange={(v)=>setFormData({...formData, tensi: v})} />
                    <InputField label="Suhu (°C)" placeholder="36.5" type="number" onChange={(v)=>setFormData({...formData, suhu: v})} />
                    <InputField label="Berat (Kg)" placeholder="65" type="number" onChange={(v)=>setFormData({...formData, berat: v})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Keluhan / Catatan</label>
                    <textarea rows="3" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm" placeholder="Apa keluhan pasien hari ini?" onChange={(e)=>setFormData({...formData, keluhan: e.target.value})} required></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Diagnosa Akhir</label>
                    <textarea rows="3" className="w-full p-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm" placeholder="Hasil diagnosa dokter..." onChange={(e)=>setFormData({...formData, diagnosa: e.target.value})} required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-[24px] shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95">
                    <Save size={20} /> SIMPAN KE DATABASE
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-200/60">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-slate-800 uppercase flex items-center gap-3">
                    <Clock className="text-emerald-500" /> Riwayat Kunjungan
                  </h3>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{history.length} Pemeriksaan</span>
                </div>
                
                <div className="space-y-10 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  {history.length > 0 ? (
                    history.map((item) => (
                      <TimelineItem key={item.id} {...item} />
                    ))
                  ) : (
                    <div className="py-20 text-center opacity-30">
                      <FileText size={48} className="mx-auto mb-4" />
                      <p className="text-xs font-black uppercase tracking-widest">Belum ada riwayat medis</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-Komponen
function InputField({ label, placeholder, type="text", onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{label}</label>
      <input 
        type={type} 
        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm" 
        placeholder={placeholder} 
        onChange={(e) => onChange(e.target.value)} 
        required 
      />
    </div>
  );
}

function VitalCard({ icon, label, val, status, color, bg }) {
  return (
    <div className="p-6 rounded-[32px] bg-white border border-slate-200 shadow-sm flex flex-col items-center group hover:shadow-xl transition-all">
      <div className={`mb-3 p-3 ${bg} rounded-2xl`}>{React.cloneElement(icon, { className: color, size: 20 })}</div>
      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{label}</p>
      <p className="text-xl font-black text-slate-800">{val}</p>
      <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 uppercase">{status}</span>
    </div>
  );
}

function TimelineItem({ date, time, title, doctor, note, diagnosa, tag, color }) {
  return (
    <div className="relative pl-16 group animate-in slide-in-from-left duration-500">
      <div className={`absolute left-0 top-0 w-12 h-12 ${color} rounded-[20px] border-4 border-white shadow-lg z-10 flex items-center justify-center text-white`}>
        <Activity size={20} />
      </div>
      <div className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 transition-all hover:bg-white hover:shadow-md">
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{date}</p>
            <p className="text-[8px] font-bold text-slate-400 uppercase">{time}</p>
          </div>
          <span className="text-[9px] font-black px-3 py-1 bg-white border border-slate-100 rounded-full text-slate-400 uppercase">{tag}</span>
        </div>
        <h4 className="font-black text-slate-800 text-lg mb-1">{title}</h4>
        <p className="text-[9px] text-slate-400 font-bold mb-4 uppercase italic">Pemeriksa: {doctor}</p>
        <div className="space-y-2">
          <p className="text-xs text-slate-600 font-medium bg-white/80 p-3 rounded-xl border border-slate-50">Keluhan: "{note}"</p>
          <p className="text-xs text-slate-800 font-bold bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">Diagnosa: {diagnosa}</p>
        </div>
      </div>
    </div>
  );
}

function MenuLink({ href, icon, label, active = false }) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${active ? 'bg-emerald-500 text-emerald-950 font-black shadow-lg shadow-emerald-500/20' : 'text-emerald-100/50 hover:bg-white/5 hover:text-white'}`}>
        {icon} <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
}

export default function RekamMedisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-emerald-950 text-emerald-500 font-black">MEMUAT REKAM MEDIS...</div>}>
      <RekamMedisContent />
    </Suspense>
  );
}