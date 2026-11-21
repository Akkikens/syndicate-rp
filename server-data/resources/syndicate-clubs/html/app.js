'use strict';

// All text from the server (club names, member names) is untrusted player input:
// it is only ever written with textContent / DOM nodes, never innerHTML or inline handlers.

const app         = document.getElementById('app');
const tabs        = document.querySelectorAll('.tab');
const panels      = document.querySelectorAll('.panel');
const closeBtn    = document.getElementById('closeBtn');
const clubList    = document.getElementById('clubList');
const searchInput = document.getElementById('searchInput');
const createBtn   = document.getElementById('createBtn');
const memberList  = document.getElementById('memberList');
const inviteRow   = document.getElementById('inviteRow');
const inviteId    = document.getElementById('inviteId');
const inviteBtn   = document.getElementById('inviteBtn');

let allClubs   = [];
let playerClub = null;
let members    = [];

function post(event, data) {
  return fetch(`https://syndicate-clubs/${event}`, {
    method: 'POST',
    body: JSON.stringify(data || {}),
  });
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
}

function switchTab(tabName) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
  panels.forEach(p => p.classList.toggle('active', p.id === `tab-${tabName}`));
}

tabs.forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));

function close() {
  app.classList.add('hidden');
  post('closeUI');
}

closeBtn.addEventListener('click', close);

// Esc always closes (releases NUI focus)
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !app.classList.contains('hidden')) close();
});

// ── Render club list ─────────────────────────────────────
function renderClubs() {
  const query = searchInput.value.toLowerCase();
  const filtered = allClubs.filter(c =>
    String(c.name).toLowerCase().includes(query) || String(c.tag).toLowerCase().includes(query)
  );

  clubList.replaceChildren();
  if (filtered.length === 0) {
    clubList.appendChild(el('div', 'empty-state', 'No clubs found.'));
    return;
  }
  filtered.forEach(c => {
    const card = el('div', 'club-card');
    card.appendChild(el('div', 'club-tag-badge', `[${c.tag}]`));
    const info = el('div', 'club-card-info');
    info.appendChild(el('div', 'club-card-name', c.name));
    info.appendChild(el('div', 'club-card-meta', `${c.member_count} members`));
    card.appendChild(info);
    card.appendChild(el('div', 'club-card-wins', `${c.wins} W`));
    clubList.appendChild(card);
  });
}

searchInput.addEventListener('input', renderClubs);

// ── Render members ───────────────────────────────────────
function actionButton(label, onClick) {
  const b = el('button', null, label);
  b.type = 'button';
  b.addEventListener('click', onClick);
  return b;
}

function renderMembers() {
  memberList.replaceChildren();
  const myRole = playerClub ? playerClub.role : null;

  members.forEach(m => {
    const row = el('div', 'member-row');
    row.appendChild(el('div', 'member-name', m.name || m.citizen_id));
    row.appendChild(el('div', `member-role ${m.role}`, m.role));

    // Buttons are shown by role as a convenience only; the server re-checks every action.
    const actions = el('div', 'member-actions');
    if (m.role !== 'owner') {
      if (myRole === 'owner') {
        actions.appendChild(actionButton(
          m.role === 'officer' ? 'Demote' : 'Promote',
          () => post('setRole', { citizenId: m.citizen_id, role: m.role === 'officer' ? 'member' : 'officer' })
        ));
      }
      const canKick = myRole === 'owner' || (myRole === 'officer' && m.role === 'member');
      if (canKick) {
        actions.appendChild(actionButton('Kick', () => post('kickMember', { citizenId: m.citizen_id })));
      }
    }
    row.appendChild(actions);
    memberList.appendChild(row);
  });
}

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

  renderMembers();
  inviteRow.classList.toggle('hidden', !(playerClub.role === 'owner' || playerClub.role === 'officer'));

  const dangerZone = document.getElementById('dangerZone');
  dangerZone.replaceChildren();

  const leaveBtn = el('button', 'btn-warn', 'Leave Club');
  leaveBtn.addEventListener('click', () => post('leaveClub'));
  dangerZone.appendChild(leaveBtn);

  if (playerClub.role === 'owner') {
    const disbandBtn = el('button', 'btn-danger', 'Disband Club');
    // Two-click confirm (window.confirm is unreliable inside NUI)
    let armed = false;
    disbandBtn.addEventListener('click', () => {
      if (!armed) {
        armed = true;
        disbandBtn.textContent = 'Click again to confirm';
        setTimeout(() => { armed = false; disbandBtn.textContent = 'Disband Club'; }, 4000);
        return;
      }
      post('disbandClub');
    });
    dangerZone.appendChild(disbandBtn);
  }
}

inviteBtn.addEventListener('click', () => {
  const id = parseInt(inviteId.value, 10);
  if (!Number.isInteger(id) || id < 1) return;
  post('inviteMember', { playerId: id });
  inviteId.value = '';
});

// ── Create club ──────────────────────────────────────────
createBtn.addEventListener('click', () => {
  const name = document.getElementById('clubName').value.trim();
  const tag  = document.getElementById('clubTag').value.trim().toUpperCase();
  if (!name || !tag) return;
  post('createClub', { name, tag });
});

// ── NUI messages ─────────────────────────────────────────
function applyOverview(d) {
  allClubs   = d.clubs || [];
  playerClub = d.playerClub || null;
  members    = d.members || [];
  renderClubs();
  renderMyClub();
}

window.addEventListener('message', e => {
  const d = e.data || {};

  if (d.action === 'openClubs') {
    applyOverview(d);
    app.classList.remove('hidden');
    switchTab('browse');
  }

  if (d.action === 'refreshClubs') {
    applyOverview(d);
  }

  if (d.action === 'closeUI') {
    app.classList.add('hidden');
  }
});
