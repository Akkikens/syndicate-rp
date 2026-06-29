'use strict';

const app       = document.getElementById('app');
const tabs      = document.querySelectorAll('.tab');
const panels    = document.querySelectorAll('.panel');
const closeBtn  = document.getElementById('closeBtn');
const clubList  = document.getElementById('clubList');
const searchInput = document.getElementById('searchInput');
const createBtn = document.getElementById('createBtn');

let allClubs   = [];
let playerClub = null;

function switchTab(tabName) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
  panels.forEach(p => p.classList.toggle('active', p.id === `tab-${tabName}`));
}

tabs.forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));

closeBtn.addEventListener('click', () => {
  app.classList.add('hidden');
  fetch(`https://syndicate-clubs/closeUI`, { method: 'POST', body: JSON.stringify({}) });
});

// ── Render club list ─────────────────────────────────────
function renderClubs(filter = '') {
  const query = filter.toLowerCase();
  const filtered = allClubs.filter(c =>
    c.name.toLowerCase().includes(query) || c.tag.toLowerCase().includes(query)
  );

  clubList.innerHTML = filtered.map(c => `
    <div class="club-card">
      <div class="club-tag-badge">[${c.tag}]</div>
      <div class="club-card-info">
        <div class="club-card-name">${c.name}</div>
        <div class="club-card-meta">${c.member_count} members</div>
      </div>
      <div class="club-card-wins">${c.wins} W</div>
    </div>
  `).join('') || '<div class="empty-state">No clubs found.</div>';
}

searchInput.addEventListener('input', () => renderClubs(searchInput.value));

// ── Render my club ───────────────────────────────────────
function renderMyClub() {
  const noClub      = document.getElementById('noClub');
  const myClubPanel = document.getElementById('myClubPanel');

  if (!playerClub) {
    noClub.classList.remove('hidden');
    myClubPanel.classList.add('hidden');
    return;
  }

  noClub.classList.add('hidden');
  myClubPanel.classList.remove('hidden');

  document.getElementById('myTag').textContent  = `[${playerClub.tag}]`;
  document.getElementById('myName').textContent = playerClub.name;
  document.getElementById('myRole').textContent = playerClub.role;

  const dangerZone = document.getElementById('dangerZone');
  dangerZone.innerHTML = '';

  const leaveBtn = document.createElement('button');
  leaveBtn.className = 'btn-warn';
  leaveBtn.textContent = 'Leave Club';
  leaveBtn.onclick = () => {
    fetch(`https://syndicate-clubs/leaveClub`, { method: 'POST', body: JSON.stringify({}) });
  };
  dangerZone.appendChild(leaveBtn);

  if (playerClub.role === 'owner') {
    const disbandBtn = document.createElement('button');
    disbandBtn.className = 'btn-danger';
    disbandBtn.textContent = 'Disband Club';
    disbandBtn.onclick = () => {
      if (confirm('Permanently disband this club?')) {
        fetch(`https://syndicate-clubs/disbandClub`, { method: 'POST', body: JSON.stringify({}) });
      }
    };
    dangerZone.appendChild(disbandBtn);
  }
}

// ── Create club ──────────────────────────────────────────
createBtn.addEventListener('click', () => {
  const name = document.getElementById('clubName').value.trim();
  const tag  = document.getElementById('clubTag').value.trim().toUpperCase();
  if (!name || !tag) return;
  fetch(`https://syndicate-clubs/createClub`, {
    method: 'POST',
    body: JSON.stringify({ name, tag }),
  });
});

// ── NUI messages ─────────────────────────────────────────
window.addEventListener('message', e => {
  const { action, clubs, club } = e.data;

  if (action === 'openClubs') {
    allClubs   = clubs  || [];
    playerClub = e.data.playerClub || null;
    renderClubs();
    renderMyClub();
    app.classList.remove('hidden');
    switchTab('browse');
  }

  if (action === 'setClub') {
    playerClub = club;
    renderMyClub();
  }
});
