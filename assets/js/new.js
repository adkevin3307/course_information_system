/*
This js is used by new.html
FUNCTION:
1. Judge if new.html is used for new course or modify
2. Collect user input and send to database
*/

var input = {
    "course_id" : "",
    "grade": "",
    "professor": "",
    "year_semester": "",
    "faculty_name": "",
    "chi_course_name": "",
    "eng_course_name": "",
    "credit": 0,
    "hour": 0,
    "max_students": 0,
    "min_students": 0,
    "category": "",
    "duration": "",
    "internship": false,
    "main_field": "",
    "sub_field": "",
    "students": 0,
    "description": "",
    "core_ability": "",
    "chi_objective": "",
    "eng_objective": "",
    "chi_pre_course": "",
    "eng_pre_course": "",
    "chi_outline": "",
    "eng_outline": "",
    "chi_teaching_method": "",
    "eng_teaching_method": "" ,
    "chi_reference": "",
    "eng_reference": "",
    "chi_syllabus": "",
    "eng_syllabus": "",
    "chi_evaluation": "",
    "eng_evaluation": "",
    "reference_link":　"",
    "schedule": [],
    "classroom": [],
    "co_professors": []
}

// check if there is data and set data in web
function setData(id, value) {
    if(value == null) {
        $(id).text("");
    }
    else {
        $(id).text(value);
    }
}

// string to array
function string2array(str) {
    return str.split(",");
}

// Judge if new.html is used for new course or modify
$(document).ready(function() {
    if(location.search != "") {  // change a course
        // change title ,document and button
        $("title").text("修改課程");
        $("#title").text("修改");
        $("#document").text("點擊欲修改的項目進行修改，不修改的項目請維持原樣。");
        $("#getData").text("修改");
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
        $("#schedule").val(course_info.schedule);
        $("#classroom").val(course_info.classroom);
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
        // change title ,document and button
        $("title").text("新增課程");
        $("#title").text("新增");
        $("#document").text("將每個項目的資料填入，完成後點擊送出。");
        $("#getData").text("新增");
    }

    $('#cancel_modify').click(function() {
        location.href = 'generic.html?course_id=' + course_info.course_id + '&grade=' + course_info.grade;
    })
});

// get user input -> check -> show
function click_sends() {
    // get input and put int var data
    input.year_semester = parseInt($("#year_semester").val());
    input.course_id = $("#course_id").val();
    input.chi_course_name = $("#chi_course_name").val();
    input.eng_course_name = $("#eng_course_name").val();
    input.professor = $("#professor").val();
    input.grade = $("#grade").val();
    input.credit = parseInt($("#credit").val());
    input.hour = parseInt($("#hour").val());
    input.max_students = parseInt($("#max_students").val());
    input.min_students = parseInt($("#min_students").val());
    input.faculty_name = $("#faculty_name").val();
    input.internship = ($("#internship").val() === "true");
    input.category = $("#category").val();
    input.duration = $("#duration").val();
    input.schedule = $("#schedule").val().map(Number);
    input.classroom = string2array($("#classroom").val());
    input.main_field = $("#main_field").val();
    input.sub_field = $("#sub_field").val();
    input.description = $("#description").val();
    input.co_professors = string2array($("#co_professors").val());

    input.chi_objective = $("#chi_objective").val();
    input.eng_objective = $("#eng_objective").val();
    input.chi_pre_course = $("#chi_pre_course").val();
    input.eng_pre_course = $("#eng_pre_course").val();
    input.chi_outline = $("#chi_outline").val();
    input.eng_outline = $("#eng_outline").val();
    input.chi_teaching_method = $("#chi_teaching_method").val();
    input.eng_teaching_method = $("#eng_teaching_method").val();
    input.chi_reference = $("#chi_reference").val();
    input.eng_reference = $("#eng_reference").val();
    input.chi_syllabus = $("#chi_syllabus").val();
    input.eng_syllabus = $("#eng_syllabus").val();
    input.chi_evaluation = $("#chi_evaluation").val();
    input.eng_evaluation = $("#eng_evaluation").val();
    // output for user check
    setData("#out_year_semester", input.year_semester);
    setData("#out_eng_course_name", input.eng_course_name);
    setData("#out_chi_course_name", input.chi_course_name);
    setData("#out_course_id", input.course_id);
    setData("#out_faculty_name", input.faculty_name);
    setData("#out_professor", input.professor);
    setData("#out_grade", input.grade);
    setData("#out_credit", input.credit);
    setData("#out_hour", input.hour);
    setData("#out_max_students", input.max_students);
    setData("#out_min_students", input.min_students);
    setData("#out_students", input.students + "人 (此人數為最近一次查詢時人數)");
    if(input.internship) {
        $("#out_internship").text("是");
    }
    else {
        $("#out_internship").text("否");
    }
    setData("#out_category", input.category);
    setData("#out_duration", input.duration);
    setData("#out_class_schedule", input.schedule);
    setData("#out_classroom", input.classroom);

    setData("#out_main_field", input.main_field);
    setData("#out_sub_field", input.sub_field);
    setData("#out_description", input.description);
    // co_professors
    var co_professors_content = "";
    for (let i = 0; i < input.co_professors.length; i++) {
        co_professors_content += input.co_professors[i];
        if (i != input.co_professors.length - 1) {
            co_professors_content += ",";
        }
    }
    setData("#out_co_professors", co_professors_content);

    // syllabus
    setData("#out_chi_objective", input.chi_objective);
    setData("#out_eng_objective", input.eng_objective);
    setData("#out_chi_pre_course", input.chi_pre_course);
    setData("#out_eng_pre_course", input.eng_pre_course);
    setData("#out_chi_outline", input.chi_outline);
    setData("#out_eng_outline", input.eng_outline);
    setData("#out_chi_teaching_method", input.chi_teaching_method);
    setData("#out_eng_teaching_method", input.eng_teaching_method);
    setData("#out_chi_reference", input.chi_reference);
    setData("#out_eng_reference", input.eng_reference);
    setData("#out_chi_syllabus", input.chi_syllabus);
    setData("#out_eng_syllabus", input.eng_syllabus);
    setData("#out_chi_evaluation", input.chi_evaluation);
    setData("#out_eng_evaluation", input.eng_evaluation);
}

// send all data to DB
function sendData(){
    // send data
    if(location.search == "") { // add a course
        $.ajax({
            url: "https://cis.ntouo.tw/api/course",
            type: "POST",
            async: false,
            data: input,
            success: function() {
                window.alert("新增課程成功");
                $(location).attr('href', 'index.html');
            }
        });
    }
    else { // change a course
        var search_str = location.search.substr(1);
        var search_array = search_str.split('&');
        var search_array0 = search_array[0].split('=');
        var search_array1 = search_array[1].split('=');
        var course_id = search_array0[1];
        var grade = search_array1[1];
        $.ajax({
            url: "https://cis.ntouo.tw/api/course/" + course_id + "/" + grade,
            type: "PUT",
            async: false,
            data: input,
            success: function(response) {
                window.alert("修改課程成功");
                $(location).attr('href', 'index.html');
            }
        });
    }
};