const version="0.1.2.3f";
const dataUrl=`https://raw.githubusercontent.com/Astralsparv/SpaceHeyTweaks/refs/heads/main/data-firefox.json?recache=${Math.random()}`;

async function getJSON(url) {
    let obj = null;
    
    try {
        obj = await (await fetch(url)).json();
        return obj;
    } catch(e) {
        console.error("Fetch error:", e);
        alert("Can't access the database! There may be a new version")
        return null;
    }
}

async function main(){
    data=await getJSON(dataUrl);
    document.getElementById('as-version').textContent=version;
    if (data!==null){
        document.getElementById('as-latestversion').textContent=data.version;
        var u=data.new;
        document.getElementById('as-updates').innerHTML='';
        for (let i=0; i<u.length; i++){
            document.getElementById('as-updates').innerHTML+=`${u[i]}<br><br>`;
        }
        setTimeout(() => {
            if (data.version!=version){
                alert(`You are on an older version (${version})!\nPlease update to ${data.version}`);
            }
        }, 1000);
    }
}

main();
document.addEventListener('DOMContentLoaded', () => {
    const imagesCheckbox = document.getElementById('images');
    const repliesCheckbox = document.getElementById('replies');
    const emojisCheckbox = document.getElementById('emojis');
    const pingsOption = document.getElementById('pings');
    const htmlHomepage = document.getElementById('htmlHomepage');
    const htmlIMs = document.getElementById('htmlIMs');
    const htmlGeneral = document.getElementById('htmlGeneral');

    
    chrome.storage.sync.get(['images', 'replies', 'emojis','htmlHomepage','htmlIMs','htmlGeneral','pingsIndex','pings'], (data) => {
        imagesCheckbox.checked = data.images || false;
        repliesCheckbox.checked = data.replies || false;
        emojisCheckbox.checked = data.emojis || false;
        htmlHomepage.value = data.htmlHomepage || "";
        htmlIMs.value = data.htmlIMs || "";
        htmlGeneral.value = data.htmlGeneral || "";
        pingsOption.children[data.pingsIndex || 0].selected=true;
    });

    imagesCheckbox.addEventListener('change', () => {
        chrome.storage.sync.set({ images: imagesCheckbox.checked });
    });

    repliesCheckbox.addEventListener('change', () => {
        chrome.storage.sync.set({ replies: repliesCheckbox.checked });
    });

    emojisCheckbox.addEventListener('change', () => {
        chrome.storage.sync.set({ emojis: emojisCheckbox.checked });
    });

    pingsOption.addEventListener('change', () => {
        chrome.storage.sync.set({ pingsIndex: pingsOption.selectedOptions[0].index });
        chrome.storage.sync.set({ pings: pingsOption.selectedOptions[0].value });
    });

    htmlHomepage.addEventListener('change', () => {
        chrome.storage.sync.set({ htmlHomepage: htmlHomepage.value });
    });
    
    htmlIMs.addEventListener('change', () => {
        chrome.storage.sync.set({ htmlIMs: htmlIMs.value });
    });

    htmlGeneral.addEventListener('change', () => {
        chrome.storage.sync.set({ htmlGeneral: htmlGeneral.value });
    });
});