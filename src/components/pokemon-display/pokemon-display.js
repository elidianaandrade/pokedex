const pokemonDetails = document.querySelector('.choose-pokemon__details')
const pokemonName = document.querySelector('.choose-pokemon__name')
const pokemonNumber = document.querySelector('.choose-pokemon__number')
const pokemonTypes = document.querySelector('.choose-pokemon__types')
const pokemonAbilities = document.querySelector('.choose-pokemon__abilities')
const pokemonHeight = document.querySelector('.choose-pokemon__height')
const pokemonWeight = document.querySelector('.choose-pokemon__weight')

const pokemonImg = document.querySelector('.choose-pokemon__img')

const form = document.querySelector('.choose-pokemon__form')
const input = document.querySelector('.choose-pokemon__search')
let searchPokemon = 1;

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const pokemonData = await getPokemon(pokemon)

    if(pokemonData) {
        pokemonName.innerHTML = pokemonData.name
        pokemonNumber.innerHTML = `#${pokemonData.id}`
        pokemonTypes.innerHTML = pokemonData.types.map((typeSlot) => typeSlot.type.name).join(', ')
        pokemonAbilities.innerHTML = pokemonData.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name).join(', ')
        pokemonHeight.innerHTML = `${pokemonData.height / 10} m`
        pokemonWeight.innerHTML = `${pokemonData.weight / 10} kg`
        pokemonImg.src = pokemonData.sprites.other.dream_world.front_default
        pokemonDetails.style.display = 'flex'
        input.value = '';
    } else {
        pokemonName.innerHTML = 'Pokémon not found'
        pokemonNumber.innerHTML = ''
        pokemonTypes.innerHTML = ''
        pokemonAbilities.innerHTML = ''
        pokemonHeight.innerHTML = ''
        pokemonWeight.innerHTML = ''
        pokemonImg.src = 'src/assets/images/whos-that-pokemon.png'
        pokemonDetails.style.display = 'none'
        input.value = ''
    }
}

form.addEventListener('submit', (search) => {
    if (input.value != ' ') {
        search.preventDefault();
        renderPokemon(input.value.toLowerCase());
    }
});

renderPokemon(searchPokemon)