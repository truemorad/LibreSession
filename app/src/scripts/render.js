import { colorSwitcher, s5Removal, externalLinks, lettCount, arroCount } from "./utilities.js";
import { MarkdownProcessor } from './markdown.js';
const optionsBtn = document.getElementsByClassName('options')[0];
const optionsPage = document.createElement('div');
optionsPage.innerHTML = '<div class="optionsPage"> <div class="col-12" id="main"> <button id="optionsClose"> <svg width="7.5mm" height="7.5mm" viewBox="0 0 7.5 7.5" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" > <path id="path1" d="M 1.3291178,0.88986816 A 3.75,3.75 0 0 0 0.88418376,1.3368693 L 3.3279622,3.8059692 0.93482666,6.224943 A 3.75,3.75 0 0 0 1.3916463,6.656958 L 3.7703125,4.2524536 6.132959,6.6388713 A 3.75,3.75 0 0 0 6.5866781,6.2022054 L 4.2136963,3.8044189 6.6357707,1.3559896 A 3.75,3.75 0 0 0 6.1944539,0.90795492 L 3.7708293,3.3574178 Z" /> </svg> </button> <h2>Colors</h2> <label class="btn btn-primary" for="accentInput" ><input type="color" id="accentInput" class="hidden" />Tertiary</label > <label class="btn btn-primary" for="bgInput" ><input type="color" id="bgInput" class="hidden" />Background</label > </div> </div>';
const context = document.createElement('div');
context.innerHTML = '<div id="contextMenu"> <button class="btn btn-primary" id="closeVault"> Close Vault </button> </div>';
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
// markdown
const processor = new MarkdownProcessor();
const input = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
input.addEventListener('input', () => {
  lettCount();
  // store it
  window.electronAPI.storeMD(input.innerHTML);
  preview.innerHTML = processor.compile(input.innerHTML);
  const links = document.getElementsByTagName('a');
  externalLinks(links);
});
input.addEventListener('keyup', (evt) => {
  arroCount(evt);
});
input.addEventListener('click', () => {
  lettCount();
});
const vaultBut = document.getElementById('vaultBut');
const contextBtn = document.getElementById('contextBtn');
vaultBut.addEventListener('mousedown', (evt) => {
  if (document.getElementById('closeVault')) {
    contextBtn.removeChild(context)
  } else {
    contextBtn.appendChild(context);
    document.getElementById('closeVault').addEventListener('click', () => {
      window.electronAPI.closeVault()
    });
  }
});