document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const pokemon = await response.json();
        displayData(pokemon);
    } catch (error) {
        dataContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
});

function displayData(pokemon) {
    const dataContainer = document.getElementById('dataContainer');
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;
    img.classList.add('pokemon-image');
    const info = document.createElement('div');
    info.classList.add('pokemon-info');
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    info.innerHTML = ` 
        <h2>${name}</h2>
        <p><strong>Height:</strong> ${pokemon.height / 10} meters</p>
        <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>Type:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;
    card.appendChild(img);
    card.appendChild(info);
    dataContainer.appendChild(card);
}