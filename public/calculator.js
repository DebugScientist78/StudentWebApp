function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
  console.log("Hi");
}

function addMoreRow() {
  var table = document.getElementById("calculatorTable");

  var totalRows= table.rows.length;

  var row = table.insertRow(totalRows-2);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  cell1.innerHTML = '<input type="text" name="Weight" size="30">';
  cell2.innerHTML = '<input type="text" name="Weight" size="30">';
}

function removeRow() {
  var table = document.getElementById("calculatorTable");

  var totalRows= table.rows.length;

  if(totalRows > 3) {
    var row = table.deleteRow(totalRows-3);
  }
}

function calculate() {

  var errorMessage = document.getElementById("errorMessage");
  errorMessage.innerHTML = "";

  var table = document.getElementById("calculatorTable");
  var currentAverageText = document.getElementById("currentAverageText");
  var bestAverageText = document.getElementById("bestAverageText");
  var worstAverageText = document.getElementById("worstAverageText");

  var totalRows = table.rows.length;

  var totalWeight = 0;
  var missingWeight = 0;
  var totalMark = 0;
  var bestCase = 0;
  var worstCase = 0;
  var currentAverage = 0;
  var multiplierFactor = 0;

  var markInfo = "";
  var weightInfo = "";

  for(var i = 1; i < totalRows-2; i++) {
    if(table.rows[i].cells[1].firstChild.value == "") {
      table.rows[i].cells[1].firstChild.value = 0;
    }

    if(table.rows[i].cells[0].firstChild.value == "") {
      table.rows[i].cells[0].firstChild.value = 0;
    }

    if(!Number.isFinite(parseInt(table.rows[i].cells[1].firstChild.value))) {
      errorMessage.innerHTML = "Error: Can't input symbols.";
    }
    if(!Number.isFinite(parseInt(table.rows[i].cells[0].firstChild.value))) {
      errorMessage.innerHTML = "Error: Can't input symbols and letters.";
    }
  }



  for(var i = 1; i < totalRows-2; i++) {
    totalWeight += parseInt(table.rows[i].cells[1].firstChild.value);
  }

  try {
    if(totalWeight > 100) {
      throw weightError();
    }
  } catch(err) {
    
    if(err.name == "WeightError") {
      errorMessage.innerHTML = "Error: You can't have a weight of more than 100%.";
    }

    return;
  }

  missingWeight = 100 - totalWeight;
  multiplierFactor = 100 / totalWeight;

  for(var i = 1; i < totalRows-2; i++) {
    markInfo += table.rows[i].cells[0].firstChild.value + ',';
    weightInfo += table.rows[i].cells[1].firstChild.value + ',';
    totalMark += parseInt(table.rows[i].cells[0].firstChild.value) * parseInt(table.rows[i].cells[1].firstChild.value) * 0.01;
  }

  markInfo = markInfo.slice(0, -1)
  weightInfo = weightInfo.slice(0, -1)



  for(var i = 1; i < totalRows-2; i++) {
    currentAverage += parseInt(table.rows[i].cells[0].firstChild.value) * parseInt(table.rows[i].cells[1].firstChild.value) * multiplierFactor * 0.01;
  }

  worstCase = totalMark;
  bestCase = totalMark + missingWeight;

  currentAverageText.innerHTML = "Current Average: " + currentAverage.toFixed(2);
  bestAverageText.innerHTML = "Best Case Scenario Average: " + bestCase.toFixed(2);
  worstAverageText.innerHTML = "Worst Case Scenario Average: " + worstCase.toFixed(2);

  console.log(markInfo);
  console.log(weightInfo);

  setCookie("markCookie", markInfo, 365);
  setCookie("weightCookie", weightInfo, 365);
}

function weightError() {
  var error = new Error("Weight above 100%");
  error.name = "WeightError";
  return error;
}

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

function checkCookie() {
  var markCookie = getCookie("markCookie");
  var weightCookie = getCookie("weightCookie");

  if (markCookie != "") {
    var marks = markCookie.split(",");
    var marksLength = marks.length;
    while(marksLength > document.getElementById("calculatorTable").rows.length - 3) {
      addMoreRow();
    }

    while(marksLength < document.getElementById("calculatorTable").rows.length - 3) {
      removeRow();
    }

    for(var i = 1; i < document.getElementById("calculatorTable").rows.length - 2; i++) {
      document.getElementById("calculatorTable").rows[i].cells[0].firstChild.value = marks[i-1];
    }
  }

  if (weightCookie != "") {
    var weights = weightCookie.split(",");
    var weightsLength = weights.length;
    while(weightsLength > document.getElementById("calculatorTable").rows.length - 3) {
      addMoreRow();
    }
    for(var i = 1; i < document.getElementById("calculatorTable").rows.length - 2; i++) {
      document.getElementById("calculatorTable").rows[i].cells[1].firstChild.value = weights[i-1];
    }
  }
}