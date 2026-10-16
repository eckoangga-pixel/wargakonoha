'use strict';

/* Petualangan Ninja Cerdas — game edukasi 2D berbasis HTML/CSS/JavaScript.
   Kontrol keyboard, klik, sentuh, dan geser dibuat tanpa library eksternal. */

const SUBJECTS = [
  { id: 'pai', name: 'Pendidikan Agama Islam', short: 'Agama Islam', icon: '☪️', color: 'sage' },
  { id: 'matematika', name: 'Matematika', short: 'Matematika', icon: '➗', color: 'blue' },
  { id: 'indonesia', name: 'Bahasa Indonesia', short: 'B. Indonesia', icon: '📚', color: 'orange' },
  { id: 'pancasila', name: 'Pendidikan Pancasila', short: 'Pancasila', icon: '🇮🇩', color: 'red' },
  { id: 'ipas', name: 'IPAS', short: 'IPAS', icon: '🌏', color: 'green' },
  { id: 'jawa', name: 'Bahasa Jawa', short: 'B. Jawa', icon: '🏮', color: 'gold' },
  { id: 'inggris', name: 'Bahasa Inggris', short: 'B. Inggris', icon: '🔤', color: 'purple' },
  { id: 'pjok', name: 'PJOK', short: 'PJOK', icon: '🏃', color: 'mint' },
  { id: 'koding', name: 'Koding', short: 'Koding', icon: '💻', color: 'navy' },
  { id: 'seni', name: 'Seni Rupa', short: 'Seni Rupa', icon: '🎨', color: 'pink' }
];

