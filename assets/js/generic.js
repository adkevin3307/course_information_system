/*
This js is used by generic.html
FUNCTION
If ther is no course_id input, return to home page
*/

$(window).load(function(){
    if(location.search == "") {
        $(location).attr('href', 'index.html');
    }
})