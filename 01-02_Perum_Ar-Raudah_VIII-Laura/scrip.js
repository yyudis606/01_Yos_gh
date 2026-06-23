const houses = [
  {type:'Jalur Utama', address:'11 Rumah', status:'2 Rumah Kosong'},
  {type:'Blok 1', address:'6 Rumah', status:'3 Rumah Kosong'},
  {type:'Blok 2', address:'6 Rumah', status:'Terisi'},
  {type:'Blok 3', address:'6 Rumah', status:'2 Rumah Kosong'},
  {type:'Blok 4', address:'6 Rumah', status:'Terisi'}
];

const residents = [
  {name:'Chandra Maureksa', unit:'No. 1', role:'Ketua Komplek'},
  {name:'Siti Aisyah', unit:'No. 3', role:'Bendahara'},
  {name:'Hendra Pratama', unit:'No. 7', role:'Warga'},
  {name:'Rina Setiawati', unit:'No. 10', role:'Warga'},
  {name:'Dewi Anggraini', unit:'No. 12', role:'Warga'},
  {name:'Budi Santoso', unit:'No. 15', role:'Warga'}
];

const facilities = [
  {title:'Taman Bermain Anak', description:'Area hijau dengan ayunan, perosotan, dan jalur jogging.'},
  {title:'Masjid', description:'Masjid lingkungan untuk shalat berjamaah dan kajian rutin.'},
  {title:'Lapangan Serbaguna', description:'Lapangan untuk olahraga dan kegiatan komunitas.'},
  {title:'Ruang Serbaguna', description:'Tempat pertemuan warga, rapat, dan acara kecil.'},
  {title:'Pos Keamanan', description:'Keamanan 24 jam dengan petugas ronda dan CCTV.'},
  {title:'Sarana Sampah', description:'Area pengumpulan sampah terpilah untuk lingkungan bersih.'}
];

const gotongRoyong = [
  {date:'Sabtu, 8 Juni 2026', title:'Kerja Bakti Kebersihan', description:'Bersih-bersih taman bermain, membersihkan selokan, dan rapat kecil warga.'},
  {date:'Minggu, 23 Juni 2026', title:'Pengecatan Pagar Lingkungan', description:'Gotong royong pengecatan pagar dan perbaikan tanaman hias.'},
  {date:'Sabtu, 6 Juli 2026', title:'Penyuluhan Sampah Terpilah', description:'Kegiatan edukasi dan pembagian tempat sampah khusus organik/anorganik.'}
];

const specialEvents = [
  {title:'Buka Puasa Bersama', date:'10 April 2026', description:'Kumpul warga untuk berbuka bersama, doa, dan sambutan ketua Komplek.'},
  {title:'Perayaan HUT Kemerdekaan', date:'17 Agustus 2026', description:'Lomba anak-anak, jalan sehat, dan pentas seni lingkungan.'},
  {title:'Reuni Warga', date:'15 Desember 2026', description:'Silaturahmi akhir tahun, evaluasi kegiatan, dan perencanaan program 2027.'}
];

function createHouseCard(house){
  return `<article class="card"><h3>${house.type}</h3><p>${house.address}</p><div class="status ${house.status.toLowerCase().replace(/\s/g,'-')}">${house.status}</div></article>`;
}

function createResidentRow(resident){
  return `<tr><td>${resident.name}</td><td>${resident.unit}</td><td>${resident.role}</td></tr>`;
}

function createFacilityCard(facility){
  return `<article class="card"><h3>${facility.title}</h3><p>${facility.description}</p></article>`;
}

function createTimelineCard(item){
  return `<article class="timeline-card"><span class="event-badge">${item.date}</span><h3>${item.title}</h3><p>${item.description}</p></article>`;
}

function createEventCard(event){
  return `<article class="card"><span class="event-badge">${event.date}</span><h3>${event.title}</h3><p>${event.description}</p></article>`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const houseList = document.getElementById('houseList');
  const residentList = document.getElementById('residentList');
  const residentCount = document.getElementById('residentCount');
  const facilityList = document.getElementById('facilityList');
  const gotongSchedule = document.getElementById('gotongSchedule');
  const eventList = document.getElementById('eventList');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if(houseList) houseList.innerHTML = houses.map(createHouseCard).join('');
  if(residentList) residentList.innerHTML = residents.map(createResidentRow).join('');
  if(residentCount) residentCount.textContent = residents.length;
  if(facilityList) facilityList.innerHTML = facilities.map(createFacilityCard).join('');
  if(gotongSchedule) gotongSchedule.innerHTML = gotongRoyong.map(createTimelineCard).join('');
  if(eventList) eventList.innerHTML = specialEvents.map(createEventCard).join('');

  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const isOpen = mainNav.style.display === 'flex';
      mainNav.style.display = isOpen ? 'none' : 'flex';
    });
  }
});

