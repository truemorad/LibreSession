import { s5Removal } from "./utilities.js";

const minBtn = document.getElementById('min-btn');
const maxBtn = document.getElementById('max-btn');
const closeBtn = document.getElementById('close-btn');
const titleBar = document.getElementsByTagName('titleBar')[0];

// window action buttons
minBtn.addEventListener('click', () => {
  window.electronAPI.sendWindowAction('min');
});
// maximize multiply switcher
maxBtn.addEventListener('click', async () => {
  const result = await window.electronAPI.sendWindowAction('max');
});
// close button
closeBtn.addEventListener('click', () => {
  window.electronAPI.sendWindowAction('close');
});
// initialize style
window.addEventListener('load', async () => {
  if (!document.documentElement.getAttribute('style')) {
    console.log("samehier")
  const style = await window.electronAPI.getData('gimmestyle');
  console.log(style);
  if (style === undefined){
  } else {
      document.documentElement.style.setProperty('--accColor', style['--accColor']);
      document.documentElement.style.setProperty('--bgColor', style['--bgColor']);
      document.documentElement.style.setProperty('--pm', style['--pm']);
  }
  }
});
// Prevent the default refresh
// document.addEventListener('keydown', (event) => {
//   if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
//       event.preventDefault();
//   }
// });