// Sepuluh soal berbeda disediakan untuk setiap mata pelajaran.
// Materi dipilih dari konteks umum SD; guru/orang tua tetap dapat meninjau kesesuaian dengan ATP sekolah.
const QUESTION_BANK = {
  pai: [
    { q: 'Siapakah Tuhan Yang Maha Esa dalam ajaran Islam?', opts: ['Allah Swt.', 'Malaikat Jibril', 'Nabi Muhammad', 'Matahari'], a: 0, why: 'Dalam ajaran Islam, Allah Swt. adalah Tuhan Yang Maha Esa.' },
    { q: 'Ada berapa jumlah Rukun Islam?', opts: ['Tiga', 'Lima', 'Enam', 'Tujuh'], a: 1, why: 'Rukun Islam berjumlah lima.' },
    { q: 'Apa yang dilakukan sebelum melaksanakan salat?', opts: ['Bermain dahulu', 'Makan banyak', 'Berwudu', 'Tidur'], a: 2, why: 'Berwudu dilakukan untuk bersuci sebelum salat.' },
    { q: 'Berapa kali salat wajib dilakukan dalam sehari semalam?', opts: ['Dua kali', 'Tiga kali', 'Empat kali', 'Lima kali'], a: 3, why: 'Salat wajib dilakukan lima waktu dalam sehari semalam.' },
    { q: 'Umat Islam berpuasa wajib pada bulan ....', opts: ['Syawal', 'Ramadan', 'Safar', 'Muharam saja'], a: 1, why: 'Puasa wajib bagi umat Islam dilaksanakan pada bulan Ramadan.' },
    { q: 'Kitab suci umat Islam adalah ....', opts: ['Weda', 'Tripitaka', 'Al-Qur’an', 'Taurat saja'], a: 2, why: 'Al-Qur’an adalah kitab suci umat Islam.' },
    { q: 'Sikap yang baik sebelum makan adalah ....', opts: ['Membaca doa', 'Bergegas berebut', 'Mencela makanan', 'Membuang makanan'], a: 0, why: 'Berdoa sebelum makan merupakan adab yang baik dan bentuk syukur.' },
    { q: 'Teman menitipkan pensil kepadamu. Sikap amanah adalah ....', opts: ['Menyembunyikannya', 'Mengembalikan saat diminta', 'Memberikannya kepada orang lain', 'Merusaknya'], a: 1, why: 'Amanah berarti menjaga titipan dan mengembalikannya dengan baik.' },
    { q: 'Zakat fitrah umumnya ditunaikan menjelang ....', opts: ['Tahun baru', 'Tahun ajaran', 'Idulfitri', 'Hari Kartini'], a: 2, why: 'Zakat fitrah ditunaikan pada bulan Ramadan sebelum salat Idulfitri.' },
    { q: 'Siapakah nabi dan rasul terakhir dalam ajaran Islam?', opts: ['Nabi Musa a.s.', 'Nabi Ibrahim a.s.', 'Nabi Isa a.s.', 'Nabi Muhammad saw.'], a: 3, why: 'Nabi Muhammad saw. adalah nabi dan rasul terakhir.' }
  ],
  matematika: [
    { q: 'Berapakah hasil dari 7 + 5?', opts: ['10', '11', '12', '13'], a: 2, why: 'Tujuh ditambah lima sama dengan dua belas.' },
    { q: 'Berapakah hasil dari 15 − 8?', opts: ['6', '7', '8', '9'], a: 1, why: 'Lima belas dikurangi delapan sama dengan tujuh.' },
    { q: 'Hasil dari 6 × 4 adalah ....', opts: ['20', '22', '24', '26'], a: 2, why: 'Enam kelompok berisi empat benda berjumlah 24.' },
    { q: 'Berapakah hasil 36 ÷ 6?', opts: ['5', '6', '7', '8'], a: 1, why: 'Tiga puluh enam dibagi enam sama dengan enam.' },
    { q: 'Pecahan yang nilainya sama dengan 1/2 adalah ....', opts: ['1/3', '2/4', '2/3', '3/5'], a: 1, why: 'Dua per empat dapat disederhanakan menjadi satu per dua.' },
    { q: 'Keliling persegi dengan panjang sisi 4 cm adalah ....', opts: ['8 cm', '12 cm', '16 cm', '20 cm'], a: 2, why: 'Keliling persegi = 4 × sisi, jadi 4 × 4 = 16 cm.' },
    { q: 'Berapakah 25% dari 200?', opts: ['25', '40', '50', '75'], a: 2, why: '25% sama dengan seperempat. Seperempat dari 200 adalah 50.' },
    { q: 'Luas persegi panjang dengan panjang 8 cm dan lebar 3 cm adalah ....', opts: ['11 cm²', '16 cm²', '22 cm²', '24 cm²'], a: 3, why: 'Luas persegi panjang = panjang × lebar = 8 × 3 = 24 cm².' },
    { q: 'Manakah pecahan yang nilainya lebih besar?', opts: ['1/4', '1/3', '1/2', '3/4'], a: 3, why: 'Tiga per empat lebih besar daripada satu per dua, satu per tiga, dan satu per empat.' },
    { q: 'Berapakah hasil dari 125 + 275?', opts: ['300', '350', '400', '450'], a: 2, why: '125 + 275 = 400.' }
  ],
  indonesia: [
    { q: 'Huruf kapital digunakan pada awal ....', opts: ['Kalimat', 'Semua kata', 'Tanda koma', 'Suku kata saja'], a: 0, why: 'Huruf kapital digunakan pada awal kalimat dan nama diri.' },
    { q: 'Tanda baca untuk mengakhiri kalimat tanya adalah ....', opts: ['Titik (.)', 'Koma (,)', 'Tanya (?)', 'Seru (!)'], a: 2, why: 'Kalimat yang menanyakan sesuatu diakhiri tanda tanya.' },
    { q: 'Sinonim atau persamaan kata “indah” adalah ....', opts: ['Kotor', 'Elok', 'Rusak', 'Gelap'], a: 1, why: 'Elok memiliki makna yang hampir sama dengan indah.' },
    { q: 'Lawan kata atau antonim “hemat” adalah ....', opts: ['Cermat', 'Rajin', 'Boros', 'Teliti'], a: 2, why: 'Boros merupakan lawan kata hemat.' },
    { q: 'Kalimat ajakan yang tepat adalah ....', opts: ['Ayo kita menjaga kebersihan kelas!', 'Kelas itu sangat luas.', 'Siapa yang datang?', 'Saya sedang membaca.'], a: 0, why: 'Kata “ayo” menunjukkan ajakan untuk melakukan sesuatu.' },
    { q: 'Gagasan utama dalam paragraf adalah ....', opts: ['Nama penulis', 'Ide pokok yang dibahas', 'Jumlah tanda baca', 'Kalimat paling panjang'], a: 1, why: 'Gagasan utama adalah inti pembahasan sebuah paragraf.' },
    { q: 'Kata yang menunjukkan benda adalah ....', opts: ['Berjalan', 'Cantik', 'Cepat', 'Pohon'], a: 3, why: 'Pohon merupakan kata benda.' },
    { q: 'Kalimat yang efektif adalah ....', opts: ['Para siswa-siswa sedang belajar.', 'Siswa sedang belajar di kelas.', 'Siswa semua semuanya belajar.', 'Belajar sedang para siswa-siswa.'], a: 1, why: 'Kalimat efektif jelas, hemat kata, dan mudah dipahami.' },
    { q: 'Penulisan kata depan yang benar adalah ....', opts: ['dirumah', 'di rumah', 'diRumah', 'di-rumah'], a: 1, why: 'Kata depan “di” yang menunjukkan tempat ditulis terpisah.' },
    { q: 'Ringkasan yang baik seharusnya memuat ....', opts: ['Semua kalimat disalin', 'Cerita tambahan', 'Pokok-pokok informasi', 'Pendapat yang tidak berkaitan'], a: 2, why: 'Ringkasan memuat inti informasi secara singkat tanpa mengubah makna.' }
  ],
  pancasila: [
    { q: 'Bunyi sila pertama Pancasila adalah ....', opts: ['Persatuan Indonesia', 'Ketuhanan Yang Maha Esa', 'Keadilan Sosial bagi Seluruh Rakyat Indonesia', 'Kemanusiaan yang Adil dan Beradab'], a: 1, why: 'Sila pertama berbunyi Ketuhanan Yang Maha Esa.' },
    { q: 'Lambang sila pertama Pancasila adalah ....', opts: ['Bintang', 'Rantai', 'Pohon beringin', 'Kepala banteng'], a: 0, why: 'Bintang emas melambangkan sila pertama.' },
    { q: 'Keputusan bersama sebaiknya diambil melalui ....', opts: ['Paksaan', 'Pertengkaran', 'Musyawarah', 'Suara paling keras'], a: 2, why: 'Musyawarah menghargai pendapat untuk mencari kesepakatan bersama.' },
    { q: 'Gotong royong membersihkan lingkungan menunjukkan sikap ....', opts: ['Mementingkan diri', 'Malas', 'Bersaing tidak sehat', 'Bekerja sama'], a: 3, why: 'Gotong royong berarti bekerja bersama untuk kepentingan bersama.' },
    { q: 'Warna bendera negara Indonesia adalah ....', opts: ['Merah dan putih', 'Biru dan putih', 'Hijau dan kuning', 'Merah dan hitam'], a: 0, why: 'Bendera Indonesia berwarna merah di bagian atas dan putih di bagian bawah.' },
    { q: 'Temanmu berbeda agama. Sikap yang tepat adalah ....', opts: ['Mengejeknya', 'Menghormati dan berteman', 'Memaksanya mengikuti kita', 'Menjauhinya'], a: 1, why: 'Kita perlu menghormati keyakinan orang lain dan hidup rukun.' },
    { q: 'Menghargai pendapat saat rapat kelas sesuai dengan sila ke ....', opts: ['Satu', 'Dua', 'Empat', 'Lima saja'], a: 2, why: 'Sila keempat menekankan musyawarah dan perwakilan.' },
    { q: 'Contoh kewajiban murid di sekolah adalah ....', opts: ['Mendapat pelajaran', 'Menggunakan perpustakaan', 'Mendapat perlindungan', 'Menjaga kebersihan kelas'], a: 3, why: 'Menjaga kebersihan kelas adalah tanggung jawab bersama murid.' },
    { q: 'Sebutan negara Indonesia yang menegaskan bentuk negara kesatuan adalah ....', opts: ['NKRI', 'Koloni', 'Kekaisaran', 'Kerajaan'], a: 0, why: 'NKRI adalah singkatan dari Negara Kesatuan Republik Indonesia.' },
    { q: 'Saat teman menyampaikan pendapat, kita sebaiknya ....', opts: ['Mendengarkan dengan sopan', 'Memotong pembicaraan', 'Menertawakan', 'Berteriak lebih keras'], a: 0, why: 'Mendengarkan pendapat orang lain adalah bentuk sikap demokratis dan saling menghargai.' }
  ],
  ipas: [
    { q: 'Bagian tumbuhan yang umumnya menyerap air dari tanah adalah ....', opts: ['Bunga', 'Daun', 'Akar', 'Buah'], a: 2, why: 'Akar menyerap air dan mineral dari tanah.' },
    { q: 'Sumber energi utama bagi Bumi adalah ....', opts: ['Bulan', 'Matahari', 'Batu', 'Awan'], a: 1, why: 'Matahari menyediakan cahaya dan panas untuk kehidupan di Bumi.' },
    { q: 'Air di permukaan yang berubah menjadi uap karena panas disebut ....', opts: ['Pembekuan', 'Pengembunan', 'Penguapan', 'Pengendapan'], a: 2, why: 'Penguapan adalah perubahan air cair menjadi gas/uap.' },
    { q: 'Garis khatulistiwa membagi Bumi menjadi belahan ....', opts: ['Timur dan barat saja', 'Utara dan selatan', 'Darat dan udara', 'Siang dan malam'], a: 1, why: 'Garis khatulistiwa membagi Bumi menjadi belahan utara dan selatan.' },
    { q: 'Indonesia disebut negara agraris karena ....', opts: ['Sebagian wilayahnya berupa gurun', 'Tidak memiliki sawah', 'Kegiatan pertanian penting bagi penduduknya', 'Seluruh penduduk bekerja di laut'], a: 2, why: 'Negara agraris memiliki kegiatan pertanian yang penting, misalnya sawah dan perkebunan.' },
    { q: 'Organ utama manusia untuk bernapas adalah ....', opts: ['Lambung', 'Jantung', 'Ginjal', 'Paru-paru'], a: 3, why: 'Paru-paru menjadi organ utama pertukaran oksigen dan karbon dioksida.' },
    { q: 'Benda yang bentuk dan volumenya relatif tetap adalah benda ....', opts: ['Padat', 'Cair', 'Gas', 'Uap'], a: 0, why: 'Benda padat memiliki bentuk dan volume yang relatif tetap.' },
    { q: 'Contoh rantai makanan yang benar adalah ....', opts: ['Katak → rumput → belalang', 'Elang → padi → tikus', 'Rumput → belalang → katak', 'Belalang → matahari → rumput'], a: 2, why: 'Rumput dimakan belalang, dan belalang dapat dimakan katak.' },
    { q: 'Hutan mangrove membantu wilayah pantai dengan cara ....', opts: ['Mempercepat abrasi', 'Mengurangi abrasi dan menjadi habitat', 'Mengeringkan laut', 'Menghilangkan semua ikan'], a: 1, why: 'Akar mangrove membantu menahan tanah pantai dan menyediakan habitat makhluk hidup.' },
    { q: 'Indonesia disebut negara maritim karena ....', opts: ['Memiliki wilayah laut yang luas', 'Tidak memiliki pulau', 'Seluruh wilayahnya berupa pegunungan', 'Tidak memiliki pantai'], a: 0, why: 'Wilayah laut yang luas dan banyak pulau membuat Indonesia dikenal sebagai negara maritim.' }
  ],
  jawa: [
    { q: 'Tegese tembung “sugeng enjing” yaiku ....', opts: ['Sugeng dalu', 'Sugeng sonten', 'Sugeng esuk', 'Sugeng tindak'], a: 2, why: '“Sugeng enjing” tegese selamat pagi utawa sugeng esuk.' },
    { q: 'Basa Jawa kanggo “terima kasih” yaiku ....', opts: ['Matur nuwun', 'Nyuwun sewu', 'Sugeng rawuh', 'Pamit'], a: 0, why: '“Matur nuwun” digunakake kanggo matur terima kasih.' },
    { q: 'Tembung “kula” ing basa Indonesia tegese ....', opts: ['Kamu', 'Saya', 'Mereka', 'Kita semua'], a: 1, why: '“Kula” minangka tembung krama kanggo “saya”.' },
    { q: 'Nalika matur marang wong sing luwih tuwa, becike nggunakake basa ....', opts: ['Ngoko kasar', 'Slang', 'Sembarangan', 'Krama sing sopan'], a: 3, why: 'Basa krama digunakake kanggo ngajeni wong sing luwih tuwa.' },
    { q: 'Basa krama kanggo tembung “omah” yaiku ....', opts: ['Griya', 'Lunga', 'Turu', 'Kanca'], a: 0, why: '“Griya” minangka salah siji tembung krama kanggo omah.' },
    { q: 'Tembung krama kanggo “mangan” yaiku ....', opts: ['Mlaku', 'Maca', 'Dhahar', 'Turu'], a: 2, why: '“Dhahar” minangka tembung krama ing konteks mangan.' },
    { q: 'Tembung “bocah” tegese ....', opts: ['Wong tuwa', 'Anak', 'Guru', 'Tanduran'], a: 1, why: '“Bocah” tegese anak utawa cah cilik.' },
    { q: 'Ukara “Piye kabare?” nggunakake basa ....', opts: ['Krama inggil', 'Basa resmi Indonesia', 'Basa Inggris', 'Ngoko'], a: 3, why: '“Piye kabare?” minangka pitakon nganggo basa Jawa ngoko.' },
    { q: 'Tembung “monggo” digunakake kanggo ....', opts: ['Nolak kanthi nesu', 'Ngguyu', 'Mempersilakan utawa mengajak dengan sopan', 'Pamitan kasar'], a: 2, why: '“Monggo” digunakake kanggo mempersilakan kanthi sopan.' },
    { q: 'Tegese “sugeng rawuh” yaiku ....', opts: ['Selamat datang', 'Selamat tidur', 'Terima kasih', 'Sampai jumpa'], a: 0, why: '“Sugeng rawuh” tegese selamat datang.' }
  ],
  inggris: [
    { q: 'What is the Indonesian meaning of “apple”?', opts: ['Jeruk', 'Apel', 'Pisang', 'Mangga'], a: 1, why: '“Apple” means apel.' },
    { q: 'Which word is a color?', opts: ['Table', 'Run', 'Blue', 'Book'], a: 2, why: 'Blue is the English word for warna biru.' },
    { q: 'How do you spell the number 7 in English?', opts: ['Seven', 'Eleven', 'Six', 'Nine'], a: 0, why: 'The number 7 is spelled “seven”.' },
    { q: '“Good morning” artinya ....', opts: ['Selamat malam', 'Selamat tinggal', 'Sampai besok', 'Selamat pagi'], a: 3, why: '“Good morning” is a greeting used in the morning.' },
    { q: 'Choose the correct sentence: “Saya seorang murid.”', opts: ['I is a student.', 'I am a student.', 'I are a student.', 'I be student.'], a: 1, why: 'The correct form is “I am a student.”' },
    { q: 'What is the plural form of “child”?', opts: ['Childs', 'Childes', 'Children', 'Childrens'], a: 2, why: 'The plural form of child is children.' },
    { q: 'The opposite of “hot” is ....', opts: ['Cold', 'Tall', 'Fast', 'Warm'], a: 0, why: 'Hot and cold are opposites.' },
    { q: 'Complete the sentence: “She ___ reading a book.”', opts: ['are', 'am', 'be', 'is'], a: 3, why: 'Use “is” with she in the present continuous sentence.' },
    { q: '“Cat” dalam bahasa Indonesia berarti ....', opts: ['Kelinci', 'Kucing', 'Burung', 'Ikan'], a: 1, why: '“Cat” means kucing.' },
    { q: 'What does “Can I borrow your pencil?” mean?', opts: ['Apakah pensilmu hilang?', 'Di mana buku saya?', 'Bolehkah saya meminjam pensilmu?', 'Siapa yang membawa tas?'], a: 2, why: 'The sentence politely asks permission to borrow a pencil.' }
  ],
  pjok: [
    { q: 'Apa yang sebaiknya dilakukan sebelum berolahraga?', opts: ['Pemanasan', 'Langsung duduk', 'Makan sangat banyak', 'Tidur'], a: 0, why: 'Pemanasan membantu menyiapkan otot dan tubuh sebelum aktivitas.' },
    { q: 'Minum air saat berolahraga membantu mencegah ....', opts: ['Lapar saja', 'Dehidrasi', 'Mengantuk setiap saat', 'Keseleo secara langsung'], a: 1, why: 'Air membantu mengganti cairan yang hilang melalui keringat.' },
    { q: 'Jumlah pemain inti dalam satu tim sepak bola adalah ....', opts: ['5', '7', '11', '15'], a: 2, why: 'Sepak bola dimainkan oleh 11 pemain per tim di lapangan.' },
    { q: 'Alat yang dipukul melewati net dalam permainan bulu tangkis disebut ....', opts: ['Bola basket', 'Bola tenis', 'Cakram', 'Kok atau shuttlecock'], a: 3, why: 'Permainan bulu tangkis menggunakan raket dan kok.' },
    { q: 'Gerakan memantulkan bola sambil berjalan pada permainan bola basket disebut ....', opts: ['Dribbling', 'Servis', 'Smash', 'Heading'], a: 0, why: 'Dribbling adalah memantulkan bola ke lantai sambil bergerak.' },
    { q: 'Contoh gerak lokomotor adalah ....', opts: ['Menekuk siku tanpa berpindah', 'Berlari ke depan', 'Memutar pergelangan tangan', 'Berdiri diam'], a: 1, why: 'Gerak lokomotor membuat tubuh berpindah tempat, misalnya berlari.' },
    { q: 'Sikap fair play berarti ....', opts: ['Menang dengan segala cara', 'Melanggar aturan', 'Bermain jujur dan menghormati lawan', 'Mengejek teman'], a: 2, why: 'Fair play menekankan kejujuran, kepatuhan aturan, dan rasa hormat.' },
    { q: 'Setelah olahraga, kegiatan yang baik dilakukan adalah ....', opts: ['Langsung tidur di lapangan', 'Tidak minum sama sekali', 'Berlari lebih cepat tanpa henti', 'Pendinginan dan mengatur napas'], a: 3, why: 'Pendinginan membantu tubuh kembali ke kondisi istirahat secara bertahap.' },
    { q: 'Melempar dan menangkap bola melatih koordinasi mata dan ....', opts: ['Tangan', 'Telinga', 'Rambut', 'Gigi'], a: 0, why: 'Latihan menangkap bola melibatkan koordinasi mata dan tangan.' },
    { q: 'Kebiasaan yang mendukung kebugaran adalah ....', opts: ['Kurang tidur setiap hari', 'Makan beragam, bergerak, dan cukup istirahat', 'Tidak pernah minum air', 'Duduk sepanjang hari'], a: 1, why: 'Aktivitas fisik, makanan beragam, air yang cukup, dan istirahat seimbang mendukung kesehatan.' }
  ],
  koding: [
    { q: 'Algoritma adalah ....', opts: ['Gambar hias saja', 'Nama perangkat keras', 'Urutan langkah untuk menyelesaikan tugas', 'Kabel komputer'], a: 2, why: 'Algoritma berisi urutan langkah yang logis untuk menyelesaikan masalah.' },
    { q: 'Dalam koding, perintah untuk mengulang langkah disebut ....', opts: ['Loop atau perulangan', 'Hapus layar', 'Speaker', 'Kertas'], a: 0, why: 'Loop menjalankan satu atau beberapa perintah berulang kali.' },
    { q: 'Kesalahan pada program sering disebut ....', opts: ['Folder', 'Bug', 'Monitor', 'Piksel'], a: 1, why: 'Bug adalah kesalahan yang membuat program bekerja tidak sesuai harapan.' },
    { q: 'Mencari dan memperbaiki kesalahan program disebut ....', opts: ['Menggambar', 'Mengunduh', 'Mencetak', 'Debugging'], a: 3, why: 'Debugging adalah proses menemukan dan memperbaiki bug.' },
    { q: 'Data yang dimasukkan ke dalam program disebut ....', opts: ['Input', 'Output', 'Wallpaper', 'Jaringan'], a: 0, why: 'Input adalah masukan yang diproses oleh program.' },
    { q: 'Hasil yang ditampilkan setelah program memproses data disebut ....', opts: ['Keyboard', 'Input', 'Output', 'Bug'], a: 2, why: 'Output adalah hasil dari proses program.' },
    { q: 'Perintah “jika hujan, maka bawa payung” menunjukkan konsep ....', opts: ['Perulangan tanpa akhir', 'Kondisi (if–then)', 'Menghapus berkas', 'Mematikan monitor'], a: 1, why: 'Kondisi memilih tindakan berdasarkan syarat tertentu.' },
    { q: 'Titik kecil penyusun gambar digital pada layar disebut ....', opts: ['Baterai', 'Folder', 'Algoritma', 'Piksel'], a: 3, why: 'Gambar digital tersusun dari piksel-piksel.' },
    { q: 'Tindakan aman saat memakai internet adalah ....', opts: ['Menyimpan kata sandi untuk diri sendiri', 'Memberi kata sandi kepada semua orang', 'Membuka semua tautan tak dikenal', 'Mengunggah alamat rumah sembarangan'], a: 0, why: 'Kata sandi dan informasi pribadi perlu dijaga agar akun tetap aman.' },
    { q: 'Mengapa urutan perintah dalam program penting?', opts: ['Agar layar lebih besar', 'Agar keyboard berubah warna', 'Karena komputer menjalankan instruksi sesuai alurnya', 'Supaya internet selalu cepat'], a: 2, why: 'Urutan instruksi menentukan proses dan hasil yang dikerjakan program.' }
  ],
  seni: [
    { q: 'Warna primer dalam pelajaran seni rupa dasar adalah ....', opts: ['Merah, kuning, biru', 'Hijau, jingga, ungu', 'Hitam, putih, abu-abu', 'Cokelat, merah muda, emas'], a: 0, why: 'Merah, kuning, dan biru sering dikenalkan sebagai warna primer pada seni rupa dasar.' },
    { q: 'Campuran warna merah dan kuning menghasilkan ....', opts: ['Hijau', 'Jingga', 'Ungu', 'Biru'], a: 1, why: 'Merah dicampur kuning menghasilkan warna jingga/oranye.' },
    { q: 'Karya tiga dimensi memiliki ....', opts: ['Warna saja', 'Garis saja', 'Panjang, lebar, dan tinggi', 'Hanya satu sisi datar'], a: 2, why: 'Bentuk tiga dimensi memiliki panjang, lebar, dan tinggi/volume.' },
    { q: 'Karya yang dibuat dengan menempelkan aneka bahan disebut ....', opts: ['Patung pahat', 'Seni suara', 'Tari tradisional', 'Kolase'], a: 3, why: 'Kolase dibuat dengan menyusun dan menempel berbagai bahan pada bidang.' },
    { q: 'Alat yang umum digunakan untuk membuat sketsa adalah ....', opts: ['Pensil', 'Panci', 'Sendok', 'Penggaris ukur suhu'], a: 0, why: 'Pensil cocok untuk membuat garis awal atau sketsa.' },
    { q: 'Kelompok warna yang terasa hangat adalah ....', opts: ['Biru, hijau, ungu', 'Merah, jingga, kuning', 'Hitam, putih, abu-abu', 'Biru muda, putih, perak'], a: 1, why: 'Merah, jingga, dan kuning sering disebut warna hangat.' },
    { q: 'Tekstur dalam seni rupa berkaitan dengan ....', opts: ['Bunyi karya', 'Jumlah penonton', 'Kesan permukaan benda', 'Harga alat gambar'], a: 2, why: 'Tekstur adalah sifat atau kesan permukaan, misalnya kasar atau halus.' },
    { q: 'Kontras dalam karya seni membantu menunjukkan ....', opts: ['Semua bagian harus sama persis', 'Tidak boleh ada warna', 'Hanya satu bentuk', 'Perbedaan yang terlihat jelas'], a: 3, why: 'Kontras membuat perbedaan, misalnya terang-gelap atau besar-kecil, terlihat jelas.' },
    { q: 'Manakah contoh bentuk dua dimensi?', opts: ['Lingkaran pada kertas', 'Bola sepak', 'Kubus kayu', 'Patung manusia'], a: 0, why: 'Lingkaran pada bidang datar merupakan bentuk dua dimensi.' },
    { q: 'Pola hias terbentuk dari ....', opts: ['Bentuk acak tanpa hubungan saja', 'Pengulangan garis, bentuk, atau warna', 'Kertas yang tidak digunakan', 'Satu titik tanpa susunan'], a: 1, why: 'Pola terbentuk melalui pengulangan unsur rupa secara teratur atau terencana.' }
  ]
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const views = { menu: $('#menuView'), game: $('#gameView') };
const modals = { question: $('#questionModal'), pause: $('#pauseModal'), result: $('#resultModal'), help: $('#helpModal') };
const asset = (name) => `assets/${name}`;

const selection = { mode: 'solo', grade: 1, difficulty: 'mudah', subject: 'matematika' };
const state = {
  running: false, paused: false, questionOpen: false, pausedFromQuestion: false,
  playerX: 18, playerLane: 1, enemyX: 80, enemyLane: 1, enemyHp: 100,
  hp: 120, maxHp: 120, score: 0, questionIndex: 0, questions: [], correct: 0,
  attempts: 0, combo: 0, dodgeUntil: 0, attackCooldownUntil: 0,
  enemyAttackAt: 0, enemyLaneChangeAt: 0, gameTimer: null, questionTimer: null,
  questionSeconds: 0, questionLocked: false, toastTimer: null, loopLastTime: 0,
  musicTimer: null, musicStep: 0, musicMode: 'menu', dodgeTimer: null
};

const hero = $('#heroCharacter');
const enemy = $('#enemyCharacter');
const enemyWrap = $('#enemyWrap');
const arena = $('#arena');
let audioContext = null;
let soundEnabled = true;
let musicEnabled = true;
let touchGesture = null;
let movementHold = null;
const MAX_LANE = 2;
const LANE_BOTTOM = [24, 15, 7];
const DEPTH_SCALE = [0.78, 0.9, 1];
const DIFFICULTY = {
  mudah: { timer: 28, maxHp: 120, damage: 8, enemySpeed: 2.5, attackDelay: 3300, scoreMultiplier: 1, label: 'Mudah' },
  sedang: { timer: 21, maxHp: 100, damage: 12, enemySpeed: 3.5, attackDelay: 2650, scoreMultiplier: 1.25, label: 'Sedang' },
  sulit: { timer: 15, maxHp: 85, damage: 17, enemySpeed: 4.7, attackDelay: 2050, scoreMultiplier: 1.6, label: 'Sulit' }
};
const MODE_LABEL = { solo: 'Solo', duo: 'Duo', squad: 'Squad' };

function renderSubjectOptions() {
  const grid = $('#subjectGrid');
  grid.innerHTML = SUBJECTS.map(s => `
    <button class="subject-choice ${s.id === selection.subject ? 'active' : ''}" data-subject="${s.id}" type="button" aria-pressed="${s.id === selection.subject}">
      <span class="subject-icon" aria-hidden="true">${s.icon}</span><b>${s.short}</b>
    </button>`).join('');
  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-subject]');
    if (!button) return;
    selection.subject = button.dataset.subject;
    $$('.subject-choice').forEach(el => {
      const active = el.dataset.subject === selection.subject;
      el.classList.toggle('active', active);
      el.setAttribute('aria-pressed', String(active));
    });
    updateMissionSummary();
    playSfx('select');
  });
}

