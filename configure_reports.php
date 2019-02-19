<?php
    require_once(dirname(dirname(__FILE__)).'../../config.php');
    global $PAGE,$CFG, $DB, $OUTPUT;
    require_once($CFG->libdir.'/adminlib.php');

    $PAGE->set_context(context_system::instance());
    $PAGE->set_pagelayout('admin');
    $PAGE->set_title('Configure Reports');
    $PAGE->set_heading( 'Configure Reports');
    // $PAGE->set_url(new moodle_url($CFG->wwwroot .'blocks/configurable_reports/completion_report.php'));
    $PAGE->navbar->ignore_active();

    $PAGE->requires->jquery();
    $PAGE->requires->js( new moodle_url($CFG->wwwroot . '/blocks/ssc_reports/custom.js'));
     
    
    if(!is_siteadmin()){
        header('Location:'.$CFG->wwwroot.'/my');
    }

    echo $OUTPUT->header();

    $sql = 'select id, shortname from {course} where id >1';
    $courses = $DB->get_records_sql($sql);
    
    $option = '<option value="">Select a course</option>';


    foreach($courses as $key => $course){
        $option .= '<option value= "'.$course->id.'" '.(isset($_POST['courselist']) && $_POST['courselist'] == $course->id  ? "selected" : "").'>'.$course->shortname.'</option>'; 
    }


    $html = "";$coursecomp = 0;
    $actcomp = 0;
    
    if(isset($_POST['courselist']) && $_POST['courselist'] != ""){

        $sql = 'select id from {modules} where name in ("assign","assignment","choice","feedback","imscp","lesson","quiz","scorm","workshop","survey")';
        $modules = $DB->get_records_sql($sql);
        $instr = "(";
        foreach($modules as $key => $module ){
            $instr .= $module->id .",";
        }
        $instr = trim($instr,',');
        $instr .= ")";

         $sql = 'select id,module, instance from {course_modules} where course = '.$_POST['courselist']. ' and module in  '.$instr;
       ;
        $allmodules = $DB->get_records_sql($sql);
        // echo '<pre>';
        // print_r($allmodules);
        foreach($allmodules as $key => $module){
            /* here key is course module id */
            $sql = 'select name from {modules} where id ='.$module->module;
            $table = $DB->get_record_sql($sql);

            $sql = "select * from {completion_report} where courseid = ".$_POST['courselist'];
            $saved = $DB->get_record_sql($sql);
            if(isset($saved->id) && $saved->id >0 ){
                

                $cmid_selected = urldecode($saved->cmid_selected);
                $cmid_array = json_decode($cmid_selected);
                 

                $coursecomp = $saved->coursecomp_selected;



            }
            


            if(isset($table) && $table->name != ""){
                $actcomp = 0;
                if(isset($saved->id) && $saved->id >0){
                    if(in_array($key, $cmid_array)){
                        $actcomp = 1;
                    }
                    else{
                        $actcomp = 0;
                    }
                }
                 $sql = 'select name from {'.$table->name.'} where id = '.$module->instance;
                 $actname = $DB->get_record_sql($sql);

                 $html .= '<tr> 
                                <td id="row_'.$key.'">'.$actname->name.'</td>
                                <td>'.$table->name.'</td>
                                <td><input type="checkbox" name="actcomp" id="actcomp_'.$key.'" value="'.$actcomp.'" '.($actcomp == 1 ? "checked":"").'><br></td>
                        </tr>';

            }
           
        }

       
    }
    
    
    ?>


    <div class="container">

       
            <div class= "row">
                <div class ="col-9" >
                    <form id= "form1" method="POST">
                        <select name= "courselist" id="courselist" >
                            <?php echo $option ?>
                        </select>
                    </form>
                </div>
                

                 <div class="col-3">
                    <a href="activity_completion_reports.php" target="_blank" style="color:red;">Activity Completion Reports</a><br>
                    <!-- <a href="course_completion_reports.php" target="_blank" style="color:red;">Course Completion Reports</a> -->
                </div>

               
            </div>
                

            
           <div class ="row mt-3">
                <div class ="col-md-9">
                    <div id= "managetable">
                        <table class="table table-bordered " >
                            <thead>
                                <tr>
                                    <th>Activities</th>
                                    <th>Activity Type</th>
                                    <th>Selected</th>
                                </tr>
                            </thead>

                            <tbody>
                                <?php echo $html ?>
                            </tbody>


                        </table>
                        
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row">
                        <input type="checkbox" name="coursecomp" id ="coursecomp" value="<?php echo $coursecomp ;?>" <?php echo $coursecomp == 1 ? 'checked': ''?>>Course Completion<br>
                    </div>
                </div>
            </div

            <div class= "col-md-6">
                
                    <button id="save" title= "save">Save </button>
                   
               
            </div>
            <form id = "form2" method="POST">
                 <input name ="courselist"  id= "courselist" type="text" hidden value="<?php echo isset($_POST['courselist']) && $_POST['courselist'] != "" ?  $_POST['courselist']  : '' ?>"/>
             </form>
    </div>
    <script src="https://unpkg.com/gijgo@1.9.11/js/gijgo.min.js" type="text/javascript"></script>
    <link href="https://unpkg.com/gijgo@1.9.11/css/gijgo.min.css" rel="stylesheet" type="text/css" />

    <?php

    echo $OUTPUT->footer();
?>