window.Alltitles = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var flag = false;
    for(var i=0; i<window.Alltitles.length; i++){
        if(window.Alltitles[i].title === request.title){
            flag = true;
            break;
        }
    }

    if(!flag) window.Alltitles.push({title: request.title, link: request.visited_url});
});

