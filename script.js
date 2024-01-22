const poke_container = document.getElementById('poke-container');

const pokemon_count = 10;

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
const pokemons = []
let randPoke = []
let selectedIndices = []
const fetchPokemon = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        let get = Math.floor(Math.random() * 450);
        await getPokemon(get)
    }
}
const getRandPokemon = async ()=>{
    for (let i = 0; i < 5; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * 20);
        } while (selectedIndices.includes(randomIndex));
        selectedIndices.push(randomIndex);
        const url = `https://pokeapi.co/api/v2/pokemon/${randomIndex}`
        const res = await fetch(url)
        const data = await res.json()
        randPoke.push(data);
  }
    localStorage.setItem('enemies',JSON.stringify(randPoke))
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    
    createPokemonCard(data)
}

function hideContextMenu() {
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = 'none';
    document.removeEventListener('click', hideContextMenu);
}
function hideDetails() {
    const detailsMenu = document.getElementById('details');
    detailsMenu.style.display = 'none';
    document.removeEventListener('click', hideDetails);
}

const createPokemonCard = (pokemon) => {
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
    pokemonEl.oncontextmenu = function (event)
    {
        const contextMenu = document.getElementById('context-menu');
        contextMenu.innerHTML = `
        <ul>
            <li onclick="menuItemClicked('choose')">Select</li>
            <li onclick="menuItemClicked('details')">Details</li>
        </ul>
        `
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.display = 'flex';
        document.addEventListener('click', hideContextMenu);
        menuItemClicked = function (option){
            if(option=='choose'){
                pokemons.push(pokemon)
                console.log(pokemons)
                if(pokemons.length>5){
                    alert('cant choose anymore')
                    pokemons.splice(5, 1)
                    
                }else if(pokemons.length<=5){
                    const pokesContainer = document.getElementById('pokes')
                    pokesContainer.innerHTML='';
                    pokemons.forEach((pokemon) => {
                        const pokeEl = document.createElement("div")
                        const poke_type = pokemon.types.map(type => type.type.name)
                        const type = main_types.find(type => poke_type.indexOf(type) > -1)
                        const color = colors[type]
                        pokeEl.style.backgroundColor = color
                        pokeEl.classList.add("pokemon")
                        pokeEl.innerHTML = `
                            <span class="number">#${pokemon.id}</span>
                            <div class="img_container">
                                <img src="${pokemon?.sprites?.other?.dream_world?.front_default}" >
                            </div>
                            <div class="info">
                                <h3 class="name">${pokemon.name}</h3>
                                <small class="type">type : ${type}</small>
                            </div>
                        `
                        pokeEl.oncontextmenu = function (event)
                        {
                            const contextMenu = document.getElementById('context-menu');
                            contextMenu.innerHTML = `
                            <ul>
                                <li onclick="chosenItemClicked('deselect')">Deselect</li>
                            </ul>
                            `
                            contextMenu.style.left = `${event.clientX}px`;
                            contextMenu.style.top = `${event.clientY}px`;
                            contextMenu.style.display = 'flex';
                            document.addEventListener('click', hideContextMenu);
                            console.log(pokemon.id)
                            const index = pokemons.indexOf(pokemon)
                            console.log(index)
                            chosenItemClicked = function (option){
                                if(option=='deselect'){
                                    pokesContainer.innerHTML='';
                                    pokemons.splice(index,1)
                                    
                                    console.log(pokemons)
                                    
                                    pokemons.forEach((pokemon) => {
                                        const selected = document.createElement("div")
                                        const poke_type = pokemon.types.map(type => type.type.name)
                                        const type = main_types.find(type => poke_type.indexOf(type) > -1)
                                        const color = colors[type]
                                        selected.style.backgroundColor = color
                                        selected.classList.add("pokemon")
                                        selected.innerHTML = `
                                            <span class="number">#${pokemon.id}</span>
                                            <div class="img_container">
                                                <img src="${pokemon?.sprites?.other?.dream_world?.front_default}" >
                                            </div>
                                            <div class="info">
                                                <h3 class="name">${pokemon.name}</h3>
                                                <small class="type">type : ${type}</small>
                                            </div>
                                        `
                                        const showButton = document.getElementById('butt')
                                        showButton.style.display = 'none'
                                        showButton.innerHTML = '';
                                        pokes?.appendChild(selected)
                                    })
                                    
                                }
                            }
                            return false
                        }
                        pokes?.appendChild(pokeEl)
                    })
                    if(pokemons.length==5){
                        const showButton = document.getElementById('butt')
                        showButton.style.display = 'flex'
                        showButton.innerHTML = `
                        <button type="button" id="battle" onclick="sendPokemonsToBattle()">
                            start battle
                        </button>
                        `
                    }
                }
            }
            else if (option=='details'){
                console.log(pokemon)
                const details = document.getElementById('details');
                details.innerHTML = `
                    <h3>${name}</h3>
                    <ul>
                        <li>height: ${pokemon.height}</li>
                        <li>base experience: ${pokemon.base_experience}</li>
                    </ul>
                `
                details.style.left = `${event.clientX}px`;
                details.style.top = `${event.clientY}px`;
                details.style.display = 'flex'
                pokemonEl.addEventListener('click',hideDetails)
            }
            hideContextMenu();
            
        }
        return false
    }
    

    pokemonEl.innerHTML = pokemonInnerHtml
    poke_container?.appendChild(pokemonEl)

}
const sendPokemonsToBattle = ()=>{
    localStorage.setItem('pokemons',JSON.stringify(pokemons))
    window.location.href = "battle.html"
}
getRandPokemon()
fetchPokemon()

