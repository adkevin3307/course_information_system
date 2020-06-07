/*
This js is used by new.html
FUNCTION:
1. Judge if new.html is used for new course or modify
2. Collect user input and send to database
*/

var input = {
    "information": {
        "id": "",
        "grade": "",
        "professor": "",
        "yearSemester": "",
        "facultyName": "",
        "name": {
            "english": "",
            "chinese": ""
        },
        "credit": 0,
        "hour": 0,
        "maxStudents": 0,
        "minStudents": 0,
        "category": "",
        "duration": "",
        "internship": false,
        "mainField": "",
        "subField": "",
        "students": 0,
        "description": "",
        "schedule": [],
        "classroom": [],
        "coProfessors": []
    },
    "guideline": {
        "objective": {
            "english": "",
            "chinese": ""
        },
        "preCourse": {
            "english": "",
            "chinese": ""
        },
        "outline": {
            "english": "",
            "chinese": ""
        },
        "teachingMethod": {
            "english": "",
            "chinese": ""
        },
        "reference": {
            "english": "",
            "chinese": ""
        },
        "syllabus": {
            "english": "",
            "chinese": ""
        },
        "evaluation": {
            "english": "",
            "chinese": ""
        },
        "referenceLink": ""
    }
}

// check if there is data and set data in web
function setData(id, value) {
    $(id).text((value == null ? '' : value));
}

// string to array
function string2array(str) {
    return (str.includes(',') ? str.split(',') : [str]);
}

// Judge if new.html is used for new course or modify
$(document).ready(function () {
    if (location.search != "") {  // change a course
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
        var id = search_array0[1];
        var grade = search_array1[1];

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var graphql_body = JSON.stringify({
            query:
                '{' +
                    'course(id:"' + id + '",grade:"' + grade + '") {' +
                        'information {' +
                            'id ' +
                            'yearSemester ' +
                            'facultyName ' +
                            'professor ' +
                            'name {chinese english} ' +
                            'grade ' +
                            'credit ' +
                            'hour ' +
                            'maxStudents ' +
                            'minStudents ' +
                            'students ' +
                            'category ' +
                            'duration ' +
                            'internship ' +
                            'schedule ' +
                            'classroom ' +
                            'mainField ' +
                            'subField ' +
                            'description ' +
                            'coProfessors' +
                        '}' +
                        'guideline {' +
                            'objective {chinese english} ' +
                            'preCourse {chinese english} ' +
                            'outline {chinese english} ' +
                            'teachingMethod {chinese english} ' +
                            'reference {chinese english} ' +
                            'syllabus {chinese english} ' +
                            'evaluation {chinese english} ' +
                            'referenceLink' +
                        '}' +
                    '}' +
                '}',
            variables: {}
        })

        fetch('http://localhost:8080/graphql', {
            method: 'post',
            headers: headers,
            body: graphql_body,
            redirect: "follow"
        }).then(
            response => response.text()
        ).then(
            result => JSON.parse(result)['data']['course']
        ).then(function(course) {
            // information
            $("#course_id").val(course['information']['id'])
            $("#year_semester").val(course['information']['yearSemester'])
            $("#chi_course_name").val(course['information']['name']['chinese'])
            $("#eng_course_name").val(course['information']['name']['english'])
            $("#professor").val(course['information']['professor'])
            $("#grade").val(course['information']['grade'])
            $("#credit").val(course['information']['credit'])
            $("#hour").val(course['information']['hour'])
            $("#max_students").val(course['information']['maxStudents'])
            $("#min_students").val(course['information']['minStudents'])
            $("#faculty_name").val(course['information']['facultyName'])
            $("#internship").attr('value', course['information']['internship'])
            $("#category").val(course['information']['category'])
            $("#duration").val(course['information']['duration'])
            $("#schedule").val(course['information']['schedule'])
            $("#classroom").val(course['information']['classroom'])
            $("#main_field").val(course['information']['mainField'])
            $("#sub_field").val(course['information']['subField'])
            $("#description").val(course['information']['description'])
            $("#co_professors").val(course['information']['coProfessors'])
            // guideline
            setData("#chi_objective", course['guideline']['objective']['chinese']);
            setData("#eng_objective", course['guideline']['objective']['english']);
            setData("#chi_pre_course", course['guideline']['preCourse']['chinese']);
            setData("#eng_pre_course", course['guideline']['preCourse']['english']);
            setData("#chi_outline", course['guideline']['outline']['chinese']);
            setData("#eng_outline", course['guideline']['outline']['english']);
            setData("#chi_teaching_method", course['guideline']['teachingMethod']['chinese']);
            setData("#eng_teaching_method", course['guideline']['teachingMethod']['english']);
            setData("#chi_reference", course['guideline']['reference']['chinese']);
            setData("#eng_reference", course['guideline']['reference']['english']);
            setData("#chi_syllabus", course['guideline']['syllabus']['chinese']);
            setData("#eng_syllabus", course['guideline']['syllabus']['english']);
            setData("#chi_evaluation", course['guideline']['evaluation']['chinese']);
            setData("#eng_evaluation", course['guideline']['evaluation']['english']);

            $('#cancel_modify').click(function () {
                location.href = 'course.html?id=' + id + '&grade=' + grade;
            })
        }).catch(
            error => console.log(error)
        )
    }
    else { // new a course
        // change title ,document and button
        $("title").text("新增課程");
        $("#title").text("新增");
        $("#document").text("將每個項目的資料填入，完成後點擊送出。");
        $("#getData").text("新增");

        $('#cancel_modify').click(function () {
            location.href = 'index.html';
        })
    }
});

