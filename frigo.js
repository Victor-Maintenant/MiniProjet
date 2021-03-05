const url = "https://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigo/public/30/produits";
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

document.getElementById("ouvrir").addEventListener("click", afficherContenu);
function afficherContenu(event) {
  document.getElementById("frigo").style.backgroundImage = "url(images/frigoOuvert.png)";
  document.getElementById("ouvrir").style.visibility = "hidden";
  document.getElementById("ajouter").style.visibility = "visible";
  document.getElementById("rechercher").style.visibility = "visible";
  document.getElementById("fermer").style.visibility = "visible";
  let fetchOptions = { method: "GET" };

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      let produits = dataJSON;
      console.log(produits);
      console.log(dataJSON.name);
      let texteHTML = "<table>"+
                      "<caption>Contnu du frigo</caption>"+
                      "<tr>"+
                      "<th>Élément</th>"+
                      "<th>Quantité</th>"+
                      "<th>Modification</th>"+
                      "</tr>";
      for (let produit of produits){
        texteHTML += "<tr><td>" + produit.name + "</td>";
        texteHTML += "<td>" + produit.quantite + "<td>";
        texteHTML += '<td><input type="button" id="plus" value="'+ produit.name +'">'+
        '<input type="button" id="moins" value="'+ produit.name +'">'+
        '<input type="button" id="supprimer" value="'+ produit.id +'" onclick="supprimerProduit()"></td></tr>';

      }
      texteHTML += "</table>";
      document.getElementById("middle").innerHTML = texteHTML;
    })
    .catch((error) => {
      console.log(error);
    });
}

function supprimerProduit(event) {
  const url = "https://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigo/public/30/produits/"+this.target.value+"";
  let fetchOptions = { method: "DELETE", headers: {"Content-type": "application/json"}};

  fetch(url+"/"+this.id, fetchOptions)
    .then((response) => {
      response.json()
    })
    .then((dataJSON) => {
      console.log(dataJSON)
    })
    .catch((error) => {
      console.log(error)
    });
}

document.getElementById("ajouter").addEventListener("click", afficherFormulaire);
function afficherFormulaire(event) {
  let formulaire = '<form id="formProduit">'+
  '<input type="text" id="produit" name="element" placeholder="saisir votre produit">'+
  '<input type="number" id="nombre" min="1" max="50">'+
  '<input type="button" id="enregistrer" value="Valider" onclick="recupeFormProduit()">'+
  '</form>';
   document.getElementById("middle").innerHTML = formulaire;

}

function recupeFormProduit(event) {
  let produitInsere = {
    name:document.getElementById("produit").value,
    quantite: document.getElementById("nombre").value,
    langages: ["html", "css", "javascript"]
   }
   console.log(produitInsere);
   ajouterProduit(produitInsere);
}


function ajouterProduit(produit){
  console.log(produit);
  let fetchOptions = {method: "POST", headers: myHeaders, body: JSON.stringify(produit)
  };

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json()
    })
    .then((dataJSON) => {
      afficherContenu();
    })
    .catch((error) => {
      console.log(error)
    });

}

document.getElementById("fermer").addEventListener("click", fermerFrigo);
function fermerFrigo(event) {
  document.getElementById("frigo").style.backgroundImage = "url(images/frigo.png)";
  document.getElementById("frigo").innerHTML = "";
  document.getElementById("middle").innerHTML = "";
  document.getElementById("ouvrir").style.visibility = "visible";
  document.getElementById("ajouter").style.visibility = "hidden";
  document.getElementById("rechercher").style.visibility = "hidden";
  document.getElementById("fermer").style.visibility = "hidden";
}


