const cohort = "2304-FTB-ET-WEB-FT"
const baseURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohort}`;

const cards = document.getElementById("cards");
const currentRoster = []

let allPlayers = []
let selectedPlayer = undefined


async function fetchPlayers () {
  try {
    let response = await fetch(`${baseURL}/players`);
    console.log(response);

    let translatedData = await response.json(); 

    let actualPlayers = translatedData.data.players;

    console.log("Actual players are:", actualPlayers);
    
    return actualPlayers;

  } catch (error) {
    console.log("Fetch players", error);
  }
}

//<div id = "top-bar">
//     <div id="roster"> 
//     <h1> Roster </h1>
//     <div class="player-card">
//         <div class="name-breed">
//             <h4> Name:</h4>
//             <h4> Breed:</h4>
//         </div>  
//         <div class="image">
//             <img src="http://r.ddmcdn.com/w_1010/s_f/o_1/cx_0/cy_4/cw_1010/ch_1515/APL/uploads/2019/12/Bert-PBXVI.jpg"></img>
//         </div>
//     </div>
//   </div> <!-- Form to add new players

async function renderPlayers() {
  let allPlayers = await fetchPlayers();
  try {
    for (let i = 0; i < allPlayers.length; i++){
      let currentPlayerObject = allPlayers[i];
      cards.appendChild(generateCards(currentPlayerObject));
    }
  } catch (error) {
    console.log(error)  
  }
}

async function renderRoster() {
let rosterContainer = document.getElementById("roster-list");
rosterContainer.innerHTML=""
  try {
    for (let i = 0; i < currentRoster.length; i++){
      let currentRosterObject = currentRoster[i];
      rosterContainer.appendChild(generateCards(currentRosterObject));
    }

  } catch (error) {
    console.log(error)  
  }
}

function generateCards (pup) {
  //main containers for our stuff
  let playerCard = document.createElement("div");
  playerCard.className = "player-card";
  let nameBreed = document.createElement("div");
  nameBreed.className = "name-breed";
  let picture = document.createElement("div");
  picture.className = "image";

  //card content:
  let name = document.createElement("h4");
  name.className = "name";
  name.innerText = pup.name;

  let breed = document.createElement("h4");
  breed.className = "breed";
  breed.innerText = pup.breed;

  let image = document.createElement("img");
  image.src = pup.imageUrl;
  //shove the stuff in

  picture.appendChild(image)
  nameBreed.appendChild(name)
  nameBreed.appendChild(breed)

  playerCard.appendChild(nameBreed)
  playerCard.appendChild(picture)

//functionality
  playerCard.addEventListener("click", () => {
    selectAPup (pup)
  })
  return playerCard;
}

function selectAPup (pup) {
let html = 
` <h1> Selected Puppy: </h1>
<div class="selected-pup-display">
    <img id="pup-selected-img" src="${pup.imageUrl}" />
      <h3>Name: ${pup.name}</h3>

      <h3>Pup ID: ${pup.id}</h3>

      <h3>Bench Status: ${pup.status}</h3>
</div>`

let selectedPlayerElement = document.getElementById("selected-player-content")
selectedPlayerElement.innerHTML = html
selectedPlayer = pup
// function that adds selected pup to roster - data structure
  // if Pup on roster only show REMOVE
  // if not, only show ADD
let button = document.createElement("button")

  if (currentRoster.includes(pup)) {
    // display remove button
      button.innerText = "Remove from Roster"
      button.onclick = () => {
        removeFromCurrentRoster(pup);
      }
    console.log("We found pup in roster")
  } else {
    button.innerText = "Add to Roster"
    console.log("We did not find pup in roster")
      button.onclick = () => {
        addToCurrentRoster(pup);
      }
  }
  selectedPlayerElement.appendChild(button)
}


function addToCurrentRoster (pup) {
//onclick add to roster button - shoves to roster section
currentRoster.push(pup)
console.log(currentRoster)
selectAPup(pup)
renderRoster()
}

function removeFromCurrentRoster (pup) {
  let index = currentRoster.findIndex( (element) => {
    if (element.id === pup.id) {
      return true
    }
    return false
  })
  if (index !== false) {
    currentRoster.splice(index, 1)
  }
  console.log(currentRoster)

  selectAPup(pup)
  renderRoster()
}

renderPlayers();



