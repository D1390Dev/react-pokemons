import React, { useState, useRef } from "react";
/*
const useMove = () => {

    const [state, setState] = useState({x: 0, y: 0})
  
    const handleMouseMove = e => {
      e.persist()
      setState(state => ({...state, x: e.clientX, y: e.clientY}))
    }

    return {
      x: state.x,
      y: state.y,
      handleMouseMove,
    }
}
  
const PokemonHook = () => {

    const {x, y, handleMouseMove} = useMove()

    return (
        <div className="" onMouseMove={ handleMouseMove }>
            <Pokemons valorX={x} valorY={y}></Pokemons>
        </div>
    )
}
  
export default PokemonHook
*/
/*
function useMove (){

  const [state, setState] = useState({x: 0, y: 0});
  
  const handleMouseMove = e => {
    e.persist()
    setState(state => ({...state, x: e.clientX, y: e.clientY}))
  }

  return {
    x: state.x,
    y: state.y,
    handleMouseMove,
  }
}

export default function PokemonHook () {

  const {x, y, handleMouseMove} = useMove();
  let styleName =`rotate(${x}deg)`;

  let styleTrans = {
    rotate: styleName
  }

  return (
      <div style={{transform:styleTrans.rotate}} onMouseMove={ handleMouseMove }>
          <Pokemons valorX={x} valorY={y}></Pokemons>
      </div>
  )
}
*/

function useMove (){

  let refBox = useRef();
  const [state, setState] = useState({x: 0, y: 0});
  const [boxRect, setBoxRect] = useState([]);
  
  const handleMouseMove = e => {
    e.persist()
    setState(state => ({...state, x: e.clientX, y: e.clientY}))
    setBoxRect(refBox.current.getBoundingClientRect())
  }

  const handleMouseStop = () => {
    setState({x: 0, y: 0})
  }

  return {
    x: state.x,
    y: state.y,
    handleMouseMove,
    handleMouseStop,
    refBox,
    boxRect
  }
}

export default function PokemonHook (props) {

  const {x, y, handleMouseMove, handleMouseStop, refBox, boxRect} = useMove();

  const xPosition = (x - boxRect.left) / boxRect.width;
  const yPosition = (y - boxRect.top) / boxRect.height - 0.6;
  const xOffset = -(xPosition - 0.6);
  const dxNorm = Math.min(Math.max(xOffset, -0.6), 0.6);

  let styleName = "";
  let styleZIndex = "";

  if(x === 0){
    styleName =`rotate(0deg)`
  }else(
    styleName =`perspective(1000px) rotateY(${dxNorm*45}deg) rotateX(${yPosition*45}deg) scale(120%,120%)`
  );

  if(y === 0){
    styleZIndex = "0"
  }else(
    styleZIndex = "10"
  );

  let myStyle = {
    transform: styleName,
    zIndex: styleZIndex,
  };

  let pokeStyleHP = {
    margin: '0%',
    color: 'red',
  };

  return (
      /*<div ref={ refBox } style={ myStyle } onMouseMove={ handleMouseMove } onMouseLeave={ handleMouseStop }>
          <Pokemons valorX={x} valorY={y}></Pokemons>
      </div>*/

      <div key={ props.id } className="poke-box-external" style={{ width: '33%'}}>
        <div className={ props.className } ref={ refBox } style={ myStyle } onMouseMove={ handleMouseMove } onMouseLeave={ handleMouseStop }>
            <span></span>
            <div className="poke-content">
                <div className="poke-name">
                    <p style={{margin: '0%'}}>{ props.name }</p>
                    <p style={ pokeStyleHP }>{ props.hp } HP</p>
                </div>
                <div className="poke-image">
                    <img src={ props.avatar } alt={ props.name }></img>
                    <div className="height-weight">
                        <p>Type: { props.type }</p>
                        <p>Height: { props.height }meters</p>
                        <p>Weight: { props.weight }Kg</p>
                    </div>
                </div>
                <div className="poke-moves">
                    <p>{ props.moveOne }</p>
                    <p>{ props.moveTwo }</p>
                </div>
                <hr style={ {margin: '0.5%'} }/>
                <div className="poke-stats">
                    <p>Attack: { props.atk } </p>
                    <p>Defense: { props.def }</p>
                    <p>Speed: { props.spd }</p>
                </div>
            </div>
        </div>
      </div>
  )
}