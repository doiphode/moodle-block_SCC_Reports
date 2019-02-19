var yr2;
alert('working');

	
 
	function lastpages(){

		alert('lastpage');
		$('#lastpage').submit();
	}

	function firstpages(){

		alert('firstpage');
		$('#firstpage').submit();
	}

	function sortbasis(col){

		//alert('col'+col);

		$('#form4 #sortcol').val(col);
		var sortorder=$('#form4 #sortorder').val();
		if(sortorder == 1){
			$('#form4 #sortorder').val(0);
			
			
		}	
		if(sortorder == 0){
			$('#form4 #sortorder').val(1);
			
		}
		
		$('#form4').submit();

	}

	function printable(){
		$('#form2').submit();
	}

	function excel(){
		$('#form3').submit();
	}



$(document).ready(function(){

	

	$('#myTab a').on('click', function (e) {

	 	$(this).tab('show');

		var yr=this.id;
		var arr_yr =yr.split("_");
		  yr2=arr_yr[1];
	 	 document.getElementById("inputfield").value=yr2;
	 	document.getElementById("inputfieldform3").value=yr2;
	 		// var tabselected=$(this).attr('href');
	 			$('#form1').submit ();

	});


	$('#sel1').change(function(){
			 $('#form1').submit();
	});

	$('#sel2').change(function(){
			 $('#form5').submit();
	});

	$('#printbutton').click(function(){
		// alert("inside print");
		$('#form2').submit();

	});

	$('#excelbutton').click(function(){

		$('#form3').submit();

	});

	

});


 