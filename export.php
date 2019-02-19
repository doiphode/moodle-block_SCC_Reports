<?php
    
   require_once(dirname(dirname(__FILE__)).'../../config.php');
    
    global $CFG, $SESSION, $DB,$COURSE;
    require_once("{$CFG->libdir}/completionlib.php");
    require_once($CFG->dirroot.'/lib/excellib.class.php');
    
    
    $filename = clean_filename( 'Activity_completion_'.date("d-m-y h:i:s").'.xls');

    $workbook = new MoodleExcelWorkbook('-');
    $workbook->send($filename);
    $worksheet = array();
    $worksheet[0] = $workbook->add_worksheet('');
    
    $COURSE = $_REQUEST['cid'];
   $col = 0;

    $fields = array('Course Name','Activity Name','Activity Type','Total Enrolled','Total Completed', 'Activity Completion');
    foreach ($fields as $fieldname) {
        $worksheet[0]->write(0, $col, $fieldname);
        $col++;
    }
    $row = 1;
    $col = 0;
    $sql = 'select id from {enrol} where courseid = '.$COURSE .' and enrol= "manual"';
     
    
    $enrol = $DB->get_record_sql($sql);
    

    if(isset($enrol->id) && $enrol->id != ""){

      $sql = 'select shortname from {course} where id = '.$COURSE;
            $name = $DB->get_record_sql($sql);  
     $sql = 'select userid from {user_enrolments} where enrolid ='.$enrol->id;
   
    $enrolleduserlist = $DB->get_records_sql($sql);

     $enrolled_count = count($enrolleduserlist);
        $userlist = '(';
        if(count($enrolleduserlist) > 0 ){
            foreach($enrolleduserlist as $key =>$user){
                $userlist .= $user->userid  .',';


            }
            $userlist = rtrim($userlist,',');
            $userlist .= ')';
        }
        $sql = 'select id from {modules} where name in ("assign","assignment","choice","feedback","imscp","lesson","quiz","scorm","workshop","survey")';
        $modules = $DB->get_records_sql($sql);
        $instr = "(";
        foreach($modules as $key => $module ){
            $instr .= $module->id .",";
        }
        $instr = trim($instr,',');
        $instr .= ")";

        $sql = 'select id,module, instance from {course_modules} where course = '.$COURSE. ' and module in  '.$instr;
       
        $allmodules = $DB->get_records_sql($sql);

        $sql = "select * from {completion_report} where courseid = ".$COURSE;
        $saved = $DB->get_record_sql($sql);
        $datastr = "";
        $coursecomp = 0;
         if(isset($saved->id) && $saved->id  >0 ){
                

                $cmid_selected = urldecode($saved->cmid_selected);
                $cmid_array = json_decode($cmid_selected);
                 

                $coursecomp = $saved->coursecomp_selected;
                


            }


         $activity_completion = array();/* contains % completion with cmid as keys */
        foreach($allmodules as $key => $module){

            $sql = 'select userid,timemodified from {course_modules_completion} where coursemoduleid ='.$module->id.' and timemodified  IS NOT NULL and userid in '.$userlist;

             $act = $DB->get_records_sql($sql);


            $activity_completion[$key] = round((count($act)/$enrolled_count)*100,2);

            $sql = 'select name from {modules} where id ='.$module->module;
            $table = $DB->get_record_sql($sql);
            if(isset($table) && $table->name != ""){

                $sql = 'select name from {'.$table->name.'} where id = '.$module->instance;
                $actname = $DB->get_record_sql($sql);

                if(isset($cmid_array) && count($cmid_array) >  0){
                     if(in_array($key, $cmid_array)){
                
                        $worksheet[0]->write($row, 0, $name->shortname);
                        $worksheet[0]->write($row, 1, $actname->name);
                        $worksheet[0]->write($row, 2, $table->name);
                        $worksheet[0]->write($row, 3, $enrolled_count);
                        $worksheet[0]->write($row, 4, count($act));
                        $worksheet[0]->write($row, 5, $activity_completion[$key]);

                        $row++;
                    }
                     
                }
                else if(isset($cmid_array) && count($cmid_array) == 0){
                        $worksheet[0]->write($row, 0, $name->shortname);
                        $worksheet[0]->write($row, 1, $actname->name);
                        $worksheet[0]->write($row, 2, $table->name);
                        $worksheet[0]->write($row, 3, $enrolled_count);
                        $worksheet[0]->write($row, 4, count($act));
                        $worksheet[0]->write($row, 5, $activity_completion[$key]);
                         $row++;
                }
            }
           
        }
    }

        
    $workbook->close();
    ?>