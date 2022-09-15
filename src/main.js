
const offset = 0;
const limit = 9;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <img class="pokemon__img" src="" 
            alt="Pokémon ${ pokemon.name }">

            <div class="pokemon__details">
                <span class="pokemon__number">#001</span>
                <span class="pokemon__name">${ pokemon.name }</span>
                <ol class="types-list">
                    <li class="type">Grass</li>
                    <li class="type">Poison</li>
                </ol>
            </div>
        </li> 
    `
}

const pokemonsList = document.getElementById('pokemonsList')

fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => {
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            pokemonsList.innerHTML += convertPokemonToLi(pokemon)
        }

    })
    .catch((error) => console.log(error))    