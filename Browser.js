
var button = true;
var cross = 'imgs/cross.png';
var checkmark = 'imgs/checkmark.png';

// TODO: Check if the js was already loaded
function checkLoaded(){
    function check(tabs){
        browser.runtime.onMessage.addListener((message) => {
            console.log(message.result)
            if (message.result){
                document.getElementById("ImgButton").src = checkmark;
                button = false;
            }else{
                document.getElementById("ImgButton").src = cross;
                button = true;
            }
        })
        browser.tabs.sendMessage(tabs[0].id, {
            command: "loaded"
        },)
    }

    browser.tabs.query({active: true, currentWindow: true})
    .then(check)
}

function click(){
    document.addEventListener("click", (e) => {
        function activateTab(tabs){
            if (button) {
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "run"
                },)
                e.target.src = checkmark
                e.target.alt = 'Activated'
                button = false;
            }else{
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "stop"
                },)
                e.target.src = cross
                e.target.alt = 'Deactivated'
                button = true;
            }
        }

        if (e.target.id === "ImgButton"){
            browser.tabs.query({active: true, currentWindow: true})
            .then(activateTab)
        }
        
        
    })
}

browser.tabs.query({active: true, currentWindow: true})
.then((tab) => {
    if (tab[0].url.startsWith("https://www.youtube.com/watch") || tab[0].url.startsWith("http://www.youtube.com/watch")){
        browser.tabs.executeScript({file: "Main.js"})
        .then(checkLoaded)
        .then(click())
    }
})
