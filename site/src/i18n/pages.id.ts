import type { Pages } from "./messages.ts";

export const pages: Pages = {
  about: {
    title: "Tentang: tanda, tingkat kecocokan, dan pembaruan setiap malam",
    description:
      "Apa yang dinyatakan sebuah entri di katalog, apa yang dibaca dari GitHub setiap malam, dan aturan di balik setiap tanda yang ditampilkan pada sebuah alat.",
    eyebrow: "Tentang",
    heading: "Apa yang dikatakan katalog, dan dari mana ia tahu.",
    lede: "{toolCount} tool developer, masing-masing dicantumkan bersama apa yang digantikannya. Selebihnya yang Anda lihat pada sebuah alat berasal dari GitHub, bukan dari orang yang menambahkannya.",
    entries: {
      heading: "Apa yang dinyatakan sebuah entri",
      fileBefore: "Setiap alat adalah file YAML kecil di bawah",
      fileAfter:
        ". File itu menyebutkan nama alat, repositori GitHub-nya, kategorinya, alat-alat yang digantikannya beserta tingkat kecocokan untuk masing-masing, dan afiliasi jika ada. Hanya itu yang bisa ditulis oleh kontributor.",
      schema:
        "Sebuah entri tidak pernah menyatakan bintang, lisensi, versi, atau deskripsi. Skema menolaknya, sehingga pull request tidak bisa menggelembungkan jumlah bintang atau mengklaim rilis yang tidak ada.",
    },
    refresh: {
      heading: "Pembaruan setiap malam",
      runBefore: "Setiap malam, dan setiap kali data katalog berubah di branch utama,",
      runLink: "refresh",
      runAfter: "membaca setiap repositori yang tercantum dari GitHub API:",
      reads: [
        "deskripsi, homepage, bahasa, lisensi, bintang, fork, dan topik",
        "apakah repositori diarsipkan, dan tanggal push terakhirnya",
        "rilis terbaru, atau tag terbaru jika tidak ada rilis, dan apakah rilis itu bertanda tangan",
        "lima rilis terakhir yang dipublikasikan, ditampilkan di halaman alat",
        "para penulis commit di branch default selama {days} hari terakhir, dan yang disimpan hanya jumlahnya",
        "nama file yang dilampirkan pada rilis terbaru, dibaca untuk mengetahui sistem operasi dan arsitektur yang disebutkannya",
      ],
      activity:
        "Halaman alat mengubah data ini menjadi gambaran seberapa hidup sebuah proyek, tidak pernah menjadi skor. Usianya dihitung sejak hari repositori dibuat. Frekuensi rilis adalah median jarak antara rilis stabil terbarunya, ditampilkan setelah ada tiga rilis. Kontributor aktif adalah penulis commit yang berbeda di branch default dalam {days} hari terakhir: akun yang namanya berakhiran [bot] tidak dihitung, dan commit yang tidak terhubung ke akun GitHub mana pun dihitung berdasarkan email-nya, yang tidak pernah dipublikasikan. Hanya {commits} commit terbaru yang dibaca, sehingga proyek yang lebih sibuk menampilkan batas bawah seperti 40+. Alur kerja squash-merge mencatat satu penulis per pull request, siapa pun yang ikut menulisnya, dan untuk alat yang berada di monorepo, hitungannya mencakup seluruh repositori, dan halaman itu menyebutkannya. Platform hanya ditampilkan jika nama file pada rilis terbaru menyebutkannya, dan tidak ada yang ditebak jika tidak disebutkan, begitu juga untuk alat di monorepo, yang rilis terbarunya bisa jadi milik paket lain.",
      maintainerFileBefore: "file maintainer yang dijelaskan di bagian",
      maintainerFileLink: "terverifikasi",
      releaseBefore: "Di antara dua pembaruan malam, rilis yang baru dipublikasikan memperbarui alatnya dalam hitungan menit jika",
      releaseApp: "GitHub App awesome-alternatives",
      releaseMiddle: "terpasang di repositorinya, atau jika repositori itu menjalankan",
      releaseAfter: "di workflow rilisnya.",
      commit:
        "Jika ada yang berubah, refresh meng-commit katalog baru dan build baru situs ini dirilis. Jika GitHub berhenti mengembalikan repositori dari alat yang tercantum, karena dihapus atau dijadikan privat, refresh tidak memublikasikan apa pun dan gagal, sehingga seseorang akan memeriksanya: sebuah alat hanya keluar dari katalog melalui pull request yang menghapus entrinya.",
      changesBefore:
        "Setiap refresh juga membandingkan katalog baru dengan yang sebelumnya dan mencatat apa yang berubah: lisensi, nama repositori, pengarsipan, rilis baru, alat yang masuk atau keluar. Halaman",
      changesLink: "apa yang berubah",
      changesAfter:
        "mencantumkannya per hari, dengan feed RSS untuk seluruh katalog, satu untuk setiap alat, dan satu untuk setiap kategori. Perubahan jumlah bintang tidak pernah dihitung.",
    },
    marks: {
      heading: "Tanda",
      signed: {
        term: "✓ bertanda tangan",
        body: "Di samping versi terbaru. Tag tersebut memiliki tanda tangan yang diverifikasi GitHub, atau, untuk lightweight tag, commit yang ditunjuknya memiliki tanda tangan itu. Hanya rilis terbaru yang diperiksa.",
      },
      verified: {
        term: "Diverifikasi oleh maintainer-nya",
        fileBefore: "Repositori alat itu sendiri memiliki file",
        fileAfter: "di root branch default-nya, dengan",
        slugAfter:
          "diisi dengan entri ini. Hanya orang dengan akses tulis ke repositori yang bisa menambahkannya, jadi tanda ini berarti para maintainer-nya mendukung entri tersebut. Refresh membaca file ini setiap malam.",
        appBefore: "Tanda ini juga diberikan jika",
        appLink: "GitHub App awesome-alternatives",
        appAfter: "dipasang di repositori tersebut, karena memasang app di sana membutuhkan hak admin.",
        stale:
          "File itu memberi tanggal verifikasi dari commit terakhirnya, dan entri yang diedit setelah tanggal itu menampilkan “diedit sejak verifikasi” sampai maintainer melakukan commit baru pada file tersebut, cukup dengan komentar # bertanggal.",
      },
      archived: {
        term: "diarsipkan",
        before:
          "Repositori sudah diarsipkan dan tidak lagi menerima perubahan. Alat yang diarsipkan justru yang ingin ditinggalkan orang, jadi alat seperti ini hanya diterima sebagai sesuatu yang digantikan oleh entri lain, tidak pernah sebagai alternatif, dan peringatan",
        inactiveLink: "tidak ada push",
        after: "tidak diberikan padanya.",
      },
      licence: {
        term: "Other",
        before:
          "Ditampilkan sebagai lisensi jika GitHub mendeteksi lisensi tetapi tidak bisa memetakannya ke pengenal SPDX. Jika GitHub tidak mendeteksi lisensi apa pun, alat itu bertuliskan",
        none: "Tidak terdeteksi",
        middle: "dan peringatan",
        noLicenceLink: "tidak ada lisensi",
        after: "diberikan padanya.",
      },
    },
    fit: {
      heading: "Tingkat kecocokan",
      lede: "Setiap pengganti memiliki satu tingkat, ditentukan oleh orang yang menambahkan entri.",
      dropIn:
        "Menerima konfigurasi atau antarmuka alat aslinya tanpa perubahan: Anda cukup menukarnya tanpa menyentuh setup Anda. Meminta drop-in di pencarian hanya akan menampilkan yang seperti ini.",
      full: "Mengerjakan tugas yang sama, dengan caranya sendiri. Bersiaplah memigrasikan konfigurasi Anda.",
      partial: "Mengerjakan sebagian tugasnya. Catatan di bawah alat menyebutkan bagian yang mana.",
    },
    warnings: {
      heading: "Peringatan",
      lede: "Peringatan tidak pernah menghapus sebuah alat. Peringatan adalah hal yang diperiksa maintainer sebelum menggabungkan pull request, dan hal yang mungkin ingin Anda ketahui sebelum bergantung pada alat tersebut.",
      moved:
        "Repositori kini berada di bawah nama atau pemilik lain. GitHub mengalihkan alamat lama, tetapi entrinya perlu diperbarui.",
      noLicense: "GitHub tidak mendeteksi lisensi, sehingga ketentuan penggunaan kodenya tidak jelas.",
      noRelease: "Repositori tidak memiliki rilis maupun tag, jadi tidak ada versi untuk di-pin.",
      inactive: "Tidak ada push selama lebih dari {inactiveDays} hari. Repositori yang diarsipkan tidak termasuk dalam peringatan ini.",
      starSpike:
        "Satu hari yang mendapat {spikeThreshold} bintang atau lebih, dan setidaknya {spikeFactor} kali laju harian biasa alat tersebut selama sebulan terakhir, serta setidaknya {spikeShare}% dari bintang yang dimilikinya sehari sebelumnya, sehingga hari baik biasa dari proyek besar tidak dihitung. Bintang yang dibeli datang secara bergelombang, begitu juga peluncuran di Hacker News, itulah sebabnya manusia yang memutuskan. GitHub tidak lagi mencantumkan siapa yang memberi bintang pada repositori, jadi refresh setiap malam menyimpan jumlah bintang per hari dan membandingkan hari-harinya. Diperlukan riwayat seminggu sebelum menilai, artinya sebuah alat baru diperiksa setelah tercantum.",
      blockingBefore:
        "Beberapa masalah justru memblokir pull request: repositori yang privat, fork, diarsipkan tetapi diajukan sebagai alternatif, berusia kurang dari {minAgeDays} hari, atau sudah tercantum dengan slug lain.",
      contributeLink: "Panduan kontributor",
      blockingAfter: "mencantumkan semua pemeriksaan.",
    },
    affiliation: {
      heading: "Afiliasi",
      body: "Siapa pun yang memelihara, mengerjakan, atau dibayar oleh sebuah alat wajib menyatakannya di entri alat itu. Mencantumkan proyek Anda sendiri dipersilakan, tidak menyatakannya bisa menjadi alasan penghapusan. Jika sebuah entri memiliki afiliasi, halaman alat menampilkannya apa adanya.",
    },
    search: {
      heading: "Cara kerja pencarian",
      before:
        'Kueri Anda pertama-tama dibaca sebagai kata kunci: nama alat yang digantikan oleh alat lain, bahasa dan lisensi di katalog, dan "drop in". Jika tidak ada alat yang ingin diganti disebutkan, model embedding multibahasa kecil yang berjalan di server pencarian membandingkan kueri dengan deskripsi setiap alat, sehingga kueri yang ditulis dalam bahasa apa pun yang didukung situs ini menemukan alat yang sama dengan versi bahasa Inggrisnya, meskipun deskripsinya sendiri tetap dalam bahasa Inggris, sebagaimana dikembalikan GitHub. Jika ada satu alat yang ingin diganti yang jelas menonjol, alat itu yang dipilih; jika tidak, hasil diurutkan berdasarkan kedekatannya dengan kueri. Hanya jika kedua langkah itu tidak menemukan alat yang ingin diganti, dan server memiliki kuncinya, teks kueri dikirim ke Jev, sebuah layanan eksternal, untuk dibaca. Hasil pembacaannya di-cache di server selama satu hari. Hasil pencarian menyebutkan siapa yang membaca kueri Anda: "Dicocokkan secara lokal" atau "Dibaca oleh Jev".',
      qualifiers:
        "Beberapa kata menjadi filter, dalam setiap bahasa yang didukung situs ini. \"Open source\" hanya menampilkan alat yang lisensinya terbuka. \"Aktif dikelola\" menyingkirkan alat yang diarsipkan dan yang tidak menerima push selama {inactiveDays} hari. \"Self-hosted\" hanya menampilkan alat dari kategori layanan yang Anda jalankan sendiri. Platform atau cara deploy, seperti Linux atau Docker, dikenali tetapi belum diperiksa, dan hasil pencarian menyebutkannya alih-alih berpura-pura.",
      privacyLink: "Halaman privasi",
      after: "menjelaskan apa yang dikirim dan apa yang disimpan.",
    },
    agents: {
      heading: "Dari agen AI",
      body: "Katalog ini juga merupakan server Model Context Protocol (MCP) di {url}, melalui Streamable HTTP, tanpa kunci dan tanpa akun. Agen bisa mencari alternatif untuk sebuah alat atau produk, menampilkan daftar alat berdasarkan kategori, bahasa, atau lisensi, dan membaca fakta tentang satu alat. Tool pencariannya membaca kueri hanya dengan kata kunci dan model di server ini, tidak pernah dengan Jev, dan dibatasi per alamat; tool lainnya tidak dibatasi.",
      setup: "Untuk menambahkannya ke Claude Code:",
    },
    licences: {
      heading: "Lisensi",
      dataBefore: "Data katalog didedikasikan ke domain publik di bawah",
      dataLink: "CC0 1.0",
      codeBefore: ". Kode situs, API, dan skripnya berada di bawah",
      codeLink: "lisensi MIT",
    },
  },

  privacy: {
    title: "Kebijakan privasi",
    description: "Apa yang diproses awesome-alternatives.com tentang pengunjungnya, dan alasannya.",
    eyebrow: "Hukum",
    heading: "Kebijakan privasi",
    lede: 'Situs ini tidak memasang cookie, tidak menyimpan apa pun di browser Anda, tidak menjalankan analitik, dan tidak memuat skrip atau font pihak ketiga. Setiap halaman, skrip, dan font berasal dari awesome-alternatives.com; satu-satunya pengecualian adalah gambar di dalam README sebuah proyek, yang dijelaskan di bagian "Detail repositori". Tidak ada yang perlu disetujui, jadi tidak ada banner persetujuan. Jika hal ini berubah, halaman ini dan mekanisme persetujuan akan berubah lebih dulu. Terakhir diperbarui {lastUpdated}.',
    legitimateInterest: "Kepentingan yang sah (GDPR pasal 6(1)(f))",
    facts: {
      data: "Data",
      purpose: "Tujuan",
      legalBasis: "Dasar hukum",
      retention: "Masa penyimpanan",
      recipient: "Penerima",
      where: "Lokasi",
      terms: "Ketentuannya",
      proxyAndRetention: "Proxy dan masa penyimpanan",
    },
    controller: {
      heading: "Pengendali data",
      before: "Pengendali data adalah penerbit yang disebutkan dalam",
      legalNoticeLink: "informasi hukum",
      beforeEmail: ", yang dapat dihubungi di",
    },
    siteAccessLog: {
      heading: "Log akses server web",
      body: "Server nginx yang menyajikan halaman menulis satu baris per permintaan ke log akses standarnya, yang dikirim ke output container.",
      dataBefore: "Alamat IP, tanggal dan waktu, alamat yang diminta (termasuk pencarian yang diketik di bilah alamat sebagai",
      dataAfter: "), status dan ukuran respons, halaman perujuk, user agent browser, header forwarded-for",
      purpose: "Menjalankan situs, mendiagnosis error, mendeteksi dan menghentikan penyalahgunaan",
      retention: "Hanya disimpan di keluaran kontainer di server: paling banyak 5 berkas berukuran 10 MB, baris tertua ditimpa lebih dulu, dan hilang saat kontainer diganti. Tidak disalin ke tempat lain.",
    },
    reverseProxyLog: {
      heading: "Log akses reverse proxy",
      body: "Permintaan ke situs dan ke API pencariannya melewati reverse proxy di penyedia hosting, yang menyimpan log aksesnya sendiri dengan jenis data yang sama.",
      purpose: "Merutekan permintaan, mendiagnosis error, mendeteksi dan menghentikan penyalahgunaan",
      proxyAndRetention: "Traefik, di server penyedia hosting di Prancis. Log aksesnya disimpan dengan cara yang sama: di keluaran kontainer, paling banyak 5 berkas berukuran 10 MB, tidak disalin ke tempat lain.",
    },
    rateLimiting: {
      heading: "Pembatasan laju pencarian",
      body: "Agar pencarian tetap bisa dipakai semua orang, API mengizinkan jumlah pencarian tetap per menit dari setiap alamat IP. API itu sendiri tidak menulis log permintaan.",
      data: "Alamat IP dan penghitung pencarian terbaru, hanya disimpan di memori",
      purpose: "Mencegah satu klien menghabiskan kapasitas pencarian",
      retention:
        "Dihapus pada pembersihan per jam berikutnya setelah tidak lagi dihitung terhadap batas, dan setiap kali server dimulai ulang. Tidak pernah ditulis ke disk.",
    },
    queries: {
      heading: "Kueri pencarian",
      before:
        "Apa yang Anda ketik di kotak pencarian dikirim ke API, yang pertama-tama menafsirkannya dengan model yang berjalan di servernya sendiri. Jika langkah itu tidak menemukan alat yang ingin diganti, teks kueri, dan tidak ada yang lain (tanpa alamat IP, tanpa pengenal), dikirim ke Jev di",
      after:
        ", sebuah layanan model bahasa yang mengubahnya menjadi filter. Hindari mengetik informasi pribadi di kotak pencarian.",
      data: "Teks kueri",
      purpose: "Menjawab pencarian yang Anda minta",
      retention:
        "Kueri yang ditafsirkan oleh Jev di-cache di memori API bersama hasilnya, tanpa kaitan apa pun dengan pengirimnya, paling lama 24 jam. Cache juga dikosongkan setiap kali katalog diperbarui, setiap jam, dan setiap kali server dimulai ulang. Tidak pernah ditulis ke disk.",
      where: "Amerika Serikat, tempat TypeSafe menghosting Jev. Kebijakan privasinya tidak menyebut mekanisme transfer dari UE, sehingga API hanya mengirim teks pencarian, tidak pernah alamat IP atau pengenal.",
      addressBefore: "Pencarian juga menaruh kueri Anda di alamat halaman",
      addressAfter:
        ") agar hasilnya bisa dibagikan. Kueri itu tetap ada di riwayat browser Anda, dan masuk ke log akses di atas saat alamat tersebut dimuat.",
    },
    repositoryDetails: {
      heading: "Detail repositori",
      fetch: "API mengambil README setiap proyek yang tercantum dari GitHub dan laporan keamanannya dari OpenSSF Scorecard secara langsung, dari server ke server, lalu menyimpannya selama 12 jam. Permintaan tersebut hanya membawa nama repositori, tidak ada apa pun tentang Anda.",
      imagesBefore:
        "Halaman alat dibuka dengan README proyek tersebut. Gambar dan badge di dalamnya dimuat oleh browser Anda dari tempat proyek menghostingnya: GitHub",
      imagesAfter:
        "dan, untuk sebagian README, layanan badge seperti shields.io. Host tersebut menerima alamat IP dan detail browser Anda seperti pada setiap permintaan gambar, dan kebijakan mereka sendiri yang berlaku. Tidak ada halaman lain yang memuat apa pun dari mereka.",
    },
    recipients: {
      heading: "Siapa yang menerima data",
      before: "Penerbit, penyedia hosting yang tercantum dalam",
      legalNoticeLink: "informasi hukum",
      after:
        "karena menjalankan servernya, dan, khusus untuk kueri pencarian, operator Jev. Tidak ada data yang dijual atau dibagikan untuk iklan. Tautan ke GitHub dan ke proyek yang tercantum adalah tautan biasa: begitu Anda mengikutinya, kebijakan situs tersebut yang berlaku.",
    },
    rights: {
      heading: "Hak Anda",
      before:
        "Berdasarkan GDPR, Anda dapat meminta untuk mengakses, memperbaiki, atau menghapus data tentang Anda, membatasi pemrosesannya, dan Anda dapat menolak pemrosesan yang didasarkan pada kepentingan yang sah. Kirim surat ke",
      after:
        ". Log tidak terkait dengan nama, jadi sertakan alamat IP dan perkiraan waktu kunjungan Anda agar entri yang sesuai dapat ditemukan.",
      complaintBefore:
        "Jika Anda merasa data Anda ditangani dengan tidak semestinya, Anda dapat mengajukan keluhan ke otoritas perlindungan data Prancis,",
      complaintLink: "CNIL",
    },
  },

  legalNotice: {
    title: "Informasi hukum",
    description: "Siapa yang menerbitkan dan meng-hosting awesome-alternatives.com.",
    eyebrow: "Hukum",
    heading: "Informasi hukum",
    lede: "Diterbitkan berdasarkan pasal 6 III undang-undang Prancis n° 2004-575 tanggal 21 Juni 2004 tentang kepercayaan dalam ekonomi digital (LCEN). Terakhir diperbarui {lastUpdated}.",
    facts: {
      name: "Nama",
      address: "Alamat",
      email: "Email",
      phone: "Telepon",
      registration: "Nomor registrasi",
    },
    publisher: {
      heading: "Penerbit",
      body: "awesome-alternatives.com diterbitkan oleh Bryan Ferrando, pengusaha perorangan (entrepreneur individuel) dengan nama dagang FerrLabs. PPN tidak berlaku berdasarkan pasal 293 B Kode Pajak Prancis.",
    },
    publicationDirector: {
      heading: "Direktur publikasi",
      before: "Penerbit,",
    },
    host: {
      heading: "Penyedia hosting",
    },
    content: {
      heading: "Konten",
      licenceBefore: "Katalog dirilis di bawah",
      dataLink: "CC0",
      licenceMiddle: "dan kodenya di bawah",
      codeLink: "MIT",
      licenceAfter:
        ". Angka repositori (bintang, rilis, lisensi, deskripsi) berasal dari GitHub API publik, beserta nama dan deskripsi publik dari akun pemilik setiap repositori. Nama proyek dan merek dagang adalah milik pemiliknya masing-masing.",
      reportBefore: "Untuk melaporkan kesalahan atau meminta entri dihapus, buka issue di",
      reportLink: "GitHub",
      reportAfter: "atau kirim surat ke",
    },
    personalData: {
      heading: "Data pribadi",
      before: "Apa yang diproses situs ini tentang pengunjung dijelaskan dalam",
      privacyLink: "kebijakan privasi",
    },
  },
  contact: {
    title: "Kontak",
    description: "Cara menghubungi orang di balik awesome-alternatives.com, dan ke mana setiap jenis permintaan paling cepat ditangani.",
    eyebrow: "Kontak",
    heading: "Hubungi kami",
    lede: "Katalog ini dikelola secara terbuka di GitHub, jadi sebagian besar permintaan lebih cepat ditangani di sana. Untuk hal lain, gunakan formulir di bagian bawah halaman ini atau kirim surat ke",
    catalog: {
      heading: "Usulkan alat atau perbaiki entri",
      before: "Buka",
      pullRequest: "pull request",
      between: " atau ",
      suggest: "usulkan alat",
      after: " di sebuah issue. ",
      guide: "Panduan kontribusi",
      end: " menjelaskan apa yang dibutuhkan sebuah entri.",
    },
    maintainer: {
      heading: "Anda maintainer alat yang tercantum",
      before: "Anda bisa meminta entri Anda ditandai sebagai",
      verifiedLink: "diverifikasi oleh maintainer-nya",
      after: ". Untuk memperbaiki atau menghapusnya, ",
      issueLink: "buka issue",
    },
    security: {
      heading: "Laporkan masalah keamanan",
      before: "Mohon jangan membuka issue publik. Ikuti",
      policyLink: "kebijakan keamanan",
      after: " untuk melaporkannya secara privat.",
    },
    privacy: {
      heading: "Data pribadi",
      before: "Apa yang disimpan situs ini dijelaskan dalam",
      privacyLink: "kebijakan privasi",
      after: ". Untuk menggunakan hak Anda, kirim surat ke",
    },
    other: {
      heading: "Hal lainnya",
      before: "Kirim pesan di sini, atau kirim surat ke",
      after: ". Setiap pesan dibaca oleh manusia dan dijawab lewat email.",
    },
    form: {
      kind: "Tentang apa?",
      kinds: {
        question: "Pertanyaan",
        bug: "Ada yang rusak",
        security: "Masalah keamanan",
        privacy: "Data pribadi saya",
        other: "Hal lain",
      },
      email: "Email Anda",
      name: "Nama Anda",
      optional: "opsional",
      subject: "Subjek",
      message: "Pesan",
      honeypot: "Biarkan kolom ini kosong",
      submit: "Kirim",
      sentTitle: "Pesan terkirim",
      sentBody: "Seseorang akan membalas ke alamat yang Anda berikan. Salinannya sedang dikirim ke kotak masuk Anda.",
      reference: "Referensi",
      incomplete: "Isi email, subjek, dan pesan Anda.",
      invalid: "Periksa alamat email Anda, dan pastikan subjek serta pesannya tidak terlalu panjang.",
      tooMany: "Terlalu banyak pesan dari sini dalam waktu singkat. Silakan coba lagi dalam beberapa menit.",
      failed: "Pesan tidak dapat dikirim. Silakan coba lagi, atau kirim surat ke contact@awesome-alternatives.com.",
    },
  },
};
