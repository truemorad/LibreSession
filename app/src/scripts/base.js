const minBtn = document.getElementById('min-btn');
const maxBtn = document.getElementById('max-btn');
const closeBtn = document.getElementById('close-btn');
const titleBar = document.getElementsByTagName('titleBar')[0];

// window action buttons
minBtn.addEventListener('click', () => {
    window.electronAPI.sendWindowAction('min');
  });
  // maximize multiply switcher
  const maxMultUI = ['<svg width="7.5mm" height="7.5mm" viewBox="0 0 7.5 7.5" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" > <defs id="defs1" /> <g id="layer1"> <path d="M 3.74904,0 C 1.68126,0 0,1.681265 0,3.749035 0,5.816806 1.68126,7.5 3.74904,7.5 5.81681,7.5 7.5,5.816806 7.5,3.749035 7.5,1.681265 5.81681,0 3.74904,0 Z m 0,0.540262 c 1.77579,0 3.2107,1.432977 3.2107,3.208773 0,1.775796 -1.43491,3.210703 -3.2107,3.210703 -1.7758,0 -3.20878,-1.434907 -3.20878,-3.210703 0,-1.775796 1.43298,-3.208773 3.20878,-3.208773 z" id="path3" /> </g> </svg>', '<svg width="7.5mm" height="7.5mm" viewBox="0 0 7.5 7.5" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" > <defs id="defs1" /> <g id="layer1"> <path id="path3-7" d="M 4.68518,0 C 3.44942,0 2.39761,0.808153 2.01995,1.929078 0.85402,2.276426 0,3.366389 0,4.65564 c 0,1.5683856 1.26324,2.8443596 2.81534,2.8443596 1.23479,0 2.28574,-0.808023 2.6642,-1.928035 C 6.64591,5.2244096 7.5,4.132364 7.5,2.842797 7.5,1.27441 6.23727,0 4.68518,0 Z m 0,0.41021 c 1.33294,0 2.40939,1.08566 2.40939,2.432587 0,1.020386 -0.61874,1.8906246 -1.49794,2.2532826 0.0223,-0.143756 0.034,-0.290484 0.034,-0.4404396 0,-1.568387 -1.26324,-2.842797 -2.81534,-2.842797 -0.10872,0 -0.21581,0.0066 -0.32135,0.01876 C 2.87348,0.992153 3.70998,0.410205 4.68513,0.410205 Z M 2.81534,2.222531 c 1.33294,0 2.40939,1.086182 2.40939,2.433109 0,1.3469246 -1.07645,2.4346716 -2.40939,2.4346716 -1.33294,0 -2.4099,-1.087747 -2.4099,-2.4346716 0,-1.346927 1.07696,-2.433109 2.4099,-2.433109 z" /> </g> </svg>'];
  const maxMultSwitch = (object, array) => {
    if (object == 'mult') {
      return array[0];
    }
    if (object == 'max') {
      return array[1];
    }
  }
  maxBtn.addEventListener('click', async () => {
    const result = await window.electronAPI.sendWindowAction('max');
    maxBtn.innerHTML = maxMultSwitch(result, maxMultUI);
  });
  // close button
  closeBtn.addEventListener('click', () => {
    window.electronAPI.sendWindowAction('close');
  });
// initialize style
window.addEventListener('load', async () => {
    if (!document.documentElement.getAttribute('style')) {
    const style = await window.electronAPI.getData('gimmestyle');
    if (!style === undefined){
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