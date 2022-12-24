let nom= document.getElementById("nom")
let postnom = document.getElementById("postnom")
let prenom = document.getElementById("prenom")
let genre = document.getElementById("genre")
let pays = document.getElementById("pays")
let form = document.getElementById('form')
let tableBody = document.querySelector('table tbody')

let submitbtn = document.getElementById('btnsubmit')

let editmode= false;
let edittak= null;
editmodeEnabled(editmode);

let tasks= [
    {
        'nom':'Yalenga',
        'postnom':'jean',
        'prenom':'Butq',
        'genre':'m',
        'pays':'rdc',
        'isdone' : false
    },
    {
        'nom':'amo',
        'postnom':'jean',
        'prenom':'can',
        'genre':'m',
        'pays':'rdc',
        'isdone' : true
    },
    {
        'nom':'akom',
        'postnom':'jean',
        'prenom':'can',
        'genre':'m',
        'pays':'rdc',
        'isdone' : true
    },
]
function loadTasksIntable(){
 tableBody.innerHTML= " "
    for (const task of tasks){
        let temp = `<tr>
        <td>${task.nom}</td>
        <td>${task.postnom}</td>
        <td>${task.prenom}</td>
        <td>${task.genre}</td>
        <td>${task.pays}</td>

        <td>
            <input type="checkbox" name="" ${task.isdone ? 'checked' : '' } id="nom">
            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modaltest" onclick="deletetask(this)">Supprimmer</button>
            <button class="btn btn-warning"  data-nom ="${task.nom}" data-postnom ="${task.postnom}" data-prenom ="${task.prenom}" data-genre ="${task.genre}"  data-pays ="${task.pays}"  onclick="edittask(this)">Modifier</button>
        </td>
    </tr>`

    tableBody.innerHTML += temp

    }
}

loadTasksIntable()

form.addEventListener('submit', function(e){
    e.preventDefault();
    
    let nomvalue = nom.value
    let postnomvalue = postnom.value
    let prenomvalue = prenom.value
    let genrevalue = genre.value
    let paysvalue = pays.value
    if (editmode){
        updatetask(nomvalue, postnomvalue, prenomvalue, genrevalue, paysvalue);
    } else{
        addtask(nomvalue, postnomvalue, prenomvalue, genrevalue, paysvalue);
    }
   
})

function updatetask(value){
    tasks.find((t) =>t.nom == edittak.nom).nom=value
    loadTasksIntable()
    editmodeEnabled(false)
}

function addtask(value){
    let tasko={
        'nom': nom.value,
        'postnom': postnom.value,
        'prenom': prenom.value,
        'genre': genre.value,
        'pays': pays.value,
        'isdone' : false
    }
    tasks.push(tasko)
    loadTasksIntable()

}

function deletetask(e){
    e.parentNode.parentNode.remove()

}

function edittask (e, task){
    editmodeEnabled(true)
    nom.value = e.dataset.nom
    postnom.value = e.dataset.postnom
    prenom.value = e.dataset.prenom
    pays.value = e.dataset.pays
    genre.value = e.dataset.genre
    edittak = tasks.find((t) => t.nom == e.dataset.nom)

}

function editmodeEnabled(enable){
    if(enable){
        editmode=true
        submitbtn.innerText="Modifier"
    } else{
        editmode=false
        submitbtn.innerText="Ajouter"
        edittak = null
        nom.value = ''
    }
}