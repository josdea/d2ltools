
var daystouse = [];

var getDateArray = function (start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push((new Date(dt)).toString().substring(0, 15));

        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}


var prepareDateArray = function (dtArr) {
    var arr = new Array();
    for (var i = 0; i < dtArr.length; i++) {
        arr.push((new Date(dtArr[i])).toString().substring(0, 15));
    }
    return arr;
}


var getWorkingDateArray = function (dates, hoildayDates, workingWeekendDates) {


    var arr = dates.filter(function (dt) {
        return holidaysArray.indexOf(dt) < 0;
    });

    // console.log('arr after first filter is ' +arr);


var result2 = [];

arr.forEach(function (dt){
    // console.log('dt is ' + dt);
    daystouse.forEach(function (element) {
        // console.log('element is ' + dt);

        if (dt.indexOf(element) > -1) {
            // console.log('in the first if ' + element);
            // console.log ('dt in if is ' + dt);
            // if (workingWeekendDates.indexOf(dt) > -1) {
                result2.push(dt);    
            // return dt;
            // }
        }
        else {
            // return dt;
        }

    });

});

    // console.log('result after second filter is ' + result2);

    return result2;

}


function dateprompt(type) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = yyyy + '-' + mm + '-' + dd;



    var thedate = prompt("Please enter your " + type + " (yyyy-mm-dd)", today);
    if (thedate == null || thedate == "") {
        thedate = "2010-01-01";
    }
    return thedate;
}


function daysprompt() {
    var alldays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var daystouse = [];

    alldays.forEach(function (element) {
        var r = confirm("Do you want the following day included: " + element);
        if (r == true) {
            // console.log('day added');
            daystouse.push(element);
        } else {
            // console.log('day NOT added');
        }


    });

    return daystouse;
}


if (typeof startDate === "undefined") {

    var startDate = new Date(dateprompt("START date"))
}
if (typeof endDate === "undefined") {
    var endDate = new Date(dateprompt("END date"));
}

daystouse = daysprompt();

var officalHolidays = [];
var workingWeekends = [];


var dateArray = getDateArray(startDate, endDate);


var holidaysArray = prepareDateArray(officalHolidays);


var workingWeekendsArray = prepareDateArray(workingWeekends);


var workingDateArray = getWorkingDateArray(dateArray, holidaysArray, workingWeekendsArray);







function getsessions(fields) {
    var sessionnames = [];
    for (var i = 0; i < fields.length; i++) {
        sessionnames.push(fields[i].name);
    }

    return sessionnames;
}



function changesessions(fields, dates) {
    var currentdate = '';
    for (var i = 0; i < fields.length; i++) {
        currentdate = (i < dates.length ? dates[i] : '');
        $("input[name='" + fields[i] + "']").val(currentdate);
    }

}


var fieldnames = getsessions($("input[name*='name_']"));

alert("Total Sessions Required: " + workingDateArray.length + ". You need to add " + (workingDateArray.length-fieldnames.length) + " more sessions.");


changesessions(fieldnames, workingDateArray);


