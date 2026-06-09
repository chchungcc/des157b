(function(){
    'use strict';
    console.log('js working');

    // Initialize Parse
    Parse.initialize("XOZcA2zrKTVUA7OkaSm6ITZFS6M7FdtMGprvUyc2", "FUxOL6nSyjfmNB4fbLs38xcSs5Jf9dk4JwMmH0kM"); 
    Parse.serverURL = "https://parseapi.back4app.com/";

    //gsap split text
    gsap.registerPlugin(SplitText);

    //animate on scroll
    AOS.init();

    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });

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
    const outline = document.querySelector('.outline');
    const line = document.querySelector('.line');

    //text animation
    let splitClaim;
    // showChart(); 

    //animate line
    outline.addEventListener('click', function(event){
        event.preventDefault();
        line.classList.add('animate');
    })

    line.addEventListener('animationend', function(event){
        event.preventDefault();
        alert('Congratulations! You are now a permanent US resident!')
    })

    //typewriter
    function typewriter(element, onComplete){
        
        const split = SplitText.create(element, { type: "chars, words" });
        
        gsap.from(split.chars, {
            opacity: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: 'power1.in',
            onComplete: onComplete 
        });
    }

    function typewriterWords(element, onComplete){
        
        const split = SplitText.create(element, { type: "words" });
        
        gsap.from(split.words, {
            opacity: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: 'power1.in',
            onComplete: onComplete 
        });
    }

    function stagger(element, onComplete){
        const split = SplitText.create(element, { type: "chars, words" });
        gsap.from(split.chars,{
            y:100,
            autoAlpha:0,
            stagger: 0.05
        })
    }

    //get green card button
    cardBtn.addEventListener('click', function(event){
        event.preventDefault();
        if(count == 0){
            alert('Like');
            cardBtn.textContent = "Next Step!"
            document.querySelector('#popGroup1').style.display = 'block';
        } else if (count == 1){
            alert('a');
            cardBtn.textContent = "Another Step!"
            document.querySelector('#popGroup2').style.display = 'block';
        } else if (count == 2){
            alert('series');
            cardBtn.textContent = "And Another!"
            document.querySelector('#popGroup3').style.display = 'block';
        } else if (count == 3){
            alert('of');
            cardBtn.textContent = "Almost There!"
            document.querySelector('#popGroup4').style.display = 'block';
        } else if (count == 4){
            alert('annoying');
            cardBtn.textContent = "So Close!"
            document.querySelector('#popGroup5').style.display = 'block';
        } else if (count == 5){
            alert('pop-ups.');
            cardBtn.style.display = 'none';
            document.querySelector('#popGroup1').style.display = 'none';
            document.querySelector('#popGroup2').style.display = 'none';
            document.querySelector('#popGroup3').style.display = 'none';
            document.querySelector('#popGroup4').style.display = 'none';
            document.querySelector('#popGroup5').style.display = 'none';
            document.querySelector('#pop13').style.display = 'block';
            document.querySelector('#finalNext').style.display = 'block';
            outcome.style.display = 'block';
        }
        count++;
        console.log(count);
    })

    //tell us btn
    const showBtn = document.querySelector('.show');
    const tellUsBox = document.querySelector('#tell-us-box');

    tellUsBox.style.display = 'none';

    showBtn.addEventListener('click', async function(event) {
        event.preventDefault();
        tellUsBox.style.display = 'block';
    });
    
    //submit text area
    const submitTextBtn = document.querySelector('.submitText');
    const feedbackInput = document.querySelector('#feedback');
    submitTextBtn.addEventListener('click', async function(event) {
        event.preventDefault();
        const text = feedbackInput.value.trim();
        if (!text) { alert('Please write something!'); return; }

        const FutureResponses = Parse.Object.extend('FutureResponses');
        const futureResponse = new FutureResponses();
        futureResponse.set('response', text);

        try {
            await futureResponse.save();
            feedbackInput.value = '';
            tellUsBox.style.display = 'none';
            console.log('Future response saved!');
            feedbackInput.value = '';
            alert('Thank you for your response!');
            allResponses.unshift(saved);
        } catch (error) {
            console.error('Error saving:', error.message);
        }
    });

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
                        backgroundColor: 'rgba(132, 0, 22, 0.5)',
                        borderColor: 'rgb(132, 0, 22)',
                        borderWidth: 1
                    },

                    //rarely
                    {
                        axis: 'y',
                        label: 'Rarely',
                        data: rarelyNum,
                        fill: false,
                        backgroundColor: 'rgba(219, 90, 111, 0.5)',
                        borderColor: 'rgb(219, 90, 111)',
                        borderWidth: 1
                    },

                    //sometimes
                    {
                        axis: 'y',
                        label: 'Sometimes',
                        data: sometimesNum,
                        fill: false,
                        backgroundColor: 'rgba(234, 254, 87, 0.5)',
                        borderColor: 'rgb(174, 192, 37)',
                        borderWidth: 1
                    },

                    //often
                    {
                        axis: 'y',
                        label: 'Often',
                        data: oftenNum,
                        fill: false,
                        backgroundColor: 'rgba(95, 117, 226, 0.5)',
                        borderColor: 'rgb(95, 117, 226)',
                        borderWidth: 1
                    },

                    //always
                    {
                        axis: 'y',
                        label: 'Always',
                        data: alwaysNum,
                        fill: false,
                        backgroundColor: 'rgba(0, 13, 81, 0.5)',
                        borderColor: 'rgb(0, 13, 81)',
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
        const loader = document.querySelector('.loader');
    
        loader.textContent = 'LOADING CHART...';
        
        await summarizeData();
        await drawResultsChart();
        
        loader.style.display = 'none';
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
                    window.scrollTo(0, 0);
                    AOS.refresh();

                    const claims = screens[i + 1].querySelector('.claim');
                    if (claims) typewriter(claims);

                    const h1 = screens[i + 1].querySelector('.stats');
                    const textClaim = screens[i + 1].querySelector('.text');
                    const statsPClaim = screens[i + 1].querySelector('.stats-p');

                    if (statsPClaim) statsPClaim.style.visibility = 'hidden';
                    if (textClaim) textClaim.style.visibility = 'hidden';

                    if (h1) {
                        typewriter(h1, () => {
                            if (textClaim) {
                                textClaim.style.visibility = 'visible';
                                typewriterWords(textClaim, () => {
                                    if (statsPClaim) {
                                        statsPClaim.style.visibility = 'visible';
                                        stagger(statsPClaim);
                                    }
                                });
                            }
                        });
                    }

                    const spanRed = screens[i + 1].querySelectorAll('span.red');
                    if (spanRed.length > 0) {
                        spanRed.forEach(span => stagger(span));
                    }


                    if (screens[i + 1].classList.contains('timeline')) {
                        new fullpage('#fullpage', {
                            //options here
                            autoScrolling:true,
                            // scrollHorizontally: true
                        });
                    }

                } else {
                    console.log('no screens left');
                }
                break;
            }
        }

    }
    //jquery drag
    $(function(){
        $( "#pop1" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop2" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop3" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop4" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop5" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop6" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop7" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop8" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop9" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop10" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop11" ).draggable({containment: 'body', stack: '.popCard'});
        $( "#pop12" ).draggable({containment: 'body', stack: '.popCard'});
    });
})();