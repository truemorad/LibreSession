document.getElementById('min-btn').addEventListener('click', () => {
    window.electronAPI.sendWindowAction('min');
  });
  document.getElementById('max-btn').addEventListener('click', () => {
    window.electronAPI.sendWindowAction('max');
  });
  document.getElementById('close-btn').addEventListener('click', () => {
    window.electronAPI.sendWindowAction('close');
  });