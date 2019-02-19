<?php
    require_once(dirname(dirname(__FILE__)).'../../config.php');
    global $PAGE,$CFG, $DB, $OUTPUT;
    require_once($CFG->libdir.'/adminlib.php');

    $PAGE->set_context(context_system::instance());
    $PAGE->set_pagelayout('admin');
    $PAGE->set_title('Activity Completion Reports');
    $PAGE->set_heading( 'Activity Completion Reports');
    // $PAGE->set_url(new moodle_url($CFG->wwwroot .'blocks/configurable_reports/completion_report.php'));
    $PAGE->navbar->ignore_active();

    $PAGE->requires->jquery();

   
     $PAGE->requires->js( new moodle_url($CFG->wwwroot . '/blocks/scc_reports/custom.js'));
    $PAGE->requires->css( new moodle_url('https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css'));

    $PAGE->requires->css( new moodle_url($CFG->wwwroot .'/blocks/scc_reports/style.css'));
    
   
    $context = context_system::instance();
    $roles = get_user_roles($context, $USER->id);
    $currentuserroleid = 5;
    
    
    foreach($roles as $key_roles){
        $currentuserroleid = $key_roles->roleid;
    }

    if(!is_siteadmin() && $currentuserroleid == 5){
        header('Location:'.$CFG->wwwroot.'/my');
    }

    echo $OUTPUT->header();
    if(isset($_REQUEST['cid'])){
         $COURSE  = $_REQUEST['cid'];

    }
      echo "<script src='https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js'></script>";

    if(isset($_POST['courselist']) && $_POST['courselist'] != ""){
        $COURSE  = $_POST['courselist'];
    }
    
    $sql = 'select id, shortname from {course} where id >1';
    $courses = $DB->get_records_sql($sql);
    
    $option = '<option value="">Select a course</option>';


    foreach($courses as $key => $course){
        $option .= '<option value= "'.$course->id.'" '.(isset($COURSE) && $COURSE == $course->id  ? "selected" : "").'>'.$course->shortname.'</option>'; 
    }
    $acthtml= '';
    $coursehtml = '';

    if(isset($COURSE) && $COURSE != ""){

        $sql = 'select id from {enrol} where courseid = '.$COURSE .' and enrol= "manual"';
        $enrol = $DB->get_record_sql($sql);
        if(isset($enrol->id) && $enrol->id != ""){

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
       ;
        $allmodules = $DB->get_records_sql($sql);


         /* check if completion_report table contain this courseid */
       $sql = "select * from {completion_report} where courseid = ".$COURSE;
        $saved = $DB->get_record_sql($sql);
        $datastr = "";
        $coursecomp = 0;
         if(isset($saved->id) && $saved->id  >0 ){
                

                $cmid_selected = urldecode($saved->cmid_selected);
                $cmid_array = json_decode($cmid_selected);
                 

                $coursecomp = $saved->coursecomp_selected;
                


            }

            /*for course completion table */

            $sql = 'select shortname from {course} where id = '.$COURSE;
            $name = $DB->get_record_sql($sql);

            if(isset($_POST['startdate']) && $_POST['startdate'] != ""){

                $start_timestamp = strtotime($_POST['startdate']);
                $end_timestamp = strtotime('+ 7 days', $start_timestamp);

                 $sql = 'select userid, timecompleted from {course_completions} where course ='.$COURSE.' and  timecompleted BETWEEN '.$start_timestamp.' AND '.$end_timestamp.' and  userid in '.$userlist .' and timecompleted IS NOT NULL';
            }
            else{
                $sql = 'select userid, timecompleted from {course_completions} where course ='.$COURSE.'  and  userid in '.$userlist .' and timecompleted IS NOT NULL';
            }
            $course = $DB->get_records_sql($sql);

            $percent_course_comp = round((count($course)/$enrolled_count)*100,2);
            
            // $coursehtml = '<tr>
            //                   <td> '.$name->shortname.'</td> 
            //                   <td>'.$enrolled_count.'</td>
            //                     <td>'.$course->completedcount.'</td>
            //                   <td> '.$percent_course_comp.'% </td>
            //                 </tr>';



       
        $activity_completion = array();/* contains % completion with cmid as keys */

        foreach($allmodules as $key => $module){
            if(isset($_POST['startdate']) && $_POST['startdate'] != ""){

                $start_timestamp = strtotime($_POST['startdate']);
                $end_timestamp = strtotime('+ 7 days', $start_timestamp);
                
                 $sql = 'select userid,timemodified from {course_modules_completion} where coursemoduleid ='.$module->id.' and timemodified BETWEEN '.$start_timestamp.' AND '.$end_timestamp.' and  userid in '.$userlist ;
                        
            }
            else{
                 $sql = 'select userid,timemodified from {course_modules_completion} where coursemoduleid ='.$module->id.' and userid in '.$userlist;

            }
           
            $act = $DB->get_records_sql($sql);


            $activity_completion[$key] = round((count($act)/$enrolled_count)*100,2);
            /* for table  */
            $sql = 'select name from {modules} where id ='.$module->module;
            $table = $DB->get_record_sql($sql);
            if(isset($table) && $table->name != ""){
                $sql = 'select name from {'.$table->name.'} where id = '.$module->instance;
                 $actname = $DB->get_record_sql($sql);

                 if(isset($cmid_array) && count($cmid_array) >  0){
                     if(in_array($key, $cmid_array)){
                        $acthtml .= '<tr> 
                                    <td id="row_'.$key.'">'.$actname->name.'</td>
                                    <td>'.$table->name.'</td>
                                    <td>'.$enrolled_count.'</td>
                                    <td>'.count($act).'</td>
                                    <td>'.$activity_completion[$key].'%</td>
                                </tr>';
                        }
                    }
                    else if(isset($cmid_array) && count($cmid_array) == 0){
                         $acthtml .= '<tr> 
                                    <td id="row_'.$key.'">'.$actname->name.'</td>
                                    <td>'.$table->name.'</td>
                                    <td>'.$enrolled_count.'</td>
                                    <td>'.count($act).'</td>
                                    <td>'.$activity_completion[$key].'%</td>
                                </tr>';
                    }

                        if(isset($cmid_array) && count($cmid_array) == 0){
                            
                                if($coursecomp == 0){


                                    $datastr .='[';
                                     $datastr .= '"'.$actname->name.'"' .',' .$activity_completion[$key].',"'.$activity_completion[$key].'%"';
                                    $datastr .= '],';
                                }
                                else if($coursecomp == 1){
                                     $datastr .='[';
                                     $datastr .= '"'.$actname->name.'",' .$percent_course_comp.',"'.$percent_course_comp.'%" ,'.$activity_completion[$key].' , "'.$activity_completion[$key].'%"';
                                    $datastr .= '],';
                                }

                           

                        }
                        else if(isset($cmid_array) && count($cmid_array) >  0){
                            if(in_array($key, $cmid_array)){
                                if($coursecomp == 0){

                                    $datastr .='[';
                                     $datastr .= '"'.$actname->name.'"' .',' .$activity_completion[$key].',"'.$activity_completion[$key].'%"';
                                    $datastr .= '],';
                                }
                                else if($coursecomp == 1){
                                    $datastr .='[';
                                     $datastr .= '"'.$actname->name.'",' .$percent_course_comp.',"'.$percent_course_comp.'%" ,'.$activity_completion[$key].' , "'.$activity_completion[$key].'%"';
                                    $datastr .= '],';
                                }

                            }
                        }
                        elseif(!isset($cmid_array)){

                             $datastr .='[';
                                     $datastr .= '"'.$actname->name.'"' .',' .$activity_completion[$key].',"'.$activity_completion[$key].'%"';
                                    $datastr .= '],';
                        }


            }
           

        }
        if($coursecomp == 0 ){
            $labelstr = "'Activity Completion' ,{ role: 'annotation' }";

        }
        else if ($coursecomp == 1){
           $labelstr ="'Course Completion',{ role: 'annotation' }, 'Activity Completion',{ role: 'annotation' }";
        }
        $datastr = rtrim($datastr,',');
        
        // echo 'datastr : '.$datastr;

        if(count($allmodules) > 0 && $datastr != ""){
            echo '<script type="text/javascript" src="https://www.google.com/jsapi"></script>';
                       
            echo "
            <script type='text/javascript'>
            google.load('visualization', '1', {packages: ['corechart']});
            google.setOnLoadCallback(drawMaterial);

            function drawMaterial() {
            var data = google.visualization.arrayToDataTable([
                 ['Actname', ".$labelstr."]," .
                    $datastr
               . "
            ]);

            var options = {
                chartArea: {
                  
                  width: '100%',
                  left: 40,
                },
                legend: {
                  position: 'top',
                },
                vAxis:{
                    title: 'Percentage Completion',
                },
                    
                    
                height:500,
                bar: {groupWidth: '50%'}
                    
                    
                }
                    


            var chart = new google.visualization.ColumnChart(document.getElementById('graph'));
            chart.draw(data, options);
            }
            </script>
            ";
        }
    }
    else{
        /* enrol id checked */
        echo "<div style='text-align:center; color:red'>No user Enrolled!</div>";
    }
                

    }
   