function updateMissionSummary() {
  const subject = SUBJECTS.find(s => s.id === selection.subject) || SUBJECTS[1];
  $('#missionSummary').innerHTML = `<span>${subject.icon}</span><p><b>${subject.name} · Kelas ${selection.grade}</b><small>${MODE_LABEL[selection.mode]} · ${DIFFICULTY[selection.difficulty].label} · 10 soal berbeda</small></p><span class="summary-arrow">↗</span>`;
}

function setActiveChoice(selector, datasetKey, value) {
  $$(selector).forEach(button => {
    const active = button.dataset[datasetKey] === String(value);
    button.classList.toggle('active', active);
    if (button.hasAttribute('aria-pressed')) button.setAttribute('aria-pressed', String(active));
  });
}

function setupChoices() {
  $$('.mode-options [data-mode]').forEach(button => button.addEventListener('click', () => {
    selection.mode = button.dataset.mode;
    setActiveChoice('.mode-options [data-mode]', 'mode', selection.mode);
    updateMissionSummary(); playSfx('select');
  }));
  $$('.grade-options [data-grade]').forEach(button => button.addEventListener('click', () => {
    selection.grade = Number(button.dataset.grade);
    setActiveChoice('.grade-options [data-grade]', 'grade', selection.grade);
    updateMissionSummary(); playSfx('select');
  }));
  $$('.difficulty-options [data-difficulty]').forEach(button => button.addEventListener('click', () => {
    selection.difficulty = button.dataset.difficulty;
    setActiveChoice('.difficulty-options [data-difficulty]', 'difficulty', selection.difficulty);
    updateMissionSummary(); playSfx('select');
  }));
}

