/*
this js is used to get course's all information by the course_id and grade(gived by the front page)and put data in web
*/

// check if there is data and set data in web
function setData(id, value) {
    $(id).text((value == null ? '' : value))
}

// get information from database and display on web
$(document).ready(function () {
    // if no id and grade input, back to index
    if (location.search == '') {
        $(location).attr('href', 'index.html');
    }
    // process input from url
    var search_str = location.search.substr(1);
    var search_array = search_str.split('&');
    var search_array0 = search_array[0].split('=');
    var search_array1 = search_array[1].split('=');
    var id = search_array0[1];
    var grade = search_array1[1];

    var headers = new Headers();
    headers.append('Content-Type', 'application/json')

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
        // set course data into web page
        setData("#course_name_en", course['information']['name']['english']);
        setData("#course_name_ch", course['information']['name']['chinese']);
        // basic_info
        setData("#course_id", course['information']['id']);
        setData("#faculty_name", course['information']['facultName']);
        setData("#professor", course['information']['professor']);
        setData("#grade", course['information']['grade']);
        setData("#credit", course['information']['credit']);
        setData("#hour", course['information']['hour']);
        setData("#max_students", course['information']['maxStudents']);
        setData("#min_students", course['information']['minStudents']);
        setData("#students", course['information']['students'] + "人 (此人數為最近一次查詢時人數)");
        setData('#internship', course['information']['internship']);
        setData("#category", course['information']['category']);
        setData("#duration", course['information']['duration']);
        // schedule
        var schedule_content = "";
        for (let i = 0; i < course['information']['schedule'].length; i++) {
            schedule_content += course['information']['schedule'][i];

            if (i != course['information']['schedule'].length - 1) {
                schedule_content += ",";
            }
        }
        setData("#class_schedule", schedule_content);
        // classroom
        var classroom_content = "";
        for (let i = 0; i < course['information']['classroom'].length; i++) {
            classroom_content += course['information']['classroom'][i];
            if (i != course['information']['classroom'].length - 1) {
                classroom_content += ",";
            }
        }
        setData("#classroom", classroom_content);

        setData("#main_field", course['information']['mainField']);
        setData("#sub_field", course['information']['subField']);
        setData("#description", course['information']['description']);
        // co_professors
        var co_professors_content = "";
        for (let i = 0; i < course['information']['coProfessors'].length; i++) {
            co_professors_content += course['information']['coProfessors'][i];
            if (i != course['information']['coProfessors'].length - 1) {
                co_professors_content += ",";
            }
        }
        setData("#co_professors", co_professors_content);
        // syllabus
        setData("#chi_objective", course['guideline']['objective']['chinese']);
        setData("#eng_objective", course['guideline']['objective']['englise']);
        setData("#chi_pre_course", course['guideline']['preCourse']['chinese']);
        setData("#eng_pre_course", course['guideline']['preCourse']['englise']);
        setData("#chi_outline", course['guideline']['outline']['chinese']);
        setData("#eng_outline", course['guideline']['outline']['englise']);
        setData("#chi_teaching_method", course['guideline']['teachingMethod']['chinese']);
        setData("#eng_teaching_method", course['guideline']['teachingMethod']['englise']);
        setData("#chi_reference", course['guideline']['reference']['chinese']);
        setData("#eng_reference", course['guideline']['reference']['englise']);
        setData("#chi_syllabus", course['guideline']['syllabus']['chinese']);
        setData("#eng_syllabus", course['guideline']['syllabus']['englise']);
        setData("#chi_evaluation", course['guideline']['evaluation']['chinese']);
        setData("#eng_evaluation", course['guideline']['evaluation']['englise']);
    }).catch(
        error => console.log(error)
    )
});

// button link to change this course page
// $("#change").click(function () {
//     $(location).attr("href", "new.html?course_id=" + course_id + "&grade=" + grade);
// });

// function for delete this course
// $("#delete").click(function () {
//     if (window.confirm("真的要刪除本課程ㄇ?")) {
//         $.ajax({
//             url: "https://cis.ntouo.tw/api/course/" + course_id + "/" + grade,
//             type: "DELETE",
//             async: false,
//             success: function () {
//                 window.alert("課程刪除成功");
//                 location.href = 'index.html';
//             }
//         })
//     }
//     else {
//         return;
//     }
// });