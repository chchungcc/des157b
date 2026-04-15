(function(){
    'use strict';

    const video = document.querySelector('video');

    const lines = document.querySelectorAll('.poem p');
    const poem = {
        start: [1, 4, 9, 12],
        end: [16,16,16,16]
    }

    const bubbles = document.querySelectorAll('.bubbles img');

    const intervalID = setInterval(checkTime, 1000);

    for(let i = 0; i < bubbles.length; i++){
        bubbles[i].addEventListener('mouseover', function(){
            // bubbles[i].classList.add(`bubble${i+1}`);
            bubbles[i].classList.add('pause');
            bubbles[i].classList.add('popping');
        });
    }

    function checkTime(){
        for(let i = 0; i < lines.length; i++){
            if(poem.start[i] < video.currentTime && video.currentTime < poem.end[i]){
                lines[i].style.display = 'block';
            }
            else{
                lines[i].style.display = 'none';
            }
        }
    }



})()