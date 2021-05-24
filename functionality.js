console.log("Welcome to notes app. This is app.js");
show_notes();

// If user adds a note, add it to the localStorage

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function(e){      // can also add onclick = "add_note()" in html of class add_to_note
	add_note();
});


function add_note() 
{
    //	console.log("add_note function called");

	let textarea = document.getElementById("note_to_add_textarea");
	let text = textarea.value;
	let short_text = "";
	for(let i=0, j = 0; i<text.length; i++)
	{
		if(text[i] == " ")
		{
			j++;
		}
		if(j == 10)
		{
			break;
		}
		short_text += text[i];
	}


	if(short_text.length < text.length)
	{
		short_text += "...";
	}

	let previous_notes = localStorage.getItem("notes");     // string

	let notes_array = [];
	if (previous_notes != null) {
		notes_array = JSON.parse(previous_notes);
	}

//	console.log(notes_array);

//	console.log(short_text);
//	console.log(text);

	notes_array.push(short_text);
	notes_array.push(text);

//	console.log(notes_array);

	localStorage.setItem("notes", JSON.stringify(notes_array));
	textarea.value = "";

	show_notes();
}



function show_notes() 
{
	let notes = localStorage.getItem("notes");

	let html_to_insert = "";

	if(notes == null)
	{
		html_to_insert +=
			`
			<div class = "no_notes">
				<p> No notes </p>
			</div>
			`;			
	}
	else
	{
		let notes_array = JSON.parse(notes);

		for (let i = 0, j=0; i < notes_array.length; i += 2, j++)
		{
			html_to_insert +=
			`
				<div class="note" id = "note${j}">
				<div class="notehead"> Note ${j + 1} </div>
				<div class="text">
		  			<p class = "noteText"> ${notes_array[i]} </p>
				</div>
				<div class = "btn">
					<button class = "button button1" id = "deleteBtn" onclick = "delete_note(${j})"> Delete Note </button>
					<button class = "button button2" id = "viewBtn" onclick = "view_note(${j})"> View Note </button>
				</div>
				<div class = "empty">       </div>
				</div>
				`;
		}

	}
	
	let notes_to_display = document.getElementById("notes_to_display");

	notes_to_display.innerHTML = html_to_insert;

}


function delete_note( index )
{
	let notes = localStorage.getItem("notes");
	let notes_array = JSON.parse(notes);
	let new_notes_array = [];

//	console.log(index);
//	console.log(notes_array.length);
//	console.log(notes_array);
	for(let i=0, j = 0; i<notes_array.length; i+=2, j++)
	{
		if(j != index)
		{
			new_notes_array.push(notes_array[i]);
			new_notes_array.push(notes_array[i+1]);
		}
	}

//	console.log(new_notes_array);

	localStorage.setItem("notes", JSON.stringify(new_notes_array));
	show_notes();
}

function view_note( index )
{
	let notes = localStorage.getItem("notes");
	let notes_array = JSON.parse(notes);
	let full_text = notes_array[2*index+1];

//	console.log(notes_array);
//	console.log(index, full_text);

	let required_note = document.getElementById("note"+index);
//	console.log(required_note);
	required_note.innerHTML = 
	`
		<div class="notehead"> Note ${index + 1} </div>
		<div class="text">
			<p class = "noteText"> ${full_text} </p>
		</div>
		<button class = "button" id = "deleteBtn" onclick = "delete_note(${index})"> Delete Note </button>
		<button class = "button" id = "closeBtn" onclick = "close_note(${index})"> Close Note </button>
	`;

}

function close_note( index )
{
	let notes = localStorage.getItem("notes");
	let notes_array = JSON.parse(notes);
	let short_text = notes_array[2*index];

	//console.log(notes_array);
	//console.log(index, short_text);

	let required_note = document.getElementById("note"+index);
	required_note.innerHTML = 
	`
		<div class="notehead"> Note ${index + 1} </div>
		<div class="text">
			<p class = "noteText"> ${short_text} </p>
		</div>
		<button class = "button" id = "deleteBtn" onclick = "delete_note(${index})"> Delete Note </button>
		<button class = "button" id = "viewBtn" onclick = "view_note(${index})"> View Note </button>
	`;

}