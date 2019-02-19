<?php
    require_once(dirname(dirname(__FILE__)).'../../config.php');
    global $PAGE,$CFG, $DB, $OUTPUT;
    require_once($CFG->libdir.'/adminlib.php');

    $PAGE->set_context(context_system::instance());
    $PAGE->set_pagelayout('admin');
    $PAGE->set_title('User Analysis');
    $PAGE->set_heading( 'User Analysis');
    // $PAGE->set_url(new moodle_url($CFG->wwwroot .'blocks/configurable_reports/completion_report.php'));
    $PAGE->navbar->ignore_active();

    $PAGE->requires->jquery();
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
    $sql ="SELECT 'System Users' as Usertype , COUNT(*) AS count FROM {user} WHERE  (firstname = '' AND lastname = '' ) UNION SELECT 'Actual Users', COUNT(*) AS count FROM {user} where firstname != ''";
    $users  = $DB->get_records_sql($sql);

    
    $html = '';
    $datastr = '';
    foreach($users as $key => $user){
        $html .= '<tr>
                    <td>'.$user->usertype.'</td>
                    <td>'.$user->count.'</td>
        </tr>';
         $datastr .= '[';
                        $datastr .= '"'.$user->usertype .'", '. $user->count;
                        $datastr .= '],';


    }
     echo '<script type="text/javascript" src="https://www.google.com/jsapi"></script>';
                    
                    echo "
                    <script type='text/javascript'>
                    google.load('visualization', '1', {packages: ['corechart']});
                    google.setOnLoadCallback(drawMaterial);

                    function drawMaterial() {
                    var data = google.visualization.arrayToDataTable([
                         ['Element', 'value']," .
                            $datastr
                       . "
                    ]);

                    var options = {

                        
                          
                           legend: { position: 'right' },
                          
                            'width':600,
                            'height':600,
                           
                        };


                    var chart = new google.visualization.PieChart(document.getElementById('graph'));
                    chart.draw(data, options);
                    }
                    </script>
                    ";

?>

<div class="container">
    <div class="row">
        <div class="col-md-12" id="graph" align="center" style="display: block;margin: 0 auto"></div>
        <div class="col-md-12" id="tablediv">
            <table id="users" class="table table-bordered">
                <thead>
                    <tr>
                        <th>User Type</th>
                        <th>Count </th>
                    </tr>
                </thead>

                <tbody>
                     <?php echo $html; ?>  
                                      
                </tbody>
                    
            </table>
        </div>
    </div>
</div>

<?php
    echo $OUTPUT->footer();
    echo "<script src='js/custom.js'></script>";
    echo "<script type='text/javascript'>
            $(document).ready(function(){
                $('#users').DataTable({
                     'stripeClasses': [ ]
                    });
            });
    </script>";