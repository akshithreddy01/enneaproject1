document.getElementById('fetchData').addEventListener('click', fetchData);

async function fetchData() {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const pokemonPromises = data.results.map(pokemon => fetchPokemonDetails(pokemon.url));
        const pokemonDetails = await Promise.all(pokemonPromises);
        displayData(pokemonDetails);
    } catch (error) {
        dataContainer.innerHTML = `<p class="error">Error fetching data: ${error.message}</p>`;
    }
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch Pokémon details: ${error.message}`);
        return null; 
    }
}

function displayData(pokemonList) {
    const dataContainer = document.getElementById('dataContainer');
    if (pokemonList.length === 0) {
        dataContainer.innerHTML = '<p>No data available.</p>';
        return;
    }

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    pokemonList.forEach(pokemon => {
        if (pokemon) {
            const card = document.createElement('div');
            card.classList.add('pokemon-card');

            const img = document.createElement('img');
            img.src = pokemon.sprites.front_default;
            img.alt = pokemon.name;
            img.classList.add('pokemon-image');

            const info = document.createElement('div');
            info.classList.add('pokemon-info');

            const name = document.createElement('h2');
            name.textContent = pokemon.name;

            const type = document.createElement('p');
            type.textContent = `Type: ${pokemon.types.map(t => t.type.name).join(', ')}`;

            const abilities = document.createElement('p');
            abilities.textContent = `Abilities: ${pokemon.abilities.map(a => a.ability.name).join(', ')}`;

            info.appendChild(name);
            info.appendChild(type);
            info.appendChild(abilities);

            card.appendChild(img);
            card.appendChild(info);
            cardContainer.appendChild(card);
        }
    });

    dataContainer.appendChild(cardContainer);
}
