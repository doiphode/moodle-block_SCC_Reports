<?php
    require_once(dirname(dirname(__FILE__)).'../../config.php');
    global $PAGE,$CFG, $DB, $OUTPUT;
    require_once($CFG->libdir.'/adminlib.php');

    $PAGE->set_context(context_system::instance());
    $PAGE->set_pagelayout('admin');
    $PAGE->set_title('Course Completion Reports');
    $PAGE->set_heading( 'Course Completion Reports');
    // $PAGE->set_url(new moodle_url($CFG->wwwroot .'blocks/configurable_reports/completion_report.php'));
    $PAGE->navbar->ignore_active();

    $PAGE->requires->jquery();

    $PAGE->requires->js( new moodle_url($CFG->wwwroot . '/blocks/ssc_reports/custom.js'));
    $PAGE->requires->css( new moodle_url('https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css'));

    $PAGE->requires->css( new moodle_url($CFG->wwwroot .'/blocks/ssc_reports/style.css'));
     

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

    echo "<script src='https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js'></script>";

    $sql = 'select id, shortname from {course} where id >1';
    $courses = $DB->get_records_sql($sql);
    
    $option = '<option value="">Select a course</option>';


    foreach($courses as $key => $course){
        $option .= '<option value= "'.$course->id.'" '.(isset($_POST['courselist']) && $_POST['courselist'] == $course->id  ? "selected" : "").'>'.$course->shortname.'</option>'; 
    }
    $coursehtml ="";  
    $datastr = "";  

     if(isset($_POST['courselist']) && $_POST['courselist'] != ""){


        $sql = 'select id from {enrol} where courseid = '.$_POST['courselist'] .' and enrol= "manual"';
        $enrol = $DB->get_record_sql($sql);
        if(isset($enrol->id)){

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

             /*for course completion table */



            $sql = 'select shortname from {course} where id = '.$_POST['courselist'];
            $name = $DB->get_record_sql($sql);

           


            
                $first_minute = mktime(0, 0, 0, 1,1, 2019);
                $last_minute = mktime(23, 59, 59, 1, date('t', $first_minute),2019);
                echo 'starts : '.$first_minute;
                echo 'ends : '.$last_minute;





                $month=date("m",$first_minute);
                $year=date("Y",$first_minute);

              
                


            if(isset($_POST['startdate']) && $_POST['startdate'] != ""){

                $start_timestamp = strtotime($_POST['startdate']);
                $month = date("m",$start_timestamp);
                $year = date("Y",$start_timestamp);

                echo ' month : '.$month;
                echo ' year : '.$year;
                if($month == 02){
                    if($year % 4 == 0){
                        /* leap year */
                        $days = 29;

                    }
                    else{
                        $days = 28;
                    }
                }
                else if ($month >= 01 && $month <= 12 && $month != 02 ){
                    $days = 31;

                }



                // $end_timestamp = strtotime('+ 7 days', $start_timestamp);


                // $sql = 'select userid, timecompleted from {course_completions} where course ='.$_POST['courselist'].' and  timecompleted BETWEEN '.$start_timestamp.' AND '.$end_timestamp.' and  userid in '.$userlist .' and timecompleted IS NOT NULL';
            }
            else{
                // $sql = 'select userid, timecompleted from {course_completions} where course ='.$_POST['courselist'].'  and  userid in '.$userlist .' and timecompleted IS NOT NULL';
            }
            $course = $DB->get_records_sql($sql);

            $percent_course_comp = round((count($course)/$enrolled_count)*100,2);
            $coursehtml = '<tr>
                              <td> '.$name->shortname.'</td> 
                              <td>'.$enrolled_count.'</td>
                                <td>'.count($course).'</td>
                              <td> '.$percent_course_comp.'% </td>
                            </tr>';

             $datastr .='[';
                     $datastr .= '"'.$name->shortname.'"' .',' .$percent_course_comp.',"'.$percent_course_comp.'%"';
                    $datastr .= '],';


             $labelstr = "'Course Completion' ,{ role: 'annotation' }";

             if($datastr != ""){
                echo '<script type="text/javascript" src="https://www.google.com/jsapi"></script>';
                           
                echo "
                <script type='text/javascript'>
                google.load('visualization', '1', {packages: ['corechart']});
                google.setOnLoadCallback(drawMaterial);

                function drawMaterial() {
                var data = google.visualization.arrayToDataTable([
                     ['coursename', ".$labelstr."]," .
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
                    hAxis:{
                         textPosition : 'in',
                    },
                        
                        
                    height:500,
                    
                        
                        
                    }
                        


                var chart = new google.visualization.LineChart(document.getElementById('graph'));
                chart.draw(data, options);
                }
                </script>
                ";
            }
        }
        else{
            echo "<div style='text-align:center; color:red'>No user Enrolled!</div>";
        }
     }
    ?>

        <div class="container">

             <form id="dateform" method="POST">
            <input name ="startdate" id="startdate" hidden  />
            <input name ="courselist"  id= "courselist" type="text" hidden value="<?php echo isset($_POST['courselist']) && $_POST['courselist'] != "" ?  $_POST['courselist']  : '' ?>"/> 

    
         </form>
            
            <div class="row">
                
                <div class= "col-md-8">
                        <form id= "form1" method="POST">
                            <select name= "courselist" id="courselist">
                                <?php echo $option ?>
                            </select>
                        </form>
                    </div>
                    <div class="col-md-4">
                        <div class="row">
                        Week Start From :&nbsp;<input id="dateselector" value="<?php echo isset($_POST['startdate']) ? $_POST['startdate'] : '' ?>"/>
                         <a  style="color:green;cursor:pointer;" id="clear"> Clear Date</a>

                    </div>
               
               
            </div>
             <div id="graph" class= "col-md-12"></div>

            <div class="row">
                
                <div class= "col-md-12" id="report_div">
                    <div style="background-color: #ddd;text-align: center;height:30px"><h4>Course Completion Status: </h4></div>
                    <table id="report_table" class="table table-bordered">
                        <thead>
                            <th>Course Name</th>
                            <th>Total Enrolled</th>
                            <th>Total Completed</th>
                            <th>Course Completion</th>
                            
                        </thead>
                        <tbody>
                            <?php echo $coursehtml ; ?>
                        </tbody>
                    </table>
            </div>
        </div>

        <!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script> -->
    <script src="https://unpkg.com/gijgo@1.9.11/js/gijgo.min.js" type="text/javascript"></script>
    <link href="https://unpkg.com/gijgo@1.9.11/css/gijgo.min.css" rel="stylesheet" type="text/css" />

     <?php
    echo $OUTPUT->footer();
     echo "<script src='https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js'></script>";
      echo "<script type='text/javascript'>
            $(document).ready(function(){
                $('#report_table').DataTable({
                    'stripeClasses': [ ]
                    });


            });
    </script>";
