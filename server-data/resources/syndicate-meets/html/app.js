'use strict';

// Names and vehicles come from other players: write them with textContent / DOM nodes only
// (never innerHTML or inline onclick strings).

const app          = document.getElementById('app');
const meetView     = document.getElementById('meetView');
const votingView   = document.getElementById('votingView');
const closeBtn     = document.getElementById('closeBtn');
const closeVoteBtn = document.getElementById('closeVoteBtn');
const timerVal     = document.getElementById('timerVal');
const voteStatus   = document.getElementById('voteStatus');

let timerInterval   = null;
let currentMeetId   = null;
let votedCategories = new Set();

function postNui(event, data) {
  return fetch(`https://syndicate-meets/${event}`, { method: 'POST', body: JSON.stringify(data || {}) });
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
}

// Hide the UI and always release NUI focus
function closeAll() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  app.classList.add('hidden');
  postNui('closeMeetUI');
}

closeBtn.addEventListener('click', closeAll);
closeVoteBtn.addEventListener('click', closeAll);

// Esc closes whichever view is open
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !app.classList.contains('hidden')) closeAll();
});

// ── Meet attendee view ───────────────────────────────────
function renderAttendees(attendees) {
  document.getElementById('meetAttendCount').textContent = `${attendees.length} cars checked in`;
  const list = document.getElementById('attendeeList');
  list.replaceChildren();

  if (attendees.length === 0) {
    const empty = el('div', null, 'No one checked in yet.');
    empty.style.cssText = 'padding:24px;color:#6B6B78;text-align:center';
    list.appendChild(empty);
    return;
  }
  attendees.forEach(a => {
    const row = el('div', 'attendee-row');
    row.appendChild(el('div', 'attendee-name', a.name || a.citizen_id));
    if (a.vehicle) row.appendChild(el('div', 'attendee-vehicle', a.vehicle));
    list.appendChild(row);
  });
}

function openMeet(meet, attendees) {
  currentMeetId = meet.id;
  document.getElementById('meetLabel').textContent = meet.label || 'Car Meet';
  renderAttendees(attendees);

  meetView.classList.remove('hidden');
  votingView.classList.add('hidden');
  app.classList.remove('hidden');
}

// ── Voting view ──────────────────────────────────────────
function openVoting(data) {
  currentMeetId = data.meetId;
  votedCategories.clear();
  voteStatus.textContent = '';
  votingView.classList.remove('hidden');
  meetView.classList.add('hidden');
  app.classList.remove('hidden');

  const container = document.getElementById('categories');
  container.replaceChildren();

  data.categories.forEach(cat => {
    const block = el('div', 'category-block');
    block.appendChild(el('div', 'category-name', cat));
    const candidates = el('div', 'candidate-list');

    data.attendees.forEach(a => {
      const row = el('div', 'candidate-row');
      row.appendChild(el('div', 'candidate-name', a.name || a.citizen_id));
      if (a.vehicle) row.appendChild(el('div', 'candidate-vehicle', a.vehicle));
      row.appendChild(el('div', 'vote-check', '✓'));
      row.addEventListener('click', () => castVote(a.citizen_id, cat, row, candidates));
      candidates.appendChild(row);
    });

    block.appendChild(candidates);
    container.appendChild(block);
  });

  // Countdown timer. When it ends, close the UI so focus is always released.
  if (timerInterval) clearInterval(timerInterval);
  let remaining = data.duration;
  updateTimer(remaining);
  timerInterval = setInterval(() => {
    remaining--;
    updateTimer(Math.max(remaining, 0));
    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      voteStatus.textContent = 'Voting closed. Results incoming…';
      setTimeout(closeAll, 2000);
    }
  }, 1000);
}

function updateTimer(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  timerVal.textContent = `${m}:${String(s).padStart(2, '0')}`;
}

function castVote(citizenId, category, row, candidates) {
  if (votedCategories.has(category)) return;
  votedCategories.add(category);

  candidates.style.pointerEvents = 'none';
  row.classList.add('voted');

  postNui('castVote', { meetId: currentMeetId, targetCitizenId: citizenId, category });
  voteStatus.textContent = `Voted in "${category}" ✓`;
}

// ── NUI messages ─────────────────────────────────────────
window.addEventListener('message', e => {
  const d = e.data || {};

  if (d.action === 'openMeet')   openMeet(d.meet || {}, d.attendees || []);
  if (d.action === 'openVoting') openVoting(d);
  if (d.action === 'closeMeet') {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    app.classList.add('hidden');
  }
});
