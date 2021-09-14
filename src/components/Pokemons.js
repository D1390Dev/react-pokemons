import React, { useState, useEffect} from "react";
import PokemonHook from "./PokemonHook";
import "./Pokemons.css";

export default function Pokemons (){
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const getPokemons = async(url) => {
            let answer = await fetch(url),
            json = await answer.json();

            json.results.forEach(async (element) => {
                let answer = await fetch(element.url),
                json = await answer.json();
                console.log(json);

                //Asignar estilo para cada tipo de carta pokemon
                let classCard = "";
                switch(json.types[0].type.name){
                    case 'grass':
                        classCard = "poke-box-internal pk-grass-bug";
                        break;
                    case 'fire':
                        classCard = "poke-box-internal pk-fire";
                        break;
                    case 'water':
                        classCard = "poke-box-internal pk-water";
                        break;
                    case 'bug':
                        classCard = "poke-box-internal pk-grass-bug";
                        break;
                    case 'normal':
                        classCard = "poke-box-internal pk-normal";
                        break;
                    default:
                        classCard = "";
                        break;
                }

                let pokemon = {
                    id : json.id,
                    name : json.name,
                    type : json.types[0].type.name,
                    avatar : json.sprites.front_default,
                    classN : classCard,
                    move1 : json.moves[0].move.name,
                    move2 : json.moves[1].move.name,
                    healtPoints : json.stats[0].base_stat,
                    attack : json.stats[1].base_stat,
                    defense : json.stats[2].base_stat,
                    speed : json.stats[5].base_stat,
                    height : json.height,
                    weight : json.weight,
                };

                setPokemons((pokemons) => [...pokemons, pokemon]);
            });
        }

        getPokemons("https://pokeapi.co/api/v2/pokemon/");
    }, []);
    
    return(
        <>
            <h2>Peticiones asíncronas en Hooks</h2>
            <div className="">
                <div className="poke-row">
                    { pokemons.length === 0 ? (
                        <h3>Cargando...</h3>
                    ): (
                        pokemons.map((el) => (
                            <PokemonHook 
                                key={ el.id } 
                                avatar={ el.avatar } 
                                name={ el.name }
                                type={ el.type } 
                                className={ el.classN }
                                moveOne = { el.move1 }
                                moveTwo = { el.move2 }
                                hp = { el.healtPoints }
                                atk = { el.attack }
                                def = { el.defense }
                                spd = { el.speed }
                                height = { el.height / 10 }
                                weight = { el.weight /10 }
                            >
                            </PokemonHook>
                        ))
                    )}
                </div>
            </div>        
        </>
    )
}
