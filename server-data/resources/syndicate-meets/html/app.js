'use strict';

const app         = document.getElementById('app');
const meetView    = document.getElementById('meetView');
const votingView  = document.getElementById('votingView');
const closeBtn    = document.getElementById('closeBtn');
const timerVal    = document.getElementById('timerVal');
const voteStatus  = document.getElementById('voteStatus');

let timerInterval = null;
let currentMeetId = null;
let votedCategories = new Set();

function postNui(event, data) {
  fetch(`https://syndicate-meets/${event}`, { method: 'POST', body: JSON.stringify(data || {}) });
}

closeBtn.addEventListener('click', () => {
  app.classList.add('hidden');
  postNui('closeMeetUI');
});

// ── Meet attendee view ───────────────────────────────────
function openMeet(meet, attendees) {
  currentMeetId = meet.id;
  document.getElementById('meetLabel').textContent      = meet.label || 'Car Meet';
  document.getElementById('meetAttendCount').textContent = `${attendees.length} cars checked in`;

  const list = document.getElementById('attendeeList');
  list.innerHTML = attendees.map(a => `
    <div class="attendee-row">
      <div class="attendee-name">${a.name || a.citizen_id}</div>
      ${a.vehicle ? `<div class="attendee-vehicle">${a.vehicle}</div>` : ''}
    </div>
  `).join('') || '<div style="padding:24px;color:#6B6B78;text-align:center">No one checked in yet.</div>';

  meetView.classList.remove('hidden');
  votingView.classList.add('hidden');
  app.classList.remove('hidden');
}

// ── Voting view ──────────────────────────────────────────
function openVoting(data) {
  currentMeetId = data.meetId;
  votedCategories.clear();
  votingView.classList.remove('hidden');
  meetView.classList.add('hidden');
  app.classList.remove('hidden');

  // Render category blocks
  const container = document.getElementById('categories');
  container.innerHTML = data.categories.map(cat => `
    <div class="category-block" id="cat-${cat.replace(/\s+/g,'_')}">
      <div class="category-name">${cat}</div>
      <div class="candidate-list">
        ${data.attendees.map(a => `
          <div class="candidate-row"
               data-citizen="${a.citizen_id}"
               data-category="${cat}"
               onclick="castVote('${a.citizen_id}', '${cat}', this)">
            <div class="candidate-name">${a.name || a.citizen_id}</div>
            ${a.vehicle ? `<div class="candidate-vehicle">${a.vehicle}</div>` : ''}
            <div class="vote-check">✓</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Countdown timer
  if (timerInterval) clearInterval(timerInterval);
  let remaining = data.duration;
  updateTimer(remaining);
  timerInterval = setInterval(() => {
    remaining--;
    updateTimer(remaining);
    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerVal.textContent = '0:00';
      voteStatus.textContent = 'Voting closed. Results incoming…';
      document.querySelectorAll('.candidate-row').forEach(r => r.style.pointerEvents = 'none');
    }
  }, 1000);
}

function updateTimer(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  timerVal.textContent = `${m}:${String(s).padStart(2,'0')}`;
}

window.castVote = function(citizenId, category, el) {
  if (votedCategories.has(category)) return;
  votedCategories.add(category);

  // Mark row as voted
  const catEl = document.getElementById(`cat-${category.replace(/\s+/g,'_')}`);
  if (catEl) {
    catEl.querySelectorAll('.candidate-row').forEach(r => r.style.pointerEvents = 'none');
  }
  el.classList.add('voted');

  postNui('castVote', { meetId: currentMeetId, targetCitizenId: citizenId, category });
  voteStatus.textContent = `Voted in "${category}" ✓`;
};

// ── NUI messages ─────────────────────────────────────────
window.addEventListener('message', e => {
  const { action } = e.data;

  if (action === 'openMeet')       openMeet(e.data.meet, e.data.attendees || []);
  if (action === 'openVoting')     openVoting(e.data);
  if (action === 'updateAttendees' && e.data.meetId === currentMeetId) {
    document.getElementById('meetAttendCount').textContent = `${e.data.attendees.length} cars checked in`;
    const list = document.getElementById('attendeeList');
    if (list) list.innerHTML = e.data.attendees.map(a => `
      <div class="attendee-row">
        <div class="attendee-name">${a.name || a.citizen_id}</div>
        ${a.vehicle ? `<div class="attendee-vehicle">${a.vehicle}</div>` : ''}
      </div>
    `).join('');
  }
  if (action === 'closeMeet') {
    if (timerInterval) clearInterval(timerInterval);
    app.classList.add('hidden');
  }
});
