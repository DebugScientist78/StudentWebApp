

jQuery(function() {
    $("#buttonSchedular").on("click", function() {
        console.log("schedular");
    });

    var localPath = window.location.pathname;
    if (localPath == "/schedule") {
        //generate calender
        console.log("MAKE CALENDER");
        var calendarID = document.getElementById("calendar");
        var calendar = new FullCalendar.Calendar(calendarID,{
            initialView: 'dayGridMonth'
        });
        calendar.render();
    }
});