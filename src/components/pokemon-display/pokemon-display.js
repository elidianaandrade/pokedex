const pokemonDetails = document.querySelector('.choose-pokemon__details')
const pokemonName = document.querySelector('.choose-pokemon__name')
const pokemonNumber = document.querySelector('.choose-pokemon__number')
const pokemonTypes = document.querySelector('.choose-pokemon__types')
const pokemonAbilities = document.querySelector('.choose-pokemon__abilities')
const pokemonWeight = document.querySelector('.choose-pokemon__weight')
const pokemonHeight = document.querySelector('.choose-pokemon__height')

const pokemonImg = document.querySelector('.choose-pokemon__img')

const form = document.querySelector('.choose-pokemon__form')
const input = document.querySelector('.choose-pokemon__search')
const buttonPrev = document.getElementById('buttonPrev')
const buttonNext = document.getElementById('buttonNext')

let searchPokemon = 1;

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const pokemonData = await getPokemon(pokemon)

    if(pokemonData) {
        pokemonName.innerHTML = pokemonData.name
        pokemonNumber.innerHTML = `#${("000" + pokemonData.id).slice(-3)} `
        pokemonTypes.innerHTML = pokemonData.types.map((typeSlot) => typeSlot.type.name).join(', ')
        pokemonAbilities.innerHTML = pokemonData.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name).join(', ')
        pokemonWeight.innerHTML = `${pokemonData.weight / 10} kg`
        pokemonHeight.innerHTML = `${pokemonData.height / 10} m`
        pokemonImg.src = pokemonData.sprites.other.dream_world.front_default
        pokemonDetails.style.display = 'flex'
        input.value = '';
    } else {
        pokemonName.innerHTML = 'Pokémon not found'
        pokemonNumber.innerHTML = ''
        pokemonTypes.innerHTML = ''
        pokemonAbilities.innerHTML = ''
        pokemonWeight.innerHTML = ''
        pokemonHeight.innerHTML = ''
        pokemonImg.src = 'src/assets/images/whos-that-pokemon.png'
        pokemonDetails.style.display = 'none'
        input.value = ''
    }
}

form.addEventListener('submit', (search) => {
    search.preventDefault();
    input.value > maxPokemons || input.value == ' ' ? input.value = '' : renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon)