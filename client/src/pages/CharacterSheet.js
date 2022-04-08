import {React, useState, useEffect} from "react"
import { useHistory } from "react-router-dom";
import {Box, FormField, Error, Label, Button} from '../styles'
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'
import { Popup } from "reactjs-popup";
import { Container, Row, Col, Alert, Modal } from 'react-bootstrap'
import DeathSave from "../styles/DeathSave";
function CharacterSheet({ player, setPlayer }){
	const [currentHP, setCurrentHP]=useState(player.hit_points)
	const [damage, setDamage]=useState(0)
	const [healing, setHealing]=useState(0)
	const [initiative, setInitiative]=useState(0)
	const [proficiencies, setProficiencies]=useState([player.proficiencies])
	const [deathSave, setDeathSave]= useState(false)
	const [level, setLevel]=useState(parseInt(player.level))
	const [prof,allProf]=useState([])
	const[hitDice, setHitDice]=useState(player.level + 1)
	const[saved, setSaved]=useState(null)
	const [shortRest, setShortRest]=useState(0)
	const [isValid, setIsValid] = useState(true)
	const [num, setNum]=useState(0)
	const [profShow, setProfShow]= useState(false)
	const history = useHistory();
	let featArr=[]
	
	function handleSubmitDamage(e){
	 e.preventDefault()
		let hpNum = parseInt(currentHP) 
		let damageNum= parseInt(damage)
		if (hpNum-damageNum > 0){
		setCurrentHP(hpNum-damageNum)

	
  	 fetch(`/players/${player.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
		hit_points: currentHP
      }),
    }).then((r) => {
      if (r.ok) {
        history.push("/")
		setDamage(0)
      } else {
    
      }
    })}
	else{
		setCurrentHP(0)
		setDeathSave(true)
	}
  }
  	function handleSubmitHealing(e){
		e.preventDefault()
		let hpNum = parseInt(currentHP) 
		let healNum= parseInt(healing)
	if (hpNum+healNum <= parseInt(player.hit_points)){
		setCurrentHP(hpNum+healNum)}
	else{
		setCurrentHP(parseInt(player.hit_points))
	}
  	 fetch(`/players/${player.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
		hit_points: currentHP
      }),
    }).then((r) => {
      if (r.ok) {
        history.push("/")
		setHealing(0)
      } else {
    
      }
    });

  }
  function handleShortRest(e){
	  if (shortRest <= hitDice){
		e.preventDefault()
		
		let newNum = parseInt(shortRest) * Math.floor(((parseInt(player.hit_die)))+1)  
		let hpNum=parseInt(currentHP)
		if(hpNum+newNum <= parseInt(player.hit_points)){
		setCurrentHP(hpNum+newNum)}
		else{
			setCurrentHP(player.hit_points)
		}
		setHitDice(hitDice-shortRest)
  	 fetch(`/players/${player.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
		hit_points: currentHP
      }),
    }).then((r) => {
      if (r.ok) {
        history.push("/")
		setShortRest(0)
      } 
	
    });
	} else{
		e.preventDefault()
			setIsValid(false)
		}

  }
  function rollInitiative(){
	 setInitiative(Math.floor((Math.random() * (20 - 1 + 1) + 1) + (((player.DEX) - 10)/2)))
  }
  	function handleLevelUp(){
	let newHP = (parseInt(player.hit_points)+5)
	console.log(newHP)
	 setLevel(level + 1)
  	 fetch(`/players/${player.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
		level: level,
		hit_points: newHP
      }),
    }).then((r) => {
      if (r.ok) {
     
		fetch(`/players/${player.id}`)
		.then(r=>r.json())
		.then(a=> setPlayer(a))
		   history.push("/")
      }
    });

  }
