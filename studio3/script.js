(function(){
    'use strict';
    console.log('js working');

    var granimInstance0 = new Granim({
        element: '#granim-ticket',
        direction: 'diagonal',
        opacity: [1, 1],
        states : {
            "default-state": {
                gradients: [
                    ['#ff6d88', '#ff9f38'],
                    ['#ffee7e','#c9ffb7']
                ]
            }
        }
    });

    var granimInstance1 = new Granim({
        element: '#granim-character1',
        direction: 'left-right',
        states : {
            "default-state": {
                gradients: [
                    ['#ff6d88', '#ff9f38'],
                    ['#ffee7e','#c9ffb7']
                ],
                transitionSpeed: 2000
            }
        }
    });

    var granimInstance2 = new Granim({
        element: '#granim-character2',
        direction: 'left-right',
        states : {
            "default-state": {
                gradients: [
                    ['#ff6d88', '#ff9f38'],
                    ['#ffee7e','#c9ffb7']
                ],
                transitionSpeed: 2000
            }
        }
    });

    var granimInstance3 = new Granim({
        element: '#granim-character3',
        direction: 'left-right',
        states : {
            "default-state": {
                gradients: [
                    ['#ff6d88', '#ff9f38'],
                    ['#ffee7e','#c9ffb7']
                ],
                transitionSpeed: 2000
            }
        }
    });

    var granimInstance4 = new Granim({
        element: '#granim-character4',
        direction: 'left-right',
        states : {
            "default-state": {
                gradients: [
                    ['#ff6d88', '#ff9f38'],
                    ['#ffee7e','#c9ffb7']
                ],
                transitionSpeed: 2000
            }
        }
    });

    var granimInstance5 = new Granim({
        element: '#granim-character5',
        direction: 'left-right',
        states : {
            "default-state": {
                gradients: [
                    ['#ff6d88', '#ff9f38'],
                    ['#ffee7e','#c9ffb7']
                ],
                transitionSpeed: 2000
            }
        }
    });

    var granimInstance6 = new Granim({
        element: '#granim-character6',
        direction: 'left-right',
        states : {
            "default-state": {
                gradients: [
                    ['#ff6d88', '#ff9f38'],
                    ['#ffee7e','#c9ffb7']
                ],
                transitionSpeed: 2000
            }
        }
    });

    // drag
    $(function(){
        $( "#character1" ).draggable({containment: 'body'});
        $( "#character2" ).draggable({containment: 'body'});
        $( "#character3" ).draggable({containment: 'body'});
        $( "#character4" ).draggable({containment: 'body'});
        $( "#character5" ).draggable({containment: 'body'});
        $( "#character6" ).draggable({containment: 'body'});
    });

})();

