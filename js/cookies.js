const cookieExpirationDays = 365;
const progressCookieName = "questionProgress";
const maxProgress = 8; //TODO: Adjust this to the correct value of progress that can be made

function updateNavbarProgress() {
    const elem = document.getElementById("navbar-progress");
    elem.innerHTML = "Fortschritt: " + countCompleted() + " fertig";
}

//marks a task as completed in the cookie
function markCompleted(index){
    if (index >= maxProgress){
        throw "index out of range "+maxProgress;
    }
    if(checkCompleted(index)){
        return;
    }
    var progress = retrieveProgress();
    progress[index] = "t";
    updateCookie(progressCookieName, progress);
    updateNavbarProgress();
    showProgressBumper(index);
}

//checks if a task is marked as complete in the cookie
function checkCompleted(index) {
    if (index >= maxProgress){
        throw "index out of range "+maxProgress;
    }
    return retrieveProgress()[index]=='t';
}

//returns as a string how many tasks are completed out of the max tasks
function countCompleted() {
    const progress = retrieveProgress();
    var completed = 0;
    progress.forEach(element => {
        if(element=='t') completed++;
    });
    return completed + '/' + maxProgress;
}

//returns the content of the cookie as a proper array instead of a string
function retrieveProgress(){
    var cookie = getCookie(progressCookieName);
    if(cookie===undefined) {
        return initializeProgress();
    }
    return cookie.split(',');
}

//initializes the progress cookie properly
function initializeProgress(){
    var cookie = [];
    for(i=0;i<maxProgress;i++){
        cookie[i] = "f";
    }
    newCookie(progressCookieName, cookie);
    return cookie;
}


//alias for newCookie
function updateCookie(name, value, time) {
    newCookie(name, value, time);
}
//sets a new cookie with specified name and value
function newCookie(name, value, time) {
    if (name===undefined || value===undefined) {
        throw "Cookie name or value cannot be undefined";
    }
    const date = new Date();
    // Get time plus expiration span
    if (time===undefined){
        time = cookieExpirationDays
    }
    date.setTime(date.getTime() + (time * 24 * 60 * 60 * 1000))
    const expires = ";expires="+date.toUTCString();
    document.cookie = name+"="+value+expires+";path=/"
}

//returns the value for the cookie with specified name if it exists, otherwise null
function getCookie(name) {
    //get all cookies as one string and split at semicolon
    const cookieList = document.cookie.split(';');
    name = name + "=";
    //check every cookie if it is the one we are looking for
    for(var element of cookieList){
        //truncate whitespace
        element = element.trim();
        if (element.startsWith(name)) {
            return element.substring(element.indexOf('=')+1);
        }
    };
    return undefined;
}

function invalidateCookie(name){
    newCookie(name, "", -1);
}

function showProgressBumper(index) {
    const container = document.createElement("div");
    container.id = "message-container";
    container.onclick = function(){remove(this)};
    const content = document.createElement("div");
    content.id = "message-content";
    content.innerHTML = `Gratulation, du hast Aufgabe ${index+1}/${maxProgress} abgeschlossen! Klick hier, um diese Nachricht zu schließen.`;
    container.appendChild(content);
    document.body.appendChild(container);
}