?>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
    <div class="container">

        <form id="dateform" method="POST" style="display:none">
            <input name ="startdate" id="startdate" hidden  />
            <input name ="courselist"  id= "courselist" type="text" hidden value="<?php echo isset($COURSE) && $COURSE != "" ?  $COURSE  : '' ?>"/> 

    
         </form>
                
                <div class="row">
                    <div class= "col-md-8">
                        <!-- <form id= "form1" method="POST">
                            <select name= "courselist" id="courselist">
                                <?php echo $option ?>
                            </select>
                        </form> -->
                        <a href="export.php?cid=<?php echo $COURSE ?>"><img id= "printbutton" src="images/excelnew.jpg" style="height:75px; width:149px"/></a>

                    </div>
                    <div class="col-md-4">
                        <div class="row">
                        Week Start From  :&nbsp;<input id="dateselector" value="<?php echo isset($_POST['startdate']) ? $_POST['startdate'] : '' ?>"/>
                         <a  style="color:green;cursor:pointer;" id="clear"> Clear Date</a>

                    </div>
                </div>
                <div id="graph" class= "col-md-12"></div>
                <div class= "col-md-12" id="report_div">
                    

                    <div class="" style="background-color: #ddd;text-align: center;height: 30px"><h4>Activity Completion Status: </h4></div>
                    <table id ="act_comp" class="table table-bordered ">
                         <thead>
                            <tr>
                                <th>Activity Name</th>
                                <th>Activity Type</th>
                                 <th>Total Enrolled</th>
                                <th>Total Completed</th>
                                <th>Activity Completion</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            <?php echo $acthtml ; ?>
                        </tbody>
                    </table>
                </div>

    </div>
</div>




    <!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script> -->
    <script src="https://unpkg.com/gijgo@1.9.11/js/gijgo.min.js" type="text/javascript"></script>
    <link href="https://unpkg.com/gijgo@1.9.11/css/gijgo.min.css" rel="stylesheet" type="text/css" />
    <?php 
   

    // // if(isset($_POST['startdate']) && $_POST['startdate'] != ""){
    // //     echo '<script type="text/javascript">
    // //             var datepicker =  $("#dateselector").datepicker({
    // //      format: "dd-mm-yyyy",
    // //      change: function (e) {
    // //          alert("Change is fired");
    // //          timestamp();
    // //      }
         
    // //      }
    // //  }).value("'.$_POST['startdate'].'");
    // //     </script>';
    // }
        echo $OUTPUT->footer();
         
         echo "<script src='https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js'></script>";
          // echo "<script src='https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js'></script>";
          // echo "<script src='https://cdn.datatables.net/1.10.19/js/dataTables.jqueryui.min.js'></script>";

    echo "<script type='text/javascript'>
            $(document).ready(function(){
                $('#act_comp').DataTable({
                    'stripeClasses': [ ]
                    });
            });
    </script>";
   