function shuffle(items) {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getQuestionTime() {
  const base = DIFFICULTY[selection.difficulty].timer;
  const gradeAdjustment = selection.grade <= 2 ? 4 : (selection.grade >= 5 ? -1 : 0);
  return Math.max(10, base + gradeAdjustment);
}

function ensureAudio() {
  if (!soundEnabled) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  if (!audioContext) audioContext = new AudioCtx();
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
}

function tone(freq, duration = 0.12, type = 'triangle', volume = 0.04, endFreq = null) {
  if (!soundEnabled) return;
  ensureAudio();
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(Math.max(30, freq), now);
  if (endFreq) oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), now + Math.min(0.025, duration / 3));
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain); gain.connect(audioContext.destination);
  oscillator.start(now); oscillator.stop(now + duration + 0.02);
}

const MELODIES = {
  menu: [659, 784, 988, 784, 587, 659, 784, 523, 659, 784, 880, 784, 587, 523, 587, 659],
  battle: [440, 523, 659, 523, 392, 440, 587, 440, 349, 440, 523, 659, 523, 440, 392, 349]
};

function startMusic(mode = 'menu') {
  if (!musicEnabled || !soundEnabled) return;
  ensureAudio();
  if (!audioContext) return;
  if (state.musicTimer) clearInterval(state.musicTimer);
  state.musicMode = mode;
  state.musicStep = 0;
  const melody = MELODIES[mode] || MELODIES.menu;
  state.musicTimer = setInterval(() => {
    if (!soundEnabled || !musicEnabled || !state.running && state.musicMode === 'battle') return;
    const note = melody[state.musicStep % melody.length];
    tone(note, 0.23, 'triangle', mode === 'menu' ? 0.018 : 0.012);
    if (state.musicStep % 4 === 0) tone(note / 2, 0.24, 'sine', 0.009);
    state.musicStep++;
  }, mode === 'menu' ? 420 : 330);
}