let newArr=[]
useEffect(()=>{
  fetch(`https://www.dnd5eapi.co/api/classes/${player.character_class}/proficiencies`)
  .then(r=>r.json())
  .then(a=>allProf(a.results))
},[])
  if (prof !== []){
  prof.forEach(p=>newArr.push(p.name))
  proficiencies.forEach((p)=>newArr.push(p))
  }
    return(
        <>

			<div style={{flexDirection:"row", display:"flex", justifyContent: 'center', width:'100%'}}>
				<Divider/>
				<span>Character name:</span>
		<span className="sheet-spacer"></span>
				<Row>
				<span id='char-name' name="attr_character_name" style={{fontWeight: 'bold'}}>  {player.character_name}</span>
				</Row>
				<br/>
			</div>
			<div style={{flexDirection:"row", display:"flex", justifyContent: 'center', width:'100%'}}>
				<label for='char-race'>Character race:</label>
				<span className="sheet-underlined sheet-center" id='char-race' style={{fontWeight: 'bold'}}>  {player.character_race}</span>
			</div>
			<div style={{flexDirection:"row", display:"flex", justifyContent: 'center', width:'100%'}}>
				<label for='char-class'>Character class:</label>
				<span className="sheet-underlined sheet-center" id='char-class' style={{fontWeight: 'bold'}}>  {player.character_class} </span>
			</div>	
			<div style={{flexDirection:"row", display:"flex", justifyContent: 'center', width:'100%'}}>
				<label for='alignment'>Character alignment:  </label>
				<span className="sheet-underlined sheet-center" style={{fontWeight: 'bold'}}>  {player.alignment}</span>
			</div>
			<hr/>
		<span className="sheet-spacer"></span>
					<h4 style={{flexDirection:"row", display:"flex", justifyContent: 'center', width:'100%'}}>Core Stats</h4>
		
					<Container className="sheet-row" style={{ display:"flex", justifyContent: 'space-around',  position:'relative', width:'100%'}}>
	
					<Col>
						<Label>Str</Label>
							<Box name="attr_strength" id="attr_strength">{player.STR}</Box>
						<Divider vertical></Divider>
					</Col>
					<Col>
						<Label>Dex</Label>
							<Box name="attr_dex">{player.DEX}</Box>
						<Divider vertical></Divider>
					</Col>
					<Col>
						<Label>Con</Label>
							<Box name="attr_con">{player.CON}</Box>
						<Divider vertical></Divider>
					</Col>
					<Col>
						<Label>Int</Label>
							<Box name="attr_int">{player.INT}</Box>
						<Divider vertical></Divider>
					</Col>
					<Col>
						<Label>Wis</Label>
							<Box name="attr_wis">{player.WIS}</Box>
					   <Divider vertical></Divider>
					</Col>
					<Col>
						<Label>Cha</Label>
							<Box name="attr_cha">{player.CHA}</Box>
					<Divider vertical></Divider>
					</Col>
					</Container>
					<hr/>
					<Container style={{alignContent: 'center', position: 'relative'}}>
						<Row style={{alignContent: 'center', position: 'relative'}}>
							<Col>
							<Box >
									<span  id='hp-max'>{player.hit_points}</span><hr/>
									<span>Max HP</span>
							</Box>
							</Col>
							<Col>
							<Box>
									<span  id='hp-current'>{currentHP}</span><hr/>
									<span>Current HP</span>
							</Box>
							  {deathSave?
  					 <Alert onClose={() => setCurrentHP(parseInt(player.hit_points))} style={{width:'100%', alignContent:'center'}} dismissible>
						   <DeathSave player={player} saved={saved} setSaved={setSaved} history={history} setCurrentHP={setCurrentHP} currentHP={currentHP}/>
      					</Alert>
        : <p></p>}
							</Col>
						</Row>
						<br/>
						<Divider></Divider>
						<Container style={{position:'relative', alignContent: 'center'}}>
						<Row>
						<form onSubmit={handleSubmitDamage}>
					       <input type="number" id="name" value={damage} onChange={(e) => setDamage(e.target.value)} />
						   <button type='submit'>Deal damage</button>
						   </form>
						</Row>
						<Divider horizontal/>
						<Row>
						   <form onSubmit={handleSubmitHealing}>
					       <input type="number"  value={healing} onChange={(e) => setHealing(e.target.value)} />
						   <button type='submit'>Heal</button>
						   </form>
						</Row>
						</Container>
						<br/><hr/>
						<Label>Hit die</Label>
						<Box>{player.hit_die}</Box>
						<Label>Remaining hit dice</Label>
						<Box>{hitDice}</Box>
						<form onSubmit={handleShortRest}>
						<Label>How many hit dice would you like to use?</Label>
						<input type="number" value={shortRest} onChange={(e) =>setShortRest(e.target.value)} />
						<button type='submit'>Take a short rest!</button>
						</form>
						{ isValid? (''):(
						   <Alert variant='danger' onClose={() => setIsValid(true)} style={{width:'100%', alignContent:'center'}} dismissible>
							   Oops! That's too many hit dice!
     						 </Alert>)}
					</Container>
					<hr/><br/>
					<Container style={{justifyContent:'center'}}>
					<span style={{fontWeight:'bold'}}>Proficiency bonus: {parseInt(player.level + 1)}</span>
					<br/>
					<button onClick={()=> setProfShow(!profShow)}>Show my proficiencies</button>
					{profShow? 
					<ul>
					{newArr.map((r)=> <li>{r}</li>)}
					</ul>
					 : ''}
					 </Container>
					 <hr/><br/>
					<Container style={{justifyContent:'center', position:'relative'}}>
					<Box>
					<span style={{fontWeight:'bold'}}>initiative: {initiative}</span>
					</Box>
						<br/>
					<button  onClick={rollInitiative} className="sheet-initiative sheet-large-button" name="roll_Initiative">Roll initiative!</button>
					</Container>
					<hr/><br/>
					<Label>Armour class</Label>
					<Box>{10+(parseInt((player.DEX)/2))}</Box>
						<Label>{player.character_class} Level</Label>
						<Box>{level}</Box>
						<Popup trigger={<button>Level up!</button>} position='right center' style={{backgroundColor:'grey', alignContent:'center'}}>
							<Box>Are you sure you want to level up {player.character_name}? <text style={{fontWeight:'strong'}}>This cannot be undone!</text></Box>
							<Button onClick={handleLevelUp}>Yes, level up {player.character_name}!</Button>
						</Popup>
		</>
)
}
export { CharacterSheet }