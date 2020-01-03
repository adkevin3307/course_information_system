var day = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
var time = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'];

$(function() {
    var selection_option = '';
    for (i = 0; i < day.length; i++) {
        selection_option += '<optgroup label="' + day[i] + '">';
        for (j = 0; j < time.length; j++) {
            var temp = (i + 1) + time[j];
            selection_option += '<option value="' + temp + '" title="' + temp + '">' + time[j] + '</option>';
        }
        selection_option += '</optgroup>';
    }
    $('#schedule').append(selection_option);
});