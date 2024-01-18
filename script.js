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
    console.log(randPoke)
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
    const contextMenu = document.getElementById('details');
    contextMenu.style.display = 'none';
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
            <li onclick="menuItemClicked('choose')">choose</li>
            <li onclick="menuItemClicked('details')">details</li>
        </ul>
        `
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.display = 'flex';
        document.addEventListener('click', hideContextMenu);
        let num = id
        console.log(num)
        menuItemClicked = function (option){
            if(option=='choose'){
                pokemons.push(pokemon)
                console.log(pokemons)
                if(pokemons.length>5){
                    alert('cant choose anymore')
                    pokemons.splice(5, 1)
                    
                }else if(pokemons.length==5){
                    pokemons.forEach((pokemon) => {
                        const pokeEl = document.createElement("div")
                        
                        pokeEl.classList.add("pokemon")
                        pokeEl.innerHTML = `
                            <div class="img_container">
                                <img src="${pokemon?.sprites?.other?.dream_world?.front_default}" >
                            </div>
                            <h2>${pokemon.name}</h2>
                          `
                        
                        pokes?.appendChild(pokeEl)
                    })
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
                pokemonEl.addEventListener('click',hideDetails)
            }
            hideContextMenu();
            
        }
        return false
    }
    

    pokemonEl.innerHTML = pokemonInnerHtml
    poke_container?.appendChild(pokemonEl)

}


getRandPokemon()
fetchPokemon()

// function menuItemClicked(option) {
//     if(option=='option 1'){
//         console.log(createPokemonCard.pokemon.id)
//     }
//     hideContextMenu();
// }
// async function () {
//     const config = {
//         headers : {
//             Accept : "application/json"
//         }
//     }

//     fetch("https://icanhazdadjoke.com/")
// }


// async function generateJoke() {
//     const config = {
//         headers : {
//             Accept : "application/json"
//         }
//     }

//     const res = await fetch("https://icanhazdadjoke.com/", config)
//     const data = await res.json()
    
//    console.log(data.joke)
// }

// generateJoke()