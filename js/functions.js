function genreLists(){
	$("#genre .row").empty()
	$(".modal .animate").remove()
	$(".modal-body .list-group").empty()
	
	//  <!--  Get List of genre  -->
	let result = []
	genres.map((data,i) => {
		let x = data.genre
		result.push(x.toLowerCase())
	})
	let genreList = sorter(result)
	let listsort = sorterList(list)

	//  <!--  Create Modal & Card by genre   -->
	$.each(genres,(i,data) => {
		modal(data.genre)
	
		$("#genre .row").append(`
		<div class="card">
		<img class="card-img-top" src="img/`+data.img+`"
		alt="Card image cap" data-toggle="modal" data-target="#`+data.genre+`">
		<div class="card-body">
		<h2 class="card-title">`+data.genre+`</h2>
		<h3 class="card-subtitle mb-2 text-muted">`+data.desc+`</h3>

		</div>
		
		</div>
	`)
	
})

	//  <!--  Insert Lyrics By genre to Modal -->
	$.each(listsort,(i,data) => {
	for(let x of genreList){
		switch(data.genre){
		case x :
		$("#"+x+" .modal-body ."+x).append(`
			<a href="lyrics/`+data.link+`" class="list-group-item list-group-item-action">
			<h5 class="text-info" ><b>`+data.title+`</b></h5>
			<span class="text-muted" >`+data.artist+`</span>
			</a>
		`)
		}
		}
	})
}


function lyrics(list,sorter = "1"){
	$('.lyrics').empty()
	
	let lists = []
	switch(sorter){
		case "1" :
		lists = sorterList(list)
		break
		case "2" :
		lists = sorterList(list).reverse()
		break
		case "3" :
		lists = sorterTime(list).reverse()
		break
		case "4" :
		lists = sorterTime(list)
		break	
	}
		

	$.each(lists,(i,data) => {
	
	$('.lyrics').append(
	`<a href="lyrics/`+data.link+`" class="list-group-item list-group-item-action">
	<h5 class="text-info" ><b>`+data.title+`</b></h5>
<span class="badge bg-gradient-primary">`+data.year+`</span>
	<span class="text-muted" >`+data.artist+`</span>
	</a>
	`);
	})
}


function search(){
	$('.lyrics').empty()
	$("#accordion").empty()
	
	let key = $(".keyword").val()

	let contentLyr = list.filter(i => i.title.includes(key))
	let contentArt = list.filter(i => i.artist.includes(key))

	if( (contentLyr[0] != undefined ) || (contentArt[0] != undefined)){
		lyrics(contentLyr)
		artists(contentArt)
	}else{
		$('.lyrics').append(`
		<div class="alert bg-gradient-primary" role="alert">
			<span>404</span> Lyrics not found!
		</div>
		`)
		$("#accordion").append(`
		<div class="alert bg-gradient-primary" role="alert">
			<span>404</span> Singers not found!
		</div>
		`)
	}
}


function artists(list){

	$("#accordion").empty()
	
	let letters = [
				"a","b","c","d","e",
			  	"f","g","h","i","j",
				"k","l","m","n","o",
				"p","q","r","s","t",
				"u","v","w","x","y","z"
			 ]
			 
	//  <!--  Create List of Letter  -->
	$.each(letters,(i,letter) => {
	
	$("#accordion").append(`
 	 <div class="letter `+letter+` hidden">
		 <span class="capital hidden">`+letter+`</span>
 	 </div>
	`)		
	})

//  <!--  Get Artist name  -->
let artistsList = []
list.map((data,i) => {
	let x = data.artist
	artistsList.push(x.toLowerCase())
})

//  <!--  Eliminate of duplicate Artist name  -->
let filtered = sorter(uniqueLetter(artistsList))

//  <!-- Destructering of the artist name -->
let firstLet = []
filtered.map((data,i) => {

let x = [...data.toLowerCase()]
firstLet.push(x)

})


$.each(firstLet,(i,data) => {

//  <!--  Get artist name for nameId  -->
let artistId = data.join('').split(' ').join('_')


//  <!--  Get the Initial of artist name &  -->
//  <!--  Grouping Artist by Abjade  -->
for(let z of letters){
	switch(data[0]){
		case z :
		$(".letter."+z).removeClass("hidden")
		$(".letter."+z+" .capital").css("opacity","1")
		$(".letter."+z).append(`
<div class="card">

<div class="card-header bg-gradient-info" id="x" data-toggle="collapse" data-target="#`+artistId+`" aria-expanded="true" aria-controls="`+artistId+`">
<span class="badge bg-white text-info">`+z+`</span>
<h3 class="text-white">`+data.join('')+`</h3>
</div>

<div id="`+artistId+`" class="collapse" aria-labelledby="`+artistId+`" data-parent="#accordion">
<div class="card-body">
<ul class="list-group">
</ul>
</div>
</div>

</div>
		`);
	}
}

})

//  <!--  Replace space in artist name by "_"   -->
let seat = filtered.map(i => i.split(" ").join("_"))


//  <!--  Grouping Lyrics by Artist  -->
$.each(list,(i,data) => {
let v = data.artist.toLowerCase().split(" ").join("_")
for(let y of seat){
	switch(v){
		case y :
		$("#"+y+" .list-group").append(`
			 <a href="lyrics/`+data.link+`" class="list-group-item list-group-item-action">`+data.title+`</a>
		`)
	}
}
})
}