function stopMusic() {
  if (state.musicTimer) clearInterval(state.musicTimer);
  state.musicTimer = null;
}

function playSfx(name) {
  if (!soundEnabled) return;
  const sounds = {
    select: () => { tone(660, .07, 'triangle', .025); tone(880, .08, 'triangle', .018); },
    punch: () => { tone(190, .09, 'sawtooth', .045, 95); tone(420, .06, 'triangle', .025, 180); },
    kick: () => { tone(150, .13, 'sawtooth', .05, 70); tone(620, .09, 'triangle', .022, 240); },
    shuriken: () => { tone(780, .2, 'sawtooth', .025, 360); tone(1180, .11, 'triangle', .016, 680); },
    jutsu: () => { tone(120, .28, 'sawtooth', .032, 580); setTimeout(() => tone(520, .19, 'triangle', .032, 160), 80); },
    jump: () => { tone(230, .17, 'triangle', .025, 650); },
    hit: () => { tone(110, .23, 'sawtooth', .055, 55); tone(180, .08, 'square', .018, 70); },
    dodge: () => { tone(460, .13, 'triangle', .026, 860); },
    correct: () => { tone(659, .12, 'triangle', .035); setTimeout(() => tone(784, .13, 'triangle', .035), 90); setTimeout(() => tone(988, .18, 'triangle', .04), 180); },
    wrong: () => { tone(260, .17, 'triangle', .035, 170); },
    win: () => { [523,659,784,1047].forEach((n,i) => setTimeout(() => tone(n,.22,'triangle',.035), i*115)); },
    lose: () => { tone(260,.25,'triangle',.04,190); setTimeout(() => tone(180,.4,'triangle',.035,95),200); },
    pause: () => { tone(400,.09,'triangle',.025); },
    enemy: () => { tone(230,.1,'sawtooth',.028,120); }
  };
  if (sounds[name]) sounds[name]();
}

function updateSoundButton() {
  $('#soundToggle').textContent = soundEnabled ? '♫ Suara: ON' : '♩ Suara: OFF';
  $('#soundToggle').setAttribute('aria-pressed', String(soundEnabled));
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  musicEnabled = soundEnabled;
  updateSoundButton();
  if (soundEnabled) { ensureAudio(); startMusic(state.running ? 'battle' : 'menu'); playSfx('select'); }
  else stopMusic();
}

function showToast(text, ms = 950) {
  const toast = $('#arenaToast');
  toast.textContent = text;
  toast.classList.add('show');
  if (state.toastTimer) clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove('show'), ms);
}

function addArenaEffect(className, text, x, bottom, duration = 650) {
  const effect = document.createElement('span');
  effect.className = className;
  effect.textContent = text;
  effect.style.left = `${Math.min(94, Math.max(5, x))}%`;
  effect.style.bottom = `${Math.min(85, Math.max(5, bottom))}%`;
  arena.appendChild(effect);
  setTimeout(() => effect.remove(), duration);
}

function changeHeroImage(src, resetAfter = 500) {
  hero.src = asset(src);
  if (state.heroImageTimer) clearTimeout(state.heroImageTimer);
  state.heroImageTimer = setTimeout(() => {
    hero.src = asset('hero.gif');
  }, resetAfter);
}

function renderActors() {
  hero.style.left = `${state.playerX}%`;
  hero.style.bottom = `${LANE_BOTTOM[state.playerLane]}%`;
  hero.style.transform = `translateX(-50%) scale(${DEPTH_SCALE[state.playerLane]}) scaleX(1)`;
  $('#heroShadow').style.left = `${state.playerX}%`;
  $('#heroShadow').style.bottom = `${Math.max(3, LANE_BOTTOM[state.playerLane] - 1)}%`;

  enemyWrap.style.left = `${state.enemyX}%`;
  enemyWrap.style.bottom = `${LANE_BOTTOM[state.enemyLane]}%`;
  enemyWrap.style.transform = `translateX(-50%) scale(${DEPTH_SCALE[state.enemyLane]})`;
  $('#enemyShadow').style.left = `${state.enemyX}%`;
  $('#enemyShadow').style.bottom = `${Math.max(3, LANE_BOTTOM[state.enemyLane] - 1)}%`;
  enemy.style.transform = 'scaleX(-1)';

  const allyLayer = $('#alliesLayer');
  const allyCount = selection.mode === 'squad' ? 2 : (selection.mode === 'duo' ? 1 : 0);
  while (allyLayer.children.length < allyCount) {
    const ally = document.createElement('img');
    ally.className = 'ally-character'; ally.src = asset('ally.gif'); ally.alt = ''; ally.draggable = false;
    allyLayer.appendChild(ally);
  }
  while (allyLayer.children.length > allyCount) allyLayer.lastElementChild.remove();
  Array.from(allyLayer.children).forEach((ally, idx) => {
    const offset = idx === 0 ? -7.3 : -13.2;
    const lane = Math.max(0, Math.min(2, state.playerLane + (idx % 2 === 0 ? -1 : 1)));
    ally.style.left = `${Math.max(5, state.playerX + offset)}%`;
    ally.style.bottom = `${LANE_BOTTOM[lane]}%`;
    ally.style.transform = `translateX(-50%) scale(${DEPTH_SCALE[lane]})`;
  });
}

function updateHud() {
  const hp = Math.max(0, Math.min(state.maxHp, state.hp));
  $('#lifeText').textContent = `${hp} / ${state.maxHp} HP`;
  $('#lifeFill').style.width = `${(hp / state.maxHp) * 100}%`;
  $('#lifeFill').style.background = hp / state.maxHp < .28 ? 'linear-gradient(90deg,#ff606b,#ff9a78)' : 'linear-gradient(90deg,#4cda8a,#a6ed72)';
  $('#scoreValue').textContent = state.score.toLocaleString('id-ID');
  $('#questionProgress').textContent = `${state.questionIndex} / 10`;
  $('#progressFill').style.width = `${state.questionIndex * 10}%`;
  const orbCount = selection.mode === 'squad' ? 4 : (selection.mode === 'duo' ? 3 : 2);
  $$('.chakra-orbs i').forEach((orb, i) => orb.style.background = i < orbCount ? '#63d4ff' : '#2d7195');
  $('#chakraText').textContent = state.dodgeUntil > Date.now() ? 'Menghindar!' : 'Jurus siap';
  $('#enemyHpFill').style.width = `${Math.max(0,state.enemyHp)}%`;
}

function updateMissionHeader() {
  const subject = SUBJECTS.find(s => s.id === selection.subject);
  $('#missionKicker').textContent = `MISI NINJA · ${MODE_LABEL[selection.mode].toUpperCase()}`;
  $('#gameMissionTitle').textContent = `${subject ? subject.name : 'Misi'} · Kelas ${selection.grade}`;
  $('#gameMissionSub').textContent = `${MODE_LABEL[selection.mode]} · ${DIFFICULTY[selection.difficulty].label} · ${selection.grade <= 2 ? 'Waktu ekstra untuk belajar' : (selection.grade >= 5 ? 'Tantangan kelas atas' : 'Misi seimbang')}`;
}

