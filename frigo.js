const url = "https://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigo/public/30/produits";
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

document.getElementById("ouvrir").addEventListener("click", afficherProduits);
function afficherProduits(event) {
  loadNomProduits();
  document.getElementById("ouvrir").style.visibility = "hidden";
  document.getElementById("ajouter").style.visibility = "visible";
  document.getElementById("rechercher").style.visibility = "visible";
  document.getElementById("fermer").style.visibility = "visible";
  let fetchOptions = {method : "GET"};

  fetch(url, fetchOptions)
  .then((response)=>{
    return response.json();
  })
  .then((data)=>{
    console.log(data);
    let produits = data;
    let texteHTML = '<div class="tbl-header">'+
                      '<table cellpadding="0" cellspacing="0" border="0">'+
                        '<caption>Contenu du Frigo</caption>'+
                        "<thead>"+
                          "<tr>"+
                            '<th class="caseElement">Élément</th>'+
                            '<th class="caseQuantite">Quantité</th>'+
                            '<th class="caseModification">Modification</th>'+
                          "</tr>"+
                        "</thead>"+
                      "</table>"+
                    "</div>"+
                    '<div class="tbl-content">'+
                      '<table cellpadding="0" cellspacing="0" border="0">';
    for (let produit of produits){
      texteHTML += '<tr><td class="caseElement">' + produit.nom + "</td>";
      texteHTML += '<td class="caseQuantite">' + produit.qte + "</td>";
      texteHTML += '<td class="caseModification"><form id="TableauProduit"><input type="button" id="plus1" value="plus 1" onclick="ajouter1Produit('+produit.id+')">'+
      '<input type="button" id="moins1" value="moins 1" onclick="enlever1Produit('+produit.id+')">'+
      '<input type="button" id="supprimer" value="supprimer" onclick="supprimerProduit('+produit.id+')"></form></td></tr>';

    }
    texteHTML += "</table></div>";
    document.getElementById("affichage").innerHTML = texteHTML;
  })
  .catch((error)=>{
    console.log(error);
  })
}

document.getElementById("ajouter").addEventListener("click", afficheFormProduits);
function afficheFormProduits(event) {
  let textForm = '<form id="formAjout">'+
                    '<fieldset>'+
                      '<legend>Ajouter un nouveau produit</legend>'+
                      '<label class="form__label">Nom : </label><input id="nom" type="text" class="form__field"/>'+
                      '<label class="form__label">Quantité : </label><input id="quantite" type="number" min="1" max="50" placeholder="1~50" class="form__field" />'+
                      '<input type="button" class="boutonForm" id="enregistrer" value="Ajouter" onclick="ajouterProduits()">'+
                      '<input type="button" class="boutonForm" id="retour" value="Retour" onclick="afficherProduits()">'+
                    '</fieldset>'+
                  '</form>';
  document.getElementById("affichage").innerHTML = textForm;

}


function ajouterProduits(event) {
  let produitInsere = {
    nom:document.getElementById("nom").value,
    qte: document.getElementById("quantite").value,
   }
  console.log(produitInsere);

  let fetchOptions = {method: "POST", headers: myHeaders, body: JSON.stringify(produitInsere)};

  fetch(url, fetchOptions)
  .then((response) => {
    return response.json();
  })
  .then((dataJSON) => {
    afficherProduits();
  })
  .catch((error) => console.log(error));
}


function supprimerProduit(id) {
  console.log(id);
  let fetchOptions = {method: "DELETE"};

  fetch(url+'/'+id, fetchOptions)
  .then((response) => {
    return response.json();
  })
  .then((dataJSON) => {
    afficherProduits();
  })
  .catch((error) => console.log(error));
}


function ajouter1Produit(id){
  let fetchOptions = { method: "GET" };

  fetch(url + "/" + id, fetchOptions)
  .then((response) => {
    return response.json();
  })
  .then((dataJSON) => {
    let produit = dataJSON;
    let produitChanger = {
      id: produit.id,
      nom: produit.nom,
      qte: produit.qte + 1
    };
    putProduit(produitChanger);
  })
  .catch((error) => {
    console.log(error);
  });
}


