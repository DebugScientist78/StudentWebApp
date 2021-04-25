var currentDueDate = '';
var Task = [];
var currentTaskNum = 0;
var rawTxt = '';
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


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
            initialView: 'dayGridMonth',
            dateClick: function(info) {
                console.log(info.dateStr);
                currentDueDate = info.dateStr;

                console.log($("#TaskName").val());
            },
            selectable: true
        });
        calendar.render();
    }

    $("#SchedularSubmit").on("click", function() {
        console.log(currentDueDate);
        if (currentDueDate == '' || $("TaskName").val() == '') {
            alert("Please select a date first or provide a name");
        } else {
            let tempStr = currentDueDate.substring(6,8);
            let monthTxt = months[parseInt(tempStr)-1];
            tempStr = monthTxt + ' ' + parseInt(currentDueDate.substring(8,10)) + ', ' + currentDueDate.substring(0,4);
            let type = $("#TaskType").val();
            currentTaskNum += 1;
            taskObj = '';
            if (type == "Homework") {
                taskObj = currentTaskNum + ". Your " + $("#TaskName").val() + " homework is to be completed by: " + tempStr;
            } else if (type == "Test") {
                taskObj = currentTaskNum + ". Your " + $("#TaskName").val() + " test is on: " + tempStr;
            } else {
                taskObj = currentTaskNum + ". Your " + $("#TaskName").val() + " assignemnt is due: " + tempStr;
            }
                if (currentTaskNum == 1) $("#ListText").text(taskObj);
            else {
                $("#para").append(
                    "<p class='card-text'>" + taskObj +"</p>"
                    );
            }
        }
        
    });
});