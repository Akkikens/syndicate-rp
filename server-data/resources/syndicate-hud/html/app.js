'use strict';

const hud         = document.getElementById('hud');
const speedometer = document.getElementById('speedometer');
const speedVal    = document.getElementById('speedVal');
const healthBar   = document.getElementById('healthBar');
const armorBar    = document.getElementById('armorBar');
const hungerBar   = document.getElementById('hungerBar');
const thirstBar   = document.getElementById('thirstBar');
const cashVal     = document.getElementById('cashVal');
const bankVal     = document.getElementById('bankVal');
const jobRow      = document.getElementById('jobRow');

function fmt(n) {
  return '$' + Number(n).toLocaleString('en-US');
}

window.addEventListener('message', (e) => {
  const { action, data, visible } = e.data;

  if (action === 'updateHUD') {
    speedVal.textContent = data.speed ?? 0;
    speedometer.classList.toggle('hidden', !data.inVehicle);

    healthBar.style.width = Math.max(0, Math.min(100, data.health ?? 100)) + '%';
    armorBar.style.width  = Math.max(0, Math.min(100, data.armor  ?? 0))   + '%';
    hungerBar.style.width = Math.max(0, Math.min(100, data.hunger ?? 100)) + '%';
    thirstBar.style.width = Math.max(0, Math.min(100, data.thirst ?? 100)) + '%';

    cashVal.textContent = fmt(data.cash ?? 0);
    bankVal.textContent = fmt(data.bank ?? 0);
    jobRow.textContent  = data.job ?? 'Unemployed';
  }

  if (action === 'toggleHUD') {
    hud.classList.toggle('hidden', !visible);
  }
});
