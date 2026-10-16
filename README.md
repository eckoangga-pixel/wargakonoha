# Petualangan Ninja Cerdas

Game edukasi 2D berbasis HTML, CSS, dan JavaScript yang menggunakan GIF karakter, musuh, jurus, dan latar bergaya pixel-art dari aset yang disediakan.

## Menjalankan game

1. Ekstrak ZIP ke folder di laptop atau komputer.
2. Buka `index.html` menggunakan Chrome, Edge, Firefox, atau browser modern lainnya.
3. Di HP, ekstrak folder lalu buka `index.html` di browser. Jika browser membatasi file lokal, jalankan folder melalui server web statis/localhost.
4. Tekan tombol **Suara: ON** atau sentuh layar untuk mengaktifkan musik dan efek suara. Browser hanya mengizinkan audio setelah interaksi pengguna.

Game tidak membutuhkan instalasi paket, server khusus, maupun koneksi internet untuk logika permainan. Google Fonts bersifat opsional; font cadangan akan digunakan jika tidak tersedia.

## Kontrol

- **Sentuh/geser arena:** geser kanan/kiri untuk maju atau mundur; geser atas/bawah untuk berganti jalur/menghindar; geser menuju musuh untuk mencoba serangan.
- **Tombol layar:** arah, hindar, pukul, tendang, shuriken, jurus, dan lompat.
- **Keyboard:** panah atau WASD untuk bergerak; Z pukul; X tendang; C shuriken; V jurus; Space melompat; P atau Esc untuk jeda.
- **Menjawab soal:** pilih satu dari empat jawaban. Jawaban benar memberi skor dan membuka lawan/tantangan berikutnya; jawaban salah atau kehabisan waktu mengurangi nyawa dan memberi kesempatan mencoba lagi.

## Fitur

- Formasi Solo, Duo, dan Squad; kelas 1–6 SD; tingkat Mudah, Sedang, dan Sulit.
- Sepuluh mata pelajaran: Pendidikan Agama Islam, Matematika, Bahasa Indonesia, Pendidikan Pancasila, IPAS, Bahasa Jawa, Bahasa Inggris, PJOK, Koding, dan Seni Rupa.
- Sepuluh pertanyaan unik per mata pelajaran dalam satu misi, timer, skor, HP/nyawa, musuh yang bergerak/menyerang, pause, kembali ke menu, serta hadiah bintang dan refleksi.
- Gerak dan serangan dengan animasi; efek suara orisinal berbasis Web Audio (bukan audio asli dari serial/game komersial).
- Efek awan dan burung bergerak di menu, serta tampilan responsif untuk HP, laptop, dan layar sentuh besar.

## Struktur file

- `index.html` — halaman dan elemen permainan.
- `style.css` — desain, layout responsif, serta animasi.
- `game.js` — kontrol, sistem pertarungan, suara, skor, dan bank soal.
- `assets/` — aset aktif yang digunakan game dan file ilustrasi pendukung.
- `assets/source/` — salinan semua aset asli dalam ZIP unggahan.

## Catatan pembelajaran

Soal berupa latihan pengetahuan umum lintas jenjang SD dan dibuat dengan pendekatan kontekstual, mencoba, umpan balik, tantangan, dan refleksi. Cakupan CP/ATP dapat berbeda menurut kelas, fase, dan satuan pendidikan; sebelum digunakan sebagai asesmen resmi, guru disarankan meninjau dan menyesuaikan pertanyaan dengan ATP serta materi yang sudah diajarkan.
