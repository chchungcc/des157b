(function(){
    'use strict';
    console.log('js working');

    // Initialize Parse
    Parse.initialize("XOZcA2zrKTVUA7OkaSm6ITZFS6M7FdtMGprvUyc2", "FUxOL6nSyjfmNB4fbLs38xcSs5Jf9dk4JwMmH0kM"); 
    Parse.serverURL = "https://parseapi.back4app.com/";

    const nxtBtn = document.querySelectorAll('.next');
    const submitBtn = document.querySelector('.submit')
    const screens = document.querySelectorAll('.question-screen');
    const inputs = document.querySelectorAll('#questionnaire input:not([type="submit"])');

    console.log(inputs);

    async function displayData(){
        const answers = Parse.Object.extend('UserAnswers');
        const query = new Parse.Query(answers);
        const results = await query.ascending('question1').find();
        console.log(results);

        results.forEach(function (answer){
            const id = answer.id;
            const answer1 = answer.get('question1');
            const answer2 = answer.get('question2');
            const answer3 = answer.get('question3');
            const answer4 = answer.get('question4');
            const answer5 = answer.get('question5');
        })
    }

    async function addFormData(){
        const newAnswer = {};

        inputs.forEach(input => {
            const key = input.getAttribute('name');
            
            //only take checked option
            if (input.type === 'radio'){
                if(input.checked){
                    newAnswer[key] = input.value;
                }
            } else {
                newAnswer[key] = input.value;
            }
        })

        console.log(newAnswer);
    }

    displayData();

    submitBtn.addEventListener('click', function(event){

    })

    for(let i = 0; i < nxtBtn.length; i++){
        nxtBtn[i].addEventListener('click', function(event){
            event.preventDefault();
            nxtScreen();
            console.log('screen changed');

        })
    }
    

    function nxtScreen(){
        for(let i = 0; i < screens.length; i++){
            if (!screens[i].classList.contains("hidden")) {
                //hide current screen
                screens[i].classList.add("hidden");
            if (i + 1 < screens.length) {
                    //show screen
                    screens[i + 1].classList.remove("hidden");
                } else {
                    console.log('no screens left');
                }
                break;
            }
        }

    }

})();