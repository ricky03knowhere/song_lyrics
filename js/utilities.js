//  <!--  Sorter Lyrics title by Abjad  -->
function sorterList(data){
	let result = data.sort((a,b) => {
	let x = a.title.toLowerCase();
	let y = b.title.toLowerCase();
	
	if(x < y){
		return -1;
	}else{
		return 1;
	}
	return 0;
	})
	
	return result;
}

function sorterTime(data){
	let result = data.sort((a,b) => {
	let x = a.date;
	let y = b.date;
	
	if(x < y){
		return -1;
	}else{
		return 1;
	}
	return 0;
	})
	
	return result;
}
//  <!--  Sorter Array by Abjade  -->
function sorter(data){
	let result = data.sort((a,b) => {
	let x = a.toLowerCase();
	let y = b.toLowerCase();
	
	if(x < y){
	return -1;
	}else{
	return 1;
	}
	return 0;
	})
	
	return result;
}

//  <!--  Eliminate duplicate array item -->
function uniqueLetter(array) { 

	let result = Array.from(new Set(array)); 
	return result 

}

//  <!--  Create Modal by Genre -->
function modal(data){

	$("body").append(`
		<div class="modal fade animate" id="`+data+`" tabindex="-1" aria-labelledby="'+data+'">
		<div class="modal-dialog genres">
		<div class="modal-content animate-bottom">
		<div class="modal-header">
		<h3 class="modal-title" id="add">`+data+`</h3>
		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		<span aria-hidden="true"><i class="fa fa-angle-down"></i></span>
		</button>
		</div>
		
		<div class="modal-body">
		<div class="list-group text-left `+data+`">	
		
		</div>
		</div>

		</div>
		</div>
		</div>
	
	`)
}