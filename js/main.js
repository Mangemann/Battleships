
//Så här stora ska rutorna vara på spelplanen
let squareSize = 55;

let x;
let y;
let numHitsToWin
let aiNumHitsToWin
let playerCounter = 0
let missCounter = 0
let maxScore = 0
let playerScore = 0


/*
 *
 * id = "s78"
 * y = id[1];
 * x = id[2];
 * s-4-7
 * s-11-15  
 * Detta är vår spelplan. Den motsvaras av en helt vanlig array med siffror i.
 * Siffran 0 betyder att där finns vatten.
 * Siffran 1 betyder att där finns ett (hemligt!) skepp som ska sänkas. Alltså, från början är det hemligt för spelaren...
 *
 * Varje ruta på spelplanen har ett eget id som motsvarar ett index i den här arrayen.
 * <div id=0 class="square"><img src="water.jpg" width="50"/></div>
 * <div id=1 class="square"><img src="water.jpg" width="50"/></div>
 * <div id=2 class="square"><img src="water.jpg" width="50"/></div>
 */
let length = prompt('Hur många rader vill du ha?')
let width = prompt('hur många kolumner vill du ha?')

let playermap = createGrid(length, width)
let aimap = createGrid(length, width)

//Leta upp HTML-elementet med id = "status". 
function updateStatus(newStatusText){
    $("#status").text(newStatusText);  //Sätt en ny text där: T ex: "Tyvärr, du missade! Skjut igen!"
}

//När man har träffat alla skeppsrutor har man vunnit...
//Så många skeppsrutor finns det på kartan?... vi kollar... 

//Bygg upp kartan på spelplanen. Det börjar med vatten överallt.
buildMapPlayer(length, width);
buildMapAi(length, width);
let answer = false
let ai = 0

while(answer == false){

    alert('Placera ut en båt genom att mata in koordinater i rutorna och trycka på "Go".')
    answer = true

}

function placeShipAnswer(){

    if(answer == true){
        
        answer = confirm('Vill du placera ut en båt till?')
        if(answer == false){
            aiNumHitsToWin = getNumberOfShipsOnPlayerMap(playermap)
            aiPlaceShips()
            numHitsToWin = getNumberOfShipsOnAiMap(aimap)
            maxScore = calculateMaxScore(aimap, length, width)
        }

    }
}

function someFunction(){
    placeShips()
    placeShipAnswer()
}

function playerEasyAI(){
    //alert("Easy AI is playing")

    //randomiserad skjutning
    nedskjutningsvariabelY = Math.floor((Math.random()*100) % length);
    nedskjutningsvariabelX = Math.floor((Math.random()*100) % width);

 
    gissning = playermap[nedskjutningsvariabelX][nedskjutningsvariabelY];

    //här jämförs det om man redan skjutit på en specifik punkt. 
//ett meddelande kommer då. 
    if (playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == "*" || playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == "X"){
        playerEasyAI()

    } 
    else if (playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] != '0'){

        playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] = "*";
        a = nedskjutningsvariabelX.toString()
        b = nedskjutningsvariabelY.toString()
        c = a + b
        document.getElementById(`${c}`).src = "ship.jpg"

        //alert("Easy AI : träff");
        document.getElementById(`${c}`).src = "playerboatHit.jpg"
        aiNumHitsToWin--
        //console.log(gameGrid);
        //console.log(shipGrid);
    }
    else {
        a = nedskjutningsvariabelX.toString()
        b = nedskjutningsvariabelY.toString()
        c = a + b
        playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] = "X";
        document.getElementById(`${c}`).src = "AImiss.jpg"
        
        //alert("Easy AI : miss");
        //console.log(gameGrid);
        //console.log(shipGrid);
    }
    if (aiNumHitsToWin < 1){

        alert('AI vann detta spelet, men bra kämpat!')

    }
}


/*
 * När vi klickar på ett element som har class="square", anropa då funktionen som heter shoot()!
 */
$(".aisquare").click(shoot);
//$(button).click(getCoords);



/*
 * Någon skjuter på en ruta.
 * Vi använder $(this) för att få reda på vilken ruta.
 * Vi använder $(this).attr('id') för att få reda på vilket ID rutan har.
 * Varje ruta har ett eget id som motsvarar ett index i arrayen map.
 */
function shoot(){
    console.log("shoot!");

    //Vilket id är det på den rutan vi just nu har skjutit på... 
    let id1 = $(this).attr('id1');
    let id2 = $(this).attr('id2');
    console.log(aiNumHitsToWin + ' ' + numHitsToWin)
    //console.log(id);
    //console.log(destroyerarray)
    //console.log(submarinearray)
    //console.log(cruiserarray)
    //console.log(battleshiparray)
    //console.log('box coords', x + y)


    //Kolla om den här platsen på kartan innehåller 1. Då är det ett skepp! 
    //T ex... ifall id är 7, då är det index = 7 i arrayen, alltså map[7].
    if (aimap[id1][id2] != '0' && aimap[id1][id2] != '*'  && aimap[id1][id2] != 'X'){
        aimap[id1][id2] = '*'
        //Ja, det var ett skepp!  
        $(this).html(`<img src="ship.jpg" width="${squareSize}" height="${squareSize}"/>`);  //Uppdatera bilden till ett skepp!
        updateStatus("Träff! Skjut igen!"); //Uppdatera status-texten.
        checkSunkenShips(id1, id2)
        numHitsToWin--; //Vi kommer ett steg närmare att vinna!
    }
    else if(aimap[id1][id2] == '0'){
        aimap[id1][id2] = 'X'
        $(this).html(`<img src="miss.jpg" width="${squareSize}" height="${squareSize}"/>`);
        updateStatus("Tyvärr, du missade. Skjut igen!");
        missCounter++
    }
    else{
        updateStatus("Du har redan skjutit här! Försök en annan plats!");
    }

    if (numHitsToWin<=0){
        
        updateStatus("Grattis, du har klarat spelet!")
        playerScore = calculateScore(maxScore, missCounter)
        alert('Grattis! Du har sänkt alla skepp!')
        alert(`Din poäng blev: ${playerScore}`)
    }

    playerEasyAI()

}

//updateSquare(5, "ship.jpg")
