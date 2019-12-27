/*
This js is used by new.html
FUNCTION:
1. Judge if new.html is used for new course or modify
2. Collect user input and send to database
*/

// check if there is data and set data in web
function setData(id, value) {
    if(value == null) {
        $(id).text("");
    }
    else {
        $(id).text(value);
    }
}

// Judge if new.html is used for new course or modify
$(document).ready(function() {
    if(location.search != "") {  // change a course
        // change title and document
        $("#title").text("修改");
        $("#document").text("點擊欲修改的項目進行修改，不修改的項目請維持原樣。");
        // set old data
        // process input from url
        var search_str = location.search.substr(1);
        var search_array = search_str.split('&');
        var search_array0 = search_array[0].split('=');
        var search_array1 = search_array[1].split('=');
        var course_id = search_array0[1];
        var grade = search_array1[1];

        // get course all information by primary key(course_id, grade) and put in course_info
        $.ajax({
            url: "https://cis.ntouo.tw/api/courses?course_id=" + course_id + "&grade=" + grade,
            type: "get",
            async: false,
            success: function(response) {
                course_infos = response;
            }
        });
        var course_info = course_infos[0]; // turn array of course into a course

        $("#year_semester").val(course_info.year_semester);
        $("#course_id").val(course_info.course_id);
        $("#chi_course_name").val(course_info.chi_course_name);
        $("#eng_course_name").val(course_info.eng_course_name);
        $("#professor").val(course_info.professor);
        $("#grade").val(course_info.grade);
        $("#credit").val(course_info.credit);
        $("#hour").val(course_info.hour);
        $("#max_students").val(course_info.max_students);
        $("#min_students").val(course_info.min_students);
        $("#faculty_name").val(course_info.faculty_name);
        if(course_info.internship){
            $("#internship").val("true");
        }
        else {
            $("#intership").val("false");
        }
        
        $("#category").val(course_info.category);
        $("#duration").val(course_info.duration);
        $("#main_field").val(course_info.main_field);
        $("#sub_field").val(course_info.sub_field);
        $("#description").val(course_info.description);
        $("#co_professors").val(course_info.co_professors);

        // syllabus
        setData("#chi_objective", course_info.chi_objective);
        setData("#eng_objective", course_info.eng_objective);
        setData("#chi_pre_course", course_info.chi_pre_course);
        setData("#eng_pre_course", course_info.eng_pre_course);
        setData("#chi_outline", course_info.chi_outline);
        setData("#eng_outline", course_info.eng_outline);
        setData("#chi_teaching_method", course_info.chi_teaching_method);
        setData("#eng_teaching_method", course_info.eng_teaching_method);
        setData("#chi_reference", course_info.chi_reference);
        setData("#eng_reference", course_info.eng_reference);
        setData("#chi_syllabus", course_info.chi_syllabus);
        setData("#eng_syllabus", course_info.eng_syllabus);
        setData("#chi_evaluation", course_info.chi_evaluation);
        setData("#eng_evaluation", course_info.eng_evaluation);
    }
    else { // new a course
        // change title and document
        $("#title").text("新增");
        $("#document").text("將每個項目的資料填入，完成後點擊送出。");
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