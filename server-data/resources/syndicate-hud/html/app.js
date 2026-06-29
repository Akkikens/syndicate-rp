'use strict';

const hud       = document.getElementById('hud');
const speedo    = document.getElementById('speedometer');
const speedVal  = document.getElementById('speedVal');
const gearVal   = document.getElementById('gearVal');
const rpmFill   = document.getElementById('rpmFill');
const healthBar = document.getElementById('healthBar');
const armorBar  = document.getElementById('armorBar');
const hungerBar = document.getElementById('hungerBar');
const thirstBar = document.getElementById('thirstBar');
const cashVal   = document.getElementById('cashVal');
const bankVal   = document.getElementById('bankVal');
const jobRow    = document.getElementById('jobRow');

function fmt(n) {
  return '$' + Number(n).toLocaleString('en-US');
}

function pct(n) {
  return Math.max(0, Math.min(100, n)) + '%';
}

window.addEventListener('message', (e) => {
  const { action, data, visible } = e.data;

  if (action === 'updateHUD') {
    // Vehicle
    const inVeh = !!data.inVehicle;
    speedo.classList.toggle('hidden', !inVeh);

    if (inVeh) {
      speedVal.textContent = data.speed ?? 0;
      gearVal.textContent  = data.gear  ?? 1;

      const rpm = data.rpm ?? 0; // 0.0 – 1.0
      rpmFill.style.width = pct(rpm * 100);
      rpmFill.classList.toggle('redline', rpm > 0.88);
    }

    // Status bars
    healthBar.style.width = pct(data.health ?? 100);
    armorBar.style.width  = pct(data.armor  ?? 0);
    hungerBar.style.width = pct(data.hunger ?? 100);
    thirstBar.style.width = pct(data.thirst ?? 100);

    // Money
    cashVal.textContent = fmt(data.cash ?? 0);
    bankVal.textContent = fmt(data.bank ?? 0);
    jobRow.textContent  = data.job ?? 'Unemployed';
  }

  if (action === 'toggleHUD') {
    hud.classList.toggle('hidden', !visible);
  }
});
