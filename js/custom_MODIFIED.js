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
			var usernotthere =  $('#reqstrings #usernotthere').val();
			var updated  = $('#reqstrings #updated').val();
			var notavailable = $('#reqstrings #notavailable').val();



		var t1= $("#distritable").DataTable({
            "order": [[ 0, "desc" ]]
        });

        var t= $("#sale_repritable").DataTable({
            "order": [[ 0, "desc" ]]
        });

        var t2 = $('#employee_table').DataTable({
            "order": [[ 0, "desc" ]]
        });
       
		

		// CUSTOM CODE BY WELKIN STARTS
		/* autocomplete feature on search */
				$('#search').keyup(function(e){
					if(e.which == 8 || e.which == 46){

 						e.preventDefault();
 						return;
					}
			
					if($('#search').val().length >=5){
						
						var str = $('#search').val();
						$.ajax({
							url:'ajax.php',
							type: 'POST',
							data : {'request':'search','str':str},
							success: function(data){
								if(data != ""){
									$('#search').val(data);
								}
								

							}
						});
					}
			});
			/* to display msg on hover */

			$('#add_distri').click(function(){
				$("#showmsg2").hide();
				var search = $('#search').val();
				if(search == ""){
					$('#form1')[0].reset();
					$('#distrimodal').modal('show');
				}
				else{
					var email = $('#search').val();
					$.ajax({
						url: 'ajax.php',
						type : 'POST',
						data : {'request':'checkuser','email':email},
		                success : function(data){

		                	if(data == 'fail'){
		                   		alert(usernotthere);
		                   	}

		                   	else if(typeof(JSON.parse(data))=='object'){
		                   			$('#search').val('');
		                   		var data =JSON.parse(data);
		                   		if(data['phonenumber'] != ""){
		                   			$('#distrimodal #phoneno').val(data['phonenumber']);
		                   		}
		                   		if(data['username'] != ""){
		                   			$('#distrimodal #username').val(data['username']);
		                   		}
		                   		if(data['address'] != ""){
		                   			$('#distrimodal #address').val(data['address']);
		                   		}

		                   		if(data['zipcode'] != ""){
		                   			$('#distrimodal #zipcode').val(data['zipcode']);
		                   		}
		                   		if(data['website'] != ""){
		                   			$('#distrimodal #website').val(data['website']);
		                   		}
		                   		if(data['shopname'] != ""){
		                   			$('#distrimodal #shopname').val(data['shopname']);
		                   		}
		                   		if(data['distributorname'] != ""){
		                   			$('#distrimodal #distriname').val(data['distributorname']);
		                   		}
		                   		if(data['position'] != ""){
		                   			$('#distrimodal #position').val(data['position']);
		                   		}



		                   		$('#distrimodal').modal('show');

		                   	}

		                   	 
		                }

					});

				}


			});




			$('#add_sale_repri').click(function(){
				
				$('#form1')[0].reset();
					$('#sale_reprimodal').modal('show');
			});
			

			$('#search').mouseover(function(e){

				$("#showmsg1").show().delay(2000).fadeOut();
				
			});

			$('#search').mouseout(function(e){
				$("#showmsg1").hide();
			});

			$('#add_distri').mouseover(function(e){
				$("#showmsg2").hide();
			});

			$('#add_distri').mouseover(function(e){
				
						
						$("#showmsg2").show().delay(1000).fadeOut();
					
				
			});
		// CUSTOM CODE BY WELKIN ENDS
		// save button on distrimodal
		$('#distrimodal #save').on('click',function(){

			$('#distrimodal #add_distrialert').hide();
			
			var username= $('#username').val();	
			var distributorname = $('#distriname').val();
			var phonenumber= $('#phoneno').val();
			var address= $('#address').val();
			var zipcode= $('#zipcode').val();
			var website= $('#website').val();
			var shopname= $('#shopname').val();
			var position= $('#position').val();

			
			
			$.ajax({
			 	url : 'ajax.php',

	               type : 'POST',
	               data : {'request':'savedistributor','username':username, 'distributorname': distributorname, 'phonenumber': phonenumber,'address':address,'zipcode':zipcode,'website':website,'shopname':shopname,'position':position},
	               success : function(data){
	               
	               		 $('#form1')[0].reset();

	               		if(typeof(JSON.parse(data)) == 'object'){
	               			var data=JSON.parse(data);
	               			t1.row.add(['<span id="col1_'+data['id']+'">'+data['id']+'</span>',
	               			'<span id="col3_'+data['id']+'">'+data['firstname']+' '+data['lastname']+'</span>',
	               		 	'<span id="col2_'+data['id']+'">'+distributorname+'</span>',
	               		 	'<span id="col4_'+data['id']+'">'+data['usercount']+'</span>',
	               		 	'<span id="col1_'+data['id']+'">'+
	               		 	'<button class="edit_btn" data-toggle="modal" data-target="#schooledit" id="edit_row_'+data['id']+'" style="background-color: transparent;border: none;">'+
	               		 	'<i class="fa fa-pencil" aria-hidden="true"> </i> </button> '+
	               		 	'<button  class="delete_btn" id="delete_row_'+data['id']+'" style="background-color: transparent;border: none;">'+
	               		 	'<i class="fa fa-trash" aria-hidden="true"></i></button>'+
	               		 	'</span>']).node().id='row_'+data['id'];
	               		 	t1.draw(false);
	               		 	// $('#schoolmodal').modal('hide');
	               		 	$("button[data-dismiss=\"modal\"]").click();

	               		}
	               		else if(data!= "" && data == 3){
	               			/*user not present*/
	               			alert(usernotthere);
	               		}
	               		else if(data == 2){
	               			alert(alreadyexist);
	               		}
	               		else if(data == 0){
	               			 $('#username').val(username);	
							 $('#distriname').val(distributorname);
							$('#phoneno').val(phonenumber);
							 $('#address').val(address);
							 $('#zipcode').val(zipcode);
							 $('#website').val(website);
							 $('#shopname').val(shopname);
							$('#position').val(position);

	               			$('#distrimodal #add_distrialert').show();
	               		}
	               		
	               		 
	               }
			});

			
		});	


		// save button on sale_reprimodal
		$('#sale_reprimodal #save').on('click', function(){

			$('#sale_reprimodal #add_distrialert').hide();
			// $('#sale_reprimodal #usernotthere').hide();
			var username= $('#username').val();	
			var distributorname = $('#distriname').val();
			var phonenumber= $('#phoneno').val();
			var address= $('#address').val();
			var zipcode= $('#zipcode').val();
			var website= $('#website').val();
			var shopname= $('#shopname').val();
			var position= $('#position').val();
			var distriid= $('#distriid').val(); // from distributor table
			$.ajax({
				url : 'ajax.php',

               type : 'POST',
               data : {'request':'savesale_repri','username':username, 'distributorname': distributorname, 'phonenumber': phonenumber,'address':address,'zipcode':zipcode,'website':website,'shopname':shopname,'position':position,'distriid':distriid},
               success : function(data){
	               	if(data !="" && data == 3){
	               		/*user not present*/
	               		alert(usernotthere);
	               	}
	               	if(data != "" && data == 2){
	               		alert(notavailable);
	               	}
	               	if(data != "" && data == 0){
	               		$('#sale_reprimodal #add_distrialert').hide();
	               	}
	               	if(data != "" && data == 'distributornotadded'){
	               		alert('Distributor is not added!');
	               	}
	               	else if( data != "" && typeof(JSON.parse(data)) == 'object'){

       						var data=JSON.parse(data);
                   			t.row.add(['<span id="col1_'+data['id']+'">'+data['id']+'</span>',
                   			'<span id="col3_'+data['id']+'">'+data['firstname']+' '+data['lastname']+'</span>',
                   		 	'<span id="col2_'+data['id']+'">'+distributorname+'</span>',
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

               }
			});

		});


		/*update button on distrieditmodal*/

		$('#distrimodaledit .update').on('click',function(){

			$('#distrimodaledit #add_distrialert').hide();
			// $('#distrieditmodal #usernotthere').hide();
			var distriid = $('#distriid').val();
			var username= $('#username2').val();	
			var distributorname = $('#distriname2').val();
			var phonenumber= $('#phoneno2').val();
			var address= $('#address2').val();
			var zipcode= $('#zipcode2').val();
			var website= $('#website2').val();
			var shopname= $('#shopname2').val();
			var position= $('#position2').val();

			$.ajax({
			 	url : 'ajax.php',

               type : 'POST',
               data : {'request':'updatedistributor','username':username, 'distributorname': distributorname, 'phonenumber': phonenumber,'address':address,'zipcode':zipcode,'website':website,'shopname':shopname,'position':position,'distriid':distriid},
               success : function(data){
		               	if(data != "" && data == "fail"){
		               		$('#distrimodaledit #add_distrialert').show();
		               	}
		               	if(data != "" && data == 2){
		               		/*distributor id donot exist */
		               		alert('Missing distributor id!');

		               }
		               else if(data == 1){
		               		alert(updated);
		               		var distributorname = $('#distriname2').val();
		               		
		               		$('#distritable #col2_'+distriid).text(distributorname);
		               		$("button[data-dismiss=\"modal\"]").click();


		               }
				 }



			});
		});

		/* update button on salesmodaledit */
		$('#salesmodaledit .update').on('click',function(){
			$('#salesmodaledit #add_distrialert').hide();
			// $('#distrieditmodal #usernotthere').hide();
			var salesid = $('#salesid').val();
			var distriid  = $('#distriid').val();
			var username= $('#username2').val();	
			var distributorname = $('#distriname2').val();
			var phonenumber= $('#phoneno2').val();
			var address= $('#address2').val();
			var zipcode= $('#zipcode2').val();
			var website= $('#website2').val();
			var shopname= $('#shopname2').val();
			var position= $('#position2').val();

			$.ajax({
			 	url : 'ajax.php',

               type : 'POST',
               data : {'request':'updatesales_repri','phonenumber': phonenumber,'address':address,'zipcode':zipcode,'website':website,'shopname':shopname,'position':position,'distriid':distriid,'salesid':salesid,'username':username},
               success : function(data){
	               	if(data != "" && data == 'fail'){
	               		$('#salesmodaledit #add_distrialert').show();
	               	}
	               	if(data != "" && data == 2){
	               		/*sales id donot exist */
			            alert('Missing Sales Representative id!');

	               	}
	               	if(data != "" && data == 1){
	               		alert(updated);
	               		$("button[data-dismiss=\"modal\"]").click();

	               	}
               }
           });




			
		});
		


		

		/* save button on modifyuser when clicked on adduser */
		$('#modifyuser').on('click',".saveedit",function(){

					// alert('click');	
					var username= $('#username_adduser').val().toLocaleLowerCase();
					var password=$('#passwd').val();
					var firstname=$('#firstname').val();
					var surname=$('#surname').val();
					
						var email=$('#email').val().trim();
					
					
					// alert(username+"" +password+""+firstname+""+email);	

			if(validateEmail(email)){
				$.ajax({
					url : 'ajax.php',

			                   type : 'POST',
			                   data : {'request':'addusersave','username':username,'password':password,'firstname':firstname,
			                   'surname':surname,'email':email},
			                   success : function(data){
			                   // console.log(typeof(JSON.parse(data)));
			                   	if(data != ""){
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
			                   	}
			                   	else{
			                         		alert(user+ " "+savestring+"!");
			                    }
			                   
							}
				});
			}
			else{
				alert(entervalidemail);
			}
					
				
		});


		/*add user button on modifyuser*/
		$('#adduser').on('click',function(){
			
			
			$.ajax({
					url : 'ajax.php',
		           type : 'POST',
	                   data : {'request':'modifyuser'},
	                   success : function(data){
	                   	// alert(data);	                   	
	                   		if(data !=""){
	                   			$('#modifyuser').html(data).modal('show');
	                   			
	                   		}           		
	                   		 
	                   	}
			});
		});

		

		/*delete button on sale_repritable table */
		$('#sale_repritable').on('click',".delete_btn", function(){

			var salesid=this.id;
			salesid = salesid.split('_')[2]; /*school id */
			var distriid = $('#sale_reprimodal #distriid').val();
			// alert(salesid);
			// $('#sale_repritablediv #schoolalertlabel').hide();
			$.ajax({
			 	url : 'ajax.php',

               type : 'POST',
               data : {'request':'salesdelete','salesid':salesid,'distriid':distriid},
               success : function(data){
               	// alert(data);	                   	
               		if(data == 'success'){
               			t.row('#row_'+salesid).remove().draw(false);	

               		} 
               		else
               		{
               			alert('Error Deleting!');
               		}

               		 
               	}
			});

		});

		/*delete button on distritable table */
		$('#distritable').on('click',".delete_btn", function(){

			var distriid = this.id;
			distriid = distriid.split('_');
			distriid = distriid[2];
			$.ajax({
				url : 'ajax.php',

               type : 'POST',
               data : {'request':'distridelete','distriid':distriid},
               success : function(data){
               	// alert(data);	
	               	if(data !="" && data == 0){
	               		var confirm1 = confirm('confirm to delete !');
	               		if(confirm1 == true){
	               			$.ajax({
	               				url : 'ajax.php',

               					type : 'POST',
              					data : {'request':'confirmdelete','distriid':distriid},
               					success : function(data){
               						t1.row('#row_'+distriid).remove().draw(false);
               					}


	               			});
	               		}

	               	}
	               	if(data != "" && data == 'success'){

	               		t1.row('#row_'+distriid).remove().draw(false);	
	               	}
               }


			});




		});

		/*edit button distritable, opens edit modal*/
		$('#distritable').on('click',".edit_btn", function(){
			var id=this.id;
			id=id.split('_')[2];
			// alert(id);
			$.ajax({
			 	url : 'ajax.php',

               type : 'POST',
               data : {'request':'distrieditbutton','id':id,'table':'distributors'},
               success : function(data){
               console.log(JSON.stringify(data));	                   	
               		if(data !=""){
               			if(typeof(JSON.parse(data)) == 'object'){
               				var data = JSON.parse(data);
               				
               				$('#distriid').val(id);
               				$('#distrimodaledit #username2').val(data['username']);
               				$('#distrimodaledit #distriname2').val(data['name']);
               				$('#distrimodaledit #phoneno2').val(data['phonenumber']);
               				$('#distrimodaledit #address2').val(data['address']);
               				$('#distrimodaledit #zipcode2').val(data['zipcode']);
               				$('#distrimodaledit #website2').val(data['website']);
               				$('#distrimodaledit #shopname2').val(data['shopname']);
               				$('#distrimodaledit #position2').val(data['position']);
               				$('#distrimodaledit').modal('show');

               			}
               			
               			
               		}           		
               		 
               	}
			});

		});

		/*edit button  sale_repritable, opens edit modal*/

		$('#sale_repritable').on('click','.edit_btn', function(){

			var salesid=this.id;
			salesid=salesid.split('_')[2];
			$.ajax({
 				url : 'ajax.php',

               type : 'POST',
               data : {'request':'distrieditbutton','id':salesid,'table':'sales_representative'},
               success : function(data){
               		console.log(JSON.stringify(data));	                   	
               		if(data !=""){
               			if(typeof(JSON.parse(data)) == 'object'){
               				var data = JSON.parse(data);
               				
               				$('#salesid').val(salesid);
               				$('#salesmodaledit #username2').val(data['username']);
               				$('#salesmodaledit #distriname2').val(data['name']);
               				$('#salesmodaledit #phoneno2').val(data['phonenumber']);
               				$('#salesmodaledit #address2').val(data['address']);
               				$('#salesmodaledit #zipcode2').val(data['zipcode']);
               				$('#salesmodaledit #website2').val(data['website']);
               				$('#salesmodaledit #shopname2').val(data['shopname']);
               				$('#salesmodaledit #position2').val(data['position']);
               				$('#salesmodaledit').modal('show');

               			}
               			
               		}   

               }


			});
		});

	});

		
		

		
