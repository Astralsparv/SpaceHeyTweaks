htmlGeneral='';

chrome.storage.sync.get(['htmlGeneral'], (data) => {
    htmlGeneral=data.htmlGeneral;
    document.head.innerHTML+=htmlGeneral;
});