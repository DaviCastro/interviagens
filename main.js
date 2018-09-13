var airports = null;
var viagem = {};
var tickets = [];

$(document).ready(function() {
    intializaFirebase();
    getAirports();
});

function intializaFirebase(){
  var config = {
    apiKey: "AIzaSyDmYwaI56khakraaOwiPm-pnZNcP04KSrc",
    authDomain: "interviagens-a9d93.firebaseapp.com",
    databaseURL: "https://interviagens-a9d93.firebaseio.com",
    projectId: "interviagens-a9d93",
    storageBucket: "interviagens-a9d93.appspot.com",
    messagingSenderId: "193711264766"
  };
  firebase.initializeApp(config);
}

function getAirports(){

    $.getJSON('https://firebasestorage.googleapis.com/v0/b/interviagens-a9d93.appspot.com/o/airports.json?alt=media&token=2cbdf1c4-6d10-42b3-ba8c-d2559edd833d', function (data) {
        preencheDropdown(data);
    });

}

function getPassagem(viagem) {
    $.getJSON('https://firebasestorage.googleapis.com/v0/b/interviagens-a9d93.appspot.com/o/passagens.1.json?alt=media&token=4b4a1ad3-1ddf-49d6-98d8-469f11ac33f1', function (data) {
       data.forEach(item => {
           if ((viagem.origem.substring(0,3) == item.origem))
           {
                // console.info(item);
                tickets.push(item);
           }
       });
       loadTable(tickets);     
    });
}
// && (viagem.destino.substring(0,3) == item.destino) 
function preencheDropdown(airports) {
    
    const airMap = airports.reduce((acc, item) => {
        acc.push(`${item.code}, ${item.city}`)
        return acc
    }, []);
    
    autocomplete(document.getElementById("inputOrigem"), airMap, airports);
    autocomplete(document.getElementById("inputDestino"), airMap, airports);
}

function registrarCidade(scope) {
    
    if (scope.id == "inputOrigem")
        viagem.origem = scope.value
    else 
        viagem.destino = scope.value

    if (viagem.origem && viagem.destino)
        getPassagem(viagem);

}

function loadTable(passagens) {

    const data = [];
    let sub = [];

    passagens.forEach(element => {
        sub.push(element.origem, element.destino, element.partida, element.chegada, element.price);;
        data.push(sub);
    });

    console.log(data);
    

    // $('#passagensTable').DataTable( {
    //     data: data,
    //     columns: [
    //         { title: "Origem" },
    //         { title: "Destino" },
    //         { title: "Partida" },
    //         { title: "Chegada" },
    //         { title: "Valor" }
    //     ]
    // } );
}