// get user input -> check -> show
function click_sends() {
    // get input and put int var data
    input['information']['yearSemester'] = parseInt($("#year_semester").val());
    input['information']['id'] = $("#course_id").val();
    input['information']['name']['chinese'] = $("#chi_course_name").val();
    input['information']['name']['english'] = $("#eng_course_name").val();
    input['information']['professor'] = $("#professor").val();
    input['information']['grade'] = $("#grade").val();
    input['information']['credit'] = parseInt($("#credit").val());
    input['information']['hour'] = parseInt($("#hour").val());
    input['information']['maxStudents'] = parseInt($("#max_students").val());
    input['information']['minStudents'] = parseInt($("#min_students").val());
    input['information']['facultyName'] = $("#faculty_name").val();
    input['information']['internship'] = ($("#internship").val());
    input['information']['category'] = $("#category").val();
    input['information']['duration'] = $("#duration").val();
    if ($("#schedule").val() == null) {
        window.alert("請確認輸入!!");
        return;
    }
    else {
        input['schedule'] = $("#schedule").val().map(Number);
    }
    input['information']['classroom'] = string2array($("#classroom").val());
    input['information']['mainField'] = $("#main_field").val();
    input['information']['subField'] = $("#sub_field").val();
    input['information']['description'] = $("#description").val();
    input['information']['coProfessors'] = string2array($("#co_professors").val());

    input['guideline']['objective']['chinese'] = $("#chi_objective").val();
    input['guideline']['objective']['english'] = $("#eng_objective").val();
    input['guideline']['preCourse']['chinese'] = $("#chi_pre_course").val();
    input['guideline']['preCourse']['english'] = $("#eng_pre_course").val();
    input['guideline']['outline']['chinese'] = $("#chi_outline").val();
    input['guideline']['outline']['english'] = $("#eng_outline").val();
    input['guideline']['teachingMethod']['chinese'] = $("#chi_teaching_method").val();
    input['guideline']['teachingMethod']['english'] = $("#eng_teaching_method").val();
    input['guideline']['reference']['chinese'] = $("#chi_reference").val();
    input['guideline']['reference']['english'] = $("#eng_reference").val();
    input['guideline']['syllabus']['chinese'] = $("#chi_syllabus").val();
    input['guideline']['syllabus']['english'] = $("#eng_syllabus").val();
    input['guideline']['evaluation']['chinese'] = $("#chi_evaluation").val();
    input['guideline']['evaluation']['english'] = $("#eng_evaluation").val();
    if (checkData() == true) {
        $('#trigger_modal').trigger('click');
    }
    else {
        window.alert("請確認輸入!!");
        return;
    }
    // output for user check
    setData("#out_year_semester", input['information']['yearSemester']);
    setData("#out_eng_course_name", input['information']['name']['english']);
    setData("#out_chi_course_name", input['information']['name']['chinese']);
    setData("#out_course_id", input['information']['id']);
    setData("#out_faculty_name", input['information']['facultyName']);
    setData("#out_professor", input['information']['professor']);
    setData("#out_grade", input['information']['grade']);
    setData("#out_credit", input['information']['credit']);
    setData("#out_hour", input['information']['hour']);
    setData("#out_max_students", input['information']['maxStudents']);
    setData("#out_min_students", input['information']['minStudents']);
    setData("#out_students", input['information']['students'] + "人 (此人數為最近一次查詢時人數)");
    setData("#out_internship", input['information']['internship'])
    setData("#out_category", input['information']['category']);
    setData("#out_duration", input['information']['duration']);
    setData("#out_class_schedule", input['information']['schedule']);
    setData("#out_classroom", input['information']['classroom']);
    setData("#out_main_field", input['information']['mainField']);
    setData("#out_sub_field", input['information']['subField']);
    setData("#out_description", input['information']['description']);
    // co_professors
    var co_professors_content = "";
    for (let i = 0; i < input['information']['coProfessors'].length; i++) {
        co_professors_content += input['information']['coProfessors'][i];
        if (i != input['information']['coProfessors'].length - 1) {
            co_professors_content += ",";
        }
    }
    setData("#out_co_professors", co_professors_content);
    // guideline
    setData("#out_chi_objective", input['guideline']['objective']['chinese']);
    setData("#out_eng_objective", input['guideline']['objective']['english']);
    setData("#out_chi_pre_course", input['guideline']['preCourse']['chinese']);
    setData("#out_eng_pre_course", input['guideline']['preCourse']['english']);
    setData("#out_chi_outline", input['guideline']['outline']['chinese']);
    setData("#out_eng_outline", input['guideline']['outline']['english']);
    setData("#out_chi_teaching_method", input['guideline']['teachingMethod']['chinese']);
    setData("#out_eng_teaching_method", input['guideline']['teachingMethod']['english']);
    setData("#out_chi_reference", input['guideline']['reference']['chinese']);
    setData("#out_eng_reference", input['guideline']['reference']['english']);
    setData("#out_chi_syllabus", input['guideline']['syllabus']['chinese']);
    setData("#out_eng_syllabus", input['guideline']['syllabus']['english']);
    setData("#out_chi_evaluation", input['guideline']['evaluation']['chinese']);
    setData("#out_eng_evaluation", input['guideline']['evaluation']['english']);
}

