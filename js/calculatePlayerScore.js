function calculateScore(maxHighScore, missedShots){

    let playerScore = maxHighScore
    playerScore = playerScore - missedShots * 2

    return playerScore;

    /*här behöver vi skapa en counter i shoot() funktionen som ökar en counter när spelare
    missar. Denna counter + maxHighScore ska med i funktionen när vi kallar på den.
    MaxhighScore får vi av funktionen calculateMaxScore. Denna funktionen ska 
    kallas på när alla skepp är sänkta på någon spelares spelplan.
    */


}