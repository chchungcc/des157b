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

    // async function displayData(){
    //     const answers = Parse.Object.extend('UserAnswers');
    //     const query = new Parse.Query(answers);
    //     const results = await query.ascending('question1').find();
    //     console.log(results);

    //     results.forEach(function (answer){
    //         const id = answer.id;
    //         const answer1 = answer.get('question1');
    //         document.querySelector('#q1result').innerHTML = `<p>you answered ${answer1} for question one</p>`
    //         const answer2 = answer.get('question2');
    //         document.querySelector('#q2result').innerHTML = `<p>you answered ${answer2} for question two</p>`
    //         const answer3 = answer.get('question3');
    //         const answer4 = answer.get('question4');
    //         const answer5 = answer.get('question5');
    //     })
    // }

    //display results
    async function displayData(){
        const answers = Parse.Object.extend('UserAnswers');
        const query = new Parse.Query(answers);
        
        // get the most recently created row
        const latest = await query.descending('createdAt').first();

        if (latest) {
            const answer1 = latest.get('question1');
            const answer2 = latest.get('question2');
            const answer3 = latest.get('question3');
            const answer4 = latest.get('question4');
            const answer5 = latest.get('question5');

            document.querySelector('#q1result').innerHTML = `<p>you answered ${answer1} for question one</p>`;
            document.querySelector('#q2result').innerHTML = `<p>you answered ${answer2} for question two</p>`;
            document.querySelector('#q3result').innerHTML = `<p>you answered ${answer3} for question three</p>`;
            document.querySelector('#q4result').innerHTML = `<p>you answered ${answer4} for question four</p>`;
            document.querySelector('#q5result').innerHTML = `<p>you answered ${answer5} for question five</p>`;
        }
    }

    //logging inputs
    async function addFormData(){
        const newAnswer = {};

        inputs.forEach(input => {
            const key = input.getAttribute('name');
            
            //only take checked option
            if (input.type === 'radio'){
                if(input.checked){
                    newAnswer[key] = input.value;
                }
            } else if (input.type === 'number') {
                newAnswer[key] = Number(input.value);
            } else {
                newAnswer[key] = input.value;
            }
        })

        // 1. Extend the Parse class (matches your Back4App class name)
        const UserAnswers = Parse.Object.extend('UserAnswers');

        // 2. Create a new instance
        const userAnswer = new UserAnswers();

        // 3. Set each field onto the Parse object
        Object.keys(newAnswer).forEach(key => {
            userAnswer.set(key, newAnswer[key]);
        });

        // 4. Save to Back4App
        try {
            const result = await userAnswer.save();
            console.log('Saved successfully! Object ID:', result.id);
        } catch (error) {
            console.error('Error saving:', error.message);
        }

        console.log(newAnswer);
    }

    //submit button
    submitBtn.addEventListener('click', async function(event){
        event.preventDefault();
        nxtScreen();
        //wait for saving data to finish
        await addFormData();
        await displayData();
    })

    //next button
    for(let i = 0; i < nxtBtn.length; i++){
        nxtBtn[i].addEventListener('click', function(event){
            event.preventDefault();
            nxtScreen();
            console.log('screen changed');

        })
    }
    
    //change screens
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