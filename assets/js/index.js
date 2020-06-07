var query = [
    'id',
    'name',
    'facultyName',
    'professor',
    'schedule',
    'mainField',
    'subField',
    'classroom',
    'grade',
    'category',
    'description'
];

function set_data(query, value) {
    var result = '';

    if (value) {
        if (query == 'schedule' || query == 'classroom') {
            result += query + ':' + '["' + value.join('","') + '"]' + ',';
        }
        else {
            result += query + ':' + '"' + value + '"' + ',';
        }
    }

    return result;
}

function search() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var query_str = '';
    for (i = 0; i < query.length; i++) {
        query_str += set_data(query[i], $('#' + query[i]).val());
    }

    var graphql_body = JSON.stringify({
        query: "{courses(filter: {" + query_str + "}){information{id mainField grade name{chinese}}}}",
        variables: {}
    });

    fetch('https://course-information-system.herokuapp.com/graphql', {
        method: 'post',
        headers: headers,
        body: graphql_body,
        redirect: "follow"
    }).then(
        response => response.text()
    ).then(
        result => JSON.parse(result)['data']['courses']
    ).then(function(courses_info) {
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
                                "<p>" + courses_info[j]["information"]["mainField"] + "</p>" +
                                "<h2>" + courses_info[j]["information"]["name"]["chinese"] + "</h2>" +
                            "</header>" +
                            "<footer class='align-center'>" +
                                "<a href='course.html?id=" + courses_info[j]["information"]["id"] + "&grade=" + courses_info[j]["information"]["grade"] + "' class='button alt' id = 'accordionExample'>詳細資訊</a>" +
                            "</footer>" +
                        "</div>" +
                    "</div>" +
                "</div>"
            );
        }
    }).catch(
        error => console.log(error)
    )
}

function search_course() {
    search();
    $('html,body').animate({
        scrollTop: $('#search_results').offset().top
    }, 800);
}

$(function() {
    $('#click_search').click(search_course);

    for (i = 0; i < query.length; i++) {
        $('#' + query[i]).keypress(function(e) {
            var key = e.which;
            if (key == 13) search_course();
        });
    }
});