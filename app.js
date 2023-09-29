const main = document.querySelector("#main");
const button = document.querySelector("#addnote");
let data = [];


button.addEventListener("click",function() {addNote()})

function saveNotes(){
    const notes = document.querySelectorAll(".note textarea");
    data = [];
    console.log(notes);
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    //console.log(data);
    if (data.length=== 0){
        localStorage.removeItem("storage");
    }else{
        localStorage.setItem("storage",JSON.stringify(data));
    }
}




function addNote(text = ""){
    const  note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
        <i class="voice fa-solid fa-volume-high"></i>
    </div>
    <textarea>${text}</textarea>
    `;
    note.querySelector(".trash").addEventListener("click",function() {
        note.remove();
        saveNotes();
    } );
    
    note.querySelector(".save").addEventListener("click",function() {saveNotes()});

    note.querySelector("textarea").addEventListener("focusout",function(){saveNotes()} );

    note.querySelector(".voice").addEventListener("click",function(){
        let speech = new SpeechSynthesisUtterance();
        speech.text = note.querySelector("textarea").value;
        window.speechSynthesis.speak(speech);
    });
    
    main.appendChild(note);
    saveNotes();
}


(function(){
    const display = JSON.parse(localStorage.getItem("storage"));
    if (display === null){
        addNote();
    }else{
        display.forEach((display)=>{addNote(display)});
    }
})();