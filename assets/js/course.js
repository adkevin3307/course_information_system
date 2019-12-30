/*
this js is used to get course's all information by the course_id and grade(gived by the front page)and put data in web
*/

var course_infos; // store courses information we get from DB
var messages;

// check if there is data and set data in web
function setData(id, value) {
    if(value == null) {
        $(id).text("");
    }
    else {
        $(id).text(value);
    }
}

// get information from database and display on web
$(document).ready(function(){
    // if no id and grade input, back to index
    if(location.search == "") {
        $(location).attr('href', 'index.html');
    }
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
    console.log(typeof course_info);

    // set course data into web page
    setData("#course_name_en", course_info.eng_course_name);
    setData("#course_name_ch", course_info.chi_course_name);
    // basic_info
    setData("#course_id", course_info.course_id);
    setData("#faculty_name", course_info.faculty_name);
    setData("#professor", course_info.professor);
    setData("#grade", course_info.grade);
    setData("#credit", course_info.credit);
    setData("#hour", course_info.hour);
    setData("#max_students", course_info.max_students);
    setData("#min_students", course_info.min_students);
    setData("#students", course_info.students + "人 (此人數為最近一次查詢時人數)");
    if(course_info.internship) {
        $("#internship").text("是");
    }
    else {
        $("#internship").text("否");
    }
    setData("#category", course_info.category);
    setData("#duration", course_info.duration);
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
    setData("#class_schedule", schedule_content);
    setData("#classroom", classroom_content);

    setData("#main_field", course_info.main_field);
    setData("#sub_field", course_info.sub_field);
    setData("#description", course_info.description);
    // co_professors
    var co_professors_content = "";
    for (let i = 0; i < course_info.co_professors.length; i++) {
        co_professors_content += course_info.co_professors[i];
        if (i != course_info.co_professors.length - 1) {
            co_professors_content += ",";
        }
    }
    setData("#co_professors", co_professors_content);

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

    // get message and put in messages
    $.ajax({
        url: "https://cis.ntouo.tw/api/messages/" + course_id,
        type: "GET",
        async: false,
        success: function(response){
            messages = response;
        }
    });

    for(let i = 0; i < messages.length; i++) {
		$('#outputclass').append(
			"<div>"+
				"<div class='box'>"+
					"<div class='content'>"+
						"<header class='align-center'>"+
							"<p>" + messages[i].content + "</p>"+
						"</header>"+
					"</div>"+
				"</div>"+
			"</div>"
		);
	}
});

$("#change").click(function() {
    var search_str = location.search.substr(1);
    var search_array = search_str.split('&');
    var search_array0 = search_array[0].split('=');
    var search_array1 = search_array[1].split('=');
    var course_id = search_array0[1];
    var grade = search_array1[1];
    $(location).attr("href", "new.html?course_id=" + course_id + "&grade=" + grade);
});

$("delete").click(function() {
    var search_str = location.search.substr(1);
    var search_array = search_str.split('&');
    var search_array0 = search_array[0].split('=');
    var search_array1 = search_array[1].split('=');
    var course_id = search_array0[1];
    var grade = search_array1[1];

    $.ajax({
        url: "https://cis.ntouo.tw/api/course",
        type: "DELETE",
        success: function() {
            
        }
    })
});