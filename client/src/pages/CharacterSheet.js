import {React, useState, useEffect} from "react"
import { useHistory } from "react-router-dom";
import {Box, FormField, Label, Button} from '../styles'
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'
import { Container, Row, Col } from 'react-bootstrap'



function CharacterSheet({ player }){
	const [currentHP, setCurrentHP]=useState(player.hit_points)
	const [damage, setDamage]=useState(0)
	const [healing, setHealing]=useState(0)
	const [initiative, setInitiative]=useState(0)
	const [levelFeatures, setLevelFeatures]=useState([])
	const [features, showFeatures]= useState(false)
	const [levelButtons, showLevelButtons]=useState([])
	const history = useHistory();
	let featArr=[]
	console.log(currentHP)
	// const submitDamage= (e) =>{
	// 	e.preventDefault()
	// 	console.log(e.target.value)
	// }
	function handleSubmitDamage(e){
		e.preventDefault()
		let hpNum = parseInt(currentHP) 
		let damageNum= parseInt(damage)
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
    });

  }
  	function handleSubmitHealing(e){
		e.preventDefault()
		let hpNum = parseInt(currentHP) 
		let healNum= parseInt(healing)
		setCurrentHP(hpNum+healNum)
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
  function rollInitiative(){
	 setInitiative(Math.floor((Math.random() * (20 - 1 + 1) + 1) + (((player.skills['DEX']) - 10)/2)))

  }
  function handleLevel(){
	  	fetch(`https://www.dnd5eapi.co/api/classes/${player.character_class}/levels/${player.level}`)
		  .then(r=>r.json())
		  .then(a=> setLevelFeatures(a.features))

  }
  useEffect(() => {
	  levelFeatures.forEach((s) =>
			fetch(`https://www.dnd5eapi.co/api/features/${s.index}`)
			.then( r=> r.json())
			.then(a=> featArr.push(a)))
  }, [levelFeatures])
  console.log(featArr)
//   console.log(featArr)
//   		(levelButtons? (levelButtons.forEach((s)=>featArr.push(<Button>{s.name}</Button>))) : (''))
    return(
        <>

			<div style={{flexDirection:"row", display:"flex", justifyContent: 'center', width:'100%'}}>
				<label for='char-name'>Character name:  </label>
				<span className="sheet-underlined sheet-center" id='char-name' name="attr_character_name" style={{fontWeight: 'bold'}}>  {player.character_name}</span>
			</div>
			<div style={{flexDirection:"row", display:"flex", justifyContent: 'center', width:'100%'}}>
				<label for='char-race'>Character race:</label>
				<span className="sheet-underlined sheet-center" id='char-race' style={{fontWeight: 'bold'}}>  {player.character_race}</span>
			</div>
			<div style={{flexDirection:"row", display:"flex", justifyContent: 'center', width:'100%'}}>
				<label for='char-class'>Character class:</label>
				<span className="sheet-underlined sheet-center" id='char-class' style={{fontWeight: 'bold'}}>  {player.character_class} </span>
			</div>	

		<span className="sheet-spacer"></span>
					<h4 style={{flexDirection:"row", display:"flex", justifyContent: 'center', width:'100%'}}>Core Stats</h4>
		
					<Container className="sheet-row" style={{ display:"flex", justifyContent: 'space-around',  position:'relative', width:'100%'}}>
	
					<Col>
						<Label>Str</Label>
							<Box name="attr_strength" id="attr_strength">{player.skills['STR']}</Box>
						<Divider vertical></Divider>
					</Col>
					<Col>
						<Label>Dex</Label>
							<Box name="attr_dex">{player.skills['DEX']}</Box>
						<Divider vertical></Divider>
					</Col>
					<Col>
						<Label>Con</Label>
							<Box name="attr_con">{player.skills['CON']}</Box>
						<Divider vertical></Divider>
					</Col>
					<Col>
						<Label>Int</Label>
							<Box name="attr_int">{player.skills['INT']}</Box>
						<Divider vertical></Divider>
					</Col>
					<Col>
						<Label>Wis</Label>
							<Box name="attr_wis">{player.skills['WIS']}</Box>
					   <Divider vertical></Divider>
					</Col>
					<Col>
						<Label>Cha</Label>
							<Box name="attr_cha">{player.skills['CHA']}</Box>
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
						<br/>
							<input className="sheet-underlined" type="number" name="attr_temp_HP" min="0" step="1"/>
							Temp HP
					
					</Container>
					
									<span>initiative: {initiative}</span>
				
								<div className="sheet-col-1-3 sheet-center">
									<button  onClick={rollInitiative} className="sheet-initiative sheet-large-button" name="roll_Initiative">Roll initiative!</button>
						
						<div className="sheet-col-1-2 sheet-padl">
							<h4 className="sheet-center">Armour className <span className="sheet-pictos-three">b</span></h4>
							<div className="sheet-row sheet-padb">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<input className="sheet-underlined" type="number" name="attr_AC" value="@{AC_calc}" disabled="disabled"/>
									<br/>AC (worn armour)</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<input className="sheet-underlined" type="number" name="attr_AC_no_armour" value="@{AC_no_armour_calc}" disabled="disabled"/>
									<br/>AC (no armour)</div>
							</div>
						</div>
						<Label>{player.character_class} Level</Label>
						<Box>{player.level}</Box>
						<Button onClick={()=>handleLevel()}>Level perks</Button>
						{featArr.map((s)=> 
						<div>(<Button>{s.name}</Button>)</div>)}

				</div>
		</>
)
}
export { CharacterSheet }