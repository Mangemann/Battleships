function calculateMaxScore(mapToCheck, length, width){
    let maxScoreOfMapMinusBoats = 0;

    for(i=0; i < length; i++){

        for(j=0; j < width; j++){

            if(mapToCheck[i][j] != '0'){

                maxScoreOfMapMinusBoats = maxScoreOfMapMinusBoats -15;

            }

            else{

                maxScoreOfMapMinusBoats = maxScoreOfMapMinusBoats + 100

            }

        }

    }

    /* 
    Räknar ut ett värde på spelplanen beroende på storlek
    och hur många båtar som är utplacerade. Detta ska göras direkt efter alla båtar
    är utplacerade, innan man börjar skjuta. Det som returnas ska sparas i
    en variabel som sedan kommer behövas i funktionen calculatePlayerScore.
    */
    return maxScoreOfMapMinusBoats;
    

}
