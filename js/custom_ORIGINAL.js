// var Script = document.createElement('script');  
// Script.setAttribute('src','https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js');
// document.head.appendChild(Script);


	function validateEmail(email){
		// var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		//below one is for all lang email validate.
		var emailReg=/^[_a-zA-ZáéíñóúüÁÉÍÑÓÚÜ0-9-]+(\.[_a-zA-ZáéíñóúüÁÉÍÑÓÚÜ0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
		if(emailReg.test( email )){
			return true;
		}
		else{
			return false;	
		}	
	}






	$(document).ready(function(){
		require(['https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js']);


		//getting string from inputs
			var classexist =$('#reqstrings #classexist').val();
			var classsave=$('#reqstrings #classsave').val();
			var classupdate=$('#reqstrings #classupdate').val();
			var userupdate=$('#reqstrings #userupdate').val();
			var passupdate=$('#reqstrings #passupdate').val();
			var passnotupdate=$('#reqstrings #passnotupdate').val();
			var alreadyexist=$('#reqstrings #alreadyexist').val();
			var user=$('#reqstrings #user').val();
			var savestring=$('#reqstrings #savestring').val();
			var emailuse=$('#reqstrings #emailuse').val();
			var csvalert=$('#reqstrings #csvalert').val();
			var serverbusy=$('#reqstrings #serverbusy').val();
			var filealert=$('#reqstrings #filealert').val();
			var email1=$('#reqstrings #email1').val();
			var alertskip=$('#reqstrings #alertskip').val();
			var alertadd=$('#reqstrings #alertadd').val();
			var class1=$('#reqstrings #class').val();
			var classnotadd=$('#reqstrings #classnotadd').val();
			var importtodb=$('#reqstrings #importtodb').val();
			var entervalidemail=$('#reqstrings #entervalidemail').val();
			




		var t= $("#schooltable").DataTable({
            "order": [[ 0, "desc" ]]
        });
		
		// save button on schoolmodal
		$('#save').on('click',function(){

			$('#schoolmodal #addschoolalert').hide();
			var schoolname= $('#schoolname').val();	
			var description = $('#description').val();
			var status= $('#status').val();
			
			
			$.ajax({
			 	url : 'ajax.php',

		                   type : 'POST',
		                   data : {'request':'school','schoolname':schoolname, 'description': description, 'status': status},
		                   success : function(data){
		                   	// alert(data);
		                   		var data=JSON.parse(data);
		                   		
		                   		 $('#form1')[0].reset();

		                   		if(data!= "" && data !=0){
		                   			t.row.add(['<span id="col1_'+data['id']+'">'+data['id']+'</span>',
		                   		 	'<span id="col2_'+data['id']+'">'+schoolname+'</span>',
		                   		 	
		                   		 	'<span id="col4_'+data['id']+'">'+data['usercount']+'</span>',
		                   		 	'<span id="col1_'+data['id']+'">'+
		                   		 	'<button class="edit_btn" data-toggle="modal" data-target="#schooledit" id="edit_row_'+data['id']+'" style="background-color: transparent;border: none;">'+
		                   		 	'<i class="fa fa-pencil" aria-hidden="true"> </i> </button> '+
		                   		 	'<button  class="delete_btn" id="delete_row_'+data['id']+'" style="background-color: transparent;border: none;">'+
		                   		 	'<i class="fa fa-trash" aria-hidden="true"></i></button>'+
		                   		 	'</span>']).node().id='row_'+data['id'];
		                   		 	t.draw(false);
		                   		 	// $('#schoolmodal').modal('hide');
		                   		 	$("button[data-dismiss=\"modal\"]").click();

		                   		}
		                   		else{
		                   			$('#schoolmodal #addschoolalert').show();
		                   		}
		                   		
		                   		 
		                   }
			});

			alert(schoolname+" "+description+""+status);
		});	

		/* save button on modal 'modifyclass'*/
		$('#modifyclass').on('click',".saveedit",function(){
			
			var id =this.id; 
			var clickedbtn=id.split('_')[0]; 
			alert(clickedbtn);
			

				id=id.split('_')[1]; /* this is school id*/
				alert(id);
				$('#addclassalert').hide();
				var classname=$('#classname').val().trim();
				var course=$('#course option:selected').text();
				var status=$('#addclassstatus').val();
				alert(course+" "+status);
				$.ajax({
					url : 'ajax.php',

			                   type : 'POST',
			                   data : {'request':'addclasssave','id':id,
			                   'classname':classname,'status':status,'course':course},
			                   success : function(data){
			                   	// alert(data);	                   	
			                        if(data == 'fail'){
			                        	alert('working');
			                         	$('#addclassalert').show();
			                        }
			                        else if(data =='classalreadyexist'){
			                        	alert(classexist);
			                        }
			                        else{

			                        	alert(classsave);
			                        	var show=0;
				                   		$.ajax({
											url : 'ajax.php',

									                type : 'POST',
									           
								                   data : {'request':'modifyclass','id':id,'show':show},
								                   success : function(data){
								                   	// alert(data);	                   	
								                   		if(data !=""){
								                   			$('#modifyclass').html(data).modal('show');
								                   			
								                   		}           		
								                   		 
								                   	}
										});
			                        	
			                        }		                   		 
			                   	}
			                   
				});
				
			
		});

		/* edit button on modal 'modifyclass' */
		$('#modifyclass').on('click',".edit_btn",function(){
			var id=this.id;  
			alert(id);
			id=id.split('_')[2]; /*  this is class id */
			alert(id);

			$('#modifyclass .final_'+id).hide(); //hide  view span
			$('#modifyclass #edit_class_'+id).hide(); // hide edit button
			$('#modifyclass #final_'+id).show(); // show update btn

			$('#modifyclass .editrow_'+id).show(); // show input span

		});

		/* update button on modal 'modifyclass' */

		$('#modifyclass').on('click',".update_btn",function(){
			var id=this.id;
			id=id.split('_')[1]; /* this is class id*/
			alert(id);
			// $('#classtable #col3_'+id).text('enabled');
			// alert($('#classtable #col3_'+id).text());
			var classname=$('#classname_'+id).val();
			var course=$('#course_'+id+' option:selected').text();
			var status=$('#addclassstatus_'+id+' option:selected').val();
			alert(classname+" "+course+ " "+status);
			
			$.ajax({
				url : 'ajax.php',

		                   type : 'POST',
		                   data : {'request':'updateclass','classid':id,'classname':classname,'course':course,'status':status},
		                   success : function(data){
		                   	// alert(data);	                   	
		                   		if(data == 1){                  			
		                   		 
		                   		$('#modifyclass .editrow_'+id).hide(); /* hide input span*/
								$('#modifyclass .final_'+id).show();  /* show view span*/
								$('#modifyclass #edit_class_'+id).show(); /*  show edit button*/
							    $('#modifyclass #final_'+id).hide(); /* hide update btn*/
		                   		
		                   		var classname1=$('#classname_'+id).val();
								var course1=$('#course_'+id+' option:selected').text();
								var status1=$('#addclassstatus_'+id+' option:selected').val();
								alert(classname+" "+course+ " "+status);
		                   		
		                   		
		                   		 $('#classtable #col1_'+id).text(classname1);                   			
		                   		 $('#classtable #col2_'+id).text(course1); 
		                   		 $('#classtable #col3_'+id).text(status1); 

		                   		 alert(classupdate);
		                   		}           		
		                   		 
		                   	}

			});


		});

		/* individual class delete button on modal 'modifyclass'*/

		$('#modifyclass').on('click',".delete_class",function(){
			var id =this.id;
				id=id.split('_')[2]; /* this is class id */
				alert(id);
				$.ajax({
					url : 'ajax.php',

		                   type : 'POST',
		                   data : {'request':'deleteclass','classid':id,},
		                   success : function(data){
		                   	// alert(data);	                   	
		                   		if(data == 1){                  			
		                   			
		                   		 // $('#col2_'+id).text(schoolname);   
		                   		 t2.row('#row_'+id).remove().draw(false);	/* removing row from datatable with id = class id */ 
		                   		 alert("working");


		                   		}
		                   		else{
		                   			$('#classdetails #classalertlabel').show();
		                   		}           		
		                   		 
		                   	}
				});
		});

		/* complete class delete button on modal 'modifyclass' */
		$('#modifyclass').on('click',".deleteallclass",function(){

			var id=this.id;
			string=id.split('_')[2]; /* alert msg for confirm box*/
			id=id.split('_')[1]; /* this is school id */
			alert(string);
			alert(id);
			$('#classdetails #classalertlabel').hide();
			if(confirm(string)){
				$.ajax({
					url : 'ajax.php',

			                   type : 'POST',
			                   data : {'request':'deleteallclass','schoolid':id,},
			                   success : function(data){
			                   	// alert(data);	                   	
			                   		if(data == 'done'){                  			
			                   			
			                   		
			                   		 var show=0; /*parameter to hide addclassdiv in modifyclass */
					
					
									$.ajax({
										url : 'ajax.php',

								                   type : 'POST',
								                   data : {'request':'modifyclass','id':id,'show':show},
								                   success : function(data){
								                   	// alert(data);	                   	
								                   		if(data !=""){
								                   			$('#modifyclass').html(data).modal('show');
								                   			
								                   		}           		
								                   		 
								                   	}
									});

			                   		}
			                   		else{
			                   			$('#classdetails #classalertlabel').show();
			                   		}           		
			                   		 
			                   	}

				});
			}
		});


		/* complete user delete button on modal 'modifyuser'*/
		$('#modifyuser').on('click',".deletealluser",function(){

			
			var id= this.id;
			string=id.split('_')[2]; /* alert msg for confirm box*/
			id=id.split('_')[1]; /* this is school id */
			
			alert(string);
			alert(id);


			if(confirm(string)){
				$.ajax({
					url : 'ajax.php',

                   type : 'POST',
                   data : {'request':'deletealluser','schoolid':id},
                   success : function(data){
                   	// alert(data);	                   	
	                   	if(data == 1){
	                   		 var show=0;


							$.ajax({
								url : 'ajax.php',

						                   type : 'POST',
						                   data : {'request':'modifyuser','id':id,'show':show},
						                   success : function(data){
						                   	// alert(data);	                   	
						                   		if(data !=""){
						                   			$('#modifyuser').html(data).modal('show');
						                   			
						                   		}           		
						                   		 
						                   	}
							});
							$('#col4_'+id).text(0);
	                   	} 
                   	}
				});
			}
		});

		/*individual user delete on modal 'modifyuser '*/
		$('#modifyuser').on('click',".delete_user",function(){
			var t3= $("#usertable").DataTable();

			var id =this.id;
				var schoolid=id.split('_')[1]; /*this is school id*/
				var id=id.split('_')[2]; /*this is userid*/
				alert(schoolid);
				alert(id);
				$.ajax({
					url : 'ajax.php',

		                   type : 'POST',
		                   data : {'request':'deleteuser','userid':id,'schoolid':schoolid},
		                   success : function(data){
		                   	// alert(data);	                   	
		                   		if(data !=""){                  			
		                   			
		                   		 // // $('#col2_'+id).text(schoolname);   
		                   		 // t2.row('#row_'+id).remove().draw(false);	 
		                   		 // alert("working");
		                   		 $('#col4_'+schoolid).text(data);

		                   		 t3.row('#row_'+id).remove().draw(false);  /*delete user row with id = userid*/

		                   		}
		                   		       		
		                   		 
		                   	}
				});
		});

		/* edit button on modal 'modifyuser '*/
		$('#modifyuser').on('click',".edit_btn",function(){
			var id=this.id;
			alert(id);
			id=id.split('_')[2]; /*this is user id*/
			alert(id);

			$('#modifyuser .final_'+id).hide(); //hide  view span
			$('#modifyuser #edit_user_'+id).hide(); // hide edit button
			$('#modifyuser .visible_'+id).show(); // show update btn

			$('#modifyuser .edituser_'+id).show(); // show input span

		});

		/*update button modifyuser*/
		$('#modifyuser').on('click',".update_btn",function(){
			var id=this.id;
			 var schoolid=id.split('_')[1];
			 var userid=id.split('_')[2];

			alert(schoolid);
			alert(userid);
			// $('#classtable #col3_'+id).text('enabled');
			// alert($('#classtable #col3_'+id).text());
			var username=$('#username_'+userid).val();
			var firstname=$('#firstname_'+userid).val();
			var lastname=$('#lastname_'+userid).val();
			var classname=$('#classname_'+userid+' option:selected').text();
			var email=$('#email_'+userid).val();

			
			alert(username+" "+firstname+ " "+email+" "+classname+" "+lastname+" "+email);
			
			$.ajax({
				url : 'ajax.php',

		                   type : 'POST',
		                   data : {'request':'updateuser','schoolid':schoolid,'userid':userid,'username':username,'firstname':firstname,'lastname':lastname,'classname':classname,'email':email},
		                   success : function(data){
		                   	// alert(data);	                   	
		                   		if(data == 1){                  			
		                   		 		                   		

							     $('#modifyuser .edituser_'+userid).hide(); /*hide input span*/
							     $('#modifyuser #edit_user_'+userid).show(); /* show edit button */
							     $('#modifyuser .visible_'+userid).hide(); /*hide update btn*/
		                   		$('#modifyuser .final_'+userid).show(); /*show  view span */

		                   		var username=$('#username_'+userid).val();
								var firstname=$('#firstname_'+userid).val();
								var lastname=$('#lastname_'+userid).val();
								var classname=$('#classname_'+userid+' option:selected').text();
								var email=$('#email_'+userid).val();
		                   		alert(username+" "+firstname+ " "+email+" "+classname+" "+lastname+" "+email);
		                   		
		                   		 $('#usertable #col1_'+userid).text(username);                   			
		                   		 $('#usertable #col2_'+userid).text(firstname); 
		                   		 $('#usertable #col3_'+userid).text(lastname);
		                   		  $('#usertable #col4_'+userid).text(classname);
		                   		  $('#usertable #col5_'+userid).text(email);
		                   		 alert(userupdate);
		                   		}           		
		                   		 
		                   	}

			});


		});

		$('#modifyuser').on('click',".edit_passwd ",function(){
			var id= this.id;
			id=id.split('_')[1]; /*this is user id*/
			alert(id);
			$('#modifyuser .edit_passwd').hide();	/*change password button*/
			$('#modifyuser #passwdinput_'+id).show(); /*password input span */
		});

		$('#modifyuser').on('click',".passwdsave",function(){
			var id= this.id;
			id=id.split('_')[1]; /* this is user id*/
			alert(id);
			var passwd = $('#modifyuser #password_'+id).val();
			alert(passwd);
			
			$.ajax({
				url : 'ajax.php',

					                   type : 'POST',
					                   data : {'request':'savepasswd','userid':id,'passwd':passwd},
					                   success : function(data){
					                   	// alert(data);	                   	
					                         	if(data==1){
					                         		$('#modifyuser #passwdinput_'+id).hide();
					                         		$('#modifyuser .edit_passwd').show();
					                         		alert(passupdate);

					                         	}
					                         	else{
					                         		$('#modifyuser #passwdinput_'+id).hide();
					                         		$('#modifyuser .edit_passwd').show();
					                         		alert(passnotupdate);
					                         	}	
					                   		 
					                   	}
			});


		});



		/* save button on modifyuser when clicked on adduser */
		$('#modifyuser').on('click',".saveedit",function(){

					$('#adduseralert').hide();
					var id =this.id;
					id=id.split('_')[1]; /*this is school id */
					alert(id);
					var username= $('#username').val().toLocaleLowerCase();
					var password=$('#passwd').val();
					var firstname=$('#firstname').val();
					var surname=$('#surname').val()
					var classname=$('#adduserdiv #classname option:selected').val(); //id goes here
					
					var roleid=$('#adduserdiv #role option:selected').val();
					if($('#email').val() == ""){
						/*email format: username@edunet.cl*/
						var demoemail='@edunet.cl';
						var str=username.trim();
						str=str.replace(" ",'_');
						var email=str.concat(demoemail);
					}
					else{
						var email=$('#email').val().trim();
					}
					
					alert(username+"" +password+""+firstname+""+classname+""+surname+""+email+" "+roleid);	

					if(validateEmail(email)){
						$.ajax({
							url : 'ajax.php',

					                   type : 'POST',
					                   data : {'request':'addusersave','id':id,
					                   'username':username,'password':password,'firstname':firstname,
					                   'surname':surname,'classname':classname,'email':email,'roleid':roleid},
					                   success : function(data){
					                   // console.log(typeof(JSON.parse(data)));
					                   			
					                   			if(data =='emailinuse'){
					                   				alert(emailuse);
					                   			}
					                   			else if(data == 'fail'){
					                   				$('#adduseralert').show();
					                   			}
					                   			else if(typeof(JSON.parse(data))=='object'){
					                   				var data =JSON.parse(data);
					                   				if(data.hasOwnProperty('skipusers')){
					                   					alert(user+" "+data['skipusers']+" "+alreadyexist);
					                   				}


					                   			}
					                         	else if(data!=""){
					                         		$('#col4_'+id).text(data);
					                         		alert(user+" "+username+" "+savestring);
					                         		var show=0;
													$.ajax({
														url : 'ajax.php',

												                   type : 'POST',
												                   data : {'request':'modifyuser','id':id,'show':show},
												                   success : function(data){
												                   	// alert(data);	                   	
												                   		if(data !=""){
												                   			$('#modifyuser').html(data).modal('show');
												                   			
												                   		}           		
												                   		 
												                   	}
													});
					                         		
					                         	}
					                         	else{

					                         	}

					                   		 
					                   	}
					                   
						});
					}
					else{
						alert(entervalidemail);
					}
					
				
		});

		/*save button for edited school info */
		$('#schooleditmodal').on('click',".saveedit",function(){
			var id=this.id;
			alert(id);
			id=id.split('_')[1]; /*this is school id */
			var schoolname= $('#schooleditmodal #schoolname').val();	
			var description = $('#schooleditmodal #description').val();
			var status= $('#schooleditmodal #status').val();
			
			// alert(schoolname+""+description+""+status);
				$.ajax({
					url : 'ajax.php',

		                   type : 'POST',
		                   data : {'request':'schooleditbtn','id':id,'schoolname':schoolname,'description':description,'status':status},
		                   success : function(data){
		                   	// alert(data);	                   	
		                   		if(data == 1){                  			
		                   			
		                   		 $('#col2_'+id).text(schoolname); 
		                   		 $("button[data-dismiss=\"modal\"]").click();
               			

		                   		}           		
		                   		 
		                   	}
				});


		});	

		/*delete button on school table */
		$('#schooltable').on('click',".delete_btn", function(){

			var id=this.id;
			alert(id);
			id = id.split('_')[2]; /*school id */
			alert(id);
			$('#schooltablediv #schoolalertlabel').hide();
			$.ajax({
			 	url : 'ajax.php',

		                   type : 'POST',
		                   data : {'request':'schooldeletebutton','id':id},
		                   success : function(data){
		                   	// alert(data);	                   	
		                   		if(data == 'success'){
		                   			t.row('#row_'+id).remove().draw(false);	

		                   		} 
		                   		else
		                   		{
		                   			$('#schooltablediv #schoolalertlabel').show();
		                   		}

		                   		 
		                   	}
			});

		});

		/*edit button schooltable*/
		$('#schooltable').on('click',".edit_btn", function(){
			var id=this.id;
			id=id.split('_')[2];
			alert(id);
			$.ajax({
			 	url : 'ajax.php',

		                   type : 'POST',
		                   data : {'request':'schooleditbutton','id':id},
		                   success : function(data){
		                   	// alert(data);	                   	
		                   		if(data !=""){
		                   			
		                   			$('#schooleditmodal').html(data).modal('show');
		                   		}           		
		                   		 
		                   	}
			});

		});


		/*add class button on modifyclass*/
		$('#modifyclass').on('click','.addclass',function(){

			var show=1;	/*to display add class form div*/
			var id=this.id;
			alert(id);
			id=id.split('_')[1]; /*school id*/
			alert(id);
			// $('#modifyclass #addclasslabel').prop('display','block');
			$('#modifyclass #classlabel').text('Add Class Details')
			$('#modifyclass #classdetails').hide();
			$('#modifyclass #addclassdiv').show();
			$.ajax({
				url : 'ajax.php',

		                type : 'POST',
		           
	                   data : {'request':'modifyclass','id':id,'show':show},
	                   success : function(data){
	                   	// alert(data);	                   	
	                   		if(data !=""){
	                   			
	                   			
	                   		}           		
	                   		 
	                   	}
			});
		});


		/*add user button on modifyuser*/
		$('#modifyuser').on('click','.adduser',function(){

			var show=1; /*to display add user form div*/
			var id=this.id;
			alert(id);
			id=id.split('_')[1]; /*school id*/ 
			alert(id);

			$('#modifyuser #userlabel').text('Add User Details');
			$('#modifyuser #csvdiv').hide();
			$('#modifyuser #userdetails').hide();
			$('#modifyuser #adduserdiv').show();
			$.ajax({
		           type : 'POST',
	                   data : {'request':'modifyuser','id':id,'show':show},
	                   success : function(data){
	                   	// alert(data);	                   	
	                   		if(data !=""){
	                   			
	                   			
	                   		}           		
	                   		 
	                   	}
			});
		});


		$('#modifyuser').on('change', '.csv', function(e){
			var id=this.id;
			id=id.split('_')[1]; /*school id*/

			var filename1=$('#modifyuser input[type=file]')[0].files[0].name;
			alert(filename1);
			 var file=$('#modifyuser input[type=file]')[0].files[0];
			 alert(file);
			 alert($('#modifyuser input[type=file]')[0].files[0].type);
			 if($('#modifyuser input[type=file]')[0].files[0].type !=  "application/vnd.ms-excel"){
			 	alert("Only csv files are allowed");

			 	var show=0;
				$.ajax({
					url : 'ajax.php',

			                   type : 'POST',
			                   data : {'request':'modifyuser','id':id,'show':show},
			                   success : function(data){
			                   	// alert(data);	                   	
			                   		if(data !=""){
			                   			$('#modifyuser').html(data).modal('show');
			                   			
			                   		}           		
			                   		 
			                   	}
				});

			 	return;
			 }
			 	
			 var formdata = new FormData();
			 var filename='test_'+Math.random()+'.csv';
			 formdata.append('file',file,filename);
			 formdata.append('id',id);
			 console.log(formdata);
			 $('#modifyuser #label_csv').show();
				
			
			$.ajax({

				url : 'ajax.php',
			                   type : 'POST',
			                   data :formdata,
			                   contentType:false,
			                   processData:false,
			                   success : function(data){
			                   	// alert(data);
			                   	// var data = JSON.parse(data);
			                   	// console.log("data"+JSON.stringify(data));
			        // //            	// // alert("data"+ data['skipusers'][0]);
			                   		if(data == 1){
			                   			alert(serverbusy);
			                   		}
			                   		else if( data == 'filenotsupported'){
			                   			alert(filealert);
			                   		}
			                   		else if(typeof(JSON.parse(data))=='object'){
			                   			var data = JSON.parse(data);

			                   			if( data.hasOwnProperty('skipusers') && data['skipusers'].length){
			                   				data['skipusers'].forEach(function(i){
			                   				alert(user+" "+i+" "+alertskip);
			                   				});
			                   			}
			                   			
			                   			if( data.hasOwnProperty('email') && data['email'].length){
			                   				data['email'].forEach(function(i){
			                   				alert(email1+" "+i+" "+alertskip);
			                   				});
			                   			}
			                   			
			                   			if( data.hasOwnProperty('classes') && data['classes'].length){
			                   				data['classes'].forEach(function(i){
			                   				alert(class1+" "+i+" "+classnotadd);

			                   				});
			                   			}
			                   			

			                   			$('#col4_'+id).text(data['usercount']);
			                   			alert(filename1+" "+importtodb);

			                   			var show=0;
											$.ajax({
												url : 'ajax.php',

										                   type : 'POST',
										                   data : {'request':'modifyuser','id':id,'show':show},
										                   success : function(data){
										                   	// alert(data);	                   	
										                   		if(data !=""){
										                   			$('#modifyuser').html(data).modal('show');
										                   			 $('#modifyuser #label_csv').hide();
										                   		}           		
										                   		 
										                   	}
											});


			                   		} 
			                   		else{

			                   		}          		
			                   		 
			                   	}
			                 
			});

		});

		$('#schooleditmodal').on('click',".modalbutton", function(){

			var id=this.id;
			alert(id);
			var clickedbtn=id.split('_')[0];
			alert(clickedbtn);
			if(clickedbtn == 'modifyclass'){
				id=id.split('_')[1];
				alert(id);
				var show=0;
				
				
				$.ajax({
					url : 'ajax.php',
                   type : 'POST',
                   data : {'request':'modifyclass','id':id,'show':show},
                   success : function(data){
                   	// alert(data);	                   	
                   		if(data !=""){
                   			$('#modifyclass').html(data).modal('show');
                   			
                   		}           		
                   		 
                   	}
				});
			}

			if(clickedbtn == 'modifyuser'){
				id=id.split('_')[1];
				alert(id);
				var show=0;
				$.ajax({
					url : 'ajax.php',

			                   type : 'POST',
			                   data : {'request':'modifyuser','id':id,'show':show},
			                   success : function(data){
			                   	// alert(data);	                   	
			                   		if(data !=""){
			                   			$('#modifyuser').html(data).modal('show');
			                   			
			                   		}           		
			                   		 
			                   	}
				});
			}
			
			
		});

	});


