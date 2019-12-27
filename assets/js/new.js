/*
This js is used by new.html
FUNCTION:
1. Judge if new.html is used for new course or modify
2. Collect user input and send to database
*/

// Judge if new.html is used for new course or modify
$(document).ready(function() {
    if(location.search == "") { // new a course

    }
    else { // change a course

    }
});

$("#send").click(function(){
    // check all input

    // send data
    $.ajax({
        url: "/api/course",
        type: "POST",
        success: function(){
            // prompt is success
            // return to home page
            $(location).attr('href', 'index.html');
        }
    });
});