chrome.storage.sync.get(['emojis'], (settings) => {
  if (settings.emojis) {
    emojis=true;
    setupEmojis();
  }
});

// ran when emojis is checked and validated
let emojiMap;
function setupEmojis(){
  fetch(chrome.runtime.getURL('data/emojimap.json'))
  .then(response => {
    if (!response.ok) throw new Error('Network response failed');
    return response.json();
  })
  .then(data => {
    emojiMap = data;
    inp=document.getElementsByClassName('message-composer')[0]
    inp.addEventListener("input", function() {
      setTimeout(() => {
        let cursorLoc=inp.selectionStart;
        let len=inp.value.length;
        let init=inp.value
        let newval = inp.value.replace(/:([\w_]+):/g, (m, code) => emojiMap[code] || m);
        if (!(init === newval)){
          inp.value=newval;
          let nloc=cursorLoc-len+inp.value.length
          inp.selectionStart = inp.selectionEnd = nloc;
        }
      }, 0);
    });
  })
  .catch(error => {
    console.error('Failed to load emoji map:', error);
  });
}

htmlIMs='';

chrome.storage.sync.get(['htmlIMs'], (data) => {
    htmlIMs=data.htmlIMs;
    document.head.innerHTML+=htmlIMs;
});