function startGame() {
  const questionSet = QUESTION_BANK[selection.subject];
  if (!Array.isArray(questionSet) || questionSet.length < 10) {
    alert('Soal untuk mata pelajaran ini belum tersedia.'); return;
  }
  clearGameTimers();
  stopMusic();
  const diff = DIFFICULTY[selection.difficulty];
  const partyBonus = selection.mode === 'squad' ? 20 : (selection.mode === 'duo' ? 10 : 0);
  state.running = true; state.paused = false; state.questionOpen = false; state.pausedFromQuestion = false;
  state.playerX = 18; state.playerLane = 1; state.enemyX = 81; state.enemyLane = 1; state.enemyHp = 100;
  state.maxHp = diff.maxHp + partyBonus; state.hp = state.maxHp; state.score = 0;
  state.questionIndex = 0; state.questions = shuffle(questionSet).slice(0,10); state.correct = 0; state.attempts = 0; state.combo = 0;
  state.dodgeUntil = 0; state.attackCooldownUntil = 0; state.enemyAttackAt = Date.now() + 2500;
  state.enemyLaneChangeAt = Date.now() + 2600; state.questionLocked = false; state.questionSeconds = 0;
  $('#enemyName').textContent = selection.mode === 'squad' ? 'MUSUH REGU BAYANGAN' : (selection.mode === 'duo' ? 'MUSUH PENGINTAI' : 'MUSUH BAYANGAN');
  enemy.src = asset(selection.mode === 'squad' ? 'enemy-blue.gif' : 'enemy.gif');
  views.menu.hidden = true; views.game.hidden = false;
  Object.values(modals).forEach(modal => modal.hidden = true);
  updateMissionHeader(); renderActors(); updateHud();
  startMusic('battle');
  showToast('MISI DIMULAI!', 1200);
  state.loopLastTime = performance.now();
  state.gameTimer = setInterval(gameTick, 100);
  playSfx('win');
}

function clearGameTimers() {
  if (state.gameTimer) clearInterval(state.gameTimer);
  if (state.questionTimer) clearInterval(state.questionTimer);
  if (state.toastTimer) clearTimeout(state.toastTimer);
  if (state.heroImageTimer) clearTimeout(state.heroImageTimer);
  if (state.dodgeTimer) clearTimeout(state.dodgeTimer);
  state.gameTimer = null; state.questionTimer = null; state.toastTimer = null; state.heroImageTimer = null; state.dodgeTimer = null;
}

function gameTick() {
  if (!state.running || state.paused || state.questionOpen) return;
  const now = Date.now();
  const dt = Math.min(0.22, Math.max(0.06, (performance.now() - state.loopLastTime) / 1000));
  state.loopLastTime = performance.now();
  const diff = DIFFICULTY[selection.difficulty];
  const gap = (state.enemyX - state.playerX) / 100;

  if (now >= state.enemyLaneChangeAt) {
    if (Math.random() < .72) state.enemyLane = Math.max(0, Math.min(MAX_LANE, state.enemyLane + (Math.random() < .5 ? -1 : 1)));
    state.enemyLaneChangeAt = now + (selection.difficulty === 'sulit' ? 1800 : 2600 + Math.random() * 1500);
  }
  if (gap > .22) state.enemyX -= diff.enemySpeed * dt;
  else if (gap < .17) state.enemyX = Math.max(state.playerX + 17, state.enemyX);

  if (gap < .29 && now >= state.enemyAttackAt) {
    state.enemyAttackAt = now + diff.attackDelay;
    enemyAttack();
  }
  // Jaga arena agar tidak saling menembus saat hero berjalan mendekati lawan.
  state.enemyX = Math.max(state.playerX + 17, Math.min(91, state.enemyX));
  renderActors();
}

function movePlayer(direction, amount = 2.7) {
  if (!state.running || state.paused || state.questionOpen) return;
  if (direction === 'left') {
    state.playerX = Math.max(7, state.playerX - amount);
    changeHeroImage('hero-run.gif', 400);
  } else if (direction === 'right') {
    state.playerX = Math.min(65, state.playerX + amount);
    changeHeroImage('hero-run.gif', 400);
  } else if (direction === 'up') {
    state.playerLane = Math.max(0, state.playerLane - 1);
    addArenaEffect('smoke-puff', '', state.playerX, LANE_BOTTOM[state.playerLane] + 2);
    playSfx('dodge');
  } else if (direction === 'down') {
    state.playerLane = Math.min(MAX_LANE, state.playerLane + 1);
    addArenaEffect('smoke-puff', '', state.playerX, LANE_BOTTOM[state.playerLane] + 2);
    playSfx('dodge');
  } else if (direction === 'dodge') {
    performDodge(); return;
  }
  renderActors();
  updateHud();
}

function performDodge() {
  if (!state.running || state.paused || state.questionOpen) return;
  state.dodgeUntil = Date.now() + 900;
  hero.classList.remove('dodge-reaction'); void hero.offsetWidth; hero.classList.add('dodge-reaction');
  state.playerLane = state.playerLane === 2 ? 1 : (state.playerLane === 0 ? 1 : (Math.random() < .5 ? 0 : 2));
  addArenaEffect('smoke-puff', '', state.playerX, LANE_BOTTOM[state.playerLane] + 2);
  playSfx('dodge'); showToast('HINDAR CEPAT!', 650);
  renderActors(); updateHud();
  if (state.dodgeTimer) clearTimeout(state.dodgeTimer);
  state.dodgeTimer = setTimeout(() => hero.classList.remove('dodge-reaction'), 400);
}

function attackRange(type) {
  if (type === 'jutsu') return .75;
  if (type === 'shuriken') return .69;
  if (type === 'kick') return .54;
  return .48;
}

function performAttack(type = 'punch') {
  if (!state.running || state.paused || state.questionOpen || state.questionLocked) return;
  const now = Date.now();
  if (now < state.attackCooldownUntil) return;
  state.attackCooldownUntil = now + (type === 'jutsu' ? 950 : type === 'shuriken' ? 600 : 470);
  const dist = (state.enemyX - state.playerX) / 100;
  const sameLane = Math.abs(state.enemyLane - state.playerLane) <= (type === 'shuriken' || type === 'jutsu' ? 1 : 0);
  const range = attackRange(type);
  const effectBottom = (LANE_BOTTOM[state.playerLane] + LANE_BOTTOM[state.enemyLane]) / 2 + 5;

  if (type === 'punch') {
    hero.classList.remove('attack-punch'); void hero.offsetWidth; hero.classList.add('attack-punch');
    changeHeroImage('hero-punch.gif', 480); playSfx('punch');
    addArenaEffect('action-fx', '✦', state.playerX + Math.min(12, Math.max(2, dist * 30)), effectBottom);
  } else if (type === 'kick') {
    hero.classList.remove('attack-kick'); void hero.offsetWidth; hero.classList.add('attack-kick');
    changeHeroImage('hero-run.gif', 500); playSfx('kick');
    addArenaEffect('action-fx', '💥', state.playerX + Math.min(14, Math.max(3, dist * 34)), effectBottom);
  } else if (type === 'shuriken') {
    changeHeroImage('hero-run.gif', 400); playSfx('shuriken');
    addArenaEffect('shuriken-projectile', '✥', state.playerX + 4, LANE_BOTTOM[state.playerLane] + 16, 600);
  } else if (type === 'jutsu') {
    changeHeroImage('hero-jutsu.gif', 680); playSfx('jutsu');
    addArenaEffect('action-fx jutsu-fx', '🔥', state.playerX + Math.max(8, Math.min(29, dist * 52)), effectBottom, 780);
    addArenaEffect('smoke-puff', '', state.playerX + 5, LANE_BOTTOM[state.playerLane] + 5, 700);
  }

  const canHit = dist <= range && dist > 0 && sameLane;
  if (!canHit) {
    if (!sameLane) showToast('UBAH JALUR UNTUK MEMBIDIK!', 900);
    else if (dist > range) showToast('MAJU MENDEKATI MUSUH!', 850);
    else showToast('MUNDUR DAN ATUR JARAK!', 850);
    return;
  }

  enemy.classList.remove('enemy-hit'); void enemy.offsetWidth; enemy.classList.add('enemy-hit');
  enemyWrap.classList.remove('enemy-attack');
  addArenaEffect('action-fx', type === 'jutsu' ? '⚡' : '✦', state.enemyX - 3, LANE_BOTTOM[state.enemyLane] + 15, 550);
  state.enemyHp = Math.max(0, state.enemyHp - (type === 'jutsu' ? 60 : type === 'shuriken' ? 45 : type === 'kick' ? 38 : 30));
  updateHud();
  if (state.enemyHp <= 0 || state.enemyHp < 100) {
    // Setiap serangan yang mengenai sasaran membuka satu tantangan pelajaran.
    openQuestion();
  }
}

