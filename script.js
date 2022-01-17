// token : b479bcce-1ecd-3611-9355-8b8239e511eb
// SIREN test : 328781786 --> Capgemini 

// Récuperation du numéro de siren entrée
function getSiren() {
    var sirenEnter = document.getElementById("numSirene").value;
    // retourne false si le numéro de siren est vide
    if (sirenEnter == "") {
        return false;
    }else{
        return sirenEnter;
    }
}

// Numéro de SIREN affiché en HTML
function rappelSirenNum(){
    var numSirenh5 = document.createElement("h5");
    var numSiren = document.createTextNode("Numéro de SIREN : " + getSiren());
    numSirenh5.appendChild(numSiren);
    return numSirenh5;
}

// Requete d'accès à l'API 
async function accesApi(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer b479bcce-1ecd-3611-9355-8b8239e511eb'
        }
      });
      let data = await response.json();
    return data;
}

// Récuperations des informations du numéro de siren et affichage des ces informations 
function getInfoSiren(numSiren) {

    // Définition de l'url d'acces
    var url = 'https://api.insee.fr/entreprises/sirene/V3/siren/' + numSiren;
        
    // Accès aux données retournées par l'API
    accesApi(url).then(function (data) {
        displayEntrepriseInfo(data);
    
    });
    
}

// Affiche si le numéro de siren est valide ou pas 
function displayExist(apiData) {
    var element = document.getElementById("infoSireneContent");

    // Si l'API retourne un résultat valide
    if (apiData.header.statut == 200 ){    
        // Affichage du résultat valide dans l'HTML
        var existp = document.createElement("h5");
        existp.className = "valide";
        var exist = document.createTextNode("Le numéro SIREN est bien valide !");
        existp.appendChild(exist);
        element.appendChild(existp);
        return true;
    }else{
        // Affichage du résultat non valide dans l'HTML
        var existp = document.createElement("h5");
        existp.className = "nonvalide";
        var exist = document.createTextNode("Le numéro SIREN n'est pas valide !");
        existp.appendChild(exist);
        element.appendChild(existp);
        return false;
    }
}

// Si le numéro de siren est valide, on affiche les informations de l'entreprise 
function displayEntrepriseInfo(apiData) {
    var element = document.getElementById("infoSireneContent");
    if(displayExist(apiData)){

        // Dénomination légale de l'entreprise
        var periode = apiData.uniteLegale.periodesUniteLegale;
        var name = periode[0].denominationUniteLegale;                      // Récuperation du nom de l'entreprise 

        // Affichage du nom de l'entreprise dans l'HTML
        var nomh5 = document.createElement("h5");
        var nom = document.createTextNode("Dénomination légale : " + name);
        nomh5.appendChild(nom);

        element.appendChild(nomh5);

        // Date de création 
        var creationDate = apiData.uniteLegale.dateCreationUniteLegale;
        console.log(creationDate);
        
        // Affichage de la date de création de l'entreprise dans le HTML
        var dateH5 = document.createElement('h5');
        var date = document.createTextNode("Date de création : " + creationDate);
        dateH5.appendChild(date);

        element.appendChild(dateH5);
    }
}


// Affichage des informations du SIREN
function displaySiren() {
    var element = document.getElementById("infoSireneContent");

    // Supprime les anciennes infos de siren pour faire du one page 
    var child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }

    // Si l'utilisateur ne rentre aucun numéro de siren, il est invité à en renter un
    if(getSiren() != false){
        // Ajoute les nouvelles informations du siren
    element.appendChild(rappelSirenNum());              // Rappel du numéro de siren demandé
    getInfoSiren(getSiren());                           // Récuperation des infos du numéro de siren 

    // Coche la checkbox
    document.getElementById('reg-log').checked = true;
    
    }else{
        var h5 = document.createElement("h5");
        var rien = document.createTextNode("Aucune information disponible");
        h5.appendChild(rien);
        element.appendChild(h5);
        alert('Veuillez entrer un numéro de siren');
    }
}