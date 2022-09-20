const pokemonList = document.getElementById('pokemonsList')
const pokemonListLength = document.getElementById('pokedexListLength')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonListFavorites = document.getElementById('pokemonListFavorites')
const pokemonListFavoritesLength = document.getElementById('pokemonListFavoritesLength')

let pokemonWishlist = []

const maxPokemons = 648
const limit = 12
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li id="pokemon${pokemon.id}" class="pokemon">
            <div class="pokemon__cover ${pokemon.type}">
                <button id="favoriteButton${pokemon.id}"
                    class="button-favorite bi-heart-fill">
                </button>
                <img id="openModal${pokemon.id}" class="pokemon__img" 
                    src="${ pokemon.img }" 
                    alt="Pokémon ${ pokemon.name }">
            </div>
            <div class="pokemon__details">
                <span class="pokemon__name">${ pokemon.name } 
                    <span class="pokemon__number"> #${ pokemon.id }</span>
                </span>
                <ol class="types-list">
                    ${ pokemon.types.map((type) => `<li class="type ${ type }">${ type }</li>`).join('') }
                </ol>
            </div>
            <div id="modalPokemon${pokemon.id}" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="pokemon__name">${ pokemon.name } 
                            <span class="pokemon__number"> #${ pokemon.id }</span>
                        </span>
                        <button id="closeModal${pokemon.id}" class="close-modal">                        
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-body__content1">
                            <img class="pokemon__img" 
                                src="${ pokemon.img }" 
                                alt="Pokémon ${ pokemon.name }">
                        </div>
                        <div class="modal-body__content2">
                            <ol class="types-list">
                                ${ pokemon.types.map((type) => `<li class="type ${ type }">${ type }</li>`).join('') }
                            </ol>
                            <div class="choose-pokemon__details">
                                <div class="choose-pokemon__dimensions">
                                    <div class="content1">
                                        <span class="choose-pokemon__weight">${ pokemon.weight }</span>
                                        <span class="choose-pokemon__subtitle">Weight</span>
                                    </div>
                                    <div class="content2">         
                                        <span class="choose-pokemon__height">${ pokemon.height }</span>
                                        <span class="choose-pokemon__subtitle">Height</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer"></div>
                </div>
                <div class="modal-overlay"><div>
            </div>
        </li> 
    `
}

function loadPokemonItens(offset, limit) {
    pokedexListLength.innerHTML = maxPokemons

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const pokemonListHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += pokemonListHtml

        pokemons.forEach(pokemon => {
            const favoriteButton = document.getElementById(`favoriteButton${pokemon.id}`)
            const openModal = document.getElementById(`openModal${pokemon.id}`)
            const closeModal = document.getElementById(`closeModal${pokemon.id}`)
            const modalPokemon = document.getElementById(`modalPokemon${pokemon.id}`)

            favoriteButton.addEventListener('click', () => {
                favoriteButton.classList.toggle('active')
                favoriteButton.classList.contains('active') ? addToFavorite(pokemon) : removeFromFavorite(pokemon)
            })

            openModal.addEventListener('click', () => {
                modalPokemon.classList.add('active')  
            })
            
            closeModal.addEventListener('click', () => {                
                modalPokemon.classList.remove('active')  
            })
        })
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

function convertPokemonToFavoriteLi(pokemon) {
    return `
        <li id="pokemon${pokemon.id}Favorited" class="pokemon-favorited">
            <div class="pokemon__cover pokemon-favorited__cover">
                <button id="favoritedButton${pokemon.id}"
                    class="button-favorite bi-heart-fill active">
                </button>
                <img class="pokemon__img" 
                    src="${ pokemon.img }" 
                    alt="Pokémon ${ pokemon.name }">
            </div>
            <div class="pokemon__details">
                <span class="pokemon__name">${ pokemon.name } 
                    <span class="pokemon__number"> #${ pokemon.id }</span>
                </span>
                <ol class="types-list">
                    ${ pokemon.types.map((type) => `<li class="type ${ type }">${ type }</li>`).join('') }
                </ol>
            </div>
        </li> 
    `
}

function addToFavorite(pokemon) {
    pokemonWishlist.push(pokemon)
    renderWishlist()
}

function removeFromFavorite(pokemon) {
    pokemonWishlist = [...pokemonWishlist.filter(p => p.id != pokemon.id)]
    renderWishlist()
}

function renderWishlist() {
    const newPokemonHtml =  pokemonWishlist.map(convertPokemonToFavoriteLi).join('')
    pokemonListFavorites.innerHTML =  newPokemonHtml
    pokemonListFavoritesLength.innerHTML = pokemonWishlist.length

    pokemonWishlist.forEach(pokemon => { 
        const favoritedButton = document.getElementById(`favoritedButton${pokemon.id}`)

        favoritedButton.addEventListener('click', () => {
            removeFromFavorite(pokemon)
            document.getElementById(`favoriteButton${pokemon.id}`).classList.remove('active')
        })
    })
}