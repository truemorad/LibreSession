import { colorSwitcher } from "./utilities.js";

const optionsBtn = document.getElementsByClassName('options')[0];
const titleBar = document.getElementsByTagName('titleBar')[0];
const optionsPage = document.createElement('div');
optionsPage.innerHTML = '<div class="optionsPage"> <div class="col-12" id="main"> <button id="optionsClose"> <svg width="7.5mm" height="7.5mm" viewBox="0 0 7.5 7.5" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" > <path id="path1" d="M 1.3291178,0.88986816 A 3.75,3.75 0 0 0 0.88418376,1.3368693 L 3.3279622,3.8059692 0.93482666,6.224943 A 3.75,3.75 0 0 0 1.3916463,6.656958 L 3.7703125,4.2524536 6.132959,6.6388713 A 3.75,3.75 0 0 0 6.5866781,6.2022054 L 4.2136963,3.8044189 6.6357707,1.3559896 A 3.75,3.75 0 0 0 6.1944539,0.90795492 L 3.7708293,3.3574178 Z" /> </svg> </button> <h2>Colors</h2> <label class="btn btn-primary" for="accentInput" ><input type="color" id="accentInput" class="hidden" />Tertiary</label > <label class="btn btn-primary" for="bgInput" ><input type="color" id="bgInput" class="hidden" />Background</label > </div> </div>';

// ELECTRON BRIDGE  //
// options button
optionsBtn.addEventListener('click', () => {
  document.body.appendChild(optionsPage);
  document.getElementById('optionsClose').addEventListener('click', () => {
    optionsPage.remove();
  });
  // general page
  // colors
  const accColor = document.getElementById('accentInput');
  accColor.addEventListener('input', () => {
    const color = accColor.value;
    colorSwitcher(color, 'acc');
  });
  const bgColor = document.getElementById('bgInput');
  bgColor.addEventListener('input', () => {
    const color = bgColor.value;
    colorSwitcher(color, 'bg');
  });
});
// open external links
const buttonLink = document.getElementById('linked');
  buttonLink.addEventListener('click', async (event) => {
    event.preventDefault();
    const result = await window.electronAPI.openExternalWindow(buttonLink.getAttribute('href'));
    console.log(result);});