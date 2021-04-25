var currentDueDate = '';
var Task = [];
var currentTaskNum = 0;
var rawTxt = '';
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
var name = cname + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

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

        //Update
        let taskCookie = getCookie("TaskList");
        if (taskCookie != null) {
            console.log("loaded cookies");
            let loadedTasks = taskCookie.split('/');
            currentTaskNum += 1;
            $("#ListText").text(loadedTasks[0]);
            if (loadedTasks.length > 1) {
                for (let i = 1; i < loadedTasks.length; i++) { 
                    $("#para").append("<p class='card-text'>" + loadedTasks[i] +"</p>");
                }
            }
            Task = loadedTasks;   
        }
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
            Task.push(taskObj);
            if (currentTaskNum == 1) $("#ListText").text(taskObj);
            else {
                $("#para").append(
                    "<p class='card-text'>" + taskObj +"</p>"
                    );
            }

            setCookie("TaskList", Task.join('/'), 365);
            console.log(Task.join('/'));
        }
        

    });
});