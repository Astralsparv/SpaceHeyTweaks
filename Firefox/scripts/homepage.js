htmlHomepage='';

chrome.storage.sync.get(['htmlHomepage'], (data) => {
    htmlHomepage=data.htmlHomepage;
    document.body.innerHTML+=htmlHomepage;
});