const houses = window.housesData || [];

const community = window.communityData || {
  stats: [],
  residents: [],
  demographics: { female: 0, male: 0 }
};

const residents = community.residents || [];

const facilities = window.facilitiesData || [];

const boardMembers = window.boardData || [];

const gotongRoyong = window.gotongRoyongData || [];
const specialEvents = window.specialEventsData || [];
const galleryImages = window.galleryImages || [];

function createHouseCard(house){
  const statusClass = house.statusType === 'filled' ? 'status--filled' : 'status--empty';
  return `<article class="card"><h3>${house.type}</h3><p>${house.address}</p><div class="status ${statusClass}">${house.status}</div></article>`;
}

function createResidentRow(resident){
  return `<tr><td>${resident.name}</td><td>${resident.unit}</td><td>${resident.role}</td></tr>`;
}

function createResidentAccordionItem(resident, index){
  const safeResident = {
    name: resident.name || 'Nama Warga',
    unit: resident.unit || 'Unit belum tersedia',
    role: resident.role || 'Warga',
    block: resident.block || 'Belum ditentukan',
    note: resident.note || 'Detail belum tersedia.'
  };

  return `
    <div class="resident-list-row">
      <div class="resident-list-name">${safeResident.name}</div>
      <div class="resident-list-unit">${safeResident.unit}</div>
      <div class="resident-list-role">${safeResident.role}</div>
    </div>
  `;
}

function createResidentMasterAccordion(residentSource){
  const allResidents = residentSource.map(createResidentAccordionItem).join('');
  const contentId = 'resident-master-content';

  return `
    <div class="resident-accordion-item">
      <button class="resident-accordion-toggle" type="button" aria-expanded="false" aria-controls="${contentId}">
        <span class="person">
          <strong>Nama Warga</strong>
        </span>
        <span class="chevron" aria-hidden="true"></span>
      </button>
      <div class="resident-accordion-content" id="${contentId}">
        <div class="resident-accordion-body">
          <div class="resident-list-header">
            <span>Nama</span>
            <span>Unit</span>
            <span>Peran</span>
          </div>
          <div class="resident-list">
            ${allResidents}
          </div>
        </div>
      </div>
    </div>
  `;
}

function createFacilityCard(facility){
  return `<article class="card"><h3>${facility.title}</h3><p>${facility.description}</p></article>`;
}

function createBoardMemberCard(member){
  return `
    <article class="board-member-card">
      <span class="member-tag">${member.role}</span>
      <div class="member-name">${member.name}</div>
      <p>${member.description}</p>
    </article>
  `;
}

function createTimelineCard(item){
  return `<article class="timeline-card"><span class="event-badge">${item.date}</span><h3>${item.title}</h3><p>${item.description}</p></article>`;
}

function createEventCard(event){
  return `<article class="card"><span class="event-badge">${event.date}</span><h3>${event.title}</h3><p>${event.description}</p></article>`;
}

function createGalleryCard(item){
  return `
    <article class="gallery-card">
      <div class="gallery-image-wrap">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="gallery-copy">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const houseList = document.getElementById('houseList');
  const residentAccordion = document.getElementById('residentAccordion');
  const iuranAccordion = document.getElementById('iuranAccordion');
  const residentCount = document.getElementById('residentCount');
  const genderSummary = document.getElementById('genderSummary');
  const communityStats = document.getElementById('communityStats');
  const boardList = document.getElementById('boardList');
  const facilityList = document.getElementById('facilityList');
  const gotongSchedule = document.getElementById('gotongSchedule');
  const galleryList = document.getElementById('galleryList');
  const eventList = document.getElementById('eventList');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  const residentSource = residents.length ? residents : (window.communityData ? window.communityData.residents : []);

  if(houseList) houseList.innerHTML = houses.map(createHouseCard).join('');
  if(residentAccordion) residentAccordion.innerHTML = createResidentMasterAccordion(residentSource);
  if(residentCount) residentCount.textContent = residentSource.length;
  if(genderSummary) genderSummary.textContent = `${community.demographics.female} perempuan, ${community.demographics.male} laki-laki`;
  if(communityStats) communityStats.innerHTML = community.stats.map((item) => `
    <div>
      <strong>${item.value}</strong>
      <span>${item.label}</span>
    </div>
  `).join('');
  if(boardList) boardList.innerHTML = boardMembers.map(createBoardMemberCard).join('');
  if(facilityList) facilityList.innerHTML = facilities.map(createFacilityCard).join('');
  if(gotongSchedule) gotongSchedule.innerHTML = gotongRoyong.map(createTimelineCard).join('');
  if(galleryList) galleryList.innerHTML = galleryImages.map(createGalleryCard).join('');
  if(eventList) eventList.innerHTML = specialEvents.map(createEventCard).join('');

  if(navToggle && mainNav){
    navToggle.addEventListener('click', ()=>{
      const shouldOpen = !mainNav.classList.contains('is-open');
      mainNav.classList.toggle('is-open', shouldOpen);
      navToggle.setAttribute('aria-expanded', String(shouldOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if(residentAccordion){
    const residentToggle = residentAccordion.querySelector('.resident-accordion-toggle');
    const residentItem = residentAccordion.querySelector('.resident-accordion-item');
    const residentContent = residentAccordion.querySelector('.resident-accordion-content');

    if (residentToggle && residentItem && residentContent) {
      residentContent.style.maxHeight = null;

      residentToggle.addEventListener('click', () => {
        const isOpened = residentItem.classList.contains('open');
        residentItem.classList.toggle('open', !isOpened);
        residentToggle.setAttribute('aria-expanded', String(!isOpened));

        if (isOpened) {
          residentContent.style.maxHeight = null;
        } else {
          residentContent.style.maxHeight = residentContent.scrollHeight + 'px';
        }
      });
    }
  }

  if(iuranAccordion){
    const iuranToggle = iuranAccordion.querySelector('.iuran-toggle');
    const iuranItem = iuranAccordion.querySelector('.resident-accordion-item');
    const iuranContent = iuranAccordion.querySelector('.iuran-content');

    if(iuranToggle && iuranItem && iuranContent){
      iuranContent.style.maxHeight = null;

      iuranToggle.addEventListener('click', () => {
        const isOpened = iuranItem.classList.contains('open');
        iuranItem.classList.toggle('open', !isOpened);
        iuranToggle.setAttribute('aria-expanded', String(!isOpened));

        if (isOpened) {
          iuranContent.style.maxHeight = null;
        } else {
          iuranContent.style.maxHeight = iuranContent.scrollHeight + 'px';
        }
      });
    }
  }
});

