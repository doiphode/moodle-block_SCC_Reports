<?php


require_once(dirname(dirname(__FILE__)).'../../config.php');

global $CFG, $DB, $OUTPUT, $USER,$COURSE;

$timestamp = time();

$courseid= $_POST['courseid'];
$coursecomp_selected= $_POST['coursecomp'];
$cmid_selected= urlencode($_POST['cmid_encoded']);



$appealcount = 'select count(*) as course_exist from {completion_report} WHERE courseid='.$courseid;
$appcount = $DB->get_record_sql($appealcount);

if($appcount ->course_exist >0){

    $completion_report = 'UPDATE {completion_report} SET cmid_selected="' . $cmid_selected . '", timestamp = ' . $timestamp . ' , coursecomp_selected= '.$coursecomp_selected.'   where  courseid = ' . $courseid;


}else {

      $completion_report = 'INSERT INTO  {completion_report} (courseid, cmid_selected, coursecomp_selected, timestamp) VALUES ('.$courseid.' , "' . $cmid_selected . '" , ' . $coursecomp_selected . ' , ' . $timestamp . ')';
     
   


}

$upsucss = $DB->execute($completion_report);
if($upsucss){
	echo 1;	
}

?>