function enemyAttack() {
  if (!state.running || state.paused || state.questionOpen) return;
  enemyWrap.classList.remove('enemy-attack'); void enemyWrap.offsetWidth; enemyWrap.classList.add('enemy-attack');
  addArenaEffect('action-fx', '⚡', Math.max(10, state.enemyX - 5), LANE_BOTTOM[state.enemyLane] + 10, 400);
  setTimeout(() => enemyWrap.classList.remove('enemy-attack'), 380);
  if (Date.now() < state.dodgeUntil || Math.abs(state.enemyLane - state.playerLane) > 0) {
    showToast('SERANGAN MUSUH MELENCENG!', 700); playSfx('dodge');
    return;
  }
  const damage = DIFFICULTY[selection.difficulty].damage;
  state.hp = Math.max(0, state.hp - damage);
  hero.classList.remove('hit-reaction'); void hero.offsetWidth; hero.classList.add('hit-reaction');
  addArenaEffect('action-fx', '💢', state.playerX + 2, LANE_BOTTOM[state.playerLane] + 12, 450);
  playSfx('hit'); updateHud(); showToast(`TERKENA SERANGAN! −${damage} HP`, 900);
  if (state.hp <= 0) finishMission(false);
}

function openQuestion() {
  if (!state.running || state.paused || state.questionOpen || state.questionIndex >= 10) return;
  state.questionOpen = true;
  state.questionLocked = false;
  stopQuestionTimer();
  renderQuestion();
  modals.question.hidden = false;
  $('#answerFeedback').className = 'answer-feedback';
  $('#answerFeedback').textContent = 'Pilih jawabanmu sebelum waktu habis!';
  startQuestionCountdown(true);
  $('#liveStatus').textContent = 'Soal baru dibuka. Pilih salah satu jawaban.';
}

function renderQuestion() {
  const subject = SUBJECTS.find(s => s.id === selection.subject);
  const q = state.questions[state.questionIndex];
  if (!q) return;
  $('#questionSubject').textContent = (subject ? subject.name : 'Mata Pelajaran').toUpperCase();
  $('#questionNumber').textContent = `SOAL ${state.questionIndex + 1} DARI 10`;
  $('#questionTitle').textContent = q.q;
  $('#questionContext').textContent = selection.grade <= 2 ? 'Pikirkan baik-baik. Kamu boleh mencoba lagi jika belum tepat.' : 'Pilih jawaban paling tepat untuk menaklukkan musuh.';
  $('#questionStreak').textContent = `KOMBO ×${Math.max(1,state.combo)}`;
  $('#answerGrid').innerHTML = q.opts.map((opt, idx) => `
    <button type="button" class="answer-button" data-answer="${idx}">
      <span class="answer-letter">${String.fromCharCode(65 + idx)}</span>${escapeHtml(opt)}
    </button>`).join('');
  $$('#answerGrid [data-answer]').forEach(button => button.addEventListener('click', () => answerQuestion(Number(button.dataset.answer), false)));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
}

function stopQuestionTimer() {
  if (state.questionTimer) clearInterval(state.questionTimer);
  state.questionTimer = null;
}

function renderTimer() {
  const el = $('#questionTimer');
  el.textContent = `⏱ ${state.questionSeconds} dtk`;
  el.classList.toggle('urgent', state.questionSeconds <= 5);
}

function startQuestionCountdown(reset = false) {
  stopQuestionTimer();
  if (reset || !state.questionSeconds) state.questionSeconds = getQuestionTime();
  renderTimer();
  state.questionTimer = setInterval(() => {
    if (!state.running || state.paused || !state.questionOpen || state.questionLocked) return;
    state.questionSeconds -= 1;
    renderTimer();
    if (state.questionSeconds <= 0) handleWrongAnswer(-1, true);
  }, 1000);
}

function answerQuestion(index, timedOut = false) {
  if (!state.running || state.paused || !state.questionOpen || state.questionLocked) return;
  const q = state.questions[state.questionIndex];
  if (!q) return;
  state.attempts += 1;
  if (index === q.a) {
    state.questionLocked = true; stopQuestionTimer();
    state.correct += 1; state.combo += 1;
    const comboBonus = Math.min(25, Math.max(0, state.combo - 1) * 5);
    const award = Math.round(100 * DIFFICULTY[selection.difficulty].scoreMultiplier + comboBonus);
    state.score += award;
    $$('#answerGrid [data-answer]').forEach(button => {
      button.disabled = true;
      if (Number(button.dataset.answer) === q.a) button.classList.add('correct');
    });
    $('#answerFeedback').className = 'answer-feedback good';
    $('#answerFeedback').textContent = `BENAR! +${award} poin. ${q.why}`;
    $('#questionStreak').textContent = `KOMBO ×${state.combo}`;
    state.enemyHp = 0; updateHud(); playSfx('correct');
    addArenaEffect('action-fx jutsu-fx', '✨', state.enemyX - 2, LANE_BOTTOM[state.enemyLane] + 17, 850);
    setTimeout(() => addArenaEffect('smoke-puff', '', state.enemyX, LANE_BOTTOM[state.enemyLane] + 3, 650), 100);
    setTimeout(() => {
      if (!state.running) return;
      modals.question.hidden = true;
      state.questionOpen = false;
      state.questionLocked = false;
      state.questionIndex += 1;
      updateHud();
      if (state.questionIndex >= 10) {
        finishMission(true);
      } else {
        state.enemyX = Math.max(75, 81 + Math.random() * 7);
        state.enemyLane = Math.floor(Math.random() * 3);
        state.enemyHp = 100;
        state.enemyAttackAt = Date.now() + 2100;
        state.enemyLaneChangeAt = Date.now() + 2400;
        const variant = Math.random() > .55 ? 'enemy.gif' : 'enemy-blue.gif';
        enemy.src = asset(variant);
        renderActors(); updateHud();
        showToast(`SOAL ${state.questionIndex} TERBUKA!`, 1000);
        if (state.score > 0 && state.questionIndex % 3 === 0) { state.hp = Math.min(state.maxHp, state.hp + 4); updateHud(); }
      }
    }, 850);
  } else {
    handleWrongAnswer(index, timedOut);
  }
}

function handleWrongAnswer(index, timedOut) {
  if (state.questionLocked || !state.questionOpen || !state.running) return;
  state.questionLocked = true; stopQuestionTimer(); state.attempts += timedOut ? 1 : 0; state.combo = 0;
  const q = state.questions[state.questionIndex];
  const damage = timedOut ? Math.max(8, Math.round(DIFFICULTY[selection.difficulty].damage * .75)) : DIFFICULTY[selection.difficulty].damage;
  state.hp = Math.max(0, state.hp - damage);
  $$('#answerGrid [data-answer]').forEach(button => {
    button.disabled = true;
    if (Number(button.dataset.answer) === q.a) button.classList.add('correct');
    else if (Number(button.dataset.answer) === index) button.classList.add('incorrect');
  });
  $('#answerFeedback').className = 'answer-feedback bad';
  $('#answerFeedback').textContent = `${timedOut ? 'WAKTU HABIS.' : 'BELUM TEPAT.'} −${damage} HP. ${q.why} Coba lagi!`;
  $('#questionStreak').textContent = 'KOMBO DIULANG';
  playSfx('wrong'); playSfx('hit'); updateHud();
  hero.classList.remove('hit-reaction'); void hero.offsetWidth; hero.classList.add('hit-reaction');
  if (state.hp <= 0) {
    setTimeout(() => finishMission(false), 700);
    return;
  }
  const retryQuestion = () => {
    if (!state.running || !state.questionOpen) return;
    if (state.paused) { setTimeout(retryQuestion, 220); return; }
    state.questionLocked = false;
    renderQuestion();
    $('#answerFeedback').className = 'answer-feedback';
    $('#answerFeedback').textContent = 'Coba lagi ya, shinobi! Perhatikan petunjuk dari pembahasan.';
    startQuestionCountdown(true);
  };
  setTimeout(retryQuestion, 1450);
}

