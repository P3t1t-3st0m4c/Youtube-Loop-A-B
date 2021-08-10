
var button = true;

// TODO: Check if the js was already loaded

function click(){
    document.addEventListener("click", (e) => {
        function activateTab(tabs){
            if (button) {
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "run"
                },)
                e.target.src = 'imgs/checkmark.png'
                button = false;
            }else{
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "stop"
                },)
                e.target.src = 'imgs/cross.png'
                button = true;
            }
        }

        if (e.target.id === "ImgButton"){
            browser.tabs.query({active: true, currentWindow: true})
            .then(activateTab)
        }
        
        
    })
}

browser.tabs.executeScript({file: "Main.js"})
.then(click)