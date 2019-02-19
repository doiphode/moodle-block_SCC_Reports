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

    $sql = 'select id, shortname from {course} where id >1';
    $courses = $DB->get_records_sql($sql);
    
    $option = '<option value="">Select a course</option>';
    if(isset($_POST['courselist']) && $_POST['courselist'] != ""){
        $COURSE  = $_POST['courselist'];
    }

    foreach($courses as $key => $course){
        $option .= '<option value= "'.$course->id.'" '.(isset($COURSE) && $COURSE == $course->id  ? "selected" : "").'>'.$course->shortname.'</option>'; 
    }
    $coursehtml ="";  
    $datastr = "";  

     if(isset($COURSE) && $COURSE != ""){


        $sql = 'select id from {enrol} where courseid = '.$COURSE .' and enrol= "manual"';
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



            $sql = 'select shortname,timecreated from {course} where id = '.$COURSE;
            $name = $DB->get_record_sql($sql);

           


            
                // $first_minute = mktime(0, 0, 0, 1,1, 2019);
                // $last_minute = mktime(23, 59, 59, 1, date('t', $first_minute),2019);
                

                // $month=date("m",$first_minute);
                // $year=date("Y",$first_minute);

              
                


            if(isset($_POST['startdate']) && $_POST['startdate'] != ""){

                $start_timestamp = strtotime($_POST['startdate']);
                $month = (int)date("m",$start_timestamp);
                $year = (int)date("Y",$start_timestamp);
                $m="";
                $fullmonth = date("F",$start_timestamp);
                
                
                $d = [1,2,3,4,5,6,7,8,9];
                
                if(in_array($month, $d)){
                    $m = "0".$month;
                }
                else{
                    $m = $month;
                }
                
                 $monthlabels = array('Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec');

                for ($i = 1; $i<=12 ; $i++ ){

                    $count = 0;
                   
                         
                        if(in_array($i, $d)){
                            $j = "0".$i;
                            
                        }
                        else{
                            $j =$i;
                            

                        }

                    $sql = 'select userid, timecompleted from {course_completions} where course ='.$COURSE.' and DATE_FORMAT(FROM_UNIXTIME(timecompleted), "%m-%Y") = "'.$j.'-'.$year.'"  and  userid in '.$userlist .' and timecompleted IS NOT NULL';
                    
                    $percent_monthwise = $DB->get_records_sql($sql);
                    $count = round((count($percent_monthwise)/$enrolled_count)*100,2);
                    $datastr .= '[';
                    $datastr .= '"'.$monthlabels[($i-1)].'", '.$count.'],';
                   

                }
                
                $datastr = rtrim($datastr, ',');


                // $end_timestamp = strtotime('+ 7 days', $start_timestamp);


                // $sql = 'select userid, timecompleted from {course_completions} where course ='.$COURSE.' and  timecompleted BETWEEN '.$start_timestamp.' AND '.$end_timestamp.' and  userid in '.$userlist .' and timecompleted IS NOT NULL';
                $sql_table = 'select userid, timecompleted from {course_completions} where course ='.$COURSE.'  and  userid in '.$userlist .' and timecompleted IS NOT NULL and DATE_FORMAT(FROM_UNIXTIME(timecompleted), "%m-%Y") = "'.$m.'-'.$year.'"';
            }
            else{

                $start_timestamp = $name->timecreated;
                
                
                $month = (int)date("m",$start_timestamp);
                $year = (int)date("Y",$start_timestamp);

                
                $m="";
                $fullmonth = date("F",$start_timestamp);
                
                
                $d = [1,2,3,4,5,6,7,8,9];
                
                if(in_array($month, $d)){
                    $m = "0".$month;
                }
                else{
                    $m = $month;
                }
                $monthlabels = array('Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec');

                for ($i = 1; $i<=12 ; $i++ ){

                    $count = 0;
                   
                         
                        if(in_array($i, $d)){
                            $j = "0".$i;
                            
                        }
                        else{
                            $j =$i;
                            

                        }

                    $sql = 'select userid, timecompleted from {course_completions} where course ='.$COURSE.' and DATE_FORMAT(FROM_UNIXTIME(timecompleted), "%m-%Y") = "'.$j.'-'.$year.'"  and  userid in '.$userlist .' and timecompleted IS NOT NULL';
                    
                    $percent_monthwise = $DB->get_records_sql($sql);
                    $count = round((count($percent_monthwise)/$enrolled_count)*100,2);
                    $datastr .= '[';
                    $datastr .= '"'.$monthlabels[($i-1)].'", '.$count.'],';
                   

                }
                
                $datastr = rtrim($datastr, ',');


                // $end_timestamp = strtotime('+ 7 days', $start_timestamp);


                // $sql = 'select userid, timecompleted from {course_completions} where course ='.$COURSE.' and  timecompleted BETWEEN '.$start_timestamp.' AND '.$end_timestamp.' and  userid in '.$userlist .' and timecompleted IS NOT NULL';
                $sql_table = 'select userid, timecompleted from {course_completions} where course ='.$COURSE.'  and  userid in '.$userlist .' and timecompleted IS NOT NULL and DATE_FORMAT(FROM_UNIXTIME(timecompleted), "%m-%Y") = "'.$m.'-'.$year.'"';

                /* ## completed % irrespective of month ## $sql_table = 'select userid, timecompleted from {course_completions} where course ='.$COURSE.'  and  userid in '.$userlist .' and timecompleted IS NOT NULL';*/
            }
            
                
              
            $course = $DB->get_records_sql($sql_table);

            $percent_course_comp = round((count($course)/$enrolled_count)*100,2);
            $coursehtml = '<tr>
                              <td> '.$name->shortname.'</td> 
                              <td>'.$enrolled_count.'</td>
                                <td>'.count($course).'</td>
                              <td> '.$percent_course_comp.'% </td>
                            </tr>';

             // $datastr .='[';
             //         $datastr .= '"'.$name->shortname.'"' .',' .$percent_course_comp.',"'.$percent_course_comp.'%"';
             //        $datastr .= '],';


             $labelstr = "'Course Completion' ,{ role: 'annotation' }";

             if($datastr != ""){
                echo '<script type="text/javascript" src="https://www.google.com/jsapi"></script>';
                           
                echo "
                <script type='text/javascript'>
                google.load('visualization', '1', {packages: ['corechart']});
                google.setOnLoadCallback(drawMaterial);

                function drawMaterial() {
                var data = google.visualization.arrayToDataTable([
                     ['days', 'Completion']," .
                        $datastr
                   . "
                ]);

                var options = {
                    chartArea: {
                      
                      width: '90%',
                      left: 40,

                    },
                    series: {
                        0: { color: '#e2431e' },
                    },
                    legend: {
                      position: 'top',
                    },
                    vAxis:{
                        title: 'Percentage Completion',
                        textStyle : {
                            fontSize: 9 // or the number you want
                        }
                    },
                    hAxis:{
                        title : 'Month Wise Distribution -Year (".$year.")',
                        
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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
        <div class="container">

             <form id="dateform" method="POST" style="display:none">
            <input name ="startdate" id="startdate" hidden  />
            <input name ="courselist"  id= "courselist" type="text" hidden value="<?php echo isset($COURSE) && $COURSE != "" ?  $COURSE  : '' ?>"/> 

    
         </form>
            
            <div class="row">
                
                <div class= "col-md-6">
                        <form id= "form1" method="POST">
                           <!--  <select name= "courselist" id="courselist">
                                <?php echo $option ?>
                            </select> -->
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                        Year (Select date to view graph) : &nbsp;<input id="dateselector" value="<?php echo isset($_POST['startdate']) ? $_POST['startdate'] : '' ?>"/>
                         <a  style="color:green;cursor:pointer;" id="clear"> Clear Date</a>

                    </div>
               
               
                </div>
            </div>
             <div id="graph" class= "col-md-12"></div>

            <div class="row mt-5">
                
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
        </div>


        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
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