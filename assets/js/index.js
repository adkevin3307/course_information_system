var query = [
    'course_id',
    'course_name',
    'faculty_name',
    'professor',
    'schedule',
    'main_field',
    'sub_field',
    'classroom',
    'grade',
    'category',
    'description'
];

function append_url(query, value) {
    return (value ? (query + '=' + value + '&') : '');
}

function search() {
    var courses_info;
    var url_str = 'https://cis.ntouo.tw/api/courses?';

    for (i = 0; i < query.length; i++) {
        url_str += append_url(query[i], $('#' + query[i]).val());
    }

    $.ajax({
        url: url_str,
        type: "GET",
        async: false,
        success: function(response) {
            courses_info = response;
        }
    });

    $('#search_title').empty();
    $('#search_title').append(
        '<section id="two" class="wrapper style3">' +
            '<div class="inner">' +
                '<header class="align-center">' +
                    '<h2>搜尋結果</h2>' +
                '</header>' +
            '</div>' +
        '</section>'
    );

    $('#search_results').empty();
    if (courses_info.length != 0) {
        $('#search_results').append(
            "<section id='one' class='wrapper style2'>" +
                    "<div class='inner'>" +
                        "<div id = 'outputclass' class='grid-style'>" +
                        "</div>" +
                    "</div>" +
            "</section>"
        );
    }

    $('#outputclass').empty();
    for(j = 0; j < courses_info.length; j++) {
        $('#outputclass').append(
            "<div>" +
                "<div class='box'>" +
                    "<div class='content'>" +
                        "<header class='align-center'>" +
                            "<p>" + courses_info[j].main_field + "</p>" +
                            "<h2>" + courses_info[j].chi_course_name + "</h2>" +
                        "</header>" +
                        "<footer class='align-center'>" +
                            "<a href='generic.html?course_id=" + courses_info[j].course_id + "&grade=" + courses_info[j].grade + "' class='button alt' id = 'accordionExample'>詳細資訊</a>" +
                        "</footer>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );
    }
}

function search_course() {
    search();
    $('html,body').animate({
        scrollTop: $('#search_results').offset().top
    }, 800);
}

function parse_add_schedule() {
    var day = $('.day').val();
    var time = $('.time').val();
    if (day != null && time != null) {
        if ($('#schedule').val()) $('#schedule').val($('#schedule').val() + ',' + day + time);
        else $('#schedule').val(day + time);
    }
}

$(function() {
    $('#click_search').click(search_course);

    for (i = 0; i < query.length; i++) {
        $('#' + query[i]).keypress(function(e) {
            var key = e.which;
            if (key == 13) search_course();
        });
    }

    $('#add_schedule').click(parse_add_schedule);

    $('.day, .time').keypress(function(e) {
        var key = e.which;
        if (key == 13) parse_add_schedule();
    });
});