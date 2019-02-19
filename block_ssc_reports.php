<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Blog Menu Block page.
 *
 * @package    block_student_report
 * @copyright  2009 Nicolas Connault
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();



/**
 * The blog menu block class
 */

class block_ssc_reports extends block_base {
	function init() {
		$this->title = get_string('pluginname', 'block_ssc_reports');

	}
	public static function load($file)
	{
		$router = new static;

		require $file;



		return $router;
	}

	function get_content() {
            
             global $CFG, $COURSE,$USER,$DB;
             // CODE TO GET CURRENT USERS ROLE
	$context = context_system::instance();
	
	$roles = get_user_roles($context, $USER->id);

	
	
	

	$currentuserroleid = 5;
	foreach($roles as $key_roles){
	    $currentuserroleid = $key_roles->roleid;
	}
		
	    if(is_siteadmin() || $currentuserroleid == 1 ){
	// 
	    	// $mdllinks = "<a href='" . $CFG->wwwroot . "/blocks/school/school.php ' >" . get_string( 'school', 'block_school' ) . "</a><br/>";
	        $mdllinks = "<a href='" . $CFG->wwwroot . "/blocks/ssc_reports/configure_reports.php'>Settings</a><br/>";

	        // $mdllinks .= "<a href='" . $CFG->wwwroot . "/blocks/ssc_reports/course_completion_reports.php'>Course Completion Reports</a><br/>";
	        $mdllinks .= "<a href='" . $CFG->wwwroot . "/blocks/ssc_reports/activity_completion_reports.php'>Activity Completion Reports</a><br/>";
	        $mdllinks .= "<a href='" . $CFG->wwwroot . "/blocks/ssc_reports/useranalysis.php'>User Analysis</a><br/>";

			
			return $this->content->text = $mdllinks;
		}
		

	}

}

?>
