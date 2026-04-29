(function(){
    'use strict';
    console.log('js working');

    async function getData(){
        const cats = await fetch('data/data.json');
        const data = await cats.json();
        const values = Object.values(data);
        // console.log(values);

        //change number
        const number = document.querySelector('#number');

        //list of dates
        const january = document.querySelectorAll('.jan');
        console.log(january);

        //click dates
        for(let i = 0; i < january.length; i++){
            january[i].addEventListener('click', function(){
                if(values[i]==1){
                    number.innerHTML = values[i] + " cat";
                } else{
                    number.innerHTML = values[i] + " cats"; 
                }
                document.querySelector('.cats').innerHTML = outputCats(values[i]);
            });
        }
    }

    function outputCats(num) {
        let catImages = '';
        let list = shuffleCats();

        for (let i = 0; i < num; i++) {
            catImages += `<img src="images/${list[i]}" id="catdoodle${i+1}" alt="cat" width="100">`;
        }

        return catImages;
    }

    function shuffleCats(){
        const catList = ['catdoodle1.png', 'catdoodle2.png', 'catdoodle3.png', 'catdoodle4.png', 'catdoodle5.png', 'catdoodle6.png', 'catdoodle7.png', 'catdoodle8.png', 'catdoodle9.png'];

        //fisher yates method
        for (let i = catList.length-1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            let k = catList[i];
            catList[i] = catList[j];
            catList[j] = k;
        }
        // console.log(catList);

        return catList;
    }

    getData();

})()