// check input data
function checkData() {
    // check required
    if ($("#year_semester").val() == "") return false;
    if ($("#course_id").val() == "") return false;
    if ($("#chi_course_name").val() == "") return false;
    if ($("#eng_course_name").val() == "") return false;
    if ($("#professor").val() == "") return false;
    if ($("#grade").val() == "") return false;
    if ($("#credit").val() == "") return false;
    if ($("#hour").val() == "") return false;
    if ($("#max_students").val() == "") return false;
    if ($("#min_students").val() == "") return false;
    if ($("#faculty_name").val() == "") return false;
    if ($("#internship").val() == "") return false;
    if ($("#category").val() == "") return false;
    if ($("#duration").val() == "") return false;
    if ($("#schedule").val() == "") return false;
    if ($("#classroom").val() == "") return false;
    if ($("#main_field").val() == "") return false;
    if ($("#sub_field").val() == "") return false;

    // each check
    if (isNaN($("#year_semester").val()) || $("#year_semester").val() > 1500 || $("#year_semester").val() < 1000) return false;
    if (isNaN($("#max_students").val()) || $("#max_students").val() < 0) return false;
    if (isNaN($("#min_students").val()) || $("#min_students").val() < 0) return false;
    return true;
}

// send all data to DB
function sendData() {
    // send data
    if (location.search == "") { // add a course
        fetch('http://localhost:8080/api', {
            method: 'post',
            body: JSON.stringify(input)
        }).then(function() {
            window.alert("新增課程成功")
            $(location).attr('href', 'index.html')
        })
    }
    else { // change a course
        fetch('http://localhost:8080/api', {
            method: 'put',
            body: JSON.stringify(input)
        }).then(function() {
            window.alert("新增課程成功")
            $(location).attr('href', 'index.html')
        })
    }
};