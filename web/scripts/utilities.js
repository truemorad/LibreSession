// color switcher
const colorSwitcher = async (color, type) => {
    const colorRGB = toRGB(color);
    if (type === 'bg') {
        if (isDarkerThan(color, "#5e5e5e5e")) {
            document.documentElement.style.setProperty('--pm', `rgb(255, 255, 255)`);
        } else {
            document.documentElement.style.setProperty('--pm', `rgb(0, 0, 0)`);
        }
        document.documentElement.style.setProperty('--bgColor', `rgb(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b})`);
        styleProp();
    }
    if (type === 'acc') {
        document.documentElement.style.setProperty('--accColor', `rgb(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b})`);
        styleProp();
    }
};
// Convert hex to RGB thanks claude
const toRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};
// handle the primary color based on the luminace of background color
function isDarkerThan(color, threshold) {
    // Calculate relative luminance
    const getLuminance = (r, g, b) => {
        // Formula: 0.299R + 0.587G + 0.114B thanks stacks overflow
        return (0.299 * r + 0.587 * g + 0.114 * b);
    };
    const rgb1 = toRGB(color);
    const rgb2 = toRGB(threshold);
    const luminance1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const luminance2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    return luminance1 < luminance2;
};
// store user style
const styleProp = async () => {
    const property = {
        "--accColor": document.documentElement.style.getPropertyValue('--accColor'),
        "--bgColor": document.documentElement.style.getPropertyValue('--bgColor'),
        "--pm": document.documentElement.style.getPropertyValue('--pm')
    };
    const result = await window.electronAPI.storeUserStyle(property);
    console.log(result);
};
// get location 
const utilLocation = async () => {
    const result = await window.electronAPI.getLocation();
    return result;
};
// make a vault
const vaultMaker = async (path, name) => {
    const result = await window.electronAPI.createVault(path, name);
    return result;
}
// remove after 10 seconds
const s5Removal = (object) => {
    setTimeout(() => {
        object.remove();
    }, 5000);
}
// open external links
const externalLinks = (links) => {
    Array.from(links).forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const result = await window.electronAPI.openExternalWindow(link.getAttribute('href'));
            if (result === 'wrong') {
                const alert = document.createElement('div');
                alert.innerHTML = '<div class="plz alert alert-danger">Link is not correct</div>';
                document.body.appendChild(alert);
                s5Removal(alert);
            }
        });
    });
}
// letter counter
const lettCount = () => {
    const wordCount = document.getElementById('wordCount');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const position = range.startOffset;
    wordCount.innerHTML = position;
    return position;
}
// arrow location count
const arroCount = (evt) => {
    let position = lettCount();
    switch (evt.key) {
        case "ArrowRight":
            if (position < evt.target.innerText.length - 1) {
                position++;
            }
            break;

        case "ArrowLeft":
            if (position > 0) {
                position--;
            }
            break;

        case "ArrowUp":
            position = evt.target.innerText.length;
            break;

        case "ArrowDown":
            position = evt.target.innerText.length;
            break;

        default:
            return;
    }
}
export { colorSwitcher, utilLocation, s5Removal, vaultMaker, externalLinks, lettCount , arroCount};