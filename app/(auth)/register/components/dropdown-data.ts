const _listJenisInstansi = [
  {
    id: 1,
    name: 'Pemerintah Pusat',
  },
  {
    id: 2,
    name: 'Pemerintah Daerah',
  },
  {
    id: 3,
    name: 'BUMN',
  },
  {
    id: 4,
    name: 'BUMD',
  },
  {
    id: 5,
    name: 'Swasta',
  },
  {
    id: 6,
    name: 'Lainnya',
  },
];

export const listJenisInstansi = _listJenisInstansi.map(item => ({
  ...item,
}));

const _listBidangUsaha = [
  {
    id: 1,
    name: 'Pertanian',
  },
  {
    id: 2,
    name: 'Perikanan',
  },
  {
    id: 3,
    name: 'Kehutanan',
  },
  {
    id: 4,
    name: 'Pertambangan',
  },
  {
    id: 5,
    name: 'Industri Pengolahan',
  },
  {
    id: 6,
    name: 'Listrik, Gas, Uap, dan Air Bersih',
  },
  {
    id: 7,
    name: 'Konstruksi',
  },
  {
    id: 8,
    name: 'Perdagangan',
  },
  {
    id: 9,
    name: 'Hotel dan Rumah Makan',
  },
  {
    id: 10,
    name: 'Transportasi dan Pergudangan',
  },
  {
    id: 11,
    name: 'Informasi dan Komunikasi',
  },
  {
    id: 12,
    name: 'Keuangan dan Asuransi',
  },
  {
    id: 13,
    name: 'Real Estat',
  },
  {
    id: 14,
    name: 'Jasa Perusahaan',
  },
  {
    id: 15,
    name: 'Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib',
  },
  {
    id: 16,
    name: 'Jasa Pendidikan',
  },
  {
    id: 17,
    name: 'Jasa Kesehatan dan Kegiatan Sosial',
  },
  {
    id: 18,
    name: 'Jasa Kemasyarakatan, Sosial dan Kegiatan Hiburan',
  },
  {
    id: 19,
    name: 'Jasa Lainnya',
  },
  {
    id: 20,
    name: 'Lainnya',
  },
];

export const listBidangUsaha = _listBidangUsaha.map(item => ({
  ...item,
}));
