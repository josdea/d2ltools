var app = angular.module('surfacearea', []);
app.controller('myCtrl', function($scope) {
 $scope.appTitle = "XML Objectives Generator for D2L Brightspace";
  $scope.directions = "Objectives are separated by new lines. The name, optional description, and optional identifier are separted by tabs. For the best results copy directly from MS Excel (without headers)."
  $scope.zipdirections = "Zip the files together. Do not rename the files, the competency file is referenced in the manifest file. The zip file can be called anything. Import into a D2L course. Warning: if you download more than once then windows will automatically add a number to the end of the file name.";
  $scope.list = ['Objective 1 name\tdescription 1\toptional identifier 1', 'Objective 2 name\tdescription 2\toptional identifier 2'];
  $scope.objective = {
    objectiveStart: '<CompetencyObject xsi:type="Objective">',
    objectiveEnd: '</CompetencyObject>',
    nameStart: '<name>',
    nameEnd: '</name>',
    descriptionStart: '<description>',
    descriptionEnd: '</description>',
    descriptionIsHTML: '<description_is_html>true</description_is_html>',
    additionalIdStart: '<additional_identifier>',
    additionalIdEnd: '</additional_identifier>',
    theRestofit: `<cross_ou_eval_methodid>2</cross_ou_eval_methodid>
        <ready_for_evaluation>true</ready_for_evaluation>
        <enforce_evaluation_method>0</enforce_evaluation_method>`
  };
  $scope.xml = {
    header: '<?xml version="1.0" encoding="utf-8"?><competency_objects xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">',
    footer: "</competency_objects>",
   };
 
 })
 .filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    });


function selectText(xmlOutput) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(xmlOutput));
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(xmlOutput));
    window.getSelection().addRange(range);
  }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

document.getElementById("dwn-btn-xml").addEventListener("click", function() {
  var text = document.getElementById("xmlOutput").textContent;
  var filename = "competency_d2l_1.xml";
  var manifestfile = "imsmanifest.xml";

  download(filename, text);
  download(manifestfile, '<?xml version="1.0" encoding="UTF-8"?><manifest identifier="D2L_6502998" xmlns:d2l_2p0="http://desire2learn.com/xsd/d2lcp_v2p0" xmlns:scorm_1p2="http://www.adlnet.org/xsd/adlcp_rootv1p2" xmlns="http://www.imsglobal.org/xsd/imscp_v1p1">    <resources><resource identifier="res_competency_1" type="webcontent" d2l_2p0:material_type="d2lcompetency" d2l_2p0:link_target="" href="competency_d2l_1.xml" title="" /></resources></manifest>');
}, false);