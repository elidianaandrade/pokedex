const pokemonList = document.getElementById('pokemonList')
const pokemonListLength = document.getElementById('pokedexListLength')

const previousButton = document.getElementById('previousButton')
const nextButton = document.getElementById('nextButton')

const pokemonListFavorites = document.getElementById('pokemonListFavorites')
const pokemonListFavoritesLength = document.getElementById('pokemonListFavoritesLength')

const menuTypes = document.getElementById('menuTypes')
const buttonDrop = document.getElementById('buttonDrop')
const buttonViewAllTypes = document.getElementById('buttonViewAll')
const buttonsPokemonType = document.querySelectorAll('.type')

let pokemonsType = ''
let buttonsPokemonTypeActive = false
let pokemonWishlist = []

const maxPokemons = 648
const limit = 12
let offset = 0

buttonDrop.addEventListener('click', () => {
    menuTypes.classList.toggle('active')
})

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
                    ${ pokemon.types.map((type) => `<li title="${ type }" class="type ${ type }"></li>`).join('') }
                </ol>
            </div>
            <div id="modalPokemon${pokemon.id}" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title">
                            <span class="pokemon__name">${ pokemon.name }
                                <span class="pokemon__number"> #${ pokemon.id }</span>
                            </span>
                            <ol class="types-list">
                                ${ pokemon.types.map((type) => `<li title="${ type }" class="type ${ type }"></li>`).join('') }
                            </ol>
                        </div>
                        <button id="closeModal${pokemon.id}" class="close-modal">                        
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-body__content1 ">
                            <div class="pokemon__cover ${ pokemon.types.find((type) => `${ type }`)}">
                                <img class="pokemon__img" 
                                src="${ pokemon.img }" 
                                alt="Pokémon ${ pokemon.name }">
                            </div>
                        </div>
                        <div class="modal-body__content2">
                            <div class="abilities">
                                <span class="choose-pokemon__subtitle">Abilites: </span>
                                <ol class="abilities-list">
                                    ${ pokemon.abilities.map((ability) => `<li class="abilities-list__item ${ ability }"> ${ ability }</li>`).join(', ') }
                                </ol>
                            </div>
                            <div class="choose-pokemon__details">
                                <div class="choose-pokemon__dimensions">
                                    <div class="content1">
                                        <span class="choose-pokemon__hp">${pokemon.maxHp} / ${pokemon.maxHp}</span>
                                        <span class="choose-pokemon__subtitle">HP</span>
                                    </div>
                                    <div class="content2">
                                        <span class="choose-pokemon__weight">${ pokemon.weight } kg</span>
                                        <span class="choose-pokemon__subtitle">Weight</span>
                                    </div>
                                    <div class="content3">         
                                        <span class="choose-pokemon__height">${ pokemon.height } m</span>
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

buttonsPokemonType.forEach(type => {
    type.addEventListener('click', () => {
    menuTypes.classList.remove('active')
    buttonsPokemonType.forEach(li => {
        li.classList.remove('active')
        })
        type.classList.add('active')
        menuTypes.classList.remove('active')

        pokemonsType = type.title
        buttonsPokemonTypeActive = true

        pokemonList.innerHTML = `<i title="loading..." class="loading-pokeball bi bi-record-circle"></i>`
        renderPokemonItens(0, maxPokemons)
    }) 
})

buttonViewAllTypes.addEventListener('click', () => {
    nextButton.style.display = 'flex'
    buttonsPokemonType.forEach(btnTypes => btnTypes.classList.remove('active')) 
    menuTypes.classList.remove('active')

    const offsetDefault = 0
    const limitDefault = 12

    pokemonsType = ''
    buttonsPokemonTypeActive = false
    renderPokemonItens(offsetDefault, limitDefault)
})

function renderPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML = `<i title="loading..." class="loading-pokeball bi bi-record-circle"></i>`

        pokedexListLength.innerHTML = maxPokemons

        if(buttonsPokemonTypeActive) {
            nextButton.style.display = 'none'
            previousButton.style.display = 'none'

            function getPokemonsByType(types) {
                pokemons = pokemons.filter(pokemons => types.includes(pokemons.type))
                return pokemons;
            }

            getPokemonsByType([`${pokemonsType}`])
            pokedexListLength.innerHTML = pokemons.length
        }

        const pokemonListHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML = pokemonListHtml
        
        pokemons.forEach(pokemon => {
            const openModal = document.getElementById(`openModal${pokemon.id}`)
            const closeModal = document.getElementById(`closeModal${pokemon.id}`)
            const modalPokemon = document.getElementById(`modalPokemon${pokemon.id}`)
            const favoriteButton = document.getElementById(`favoriteButton${pokemon.id}`)

            openModal.addEventListener('click', () => modalPokemon.classList.add('active'))
            closeModal.addEventListener('click', () => modalPokemon.classList.remove('active'))

            checkIfIncludedInWishlist(pokemon) ? favoriteButton.classList.add('active') : favoriteButton.classList.remove('active')

            favoriteButton.addEventListener('click', () => {
                if (checkIfIncludedInWishlist(pokemon)) {
                    removeFromFavorite(pokemon)
                    favoriteButton.classList.remove('active')
                } else {
                    addToFavorite(pokemon)
                    favoriteButton.classList.add('active')
                }
            })
        })
    })
}

renderPokemonItens(offset, limit)

nextButton.addEventListener('click', () => {
    offset += limit

    if (offset >= maxPokemons || offset == maxPokemons - limit || offset + limit > maxPokemons) {
        const newOffset = maxPokemons - limit
        renderPokemonItens(newOffset, limit)

        nextButton.style.display = 'none'
        previousButton.style.display = 'flex'
    } else {
        renderPokemonItens(offset, limit)

        nextButton.style.display = 'flex'
        previousButton.style.display = 'flex'
    }
})

previousButton.addEventListener('click', () => {
    offset -= limit

    if (offset <= 0 || offset > maxPokemons) {
        const newOffset = 0
        renderPokemonItens(newOffset, limit) 

        previousButton.style.display = 'none'
    } else {
        renderPokemonItens(offset, limit) 
        
        nextButton.style.display = 'flex'
        previousButton.style.display = 'flex'
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
                    ${ pokemon.types.map((type) => `<li title="${ type }" class="type ${ type }"></li>`).join('') }
                </ol>
                <div class="abilities">
                    <span class="choose-pokemon__subtitle">Abilities: </span>
                    <ol class="abilities-list">
                        ${ pokemon.abilities.map((ability) => `<li class="abilities-list__item ${ ability }"> ${ ability }</li>`).join(', ') }
                    </ol>
                </div>
                <div class="choose-pokemon__details">
                    <div class="choose-pokemon__dimensions">
                        <div class="content1">
                            <span class="choose-pokemon__hp">${pokemon.maxHp} / ${pokemon.maxHp}</span>
                            <span class="choose-pokemon__subtitle">HP</span>
                        </div>
                        <div class="content2">
                            <span class="choose-pokemon__weight">${ pokemon.weight } kg</span>
                            <span class="choose-pokemon__subtitle">Weight</span>
                        </div>
                        <div class="content3">         
                            <span class="choose-pokemon__height">${ pokemon.height } m</span>
                            <span class="choose-pokemon__subtitle">Height</span>
                        </div>
                    </div>
                </div>
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

function checkIfIncludedInWishlist(pokemon) {
     return pokemonWishlist.some(p =>
         p.id == pokemon.id
     )
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