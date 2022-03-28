import {React, useState} from "react";
import { useHistory } from "react-router-dom";
import {Box, FormField, Label, Button} from '../styles'
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'
import { Container, Row, Col } from 'react-bootstrap'



function CharacterSheet({ player }){
	const [currentHP, setCurrentHP]=useState(player.hit_points)
	const [damage, setDamage]=useState(0)
	const [healing, setHealing]=useState(0)
	const [initiative, setInitiative]=useState(0)
	const history = useHistory();
	
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
    return(
        <>
	

			<div className="sheet-cl-1-3 sheet-margin-top"><img src="http://i.imgur.com/Y8KHPKm.png" alt="Dungeons and Dragons (5th edition)"/></div>

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
		
				<div className="sheet-col-1-2 sheet-padr">
					<h4 className="sheet-center">Hit Points <span className="sheet-pictos"></span> and Speed <span className="sheet-pictos">1</span></h4>
					<div className="sheet-row sheet-padb">
						<div className="sheet-col-1-2 sheet-padr sheet-border-right">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<span  id='hp-max'>{player.hit_points}</span><br/>Max HP</div>
									<span  id='hp-current'>{currentHP}</span><br/>current HP</div>
							<form onSubmit={handleSubmitDamage}>
					       <input type="number" id="name" value={damage} onChange={(e) => setDamage(e.target.value)} />
						   <button type='submit'>Deal damage</button>
						   </form>
						   <form onSubmit={handleSubmitHealing}>
					       <input type="number"  value={healing} onChange={(e) => setHealing(e.target.value)} />
						   <button type='submit'>Heal</button>
						   </form>
							
						</div>
						<div className="sheet-col-1-4 sheet-padl sheet-padr sheet-border-right sheet-small-label sheet-center">
							<input className="sheet-underlined" type="number" name="attr_temp_HP" min="0" step="1"/>
							<br/>Temp HP</div>
						<div className="sheet-col-1-4 sheet-padl sheet-small-label sheet-center">
							<input className="sheet-underlined sheet-center" type="text" name="attr_speed"/>
							<br/>Speed</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-2">
							<div className="sheet-row sheet-padr">
								<div className="sheet-col-1-3 sheet-small-label sheet-center" title="Only enter additional bonuses to initiative here. Your Dex mod is already included in the macro button">
									<input className="sheet-underlined sheet-center" type="number" name="attr_initiative" value="0" step="1"/>
									<br/>Bonus</div>
								<div className="sheet-col-1-3 sheet-small-label sheet-center">
									<span>initiative: {initiative}</span>
								</div>
								<div className="sheet-col-1-3 sheet-center">
									<button  onClick={rollInitiative} className="sheet-initiative sheet-large-button" name="roll_Initiative">Roll initiative!</button>
								</div>
							</div>
						</div>
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
				
					<h4 className="sheet-center">Level and Experience<span className="sheet-pictos-three">d</span></h4>
					<div className="sheet-row">
						<div className="sheet-col-1-4 sheet-small-label sheet-center" title="This is automatically calculated from your individual className levels listed in the className section">
							<input className="sheet-underlined" type="number" name="attr_level" value="@{barbarian_level} + @{bard_level} + @{cleric_level} + @{druid_level} + @{fighter_level} + @{monk_level} + @{paladin_level} + @{ranger_level} + @{rogue_level} + @{sorcerer_level} + @{warlock_level} + @{wizard_level}" disabled="disabled"/>
							<br/>Overall Level</div>
						<div className="sheet-col-1-4 sheet-small-label sheet-center" title="This is a bonus for you being proficient in a given task.  This bonus automatically increases as you level up and is used automatically in various rolls">
							<input className="sheet-underlined" type="number" name="attr_PB" value="(ceil((@{level})/1e10) + ceil((@{level})/4))" disabled="disabled"/>
							<br/>Prof Bonus</div>

				</div>
			</div>
			<div className="sheet-row">
				<div className="sheet-col-5-12 sheet-padr">
					<h4 className="sheet-center">Bonuses/Penalties <span className="sheet-pictos">3</span></h4>
					<p className="sheet-small-note">Auto add a bonus/penalty to rolls made using the sheet macros. Usage : you acquire a magic item that gives +1 to your spell save DC, enter 1 in the spell save DC field. You are under the effects of the Bless spell, enter 1d4 in both attack roll fields, and the saving throw one.</p>
					<div className="sheet-row">
						<div className="sheet-col-6-13 sheet-center sheet-small-label sheet-sub-header">Melee</div>
						<div className="sheet-col-1-13">&nbsp;</div>
						<div className="sheet-col-6-13 sheet-center sheet-small-label sheet-sub-header">Ranged</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-3-13 sheet-small-label sheet-center">
							<input className="sheet-underlined sheet-center" type="text" name="attr_global_melee_attack_bonus" value="0"/>
							<br/>Attack Rolls</div>
						<div className="sheet-col-3-13 sheet-small-label sheet-center">
							<input className="sheet-underlined sheet-center" type="text" name="attr_global_melee_damage_bonus" value="0"/>
							<div>Damage Rolls</div>
						<div className="sheet-col-1-13">&nbsp;</div>
						<div className="sheet-col-3-13 sheet-small-label sheet-center">
							<input className="sheet-underlined sheet-center" type="text" name="attr_global_ranged_attack_bonus" value="0"/>
							<br/>Attack Rolls</div>
						<div className="sheet-col-3-13 sheet-small-label sheet-center">
							<input className="sheet-underlined sheet-center" type="text" name="attr_global_ranged_damage_bonus" value="0"/>
							<br/>Damage Rolls</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1 sheet-center sheet-small-label sheet-sub-header">Spellcasting</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-3 sheet-small-label sheet-center">
							<input className="sheet-underlined sheet-center" type="text" name="attr_global_spell_attack_bonus" value="0"/>
							<br/>Attack Rolls</div>
						<div className="sheet-col-1-3 sheet-small-label sheet-center">
							<input className="sheet-underlined sheet-center" type="text" name="attr_global_spell_damage_bonus" value="0"/>
							<br/>Damage Rolls</div>
						<div className="sheet-col-1-3 sheet-small-label sheet-center">
							<input className="sheet-underlined sheet-center" type="text" name="attr_global_spell_dc_bonus" value="0" step="1"/>
							<br/>Save DC</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1 sheet-center sheet-small-label sheet-sub-header">Saves and skill checks</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-2 sheet-small-label sheet-center">
							<input className="sheet-underlined sheet-center" type="text" name="attr_global_saving_bonus" value="0"/>
							<br/>Saving throws</div>
						<div className="sheet-col-1-2 sheet-small-label sheet-center">
							<input className="sheet-underlined sheet-center" type="text" name="attr_global_check_bonus" value="0"/>
							<br/>Ability/Skill Checks</div>
					</div>
				</div>
				<div className="sheet-col-7-12">
					<h4 className="sheet-center">Hit Dice <span className="sheet-d6-font">E</span></h4>
					<div className="sheet-row sheet-sub-header">
						<div className="sheet-col-3-7 sheet-center sheet-small-label">classNamees</div>
						<div className="sheet-col-1-7 sheet-center sheet-small-label">Hit Die</div>
						<div className="sheet-col-1-7 sheet-center sheet-small-label">Current</div>
						<div className="sheet-col-1-7 sheet-center sheet-small-label">Max</div>
						<div className="sheet-col-1-7 sheet-center sheet-small-label">&nbsp;</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-3-7 sheet-hd-row">Sorcerer, Wizard</div>
						<div className="sheet-col-1-7 sheet-center sheet-hd-row">d6</div>
						<div className="sheet-col-1-7">
							<input type="number" name="attr_hd_d6" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-7">
							<input type="number" name="attr_hd_d6_max" value="@{sorcerer_level} + @{wizard_level} " disabled="disabled"/>
						</div>
						<div className="sheet-col-1-7 sheet-center">
							<button type="roll" className="sheet-roll" name="roll_Use_HD_d6" value="&{template:5eDefault} {{title=Spending Hit Dice - 1d6}} {{subheader=@{character_name}}} {{rollname=HP regained}} {{roll=[[ 1d6 + @{constitution_mod} ]]}} ]]}} @{classNameactionhitdice}">Use</button>
						</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-3-7 sheet-hd-row">Bard, Cleric, Druid, Rogue, Monk, Warlock</div>
						<div className="sheet-col-1-7 sheet-center sheet-hd-row">d8</div>
						<div className="sheet-col-1-7">
							<input type="number" name="attr_hd_d8" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-7">
							<input type="number" name="attr_hd_d8_max" value="@{bard_level} + @{cleric_level} + @{druid_level} + @{rogue_level} + @{monk_level} + @{warlock_level}" disabled="disabled"/>
						</div>
						<div className="sheet-col-1-7 sheet-center">
							<button type="roll" className="sheet-roll" name="roll_Use_HD_d8" value="&{template:5eDefault} {{title=Spending Hit Dice - 1d8}} {{subheader=@{character_name}}} {{rollname=HP regained}} {{roll=[[ 1d8 + @{constitution_mod} ]]}} ]]}} @{classNameactionhitdice}">Use</button>
						</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-3-7 sheet-hd-row">Fighter, Paladin, Ranger</div>
						<div className="sheet-col-1-7 sheet-center sheet-hd-row">d10</div>
						<div className="sheet-col-1-7">
							<input type="number" name="attr_hd_d10" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-7">
							<input type="number" name="attr_hd_d10_max" value="@{fighter_level} + @{paladin_level} + @{ranger_level}" disabled="disabled"/>
						</div>
						<div className="sheet-col-1-7 sheet-center">
							<button type="roll" className="sheet-roll" name="roll_Use_HD_d10" value="&{template:5eDefault} {{title=Spending Hit Dice - 1d10}} {{subheader=@{character_name}}} {{rollname=HP regained}} {{roll=[[ 1d10 + @{constitution_mod} ]]}} ]]}} @{classNameactionhitdice}">Use</button>
						</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-3-7 sheet-hd-row">Barbarian</div>
						<div className="sheet-col-1-7 sheet-center sheet-hd-row">d12</div>
						<div className="sheet-col-1-7">
							<input type="number" name="attr_hd_d12" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-7">
							<input type="number" name="attr_hd_d12_max" value="@{barbarian_level}" disabled="disabled"/>
						</div>
						<div className="sheet-col-1-7 sheet-center">
							<button type="roll" className="sheet-roll" name="roll_Use_HD_d12" value="&{template:5eDefault} {{title=Spending Hit Dice - 1d12}} {{subheader=@{character_name}}} {{rollname=HP regained}} {{roll=[[ 1d12 + @{constitution_mod} ]]}} ]]}} @{classNameactionhitdice}">Use</button>
						</div>
					</div>
					<h4 className="sheet-center">Other <span className="sheet-pictos">o</span></h4>
					<div className="sheet-row">
						<div className="sheet-col-1-5 sheet-center sheet-small-label sheet-sub-header sheet-padr">Inspiration?</div>
						<div className="sheet-col-4-5 sheet-center sheet-small-label sheet-sub-header sheet-padl">Death Saving Throws</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-5 sheet-padr sheet-center sheet-margin-top">
							<input className="sheet-inspiration" type="checkbox" name="attr_inspiration" value="1"/><span className="sheet-inspiration-tab"></span>
						</div>
						<div className="sheet-col-3-5 sheet-padl">
							<div className="sheet-row">
								<div className="sheet-col-1-4 sheet-margin-top sheet-small-label">Successes : </div>
								<div className="sheet-col-3-4 sheet-center">
									<input className="sheet-death-save-success" type="checkbox" name="attr_death_save_success_1" value="1"/>
									
									</div><span className="sheet-death-save-success-tab"/>
									<input className="sheet-death-save-success" type="checkbox" name="attr_death_save_success_2" value="1"/><span className="sheet-death-save-success-tab"/>
									<input className="sheet-death-save-success" type="checkbox" name="attr_death_save_success_3" value="1"/><span className="sheet-death-save-success-tab"/>
								</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-4 sheet-margin-top sheet-small-label">Failures : </div>
								<div className="sheet-col-3-4 sheet-center">
									<input className="sheet-death-save-fail" type="checkbox" name="attr_death_save_fail_1" value="1"/><span className="sheet-death-save-fail-tab"/>
									<input className="sheet-death-save-fail" type="checkbox" name="attr_death_save_fail_2" value="1"/><span className="sheet-death-save-fail-tab"/>
									<input className="sheet-death-save-fail" type="checkbox" name="attr_death_save_fail_3" value="1"/><span className="sheet-death-save-fail-tab"/>
								</div>
							</div>
						</div>
						<div className="sheet-col-1-5 sheet-margin-top">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-center">
									<button type="roll" className="sheet-roll" name="roll_Death_Saving_Throw" value="@{ro_deathsave_whisper} &{template:5eDefault} {{character_name=@{character_name}}} {{title=Death Save}} {{subheader=@{character_name}}} {{deathsave=1}} {{simple=1}} {{rollname=Death save}} {{roll1=[[ 1d20 + [[@{global_saving_bonus}]] ]]}} @{ro_deathsave} @{classNameactiondeathsave}">Death Saving Throw</button>
								</div>
								<div className="sheet-col-1-2 sheet-align-center">
									<input type="checkbox" name="attr_death_save_ro" className="sheet-ro-checkbox" value="1" /><span className="sheet-ro-label">y</span>
									{/* Modal template Should be placed as the first element immediately after the input checkbox to open it */}
									<div className="sheet-ro-modal sheet-save-modal">
										<div>
											{/* Modal Title and close button row */}
											<div className="sheet-row sheet-ro-header sheet-border-bottom sheet-padb">
												<div className="sheet-col-3-4 sheet-ro-title">DEATH save throw roll options</div>
												<div className="sheet-col-1-4 sheet-ro-close-wrapper">
													<input type="checkbox" name="attr_death_save_ro" className="sheet-ro-close-checkbox" value="1" />
													<span className="sheet-ro-close-label"></span>
												</div>
											</div>
											{/* define hidden attribute to store summary of all options selected */}
											<input type="hidden" name="attr_ro_deathsave" value="@{ro_deathsave_rolltype}@{ro_deathsave_roll2_closing} @{ro_deathsave_emoteprompt} @{ro_deathsave_showmath}" />
											{/*Help text and copy of roll button*/}
											<div className="sheet-row sheet-padb">
												<div className="sheet-col-1-3 sheet-padl">
													<button type="roll" className="sheet-roll" name="roll_Death_Saving_Throw_ro" value="@{ro_deathsave_whisper} &{template:5eDefault} {{character_name=@{character_name}}} {{title=Death Save}} {{subheader=@{character_name}}} {{deathsave=1}} {{simple=1}} {{rollname=Death save}} {{roll1=[[ 1d20 + [[@{global_saving_bonus}]] ]]}} @{ro_deathsave} @{classNameactiondeathsave}">Roll</button>
												</div>
											</div>
											<hr/>
											{/* Define options here */}
											<div className="sheet-row sheet-checkbox-row">
												<div className="sheet-col-1-3 sheet-ro-optionlabel">Roll type</div>
												<div className="sheet-col-2-3 sheet-padl sheet-ro-option">
												</div>
											</div>
											<hr/>
							
		<div className="sheet-section-background">
			<h4 className="sheet-center">Appearance, Vision, Languages and Alignment <span className="sheet-pictos">U</span></h4>
			<div className="sheet-row">
				<div className="sheet-col-1-7 sheet-small-label sheet-center">
					<input className="sheet-underlined sheet-center" type="text" name="attr_gender"/>
					<br/>Gender</div>
				<div className="sheet-col-1-7 sheet-small-label sheet-center">
					<input className="sheet-underlined sheet-center" type="number" name="attr_age"/>
					<br/>Age</div>
				<div className="sheet-col-1-7 sheet-small-label sheet-center">
					<input className="sheet-underlined sheet-center" type="text" name="attr_height"/>
					<br/>Height</div>
				<div className="sheet-col-1-7 sheet-small-label sheet-center">
					<input className="sheet-underlined sheet-center" type="text" name="attr_weight"/>
					<br/>Weight</div>
				<div className="sheet-col-1-7 sheet-small-label sheet-center">
					<input className="sheet-underlined sheet-center" type="text" name="attr_eyes"/>
					<br/>Eyes</div>
				<div className="sheet-col-1-7 sheet-small-label sheet-center">
					<input className="sheet-underlined sheet-center" type="text" name="attr_hair"/>
					<br/>Hair</div>
				<div className="sheet-col-1-7 sheet-small-label sheet-center">
					<input className="sheet-underlined sheet-center" type="text" name="attr_size"/>
					<br/>Size</div>
			</div>
			<div className="sheet-row sheet-padb">
				<div className="sheet-col-1-6 sheet-small-label sheet-center">
					<input className="sheet-underlined sheet-center" type="text" name="attr_vision"/>
					<br/>Vision</div>
				<div className="sheet-col-2-3 sheet-small-label sheet-center">
					<input className="sheet-underlined sheet-center" type="text" name="attr_prolanguages"/>
					<br/>Known Languages</div>
				<div className="sheet-col-1-6 sheet-small-label sheet-center">
					<input className="sheet-underlined sheet-center" type="text" name="attr_alignment"/>
					<br/>Alignment</div>
			</div>
			<h4 className="sheet-center">Background, Traits, Ideals, Bonds and Flaws <span className="sheet-pictos">g</span></h4>
			<div className="sheet-row sheet-sub-header">
				<div className="sheet-col-1-3 sheet-center sheet-small-label">Background</div>
				<div className="sheet-col-1-3 sheet-center sheet-small-label">Racial Traits</div>
				<div className="sheet-col-1-3 sheet-center sheet-small-label">Personality Traits</div>
			</div>
			<div className="sheet-row">
				<div className="sheet-col-1-3">
					<textarea name="attr_background"></textarea>
				</div>
				<div className="sheet-col-1-3">
					<textarea name="attr_racial_traits"></textarea>
				</div>
				<div className="sheet-col-1-3">
					<textarea name="attr_personality_traits"></textarea>
				</div>
			</div>
			<div className="sheet-row sheet-sub-header">
				<div className="sheet-col-1-3 sheet-center sheet-small-label">Ideals</div>
				<div className="sheet-col-1-3 sheet-center sheet-small-label">Bonds</div>
				<div className="sheet-col-1-3 sheet-center sheet-small-label">Flaws</div>
			</div>
			<div className="sheet-row">
				<div className="sheet-col-1-3">
					<textarea name="attr_ideals"></textarea>
				</div>
				<div className="sheet-col-1-3">
					<textarea name="attr_bonds"></textarea>
				</div>
				<div className="sheet-col-1-3">
					<textarea name="attr_flaws"></textarea>
				</div>
			</div>
			<h4 className="sheet-center">Equipment Proficiencies <span className="sheet-pictos">x</span></h4>
			<div className="sheet-row sheet-sub-header">
				<div className="sheet-col-1-3 sheet-center sheet-small-label">Armour Proficiencies</div>
				<div className="sheet-col-1-3 sheet-center sheet-small-label">Weapon Proficiencies</div>
				<div className="sheet-col-1-3 sheet-center sheet-small-label">Tool Proficiencies</div>
			</div>
			<div className="sheet-row">
				<div className="sheet-col-1-3">
					<textarea name="attr_pro_armour"></textarea>
				</div>
				<div className="sheet-col-1-3">
					<textarea name="attr_pro_weapons"></textarea>
				</div>
				<div className="sheet-col-1-3">
					<textarea name="attr_pro_tools"></textarea>
				</div>
			</div>
			<h4 className="sheet-center">Any other notes</h4>
			<div className="sheet-row">
				<div className="sheet-col-1">
					<textarea name="attr_misc_notes"></textarea>
				</div>
			</div>
			<hr/>
		</div>
		<div className="sheet-section-className">
			<h4 className="sheet-center">className Levels, Features, Notes and Feats<span className="sheet-pictos">Y</span></h4>
			<div className="sheet-row">
				<div className="sheet-col-7-12 sheet-padr">
					<div className="sheet-row sheet-sub-header">
						<div className="sheet-col-1 sheet-center sheet-small-label">className Levels</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Barbarian</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_barbarian_level" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Bard</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_bard_level" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Cleric</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_cleric_level" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Druid</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_druid_level" value="0" min="0" step="1"/>
						</div>
					</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Fighter</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_fighter_level" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Monk</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_monk_level" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Paladin</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_paladin_level" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Ranger</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_ranger_level" value="0" min="0" step="1"/>
						</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Rogue</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_rogue_level" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Sorcerer</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_sorcerer_level" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Warlock</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_warlock_level" value="0" min="0" step="1"/>
						</div>
						<div className="sheet-col-1-8 sheet-center sheet-margin-top">Wizard</div>
						<div className="sheet-col-1-8 sheet-center sheet-padr">
							<input type="number" name="attr_wizard_level" value="0" min="0" step="1"/>
						</div>
					</div>
				</div>
				<div className="sheet-col-5-12">
					<div className="sheet-row sheet-sub-header">
						<div className="sheet-col-1 sheet-center sheet-small-label">className Resources</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-5-12 sheet-center sheet-small-label">Name</div>
						<div className="sheet-col-1-4 sheet-center sheet-small-label">Recharge</div>
						<div className="sheet-col-1-6 sheet-center sheet-small-label">Current</div>
						<div className="sheet-col-1-6 sheet-center sheet-small-label">Max</div>
					</div>
				</div>
			</div>
			<h4 className="sheet-center">className and Racial Notes <span className="sheet-pictos">l</span></h4>
			<div className="sheet-row">
				<div className="sheet-col-1-2 sheet-padr">
					<div className="sheet-row">
						<div className="sheet-col-1 sheet-sub-header sheet-center sheet-small-label">className feature notes</div>
					</div>
					<textarea name="attr_className_features" className="sheet-large-textarea"></textarea>
				</div>
				<div className="sheet-col-1-2">
					<div className="sheet-row">
						<div className="sheet-col-1 sheet-sub-header sheet-center sheet-small-label">Other className Abilities, Notes and Feats</div>
					</div>
					<textarea name="attr_className_abilities_and_feats" className="sheet-large-textarea"></textarea>
				</div>
			</div>
			<div className="sheet-row">
				<div className="sheet-col-1">
					<p className="sheet-small-note">Add any className or racial features or abilities you gain in here (or in the large text sections at the bottom of this section). Adding them here allows you to use them either as their own macro (by using the roll button on each row), or auto include them as part of a another roll made on the sheet by checking the option in the entry. For example, a rogue may add their sneak attack feature here, and either use it by clicking on the Use button when required, and/or check the boxes to auto include it in melee and ranged weapon macros.</p>
				</div>
			</div>
				{/* BEGIN classNameaction row */}
						<div className="sheet-col-1-6 sheet-center">
							<button type='roll' className="sheet-roll" name="roll_classNameaction18" value="&{template:5eDefault} {{title=@{classNameactionname18}}} {{subheader=@{character_name}}} {{subheaderright=className/Racial/Other ability}} {{freetextname=@{classNameactionname18}}} {{freetext=@{classNameactionoutput18}}}">Use</button>
						</div>
					</div>
					<span className="sheet-small-note sheet-padr sheet-offset-1-12">Show output options?</span>
					<input type="checkbox" name="attr_classNameactionshowoptions18" className="sheet-classNameactionshowoptions18" value="1" />
							<div className="sheet-col-1-5 sheet-padl">
								<div className="sheet-className-action-zebra">
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Strength</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionstrengthsave18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Dexterity</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactiondexteritysave18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Constitution</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionconstitutionsave18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Intelligence</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionintelligencesave18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Wisdom</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionwisdomsave18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Charisma</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioncharismasave18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Death</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactiondeathsave18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
								</div>
							</div>
							<div className="sheet-col-1-5 sheet-padl">
								<div className="sheet-className-action-zebra">
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Initiative</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioninitiative18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Hit Dice</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionhitdice18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Melee Weapons</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionmeleeweapon18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Ranged Weapons</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionrangedweapon18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Spell Info</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionspellinfo18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Spell Cast</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionspellcast18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
								</div>
							</div>
							<div className="sheet-col-1-5 sheet-padl">
								<div className="sheet-className-action-zebra">
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Acrobatics</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionacrobatics18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Animal Handling</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionanimalhandling18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Arcana</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionarcana18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Athletics</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionathletics18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Deception</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactiondeception18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">History</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionhistory18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Insight</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioninsight18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Intimidation</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionintimidation18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Investigation</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioninvestigation18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
								</div>
							</div>
							<div className="sheet-col-1-5 sheet-padl">
								<div className="sheet-className-action-zebra">
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Medicine</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionmedicine18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Nature</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionnature18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Perception</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionperception18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Performance</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionperformance18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Persuasion</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionpersuasion18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Religion</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionreligion18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Sleight of Hand</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionsleightofhand18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Stealth</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionstealth18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Survival</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionsurvival18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
								</div>
							</div>
							<div className="sheet-col-1-5 sheet-padl">
								<div className="sheet-className-action-zebra">
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Custom 1</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioncustom1skill18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Custom 2</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioncustom2skill18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Custom 3</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioncustom3skill18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Custom 4</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioncustom4skill18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled STR</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilledstr18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled DEX</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilleddex18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled CON</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilledcon18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled INT</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilledint18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled WIS</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilledwis18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled CHA</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilledcha18" value="{{@{classNameactionname18}=@{classNameactionoutput18}}}" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* END classNameaction row */}
				{/* BEGIN classNameaction row */}
				<div className="sheet-classNameaction-row19 sheet-margin-bottom sheet-padr sheet-padl">
					<div className="sheet-row">
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Row</div>
						<div className="sheet-col-1-4 sheet-vert-bottom sheet-center sheet-small-label">Name</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Used</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Max</div>
						<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Recharge</div>
						<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Gained from?</div>
						<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Use</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-12 sheet-classNameaction-row-number sheet-margin-top">19</div>
						<div className="sheet-col-1-4">
							<input type="text" name="attr_classNameactionname19"/>
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_classNameactionresource19" value="1" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_classNameactionresource19_max" value="1" />
						</div>
						<div className="sheet-col-1-6">
							<select name="attr_classNameactionrecharge19">
								<option value="None">None</option>
								<option value="Short Rest">Short Rest</option>
								<option value="Long rest">Long Rest</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="sheet-col-1-6">
							<select name="attr_classNameactionsource19">
								<option value="Not set" selected="selected">---</option>
								<option value="Barbarian">Barbarian</option>
								<option value="Bard">Bard</option>
								<option value="Cleric">Cleric</option>
								<option value="Druid">Druid</option>
								<option value="Fighter">Fighter</option>
								<option value="Monk">Monk</option>
								<option value="Paladin">Paladin</option>
								<option value="Ranger">Ranger</option>
								<option value="Rogue">Rogue</option>
								<option value="Sorcerer">Sorcerer</option>
								<option value="Warlock">Warlock</option>
								<option value="Wizard">Wizard</option>
								<option value="Feat">Feat</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="sheet-col-1-6 sheet-center">
							<button type='roll' className="sheet-roll" name="roll_classNameaction19" value="&{template:5eDefault} {{title=@{classNameactionname19}}} {{subheader=@{character_name}}} {{subheaderright=className/Racial/Other ability}} {{freetextname=@{classNameactionname19}}} {{freetext=@{classNameactionoutput19}}}">Use</button>
						</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-padt">Output</div>
						<div className="sheet-col-11-12 sheet-margin-top">
							<textarea className="sheet-small-textarea" name="attr_classNameactionoutput19"></textarea>
						</div>
					</div>
					<span className="sheet-small-note sheet-padr sheet-offset-1-12">Show output options?</span>
					<input type="checkbox" name="attr_classNameactionshowoptions19" className="sheet-classNameactionshowoptions19" value="1" />
					<div className="sheet-classNameaction-output-options sheet-padb sheet-margin-bottom">
						<span className="sheet-col-1  sheet-padl sheet-padr sheet-small-note">Check the appropriate option(s) below to have the output automatically be included in the roll type specified</span>
						<div className="sheet-row sheet-small-label sheet-center">
							<div className="sheet-col-1-5">Saving Throws</div>
							<div className="sheet-col-1-5">Weapons/Spell/Misc</div>
							<div className="sheet-col-2-5">Core Skills</div>
							<div className="sheet-col-1-5">Custom/Unskilled checks</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-5 sheet-padl">
								<div className="sheet-className-action-zebra">
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Strength</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionstrengthsave19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Dexterity</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactiondexteritysave19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Constitution</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionconstitutionsave19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Intelligence</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionintelligencesave19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Wisdom</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionwisdomsave19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Charisma</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioncharismasave19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Death</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactiondeathsave19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
								</div>
							</div>
							<div className="sheet-col-1-5 sheet-padl">
								<div className="sheet-className-action-zebra">
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Initiative</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioninitiative19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Hit Dice</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionhitdice19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Melee Weapons</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionmeleeweapon19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Ranged Weapons</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionrangedweapon19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Spell Info</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionspellinfo19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Spell Cast</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionspellcast19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
								</div>
							</div>
							<div className="sheet-col-1-5 sheet-padl">
								<div className="sheet-className-action-zebra">
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Acrobatics</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionacrobatics19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Animal Handling</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionanimalhandling19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Arcana</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionarcana19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Athletics</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionathletics19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Deception</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactiondeception19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">History</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionhistory19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Insight</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioninsight19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Intimidation</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionintimidation19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Investigation</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioninvestigation19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
								</div>
							</div>
							<div className="sheet-col-1-5 sheet-padl">
								<div className="sheet-className-action-zebra">
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Medicine</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionmedicine19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Nature</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionnature19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Perception</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionperception19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Performance</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionperformance19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Persuasion</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionpersuasion19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Religion</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionreligion19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Sleight of Hand</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionsleightofhand19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Stealth</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionstealth19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Survival</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionsurvival19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
								</div>
							</div>
							<div className="sheet-col-1-5 sheet-padl">
								<div className="sheet-className-action-zebra">
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Custom 1</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioncustom1skill19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Custom 2</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioncustom2skill19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Custom 3</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioncustom3skill19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Custom 4</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactioncustom4skill19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled STR</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilledstr19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled DEX</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilleddex19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled CON</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilledcon19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled INT</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilledint19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled WIS</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilledwis19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
									<div className="sheet-row sheet-margin-right">
										<div className="sheet-col-5-6">Unskilled CHA</div>
										<div className="sheet-col-1-12">
											<input type="checkbox" name="attr_classNameactionunskilledcha19" value="{{@{classNameactionname19}=@{classNameactionoutput19}}}" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* END classNameaction row */}
			
			
		<div className="sheet-section-weapons">
			
			<h4 className="sheet-center">Melee Weapons <span className="sheet-pictos">D</span></h4>
			<div className="sheet-row sheet-sub-header">
				<div className="sheet-col-1-24 sheet-center sheet-small-label sheet-vert-bottom">Prof?</div>
				<div className="sheet-col-1-6 sheet-center sheet-small-label sheet-vert-bottom">Weapon</div>
				<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-vert-bottom">Attack
					<br/>Stat</div>
				<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-vert-bottom sheet-padr">Magic Bonus</div>
				<div className="sheet-col-1-24 sheet-center sheet-small-label sheet-vert-bottom sheet-padr">To
					<br/>Hit</div>
				<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-vert-bottom">Damage Dice</div>
				<div className="sheet-col-1-24 sheet-center sheet-small-label sheet-vert-bottom">+ stat?</div>
				<div className="sheet-col-1-18 sheet-center sheet-small-label sheet-vert-bottom">Dmg
					<br/>Bonus</div>
				<div className="sheet-col-1-8 sheet-center sheet-small-label sheet-vert-bottom sheet-padr">Damage Type</div>
				<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-vert-bottom">Crit Dmg</div>
				<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-vert-bottom sheet-padr">Crit on a</div>
				<div className="sheet-col-1-18 sheet-center sheet-small-label sheet-vert-bottom">Attack</div>
				<div className="sheet-col-1-18 sheet-center sheet-small-label sheet-vert-bottom">&nbsp;</div>
			</div>
			{/* BEGIN melee weapon row */}
			<div className="sheet-row">
				<div className="sheet-col-1-24 sheet-checkbox-row">
					<input type="checkbox" value="@{PB}" name="attr_pbmelee1" checked="checked"/>
				</div>
				<div className="sheet-col-1-6">
					<input type="text" name="attr_meleeweaponname1"/>
				</div>
				<div className="sheet-col-1-12">
					<select name="attr_meleeattackstat1">
						<option value="@{strength_mod}" selected="selected">STR</option>
						<option value="@{finesse_mod}">Finesse</option>
						<option value="@{dexterity_mod}">DEX</option>
						<option value="@{constitution_mod}">CON</option>
						<option value="@{intelligence_mod}">INT</option>
						<option value="@{wisdom_mod}">WIS</option>
						<option value="@{charisma_mod}">CHA</option>
					</select>
				</div>
				<div className="sheet-col-1-12 sheet-padr" title="The magic bonus will be added as a bonus to BOTH the attack and damage rolls">
					<input type="number" name="attr_meleemagic1" value="0" step="1"/>
				</div>
				<div className="sheet-col-1-24 sheet-padr">
					<input type="number" name="attr_meleetohit1" value="@{meleeattackstat1} + @{pbmelee1} + @{meleemagic1}" disabled="disabled"/>
				</div>
				<div className="sheet-col-1-12" title="Only enter the base damage roll here without any bonuses from stats or other sources">
					<input className="sheet-center" type="text" name="attr_meleedmg1" value="0"/>
				</div>
				<div className="sheet-col-1-24 sheet-checkbox-row">
					<input type="checkbox" value="1" name="attr_meleeattackstatdmg1" checked="checked"/>
				</div>
				<div className="sheet-col-1-18">
					<input type="number" name="attr_meleedmgbonus1" value="(@{meleeattackstat1} * @{meleeattackstatdmg1}) + @{meleemagic1}" disabled="disabled"/>
				</div>
				<div className="sheet-col-1-8 sheet-padr">
					<input type="text" name="attr_meleedmgtype1"/>
				</div>
				<div className="sheet-col-1-12">
					<input className="sheet-center" type="text" value="0" name="attr_meleecritdmg1"/>
				</div>
				<div className="sheet-col-1-12 sheet-padr">
					<input type="number" name="attr_meleeweaponcritrange1" value="20" step="1"/>
				</div>
				<div className="sheet-col-1-18 sheet-center">
					<button type="roll" className="sheet-roll" name="roll_MeleeAttack1" value="&{template:5eDefault} {{character_name=@{character_name}}} {{title=@{meleeweaponname1}}} {{subheader=@{character_name}}} {{subheaderright=Melee attack}}  {{weapon=1}} {{simple=1}} {{rollname=Attack}} {{roll1=[[ 1d20cs>@{meleeweaponcritrange1} + [[@{meleetohit1}]] + [[@{global_melee_attack_bonus}]] ]]}} {{weapondamage=[[@{meleedmg1} + [[@{meleedmgbonus1}]] + [[(@{global_melee_damage_bonus})]] ]] @{meleedmgtype1}}} {{weaponcritdamage=Additional [[@{meleecritdmg1}]] damage}} @{classNameactionmeleeweapon}} @{ro_melee1} @{classNameactionmeleeweapon}">Attack</button>
				</div>
				<div className="sheet-col-1-18 sheet-align-center">
					<input type="checkbox" name="attr_melee1_ro" className="sheet-ro-checkbox" value="1" /><span className="sheet-ro-label">y</span>
					{/* Modal template Should be placed as the first element immediately after the input checkbox to open it */}
					<div className="sheet-ro-modal sheet-weapon-modal">
						<div>
							{/* Modal Title and close button row */}
							<div className="sheet-row sheet-ro-header sheet-border-bottom sheet-padb">
								<div className="sheet-col-3-4 sheet-ro-title">Melee weapon roll options</div>
								<div className="sheet-col-1-4 sheet-ro-close-wrapper">
									<input type="checkbox" name="attr_melee1_ro" className="sheet-ro-close-checkbox" value="1" />
									<span className="sheet-ro-close-label"></span>
								</div>
							</div>
							{/* define hidden attribute to store summary of all options selected */}
							<input type="hidden" name="attr_ro_melee1" value="@{ro_melee1_rolltype}@{ro_melee1_roll2_closing} @{ro_melee1_emoteprompt} @{ro_melee1_showmath}" />
							{/*Help text and copy of roll button*/}
							<div className="sheet-row sheet-padb">
								<div className="sheet-col-2-3 sheet-small-note">The settings here apply <b>only</b> to the roll specified in the title above. </div>
								<div className="sheet-col-1-3 sheet-padl">
									<button type="roll" className="sheet-roll" name="roll_MeleeAttack1_ro" value="&{template:5eDefault} {{character_name=@{character_name}}} {{title=@{meleeweaponname1}}} {{subheader=@{character_name}}} {{subheaderright=Melee attack}}  {{weapon=1}} {{simple=1}} {{rollname=Attack}} {{roll1=[[ 1d20cs>@{meleeweaponcritrange1} + [[@{meleetohit1}]] + [[@{global_melee_attack_bonus}]] ]]}} {{weapondamage=[[@{meleedmg1} + [[@{meleedmgbonus1}]] + [[(@{global_melee_damage_bonus})]] ]] @{meleedmgtype1}}} {{weaponcritdamage=Additional [[@{meleecritdmg1}]] damage}} @{classNameactionmeleeweapon}} @{ro_melee1} @{classNameactionmeleeweapon}">Roll</button>
								</div>
							</div>
							<hr/>
							{/* Define options here */}
							<div className="sheet-row sheet-checkbox-row">
								<div className="sheet-col-1-3 sheet-ro-optionlabel">Roll type</div>
								<div className="sheet-col-2-3 sheet-padl sheet-ro-option">
									<input type="hidden" name="attr_ro_melee1_roll2_closing" value="cs>@{meleeweaponcritrange1} + [[@{meleetohit1}]] + [[@{global_melee_attack_bonus}]] ]] }}" />
									<select name="attr_ro_melee1_rolltype">
										<option value="@{ro_default_rolltype}">Use Default</option>
										<option value="{{showadvroll=1}} {{roll2=[[ 1d20">Roll 2d20</option>
										<option value="{{noadvroll=1}}">Roll 1d20</option>
										<option value="?{Roll type?|Normal,&#123&#123noadvroll=1&#125&#125 |Advantage,&#123&#123rollhasadv=1&#125&#125 &#123&#123roll2=[[1d20|Disadvantage,&#123&#123rollhasdisadv=1&#125&#125 &#123&#123roll2=[[1d20}">Prompt for adv/disadv</option>
										<option value="{{rollhasadv=1}} {{roll2=[[ 1d20">ALWAYS Advantage</option>
										<option value="{{rollhasdisadv=1}} {{roll2=[[ 1d20">ALWAYS Disadvantage</option>
									</select>
								</div>
							</div>
							<hr/>
							<div className="sheet-row sheet-checkbox-row">
								<div className="sheet-col-1-3 sheet-ro-optionlabel">Prompt for emote?</div>
								<div className="sheet-col-2-3 sheet-padl sheet-ro-option">
									<input type="checkbox" name="attr_ro_melee1_emoteprompt" value="{{emote=?{Emote text} }}"/>
								</div>
							</div>
							<hr/>
							
						</div>
						{/* close inner modal div */}
					</div>
					{/* close outer modal div */}
				</div>
			</div>
			{/* END melee weapon row */}
			
			
			<h4 className="sheet-center">Ranged Weapons <span className="sheet-pictos">e</span></h4>
			<div className="sheet-row sheet-sub-header">
				<div className="sheet-col-1-24 sheet-center sheet-small-label sheet-vert-bottom">Prof?</div>
				<div className="sheet-col-1-18 sheet-center sheet-small-label sheet-vert-bottom">Ammo</div>
				<div className="sheet-col-1-6 sheet-center sheet-small-label sheet-vert-bottom">Weapon</div>
				<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-vert-bottom">Attack
					<br/>Stat</div>
				<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-vert-bottom sheet-padr">Magic Bonus</div>
				<div className="sheet-col-1-24 sheet-center sheet-small-label sheet-vert-bottom sheet-padr">To
					<br/>Hit</div>
				<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-vert-bottom">Damage Dice</div>
				<div className="sheet-col-1-24 sheet-center sheet-small-label sheet-vert-bottom">Dmg
					<br/>Bonus</div>
				<div className="sheet-col-1-8 sheet-center sheet-small-label sheet-vert-bottom sheet-padr">Damage Type</div>
				<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-vert-bottom">Crit Dmg</div>
				<div className="sheet-col-1-12 sheet-center sheet-small-label sheet-vert-bottom sheet-padr">Crit on a</div>
				<div className="sheet-col-1-18 sheet-center sheet-small-label sheet-vert-bottom">Attack</div>
				<div className="sheet-col-1-18 sheet-center sheet-small-label sheet-vert-bottom">&nbsp;</div>
			</div>
			{/* BEGIN ranged weapon row */}
			<div className="sheet-row">
				<div className="sheet-col-1-24 sheet-checkbox-row">
					<input type="checkbox" value="@{PB}" name="attr_pbranged1" checked="checked"/>
				</div>
				<div className="sheet-col-1-18">
					<input type="number" name="attr_rangedammo1" value="1"/>
				</div>
				<div className="sheet-col-1-6">
					<input type="text" name="attr_rangedweaponname1"/>
				</div>
				<div className="sheet-col-1-12" title="Choose either normal or thrown">
					<select name="attr_rangedtype1">
						<option value="@{dexterity_mod}" selected="selected">DEX</option>
						<option value="@{strength_mod}">STR</option>
						<option value="@{finesse_mod}">Finesse</option>
						<option value="@{constitution_mod}">CON</option>
						<option value="@{intelligence_mod}">INT</option>
						<option value="@{wisdom_mod}">WIS</option>
						<option value="@{charisma_mod}">CHA</option>
					</select>
				</div>
				<div className="sheet-col-1-12 sheet-padr" title="The magic bonus will be added as a bonus to BOTH the attack and damage rolls">
					<input type="number" name="attr_rangedmagic1" value="0" step="1"/>
				</div>
				<div className="sheet-col-1-24 sheet-padr">
					<input type="number" name="attr_rangedtohit1" value="@{rangedtype1} + @{pbranged1} + @{rangedmagic1}" disabled="disabled"/>
				</div>
				<div className="sheet-col-1-12" title="Only enter the base damage roll here without any bonuses from stats or other sources">
					<input className="sheet-center" type="text" name="attr_rangeddmg1" value="0"/>
				</div>
				<div className="sheet-col-1-24">
					<input type="number" name="attr_rangeddmgbonus1" value="@{rangedtype1} + @{rangedmagic1}" disabled="disabled"/>
				</div>
				<div className="sheet-col-1-8 sheet-padr">
					<input type="text" name="attr_rangeddmgtype1"/>
				</div>
				<div className="sheet-col-1-12">
					<input className="sheet-center" type="text" value="0" name="attr_rangedcritdmg1"/>
				</div>
				<div className="sheet-col-1-12 sheet-padr">
					<input className="sheet-center" type="number" name="attr_rangedweaponcritrange1" value="20" step="1"/>
				</div>
				<div className="sheet-col-1-18 sheet-center">
					<button type="roll" className="sheet-roll" name="roll_RangedAttack1" value="&{template:5eDefault} {{character_name=@{character_name}}} {{title=@{rangedweaponname1}}} {{subheader=@{character_name}}} {{subheaderright=Ranged attack}}  {{weapon=1}} {{simple=1}} {{rollname=Attack}} {{roll1=[[ 1d20cs>@{rangedweaponcritrange1} + [[@{rangedtohit1}]] + [[@{global_ranged_attack_bonus}]] ]]}} {{weapondamage=[[@{rangeddmg1} + [[@{rangeddmgbonus1}]] + [[(@{global_ranged_damage_bonus})]] ]] @{rangeddmgtype1}}} {{weaponcritdamage=Additional [[@{rangedcritdmg1}]] damage}} @{classNameactionrangedweapon}} @{ro_ranged1} @{classNameactionrangedweapon}">Attack</button>
				</div>
				<div className="sheet-col-1-18 sheet-align-center">
					<input type="checkbox" name="attr_ranged1_ro" className="sheet-ro-checkbox" value="1" /><span className="sheet-ro-label">y</span>
					{/* Modal template Should be placed as the first element immediately after the input checkbox to open it */}
					<div className="sheet-ro-modal sheet-weapon-modal">
						<div>
							{/* Modal Title and close button row */}
							<div className="sheet-row sheet-ro-header sheet-border-bottom sheet-padb">
								<div className="sheet-col-3-4 sheet-ro-title">Ranged weapon roll options</div>
								<div className="sheet-col-1-4 sheet-ro-close-wrapper">
									<input type="checkbox" name="attr_ranged1_ro" className="sheet-ro-close-checkbox" value="1" />
									<span className="sheet-ro-close-label"></span>
								</div>
							</div>
							{/* define hidden attribute to store summary of all options selected */}
							<input type="hidden" name="attr_ro_ranged1" value="@{ro_ranged1_rolltype}@{ro_ranged1_roll2_closing} @{ro_ranged1_emoteprompt} @{ro_ranged1_showmath}" />
							{/*Help text and copy of roll button*/}
							<div className="sheet-row sheet-padb">
								<div className="sheet-col-2-3 sheet-small-note">The settings here apply <b>only</b> to the roll specified in the title above. </div>
								<div className="sheet-col-1-3 sheet-padl">
									<button type="roll" className="sheet-roll" name="roll_rangedAttack1_ro" value="&{template:5eDefault} {{character_name=@{character_name}}} {{title=@{rangedweaponname1}}} {{subheader=@{character_name}}} {{subheaderright=Ranged attack}}  {{weapon=1}} {{simple=1}} {{rollname=Attack}} {{roll1=[[ 1d20cs>@{rangedweaponcritrange1} + [[@{rangedtohit1}]] + [[@{global_ranged_attack_bonus}]] ]]}} {{weapondamage=[[@{rangeddmg1} + [[@{rangeddmgbonus1}]] + [[(@{global_ranged_damage_bonus})]] ]] @{rangeddmgtype1}}} {{weaponcritdamage=Additional [[@{rangedcritdmg1}]] damage}} @{classNameactionrangedweapon}} @{ro_ranged1} @{classNameactionrangedweapon}">Roll</button>
								</div>
							</div>
							<hr/>
							{/* Define options here */}
							<div className="sheet-row sheet-checkbox-row">
								<div className="sheet-col-1-3 sheet-ro-optionlabel">Roll type</div>
								<div className="sheet-col-2-3 sheet-padl sheet-ro-option">
									<input type="hidden" name="attr_ro_ranged1_roll2_closing" value="cs>@{rangedweaponcritrange1} + [[@{rangedtohit1}]] + [[@{global_ranged_attack_bonus}]] ]] }}" />
									<select name="attr_ro_ranged1_rolltype">
										<option value="@{ro_default_rolltype}">Use Default</option>
										<option value="{{showadvroll=1}} {{roll2=[[ 1d20">Roll 2d20</option>
										<option value="{{noadvroll=1}}">Roll 1d20</option>
										<option value="?{Roll type?|Normal,&#123&#123noadvroll=1&#125&#125 |Advantage,&#123&#123rollhasadv=1&#125&#125 &#123&#123roll2=[[1d20|Disadvantage,&#123&#123rollhasdisadv=1&#125&#125 &#123&#123roll2=[[1d20}">Prompt for adv/disadv</option>
										<option value="{{rollhasadv=1}} {{roll2=[[ 1d20">ALWAYS Advantage</option>
										<option value="{{rollhasdisadv=1}} {{roll2=[[ 1d20">ALWAYS Disadvantage</option>
									</select>
								</div>
							</div>
							<hr/>
							<div className="sheet-row sheet-checkbox-row">
								<div className="sheet-col-1-3 sheet-ro-optionlabel">Prompt for emote?</div>
								<div className="sheet-col-2-3 sheet-padl sheet-ro-option">
									<input type="checkbox" name="attr_ro_ranged1_emoteprompt" value="{{emote=?{Emote text} }}"/>
								</div>
							</div>
							<hr/>
							<div className="sheet-row sheet-checkbox-row">
								<div className="sheet-col-1-3 sheet-ro-optionlabel">Show math?</div>
								<div className="sheet-col-2-3 sheet-padl sheet-ro-option">
									<input type="checkbox" name="attr_ro_ranged1_showmath" value="{{math=Attack:
						1d20
						+ [[@{rangedtohit1}]] [To Hit mod]
						+ (@{global_ranged_attack_bonus}) [Global ranged attack bonus]
						Damage:
						@{rangeddmg1} [Damage dice] +
						[[@{rangeddmgbonus1}]] [Damage bonus] +
						((@{global_ranged_damage_bonus})) [Global ranged damage bonus] }}"/>
								</div>
							</div>
						</div>
						{/* close inner modal div */}
					</div>
					{/* close outer modal div */}
				</div>
			</div>
			{/* END ranged weapon row */}
		</div>
		<div className="sheet-section-spellbook">
			{/* Start hidden spell casting stats */}
			<input type="hidden" name="attr_base_spell_dc" value="(8 + (@{global_spell_dc_bonus}))" />
			<input type="hidden" name="attr_arcane_trickster_spell_bonus" value="(@{intelligence_mod}+@{PB})" />
			<input type="hidden" name="attr_bard_spell_bonus" value="(@{charisma_mod}+@{PB})" />
			<input type="hidden" name="attr_cleric_spell_bonus" value="(@{wisdom_mod}+@{PB})" />
			<input type="hidden" name="attr_druid_spell_bonus" value="(@{wisdom_mod}+@{PB})" />
			<input type="hidden" name="attr_eldritch_knight_spell_bonus" value="(@{intelligence_mod}+@{PB})" />
			<input type="hidden" name="attr_paladin_spell_bonus" value="(@{charisma_mod}+@{PB})" />
			<input type="hidden" name="attr_ranger_spell_bonus" value="(@{wisdom_mod}+@{PB})" />
			<input type="hidden" name="attr_sorcerer_spell_bonus" value="(@{charisma_mod}+@{PB})" />
			<input type="hidden" name="attr_warlock_spell_bonus" value="(@{charisma_mod}+@{PB})" />
			<input type="hidden" name="attr_wizard_spell_bonus" value="(@{intelligence_mod}+@{PB})" />
			{/* No longer used but leaving in for legacy support */}
			<input type="hidden" name="attr_prepared_spells_max" value="@{spells_prepared_cleric} + @{spells_prepared_druid} + @{spells_prepared_paladin} + @{spells_prepared_wizard}" disabled="disabled"/>
			{/* End  hidden spell casting stats */}
			<div className="sheet-row sheet-margin-bottom">
				<div className="sheet-col-1">
					<h4 className="sheet-center">Spell Dashboard and Spell Slots<span className="sheet-pictos-custom">t</span></h4></div>
				<div className="sheet-col-4-5">
					<p className="sheet-small-note">The dashboard fields are auto calculated from the individual className levels/options (set in the className section of the sheet) and your core stats.</p>
					<div className="sheet-row sheet-sub-header">
						<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Arcane Trickster</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Bard</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Cleric</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Druid</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Eldritch Knight</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Paladin</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ranger</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Sorcerer</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Warlock</div>
						<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Wizard</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-6 sheet-margin-top sheet-center">Cantrips Known</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cantrips_known_arcane_trickster" value="( (ceil((@{rogue_level}-2)/1e10)*3) + (ceil((@{rogue_level}-9)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cantrips_known_bard" value="( (ceil(@{bard_level}/1e10)*2) + (ceil((@{bard_level}-3)/1e10)) + (ceil((@{bard_level}-9)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cantrips_known_cleric" value="( (ceil(@{cleric_level}/1e10)*3) + (ceil((@{cleric_level}-3)/1e10)) + (ceil((@{cleric_level}-9)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cantrips_known_druid" value="( (ceil(@{druid_level}/1e10)*2) + (ceil((@{druid_level}-3)/1e10)) + (ceil((@{druid_level}-9)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cantrips_known_eldritch_knight" value="( (ceil((@{fighter_level}-2)/1e10)*2) + (ceil((@{fighter_level}-9)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cantrips_known_paladin" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cantrips_known_ranger" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cantrips_known_sorcerer" value="( (ceil(@{sorcerer_level}/1e10)*4) + (ceil((@{sorcerer_level}-3)/1e10)) + (ceil((@{sorcerer_level}-9)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cantrips_known_warlock" value="( (ceil(@{warlock_level}/1e10)*2) + (ceil((@{warlock_level}-3)/1e10)) + (ceil((@{warlock_level}-9)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cantrips_known_wizard" value="( (ceil(@{wizard_level}/1e10)*3) + (ceil((@{wizard_level}-3)/1e10)) + (ceil((@{wizard_level}-9)/1e10)) )" disabled="disabled" />
						</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-6 sheet-margin-top sheet-center">Spells Known</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_known_arcane_trickster" value="( (ceil(@{rogue_level}/1e10)*3) +  (ceil((@{rogue_level}-3)/1e10)) + (ceil((@{rogue_level}-6)/1e10)) + (ceil((@{rogue_level}-7)/1e10)) + (ceil((@{rogue_level}-9)/1e10)) + (ceil((@{rogue_level}-10)/1e10)) + (ceil((@{rogue_level}-12)/1e10)) + (ceil((@{rogue_level}-13)/1e10)) + (ceil((@{rogue_level}-15)/1e10)) + (ceil((@{rogue_level}-18)/1e10)) + (ceil((@{rogue_level}-19)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_known_bard" value="( (ceil(@{bard_level}/1e10)*4) + (ceil((@{bard_level}-1)/1e10)) + (ceil((@{bard_level}-2)/1e10)) + (ceil((@{bard_level}-3)/1e10)) + (ceil((@{bard_level}-4)/1e10)) + (ceil((@{bard_level}-5)/1e10)) + (ceil((@{bard_level}-6)/1e10)) + (ceil((@{bard_level}-7)/1e10)) + (ceil((@{bard_level}-8)/1e10)) + (ceil((@{bard_level}-9)/1e10)*2) + (ceil((@{bard_level}-10)/1e10)) + (ceil((@{bard_level}-12)/1e10)) + (ceil((@{bard_level}-13)/1e10)*2) + (ceil((@{bard_level}-14)/1e10)) + (ceil((@{bard_level}-16)/1e10)) + (ceil((@{bard_level}-17)/1e10)*2) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_known_cleric" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_known_druid" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_known_eldritch_knight" value="( (ceil((@{fighter_level}-2)/1e10)*3) + (ceil((@{fighter_level}-3)/1e10)) + (ceil((@{fighter_level}-6)/1e10)) + (ceil((@{fighter_level}-7)/1e10)) + (ceil((@{fighter_level}-9)/1e10)) + (ceil((@{fighter_level}-10)/1e10)) + (ceil((@{fighter_level}-12)/1e10)) + (ceil((@{fighter_level}-13)/1e10)) + (ceil((@{fighter_level}-15)/1e10)) + (ceil((@{fighter_level}-18)/1e10)) + (ceil((@{fighter_level}-19)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_known_paladin" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_known_ranger" value="( (1+ceil(@{ranger_level}/2)) * (ceil((@{ranger_level}-1)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_known_sorcerer" value="( (ceil(@{sorcerer_level}/1e10)*2) + (ceil((@{sorcerer_level}-1)/1e10)) + (ceil((@{sorcerer_level}-2)/1e10)) + (ceil((@{sorcerer_level}-3)/1e10)) + (ceil((@{sorcerer_level}-4)/1e10)) + (ceil((@{sorcerer_level}-5)/1e10)) + (ceil((@{sorcerer_level}-6)/1e10)) + (ceil((@{sorcerer_level}-7)/1e10)) + (ceil((@{sorcerer_level}-8)/1e10)) + (ceil((@{sorcerer_level}-9)/1e10)) + (ceil((@{sorcerer_level}-10)/1e10)) + (ceil((@{sorcerer_level}-12)/1e10)) + (ceil((@{sorcerer_level}-14)/1e10)) + (ceil((@{sorcerer_level}-16)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_known_warlock" value="( (ceil(@{warlock_level}/1e10) + @{warlock_level}) - (ceil((@{warlock_level}-9)/1e10)) - (ceil((@{warlock_level}-11)/1e10)) - (ceil((@{warlock_level}-13)/1e10)) - (ceil((@{warlock_level}-15)/1e10)) - (ceil((@{warlock_level}-17)/1e10)) - (ceil((@{warlock_level}-19)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_known_wizard" value="0" disabled="disabled" />
						</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-6 sheet-margin-top sheet-center">Can Prepare</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_arcane_trickster" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_bard" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_cleric" value="( ((((@{cleric_level} + @{wisdom_mod}) + 1) + abs((@{cleric_level} + @{wisdom_mod}) - 1)) / 2) * (ceil(@{cleric_level}/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_druid" value="( ((((@{druid_level} + @{wisdom_mod}) + 1) + abs((@{druid_level} + @{wisdom_mod}) - 1)) / 2) * (ceil(@{druid_level}/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_eldritch_knight" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_paladin" value="( ((((floor(@{paladin_level}/2) + @{charisma_mod}) + 1) + abs((floor(@{paladin_level}/2) + @{charisma_mod}) - 1)) / 2) * (ceil((@{paladin_level}-1)/1e10)) )" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_ranger" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_sorcerer" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_warlock" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_wizard" value="( ((((@{wizard_level} + @{intelligence_mod}) + 1) + abs((@{wizard_level} + @{intelligence_mod}) - 1)) / 2) * (ceil(@{wizard_level}/1e10)) )" disabled="disabled" />
						</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-6 sheet-margin-top sheet-center">Prepared</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_count_arcane_trickster" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_count_bard" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_count_cleric" value="(@{spells_prepared_count})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_count_druid" value="(@{spells_prepared_count})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_count_eldritch_knight" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_count_paladin" value="(@{spells_prepared_count})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_count_ranger" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_count_sorcerer" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_count_warlock" value="0" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_spells_prepared_count_wizard" value="(@{spells_prepared_count})" disabled="disabled" />
						</div>
					</div>
					<div className="sheet-row">
						<div className="sheet-col-1-6 sheet-margin-top sheet-center">Save DC</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_arcane_trickster_spell_dc" value="(@{base_spell_dc}+@{arcane_trickster_spell_bonus})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_bard_spell_dc" value="(@{base_spell_dc}+@{bard_spell_bonus})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_cleric_spell_dc" value="(@{base_spell_dc}+@{cleric_spell_bonus})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_druid_spell_dc" value="(@{base_spell_dc}+@{druid_spell_bonus})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_eldritch_knight_spell_dc" value="(@{base_spell_dc}+@{eldritch_knight_spell_bonus})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_paladin_spell_dc" value="(@{base_spell_dc}+@{paladin_spell_bonus})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_ranger_spell_dc" value="(@{base_spell_dc}+@{ranger_spell_bonus})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_sorcerer_spell_dc" value="(@{base_spell_dc}+@{sorcerer_spell_bonus})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_warlock_spell_dc" value="(@{base_spell_dc}+@{warlock_spell_bonus})" disabled="disabled" />
						</div>
						<div className="sheet-col-1-12">
							<input type="number" name="attr_wizard_spell_dc" value="(@{base_spell_dc}+@{wizard_spell_bonus})" disabled="disabled" />
						</div>
					</div>
					<hr/>
					<div className="sheet-row">
						<div className="sheet-col-1-2 sheet-padr">
							<div className="sheet-row sheet-sub-header">
								<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Sorcerer Specific</div>
								<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
								<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Used</div>
								<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Max</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-margin-top">Sorcery Points</div>
								<div className="sheet-col-1-3">
									<input type="number" name="attr_sorcery_points" value="0" min="0" step="1" />
								</div>
								<div className="sheet-col-1-3">
									<input type="number" name="attr_sorcery_points_max" value="( @{sorcerer_level} * ceil((@{sorcerer_level}-1)/1e10) )" disabled="disabled" />
								</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1">
									<p className="sheet-small-note">Recharge on a long rest (4 recharge on a short rest if lvl 20). Used to power metamagic or convert to/from spell slots</p>
								</div>
							</div>
						</div>
						<div className="sheet-col-1-2 sheet-padl">
							<div className="sheet-row sheet-sub-header">
								<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Warlock Specific</div>
								<div className="sheet-col-1-4 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
								<div className="sheet-col-1-4 sheet-vert-bottom sheet-center sheet-small-label">Used</div>
								<div className="sheet-col-1-4 sheet-vert-bottom sheet-center sheet-small-label">Max</div>
								<div className="sheet-col-1-4 sheet-vert-bottom sheet-center sheet-small-label">Level</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-4 sheet-margin-top">Spell Slots</div>
								<div className="sheet-col-1-4">
									<input type="number" name="attr_warlock_spell_slots" value="0" min="0" step="1" />
								</div>
								<div className="sheet-col-1-4">
									<input type="number" name="attr_warlock_spell_slots_max" value="( ceil(@{warlock_level}/1e10) + (ceil((@{warlock_level}-1)/1e10)) + (ceil((@{warlock_level}-10)/1e10)) + (ceil((@{warlock_level}-16)/1e10)) )" disabled="disabled" />
								</div>
								<div className="sheet-col-1-4">
									<input type="number" name="attr_warlock_spell_slots_level" value="( ceil(@{warlock_level}/1e10) + (ceil((@{warlock_level}-2)/1e10)) + (ceil((@{warlock_level}-4)/1e10)) + (ceil((@{warlock_level}-6)/1e10)) + (ceil((@{warlock_level}-8)/1e10)) )" disabled="disabled" />
								</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1">
									<p className="sheet-small-note">Recharge on a long or short rest and are all of the same level</p>
								</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-margin-top">Invocations Known</div>
								<div className="sheet-col-1-2">
									<input type="number" name="attr_warlock_invocations_known" value="( (ceil((@{warlock_level}-1)/1e10)*2) + (ceil((@{warlock_level}-4)/1e10)) + (ceil((@{warlock_level}-6)/1e10)) + (ceil((@{warlock_level}-8)/1e10)) + (ceil((@{warlock_level}-11)/1e10)) + (ceil((@{warlock_level}-14)/1e10)) + (ceil((@{warlock_level}-17)/1e10)) )" disabled="disabled" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="sheet-col-1-5 sheet-padl">
					<div className="sheet-row sheet-sub-header">
						<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Spell Slots</div>
						<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Level</div>
						<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Used</div>
						<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Max</div>
					</div>
					<div className="sheet-row sheet">
						<div className="sheet-col-1-3 sheet-center sheet-small-label sheet-margin-top">1</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l1" value="0"/>
						</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l1_max" value="0"/>
						</div>
					</div>
					<div className="sheet-row sheet">
						<div className="sheet-col-1-3 sheet-center sheet-small-label sheet-margin-top">2</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l2" value="0"/>
						</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l2_max" value="0"/>
						</div>
					</div>
					<div className="sheet-row sheet">
						<div className="sheet-col-1-3 sheet-center sheet-small-label sheet-margin-top">3</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l3" value="0"/>
						</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l3_max" value="0"/>
						</div>
					</div>
					<div className="sheet-row sheet">
						<div className="sheet-col-1-3 sheet-center sheet-small-label sheet-margin-top">4</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l4" value="0"/>
						</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l4_max" value="0"/>
						</div>
					</div>
					<div className="sheet-row sheet">
						<div className="sheet-col-1-3 sheet-center sheet-small-label sheet-margin-top">5</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l5" value="0"/>
						</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l5_max" value="0"/>
						</div>
					</div>
					<div className="sheet-row sheet">
						<div className="sheet-col-1-3 sheet-center sheet-small-label sheet-margin-top">6</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l6" value="0"/>
						</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l6_max" value="0"/>
						</div>
					</div>
					<div className="sheet-row sheet">
						<div className="sheet-col-1-3 sheet-center sheet-small-label sheet-margin-top">7</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l7" value="0"/>
						</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l7_max" value="0"/>
						</div>
					</div>
					<div className="sheet-row sheet">
						<div className="sheet-col-1-3 sheet-center sheet-small-label sheet-margin-top">8</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l8" value="0"/>
						</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l8_max" value="0"/>
						</div>
					</div>
					<div className="sheet-row sheet">
						<div className="sheet-col-1-3 sheet-center sheet-small-label sheet-margin-top">9</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l9" value="0"/>
						</div>
						<div className="sheet-col-1-3">
							<input type="number" name="attr_spell_slots_l9_max" value="0"/>
						</div>
					</div>
				</div>
			</div>
			<h4 className="sheet-center">Spell Book <span className="sheet-pictos-three">g</span></h4>
			<p className="sheet-small-note">Use this section to track spells you know, have prepared, or have in your spell book. Spells that do not count against the limit of spells you have prepared (ie. Cleric Domain spells, Paladin Oath spells, etc...), and spells from classNamees which do not prepare spells (ie. Sorcerer, Warlock, etc...), should be marked as "Always" prepared</p>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab0" value="0" title="Cantrips" checked="checked" />
			<span className="sheet-spellpagetab sheet-spelltab0">Cantrips</span>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab1" value="1" title="Level 1" />
			<span className="sheet-spellpagetab sheet-spelltab1">Level 1</span>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab2" value="2" title="Level 2" />
			<span className="sheet-spellpagetab sheet-spelltab2">Level 2</span>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab3" value="3" title="Level 3" />
			<span className="sheet-spellpagetab sheet-spelltab3">Level 3</span>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab4" value="4" title="Level 4" />
			<span className="sheet-spellpagetab sheet-spelltab4">Level 4</span>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab5" value="5" title="Level 5" />
			<span className="sheet-spellpagetab sheet-spelltab5">Level 5</span>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab6" value="6" title="Level 6" />
			<span className="sheet-spellpagetab sheet-spelltab6">Level 6</span>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab7" value="7" title="Level 7" />
			<span className="sheet-spellpagetab sheet-spelltab7">Level 7</span>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab8" value="8" title="Level 8" />
			<span className="sheet-spellpagetab sheet-spelltab8">Level 8</span>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab9" value="9" title="Level 9" />
			<span className="sheet-spellpagetab sheet-spelltab9">Level 9</span>
			<input type="radio" name="attr_spellpagetab" className="sheet-spellpagetab sheet-spelltab99" value="99" title="Show All" />
			<span className="sheet-spellpagetab sheet-spelltab99">Show All</span>
			<span className="sheet-spacer"></span>
			{/* BEGIN AUTO GENERATED SPELL PAGES */}
			{/* BEGIN new spell page */}
			<div className="sheet-spell-page0">
				<div className="sheet-row sheet-spell-header">
					<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Cantrip</div>
				</div>
				<fieldset className="repeating_spellbookcantrip">
					{/* BEGIN spell row */}
					<div className="sheet-margin-bottom sheet-padr sheet-padl compendium-drop-target">
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Spell Level</div>
							<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Spell name</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">School</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast time</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label" title="Concentration">Conc?</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ritual?</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Prepared?</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-middle sheet-center">Cantrip
								<input type="hidden" name="attr_spellbaselevel" value="0"/>
								<input type="hidden" name="attr_spellfriendlylevel" value="Cantrip"/>
							</div>
							<div className="sheet-col-1-3 sheet-vert-middle">
								<input type="text" className=" sheet-center" name="attr_spellname" accept="Name"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<select name="attr_spellschool" accept="School">
									<option value="" selected="selected">n/a</option>
									<option value="Abjuration">Abjuration</option>
									<option value="Conjuration">Conjuration</option>
									<option value="Divination">Divination</option>
									<option value="Enchantment">Enchantment</option>
									<option value="Evocation">Evocation</option>
									<option value="Illusion">Illusion</option>
									<option value="Necromancy">Necromancy</option>
									<option value="Transmutation">Transmutation</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcasttime" accept="Casting Time"/>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellconcentration" accept="Concentration">
									<option value="" selected="selected">No</option>
									<option value="(Concentration)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellritual" accept="Ritual">
									<option value="" selected="selected">No</option>
									<option value="(Ritual)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle" title="Always prepared means the spell is either a cantrip or one that was provided to you via a method which indicated it would never count against your prepared/known limits.">
								<select name="attr_spellisprepared" disabled="disabled">
									<option value="1">Yes</option>
									<option value="0">NO</option>
									<option value="0.0001" selected="selected">Always</option>
								</select>
							</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Gained from</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Target/Area of Effect</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Range</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Duration</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Components</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Info</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast Spell</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-middle" title="Use this field to indicate where you learned or have access to this spell from.  Useful to know if multiclassNameing or if you gain access to spells your className would not normally have thanks to subclassName bonuses">
								<select name="attr_spellgainedfrom">
									<option value="Not Set">Not Set</option>
									<option value="Arcane Trickster">Arcane Trickster</option>
									<option value="Bard">Bard</option>
									<option value="Cleric">Cleric</option>
									<option value="Druid">Druid</option>
									<option value="Eldritch Knight">Eldritch Knight</option>
									<option value="Paladin">Paladin</option>
									<option value="Ranger">Ranger</option>
									<option value="Sorcerer">Sorcerer</option>
									<option value="Warlock">Warlock</option>
									<option value="Wizard">Wizard</option>
									<option value="Other Source">Other</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spelltarget" accept="Target"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellrange" accept="Range"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellduration" accept="Duration"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcomponents" accept="Components"/>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellInfo" value="&{template:5eDefault} {{spell=1}} {{spellshowinfoblock=1}} {{spellshowdesc=1}} {{spellshowhigherlvl=1}} {{character_name=@{character_name}}} {{emote=looks at the instructions for a spell}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}}  {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  {{spelldescription=@{spelldescription}}} {{spellhigherlevel=@{spellhighersloteffect}}} @{classNameactionspellinfo}">Spell Info</button>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellCast" value="&{template:5eDefault} {{spell=1}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}} @{spellcastmacrooptions} {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  @{classNameactionspellcast}">Cast Spell</button>
							</div>
						</div>
						<div className="sheet-row sheet-padb sheet-spell-macro-output-options">
							<div className="sheet-col-1-8 sheet-vert-middle sheet-small-label sheet-padl">Spellcast macro display options</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Info block
								<br/>
								<input type="checkbox" name="attr_spellshowinfoblock" value="{{spellshowinfoblock=1}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Description
								<br/>
								<input type="checkbox" name="attr_spellshowdesc" value="{{spellshowdesc=1}} {{spelldescription=@{spelldescription}}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">At higher levels
								<br/>
								<input type="checkbox" name="attr_spellshowhigherlvl" value="{{spellshowhigherlvl=1}} {{spellhigherlevel=@{spellhighersloteffect}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattack" value="{{spellshowattack=1}} {{spellattack=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">2nd Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattackadv" value="{{spellshowattackadv=1}} {{spellattackadv=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">Saving throw
								<br/>
								<input type="checkbox" name="attr_spellshowsavethrow" value="{{spellshowsavethrow=1}} {{spellsavedc=[[@{spellsavedc} + @{customsavedc}]]}} {{spellsavestat=@{savestat}}} {{spellsavesuccess=@{savesuccess}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Healing
								<br/>
								<input type="checkbox" name="attr_spellshowhealing" value="{{spellshowhealing=1}} {{spellhealing=[[@{spellhealamount} + @{healstatbonus}]]}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Damage
								<br/>
								<input type="checkbox" name="attr_spellshowdamage" value="{{spellshowdamage=1}} {{spelldamage=[[@{damage} + @{damagestatbonus} + @{damagemiscbonus} + (@{global_spell_damage_bonus}) + 0d0]] @{damagetype}}} @{spellcancrit}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Effects
								<br/>
								<input type="checkbox" name="attr_spellshoweffects" value="{{spellshoweffects=1}} {{spelleffect=@{spelleffect}}}" />
							</div>
							<input type="hidden" name="attr_spellcastmacrooptions" value="@{spellshowinfoblock} @{spellshowdesc} @{spellshowhigherlvl} @{spellshowattack} @{spellshowattackadv} @{spellshowsavethrow} @{spellshowhealing} @{spellshowdamage} @{spellshoweffects}" />
						</div>
						<span className="sheet-spacer"></span>
						<span className="sheet-small-label">Show :</span>
						<input type="checkbox" name="attr_spelltypeadvanced" className="sheet-spelltypetab sheet-spelltypeadvanced" value="1" /><span className="sheet-spelltypetab sheet-spelltypeadvanced">Description</span> |
						<input type="checkbox" name="attr_spelltypeattack" className="sheet-spelltypetab sheet-spelltypeattack" value="1" /><span className="sheet-spelltypetab sheet-spelltypeattack">Attack</span>
						<input type="checkbox" name="attr_spelltypesave" className="sheet-spelltypetab sheet-spelltypesave" value="1" /><span className="sheet-spelltypetab sheet-spelltypesave">Save</span>
						<input type="checkbox" name="attr_spelltypeheal" className="sheet-spelltypetab sheet-spelltypeheal" value="1" /><span className="sheet-spelltypetab sheet-spelltypeheal">Healing</span> |
						<input type="checkbox" name="attr_spelltypdamage" className="sheet-spelltypetab sheet-spelltypedamage" value="1" /><span className="sheet-spelltypetab sheet-spelltypedamage">Damage</span>
						<input type="checkbox" name="attr_spelltypeeffects" className="sheet-spelltypetab sheet-spelltypeeffects" value="1" /><span className="sheet-spelltypetab sheet-spelltypeeffects">Effects</span>
						<span className="sheet-spacer"></span>
						<div className="sheet-spell-type-advanced">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Spell Description/Flavour</div>
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Higher Spell Slot Effect</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea className="sheet-medium-textarea" name="attr_spelldescription" accept="Content"></textarea>
								</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea name="attr_spellhighersloteffect" className="sheet-medium-textarea"></textarea>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-attack">
							<div className="sheet-row">
								<div className="sheet-col-1-6 sheet-offset-2-3 sheet-vert-bottom sheet-center sheet-small-label">Attack Stat</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-2-3">
									<p className="sheet-small-note sheet-margin-top">Select the attack stat for the attack. This is normally your spellcasting stat from the className you gained the spell from.</p>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<select name="attr_attackstat">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR</option>
										<option value="@{dexterity_mod}">DEX</option>
										<option value="@{constitution_mod}">CON</option>
										<option value="@{intelligence_mod}">INT</option>
										<option value="@{wisdom_mod}">WIS</option>
										<option value="@{charisma_mod}">CHA</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-save">
							<div className="sheet-row">
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Saving Stat</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">Save DC</div>
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Custom DC</div>
								<div className="sheet-col-1-2 sheet-center sheet-small-label">On a successful save</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-12">
									<select name="attr_savestat" accept="Save">
										<option value="STR">STR</option>
										<option value="DEX">DEX</option>
										<option value="CON">CON</option>
										<option value="INT">INT</option>
										<option value="WIS">WIS</option>
										<option value="CHA">CHA</option>
									</select>
								</div>
								<div className="sheet-col-1-6" title="Pick the className that the save DC will be created from or set your own DC by selecting custom here and then entering the DC in the next field">
									<select name="attr_spellsavedc">
										<option value="0">Choose...</option>
										<option value="@{arcane_trickster_spell_dc}">Arcane Trickster DC</option>
										<option value="@{bard_spell_dc}">Bard DC</option>
										<option value="@{cleric_spell_dc}">Cleric DC</option>
										<option value="@{druid_spell_dc}">Druid DC</option>
										<option value="@{eldritch_knight_spell_dc}">Eldritch Knight DC</option>
										<option value="@{paladin_spell_dc}">Paladin DC</option>
										<option value="@{ranger_spell_dc}">Ranger DC</option>
										<option value="@{sorcerer_spell_dc}">Sorcerer DC</option>
										<option value="@{warlock_spell_dc}">Warlock DC</option>
										<option value="@{wizard_spell_dc}">Wizard DC</option>
										<option value="0">Custom DC</option>
									</select>
								</div>
								<div className="sheet-col-1-12">
									<input type="number" name="attr_customsavedc" value="0" min="0" step="1" title="Unless you have selected Custom in the previous field this should always be 0"/>
								</div>
								<div className="sheet-col-1-2">
									<input type="text" className="sheet-center" name="attr_savesuccess" accept="Save Success"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-heal">
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-vert-bottom sheet-center sheet-small-label">Heal amount</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-offset-1-12 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_spellhealamount" value="0" accept="Healing"/>
								</div>
								<div className="sheet-col-1-6 sheet-center">
									<select name="attr_healstatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-damage">
							<div className="sheet-row">
								<div className="sheet-offset-1-12 sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Can Crit?</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Dice</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Other Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Type</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className=" sheet-offset-1-12 sheet-col-1-12 sheet-checkbox-row">
									<input type="checkbox" name="attr_spellcancrit" value="{{spellcancrit=1}} {{spellcritdamage=Additional [[@{damage}]] damage}}" checked="checked" />
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damage" value="0" accept="Damage"/>
								</div>
								<div className="sheet-col-1-6">
									<select name="attr_damagestatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="number" className="sheet-center" name="attr_damagemiscbonus" value="0" step="1"/>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damagetype"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-effects">
							<div className="sheet-row">
								<div className="sheet-col-5-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Effects</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1 sheet-small-label sheet-center">
									<textarea name="attr_spelleffect" className="sheet-medium-textarea">None</textarea>
								</div>
							</div>
						</div>
					</div>
					{/* END spell row */}
				</fieldset>
			</div>
			{/* END spell page */}
			{/* BEGIN new spell page */}
			<div className="sheet-spell-page1">
				<div className="sheet-row sheet-spell-header">
					<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Level 1</div>
				</div>
				<fieldset className="repeating_spellbooklevel1">
					{/* BEGIN spell row */}
					<div className="sheet-margin-bottom sheet-padr sheet-padl compendium-drop-target">
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Spell Level</div>
							<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Spell name</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">School</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast time</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label" title="Concentration">Conc?</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ritual?</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Prepared?</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-middle sheet-center">Level 1
								<input type="hidden" name="attr_spellbaselevel" value="1"/>
								<input type="hidden" name="attr_spellfriendlylevel" value="Level 1"/>
							</div>
							<div className="sheet-col-1-3 sheet-vert-middle">
								<input type="text" className=" sheet-center" name="attr_spellname" accept="Name"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<select name="attr_spellschool" accept="School">
									<option value="" selected="selected">n/a</option>
									<option value="Abjuration">Abjuration</option>
									<option value="Conjuration">Conjuration</option>
									<option value="Divination">Divination</option>
									<option value="Enchantment">Enchantment</option>
									<option value="Evocation">Evocation</option>
									<option value="Illusion">Illusion</option>
									<option value="Necromancy">Necromancy</option>
									<option value="Transmutation">Transmutation</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcasttime" accept="Casting Time"/>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellconcentration" accept="Concentration">
									<option value="" selected="selected">No</option>
									<option value="(Concentration)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellritual" accept="Ritual">
									<option value="" selected="selected">No</option>
									<option value="(Ritual)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle" title="Always prepared means the spell is either a cantrip or one that was provided to you via a method which indicated it would never count against your prepared/known limits.">
								<select name="attr_spellisprepared">
									<option value="1">Yes</option>
									<option value="0" selected="selected">NO</option>
									<option value="0.0001">Always</option>
								</select>
							</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Gained from</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Target/Area of Effect</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Range</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Duration</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Components</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Info</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast Spell</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-middle" title="Use this field to indicate where you learned or have access to this spell from.  Useful to know if multiclassNameing or if you gain access to spells your className would not normally have thanks to subclassName bonuses">
								<select name="attr_spellgainedfrom">
									<option value="Not Set">Not Set</option>
									<option value="Arcane Trickster">Arcane Trickster</option>
									<option value="Bard">Bard</option>
									<option value="Cleric">Cleric</option>
									<option value="Druid">Druid</option>
									<option value="Eldritch Knight">Eldritch Knight</option>
									<option value="Paladin">Paladin</option>
									<option value="Ranger">Ranger</option>
									<option value="Sorcerer">Sorcerer</option>
									<option value="Warlock">Warlock</option>
									<option value="Wizard">Wizard</option>
									<option value="Other Source">Other</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spelltarget" accept="Target"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellrange" accept="Range"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellduration" accept="Duration"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcomponents" accept="Components"/>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellInfo" value="&{template:5eDefault} {{spell=1}} {{spellshowinfoblock=1}} {{spellshowdesc=1}} {{spellshowhigherlvl=1}} {{character_name=@{character_name}}} {{emote=looks at the instructions for a spell}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}}  {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  {{spelldescription=@{spelldescription}}} {{spellhigherlevel=@{spellhighersloteffect}}} @{classNameactionspellinfo}">Spell Info</button>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellCast" value="&{template:5eDefault} {{spell=1}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}} @{spellcastmacrooptions} {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  @{classNameactionspellcast}">Cast Spell</button>
							</div>
						</div>
						<div className="sheet-row sheet-padb sheet-spell-macro-output-options">
							<div className="sheet-col-1-8 sheet-vert-middle sheet-small-label sheet-padl">Spellcast macro display options</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Info block
								<br/>
								<input type="checkbox" name="attr_spellshowinfoblock" value="{{spellshowinfoblock=1}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Description
								<br/>
								<input type="checkbox" name="attr_spellshowdesc" value="{{spellshowdesc=1}} {{spelldescription=@{spelldescription}}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">At higher levels
								<br/>
								<input type="checkbox" name="attr_spellshowhigherlvl" value="{{spellshowhigherlvl=1}} {{spellhigherlevel=@{spellhighersloteffect}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattack" value="{{spellshowattack=1}} {{spellattack=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">2nd Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattackadv" value="{{spellshowattackadv=1}} {{spellattackadv=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">Saving throw
								<br/>
								<input type="checkbox" name="attr_spellshowsavethrow" value="{{spellshowsavethrow=1}} {{spellsavedc=[[@{spellsavedc} + @{customsavedc}]]}} {{spellsavestat=@{savestat}}} {{spellsavesuccess=@{savesuccess}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Healing
								<br/>
								<input type="checkbox" name="attr_spellshowhealing" value="{{spellshowhealing=1}} {{spellhealing=[[@{spellhealamount} + @{healstatbonus}]]}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Damage
								<br/>
								<input type="checkbox" name="attr_spellshowdamage" value="{{spellshowdamage=1}} {{spelldamage=[[@{damage} + @{damagestatbonus} + @{damagemiscbonus} + (@{global_spell_damage_bonus}) + 0d0]] @{damagetype}}} @{spellcancrit}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Effects
								<br/>
								<input type="checkbox" name="attr_spellshoweffects" value="{{spellshoweffects=1}} {{spelleffect=@{spelleffect}}}" />
							</div>
							<input type="hidden" name="attr_spellcastmacrooptions" value="@{spellshowinfoblock} @{spellshowdesc} @{spellshowhigherlvl} @{spellshowattack} @{spellshowattackadv} @{spellshowsavethrow} @{spellshowhealing} @{spellshowdamage} @{spellshoweffects}" />
						</div>
						<span className="sheet-spacer"></span>
						<span className="sheet-small-label">Show :</span>
						<input type="checkbox" name="attr_spelltypeadvanced" className="sheet-spelltypetab sheet-spelltypeadvanced" value="1" /><span className="sheet-spelltypetab sheet-spelltypeadvanced">Description</span> |
						<input type="checkbox" name="attr_spelltypeattack" className="sheet-spelltypetab sheet-spelltypeattack" value="1" /><span className="sheet-spelltypetab sheet-spelltypeattack">Attack</span>
						<input type="checkbox" name="attr_spelltypesave" className="sheet-spelltypetab sheet-spelltypesave" value="1" /><span className="sheet-spelltypetab sheet-spelltypesave">Save</span>
						<input type="checkbox" name="attr_spelltypeheal" className="sheet-spelltypetab sheet-spelltypeheal" value="1" /><span className="sheet-spelltypetab sheet-spelltypeheal">Healing</span> |
						<input type="checkbox" name="attr_spelltypdamage" className="sheet-spelltypetab sheet-spelltypedamage" value="1" /><span className="sheet-spelltypetab sheet-spelltypedamage">Damage</span>
						<input type="checkbox" name="attr_spelltypeeffects" className="sheet-spelltypetab sheet-spelltypeeffects" value="1" /><span className="sheet-spelltypetab sheet-spelltypeeffects">Effects</span>
						<span className="sheet-spacer"></span>
						<div className="sheet-spell-type-advanced">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Spell Description/Flavour</div>
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Higher Spell Slot Effect</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea className="sheet-medium-textarea" name="attr_spelldescription" accept="Content"></textarea>
								</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea name="attr_spellhighersloteffect" className="sheet-medium-textarea"></textarea>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-attack">
							<div className="sheet-row">
								<div className="sheet-col-1-6 sheet-offset-2-3 sheet-vert-bottom sheet-center sheet-small-label">Attack Stat</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-2-3">
									<p className="sheet-small-note sheet-margin-top">Select the attack stat for the attack. This is normally your spellcasting stat from the className you gained the spell from.</p>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<select name="attr_attackstat">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR</option>
										<option value="@{dexterity_mod}">DEX</option>
										<option value="@{constitution_mod}">CON</option>
										<option value="@{intelligence_mod}">INT</option>
										<option value="@{wisdom_mod}">WIS</option>
										<option value="@{charisma_mod}">CHA</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-save">
							<div className="sheet-row">
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Saving Stat</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">Save DC</div>
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Custom DC</div>
								<div className="sheet-col-1-2 sheet-center sheet-small-label">On a successful save</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-12">
									<select name="attr_savestat" accept="Save">
										<option value="STR">STR</option>
										<option value="DEX">DEX</option>
										<option value="CON">CON</option>
										<option value="INT">INT</option>
										<option value="WIS">WIS</option>
										<option value="CHA">CHA</option>
									</select>
								</div>
								<div className="sheet-col-1-6" title="Pick the className that the save DC will be created from or set your own DC by selecting custom here and then entering the DC in the next field">
									<select name="attr_spellsavedc">
										<option value="0">Choose...</option>
										<option value="@{arcane_trickster_spell_dc}">Arcane Trickster DC</option>
										<option value="@{bard_spell_dc}">Bard DC</option>
										<option value="@{cleric_spell_dc}">Cleric DC</option>
										<option value="@{druid_spell_dc}">Druid DC</option>
										<option value="@{eldritch_knight_spell_dc}">Eldritch Knight DC</option>
										<option value="@{paladin_spell_dc}">Paladin DC</option>
										<option value="@{ranger_spell_dc}">Ranger DC</option>
										<option value="@{sorcerer_spell_dc}">Sorcerer DC</option>
										<option value="@{warlock_spell_dc}">Warlock DC</option>
										<option value="@{wizard_spell_dc}">Wizard DC</option>
										<option value="0">Custom DC</option>
									</select>
								</div>
								<div className="sheet-col-1-12">
									<input type="number" name="attr_customsavedc" value="0" min="0" step="1" title="Unless you have selected Custom in the previous field this should always be 0"/>
								</div>
								<div className="sheet-col-1-2">
									<input type="text" className="sheet-center" name="attr_savesuccess" accept="Save Success"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-heal">
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-vert-bottom sheet-center sheet-small-label">Heal amount</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-offset-1-12 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_spellhealamount" value="0" accept="Healing"/>
								</div>
								<div className="sheet-col-1-6 sheet-center">
									<select name="attr_healstatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-damage">
							<div className="sheet-row">
								<div className="sheet-offset-1-12 sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Can Crit?</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Dice</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Other Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Type</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className=" sheet-offset-1-12 sheet-col-1-12 sheet-checkbox-row">
									<input type="checkbox" name="attr_spellcancrit" value="{{spellcancrit=1}} {{spellcritdamage=Additional [[@{damage}]] damage}}" checked="checked" />
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damage" value="0" accept="Damage"/>
								</div>
								<div className="sheet-col-1-6">
									<select name="attr_damagestatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="number" className="sheet-center" name="attr_damagemiscbonus" value="0" step="1"/>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damagetype"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-effects">
							<div className="sheet-row">
								<div className="sheet-col-5-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Effects</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1 sheet-small-label sheet-center">
									<textarea name="attr_spelleffect" className="sheet-medium-textarea">None</textarea>
								</div>
							</div>
						</div>
					</div>
					{/* END spell row */}
				</fieldset>
			</div>
			{/* END spell page */}
			{/* BEGIN new spell page */}
			<div className="sheet-spell-page2">
				<div className="sheet-row sheet-spell-header">
					<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Level 2</div>
				</div>
				<fieldset className="repeating_spellbooklevel2">
					{/* BEGIN spell row */}
					<div className="sheet-margin-bottom sheet-padr sheet-padl compendium-drop-target">
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Spell Level</div>
							<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Spell name</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">School</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast time</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label" title="Concentration">Conc?</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ritual?</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Prepared?</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-middle sheet-center">Level 2
								<input type="hidden" name="attr_spellbaselevel" value="2"/>
								<input type="hidden" name="attr_spellfriendlylevel" value="Level 2"/>
							</div>
							<div className="sheet-col-1-3 sheet-vert-middle">
								<input type="text" className=" sheet-center" name="attr_spellname" accept="Name"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<select name="attr_spellschool" accept="School">
									<option value="" selected="selected">n/a</option>
									<option value="Abjuration">Abjuration</option>
									<option value="Conjuration">Conjuration</option>
									<option value="Divination">Divination</option>
									<option value="Enchantment">Enchantment</option>
									<option value="Evocation">Evocation</option>
									<option value="Illusion">Illusion</option>
									<option value="Necromancy">Necromancy</option>
									<option value="Transmutation">Transmutation</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcasttime" accept="Casting Time"/>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellconcentration" accept="Concentration">
									<option value="" selected="selected">No</option>
									<option value="(Concentration)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellritual" accept="Ritual">
									<option value="" selected="selected">No</option>
									<option value="(Ritual)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle" title="Always prepared means the spell is either a cantrip or one that was provided to you via a method which indicated it would never count against your prepared/known limits.">
								<select name="attr_spellisprepared">
									<option value="1">Yes</option>
									<option value="0" selected="selected">NO</option>
									<option value="0.0001">Always</option>
								</select>
							</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Gained from</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Target/Area of Effect</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Range</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Duration</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Components</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Info</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast Spell</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-middle" title="Use this field to indicate where you learned or have access to this spell from.  Useful to know if multiclassNameing or if you gain access to spells your className would not normally have thanks to subclassName bonuses">
								<select name="attr_spellgainedfrom">
									<option value="Not Set">Not Set</option>
									<option value="Arcane Trickster">Arcane Trickster</option>
									<option value="Bard">Bard</option>
									<option value="Cleric">Cleric</option>
									<option value="Druid">Druid</option>
									<option value="Eldritch Knight">Eldritch Knight</option>
									<option value="Paladin">Paladin</option>
									<option value="Ranger">Ranger</option>
									<option value="Sorcerer">Sorcerer</option>
									<option value="Warlock">Warlock</option>
									<option value="Wizard">Wizard</option>
									<option value="Other Source">Other</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spelltarget" accept="Target"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellrange" accept="Range"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellduration" accept="Duration"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcomponents" accept="Components"/>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellInfo" value="&{template:5eDefault} {{spell=1}} {{spellshowinfoblock=1}} {{spellshowdesc=1}} {{spellshowhigherlvl=1}} {{character_name=@{character_name}}} {{emote=looks at the instructions for a spell}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}}  {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  {{spelldescription=@{spelldescription}}} {{spellhigherlevel=@{spellhighersloteffect}}} @{classNameactionspellinfo}">Spell Info</button>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellCast" value="&{template:5eDefault} {{spell=1}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}} @{spellcastmacrooptions} {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  @{classNameactionspellcast}">Cast Spell</button>
							</div>
						</div>
						<div className="sheet-row sheet-padb sheet-spell-macro-output-options">
							<div className="sheet-col-1-8 sheet-vert-middle sheet-small-label sheet-padl">Spellcast macro display options</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Info block
								<br/>
								<input type="checkbox" name="attr_spellshowinfoblock" value="{{spellshowinfoblock=1}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Description
								<br/>
								<input type="checkbox" name="attr_spellshowdesc" value="{{spellshowdesc=1}} {{spelldescription=@{spelldescription}}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">At higher levels
								<br/>
								<input type="checkbox" name="attr_spellshowhigherlvl" value="{{spellshowhigherlvl=1}} {{spellhigherlevel=@{spellhighersloteffect}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattack" value="{{spellshowattack=1}} {{spellattack=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">2nd Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattackadv" value="{{spellshowattackadv=1}} {{spellattackadv=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">Saving throw
								<br/>
								<input type="checkbox" name="attr_spellshowsavethrow" value="{{spellshowsavethrow=1}} {{spellsavedc=[[@{spellsavedc} + @{customsavedc}]]}} {{spellsavestat=@{savestat}}} {{spellsavesuccess=@{savesuccess}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Healing
								<br/>
								<input type="checkbox" name="attr_spellshowhealing" value="{{spellshowhealing=1}} {{spellhealing=[[@{spellhealamount} + @{healstatbonus}]]}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Damage
								<br/>
								<input type="checkbox" name="attr_spellshowdamage" value="{{spellshowdamage=1}} {{spelldamage=[[@{damage} + @{damagestatbonus} + @{damagemiscbonus} + (@{global_spell_damage_bonus}) + 0d0]] @{damagetype}}} @{spellcancrit}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Effects
								<br/>
								<input type="checkbox" name="attr_spellshoweffects" value="{{spellshoweffects=1}} {{spelleffect=@{spelleffect}}}" />
							</div>
							<input type="hidden" name="attr_spellcastmacrooptions" value="@{spellshowinfoblock} @{spellshowdesc} @{spellshowhigherlvl} @{spellshowattack} @{spellshowattackadv} @{spellshowsavethrow} @{spellshowhealing} @{spellshowdamage} @{spellshoweffects}" />
						</div>
						<span className="sheet-spacer"></span>
						<span className="sheet-small-label">Show :</span>
						<input type="checkbox" name="attr_spelltypeadvanced" className="sheet-spelltypetab sheet-spelltypeadvanced" value="1" /><span className="sheet-spelltypetab sheet-spelltypeadvanced">Description</span> |
						<input type="checkbox" name="attr_spelltypeattack" className="sheet-spelltypetab sheet-spelltypeattack" value="1" /><span className="sheet-spelltypetab sheet-spelltypeattack">Attack</span>
						<input type="checkbox" name="attr_spelltypesave" className="sheet-spelltypetab sheet-spelltypesave" value="1" /><span className="sheet-spelltypetab sheet-spelltypesave">Save</span>
						<input type="checkbox" name="attr_spelltypeheal" className="sheet-spelltypetab sheet-spelltypeheal" value="1" /><span className="sheet-spelltypetab sheet-spelltypeheal">Healing</span> |
						<input type="checkbox" name="attr_spelltypdamage" className="sheet-spelltypetab sheet-spelltypedamage" value="1" /><span className="sheet-spelltypetab sheet-spelltypedamage">Damage</span>
						<input type="checkbox" name="attr_spelltypeeffects" className="sheet-spelltypetab sheet-spelltypeeffects" value="1" /><span className="sheet-spelltypetab sheet-spelltypeeffects">Effects</span>
						<span className="sheet-spacer"></span>
						<div className="sheet-spell-type-advanced">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Spell Description/Flavour</div>
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Higher Spell Slot Effect</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea className="sheet-medium-textarea" name="attr_spelldescription" accept="Content"></textarea>
								</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea name="attr_spellhighersloteffect" className="sheet-medium-textarea"></textarea>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-attack">
							<div className="sheet-row">
								<div className="sheet-col-1-6 sheet-offset-2-3 sheet-vert-bottom sheet-center sheet-small-label">Attack Stat</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-2-3">
									<p className="sheet-small-note sheet-margin-top">Select the attack stat for the attack. This is normally your spellcasting stat from the className you gained the spell from.</p>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<select name="attr_attackstat">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR</option>
										<option value="@{dexterity_mod}">DEX</option>
										<option value="@{constitution_mod}">CON</option>
										<option value="@{intelligence_mod}">INT</option>
										<option value="@{wisdom_mod}">WIS</option>
										<option value="@{charisma_mod}">CHA</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-save">
							<div className="sheet-row">
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Saving Stat</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">Save DC</div>
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Custom DC</div>
								<div className="sheet-col-1-2 sheet-center sheet-small-label">On a successful save</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-12">
									<select name="attr_savestat" accept="Save">
										<option value="STR">STR</option>
										<option value="DEX">DEX</option>
										<option value="CON">CON</option>
										<option value="INT">INT</option>
										<option value="WIS">WIS</option>
										<option value="CHA">CHA</option>
									</select>
								</div>
								<div className="sheet-col-1-6" title="Pick the className that the save DC will be created from or set your own DC by selecting custom here and then entering the DC in the next field">
									<select name="attr_spellsavedc">
										<option value="0">Choose...</option>
										<option value="@{arcane_trickster_spell_dc}">Arcane Trickster DC</option>
										<option value="@{bard_spell_dc}">Bard DC</option>
										<option value="@{cleric_spell_dc}">Cleric DC</option>
										<option value="@{druid_spell_dc}">Druid DC</option>
										<option value="@{eldritch_knight_spell_dc}">Eldritch Knight DC</option>
										<option value="@{paladin_spell_dc}">Paladin DC</option>
										<option value="@{ranger_spell_dc}">Ranger DC</option>
										<option value="@{sorcerer_spell_dc}">Sorcerer DC</option>
										<option value="@{warlock_spell_dc}">Warlock DC</option>
										<option value="@{wizard_spell_dc}">Wizard DC</option>
										<option value="0">Custom DC</option>
									</select>
								</div>
								<div className="sheet-col-1-12">
									<input type="number" name="attr_customsavedc" value="0" min="0" step="1" title="Unless you have selected Custom in the previous field this should always be 0"/>
								</div>
								<div className="sheet-col-1-2">
									<input type="text" className="sheet-center" name="attr_savesuccess" accept="Save Success"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-heal">
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-vert-bottom sheet-center sheet-small-label">Heal amount</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-offset-1-12 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_spellhealamount" value="0" accept="Healing"/>
								</div>
								<div className="sheet-col-1-6 sheet-center">
									<select name="attr_healstatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-damage">
							<div className="sheet-row">
								<div className="sheet-offset-1-12 sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Can Crit?</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Dice</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Other Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Type</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className=" sheet-offset-1-12 sheet-col-1-12 sheet-checkbox-row">
									<input type="checkbox" name="attr_spellcancrit" value="{{spellcancrit=1}} {{spellcritdamage=Additional [[@{damage}]] damage}}" checked="checked" />
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damage" value="0" accept="Damage"/>
								</div>
								<div className="sheet-col-1-6">
									<select name="attr_damagestatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="number" className="sheet-center" name="attr_damagemiscbonus" value="0" step="1"/>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damagetype"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-effects">
							<div className="sheet-row">
								<div className="sheet-col-5-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Effects</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1 sheet-small-label sheet-center">
									<textarea name="attr_spelleffect" className="sheet-medium-textarea">None</textarea>
								</div>
							</div>
						</div>
					</div>
					{/* END spell row */}
				</fieldset>
			</div>
			{/* END spell page */}
			{/* BEGIN new spell page */}
			<div className="sheet-spell-page3">
				<div className="sheet-row sheet-spell-header">
					<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Level 3</div>
				</div>
				<fieldset className="repeating_spellbooklevel3">
					{/* BEGIN spell row */}
					<div className="sheet-margin-bottom sheet-padr sheet-padl compendium-drop-target">
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Spell Level</div>
							<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Spell name</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">School</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast time</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label" title="Concentration">Conc?</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ritual?</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Prepared?</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-middle sheet-center">Level 3
								<input type="hidden" name="attr_spellbaselevel" value="3"/>
								<input type="hidden" name="attr_spellfriendlylevel" value="Level 3"/>
							</div>
							<div className="sheet-col-1-3 sheet-vert-middle">
								<input type="text" className=" sheet-center" name="attr_spellname" accept="Name"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<select name="attr_spellschool" accept="School">
									<option value="" selected="selected">n/a</option>
									<option value="Abjuration">Abjuration</option>
									<option value="Conjuration">Conjuration</option>
									<option value="Divination">Divination</option>
									<option value="Enchantment">Enchantment</option>
									<option value="Evocation">Evocation</option>
									<option value="Illusion">Illusion</option>
									<option value="Necromancy">Necromancy</option>
									<option value="Transmutation">Transmutation</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcasttime" accept="Casting Time"/>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellconcentration" accept="Concentration">
									<option value="" selected="selected">No</option>
									<option value="(Concentration)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellritual" accept="Ritual">
									<option value="" selected="selected">No</option>
									<option value="(Ritual)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle" title="Always prepared means the spell is either a cantrip or one that was provided to you via a method which indicated it would never count against your prepared/known limits.">
								<select name="attr_spellisprepared">
									<option value="1">Yes</option>
									<option value="0" selected="selected">NO</option>
									<option value="0.0001">Always</option>
								</select>
							</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Gained from</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Target/Area of Effect</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Range</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Duration</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Components</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Info</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast Spell</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-middle" title="Use this field to indicate where you learned or have access to this spell from.  Useful to know if multiclassNameing or if you gain access to spells your className would not normally have thanks to subclassName bonuses">
								<select name="attr_spellgainedfrom">
									<option value="Not Set">Not Set</option>
									<option value="Arcane Trickster">Arcane Trickster</option>
									<option value="Bard">Bard</option>
									<option value="Cleric">Cleric</option>
									<option value="Druid">Druid</option>
									<option value="Eldritch Knight">Eldritch Knight</option>
									<option value="Paladin">Paladin</option>
									<option value="Ranger">Ranger</option>
									<option value="Sorcerer">Sorcerer</option>
									<option value="Warlock">Warlock</option>
									<option value="Wizard">Wizard</option>
									<option value="Other Source">Other</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spelltarget" accept="Target"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellrange" accept="Range"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellduration" accept="Duration"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcomponents" accept="Components"/>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellInfo" value="&{template:5eDefault} {{spell=1}} {{spellshowinfoblock=1}} {{spellshowdesc=1}} {{spellshowhigherlvl=1}} {{character_name=@{character_name}}} {{emote=looks at the instructions for a spell}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}}  {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  {{spelldescription=@{spelldescription}}} {{spellhigherlevel=@{spellhighersloteffect}}} @{classNameactionspellinfo}">Spell Info</button>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellCast" value="&{template:5eDefault} {{spell=1}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}} @{spellcastmacrooptions} {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  @{classNameactionspellcast}">Cast Spell</button>
							</div>
						</div>
						<div className="sheet-row sheet-padb sheet-spell-macro-output-options">
							<div className="sheet-col-1-8 sheet-vert-middle sheet-small-label sheet-padl">Spellcast macro display options</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Info block
								<br/>
								<input type="checkbox" name="attr_spellshowinfoblock" value="{{spellshowinfoblock=1}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Description
								<br/>
								<input type="checkbox" name="attr_spellshowdesc" value="{{spellshowdesc=1}} {{spelldescription=@{spelldescription}}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">At higher levels
								<br/>
								<input type="checkbox" name="attr_spellshowhigherlvl" value="{{spellshowhigherlvl=1}} {{spellhigherlevel=@{spellhighersloteffect}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattack" value="{{spellshowattack=1}} {{spellattack=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">2nd Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattackadv" value="{{spellshowattackadv=1}} {{spellattackadv=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">Saving throw
								<br/>
								<input type="checkbox" name="attr_spellshowsavethrow" value="{{spellshowsavethrow=1}} {{spellsavedc=[[@{spellsavedc} + @{customsavedc}]]}} {{spellsavestat=@{savestat}}} {{spellsavesuccess=@{savesuccess}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Healing
								<br/>
								<input type="checkbox" name="attr_spellshowhealing" value="{{spellshowhealing=1}} {{spellhealing=[[@{spellhealamount} + @{healstatbonus}]]}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Damage
								<br/>
								<input type="checkbox" name="attr_spellshowdamage" value="{{spellshowdamage=1}} {{spelldamage=[[@{damage} + @{damagestatbonus} + @{damagemiscbonus} + (@{global_spell_damage_bonus}) + 0d0]] @{damagetype}}} @{spellcancrit}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Effects
								<br/>
								<input type="checkbox" name="attr_spellshoweffects" value="{{spellshoweffects=1}} {{spelleffect=@{spelleffect}}}" />
							</div>
							<input type="hidden" name="attr_spellcastmacrooptions" value="@{spellshowinfoblock} @{spellshowdesc} @{spellshowhigherlvl} @{spellshowattack} @{spellshowattackadv} @{spellshowsavethrow} @{spellshowhealing} @{spellshowdamage} @{spellshoweffects}" />
						</div>
						<span className="sheet-spacer"></span>
						<span className="sheet-small-label">Show :</span>
						<input type="checkbox" name="attr_spelltypeadvanced" className="sheet-spelltypetab sheet-spelltypeadvanced" value="1" /><span className="sheet-spelltypetab sheet-spelltypeadvanced">Description</span> |
						<input type="checkbox" name="attr_spelltypeattack" className="sheet-spelltypetab sheet-spelltypeattack" value="1" /><span className="sheet-spelltypetab sheet-spelltypeattack">Attack</span>
						<input type="checkbox" name="attr_spelltypesave" className="sheet-spelltypetab sheet-spelltypesave" value="1" /><span className="sheet-spelltypetab sheet-spelltypesave">Save</span>
						<input type="checkbox" name="attr_spelltypeheal" className="sheet-spelltypetab sheet-spelltypeheal" value="1" /><span className="sheet-spelltypetab sheet-spelltypeheal">Healing</span> |
						<input type="checkbox" name="attr_spelltypdamage" className="sheet-spelltypetab sheet-spelltypedamage" value="1" /><span className="sheet-spelltypetab sheet-spelltypedamage">Damage</span>
						<input type="checkbox" name="attr_spelltypeeffects" className="sheet-spelltypetab sheet-spelltypeeffects" value="1" /><span className="sheet-spelltypetab sheet-spelltypeeffects">Effects</span>
						<span className="sheet-spacer"></span>
						<div className="sheet-spell-type-advanced">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Spell Description/Flavour</div>
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Higher Spell Slot Effect</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea className="sheet-medium-textarea" name="attr_spelldescription" accept="Content"></textarea>
								</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea name="attr_spellhighersloteffect" className="sheet-medium-textarea"></textarea>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-attack">
							<div className="sheet-row">
								<div className="sheet-col-1-6 sheet-offset-2-3 sheet-vert-bottom sheet-center sheet-small-label">Attack Stat</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-2-3">
									<p className="sheet-small-note sheet-margin-top">Select the attack stat for the attack. This is normally your spellcasting stat from the className you gained the spell from.</p>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<select name="attr_attackstat">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR</option>
										<option value="@{dexterity_mod}">DEX</option>
										<option value="@{constitution_mod}">CON</option>
										<option value="@{intelligence_mod}">INT</option>
										<option value="@{wisdom_mod}">WIS</option>
										<option value="@{charisma_mod}">CHA</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-save">
							<div className="sheet-row">
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Saving Stat</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">Save DC</div>
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Custom DC</div>
								<div className="sheet-col-1-2 sheet-center sheet-small-label">On a successful save</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-12">
									<select name="attr_savestat" accept="Save">
										<option value="STR">STR</option>
										<option value="DEX">DEX</option>
										<option value="CON">CON</option>
										<option value="INT">INT</option>
										<option value="WIS">WIS</option>
										<option value="CHA">CHA</option>
									</select>
								</div>
								<div className="sheet-col-1-6" title="Pick the className that the save DC will be created from or set your own DC by selecting custom here and then entering the DC in the next field">
									<select name="attr_spellsavedc">
										<option value="0">Choose...</option>
										<option value="@{arcane_trickster_spell_dc}">Arcane Trickster DC</option>
										<option value="@{bard_spell_dc}">Bard DC</option>
										<option value="@{cleric_spell_dc}">Cleric DC</option>
										<option value="@{druid_spell_dc}">Druid DC</option>
										<option value="@{eldritch_knight_spell_dc}">Eldritch Knight DC</option>
										<option value="@{paladin_spell_dc}">Paladin DC</option>
										<option value="@{ranger_spell_dc}">Ranger DC</option>
										<option value="@{sorcerer_spell_dc}">Sorcerer DC</option>
										<option value="@{warlock_spell_dc}">Warlock DC</option>
										<option value="@{wizard_spell_dc}">Wizard DC</option>
										<option value="0">Custom DC</option>
									</select>
								</div>
								<div className="sheet-col-1-12">
									<input type="number" name="attr_customsavedc" value="0" min="0" step="1" title="Unless you have selected Custom in the previous field this should always be 0"/>
								</div>
								<div className="sheet-col-1-2">
									<input type="text" className="sheet-center" name="attr_savesuccess" accept="Save Success"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-heal">
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-vert-bottom sheet-center sheet-small-label">Heal amount</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-offset-1-12 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_spellhealamount" value="0" accept="Healing"/>
								</div>
								<div className="sheet-col-1-6 sheet-center">
									<select name="attr_healstatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-damage">
							<div className="sheet-row">
								<div className="sheet-offset-1-12 sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Can Crit?</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Dice</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Other Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Type</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className=" sheet-offset-1-12 sheet-col-1-12 sheet-checkbox-row">
									<input type="checkbox" name="attr_spellcancrit" value="{{spellcancrit=1}} {{spellcritdamage=Additional [[@{damage}]] damage}}" checked="checked" />
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damage" value="0" accept="Damage"/>
								</div>
								<div className="sheet-col-1-6">
									<select name="attr_damagestatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="number" className="sheet-center" name="attr_damagemiscbonus" value="0" step="1"/>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damagetype"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-effects">
							<div className="sheet-row">
								<div className="sheet-col-5-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Effects</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1 sheet-small-label sheet-center">
									<textarea name="attr_spelleffect" className="sheet-medium-textarea">None</textarea>
								</div>
							</div>
						</div>
					</div>
					{/* END spell row */}
				</fieldset>
			</div>
			{/* END spell page */}
			{/* BEGIN new spell page */}
			<div className="sheet-spell-page4">
				<div className="sheet-row sheet-spell-header">
					<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Level 4</div>
				</div>
				<fieldset className="repeating_spellbooklevel4">
					{/* BEGIN spell row */}
					<div className="sheet-margin-bottom sheet-padr sheet-padl compendium-drop-target">
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Spell Level</div>
							<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Spell name</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">School</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast time</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label" title="Concentration">Conc?</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ritual?</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Prepared?</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-middle sheet-center">Level 4
								<input type="hidden" name="attr_spellbaselevel" value="4"/>
								<input type="hidden" name="attr_spellfriendlylevel" value="Level 4"/>
							</div>
							<div className="sheet-col-1-3 sheet-vert-middle">
								<input type="text" className=" sheet-center" name="attr_spellname" accept="Name"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<select name="attr_spellschool" accept="School">
									<option value="" selected="selected">n/a</option>
									<option value="Abjuration">Abjuration</option>
									<option value="Conjuration">Conjuration</option>
									<option value="Divination">Divination</option>
									<option value="Enchantment">Enchantment</option>
									<option value="Evocation">Evocation</option>
									<option value="Illusion">Illusion</option>
									<option value="Necromancy">Necromancy</option>
									<option value="Transmutation">Transmutation</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcasttime" accept="Casting Time"/>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellconcentration" accept="Concentration">
									<option value="" selected="selected">No</option>
									<option value="(Concentration)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellritual" accept="Ritual">
									<option value="" selected="selected">No</option>
									<option value="(Ritual)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle" title="Always prepared means the spell is either a cantrip or one that was provided to you via a method which indicated it would never count against your prepared/known limits.">
								<select name="attr_spellisprepared">
									<option value="1">Yes</option>
									<option value="0" selected="selected">NO</option>
									<option value="0.0001">Always</option>
								</select>
							</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Gained from</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Target/Area of Effect</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Range</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Duration</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Components</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Info</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast Spell</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-middle" title="Use this field to indicate where you learned or have access to this spell from.  Useful to know if multiclassNameing or if you gain access to spells your className would not normally have thanks to subclassName bonuses">
								<select name="attr_spellgainedfrom">
									<option value="Not Set">Not Set</option>
									<option value="Arcane Trickster">Arcane Trickster</option>
									<option value="Bard">Bard</option>
									<option value="Cleric">Cleric</option>
									<option value="Druid">Druid</option>
									<option value="Eldritch Knight">Eldritch Knight</option>
									<option value="Paladin">Paladin</option>
									<option value="Ranger">Ranger</option>
									<option value="Sorcerer">Sorcerer</option>
									<option value="Warlock">Warlock</option>
									<option value="Wizard">Wizard</option>
									<option value="Other Source">Other</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spelltarget" accept="Target"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellrange" accept="Range"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellduration" accept="Duration"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcomponents" accept="Components"/>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellInfo" value="&{template:5eDefault} {{spell=1}} {{spellshowinfoblock=1}} {{spellshowdesc=1}} {{spellshowhigherlvl=1}} {{character_name=@{character_name}}} {{emote=looks at the instructions for a spell}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}}  {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  {{spelldescription=@{spelldescription}}} {{spellhigherlevel=@{spellhighersloteffect}}} @{classNameactionspellinfo}">Spell Info</button>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellCast" value="&{template:5eDefault} {{spell=1}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}} @{spellcastmacrooptions} {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  @{classNameactionspellcast}">Cast Spell</button>
							</div>
						</div>
						<div className="sheet-row sheet-padb sheet-spell-macro-output-options">
							<div className="sheet-col-1-8 sheet-vert-middle sheet-small-label sheet-padl">Spellcast macro display options</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Info block
								<br/>
								<input type="checkbox" name="attr_spellshowinfoblock" value="{{spellshowinfoblock=1}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Description
								<br/>
								<input type="checkbox" name="attr_spellshowdesc" value="{{spellshowdesc=1}} {{spelldescription=@{spelldescription}}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">At higher levels
								<br/>
								<input type="checkbox" name="attr_spellshowhigherlvl" value="{{spellshowhigherlvl=1}} {{spellhigherlevel=@{spellhighersloteffect}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattack" value="{{spellshowattack=1}} {{spellattack=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">2nd Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattackadv" value="{{spellshowattackadv=1}} {{spellattackadv=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">Saving throw
								<br/>
								<input type="checkbox" name="attr_spellshowsavethrow" value="{{spellshowsavethrow=1}} {{spellsavedc=[[@{spellsavedc} + @{customsavedc}]]}} {{spellsavestat=@{savestat}}} {{spellsavesuccess=@{savesuccess}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Healing
								<br/>
								<input type="checkbox" name="attr_spellshowhealing" value="{{spellshowhealing=1}} {{spellhealing=[[@{spellhealamount} + @{healstatbonus}]]}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Damage
								<br/>
								<input type="checkbox" name="attr_spellshowdamage" value="{{spellshowdamage=1}} {{spelldamage=[[@{damage} + @{damagestatbonus} + @{damagemiscbonus} + (@{global_spell_damage_bonus}) + 0d0]] @{damagetype}}} @{spellcancrit}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Effects
								<br/>
								<input type="checkbox" name="attr_spellshoweffects" value="{{spellshoweffects=1}} {{spelleffect=@{spelleffect}}}" />
							</div>
							<input type="hidden" name="attr_spellcastmacrooptions" value="@{spellshowinfoblock} @{spellshowdesc} @{spellshowhigherlvl} @{spellshowattack} @{spellshowattackadv} @{spellshowsavethrow} @{spellshowhealing} @{spellshowdamage} @{spellshoweffects}" />
						</div>
						<span className="sheet-spacer"></span>
						<span className="sheet-small-label">Show :</span>
						<input type="checkbox" name="attr_spelltypeadvanced" className="sheet-spelltypetab sheet-spelltypeadvanced" value="1" /><span className="sheet-spelltypetab sheet-spelltypeadvanced">Description</span> |
						<input type="checkbox" name="attr_spelltypeattack" className="sheet-spelltypetab sheet-spelltypeattack" value="1" /><span className="sheet-spelltypetab sheet-spelltypeattack">Attack</span>
						<input type="checkbox" name="attr_spelltypesave" className="sheet-spelltypetab sheet-spelltypesave" value="1" /><span className="sheet-spelltypetab sheet-spelltypesave">Save</span>
						<input type="checkbox" name="attr_spelltypeheal" className="sheet-spelltypetab sheet-spelltypeheal" value="1" /><span className="sheet-spelltypetab sheet-spelltypeheal">Healing</span> |
						<input type="checkbox" name="attr_spelltypdamage" className="sheet-spelltypetab sheet-spelltypedamage" value="1" /><span className="sheet-spelltypetab sheet-spelltypedamage">Damage</span>
						<input type="checkbox" name="attr_spelltypeeffects" className="sheet-spelltypetab sheet-spelltypeeffects" value="1" /><span className="sheet-spelltypetab sheet-spelltypeeffects">Effects</span>
						<span className="sheet-spacer"></span>
						<div className="sheet-spell-type-advanced">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Spell Description/Flavour</div>
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Higher Spell Slot Effect</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea className="sheet-medium-textarea" name="attr_spelldescription" accept="Content"></textarea>
								</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea name="attr_spellhighersloteffect" className="sheet-medium-textarea"></textarea>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-attack">
							<div className="sheet-row">
								<div className="sheet-col-1-6 sheet-offset-2-3 sheet-vert-bottom sheet-center sheet-small-label">Attack Stat</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-2-3">
									<p className="sheet-small-note sheet-margin-top">Select the attack stat for the attack. This is normally your spellcasting stat from the className you gained the spell from.</p>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<select name="attr_attackstat">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR</option>
										<option value="@{dexterity_mod}">DEX</option>
										<option value="@{constitution_mod}">CON</option>
										<option value="@{intelligence_mod}">INT</option>
										<option value="@{wisdom_mod}">WIS</option>
										<option value="@{charisma_mod}">CHA</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-save">
							<div className="sheet-row">
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Saving Stat</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">Save DC</div>
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Custom DC</div>
								<div className="sheet-col-1-2 sheet-center sheet-small-label">On a successful save</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-12">
									<select name="attr_savestat" accept="Save">
										<option value="STR">STR</option>
										<option value="DEX">DEX</option>
										<option value="CON">CON</option>
										<option value="INT">INT</option>
										<option value="WIS">WIS</option>
										<option value="CHA">CHA</option>
									</select>
								</div>
								<div className="sheet-col-1-6" title="Pick the className that the save DC will be created from or set your own DC by selecting custom here and then entering the DC in the next field">
									<select name="attr_spellsavedc">
										<option value="0">Choose...</option>
										<option value="@{arcane_trickster_spell_dc}">Arcane Trickster DC</option>
										<option value="@{bard_spell_dc}">Bard DC</option>
										<option value="@{cleric_spell_dc}">Cleric DC</option>
										<option value="@{druid_spell_dc}">Druid DC</option>
										<option value="@{eldritch_knight_spell_dc}">Eldritch Knight DC</option>
										<option value="@{paladin_spell_dc}">Paladin DC</option>
										<option value="@{ranger_spell_dc}">Ranger DC</option>
										<option value="@{sorcerer_spell_dc}">Sorcerer DC</option>
										<option value="@{warlock_spell_dc}">Warlock DC</option>
										<option value="@{wizard_spell_dc}">Wizard DC</option>
										<option value="0">Custom DC</option>
									</select>
								</div>
								<div className="sheet-col-1-12">
									<input type="number" name="attr_customsavedc" value="0" min="0" step="1" title="Unless you have selected Custom in the previous field this should always be 0"/>
								</div>
								<div className="sheet-col-1-2">
									<input type="text" className="sheet-center" name="attr_savesuccess" accept="Save Success"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-heal">
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-vert-bottom sheet-center sheet-small-label">Heal amount</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-offset-1-12 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_spellhealamount" value="0" accept="Healing"/>
								</div>
								<div className="sheet-col-1-6 sheet-center">
									<select name="attr_healstatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-damage">
							<div className="sheet-row">
								<div className="sheet-offset-1-12 sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Can Crit?</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Dice</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Other Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Type</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className=" sheet-offset-1-12 sheet-col-1-12 sheet-checkbox-row">
									<input type="checkbox" name="attr_spellcancrit" value="{{spellcancrit=1}} {{spellcritdamage=Additional [[@{damage}]] damage}}" checked="checked" />
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damage" value="0" accept="Damage"/>
								</div>
								<div className="sheet-col-1-6">
									<select name="attr_damagestatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="number" className="sheet-center" name="attr_damagemiscbonus" value="0" step="1"/>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damagetype"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-effects">
							<div className="sheet-row">
								<div className="sheet-col-5-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Effects</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1 sheet-small-label sheet-center">
									<textarea name="attr_spelleffect" className="sheet-medium-textarea">None</textarea>
								</div>
							</div>
						</div>
					</div>
					{/* END spell row */}
				</fieldset>
			</div>
			{/* END spell page */}
			{/* BEGIN new spell page */}
			<div className="sheet-spell-page5">
				<div className="sheet-row sheet-spell-header">
					<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Level 5</div>
				</div>
				<fieldset className="repeating_spellbooklevel5">
					{/* BEGIN spell row */}
					<div className="sheet-margin-bottom sheet-padr sheet-padl compendium-drop-target">
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Spell Level</div>
							<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Spell name</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">School</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast time</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label" title="Concentration">Conc?</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ritual?</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Prepared?</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-middle sheet-center">Level 5
								<input type="hidden" name="attr_spellbaselevel" value="5"/>
								<input type="hidden" name="attr_spellfriendlylevel" value="Level 5"/>
							</div>
							<div className="sheet-col-1-3 sheet-vert-middle">
								<input type="text" className=" sheet-center" name="attr_spellname" accept="Name"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<select name="attr_spellschool" accept="School">
									<option value="" selected="selected">n/a</option>
									<option value="Abjuration">Abjuration</option>
									<option value="Conjuration">Conjuration</option>
									<option value="Divination">Divination</option>
									<option value="Enchantment">Enchantment</option>
									<option value="Evocation">Evocation</option>
									<option value="Illusion">Illusion</option>
									<option value="Necromancy">Necromancy</option>
									<option value="Transmutation">Transmutation</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcasttime" accept="Casting Time"/>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellconcentration" accept="Concentration">
									<option value="" selected="selected">No</option>
									<option value="(Concentration)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellritual" accept="Ritual">
									<option value="" selected="selected">No</option>
									<option value="(Ritual)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle" title="Always prepared means the spell is either a cantrip or one that was provided to you via a method which indicated it would never count against your prepared/known limits.">
								<select name="attr_spellisprepared">
									<option value="1">Yes</option>
									<option value="0" selected="selected">NO</option>
									<option value="0.0001">Always</option>
								</select>
							</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Gained from</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Target/Area of Effect</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Range</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Duration</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Components</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Info</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast Spell</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-middle" title="Use this field to indicate where you learned or have access to this spell from.  Useful to know if multiclassNameing or if you gain access to spells your className would not normally have thanks to subclassName bonuses">
								<select name="attr_spellgainedfrom">
									<option value="Not Set">Not Set</option>
									<option value="Arcane Trickster">Arcane Trickster</option>
									<option value="Bard">Bard</option>
									<option value="Cleric">Cleric</option>
									<option value="Druid">Druid</option>
									<option value="Eldritch Knight">Eldritch Knight</option>
									<option value="Paladin">Paladin</option>
									<option value="Ranger">Ranger</option>
									<option value="Sorcerer">Sorcerer</option>
									<option value="Warlock">Warlock</option>
									<option value="Wizard">Wizard</option>
									<option value="Other Source">Other</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spelltarget" accept="Target"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellrange" accept="Range"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellduration" accept="Duration"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcomponents" accept="Components"/>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellInfo" value="&{template:5eDefault} {{spell=1}} {{spellshowinfoblock=1}} {{spellshowdesc=1}} {{spellshowhigherlvl=1}} {{character_name=@{character_name}}} {{emote=looks at the instructions for a spell}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}}  {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  {{spelldescription=@{spelldescription}}} {{spellhigherlevel=@{spellhighersloteffect}}} @{classNameactionspellinfo}">Spell Info</button>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellCast" value="&{template:5eDefault} {{spell=1}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}} @{spellcastmacrooptions} {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  @{classNameactionspellcast}">Cast Spell</button>
							</div>
						</div>
						<div className="sheet-row sheet-padb sheet-spell-macro-output-options">
							<div className="sheet-col-1-8 sheet-vert-middle sheet-small-label sheet-padl">Spellcast macro display options</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Info block
								<br/>
								<input type="checkbox" name="attr_spellshowinfoblock" value="{{spellshowinfoblock=1}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Description
								<br/>
								<input type="checkbox" name="attr_spellshowdesc" value="{{spellshowdesc=1}} {{spelldescription=@{spelldescription}}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">At higher levels
								<br/>
								<input type="checkbox" name="attr_spellshowhigherlvl" value="{{spellshowhigherlvl=1}} {{spellhigherlevel=@{spellhighersloteffect}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattack" value="{{spellshowattack=1}} {{spellattack=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">2nd Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattackadv" value="{{spellshowattackadv=1}} {{spellattackadv=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">Saving throw
								<br/>
								<input type="checkbox" name="attr_spellshowsavethrow" value="{{spellshowsavethrow=1}} {{spellsavedc=[[@{spellsavedc} + @{customsavedc}]]}} {{spellsavestat=@{savestat}}} {{spellsavesuccess=@{savesuccess}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Healing
								<br/>
								<input type="checkbox" name="attr_spellshowhealing" value="{{spellshowhealing=1}} {{spellhealing=[[@{spellhealamount} + @{healstatbonus}]]}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Damage
								<br/>
								<input type="checkbox" name="attr_spellshowdamage" value="{{spellshowdamage=1}} {{spelldamage=[[@{damage} + @{damagestatbonus} + @{damagemiscbonus} + (@{global_spell_damage_bonus}) + 0d0]] @{damagetype}}} @{spellcancrit}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Effects
								<br/>
								<input type="checkbox" name="attr_spellshoweffects" value="{{spellshoweffects=1}} {{spelleffect=@{spelleffect}}}" />
							</div>
							<input type="hidden" name="attr_spellcastmacrooptions" value="@{spellshowinfoblock} @{spellshowdesc} @{spellshowhigherlvl} @{spellshowattack} @{spellshowattackadv} @{spellshowsavethrow} @{spellshowhealing} @{spellshowdamage} @{spellshoweffects}" />
						</div>
						<span className="sheet-spacer"></span>
						<span className="sheet-small-label">Show :</span>
						<input type="checkbox" name="attr_spelltypeadvanced" className="sheet-spelltypetab sheet-spelltypeadvanced" value="1" /><span className="sheet-spelltypetab sheet-spelltypeadvanced">Description</span> |
						<input type="checkbox" name="attr_spelltypeattack" className="sheet-spelltypetab sheet-spelltypeattack" value="1" /><span className="sheet-spelltypetab sheet-spelltypeattack">Attack</span>
						<input type="checkbox" name="attr_spelltypesave" className="sheet-spelltypetab sheet-spelltypesave" value="1" /><span className="sheet-spelltypetab sheet-spelltypesave">Save</span>
						<input type="checkbox" name="attr_spelltypeheal" className="sheet-spelltypetab sheet-spelltypeheal" value="1" /><span className="sheet-spelltypetab sheet-spelltypeheal">Healing</span> |
						<input type="checkbox" name="attr_spelltypdamage" className="sheet-spelltypetab sheet-spelltypedamage" value="1" /><span className="sheet-spelltypetab sheet-spelltypedamage">Damage</span>
						<input type="checkbox" name="attr_spelltypeeffects" className="sheet-spelltypetab sheet-spelltypeeffects" value="1" /><span className="sheet-spelltypetab sheet-spelltypeeffects">Effects</span>
						<span className="sheet-spacer"></span>
						<div className="sheet-spell-type-advanced">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Spell Description/Flavour</div>
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Higher Spell Slot Effect</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea className="sheet-medium-textarea" name="attr_spelldescription" accept="Content"></textarea>
								</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea name="attr_spellhighersloteffect" className="sheet-medium-textarea"></textarea>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-attack">
							<div className="sheet-row">
								<div className="sheet-col-1-6 sheet-offset-2-3 sheet-vert-bottom sheet-center sheet-small-label">Attack Stat</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-2-3">
									<p className="sheet-small-note sheet-margin-top">Select the attack stat for the attack. This is normally your spellcasting stat from the className you gained the spell from.</p>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<select name="attr_attackstat">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR</option>
										<option value="@{dexterity_mod}">DEX</option>
										<option value="@{constitution_mod}">CON</option>
										<option value="@{intelligence_mod}">INT</option>
										<option value="@{wisdom_mod}">WIS</option>
										<option value="@{charisma_mod}">CHA</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-save">
							<div className="sheet-row">
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Saving Stat</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">Save DC</div>
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Custom DC</div>
								<div className="sheet-col-1-2 sheet-center sheet-small-label">On a successful save</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-12">
									<select name="attr_savestat" accept="Save">
										<option value="STR">STR</option>
										<option value="DEX">DEX</option>
										<option value="CON">CON</option>
										<option value="INT">INT</option>
										<option value="WIS">WIS</option>
										<option value="CHA">CHA</option>
									</select>
								</div>
								<div className="sheet-col-1-6" title="Pick the className that the save DC will be created from or set your own DC by selecting custom here and then entering the DC in the next field">
									<select name="attr_spellsavedc">
										<option value="0">Choose...</option>
										<option value="@{arcane_trickster_spell_dc}">Arcane Trickster DC</option>
										<option value="@{bard_spell_dc}">Bard DC</option>
										<option value="@{cleric_spell_dc}">Cleric DC</option>
										<option value="@{druid_spell_dc}">Druid DC</option>
										<option value="@{eldritch_knight_spell_dc}">Eldritch Knight DC</option>
										<option value="@{paladin_spell_dc}">Paladin DC</option>
										<option value="@{ranger_spell_dc}">Ranger DC</option>
										<option value="@{sorcerer_spell_dc}">Sorcerer DC</option>
										<option value="@{warlock_spell_dc}">Warlock DC</option>
										<option value="@{wizard_spell_dc}">Wizard DC</option>
										<option value="0">Custom DC</option>
									</select>
								</div>
								<div className="sheet-col-1-12">
									<input type="number" name="attr_customsavedc" value="0" min="0" step="1" title="Unless you have selected Custom in the previous field this should always be 0"/>
								</div>
								<div className="sheet-col-1-2">
									<input type="text" className="sheet-center" name="attr_savesuccess" accept="Save Success"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-heal">
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-vert-bottom sheet-center sheet-small-label">Heal amount</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-offset-1-12 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_spellhealamount" value="0" accept="Healing"/>
								</div>
								<div className="sheet-col-1-6 sheet-center">
									<select name="attr_healstatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-damage">
							<div className="sheet-row">
								<div className="sheet-offset-1-12 sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Can Crit?</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Dice</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Other Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Type</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className=" sheet-offset-1-12 sheet-col-1-12 sheet-checkbox-row">
									<input type="checkbox" name="attr_spellcancrit" value="{{spellcancrit=1}} {{spellcritdamage=Additional [[@{damage}]] damage}}" checked="checked" />
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damage" value="0" accept="Damage"/>
								</div>
								<div className="sheet-col-1-6">
									<select name="attr_damagestatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="number" className="sheet-center" name="attr_damagemiscbonus" value="0" step="1"/>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damagetype"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-effects">
							<div className="sheet-row">
								<div className="sheet-col-5-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Effects</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1 sheet-small-label sheet-center">
									<textarea name="attr_spelleffect" className="sheet-medium-textarea">None</textarea>
								</div>
							</div>
						</div>
					</div>
					{/* END spell row */}
				</fieldset>
			</div>
			{/* END spell page */}
			{/* BEGIN new spell page */}
			<div className="sheet-spell-page6">
				<div className="sheet-row sheet-spell-header">
					<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Level 6</div>
				</div>
				<fieldset className="repeating_spellbooklevel6">
					{/* BEGIN spell row */}
					<div className="sheet-margin-bottom sheet-padr sheet-padl compendium-drop-target">
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Spell Level</div>
							<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Spell name</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">School</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast time</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label" title="Concentration">Conc?</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ritual?</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Prepared?</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-middle sheet-center">Level 6
								<input type="hidden" name="attr_spellbaselevel" value="6"/>
								<input type="hidden" name="attr_spellfriendlylevel" value="Level 6"/>
							</div>
							<div className="sheet-col-1-3 sheet-vert-middle">
								<input type="text" className=" sheet-center" name="attr_spellname" accept="Name"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<select name="attr_spellschool" accept="School">
									<option value="" selected="selected">n/a</option>
									<option value="Abjuration">Abjuration</option>
									<option value="Conjuration">Conjuration</option>
									<option value="Divination">Divination</option>
									<option value="Enchantment">Enchantment</option>
									<option value="Evocation">Evocation</option>
									<option value="Illusion">Illusion</option>
									<option value="Necromancy">Necromancy</option>
									<option value="Transmutation">Transmutation</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcasttime" accept="Casting Time"/>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellconcentration" accept="Concentration">
									<option value="" selected="selected">No</option>
									<option value="(Concentration)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellritual" accept="Ritual">
									<option value="" selected="selected">No</option>
									<option value="(Ritual)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle" title="Always prepared means the spell is either a cantrip or one that was provided to you via a method which indicated it would never count against your prepared/known limits.">
								<select name="attr_spellisprepared">
									<option value="1">Yes</option>
									<option value="0" selected="selected">NO</option>
									<option value="0.0001">Always</option>
								</select>
							</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Gained from</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Target/Area of Effect</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Range</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Duration</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Components</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Info</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast Spell</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-middle" title="Use this field to indicate where you learned or have access to this spell from.  Useful to know if multiclassNameing or if you gain access to spells your className would not normally have thanks to subclassName bonuses">
								<select name="attr_spellgainedfrom">
									<option value="Not Set">Not Set</option>
									<option value="Arcane Trickster">Arcane Trickster</option>
									<option value="Bard">Bard</option>
									<option value="Cleric">Cleric</option>
									<option value="Druid">Druid</option>
									<option value="Eldritch Knight">Eldritch Knight</option>
									<option value="Paladin">Paladin</option>
									<option value="Ranger">Ranger</option>
									<option value="Sorcerer">Sorcerer</option>
									<option value="Warlock">Warlock</option>
									<option value="Wizard">Wizard</option>
									<option value="Other Source">Other</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spelltarget" accept="Target"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellrange" accept="Range"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellduration" accept="Duration"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcomponents" accept="Components"/>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellInfo" value="&{template:5eDefault} {{spell=1}} {{spellshowinfoblock=1}} {{spellshowdesc=1}} {{spellshowhigherlvl=1}} {{character_name=@{character_name}}} {{emote=looks at the instructions for a spell}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}}  {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  {{spelldescription=@{spelldescription}}} {{spellhigherlevel=@{spellhighersloteffect}}} @{classNameactionspellinfo}">Spell Info</button>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellCast" value="&{template:5eDefault} {{spell=1}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}} @{spellcastmacrooptions} {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  @{classNameactionspellcast}">Cast Spell</button>
							</div>
						</div>
						<div className="sheet-row sheet-padb sheet-spell-macro-output-options">
							<div className="sheet-col-1-8 sheet-vert-middle sheet-small-label sheet-padl">Spellcast macro display options</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Info block
								<br/>
								<input type="checkbox" name="attr_spellshowinfoblock" value="{{spellshowinfoblock=1}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Description
								<br/>
								<input type="checkbox" name="attr_spellshowdesc" value="{{spellshowdesc=1}} {{spelldescription=@{spelldescription}}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">At higher levels
								<br/>
								<input type="checkbox" name="attr_spellshowhigherlvl" value="{{spellshowhigherlvl=1}} {{spellhigherlevel=@{spellhighersloteffect}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattack" value="{{spellshowattack=1}} {{spellattack=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">2nd Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattackadv" value="{{spellshowattackadv=1}} {{spellattackadv=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">Saving throw
								<br/>
								<input type="checkbox" name="attr_spellshowsavethrow" value="{{spellshowsavethrow=1}} {{spellsavedc=[[@{spellsavedc} + @{customsavedc}]]}} {{spellsavestat=@{savestat}}} {{spellsavesuccess=@{savesuccess}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Healing
								<br/>
								<input type="checkbox" name="attr_spellshowhealing" value="{{spellshowhealing=1}} {{spellhealing=[[@{spellhealamount} + @{healstatbonus}]]}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Damage
								<br/>
								<input type="checkbox" name="attr_spellshowdamage" value="{{spellshowdamage=1}} {{spelldamage=[[@{damage} + @{damagestatbonus} + @{damagemiscbonus} + (@{global_spell_damage_bonus}) + 0d0]] @{damagetype}}} @{spellcancrit}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Effects
								<br/>
								<input type="checkbox" name="attr_spellshoweffects" value="{{spellshoweffects=1}} {{spelleffect=@{spelleffect}}}" />
							</div>
							<input type="hidden" name="attr_spellcastmacrooptions" value="@{spellshowinfoblock} @{spellshowdesc} @{spellshowhigherlvl} @{spellshowattack} @{spellshowattackadv} @{spellshowsavethrow} @{spellshowhealing} @{spellshowdamage} @{spellshoweffects}" />
						</div>
						<span className="sheet-spacer"></span>
						<span className="sheet-small-label">Show :</span>
						<input type="checkbox" name="attr_spelltypeadvanced" className="sheet-spelltypetab sheet-spelltypeadvanced" value="1" /><span className="sheet-spelltypetab sheet-spelltypeadvanced">Description</span> |
						<input type="checkbox" name="attr_spelltypeattack" className="sheet-spelltypetab sheet-spelltypeattack" value="1" /><span className="sheet-spelltypetab sheet-spelltypeattack">Attack</span>
						<input type="checkbox" name="attr_spelltypesave" className="sheet-spelltypetab sheet-spelltypesave" value="1" /><span className="sheet-spelltypetab sheet-spelltypesave">Save</span>
						<input type="checkbox" name="attr_spelltypeheal" className="sheet-spelltypetab sheet-spelltypeheal" value="1" /><span className="sheet-spelltypetab sheet-spelltypeheal">Healing</span> |
						<input type="checkbox" name="attr_spelltypdamage" className="sheet-spelltypetab sheet-spelltypedamage" value="1" /><span className="sheet-spelltypetab sheet-spelltypedamage">Damage</span>
						<input type="checkbox" name="attr_spelltypeeffects" className="sheet-spelltypetab sheet-spelltypeeffects" value="1" /><span className="sheet-spelltypetab sheet-spelltypeeffects">Effects</span>
						<span className="sheet-spacer"></span>
						<div className="sheet-spell-type-advanced">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Spell Description/Flavour</div>
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Higher Spell Slot Effect</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea className="sheet-medium-textarea" name="attr_spelldescription" accept="Content"></textarea>
								</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea name="attr_spellhighersloteffect" className="sheet-medium-textarea"></textarea>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-attack">
							<div className="sheet-row">
								<div className="sheet-col-1-6 sheet-offset-2-3 sheet-vert-bottom sheet-center sheet-small-label">Attack Stat</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-2-3">
									<p className="sheet-small-note sheet-margin-top">Select the attack stat for the attack. This is normally your spellcasting stat from the className you gained the spell from.</p>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<select name="attr_attackstat">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR</option>
										<option value="@{dexterity_mod}">DEX</option>
										<option value="@{constitution_mod}">CON</option>
										<option value="@{intelligence_mod}">INT</option>
										<option value="@{wisdom_mod}">WIS</option>
										<option value="@{charisma_mod}">CHA</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-save">
							<div className="sheet-row">
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Saving Stat</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">Save DC</div>
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Custom DC</div>
								<div className="sheet-col-1-2 sheet-center sheet-small-label">On a successful save</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-12">
									<select name="attr_savestat" accept="Save">
										<option value="STR">STR</option>
										<option value="DEX">DEX</option>
										<option value="CON">CON</option>
										<option value="INT">INT</option>
										<option value="WIS">WIS</option>
										<option value="CHA">CHA</option>
									</select>
								</div>
								<div className="sheet-col-1-6" title="Pick the className that the save DC will be created from or set your own DC by selecting custom here and then entering the DC in the next field">
									<select name="attr_spellsavedc">
										<option value="0">Choose...</option>
										<option value="@{arcane_trickster_spell_dc}">Arcane Trickster DC</option>
										<option value="@{bard_spell_dc}">Bard DC</option>
										<option value="@{cleric_spell_dc}">Cleric DC</option>
										<option value="@{druid_spell_dc}">Druid DC</option>
										<option value="@{eldritch_knight_spell_dc}">Eldritch Knight DC</option>
										<option value="@{paladin_spell_dc}">Paladin DC</option>
										<option value="@{ranger_spell_dc}">Ranger DC</option>
										<option value="@{sorcerer_spell_dc}">Sorcerer DC</option>
										<option value="@{warlock_spell_dc}">Warlock DC</option>
										<option value="@{wizard_spell_dc}">Wizard DC</option>
										<option value="0">Custom DC</option>
									</select>
								</div>
								<div className="sheet-col-1-12">
									<input type="number" name="attr_customsavedc" value="0" min="0" step="1" title="Unless you have selected Custom in the previous field this should always be 0"/>
								</div>
								<div className="sheet-col-1-2">
									<input type="text" className="sheet-center" name="attr_savesuccess" accept="Save Success"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-heal">
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-vert-bottom sheet-center sheet-small-label">Heal amount</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-offset-1-12 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_spellhealamount" value="0" accept="Healing"/>
								</div>
								<div className="sheet-col-1-6 sheet-center">
									<select name="attr_healstatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-damage">
							<div className="sheet-row">
								<div className="sheet-offset-1-12 sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Can Crit?</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Dice</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Other Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Type</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className=" sheet-offset-1-12 sheet-col-1-12 sheet-checkbox-row">
									<input type="checkbox" name="attr_spellcancrit" value="{{spellcancrit=1}} {{spellcritdamage=Additional [[@{damage}]] damage}}" checked="checked" />
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damage" value="0" accept="Damage"/>
								</div>
								<div className="sheet-col-1-6">
									<select name="attr_damagestatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="number" className="sheet-center" name="attr_damagemiscbonus" value="0" step="1"/>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damagetype"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-effects">
							<div className="sheet-row">
								<div className="sheet-col-5-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Effects</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1 sheet-small-label sheet-center">
									<textarea name="attr_spelleffect" className="sheet-medium-textarea">None</textarea>
								</div>
							</div>
						</div>
					</div>
					{/* END spell row */}
				</fieldset>
			</div>
			{/* END spell page */}
			{/* BEGIN new spell page */}
			<div className="sheet-spell-page7">
				<div className="sheet-row sheet-spell-header">
					<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Level 7</div>
				</div>
				<fieldset className="repeating_spellbooklevel7">
					{/* BEGIN spell row */}
					<div className="sheet-margin-bottom sheet-padr sheet-padl compendium-drop-target">
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Spell Level</div>
							<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Spell name</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">School</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast time</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label" title="Concentration">Conc?</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ritual?</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Prepared?</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-middle sheet-center">Level 7
								<input type="hidden" name="attr_spellbaselevel" value="7"/>
								<input type="hidden" name="attr_spellfriendlylevel" value="Level 7"/>
							</div>
							<div className="sheet-col-1-3 sheet-vert-middle">
								<input type="text" className=" sheet-center" name="attr_spellname" accept="Name"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<select name="attr_spellschool" accept="School">
									<option value="" selected="selected">n/a</option>
									<option value="Abjuration">Abjuration</option>
									<option value="Conjuration">Conjuration</option>
									<option value="Divination">Divination</option>
									<option value="Enchantment">Enchantment</option>
									<option value="Evocation">Evocation</option>
									<option value="Illusion">Illusion</option>
									<option value="Necromancy">Necromancy</option>
									<option value="Transmutation">Transmutation</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcasttime" accept="Casting Time"/>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellconcentration" accept="Concentration">
									<option value="" selected="selected">No</option>
									<option value="(Concentration)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellritual" accept="Ritual">
									<option value="" selected="selected">No</option>
									<option value="(Ritual)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle" title="Always prepared means the spell is either a cantrip or one that was provided to you via a method which indicated it would never count against your prepared/known limits.">
								<select name="attr_spellisprepared">
									<option value="1">Yes</option>
									<option value="0" selected="selected">NO</option>
									<option value="0.0001">Always</option>
								</select>
							</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Gained from</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Target/Area of Effect</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Range</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Duration</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Components</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Info</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast Spell</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-middle" title="Use this field to indicate where you learned or have access to this spell from.  Useful to know if multiclassNameing or if you gain access to spells your className would not normally have thanks to subclassName bonuses">
								<select name="attr_spellgainedfrom">
									<option value="Not Set">Not Set</option>
									<option value="Arcane Trickster">Arcane Trickster</option>
									<option value="Bard">Bard</option>
									<option value="Cleric">Cleric</option>
									<option value="Druid">Druid</option>
									<option value="Eldritch Knight">Eldritch Knight</option>
									<option value="Paladin">Paladin</option>
									<option value="Ranger">Ranger</option>
									<option value="Sorcerer">Sorcerer</option>
									<option value="Warlock">Warlock</option>
									<option value="Wizard">Wizard</option>
									<option value="Other Source">Other</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spelltarget" accept="Target"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellrange" accept="Range"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellduration" accept="Duration"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcomponents" accept="Components"/>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellInfo" value="&{template:5eDefault} {{spell=1}} {{spellshowinfoblock=1}} {{spellshowdesc=1}} {{spellshowhigherlvl=1}} {{character_name=@{character_name}}} {{emote=looks at the instructions for a spell}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}}  {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  {{spelldescription=@{spelldescription}}} {{spellhigherlevel=@{spellhighersloteffect}}} @{classNameactionspellinfo}">Spell Info</button>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellCast" value="&{template:5eDefault} {{spell=1}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}} @{spellcastmacrooptions} {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  @{classNameactionspellcast}">Cast Spell</button>
							</div>
						</div>
						<div className="sheet-row sheet-padb sheet-spell-macro-output-options">
							<div className="sheet-col-1-8 sheet-vert-middle sheet-small-label sheet-padl">Spellcast macro display options</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Info block
								<br/>
								<input type="checkbox" name="attr_spellshowinfoblock" value="{{spellshowinfoblock=1}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Description
								<br/>
								<input type="checkbox" name="attr_spellshowdesc" value="{{spellshowdesc=1}} {{spelldescription=@{spelldescription}}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">At higher levels
								<br/>
								<input type="checkbox" name="attr_spellshowhigherlvl" value="{{spellshowhigherlvl=1}} {{spellhigherlevel=@{spellhighersloteffect}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattack" value="{{spellshowattack=1}} {{spellattack=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">2nd Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattackadv" value="{{spellshowattackadv=1}} {{spellattackadv=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">Saving throw
								<br/>
								<input type="checkbox" name="attr_spellshowsavethrow" value="{{spellshowsavethrow=1}} {{spellsavedc=[[@{spellsavedc} + @{customsavedc}]]}} {{spellsavestat=@{savestat}}} {{spellsavesuccess=@{savesuccess}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Healing
								<br/>
								<input type="checkbox" name="attr_spellshowhealing" value="{{spellshowhealing=1}} {{spellhealing=[[@{spellhealamount} + @{healstatbonus}]]}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Damage
								<br/>
								<input type="checkbox" name="attr_spellshowdamage" value="{{spellshowdamage=1}} {{spelldamage=[[@{damage} + @{damagestatbonus} + @{damagemiscbonus} + (@{global_spell_damage_bonus}) + 0d0]] @{damagetype}}} @{spellcancrit}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Effects
								<br/>
								<input type="checkbox" name="attr_spellshoweffects" value="{{spellshoweffects=1}} {{spelleffect=@{spelleffect}}}" />
							</div>
							<input type="hidden" name="attr_spellcastmacrooptions" value="@{spellshowinfoblock} @{spellshowdesc} @{spellshowhigherlvl} @{spellshowattack} @{spellshowattackadv} @{spellshowsavethrow} @{spellshowhealing} @{spellshowdamage} @{spellshoweffects}" />
						</div>
						<span className="sheet-spacer"></span>
						<span className="sheet-small-label">Show :</span>
						<input type="checkbox" name="attr_spelltypeadvanced" className="sheet-spelltypetab sheet-spelltypeadvanced" value="1" /><span className="sheet-spelltypetab sheet-spelltypeadvanced">Description</span> |
						<input type="checkbox" name="attr_spelltypeattack" className="sheet-spelltypetab sheet-spelltypeattack" value="1" /><span className="sheet-spelltypetab sheet-spelltypeattack">Attack</span>
						<input type="checkbox" name="attr_spelltypesave" className="sheet-spelltypetab sheet-spelltypesave" value="1" /><span className="sheet-spelltypetab sheet-spelltypesave">Save</span>
						<input type="checkbox" name="attr_spelltypeheal" className="sheet-spelltypetab sheet-spelltypeheal" value="1" /><span className="sheet-spelltypetab sheet-spelltypeheal">Healing</span> |
						<input type="checkbox" name="attr_spelltypdamage" className="sheet-spelltypetab sheet-spelltypedamage" value="1" /><span className="sheet-spelltypetab sheet-spelltypedamage">Damage</span>
						<input type="checkbox" name="attr_spelltypeeffects" className="sheet-spelltypetab sheet-spelltypeeffects" value="1" /><span className="sheet-spelltypetab sheet-spelltypeeffects">Effects</span>
						<span className="sheet-spacer"></span>
						<div className="sheet-spell-type-advanced">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Spell Description/Flavour</div>
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Higher Spell Slot Effect</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea className="sheet-medium-textarea" name="attr_spelldescription" accept="Content"></textarea>
								</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea name="attr_spellhighersloteffect" className="sheet-medium-textarea"></textarea>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-attack">
							<div className="sheet-row">
								<div className="sheet-col-1-6 sheet-offset-2-3 sheet-vert-bottom sheet-center sheet-small-label">Attack Stat</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-2-3">
									<p className="sheet-small-note sheet-margin-top">Select the attack stat for the attack. This is normally your spellcasting stat from the className you gained the spell from.</p>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<select name="attr_attackstat">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR</option>
										<option value="@{dexterity_mod}">DEX</option>
										<option value="@{constitution_mod}">CON</option>
										<option value="@{intelligence_mod}">INT</option>
										<option value="@{wisdom_mod}">WIS</option>
										<option value="@{charisma_mod}">CHA</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-save">
							<div className="sheet-row">
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Saving Stat</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">Save DC</div>
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Custom DC</div>
								<div className="sheet-col-1-2 sheet-center sheet-small-label">On a successful save</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-12">
									<select name="attr_savestat" accept="Save">
										<option value="STR">STR</option>
										<option value="DEX">DEX</option>
										<option value="CON">CON</option>
										<option value="INT">INT</option>
										<option value="WIS">WIS</option>
										<option value="CHA">CHA</option>
									</select>
								</div>
								<div className="sheet-col-1-6" title="Pick the className that the save DC will be created from or set your own DC by selecting custom here and then entering the DC in the next field">
									<select name="attr_spellsavedc">
										<option value="0">Choose...</option>
										<option value="@{arcane_trickster_spell_dc}">Arcane Trickster DC</option>
										<option value="@{bard_spell_dc}">Bard DC</option>
										<option value="@{cleric_spell_dc}">Cleric DC</option>
										<option value="@{druid_spell_dc}">Druid DC</option>
										<option value="@{eldritch_knight_spell_dc}">Eldritch Knight DC</option>
										<option value="@{paladin_spell_dc}">Paladin DC</option>
										<option value="@{ranger_spell_dc}">Ranger DC</option>
										<option value="@{sorcerer_spell_dc}">Sorcerer DC</option>
										<option value="@{warlock_spell_dc}">Warlock DC</option>
										<option value="@{wizard_spell_dc}">Wizard DC</option>
										<option value="0">Custom DC</option>
									</select>
								</div>
								<div className="sheet-col-1-12">
									<input type="number" name="attr_customsavedc" value="0" min="0" step="1" title="Unless you have selected Custom in the previous field this should always be 0"/>
								</div>
								<div className="sheet-col-1-2">
									<input type="text" className="sheet-center" name="attr_savesuccess" accept="Save Success"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-heal">
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-vert-bottom sheet-center sheet-small-label">Heal amount</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-offset-1-12 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_spellhealamount" value="0" accept="Healing"/>
								</div>
								<div className="sheet-col-1-6 sheet-center">
									<select name="attr_healstatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-damage">
							<div className="sheet-row">
								<div className="sheet-offset-1-12 sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Can Crit?</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Dice</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Other Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Type</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className=" sheet-offset-1-12 sheet-col-1-12 sheet-checkbox-row">
									<input type="checkbox" name="attr_spellcancrit" value="{{spellcancrit=1}} {{spellcritdamage=Additional [[@{damage}]] damage}}" checked="checked" />
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damage" value="0" accept="Damage"/>
								</div>
								<div className="sheet-col-1-6">
									<select name="attr_damagestatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="number" className="sheet-center" name="attr_damagemiscbonus" value="0" step="1"/>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damagetype"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-effects">
							<div className="sheet-row">
								<div className="sheet-col-5-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Effects</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1 sheet-small-label sheet-center">
									<textarea name="attr_spelleffect" className="sheet-medium-textarea">None</textarea>
								</div>
							</div>
						</div>
					</div>
					{/* END spell row */}
				</fieldset>
			</div>
			{/* END spell page */}
			{/* BEGIN new spell page */}
			<div className="sheet-spell-page8">
				<div className="sheet-row sheet-spell-header">
					<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Level 8</div>
				</div>
				<fieldset className="repeating_spellbooklevel8">
					{/* BEGIN spell row */}
					<div className="sheet-margin-bottom sheet-padr sheet-padl compendium-drop-target">
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Spell Level</div>
							<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Spell name</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">School</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast time</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label" title="Concentration">Conc?</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ritual?</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Prepared?</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-middle sheet-center">Level 8
								<input type="hidden" name="attr_spellbaselevel" value="8"/>
								<input type="hidden" name="attr_spellfriendlylevel" value="Level 8"/>
							</div>
							<div className="sheet-col-1-3 sheet-vert-middle">
								<input type="text" className=" sheet-center" name="attr_spellname" accept="Name"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<select name="attr_spellschool" accept="School">
									<option value="" selected="selected">n/a</option>
									<option value="Abjuration">Abjuration</option>
									<option value="Conjuration">Conjuration</option>
									<option value="Divination">Divination</option>
									<option value="Enchantment">Enchantment</option>
									<option value="Evocation">Evocation</option>
									<option value="Illusion">Illusion</option>
									<option value="Necromancy">Necromancy</option>
									<option value="Transmutation">Transmutation</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcasttime" accept="Casting Time"/>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellconcentration" accept="Concentration">
									<option value="" selected="selected">No</option>
									<option value="(Concentration)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellritual" accept="Ritual">
									<option value="" selected="selected">No</option>
									<option value="(Ritual)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle" title="Always prepared means the spell is either a cantrip or one that was provided to you via a method which indicated it would never count against your prepared/known limits.">
								<select name="attr_spellisprepared">
									<option value="1">Yes</option>
									<option value="0" selected="selected">NO</option>
									<option value="0.0001">Always</option>
								</select>
							</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Gained from</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Target/Area of Effect</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Range</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Duration</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Components</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Info</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast Spell</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-middle" title="Use this field to indicate where you learned or have access to this spell from.  Useful to know if multiclassNameing or if you gain access to spells your className would not normally have thanks to subclassName bonuses">
								<select name="attr_spellgainedfrom">
									<option value="Not Set">Not Set</option>
									<option value="Arcane Trickster">Arcane Trickster</option>
									<option value="Bard">Bard</option>
									<option value="Cleric">Cleric</option>
									<option value="Druid">Druid</option>
									<option value="Eldritch Knight">Eldritch Knight</option>
									<option value="Paladin">Paladin</option>
									<option value="Ranger">Ranger</option>
									<option value="Sorcerer">Sorcerer</option>
									<option value="Warlock">Warlock</option>
									<option value="Wizard">Wizard</option>
									<option value="Other Source">Other</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spelltarget" accept="Target"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellrange" accept="Range"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellduration" accept="Duration"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcomponents" accept="Components"/>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellInfo" value="&{template:5eDefault} {{spell=1}} {{spellshowinfoblock=1}} {{spellshowdesc=1}} {{spellshowhigherlvl=1}} {{character_name=@{character_name}}} {{emote=looks at the instructions for a spell}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}}  {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  {{spelldescription=@{spelldescription}}} {{spellhigherlevel=@{spellhighersloteffect}}} @{classNameactionspellinfo}">Spell Info</button>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellCast" value="&{template:5eDefault} {{spell=1}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}} @{spellcastmacrooptions} {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  @{classNameactionspellcast}">Cast Spell</button>
							</div>
						</div>
						<div className="sheet-row sheet-padb sheet-spell-macro-output-options">
							<div className="sheet-col-1-8 sheet-vert-middle sheet-small-label sheet-padl">Spellcast macro display options</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Info block
								<br/>
								<input type="checkbox" name="attr_spellshowinfoblock" value="{{spellshowinfoblock=1}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Description
								<br/>
								<input type="checkbox" name="attr_spellshowdesc" value="{{spellshowdesc=1}} {{spelldescription=@{spelldescription}}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">At higher levels
								<br/>
								<input type="checkbox" name="attr_spellshowhigherlvl" value="{{spellshowhigherlvl=1}} {{spellhigherlevel=@{spellhighersloteffect}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattack" value="{{spellshowattack=1}} {{spellattack=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">2nd Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattackadv" value="{{spellshowattackadv=1}} {{spellattackadv=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">Saving throw
								<br/>
								<input type="checkbox" name="attr_spellshowsavethrow" value="{{spellshowsavethrow=1}} {{spellsavedc=[[@{spellsavedc} + @{customsavedc}]]}} {{spellsavestat=@{savestat}}} {{spellsavesuccess=@{savesuccess}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Healing
								<br/>
								<input type="checkbox" name="attr_spellshowhealing" value="{{spellshowhealing=1}} {{spellhealing=[[@{spellhealamount} + @{healstatbonus}]]}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Damage
								<br/>
								<input type="checkbox" name="attr_spellshowdamage" value="{{spellshowdamage=1}} {{spelldamage=[[@{damage} + @{damagestatbonus} + @{damagemiscbonus} + (@{global_spell_damage_bonus}) + 0d0]] @{damagetype}}} @{spellcancrit}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Effects
								<br/>
								<input type="checkbox" name="attr_spellshoweffects" value="{{spellshoweffects=1}} {{spelleffect=@{spelleffect}}}" />
							</div>
							<input type="hidden" name="attr_spellcastmacrooptions" value="@{spellshowinfoblock} @{spellshowdesc} @{spellshowhigherlvl} @{spellshowattack} @{spellshowattackadv} @{spellshowsavethrow} @{spellshowhealing} @{spellshowdamage} @{spellshoweffects}" />
						</div>
						<span className="sheet-spacer"></span>
						<span className="sheet-small-label">Show :</span>
						<input type="checkbox" name="attr_spelltypeadvanced" className="sheet-spelltypetab sheet-spelltypeadvanced" value="1" /><span className="sheet-spelltypetab sheet-spelltypeadvanced">Description</span> |
						<input type="checkbox" name="attr_spelltypeattack" className="sheet-spelltypetab sheet-spelltypeattack" value="1" /><span className="sheet-spelltypetab sheet-spelltypeattack">Attack</span>
						<input type="checkbox" name="attr_spelltypesave" className="sheet-spelltypetab sheet-spelltypesave" value="1" /><span className="sheet-spelltypetab sheet-spelltypesave">Save</span>
						<input type="checkbox" name="attr_spelltypeheal" className="sheet-spelltypetab sheet-spelltypeheal" value="1" /><span className="sheet-spelltypetab sheet-spelltypeheal">Healing</span> |
						<input type="checkbox" name="attr_spelltypdamage" className="sheet-spelltypetab sheet-spelltypedamage" value="1" /><span className="sheet-spelltypetab sheet-spelltypedamage">Damage</span>
						<input type="checkbox" name="attr_spelltypeeffects" className="sheet-spelltypetab sheet-spelltypeeffects" value="1" /><span className="sheet-spelltypetab sheet-spelltypeeffects">Effects</span>
						<span className="sheet-spacer"></span>
						<div className="sheet-spell-type-advanced">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Spell Description/Flavour</div>
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Higher Spell Slot Effect</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea className="sheet-medium-textarea" name="attr_spelldescription" accept="Content"></textarea>
								</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea name="attr_spellhighersloteffect" className="sheet-medium-textarea"></textarea>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-attack">
							<div className="sheet-row">
								<div className="sheet-col-1-6 sheet-offset-2-3 sheet-vert-bottom sheet-center sheet-small-label">Attack Stat</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-2-3">
									<p className="sheet-small-note sheet-margin-top">Select the attack stat for the attack. This is normally your spellcasting stat from the className you gained the spell from.</p>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<select name="attr_attackstat">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR</option>
										<option value="@{dexterity_mod}">DEX</option>
										<option value="@{constitution_mod}">CON</option>
										<option value="@{intelligence_mod}">INT</option>
										<option value="@{wisdom_mod}">WIS</option>
										<option value="@{charisma_mod}">CHA</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-save">
							<div className="sheet-row">
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Saving Stat</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">Save DC</div>
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Custom DC</div>
								<div className="sheet-col-1-2 sheet-center sheet-small-label">On a successful save</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-12">
									<select name="attr_savestat" accept="Save">
										<option value="STR">STR</option>
										<option value="DEX">DEX</option>
										<option value="CON">CON</option>
										<option value="INT">INT</option>
										<option value="WIS">WIS</option>
										<option value="CHA">CHA</option>
									</select>
								</div>
								<div className="sheet-col-1-6" title="Pick the className that the save DC will be created from or set your own DC by selecting custom here and then entering the DC in the next field">
									<select name="attr_spellsavedc">
										<option value="0">Choose...</option>
										<option value="@{arcane_trickster_spell_dc}">Arcane Trickster DC</option>
										<option value="@{bard_spell_dc}">Bard DC</option>
										<option value="@{cleric_spell_dc}">Cleric DC</option>
										<option value="@{druid_spell_dc}">Druid DC</option>
										<option value="@{eldritch_knight_spell_dc}">Eldritch Knight DC</option>
										<option value="@{paladin_spell_dc}">Paladin DC</option>
										<option value="@{ranger_spell_dc}">Ranger DC</option>
										<option value="@{sorcerer_spell_dc}">Sorcerer DC</option>
										<option value="@{warlock_spell_dc}">Warlock DC</option>
										<option value="@{wizard_spell_dc}">Wizard DC</option>
										<option value="0">Custom DC</option>
									</select>
								</div>
								<div className="sheet-col-1-12">
									<input type="number" name="attr_customsavedc" value="0" min="0" step="1" title="Unless you have selected Custom in the previous field this should always be 0"/>
								</div>
								<div className="sheet-col-1-2">
									<input type="text" className="sheet-center" name="attr_savesuccess" accept="Save Success"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-heal">
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-vert-bottom sheet-center sheet-small-label">Heal amount</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-offset-1-12 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_spellhealamount" value="0" accept="Healing"/>
								</div>
								<div className="sheet-col-1-6 sheet-center">
									<select name="attr_healstatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-damage">
							<div className="sheet-row">
								<div className="sheet-offset-1-12 sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Can Crit?</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Dice</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Other Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Type</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className=" sheet-offset-1-12 sheet-col-1-12 sheet-checkbox-row">
									<input type="checkbox" name="attr_spellcancrit" value="{{spellcancrit=1}} {{spellcritdamage=Additional [[@{damage}]] damage}}" checked="checked" />
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damage" value="0" accept="Damage"/>
								</div>
								<div className="sheet-col-1-6">
									<select name="attr_damagestatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="number" className="sheet-center" name="attr_damagemiscbonus" value="0" step="1"/>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damagetype"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-effects">
							<div className="sheet-row">
								<div className="sheet-col-5-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Effects</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1 sheet-small-label sheet-center">
									<textarea name="attr_spelleffect" className="sheet-medium-textarea">None</textarea>
								</div>
							</div>
						</div>
					</div>
					{/* END spell row */}
				</fieldset>
			</div>
			{/* END spell page */}
			{/* BEGIN new spell page */}
			<div className="sheet-spell-page9">
				<div className="sheet-row sheet-spell-header">
					<div className="sheet-col-1 sheet-vert-bottom sheet-center sheet-small-label">Level 9</div>
				</div>
				<fieldset className="repeating_spellbooklevel9">
					{/* BEGIN spell row */}
					<div className="sheet-margin-bottom sheet-padr sheet-padl compendium-drop-target">
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Spell Level</div>
							<div className="sheet-col-1-3 sheet-vert-bottom sheet-center sheet-small-label">Spell name</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">School</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast time</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label" title="Concentration">Conc?</div>
							<div className="sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Ritual?</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Prepared?</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-12 sheet-vert-middle sheet-center">Level 9
								<input type="hidden" name="attr_spellbaselevel" value="9"/>
								<input type="hidden" name="attr_spellfriendlylevel" value="Level 9"/>
							</div>
							<div className="sheet-col-1-3 sheet-vert-middle">
								<input type="text" className=" sheet-center" name="attr_spellname" accept="Name"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<select name="attr_spellschool" accept="School">
									<option value="" selected="selected">n/a</option>
									<option value="Abjuration">Abjuration</option>
									<option value="Conjuration">Conjuration</option>
									<option value="Divination">Divination</option>
									<option value="Enchantment">Enchantment</option>
									<option value="Evocation">Evocation</option>
									<option value="Illusion">Illusion</option>
									<option value="Necromancy">Necromancy</option>
									<option value="Transmutation">Transmutation</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcasttime" accept="Casting Time"/>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellconcentration" accept="Concentration">
									<option value="" selected="selected">No</option>
									<option value="(Concentration)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-12 sheet-checkbox-row">
								<select name="attr_spellritual" accept="Ritual">
									<option value="" selected="selected">No</option>
									<option value="(Ritual)">Yes</option>
								</select>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle" title="Always prepared means the spell is either a cantrip or one that was provided to you via a method which indicated it would never count against your prepared/known limits.">
								<select name="attr_spellisprepared">
									<option value="1">Yes</option>
									<option value="0" selected="selected">NO</option>
									<option value="0.0001">Always</option>
								</select>
							</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Gained from</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Target/Area of Effect</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Range</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Duration</div>
							<div className="sheet-col-1-8 sheet-vert-bottom sheet-center sheet-small-label">Components</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Info</div>
							<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Cast Spell</div>
						</div>
						<div className="sheet-row">
							<div className="sheet-col-1-8 sheet-vert-middle" title="Use this field to indicate where you learned or have access to this spell from.  Useful to know if multiclassNameing or if you gain access to spells your className would not normally have thanks to subclassName bonuses">
								<select name="attr_spellgainedfrom">
									<option value="Not Set">Not Set</option>
									<option value="Arcane Trickster">Arcane Trickster</option>
									<option value="Bard">Bard</option>
									<option value="Cleric">Cleric</option>
									<option value="Druid">Druid</option>
									<option value="Eldritch Knight">Eldritch Knight</option>
									<option value="Paladin">Paladin</option>
									<option value="Ranger">Ranger</option>
									<option value="Sorcerer">Sorcerer</option>
									<option value="Warlock">Warlock</option>
									<option value="Wizard">Wizard</option>
									<option value="Other Source">Other</option>
								</select>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spelltarget" accept="Target"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellrange" accept="Range"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellduration" accept="Duration"/>
							</div>
							<div className="sheet-col-1-8 sheet-vert-middle">
								<input type="text" className="sheet-center" name="attr_spellcomponents" accept="Components"/>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellInfo" value="&{template:5eDefault} {{spell=1}} {{spellshowinfoblock=1}} {{spellshowdesc=1}} {{spellshowhigherlvl=1}} {{character_name=@{character_name}}} {{emote=looks at the instructions for a spell}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}}  {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  {{spelldescription=@{spelldescription}}} {{spellhigherlevel=@{spellhighersloteffect}}} @{classNameactionspellinfo}">Spell Info</button>
							</div>
							<div className="sheet-col-1-6 sheet-vert-middle sheet-center">
								<button type="roll" className="sheet-roll" name="roll_SpellCast" value="&{template:5eDefault} {{spell=1}} {{title=@{spellname}}} {{subheader=@{character_name}}} {{subheaderright=@{spellschool} @{spellfriendlylevel}}} {{subheader2=@{spellconcentration} @{spellritual}}} @{spellcastmacrooptions} {{spellcasttime=@{spellcasttime}}} {{spellduration=@{spellduration}}} {{spelltarget=@{spelltarget}}} {{spellrange=@{spellrange}}} {{spellgainedfrom=@{spellgainedfrom}}} {{spellcomponents=@{spellcomponents}}}  @{classNameactionspellcast}">Cast Spell</button>
							</div>
						</div>
						<div className="sheet-row sheet-padb sheet-spell-macro-output-options">
							<div className="sheet-col-1-8 sheet-vert-middle sheet-small-label sheet-padl">Spellcast macro display options</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Info block
								<br/>
								<input type="checkbox" name="attr_spellshowinfoblock" value="{{spellshowinfoblock=1}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Description
								<br/>
								<input type="checkbox" name="attr_spellshowdesc" value="{{spellshowdesc=1}} {{spelldescription=@{spelldescription}}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">At higher levels
								<br/>
								<input type="checkbox" name="attr_spellshowhigherlvl" value="{{spellshowhigherlvl=1}} {{spellhigherlevel=@{spellhighersloteffect}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattack" value="{{spellshowattack=1}} {{spellattack=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">2nd Attack roll
								<br/>
								<input type="checkbox" name="attr_spellshowattackadv" value="{{spellshowattackadv=1}} {{spellattackadv=[[1d20 + @{attackstat} + @{PB} + (@{global_spell_attack_bonus})]]}}" />
							</div>
							<div className="sheet-col-1-8 sheet-center sheet-small-label">Saving throw
								<br/>
								<input type="checkbox" name="attr_spellshowsavethrow" value="{{spellshowsavethrow=1}} {{spellsavedc=[[@{spellsavedc} + @{customsavedc}]]}} {{spellsavestat=@{savestat}}} {{spellsavesuccess=@{savesuccess}}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Healing
								<br/>
								<input type="checkbox" name="attr_spellshowhealing" value="{{spellshowhealing=1}} {{spellhealing=[[@{spellhealamount} + @{healstatbonus}]]}}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Damage
								<br/>
								<input type="checkbox" name="attr_spellshowdamage" value="{{spellshowdamage=1}} {{spelldamage=[[@{damage} + @{damagestatbonus} + @{damagemiscbonus} + (@{global_spell_damage_bonus}) + 0d0]] @{damagetype}}} @{spellcancrit}" />
							</div>
							<div className="sheet-col-1-12 sheet-center sheet-small-label">Effects
								<br/>
								<input type="checkbox" name="attr_spellshoweffects" value="{{spellshoweffects=1}} {{spelleffect=@{spelleffect}}}" />
							</div>
							<input type="hidden" name="attr_spellcastmacrooptions" value="@{spellshowinfoblock} @{spellshowdesc} @{spellshowhigherlvl} @{spellshowattack} @{spellshowattackadv} @{spellshowsavethrow} @{spellshowhealing} @{spellshowdamage} @{spellshoweffects}" />
						</div>
						<span className="sheet-spacer"></span>
						<span className="sheet-small-label">Show :</span>
						<input type="checkbox" name="attr_spelltypeadvanced" className="sheet-spelltypetab sheet-spelltypeadvanced" value="1" /><span className="sheet-spelltypetab sheet-spelltypeadvanced">Description</span> |
						<input type="checkbox" name="attr_spelltypeattack" className="sheet-spelltypetab sheet-spelltypeattack" value="1" /><span className="sheet-spelltypetab sheet-spelltypeattack">Attack</span>
						<input type="checkbox" name="attr_spelltypesave" className="sheet-spelltypetab sheet-spelltypesave" value="1" /><span className="sheet-spelltypetab sheet-spelltypesave">Save</span>
						<input type="checkbox" name="attr_spelltypeheal" className="sheet-spelltypetab sheet-spelltypeheal" value="1" /><span className="sheet-spelltypetab sheet-spelltypeheal">Healing</span> |
						<input type="checkbox" name="attr_spelltypdamage" className="sheet-spelltypetab sheet-spelltypedamage" value="1" /><span className="sheet-spelltypetab sheet-spelltypedamage">Damage</span>
						<input type="checkbox" name="attr_spelltypeeffects" className="sheet-spelltypetab sheet-spelltypeeffects" value="1" /><span className="sheet-spelltypetab sheet-spelltypeeffects">Effects</span>
						<span className="sheet-spacer"></span>
						<div className="sheet-spell-type-advanced">
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Spell Description/Flavour</div>
								<div className="sheet-col-1-2 sheet-vert-bottom sheet-center sheet-small-label">Higher Spell Slot Effect</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea className="sheet-medium-textarea" name="attr_spelldescription" accept="Content"></textarea>
								</div>
								<div className="sheet-col-1-2 sheet-small-label sheet-center">
									<textarea name="attr_spellhighersloteffect" className="sheet-medium-textarea"></textarea>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-attack">
							<div className="sheet-row">
								<div className="sheet-col-1-6 sheet-offset-2-3 sheet-vert-bottom sheet-center sheet-small-label">Attack Stat</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-2-3">
									<p className="sheet-small-note sheet-margin-top">Select the attack stat for the attack. This is normally your spellcasting stat from the className you gained the spell from.</p>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<select name="attr_attackstat">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR</option>
										<option value="@{dexterity_mod}">DEX</option>
										<option value="@{constitution_mod}">CON</option>
										<option value="@{intelligence_mod}">INT</option>
										<option value="@{wisdom_mod}">WIS</option>
										<option value="@{charisma_mod}">CHA</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-save">
							<div className="sheet-row">
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Saving Stat</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">Save DC</div>
								<div className="sheet-col-1-12 sheet-center sheet-small-label">Custom DC</div>
								<div className="sheet-col-1-2 sheet-center sheet-small-label">On a successful save</div>
								<div className="sheet-col-1-6 sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-12">
									<select name="attr_savestat" accept="Save">
										<option value="STR">STR</option>
										<option value="DEX">DEX</option>
										<option value="CON">CON</option>
										<option value="INT">INT</option>
										<option value="WIS">WIS</option>
										<option value="CHA">CHA</option>
									</select>
								</div>
								<div className="sheet-col-1-6" title="Pick the className that the save DC will be created from or set your own DC by selecting custom here and then entering the DC in the next field">
									<select name="attr_spellsavedc">
										<option value="0">Choose...</option>
										<option value="@{arcane_trickster_spell_dc}">Arcane Trickster DC</option>
										<option value="@{bard_spell_dc}">Bard DC</option>
										<option value="@{cleric_spell_dc}">Cleric DC</option>
										<option value="@{druid_spell_dc}">Druid DC</option>
										<option value="@{eldritch_knight_spell_dc}">Eldritch Knight DC</option>
										<option value="@{paladin_spell_dc}">Paladin DC</option>
										<option value="@{ranger_spell_dc}">Ranger DC</option>
										<option value="@{sorcerer_spell_dc}">Sorcerer DC</option>
										<option value="@{warlock_spell_dc}">Warlock DC</option>
										<option value="@{wizard_spell_dc}">Wizard DC</option>
										<option value="0">Custom DC</option>
									</select>
								</div>
								<div className="sheet-col-1-12">
									<input type="number" name="attr_customsavedc" value="0" min="0" step="1" title="Unless you have selected Custom in the previous field this should always be 0"/>
								</div>
								<div className="sheet-col-1-2">
									<input type="text" className="sheet-center" name="attr_savesuccess" accept="Save Success"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-heal">
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-vert-bottom sheet-center sheet-small-label">Heal amount</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-offset-1-12 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1-3 sheet-offset-1-4 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_spellhealamount" value="0" accept="Healing"/>
								</div>
								<div className="sheet-col-1-6 sheet-center">
									<select name="attr_healstatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-damage">
							<div className="sheet-row">
								<div className="sheet-offset-1-12 sheet-col-1-12 sheet-vert-bottom sheet-center sheet-small-label">Can Crit?</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Dice</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Stat Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Other Bonus</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">Damage Type</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className=" sheet-offset-1-12 sheet-col-1-12 sheet-checkbox-row">
									<input type="checkbox" name="attr_spellcancrit" value="{{spellcancrit=1}} {{spellcritdamage=Additional [[@{damage}]] damage}}" checked="checked" />
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damage" value="0" accept="Damage"/>
								</div>
								<div className="sheet-col-1-6">
									<select name="attr_damagestatbonus">
										<option value="0">None</option>
										<option value="@{strength_mod}">STR mod</option>
										<option value="@{dexterity_mod}">DEX mod</option>
										<option value="@{constitution_mod}">CON mod</option>
										<option value="@{intelligence_mod}">INT mod</option>
										<option value="@{wisdom_mod}">WIS mod</option>
										<option value="@{charisma_mod}">CHA mod</option>
									</select>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="number" className="sheet-center" name="attr_damagemiscbonus" value="0" step="1"/>
								</div>
								<div className="sheet-col-1-6 sheet-small-label sheet-center">
									<input type="text" className="sheet-center" name="attr_damagetype"/>
								</div>
							</div>
						</div>
						<div className="sheet-spell-type-effects">
							<div className="sheet-row">
								<div className="sheet-col-5-6 sheet-vert-bottom sheet-center sheet-small-label">Spell Effects</div>
								<div className="sheet-col-1-6 sheet-vert-bottom sheet-center sheet-small-label">&nbsp;</div>
							</div>
							<div className="sheet-row">
								<div className="sheet-col-1 sheet-small-label sheet-center">
									<textarea name="attr_spelleffect" className="sheet-medium-textarea">None</textarea>
								</div>
							</div>
						</div>
					</div>
					{/* END spell row */}
				</fieldset>
			</div>
			{/* END spell page */}
			{/* END AUTO GENERATED SPELL PAGES */}
		</div>
				<div className="sheet-inventory-row1">
					<div className="sheet-row sheet-grey-row">
						<div className="sheet-col-1-15 sheet-vert-middle sheet-inventory-row-number">1</div>
						<div className="sheet-col-1-15 sheet-vert-middle sheet-checkbox-row">
							<input type="checkbox" name="attr_inventorycarried1" value="@{inventoryweight1}" checked="checked" />
						</div>
						<div className="sheet-col-1-15">
							<input type="number" name="attr_inventoryqty1" value="1" min="0" step="1"/>
						</div>
						<div className="sheet-col-4-15">
							<input type="text" name="attr_inventoryname1"/>
						</div>
						<div className="sheet-col-2-15">
							<input type="number" name="attr_inventoryweight1" value="0" step="0.01"/>
						</div>
						<div className="sheet-col-5-15">
							<input type="text" name="attr_inventorydescription1"/>
						</div>
						<div className="sheet-col-1-15 sheet-vert-middle sheet-checkbox-row">
							<input type="checkbox" name="attr_inventoryattuned1" value="@{inventoryattuned1}" />
						</div>
					</div>
				</div>
				{/* END inventory row */}
			
				</div></div></div></div></div>
		</>
)
}
export { CharacterSheet }