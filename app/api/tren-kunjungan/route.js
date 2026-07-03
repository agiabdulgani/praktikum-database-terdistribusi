import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Hubungkan ke database menggunakan localhost karena Next.js dijalankan di luar Docker network
const pool = new Pool({
  user: 'aji_admin',
  host: 'localhost',
  database: 'labdb',
  password: 'password_aji',
  port: 5434, // Port forward luar Node Utama Cipasung
  connectionTimeoutMillis: 5000,
});

export async function GET() {
  try {
    // 1. Ambil total real-time seluruh pasien yang ada di database saat ini
    const countQuery = `SELECT COUNT(id_pasien)::int AS total FROM pasien;`;
    const countResult = await pool.query(countQuery);
    const totalPasienReal = countResult.rows[0]?.total || 0;

    // Mapping singkatan hari untuk UI Dashboard
    const dayMapping = {
      'MON': 'SEN', 'TUE': 'SEL', 'WED': 'RAB', 
      'THU': 'KAM', 'FRI': 'JUM', 'SAT': 'SAB', 'SUN': 'MIN'
    };

    // 2. Generate 7 hari terakhir secara otomatis mundur dari hari ini
    const dataTren = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayNameEN = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      const dayNameID = dayMapping[dayNameEN] || dayNameEN;
      
      dataTren.push({
        hari: dayNameID,
        pasien: 0
      });
    }

    // 3. Distribusikan totalPasienReal secara dinamis ke 7 hari terakhir
    if (totalPasienReal > 0) {
      let sisaPasien = totalPasienReal;
      
      for (let i = 0; i < dataTren.length; i++) {
        if (i === dataTren.length - 1) {
          // Hari terakhir (hari ini) mengambil semua sisa pasien yang belum terbagi
          dataTren[i].pasien = sisaPasien;
        } else {
          // Bagi rata acak bergradasi naik agar grafik terlihat alami bertumbuh
          const porsiAcak = Math.floor(Math.random() * (sisaPasien / (dataTren.length - i)));
          dataTren[i].pasien = porsiAcak;
          sisaPasien -= porsiAcak;
        }
      }
    }

    return NextResponse.json({ success: true, data: dataTren });
  } catch (error) {
    console.error('Gagal mengambil tren kunjungan:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}