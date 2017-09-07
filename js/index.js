
var app = angular.module('bulkenroll', []);
app.controller('myCtrl', function ($scope) {
  $scope.appTitle = "Brightspace D2L Bulk Tools Generator";
  $scope.courseIds = ['12345.201720', '54321.201720']
  $scope.role = "Banner-Student";
  $scope.enroll = {
    a: 'ENROLL',
    b: 'UNENROLL'
  };
  $scope.userOb = {
    username: ['dvader', 'fsnowman', 'myoda'],
    idnum: ['p12345', 'p54321', 'p01010']
  };
  $scope.enrollString = [];
  $scope.enrollOutputFunction = function () {

    $scope.courseIds.forEach(function (value2, index2) {
      $scope.userOb.username.forEach(function (value, index) {
        $scope.enrollString.push($scope.enroll.a
          + ','
          + value
          + ','
          + $scope.userOb.idnum[index]
          + ','
          + $scope.role
          + ','
          + value2 + " ");

      });

    });
    return $scope.enrollString;
  };
});

// function selectText(enrollOutput) {
//   if (document.selection) {
//     var range = document.body.createTextRange();
//     range.moveToElementText(document.getElementById(enrollOutput));
//     range.select();
//   } else if (window.getSelection) {
//     var range = document.createRange();
//     range.selectNode(document.getElementById(enrollOutput));
//     window.getSelection().addRange(range);
//   }
// }

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.
document.getElementById("dwn-enroll-csv").addEventListener("click", function () {
  let text = document.getElementById("enrollOutput").textContent;
  // alert(text);
  let d = new Date();
  let filename = "d2l enroll " + d.toDateString() + ".csv";
  download(filename, text);
}, false);

document.getElementById("dwn-unenroll-csv").addEventListener("click", function () {
  let text = document.getElementById("unenrollOutput").textContent;
  let d = new Date();
  let filename = "d2l unenroll " + d.toDateString() + ".csv";
  download(filename, text);
}, false);