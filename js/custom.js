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

	
   
    
	
	// $.noConflict(true);
	
   
	$(document).ready(function(){
		require(['https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js']);
		require(['select2/dist/js/select2.min.js']);
		
		console.log('testing');

		
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
			/*added ones */
			var addedassale = $('#reqstrings #addedassale').val();
			var addedasemp = $('#reqstrings #addedasemp').val();
			var distrinotadd = $('#reqstrings #distrinotadd').val();
			var addedasdistri = $('#reqstrings #addedasdistri').val();
			var distridmissing = $('#reqstrings #distridmissing').val();
			var salesidmissing = $('#reqstrings #salesidmissing').val();
			var shopremovedmsg = $('#reqstrings #shopremovedmsg').val();
			var confirmmsg = $('#reqstrings #confirmmsg').val();
			var deletemsg = $('#reqstrings #deletemsg').val();
			var noshopadded = $('#reqstrings #noshopadded').val();
			var shopdelete =  $('#reqstrings #shopdelete').val();



		



		var t1= $("#distritable").DataTable({
            "order": [[ 0, "desc" ]]
        });

        var t= $("#sale_repritable").DataTable({
            "order": [[ 0, "desc" ]]
        });

        var t2 = $('#employee_table').DataTable({
            "order": [[ 0, "desc" ]]
        });

        var t3=$("#shoptable").DataTable({
				"columnDefs": [
		    { "orderable": false, "targets": 3 }
		  	]
		});

		

		// CUSTOM CODE BY WELKIN STARTS
		/* autocomplete feature on search */
				$('#distrimodal #email').keyup(function(e){
					
					if(e.which == 8 || e.which == 46){

 						e.preventDefault();
 						$('#pass').show();
 						return;
					}
			
					if($('#email').val().length >=6){
						
						var str = $('#email').val();
						$.ajax({
							url:'ajax.php',
							type: 'POST',
							data : {'request':'search','str':str,'table':'distributors'},
							success: function(data){
								// alert(data);
								if(typeof(JSON.parse(data) == 'object')){
										var data = JSON.parse(data);
									
		                   				$('#distrimodal #phoneno').val(data['phonenumber']);
		                   			
			                   		
			                   		
			                   			$('#distrimodal #address').val(data['address']);
			                   		

			                   		
			                   			$('#distrimodal #zipcode').val(data['zipcode']);
			                   		
			                   		
			                   			$('#distrimodal #website').val(data['website']);
			                   		
			                   		
			                   			$('#distrimodal #shopname').val(data['shopname']);
			                   		
			                   		
			                   			$('#distrimodal #firstname').val(data['firstname']);
			                   		
			                   		
			                   			$('#distrimodal #lastname').val(data['lastname']);
			                   		

			                   		
			                   			$('#distrimodal #position').val(data['position']);
			                   		
				                   		if(data['email'] != ""){
				                   			$('#distrimodal #email').val(data['email']);
				                   			$('#pass').hide();
				                   		}
				                   		if(data['email'] == ""){
				                   			$('#pass').show();
				                   		}

				                   		if(data['username'] != ""){
				                   			$('#distrimodal #username').val(data['username']);
				                   			
				                   		}
								}
								

							}
						});
					}
				});

				$('#sale_reprimodal .email').keyup(function(e){
					
					if(e.which == 8 || e.which == 46){

 						e.preventDefault();
 						$('#pass').show();
 						return;
					}
			
					if($('#email').val().length >=5){
						
						var str = $('#email').val();
						$.ajax({
							url:'ajax.php',
							type: 'POST',
							data : {'request':'search','str':str,'table':'sales_representative'},
							success: function(data){
								// alert(data);
								if(typeof(JSON.parse(data) == 'object')){
									var data = JSON.parse(data);
								
	                   				$('#sale_reprimodal #phoneno').val(data['phonenumber']);
	                   			
		                   		
		                   		
		                   			$('#sale_reprimodal #address').val(data['address']);
		                   		

		                   		
		                   			$('#sale_reprimodal #zipcode').val(data['zipcode']);
		                   		
		                   		
		                   		
		                   			$('#sale_reprimodal #firstname').val(data['firstname']);
		                   		
		                   		
		                   			$('#sale_reprimodal #lastname').val(data['lastname']);
		                   		

		                   		
		                   			$('#sale_reprimodal #position').val(data['position']);
		                   		
			                   		if(data['email'] != ""){
			                   			$('#sale_reprimodal #email').val(data['email']);
			                   			$('#pass').hide();
			                   		}
			                   		if(data['email'] == ""){
			                   			$('#pass').show();
			                   		}

			                   		if(data['username'] != ""){
			                   			$('#sale_reprimodal #username').val(data['username']);
			                   			
			                   		}
								}
								

							}
						});
					}
				});
			/* to display msg on hover */

			$('#add_distri').click(function(){
				$('#form1')[0].reset();
				$('#distrimodal #password').show();
				$('#distrimodal').modal('show');

			});




			$('#add_sale_repri').click(function(){
				var val = confirm('Make sure you have added shops!');
				if(val == true){
					$('#sale_reprimodal #password').show();
					var distriid = $('#form1 #distriid').val();
				
					$('#form1')[0].reset();
					$.ajax({
						url:'ajax.php',
						type: 'POST',
						data:{'request':'getshopoptions','distriid':distriid},
						success:function(data){
							if(data != ""){
								$('#shopids').html(data);
								
								$('#shopids').select2({
									placeholder: 'Search ...'
								});
							}
						}

					})
					$('#sale_reprimodal').modal('show');
				}
				
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
		$('#distrimodal #save').off().on('click',function(){

			$('#distrimodal #add_distrialert').hide();
			
			var username= $('#username').val();	
			var firstname = $('#firstname').val();
			var lastname = $('#lastname').val();
			var phonenumber= $('#phoneno').val();
			var address= $('#address').val();
			var zipcode= $('#zipcode').val();
			var website= $('#website').val();
			var shopname= '';
			var position= $('#position').val();
			var password = $('#password').val();
			var email = $('#email').val();

			
			
			$.ajax({
			 	url : 'ajax.php',

	               type : 'POST',
	               data : {'request':'savedistributor','username':username, 'firstname': firstname, 'phonenumber': phonenumber,'address':address,'zipcode':zipcode,'website':website,'shopname':shopname,'position':position,'lastname':lastname,'password':password,'email':email},
	               success : function(data){
	               
	               		if(data!= "" && data == 'emailinuse'){
	               			/*user not present*/
	               			alert(emailuse);
	               		}
	               		else if(data == 2){
	               			alert(addedasdistri);
	               		}
	               		else if(data == 'alreadyinsales'){
	               			alert(addedassale);
	               			$('#form1')[0].reset();

	               		}
	               		else if(data == 'alreadyemployee'){
	               			alert(addedasemp);
	               			$('#form1')[0].reset();

	               		}
	               		else if(data == 'usernameinuse'){
	               			 
	               			alert(user + " "+ alertadd);
	               			
	               		}
	               		else if(data == 0){
	               			$('#distrimodal #add_distrialert').show();
	               		}
	               		else if(typeof(JSON.parse(data)) == 'object'){
	               			$('#form1')[0].reset();
	               			var data=JSON.parse(data);
	               			t1.row.add(['<span id="col1_'+data['id']+'">'+data['id']+'</span>',
	               			'<span id="col3_'+data['id']+'"><a href="sales.php?userid='+data['userid']+'" target="_blank">'+firstname+' '+lastname+'</a></span>',
	               		 	
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
	               		
	               		 
	               }
			});

			
		});	


		// save button on sale_reprimodal
		$('#sale_reprimodal #save').off().on('click', function(){

			$('#sale_reprimodal #add_distrialert').hide();
			// $('#sale_reprimodal #usernotthere').hide();

			
			var username= $('#username').val();	
			var firstname = $('#firstname').val();
			var lastname = $('#lastname').val();
			var phonenumber= $('#phoneno').val();
			var address= $('#address').val();
			var zipcode= $('#zipcode').val();
			var website= $('#website').val();
			
			var position= $('#position').val();
			var password = $('#password').val();
			var email = $('#email').val();
			var shopids = $('#shopids').val();
				var shopnames = "";
			$('#shopids option:selected').each(function(){
				 
					shopnames += $(this).text()+"<br>";

			});
			// alert(shopnames);
			
				
			var distributorname = $('#distriname').val();
			
			var distriid= $('#distriid').val(); // from distributor table
			$.ajax({
				url : 'ajax.php',

               type : 'POST',
               data : {'request':'savesale_repri','username':username, 'firstname': firstname, 'phonenumber': phonenumber,'address':address,'zipcode':zipcode,'website':website,'shopids':shopids,'position':position,'distriid':distriid,'lastname':lastname,'email':email},
               success : function(data){
	               	if(data !="" && data == 'usernameinuse'){
	               		/*user not present*/
	               		alert(user + " " + alreadyexist);
	               	}
	               	else if(data != "" && data == 2){
	               		alert(notavailable);
	               		$('#sale_reprimodal #password').show();
	               		$('#form1')[0].reset();

	               		$('#shopids').val("").trigger("change");

	               	}
	               	else if(data != "" && data == 0){
	               		$('#sale_reprimodal #add_distrialert').show();
	               	}
	               	
	               else if(data != "" && data == 'distributornotadded'){
	               		alert(distrinotadd);
	               	}
	               	else if(data == 'alreadyindistri'){
	               			alert(addedasdistri);
	               			$('#form1')[0].reset();
	               			$('#shopids').val("").trigger("change");

	               		}
	               		else if(data == 'alreadyemployee'){
	               			alert(addedasemp);
	               			$('#form1')[0].reset();
	               			$('#shopids').val("").trigger("change");

	               		}
	               	else if( data != "" && typeof(JSON.parse(data)) == 'object'){

       						var data=JSON.parse(data);
                   			t.row.add(['<span id="col1_'+data['id']+'">'+data['id']+'</span>',
                   			'<span id="col3_'+data['id']+'"><a href="employee.php?salesid='+data['id']+'" target="_blank">'+firstname+' '+lastname+'</a></span>',
                   			'<span id="col6_'+data['id']+'">'+data['distriname']+'</span>', 

                   		 	'<span id="col2_'+data['id']+'">'+shopnames+'</span>',

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
			var name = $('#name2').val();
			var phonenumber= $('#phoneno2').val();
			var address= $('#address2').val();
			var zipcode= $('#zipcode2').val();
			var website= $('#website2').val();
			var shopname= '';
			var position= $('#position2').val();

			$.ajax({
			 	url : 'ajax.php',

               type : 'POST',
               data : {'request':'updatedistributor','username':username, 'name': name, 'phonenumber': phonenumber,'address':address,'zipcode':zipcode,'website':website,'shopname':shopname,'position':position,'distriid':distriid},
               success : function(data){
		               	if(data != "" && data == "fail"){
		               		$('#distrimodaledit #add_distrialert').show();
		               	}
		               	if(data != "" && data == 2){
		               		/*distributor id donot exist */
		               		alert(distridmissing);

		               }
		               else if(typeof(JSON.parse(data)) == 'object'){
		               		var data = JSON.parse(data);
		               		alert(updated);
		               		var distributorname = name;
		               		
		               		$('#distritable #col3_'+distriid).html('<a href="sales.php?userid='+data['userid']+'" target="_blank">'+name+'</a></span>');
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
			
			var position= $('#position2').val();
			var shopids2 = $('#shopids2').val();
				var shopnames = "";
			$('#shopids2 option:selected').each(function(){
				 
					shopnames += $(this).text()+"<br>";

			});
			// alert(shopnames);

			$.ajax({
			 	url : 'ajax.php',

               type : 'POST',
               data : {'request':'updatesales_repri','phonenumber': phonenumber,'address':address,'zipcode':zipcode,'position':position,'distriid':distriid,'salesid':salesid,'username':username,'shopids2':shopids2,},
               success : function(data){
	               	if(data != "" && data == 'fail'){
	               		$('#salesmodaledit #add_distrialert').show();
	               	}
	               	if(data != "" && data == 2){
	               		/*sales id donot exist */
			            alert(salesidmissing);

	               	}
	               	if(typeof(JSON.parse(data)) == 'object'){

	               		var data = JSON.parse(data);

	               		alert(shopremovedmsg  + data["shopsremoved"]);

	               	}
	               	if(data != "" && data == 1){
	               		alert(updated);
	               		// location.reload(true);
	               		$('#col2_'+salesid).html(shopnames);
	               		$("button[data-dismiss=\"modal\"]").click();

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
			var confirm1 = confirm(confirmmsg);
			if(confirm1 == 1){


				$.ajax({
				 	url : 'ajax.php',

	               type : 'POST',
	               data : {'request':'salesdelete','salesid':salesid,'distriid':distriid},
	               success : function(data){
	               	// alert(data);	
		               	if(data == 'employeeexist') {
		               		alert(deletemsg);
		               	}                  	
	               		else if(data == 'success'){
	               			t.row('#row_'+salesid).remove().draw(false);	

	               		} 
	               		else
	               		{
	               			alert('Error Deleting!');
	               		}

	               		return;  
	               	}
				});
			}

		});

		/*delete button on distritable table */
		$('#distritable').on('click',".delete_btn", function(){

			var distriid = this.id;
			distriid = distriid.split('_');
			distriid = distriid[2];
			var confirm1 = confirm(confirmmsg);
			if(confirm1 == true){
				
		               		
		               		
       			$.ajax({
       				url : 'ajax.php',

   					type : 'POST',
  					data : {'request':'confirmdelete','distriid':distriid},
   					success : function(data){
   						if(data == 'employeeexist'){
   							alert(deletemsg);
   						}
   						else if(data == 'success'){
   							t1.row('#row_'+distriid).remove().draw(false);
   						}
   						
   					}


       			});
		               		

		               	
			}




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
               				$('#distrimodaledit #name2').val(data['name']);
               				$('#distrimodaledit #phoneno2').val(data['phonenumber']);
               				$('#distrimodaledit #address2').val(data['address']);
               				$('#distrimodaledit #zipcode2').val(data['zipcode']);
               				$('#distrimodaledit #website2').val(data['website']);
               				$('#distrimodaledit #shopname2').val(data['shopname']);
               				$('#distrimodaledit #position2').val(data['position']);
               				$('#distrimodaledit').modal('show');

               			}
               			
               			
               		}  
               		return;          		
               		 
               	}
			});

		});

		/*edit button  sale_repritable, opens edit modal*/
		

		$('#sale_repritable').on('click','.edit_btn', function(){

			var check = 0;
			var salesid=this.id;
			salesid=salesid.split('_')[2];
			var data1 = [];
			$.ajax({
 				url : 'ajax.php',

               type : 'POST',
               data : {'request':'distrieditbutton','id':salesid,'table':'sales_representative'},
               success : function(data){
               		console.log(JSON.stringify(data));	                   	
               		if(data !=""){
               			if(typeof(JSON.parse(data)) == 'object'){
               				var data = JSON.parse(data);
               				var distriid =$('#form1 #distriid').val();
               				
               				$('#salesid').val(salesid);
               				$('#salesmodaledit #username2').val(data['username']);
               				$('#salesmodaledit #distriname2').val(data['name']);
               				$('#salesmodaledit #name').val(data['name']);
               				$('#salesmodaledit #phoneno2').val(data['phonenumber']);
               				$('#salesmodaledit #address2').val(data['address']);
               				$('#salesmodaledit #zipcode2').val(data['zipcode']);
               				$('#salesmodaledit #website2').val(data['website']);
               				// $('#salesmodaledit #shopids2').append(data['shop_ids']);
               				$('#salesmodaledit #position2').val(data['position']);
               				$.ajax({
               					url:'ajax.php',
               					type:'POST',
               					data: {'request':'getshopoptions','distriid':distriid},
               					success: function(data1){
               						if(data1 !=""){
               							$('#shopids2').html(data1);
               							$('#shopids2').select2({
               								placeholder:'Search ...'
               							});
               					
               						$('#shopids2').val(data['shop_ids']).trigger("change");
               						$('#salesmodaledit').modal('show');

               						}
               						else{
               							alert(noshopadded);
               							$('#salesmodaledit').modal('show');
               						}

               					}
               				});
               					

               			}
               			
               		}  

               		

               }


			});

			


		});

		




		/* add shop clicked */
	$('#add_shop').click(function(){

		var distriid = $('#form1 #distriid').val();
		$.ajax({

			url : 'ajax.php',

           type : 'POST',
           data : {'request':'addshop','distriid':distriid},
           success : function(data){
           	$('#shoplist').html(data).modal('show');
           }
		});
	});

	$('#shoplist').on('click','#addshop_table',function(){
		$('#addshop_modal #add_distrialert').css({'display':'none'});
			$('#form2')[0].reset();
					// alert('clicked');
		$('#shoplist').modal('hide');
		$('#addshop_modal').modal('show');
	});

		$('#saveshop').click(function(){
			
			var distriid = $('#addshop_modal #distriid').val();
			var shopname = $('#addshop_modal #shopname').val();
			var distriname = $('#addshop_modal #distriname').val();
			var phoneno = $('#addshop_modal #phoneno').val();
			// alert(distriid +' '+ ' '+shopname+ ' '+distriname+ ' '+phoneno);
			
			$.ajax({
				url : 'ajax.php',

          		 type : 'POST',
				 data : {'request':'saveshop','distriid':distriid,'shopname':shopname,'phoneno':phoneno},
				success:function(data){
					// alert(data);

					if(data == 0){

						$('#addshop_modal #add_distrialert').show();

					}
					else if(data == 1){

						$('#addshop_modal').modal('hide');
						$('#add_shop').click();
					}

				}
			});

		});



		$('#shoplist').on('click','#shoptable .edit_btn',function(){
			

			id = this.id;
			id = id.split('_')[2];
			
			
			$('#shoptable .final_'+id).hide();
			$('#shoptable .edit_'+id).show();
			return; 


		});

		$('#shoplist').on('click','.update_btn',function(){
			id = this.id;
			id= id.split('_')[2];
			var phoneno = $('#shoplist #editnumber_'+id).val();
			var shopname = $('#shoplist #editshop_'+id).val();

			$.ajax({
				url : 'ajax.php',
				type : 'POST',
				data : {'request':'updateshop','phoneno':phoneno,'shopname':shopname,'shopid':id},
				success: function(data){
					
					if(data == 1){
						$('#shoplist #col3_'+id).text(shopname);
						$('#shoplist #col5_'+id).text(phoneno);

						$('#shoptable .final_'+id).show();
						$('#shoptable .edit_'+id).hide();
						location.reload(true);

					}
					return; 

				}
			})



		});

		$('#shoplist').on('click','.delete_shop', function(){
			id= this.id;
			id = id.split('_')[2];
			var confirm1 = confirm('Confirm to delete!');
			if(confirm1 == 1){
				$.ajax({
					url : 'ajax.php',
					type : 'POST',
					data : {'request':'deleteshop','shopid':id},
					success: function(data){
						if(data == 'employeeexist'){
							alert(shopdelete);

						}
						if(data == 'success'){
							t3 = $('#shoptable').DataTable();
	               			t3.row('#row_'+id).remove().draw(false);	

	               		} 
	               		return; 
					}
				});
			}

		});


		/*employee page add existing btn (only for admin)*/
		$('#add_existing_btn').on('click',function(){
			$('#dealerdiv').hide();
			$('#user #shopids').select2({
					placeholder: 'Search ...'
			});
			$('#addexisting').modal('show');
		});

		/*email search in existing user form */ 
		$('#user #email').off().on('keyup',function(e){
					
					if(e.which == 8 || e.which == 46){

 						e.preventDefault();
 						$('#dealerlist').html("");
						$('#dealerdiv').hide();
						$('#dealerlist').select2({
							placeholder: 'Search...'
						});
						$('#addexisting #nomatch').hide();
 						
 						return;
					}


					if($('#email').val().length >=5){
						
						var str = $('#email').val();
						$.ajax({
							url : 'ajax.php',
							type : 'POST',
							data : {'request':'getdealers','str':str},
							success: function(data){
									// alert(data);
									if(data == 0){
										$('#addexisting #nomatch').show();
										$('#dealerlist').html("");
										$('#dealerdiv').hide();
										$('#dealerlist').select2({
											placeholder: 'Search...'
										});

									}
									else if(typeof(JSON.parse(data) == 'object')){
										$('#addexisting #nomatch').hide();
										var data = JSON.parse(data);
										$('#user #email').val(data['email']);

										$('#dealerlist').html(data['options']);
										$('#dealerdiv').show();
										$('#dealerlist').select2({
											placeholder: 'Search...'
										});

									}
							}
						});

					}




				});

		$('#user #save').off().on('click',function(){
			var salesid = $('#salesid').val();
			var shopids = $('#user #shopids').val();
			var dealerid = $('#user #dealerlist').val();
			// alert('userid : '+dealerid);
			if(dealerid == "" ){
				alert('No dealer choosen!');
				return;
			}
			if(shopids == ""){
				alert('No shop choosen!');
				return;
			}
			$.ajax({
				url: 'ajax.php',
				type:'POST',
				data: {'request':'existingdealersave','shopids':shopids,'dealerid':dealerid,'salesid':salesid},
				success:function(data){
					// alert(data)
						if(data == 0){
							alert('Error adding!');
						}
						else if(data == 1){
							alert('Added successfully!');
							$('#dealerlist').html("");
							$('#dealerdiv').hide();
							$('#dealerlist').select2({
								placeholder: 'Search...'
							});
							$('#user #shopids').val("");
							$('#user #shopids').select2({
								placeholder: 'Search ...'
							});
							
							$('#user')[0].reset();
						}

				}
			});

		});

		$('#user #finish').on('click',function(){
			location.reload(true);
		});

		$("#employee_table .delete_btn").on('click',function(){
			var userid = this.id;
			userid = userid.split('_');
			userid = userid[2];
			var salesid = $('#user #salesid').val();
			console.log('testing : '+confirmmsg);
			var confirm1 = confirm(confirmmsg);
			if(confirm1 == true){

				$.ajax({
					url:'ajax.php',
					type:'POST',
					data: {'request':'deletedealer','userid':userid,'salesid':salesid},
					success:function(data){
						// alert(data);
						if(data == 1){
							t2.row('#row_'+userid).remove().draw(false);	
						}

					}
				});
			}
		});

		
	});
	

    	
   








		
		

		
