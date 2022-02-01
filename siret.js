// token : b479bcce-1ecd-3611-9355-8b8239e511eb
// SIREN test : 328781786 --> Capgemini 

// Récuperation du numéro de siret entrée
function getSiret() {
    var siretEnter = document.getElementById("numSiret").value;
    // retourne false si le numéro de siren est vide
    if (siretEnter == "") {
        return false;
    }else{
        return siretEnter;
    }
}

// Numéro de SIREN affiché en HTML
function rappelSiretNum(){
    var numSireth5 = document.createElement("h5");
    var numSiret = document.createTextNode("Numéro de SIRET : " + getSiret());
    numSireth5.appendChild(numSiret);
    return numSireth5;
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
function getInfoSiret(numSiret) {

    // Définition de l'url d'acces
    var url = 'https://api.insee.fr/entreprises/sirene/V3/siret/' + numSiret;
        
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
        var exist = document.createTextNode("Le numéro SIRET est bien valide !");
        existp.appendChild(exist);
        element.appendChild(existp);
        return true;
    }else{
        // Affichage du résultat non valide dans l'HTML
        var existp = document.createElement("h5");
        existp.className = "nonvalide";
        var exist = document.createTextNode("Le numéro SIRET n'est pas valide !");
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
        var name = apiData.etablissement.uniteLegale.denominationUniteLegale;

        // Affichage du nom de l'entreprise dans l'HTML
        var nomh5 = document.createElement("h5");
        var nom = document.createTextNode("Dénomination légale : " + name);
        nomh5.appendChild(nom);

        element.appendChild(nomh5);


        // Date de création 
        var creationDate = apiData.etablissement.uniteLegale.dateCreationUniteLegale;
        console.log(creationDate);
        
        // Affichage de la date de création de l'entreprise dans le HTML
        var dateH5 = document.createElement('h5');
        var date = document.createTextNode("Date de création : " + creationDate);
        dateH5.appendChild(date);

        element.appendChild(dateH5);


        // Adresse
        var numero = apiData.etablissement.adresseEtablissement.numeroVoieEtablissement;
        var typeVoie = apiData.etablissement.adresseEtablissement.typeVoieEtablissement;
        var nomVoie = apiData.etablissement.adresseEtablissement.libelleVoieEtablissement;
        var codePostale = apiData.etablissement.adresseEtablissement.codePostalEtablissement;
        var nomCommune = apiData.etablissement.adresseEtablissement.libelleCommuneEtablissement;

        // Formatage de l'adresse 
        var adresse = numero + " " + typeVoie + " " + nomVoie + ", " + codePostale + " " + nomCommune;
        
        // Affichage de l'adresse de l'entreprise dans le HTML
        var adresseH5 = document.createElement('h5');
        var adresseHtml = document.createTextNode("Adresse : " + adresse);
        adresseH5.append(adresseHtml);

        element.append(adresseH5);
    }
}


// Affichage des informations du SIREN
function displaySiret() {
    var element = document.getElementById("infoSireneContent");

    // Supprime les anciennes infos de siren pour faire du one page 
    var child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }

    // Si l'utilisateur ne rentre aucun numéro de siren, il est invité à en renter un
    if(getSiret() != false){
        // Ajoute les nouvelles informations du siren
    element.appendChild(rappelSiretNum());              // Rappel du numéro de siren demandé
    getInfoSiret(getSiret());                           // Récuperation des infos du numéro de siren 

    // Coche la checkbox
    document.getElementById('reg-log').checked = true;
    
    }else{
        var h5 = document.createElement("h5");
        var rien = document.createTextNode("Aucune information disponible");
        h5.appendChild(rien);
        element.appendChild(h5);
        alert('Veuillez entrer un numéro de SIRET');
    }
}