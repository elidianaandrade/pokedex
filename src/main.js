
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

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonsList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})