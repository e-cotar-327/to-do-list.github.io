// Targhetăm elementele cu care vom lucra
const inputBox = document.getElementById("taskInput");
const listContainer = document.getElementById("taskList");
const filterButtons = document.querySelectorAll('.filter');


// Creăm funcţia care va adăuga task-urile noastre în listă
function addTask() {
  if (inputBox.value === "") { // error proofing pentru cazul în care utilizatorul vrea să adauge un task fără text
    alert("You must write something!");
  } else { // iar dacă e ok, atunci...
    let li = document.createElement("li"); //creăm un nou element de listă 'li' în HTML
    li.innerHTML = inputBox.value; //afişăm textul introdus în elementul de listă
    listContainer.appendChild(li); //adăugăm elementul de listă nou în lista de sarcini

    let span = document.createElement("span"); //creăm un nou element (pentru icon-ul de "X" care va şterge task-ul)
    span.innerHTML = "\u00d7"; //adăugăm simbolul X în elementul creat
    li.appendChild(span); //adăugăm elementul nou ca şi copil la elementul 'li' - ca acesta să fie în interior
  }
  inputBox.value = ""; //golim inputul după apăsarea butonului 'Add' pentru a elibera spaţiul pentru un eventual nou task
}

// Îmbunătăţim UX. Adăugăm posibilitatea adăugării task-urilor prin Enter
inputBox.addEventListener("keyup", function (event) { 
  if (event.key === "Enter") {
    addTask();
  }
});

// Funcţia pentru manipularea sarcinilor - marchează ca realizate/nerealizate sau şterge din listă (şi din DOM)
listContainer.addEventListener("click", function (e) { 
    if (e.target.tagName === "LI") {//dacă am făcut click pe elementul <li>, 
      e.target.classList.toggle("checked"); // atunci adaugă elementului clasa 'checked' || if checked | if unchecked => metoda toggle
    } else if (e.target.tagName === "SPAN") {//dacă am făcut click pe elementul <span> (cel cu X pentru a şterge sarcina), 
      e.target.parentElement.remove(); // atunci ştergem parintele acestui element, adică <li> - eliminăm din listă task-ul
    }
},);

// BONUS part - filtrele
filterButtons.forEach(button => {//pentru fiecare buton cu clasa 'filter' se ataşează un event listener care va reacţiona la evenimentul de click
  button.addEventListener('click', function() {
    filterButtons.forEach(btn => btn.classList.remove('active'));//eliminăm clasa 'active' de la toate butoanele iniţial
    this.classList.add('active'); //adăugăm clasa 'active' strict la butonul apăsat (this)
    
    const filterType = this.id;//stocăm în constantă id-ul butonului apăsat - vom avea nevoie de asta la logica filtrelor
    const tasks = document.querySelectorAll('#taskList li');//targhetăm toate elementele de tip li care sunt copiii lui taskList ca să le putem aplica filtrele

    tasks.forEach(task => {//executăm funcţia pentru fiecare element li găsit în listă
      if (filterType === 'showAll') {
        task.style.display = 'block';//afişăm toate elementele din listă
      } else if (filterType === 'showCompleted') {
        if (task.classList.contains('checked')) {
          task.style.display = 'block';//afişăm doar elementele care conţin clasa 'checked', deci sunt realizate
        } else {
          task.style.display = 'none';//iar celelalte elemente ce NU conţin clasa 'checked' - le ascundem
        }
      } else if (filterType === 'showUncompleted') {
        if (task.classList.contains('checked')) {
          task.style.display = 'none'; //viceversa - afişăm doar elementele care NU conţin clasa 'checked', deci sunt nerealizate
        } else {
          task.style.display = 'block';//iar celelalte elemente ce conţin clasa 'checked' - le ascundem
        }
      }
    });
  });
});