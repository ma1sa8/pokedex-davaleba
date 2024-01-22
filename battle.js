const myteam = document.getElementById('myTeam')
const enemy = document.getElementById('enemyTeam')
const pokemon_count = 5;
const pokemons = localStorage.getItem('pokemons')
const teamEnemy = localStorage.getItem('enemies')
const myPokemons = JSON.parse(pokemons)
const enemies = JSON.parse(teamEnemy)

const colors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};


const main_types = Object.keys(colors)
myPokemons.forEach((pokemon)=>{
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const id = pokemon.id.toString().padStart(3, '0')
    const name = pokemon.name
    const poke_type = pokemon.types.map(type => type.type.name)
    
    const type = main_types.find(type => poke_type.indexOf(type) > -1)
    
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHtml = `
    <span class="number">#${id}</span>
            <div class="img_container">
                <img src="${pokemon?.sprites?.other?.dream_world?.front_default}" >
            </div>
            <div class="info">
                <h3 class="name">${name}</h3>
                <small class="type">type : ${type}</small>
            </div>
        
    `
    pokemonEl.innerHTML = pokemonInnerHtml
    myteam.appendChild(pokemonEl)
})

enemies.forEach((pokemon)=>{
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const id = pokemon.id.toString().padStart(3, '0')
    const name = pokemon.name
    const poke_type = pokemon.types.map(type => type.type.name)
    
    const type = main_types.find(type => poke_type.indexOf(type) > -1)
    
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHtml = `
    <span class="number">#${id}</span>
            <div class="img_container">
                <img src="${pokemon?.sprites?.other?.dream_world?.front_default}" >
            </div>
            <div class="info">
                <h3 class="name">${name}</h3>
                <small class="type">type : ${type}</small>
            </div>
        
    `
    pokemonEl.innerHTML = pokemonInnerHtml
    enemy.appendChild(pokemonEl)
})
