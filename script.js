(function(){
    'use strict';

    const btn = document.querySelector('#switch');
    const listimg = document.querySelectorAll('ul li img');
    const list = document.querySelectorAll('ul li a');
    const section = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const headingtop = document.querySelector('.headingtop');
    const body = document.querySelector('body');
    const main = document.querySelector('main');

    const oceancircles = document.querySelectorAll('.oceancircles img');

    let onoff = 0;

    btn.addEventListener('click', function(){
        if(onoff == 0){
            onoff = 1;

            //change list icons
            for(let i = 0; i < listimg.length; i++){
                listimg[i].setAttribute('src', 'images/sparkle-list.png')
                list[i].style.color = 'white';
                list[i].style.fontSize = '16px';
                list[i].className = 'spacehover';
            };

            //change section gradient
            for(let i = 0; i < section.length; i++){
                section[i].style.backgroundImage = 'url(images/space-gradient.png)';
                section[i].style.color = 'white';
                section[i].style.boxShadow ='0px 3px 5px 0 rgb(255, 255, 255, 0.5)';
                section [i].style.border = 'solid 1px rgb(255, 255, 255, 0.9)';
            }

            //change body
            body.style.backgroundImage = 'url(images/space-background.png';

            //change header
            header.style.color = 'white';
            header.style.fontFamily = '"Jura", sans-serif';
            headingtop.style.fontSize = '16px';

            //change main text
            main.style.fontFamily = '"Jura", sans-serif';

            //hide ocean circles
            for(let i = 0; i < oceancircles.length; i++){
                oceancircles[i].style.display = 'none';
            }

        }
        else if (onoff == 1){
            onoff = 0;

            //change list icons
            for(let i = 0; i < listimg.length; i++){
                listimg[i].setAttribute('src', 'images/drop-list.png')
                list[i].style.color = 'rgb(0, 114, 114)';
                list[i].style.fontSize = '14px';
                list[i].className = 'oceanhover';
            };

            //change section gradient
            for(let i = 0; i < section.length; i++){
                section[i].style.backgroundImage = 'url(images/ocean-gradient.png)';
                section[i].style.color = 'rgb(0, 114, 114)';
                section[i].style.boxShadow ='0px 3px 5px 0 rgb(0, 147, 154, 0.5)';
                section [i].style.border = 'solid 1px rgb(0, 114, 114, 0.9)';
            }

            //change body
            body.style.backgroundImage = 'url(images/ocean-background.png';

            //change header
            header.style.color = 'rgb(0, 114, 114)';
            header.style.fontFamily = '"Comfortaa", sans-serif';
            headingtop.style.fontSize = '14px';

            //main
            main.style.fontFamily = '"Comfortaa", sans-serif';

            //show ocean circles
            for(let i = 0; i < oceancircles.length; i++){
                console.log(oceancircles[i]);
                oceancircles[i].style.display= 'inline';
            }
        }
    });

})();