function togglePause(forcePause = false) {
  if (!state.running) return;
  if (!state.paused && (forcePause || !state.paused)) {
    state.pausedFromQuestion = state.questionOpen;
    state.paused = true;
    stopQuestionTimer();
    modals.question.hidden = true;
    modals.pause.hidden = false;
    playSfx('pause');
  } else {
    state.paused = false;
    modals.pause.hidden = true;
    if (state.pausedFromQuestion && state.questionOpen) {
      modals.question.hidden = false;
      startQuestionCountdown(false);
    } else {
      state.loopLastTime = performance.now();
    }
    state.pausedFromQuestion = false;
  }
}

function finishMission(won) {
  if (!state.running && modals.result.hidden) return;
  state.running = false; state.paused = false; state.questionOpen = false; state.questionLocked = true;
  clearGameTimers(); stopMusic();
  modals.question.hidden = true; modals.pause.hidden = true; modals.result.hidden = false;
  const accuracy = state.attempts > 0 ? state.correct / state.attempts : (won ? 1 : 0);
  const stars = !won ? 0 : (accuracy >= .9 ? 3 : (accuracy >= .72 ? 2 : 1));
  $('#resultIcon').textContent = won ? (stars === 3 ? '🏆' : '🥷') : '💫';
  $('#resultEyebrow').textContent = won ? 'MISI BERHASIL' : 'MISI TERHENTI';
  $('#resultTitle').textContent = won ? (stars === 3 ? 'Ninja Legendaris!' : 'Hebat, Ninja!') : 'Nyawa Habis!';
  $('#resultDescription').textContent = won
    ? `Kamu menyelesaikan 10 tantangan ${SUBJECTS.find(s => s.id === selection.subject).name}. Terus belajar, bekerja sama, dan berani mencoba!`
    : `Kamu berhasil menjawab ${state.correct} dari 10 soal. Istirahat sebentar, pelajari pembahasan, lalu coba misi lagi.`;
  $('#starReward').innerHTML = [0,1,2].map(i => `<span class="${i < stars ? 'earned' : ''}">${i < stars ? '★' : '☆'}</span>`).join(' ');
  $('#starReward').setAttribute('aria-label', `${stars} bintang hadiah`);
  $('#resultScore').textContent = state.score.toLocaleString('id-ID');
  $('#resultCorrect').textContent = `${state.correct}/10`;
  $('#resultHp').textContent = `${Math.round(100 * state.hp / state.maxHp)}%`;
  $('#reflectionBox').hidden = !won;
  $('#reflectionThanks').hidden = true;
  $$('.reflection-options button').forEach(button => button.classList.remove('selected'));
  $('#playAgainButton').textContent = won ? '↻ MAIN LAGI' : '↻ COBA LAGI';
  $('#liveStatus').textContent = won ? 'Misi selesai. Hadiah bintang tersedia.' : 'Misi berakhir. Coba lagi setelah mempelajari pembahasan.';
  if (won) playSfx('win'); else playSfx('lose');
}

function returnToMenu() {
  clearGameTimers(); stopMusic();
  state.running = false; state.paused = false; state.questionOpen = false; state.questionLocked = false;
  Object.values(modals).forEach(modal => modal.hidden = true);
  views.game.hidden = true; views.menu.hidden = false;
  $('#liveStatus').textContent = 'Menu utama.';
  if (soundEnabled && musicEnabled) startMusic('menu');
}

function openHelp() {
  modals.help.hidden = false;
  playSfx('select');
}

function closeHelp() {
  modals.help.hidden = true;
}

function bindControls() {
  $('#startButton').addEventListener('click', () => { ensureAudio(); startGame(); });
  $('#soundToggle').addEventListener('click', toggleSound);
  $('#pauseButton').addEventListener('click', () => togglePause(true));
  $('#resumeButton').addEventListener('click', () => togglePause(false));
  $('#homeButton').addEventListener('click', returnToMenu);
  $('#pauseHomeButton').addEventListener('click', returnToMenu);
  $('#resultHomeButton').addEventListener('click', returnToMenu);
  $('#playAgainButton').addEventListener('click', () => { modals.result.hidden = true; startGame(); });
  $('#helpButton').addEventListener('click', openHelp);
  $('#closeHelpButton').addEventListener('click', closeHelp);
  $('#gotItButton').addEventListener('click', closeHelp);
  $('#brandHome').addEventListener('click', (event) => { if (state.running) { event.preventDefault(); returnToMenu(); } });
  $$('.reflection-options [data-reflection]').forEach(button => button.addEventListener('click', () => {
    $$('.reflection-options [data-reflection]').forEach(el => el.classList.toggle('selected', el === button));
    $('#reflectionThanks').hidden = false;
    playSfx('select');
  }));

  $$('.direction-button[data-move]').forEach(button => {
    const direction = button.dataset.move;
    const endHold = () => { if (movementHold) clearInterval(movementHold); movementHold = null; };
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      if (direction === 'dodge') { performDodge(); return; }
      movePlayer(direction, 2.2);
      endHold();
      movementHold = setInterval(() => movePlayer(direction, 1.35), 95);
      try { button.setPointerCapture(event.pointerId); } catch (_) {}
    });
    ['pointerup','pointercancel','lostpointercapture','pointerleave'].forEach(name => button.addEventListener(name, endHold));
    button.addEventListener('contextmenu', e => e.preventDefault());
  });
  $$('.action-button[data-action]').forEach(button => button.addEventListener('pointerdown', event => {
    event.preventDefault(); performAttack(button.dataset.action);
  }));

  // Gerakan geser pada arena: horizontal untuk maju/mundur, vertikal untuk berpindah jalur.
  arena.addEventListener('pointerdown', event => {
    if (!state.running || state.paused || state.questionOpen || event.target.closest('button')) return;
    touchGesture = { x: event.clientX, y: event.clientY, time: Date.now(), moved: false };
  });
  arena.addEventListener('pointermove', event => {
    if (!touchGesture || !state.running || state.paused || state.questionOpen) return;
    if (Math.abs(event.clientX - touchGesture.x) + Math.abs(event.clientY - touchGesture.y) > 15) touchGesture.moved = true;
  });
  arena.addEventListener('pointerup', event => {
    if (!touchGesture) return;
    const start = touchGesture; touchGesture = null;
    if (!state.running || state.paused || state.questionOpen) return;
    const dx = event.clientX - start.x; const dy = event.clientY - start.y;
    if (!start.moved || (Math.abs(dx) < 24 && Math.abs(dy) < 24)) return;
    const width = Math.max(1, arena.clientWidth);
    if (Math.abs(dx) > Math.abs(dy)) {
      const towardEnemy = dx > 0 && state.enemyX > state.playerX;
      movePlayer(dx > 0 ? 'right' : 'left', Math.min(17, Math.max(4, Math.abs(dx) / width * 68)));
      if (towardEnemy && Math.abs(dx) > 34) performAttack('punch');
      else if (dx < -40) performDodge();
    } else {
      if (dy < 0) movePlayer('up'); else movePlayer('down');
      if (Math.abs(dy) > 70 && (state.enemyX - state.playerX) / 100 < .4) performAttack('kick');
    }
  });
  arena.addEventListener('pointercancel', () => { touchGesture = null; });
  enemy.addEventListener('click', () => performAttack('punch'));

  document.addEventListener('keydown', event => {
    const tag = event.target && event.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    const key = event.key.toLowerCase();
    if (key === 'escape' || key === 'p') {
      if (state.running) { event.preventDefault(); togglePause(); }
      else if (!modals.help.hidden) closeHelp();
      return;
    }
    if (!state.running || state.paused || state.questionOpen) return;
    const moves = { arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right', arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down' };
    if (moves[key]) { event.preventDefault(); movePlayer(moves[key], 3.2); return; }
    if (key === 'z') { event.preventDefault(); performAttack('punch'); }
    if (key === 'x') { event.preventDefault(); performAttack('kick'); }
    if (key === 'c') { event.preventDefault(); performAttack('shuriken'); }
    if (key === 'v') { event.preventDefault(); performAttack('jutsu'); }
    if (key === ' ') { event.preventDefault(); hero.classList.remove('attack-jump'); void hero.offsetWidth; hero.classList.add('attack-jump'); playSfx('jump'); setTimeout(() => hero.classList.remove('attack-jump'), 620); }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.running && !state.paused) togglePause(true);
  });
}

function init() {
  renderSubjectOptions();
  setupChoices();
  updateMissionSummary();
  updateSoundButton();
  bindControls();
  // Audio dimulai setelah interaksi pertama, sesuai kebijakan audio browser.
  document.body.addEventListener('pointerdown', () => {
    if (soundEnabled && musicEnabled && !audioContext) {
      ensureAudio();
      startMusic(state.running ? 'battle' : 'menu');
    }
  }, { once: true, passive: true });
}

init();
