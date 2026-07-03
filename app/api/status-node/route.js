import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Ambil koneksi database dengan fallback yang aman
const connectionString = process.env.DATABASE_URL || 'postgresql://aji_admin:password_aji@db_sirst:5432/labdb';

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 5000, // Maksimal nunggu koneksi 5 detik, biar gak nge-hang
});

export async function GET() {
  let primaryStatus = 'Disconnected';
  let secondaryStatus = 'Disconnected';
  const startTime = Date.now();

  // 1. Cek Koneksi ke Node Utama (Cipasung)
  try {
    const primaryClient = await pool.connect();
    primaryStatus = 'Connected';
    primaryClient.release();
  } catch (primaryError) {
    console.error('🔴 Gagal terhubung ke Node Utama:', primaryError.message);
    primaryStatus = 'Disconnected';
  }

  // 2. Cek Koneksi ke Node Sekunder (Hanya dijalankan jika Node Utama sukses Connected)
  if (primaryStatus === 'Connected') {
    try {
      const fdwCheck = await pool.query(`
        SELECT 1 FROM pg_foreign_server WHERE srvname = 'secondary_server';
      `);

      if (fdwCheck && fdwCheck.rows && fdwCheck.rows.length > 0) {
        // Cek apakah tabel foreign rekam_medis bisa diakses
        await pool.query('SELECT 1 FROM rekam_medis LIMIT 1;');
        secondaryStatus = 'Connected (via FDW)';
      } else {
        secondaryStatus = 'FDW Not Configured';
      }
    } catch (secondaryError) {
      console.error('🟡 Gagal terhubung ke Node Sekunder via FDW:', secondaryError.message);
      secondaryStatus = 'Disconnected';
    }
  }

  // Hitung total latensi proses pengecekan
  const latency = `${Date.now() - startTime}ms`;

  // Bungkus dalam response JSON yang aman
  return NextResponse.json({
    success: primaryStatus === 'Connected',
    nodes: [
      {
        name: 'Node Utama (Cipasung - Primary)',
        status: primaryStatus,
        ip_host: 'db_sirst',
        port: '5434'
      },
      {
        name: 'Node Sekunder (Singaparna - Secondary)',
        status: secondaryStatus,
        ip_host: 'db_sirst_secondary',
        port: '5435'
      }
    ],
    latency,
    lastChecked: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  });
}