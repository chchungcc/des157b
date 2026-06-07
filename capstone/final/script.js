(function(){
    'use strict';
    console.log('js working');

    // Initialize Parse
    Parse.initialize("XOZcA2zrKTVUA7OkaSm6ITZFS6M7FdtMGprvUyc2", "FUxOL6nSyjfmNB4fbLs38xcSs5Jf9dk4JwMmH0kM"); 
    Parse.serverURL = "https://parseapi.back4app.com/";

    const nxtBtn = document.querySelectorAll('.next');
    const submitBtn = document.querySelector('.submit');
    const screens = document.querySelectorAll('.question-screen');
    const inputs = document.querySelectorAll('#questionnaire input:not([type="submit"])');

    //summarizing radio buttons data
    let neverNum = {};
    let rarelyNum = {};
    let sometimesNum = {};
    let oftenNum = {};
    let alwaysNum = {};

    //for card btn
    let count = 0;
    const cardBtn = document.querySelector('.getCard');
    const outcome = document.querySelector('.outcome');

    showChart(); 

    //get visa button
    // cardBtn.addEventListener('click', function(event){
    //     event.preventDefault();
    //     if(count == 0){
    //         alert('Like');
    //         cardBtn.textContent = "Next Step!"
    //     } else if (count == 1){
    //         alert('a');
    //         cardBtn.textContent = "Another Step!"
    //     } else if (count == 2){
    //         alert('series');
    //         cardBtn.textContent = "And Another!"
    //     } else if (count == 3){
    //         alert('of');
    //         cardBtn.textContent = "Almost There!"
    //     } else if (count == 4){
    //         alert('annoying');
    //         cardBtn.textContent = "So Close!"
    //     } else if (count == 5){
    //         alert('pop-ups.');
    //         cardBtn.style.display = 'none';
    //         outcome.style.display = 'block';
    //     }
    //     count++;
    //     console.log(count);
    // })



    //retrieve data
    async function summarizeData(){
        const answerTypes = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];
        const questionsAll = ['question2', 'question3', 'question4', 'question5'];
        const results = {};

        for (const question of questionsAll) {
            results[question] = {};

            const counts = await Promise.all(
                answerTypes.map(answer => {
                    const query = new Parse.Query('UserAnswers');
                    query.equalTo(question, answer);
                    return query.count();
                })
            );

            // store each answer type with its count
            answerTypes.forEach((answer, i) => {
                results[question][answer] = counts[i];
            });
        }

        console.log(results);

        //create arrays for graph
        neverNum = Object.values(results).map(question => question['Never']);
        console.log(neverNum);

        rarelyNum = Object.values(results).map(question => question['Rarely']);
        console.log(rarelyNum);

        sometimesNum = Object.values(results).map(question => question['Sometimes']);
        console.log(sometimesNum);

        oftenNum = Object.values(results).map(question => question['Often']);
        console.log(oftenNum);

        alwaysNum = Object.values(results).map(question => question['Always']);
        console.log(alwaysNum);

        // const answerType = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];
        // const questionNumber = ['question2', 'question3', 'question4', 'question5'];

        // const q2Never = new Parse.Query('UserAnswers');
        // const q2Rarely = new Parse.Query('UserAnswers');
        // const q2Sometimes = new Parse.Query('UserAnswers');
        // const q2Often = new Parse.Query('UserAnswers');
        // const q2Always = new Parse.Query('UserAnswers');

        // q2Never.equalTo('question2', 'Never');
        // q2Rarely.equalTo('question2', 'Rarely');
        // q2Sometimes.equalTo('question2', 'Sometimes');
        // q2Often.equalTo('question2', 'Often');
        // q2Always.equalTo('question2', 'Always');

        // await countingResponses(q2Never);
        // await countingResponses(q2Rarely);
        // await countingResponses(q2Sometimes);
        // await countingResponses(q2Often);
        // await countingResponses(q2Always);

        // async function countingResponses(option){
        //     try {
        //         const count = await option.count();
        //         console.log("Responses found: " + count);
        //     } catch(error) {
        //         console.error(error);
        //     }
        // }
    }

    //draw chart
    async function drawResultsChart(){
        const chart1 = document.querySelector('#chart1').getContext('2d');
        new Chart (chart1, {
            type: 'bar',
            data: {
                labels: ['Claim 1', 'Claim 2', 'Claim 3', 'Claim 4'],
                datasets: [
                    //never
                    {
                        axis: 'y',
                        label: 'Never',
                        data: neverNum,
                        fill: false,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 1
                    },

                    //rarely
                    {
                        axis: 'y',
                        label: 'Rarely',
                        data: rarelyNum,
                        fill: false,
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgb(255, 159, 64)',
                        borderWidth: 1
                    },

                    //sometimes
                    {
                        axis: 'y',
                        label: 'Sometimes',
                        data: sometimesNum,
                        fill: false,
                        backgroundColor: 'rgba(255, 205, 86, 0.2)',
                        borderColor: 'rgb(255, 205, 86)',
                        borderWidth: 1
                    },

                    //often
                    {
                        axis: 'y',
                        label: 'Often',
                        data: oftenNum,
                        fill: false,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1
                    },

                    //always
                    {
                        axis: 'y',
                        label: 'Always',
                        data: alwaysNum,
                        fill: false,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 1
                    }
                ]
            },

            options: {
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'How Other People Have Answered'
                    }
                }
            }
        })
        console.log('graphed')
    }

    //work in progress
    function drawStatsChart(){
        const chart2 = document.querySelector('#chart2').getContext('2d');
        new Chart (chart2, {
            type: 'doughnut'
        })
    }

    //showing the chart 
    async function showChart(){
        await summarizeData();
        await drawResultsChart();
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
                newAnswer[key] = Number(input.value); //convert value to number
            } else {
                newAnswer[key] = input.value;
            }
        })

        //extend the parse class 
        const UserAnswers = Parse.Object.extend('UserAnswers');

        //create a new instance
        const userAnswer = new UserAnswers();

        //set each field onto the parse object
        Object.keys(newAnswer).forEach(key => {
            userAnswer.set(key, newAnswer[key]);
        });

        //save to back4app
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
        if(!validateForm){
            return;
        }
        else{
            nxtScreen();
            //wait for saving data to finish
            await addFormData();
            await showChart();
        }
        
    })

    //next button
    for(let i = 0; i < nxtBtn.length; i++){
        nxtBtn[i].addEventListener('click', function(event){
            event.preventDefault();
            if(!validateForm()){
                return;
            } else{
               nxtScreen(); 
            }
            console.log('screen changed');

        })
    }

    //form validation
    function validateForm(){
        //select current section screen
            const currentScreen = document.querySelector('.question-screen:not(.hidden)');

            //capture number input 
            const numInput = currentScreen.querySelector('#questionnaire input[type="number"]');
            console.log(numInput);
            //capture all radio buttons
            const radioInput = currentScreen.querySelectorAll('#questionnaire input[type="radio"]');

            let answered = true;

            //check if question is radio input
            if (radioInput.length > 0) {
                //grabs name of the radio buttons
                const radioName = radioInput[0].getAttribute('name');
                //checks if there is a checked 
                const checked = currentScreen.querySelector(`input[name="${radioName}"]:checked`);
            
                //if nothing was checked
                if (checked === null) {
                    answered = false;
                    console.log(answered);
                }
            }

            //check if there is number input
            if (numInput && numInput.value.trim() === ''){
                answered = false;
                // console.log(answered);
            }

            if(answered === false){
                alert('Please answer the question!');
                // return;
            }

            return answered;
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

    //fullpage
    new fullpage('#fullpage', {
        //options here
        autoScrolling:true,
        scrollHorizontally: true
    });

})();