function enlever1Produit(id){
  let fetchOptions = { method: "GET" };

  fetch(url + "/" + id, fetchOptions)
  .then((response) => {
    return response.json();
  })
  .then((dataJSON) => {
    let produit = dataJSON;
    if(produit.qte - 1 >= 1){
      let produitChanger = {
      id: produit.id,
      nom: produit.nom,
      qte: produit.qte - 1
      };
      putProduit(produitChanger);
    }
    else{
      supprimerProduit(produit.id);
    }

  })
  .catch((error) => {
    console.log(error);
  });
}

function getProduits() {
  let fetchOptions = {method : "GET"};

  fetch(url, fetchOptions)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let produits = data;
    return produits;
  })
  .catch((error) => {
    console.log(error);
  });
}


function putProduit(produit) {
  let fetchOptions = { method: "PUT", headers: myHeaders, body: JSON.stringify(produit)};

  fetch(url, fetchOptions)
  .then((response) => {
    return response.json();
  })
  .then((dataJSON) => {
    afficherProduits();
  })
  .catch((error) => {
    console.log(error);
  });
}


function loadNomProduits(event) {
  let fetchOptions = {method : "GET"};
  let texteOptions ="";
  fetch(url, fetchOptions)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let produits = data;
     produits.sort(function compare(a, b) {
        if (a.nom < b.nom) return -1;
        if (a.nom > b.nom) return 1;
        return 0;
      });
    for(let produit of produits){
      texteOptions += '<option value="'+ produit.nom +'"> </option>';
    }
    document.getElementById("listeProduit").innerHTML = texteOptions;
  })
  .catch((error) => {
    console.log(error);
  });
}


document.getElementById("rechercher").addEventListener("click", afficheFormRecherche);
function afficheFormRecherche(event) {
  loadNomProduits();
  let textForm = '<form id="formSearch">'+
                    '<fieldset>'+
                      '<legend>Rechercher un produit</legend>'+
                      '<label for="frigo" class="form__label">Nom : </label><input class="form__field" id="searchNom" type="text" list="listeProduit" />'+
                          '<datalist id="listeProduit"></datalist>'+
                      '<input type="button" class="boutonForm" id="enregistrer" value="Chercher" onclick="rechercherProduit()">'+
                      '<input type="button" class="boutonForm" id="retour" value="Retour" onclick="afficherProduits()">'+
                    '</fieldset>'+
                  '</form>';
  document.getElementById("affichage").innerHTML = textForm;
}


function rechercherProduit(event) {
  let fetchOptions = {method : "GET"};
  let nom = document.getElementById("searchNom").value;

  fetch(url + "?search=" + nom , fetchOptions)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let produit = data[0];
    console.log(produit);
    let texteRecherche = '<div class="tbl-header">'+
                            '<table cellpadding="0" cellspacing="0" border="0">'+
                              '<caption>Contenu du Frigo</caption>'+
                              "<thead>"+
                                "<tr>"+
                                  "<th>Élément</th>"+
                                  "<th>Quantité</th>"+
                                  "<th>Modification</th>"+
                                "</tr>"+
                              "</thead>"+
                            "</table>"+
                          "</div>"+
                          '<div class="tbl-content">'+
                            '<table cellpadding="0" cellspacing="0" border="0">'+
                              "<tr><td>" + produit.nom + "</td><td>" + produit.qte + "</td>";
    texteRecherche += '<td><form id="TableauProduit"><input type="button" id="plus1" value="plus 1" onclick="ajouter1Produit('+produit.id+')">'+
      '<input type="button" id="moins1" value="moins 1" onclick="enlever1Produit('+produit.id+')">'+
      '<input type="button" id="supprimer" value="supprimer" onclick="supprimerProduit('+produit.id+')"></form></td></tr></table></div>';
    document.getElementById("affichage").innerHTML = texteRecherche;
  })
  .catch((error) => {
    console.log(error);
  });
}


document.getElementById("fermer").addEventListener("click", fermerFrigo);
function fermerFrigo(event) {
  document.getElementById("affichage").innerHTML = "";
  document.getElementById("ouvrir").style.visibility = "visible";
  document.getElementById("ajouter").style.visibility = "hidden";
  document.getElementById("rechercher").style.visibility = "hidden";
  document.getElementById("fermer").style.visibility = "hidden";
}

