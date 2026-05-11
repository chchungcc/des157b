/* Your script here */
$( "#dog" ).draggable({ revert: "invalid", snap: "#parent div"  });
$( "#cat" ).draggable({ revert: "invalid", snap: "#parent div" });

$( "#dog-drop" ).droppable({
    accept: "#dog",
    tolerance: "touch",
    drop: function(event, ui) {
        ui.draggable.offset($(this).offset());
    }
});

$( "#cat-drop" ).droppable({
    accept: "#cat",
    tolerance: "touch",
    drop: function(event, ui) {
        ui.draggable.offset($(this).offset());
    }
});