/* POKÉDEX LIST */ 
const pokemonList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxPokemons = 151
const limit = 9
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <div class="pokemon__cover ${pokemon.type}">
                <button id="favoriteButton${pokemon.number}"
                    class="button-favorite bi-heart-fill">
                </button>
                <img class="pokemon__img " 
                    src="${ pokemon.img }" 
                    alt="Pokémon ${ pokemon.name }">
            </div>
            <div class="pokemon__details">
                <span class="pokemon__name">${ pokemon.name } 
                    <span class="pokemon__number"> #${ pokemon.number }</span>
                </span>
                <ol class="types-list">
                    ${ pokemon.types.map((type) => `<li class="type ${ type }">${ type }</li>`).join('') }
                </ol>
            </div>
        </li> 
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdPokemonsWithNexPage = offset + limit

    if (qtdPokemonsWithNexPage >= maxPokemons) {
        const newLimit = maxPokemons - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


/* POKÉDEX LIST END */