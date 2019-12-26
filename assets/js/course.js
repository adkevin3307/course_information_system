/*
this js is used to get course's all information by the course_id and grade(gived by the front page)and put data in web
*/

var course_infos; // store courses information we get from DB
var messages;

// get information from database and display on web
$(document).ready(function(){
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
        success: function(response){
            course_infos = response;
        }
    });
    var course_info = course_infos[0]; // turn array of course into a course

    // set course data into web page
    $("#course_name_en").text(course_info.eng_course_name);
    $("#course_name_ch").text(course_info.chi_course_name);
    // basic_info
    $("#course_id").text(course_info.course_id);
    $("#faculty_name").text(course_info.faculty_name);
    $("#professor").text(course_info.professor);
    $("#grade").text(course_info.grade);
    $("#credit").text(course_info.credit);
    $("#hour").text(course_info.hour);
    $("#max_students").text(course_info.max_students);
    $("#min_students").text(course_info.min_students);
    $("#students").text(course_info.students + "人 (此人數為最近一次查詢時人數)");
    if(course_info.internship) {
        $("#internship").text("是");
    }
    else {
        $("#internship").text("否");
    }
    $("#category").text(course_info.category);
    $("#duration").text(course_info.duration);
    // schedule and classroom
    var schedule_content = "";
    var classroom_content = "";
    for (let i = 0; i < course_info.schedule.length; i++) {
        schedule_content += course_info.schedule[i];
        classroom_content += course_info.classroom[i];
        if(i != course_info.schedule.length - 1) {
            schedule_content += ",";
            classroom_content += ",";
        }
    }
    $("#class_schedule").text(schedule_content);
    $("#classroom").text(classroom_content);

    $("#main_field").text(course_info.main_field);
    $("#sub_field").text(course_info.sub_field);
    $("#description").text(course_info.description);
    // co_professors
    var co_professors_content = "";
    for (let i = 0; i < course_info.co_professors.length; i++) {
        co_professors_content += course_info.co_professors[i];
        if (i != course_info.co_professors.length - 1) {
            co_professors_content += ",";
        }
    }
    $("#co_professors").text(co_professors_content);

    // syllabus
    $("#chi_objective").text(course_info.chi_objective);
    $("#eng_objective").text(course_info.eng_objective);
    $("#chi_pre_course").text(course_info.chi_pre_course);
    $("#eng_pre_course").text(course_info.eng_pre_course);
    $("#chi_outline").text(course_info.chi_outline);
    $("#eng_outline").text(course_info.eng_outline);
    $("#chi_teaching_method").text(course_info.chi_teaching_method);
    $("#eng_teaching_method").text(course_info.eng_teaching_method);
    $("#chi_reference").text(course_info.chi_reference);
    $("#eng_reference").text(course_info.eng_reference);
    $("#chi_syllabus").text(course_info.chi_syllabus);
    $("#eng_syllabus").text(course_info.eng_syllabus);
    $("#chi_evaluation").text(course_info.chi_evaluation);
    $("#eng_evaluation").text(course_info.eng_evaluation);

    // get message and put in messages
    /*$.ajax({
        url: "/api/messages/" + course_id,
        type: "GET",
        cache: false,
        success: function(response){
            messages = response;
        }
    });

    // set old messages into web page
    var content = "";
    for (let i = 0; i < messages.length; i++) {
        content += "<tr><td>";
        content += messages[i];
        content += "</td></tr>";
    }*/
});