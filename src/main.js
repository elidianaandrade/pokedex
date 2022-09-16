function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <img class="pokemon__img" src="${ pokemon.img }" 
            alt="Pokémon ${ pokemon.name }">

            <div class="pokemon__details">
                <span class="pokemon__number"> #${ pokemon.order } </span>
                <span class="pokemon__name">${ pokemon.name }</span>
                <ol class="types-list">
                    ${ pokemon.types.map((type) => `<li class="type ${ type }">${ type }</li>`).join('') }
                </ol>
            </div>
        </li> 
    `
}

const pokemonsList = document.getElementById('pokemonsList')

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonsList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})