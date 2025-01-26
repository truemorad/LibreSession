import { utilLocation } from './utilities.js';

const createVault = document.getElementById('createVault');
const createVaultMenu = document.createElement('div')
createVaultMenu.innerHTML = '<div class="createVaultMenu"> <div class="Menu"> <h4 class="nameMenu">Create A Vault</h4> <button class="closeVaultMenu"><svg width="7.5mm" height="7.5mm" viewBox="0 0 7.5 7.5" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" > <path id="path1" d="M 1.3291178,0.88986816 A 3.75,3.75 0 0 0 0.88418376,1.3368693 L 3.3279622,3.8059692 0.93482666,6.224943 A 3.75,3.75 0 0 0 1.3916463,6.656958 L 3.7703125,4.2524536 6.132959,6.6388713 A 3.75,3.75 0 0 0 6.5866781,6.2022054 L 4.2136963,3.8044189 6.6357707,1.3559896 A 3.75,3.75 0 0 0 6.1944539,0.90795492 L 3.7708293,3.3574178 Z" /> </svg></button> <label for="vaultName">Choose a name for your Vault</label> <textarea name="vaultName" id="vaultName" placeholder="Type Vault Name"></textarea> <label for="chooseLocation">Choose a location for your vault</label> <button name="chooseLocation" id="location" class="btn btn-base">Choose</button> <button class="createVault btn btn-base">Create Vault</button> </div> </div>';
const openVault = document.getElementById('openVault');
const vaultError = '';
createVault.addEventListener('click', () => {
    let path;
    let name;
    document.body.appendChild(createVaultMenu);
    const closeVaultMenu = document.getElementsByClassName('closeVaultMenu')[0];
    closeVaultMenu.addEventListener('click', () => {
        createVaultMenu.remove();
    });
    const location = document.getElementById('location');
    location.addEventListener('click', async() => {
        path = await utilLocation();
    });
    const nameArea = document.getElementById('vaultName');
    nameArea.addEventListener('keyup', async() => {
        name = nameArea.value;
    });
    const createVault = document.getElementsByClassName('createVault')[0];
    createVault.addEventListener('click', () => {
        try {
            console.log(name,path[0])
        } catch {
            document.insertAdjacentHTML('beforeend', vaultError);
        }
    })
});