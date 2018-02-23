/**
 * this will return an array containing all the
 * dates between start date and an end date
 */
var getDateArray = function(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push((new Date(dt)).toString().substring(0,15)); //save only the Day MMM DD YYYY part
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

/**
 * this will prepare a date array
 */
var prepareDateArray = function(dtArr) {
    var arr = new Array();
    for (var i = 0; i < dtArr.length; i++) {
        arr.push((new Date(dtArr[i])).toString().substring(0,15)); //save only the Day MMM DD YYYY part
    }
    return arr;
}

/**
 * this will return an array consisting of the
 * working dates
 */
var getWorkingDateArray = function(dates, hoildayDates, workingWeekendDates) {
    
    // remove holidays
    var arr = dates.filter(function(dt){
        return holidaysArray.indexOf(dt) < 0;
    });

    // remove weekend dates that are not working dates
  // add for tues thurs only  || dt.indexOf("Mon") > -1 || dt.indexOf("Wed") > -1 || dt.indexOf("Fri") > -1
    var result = arr.filter(function(dt){
        if (dt.indexOf("Sat") > -1 || dt.indexOf("Sun") > -1) {
            if (workingWeekendDates.indexOf(dt) > -1) {
                return dt;
            }
        }
        else {
            return dt;
        }
    });
    
    return result;

}

//get start date
function dateprompt(type) {
  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = yyyy+'-'+mm+'-'+dd;
  
    var thedate = prompt("Please enter your " + type + " (yyyy-mm-dd)", today);
    if (thedate == null || thedate == "") {
      thedate = "2010-01-01";
    }
  return thedate;
}

// start and end dates
//var startDate = new Date("2017-10-01"); //YYYY-MM-DD
//var endDate = new Date("2017-10-14"); //YYYY-MM-DD

var startDate = new Date(dateprompt("start date")) //YYYY-MM-DD
var endDate = new Date(dateprompt("end date")); //YYYY-MM-DD

/***
 * holidays and working weekends
 *
 * if not applicable then set it as an empty array
 * example: if no offical holidays then set
 * officalHolidays = []
 * similarly, if no working weekends then set
 * workingWeekends = []
 */
var officalHolidays = []; //YYYY-MM-DD
var workingWeekends = []; //YYYY-MM-DD

// compute date array between start and end dates
var dateArray = getDateArray(startDate, endDate);

// prepare the holidays array
var holidaysArray = prepareDateArray(officalHolidays);

// prepare the working weekends array
var workingWeekendsArray = prepareDateArray(workingWeekends);

// get the working days array
var workingDateArray = getWorkingDateArray(dateArray, holidaysArray, workingWeekendsArray);

// output
//console.log(workingDateArray);
alert("Sessions Required: "+ workingDateArray.length);



function getsessions(fields) {
  var sessionnames = [];
  for (var i = 0; i < fields.length; i++) {
    sessionnames.push(fields[i].name);
  }
  
  return sessionnames;
}



function changesessions(fields, dates){
  var currentdate = ''; 
  for (var i = 0; i < fields.length; i++) {
     currentdate = (i < dates.length ? dates[i] :'');
   $( "input[name='"+fields[i]+"']" ).val( currentdate );
  }
  
}

//get field names array
var fieldnames = getsessions($("input[name*='name_']"));


// console.log(fieldnames);
changesessions(fieldnames, workingDateArray);


