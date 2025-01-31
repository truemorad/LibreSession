import { utilLocation, s5Removal, vaultMaker } from './utilities.js';

const createVault = document.getElementById('createVault');
const createVaultMenu = document.createElement('div')
createVaultMenu.innerHTML = '<div class="createVaultMenu"> <div class="Menu"> <h4 class="nameMenu">Create A Vault</h4> <button class="closeVaultMenu"><svg width="7.5mm" height="7.5mm" viewBox="0 0 7.5 7.5" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" > <path id="path1" d="M 1.3291178,0.88986816 A 3.75,3.75 0 0 0 0.88418376,1.3368693 L 3.3279622,3.8059692 0.93482666,6.224943 A 3.75,3.75 0 0 0 1.3916463,6.656958 L 3.7703125,4.2524536 6.132959,6.6388713 A 3.75,3.75 0 0 0 6.5866781,6.2022054 L 4.2136963,3.8044189 6.6357707,1.3559896 A 3.75,3.75 0 0 0 6.1944539,0.90795492 L 3.7708293,3.3574178 Z" /> </svg></button> <label for="vaultName">Set a name for your Vault</label> <textarea name="vaultName" id="vaultName" placeholder="Default: LibreSession"></textarea> <label for="chooseLocation">Set a location for your vault</label> <button name="chooseLocation" id="location" class="btn btn-base">Choose Location</button> <button class="createVault btn btn-base">Create Vault</button> </div> </div>';
const openVault = document.getElementById('openVault');

createVault.addEventListener('click', () => {
    let path;
    let name = 'LibreSession';
    document.body.appendChild(createVaultMenu);
    const closeVaultMenu = document.getElementsByClassName('closeVaultMenu')[0];
    closeVaultMenu.addEventListener('click', () => {
        createVaultMenu.remove();
    });
    const location = document.getElementById('location');
    location.addEventListener('click', async() => {
        path = await utilLocation();
        if (typeof path[0] === 'string'){
            location.insertAdjacentHTML('afterend', '<svg width="7.5mm" height="5.5mm" viewBox="0 0 7.5 5.5" version="1.1" id="Checkmark" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 7.1656886,0 2.6935484,4.791504 0.3343109,2.263789 0,2.622497 l 2.6749755,2.867572 0.00831,-0.0089 0.017595,0.01885 4.7991201,-5.141834 z" /></svg> ');
        }
    });
    const nameArea = document.getElementById('vaultName');
    nameArea.addEventListener('keyup', async() => {
        name = nameArea.value;
    });
    const createVault = document.getElementsByClassName('createVault')[0];
    createVault.addEventListener('click', () => {
        if (path === undefined || path[0] === undefined){
            const alert = document.createElement('div');
            alert.innerHTML = '<div class="plz alert alert-danger"> Make sure there is a checkmark next to "Choose Location" </div>';
            createVaultMenu.appendChild(alert);
            s5Removal(alert);
        } else {
            vaultMaker(path[0], name)
        }
    })
});

openVault.addEventListener('click', async () => {
    const pathy = await utilLocation();
    const result = await window.electronAPI.getVault(pathy);
    console.log(result);
});