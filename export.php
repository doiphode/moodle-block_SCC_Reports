<?php
    
   require_once(dirname(dirname(__FILE__)).'../../config.php');
    
    global $CFG, $SESSION, $DB;
    require_once("{$CFG->libdir}/completionlib.php");
require_once($CFG->dirroot.'/lib/excellib.class.php');
    
    
    $filename = clean_filename(get_string('users') . '.xls');
    $workbook = new MoodleExcelWorkbook('-');
    $workbook->send($filename);
    $worksheet = array();
    $worksheet[0] =& $workbook->add_worksheet('');
    $col = 0;
    $fields = array('actname','type','enrolled','completed%');
    foreach ($fields as $fieldname) {
        $worksheet[0]->write(0, $col, $fieldname);
        $col++;
    }
    $row = 1;
    
        
        $col = 0;
        
        // foreach ($fields as $field => $unused) {
            $worksheet[0]->write(1, 0, 'sjfgg');
            $worksheet[0]->write(1, 1, 'scdfd');
            $worksheet[0]->write(1, 0, '30');
            $worksheet[0]->write(1, 0, '30%');
            // $col++;
        // }
        // $row++;
    // }
    $workbook->close();
    ?>