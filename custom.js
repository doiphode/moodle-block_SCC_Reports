$(document).ready(function(){

	
	function timestamp(){

		var startdate=$('#dateselector').val();
			// alert(startdate);
			$('#dateform #startdate').val(startdate);
			// alert($('#dateform #startdate').val());
			$('#dateform').submit();
			

		

		
		
    	
    	
	}


	var datepicker =  $('#dateselector').datepicker({
		 format: 'dd-mm-yyyy',
		 footer: true,
		 modal: false,
		  header: false,
         change: function (e) {
             // alert('Change is fired');
             // datepicker.destroy();
             timestamp();
         }
     });
	$('#clear').click(function(){
		datepicker.value('');
		$('#dateform #startdate').val('');
		$('#dateform').submit();
		
	});

	$('#form1 #courselist').change(function(){


		$('#form1').submit();
	});


	$('input[type="checkbox"]').click(function(){
		var id = this.id;

		if(this.value == 0 ){
			this.value = 1;
		}
		else if(this.value == 1){
			this.value = 0;
		}
	});
		// alert('checked value : '+this.value);

		$('#save').click(function(){
			
			
			var courseid = $('#form2 #courselist').val();
			// alert('courseid : '+ courseid);

			var cmids  =  [];
			$('input[name = "actcomp"]:checked').each(function(){

					var id = this.id;
					id = id.split('_')[1];
					// alert('id : '+id);
					cmids.push(id);

			});
			cmid_encoded = JSON.stringify(cmids);
			var coursecomp = $('#coursecomp').val();
			// alert('coursecomp : '+coursecomp);
			
			// 
			$.ajax({

				url:'ajax.php',
				type:'POST',
				data:{'request' : 'savecompletionreport', 'coursecomp': coursecomp , 'courseid': courseid,'cmid_encoded': cmid_encoded},
				success:function(data){
					if(data == 1){
						$('#form2').submit();
					}

				}
			});


		});

	
});
/*$( "input:checked" ).val()*/