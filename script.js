// Select the container where Pokemon cards will be displayed
let pokemon_card_container = document.querySelector("#pokemon-card-container");

// Define colors according to Pokemon types
let colors = {
  normal: "A9B0B3",
  fighting: "D76F2E",
  flying: "", // No color specified for flying type
  poison: "BD86CC",
  ground: "F7E049",
  rock: "A8922C",
  bug: "79A449",
  ghost: "826AA8",
  steel: "", // No color specified for steel type
  fire: "FD842F",
  water: "4F98C7",
  grass: "A0CF59",
  electric: "EFD73F",
  psychic: "F46EBD", 
  ice: "5AC7E8",
  dragon: "DCAA2B",
  dark: "", // No color specified for dark type
  fairy: "FDBDEA",
  unknown: "", // No color specified for unknown type
  shadow: "", // No color specified for shadow type
};


// Add event listeners to filter buttons
document.querySelectorAll('.filter-button').forEach(button => {
  // Add event listener to each filter button
  button.addEventListener('click', () => filterPokemon(button.dataset.type));
  // When a button is clicked, call the filterPokemon function with the button's type
});

// Function to filter Pokemon based on type
function filterPokemon(type) {
  // Hide all cards
  document.querySelectorAll('.card').forEach(card => {
    // Loop through all cards and hide them
    card.style.display = 'none';
    // Set the display property of each card to 'none' (hide it)
  });
  
  // Show only cards of the selected type
  document.querySelectorAll('.card').forEach(card => {
    // Loop through all cards again
    const cardType = card.querySelector('.type').textContent.toLowerCase();
    // Get the type of each card by selecting the text content of its '.type' element and converting it to lowercase
    if (cardType === type) {
      // If the card's type matches the selected type
      card.style.display = 'block';
      // Set the display property of the card to 'block' (show it)
    }
  });
}




// Fetch data for the main page
fetchmainpage();

// Function to fetch data for a single Pokemon
async function fetchPokemon(i) {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
  let result = await response.json();

  return result;
}

// Function to fetch data for multiple Pokemons and create cards for each
async function fetchmainpage() {
  // Loop to fetch data for the first 151 Pokemons
  for (let i = 1; i <= 151; i++) {
    let pokemon = await fetchPokemon(i); // Fetch data for a single Pokemon
    let card = createCard(pokemon); // Create a card for the fetched Pokemon
    pokemon_card_container.appendChild(card); // Append the card to the container
  }
}

// Function for creating a card for a Pokemon
function createCard(details) {
  let card = document.createElement("div"); // Create a div element for the card
  card.classList.add("card"); // Add 'card' class to the card
  // Set inner HTML for the card with details of the Pokemon
  card.innerHTML = `<div class="card-inner"> <div class="card-front">
<div class="id">#${details.id}</div>
<img src="${details.sprites.front_default}" alt="">
<span class="name">${details.species.name}</span>
<span class="type">${details.types[0].type.name}</span></div>
<div class="card-back">

<img src="${details.sprites.back_default}" alt="">
<span class="ability">Abilities</span>
<span class="">${details.abilities[0].ability.name}</span>
<span class="name">${details.species.name}</span></div></div>`;
  // Set background color of the card based on Pokemon type
  card.querySelector(".card-inner").style.backgroundColor =
    "#" + colors[details.types[0].type.name];
  return card; // Return the created card
}




