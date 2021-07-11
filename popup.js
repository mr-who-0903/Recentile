document.addEventListener('DOMContentLoaded', function(){

    const url = 'https://indian-jokes-api.herokuapp.com/jokes/random';

    document.querySelector('.joke').addEventListener('click', onclick, false);
    document.querySelector('.highlight').addEventListener('click', unhide, false);

    function onclick(){
        chrome.tabs.query({currentWindow: true, active: true}, 
            async (tabs)=> { 
                const res = await fetch(url);
                const joke = await res.json();
                console.log(joke.text);
                chrome.tabs.sendMessage(tabs[0].id, joke.text);
            })
    }

    function unhide(){
        var msgDiv = document.getElementsByClassName('msg');
            if(msgDiv[0].style.visibility === "hidden"){
                msgDiv[0].style.visibility = "visible";
            }
            else{
                msgDiv[0].style.visibility = "hidden";
            }
        
    }

    const bg = chrome.extension.getBackgroundPage();

    if(bg.Alltitles.length == 0){
        var messg = document.createTextNode("No recent visits...");
        document.getElementById('msg').appendChild(messg);
    }
    else{    
        const linkHTML = bg.Alltitles.map((obj) => {
            return `<hr><li><img src="internet.svg"><a href=${obj.link} class="thelink" target="_self">${obj.title}<a/></li>`;
        }).join('');

        document.getElementById('linklist').innerHTML = linkHTML;
    }

    document.getElementsByTagName("BODY")[0].onclick = function(e) {
        e = e || event      
        var target = e.target || e.srcElement    
        if (target.nodeName != 'A') return        
        var href = target.href    
        chrome.tabs.create({url: href});
        return false;   
      }

}, false);


