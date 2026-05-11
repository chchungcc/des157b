$( "#draggable-circle" ).draggable({ revert: "invalid" });

$( "#droppable-box" ).droppable({
        drop: function( event, ui ){
            $(this).addClass('dropped');
        }
    }  
);