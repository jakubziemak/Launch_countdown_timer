let daysUpper = document.querySelectorAll('#days, #days-static');
let hoursUpper = document.querySelectorAll('#hours, #hours-static');
let minutesUpper = document.querySelectorAll('#minutes, #minutes-static');
let secondsUpper = document.querySelectorAll('#seconds, #seconds-static');

let daysBottom = document.querySelectorAll('#days-bottom, #days-bottom-static');
let hoursBottom = document.querySelectorAll('#hours-bottom, #hours-bottom-static');
let minutesBottom = document.querySelectorAll('#minutes-bottom, #minutes-bottom-static');
let secondsBottom = document.querySelectorAll('#seconds-bottom, #seconds-bottom-static');
let end = new Date();
end.setDate(end.getDate() + 2);

function loop(element, unit, timeOut){
    for(let elem of element)(
        setTimeout(()=>{elem.innerHTML = unit}, timeOut)
        )
    }
    
    function flip(id){
        let elem = document.getElementById(id);
        elem.style.transition = 'transform 0.3s';
        elem.style.transform = 'rotateX(-180deg)';
    }
    
    function unFlip(id){
        let elem = document.getElementById(id);
        elem.style.transition = 'transform 0s';
        elem.style.transform = 'rotateX(0deg)';
    }
    
function clock(){
    let now = new Date();
    let timeLeft  = Math.floor((end-now)/1000);
    let hours = Math.floor(timeLeft/3600);
    let days = Math.floor(hours/24);
    let realHours = hours%24;
    let minutes = Math.floor((timeLeft - hours*3600)/60);
    let seconds = Math.floor((timeLeft - hours*3600 - minutes*60));

    if(days<10) days='0'+days;
    if(realHours<10) realHours='0'+realHours;
    if(minutes<10) minutes='0'+minutes;
    if(seconds<10) seconds='0'+seconds;

    loop(daysUpper, days, 300);
    loop(hoursUpper, realHours, 300);
    loop(minutesUpper, minutes, 300);
    loop(secondsUpper, seconds, 300);

    loop(daysBottom, days, 0)
    loop(hoursBottom, realHours, 0)
    loop(minutesBottom, minutes, 0)
    loop(secondsBottom, seconds, 0);

    flip('flip-seconds');
    setTimeout(()=>{unFlip('flip-seconds')}, 500);

    if(seconds == 59){
        flip('flip-minutes');
        setTimeout(()=>{unFlip('flip-minutes')}, 500);
        
        if(minutes == 59){
            flip('flip-hours');
            setTimeout(()=>{unFlip('flip-hours')}, 500);
            
            if(hours == 23){
                flip('flip-days');
                setTimeout(()=>{unFlip('flip-days')}, 500);
                
            }
        }
    }
}
window.onload = clock
window.setInterval(clock, 1000)