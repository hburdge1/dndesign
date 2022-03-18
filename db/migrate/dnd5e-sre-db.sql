create table if not exists dnd5_races (
	race_id int not null AUTO_INCREMENT,
	name text not null,
	speed int not null,
	alignment text not null,
	age text not null,
	size text not null,
	languages text not null,
	primary key (race_id)
);
INSERT INTO dnd5_races (name, speed, alignment, age, size, languages)
VALUES ("Dwarf", "30", "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.", "Dwarves mature at the same rate as humans, but they're considered young until they reach the age of 50. On average, they live about 350 years.", "Medium", "You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.");
INSERT INTO dnd5_races (name, speed, alignment, age, size, languages)
VALUES ("Elf", "30", "Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others' freedom as well as their own, and they are more often good than not. The drow are an exception; their exile has made them vicious and dangerous. Drow are more often evil than not.", "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.", "Medium", "You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.");
INSERT INTO dnd5_races (name, speed, alignment, age, size, languages)
VALUES ("Halfling", "25", "Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the support of their community and the comfort of their old ways.", "A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.", "Small", "You can speak, read, and write Common and Halfling. The Halfling language isn't secret, but halflings are loath to share it with others. They write very little, so they don't have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling.");
INSERT INTO dnd5_races (name, speed, alignment, age, size, languages)
VALUES ("Human", "30", "Humans tend toward no particular alignment. The best and the worst are found among them.", "Humans reach adulthood in their late teens and live less than a century.", "Medium", "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.");
INSERT INTO dnd5_races (name, speed, alignment, age, size, languages)
VALUES ("Dragonborn", "30", " Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war between good and evil. Most dragonborn are good, but those who side with evil can be terrible villains.", "Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.", "Medium", "You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.");
INSERT INTO dnd5_races (name, speed, alignment, age, size, languages)
VALUES ("Gnome", "25", "Gnomes are most often good. Those who tend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who tend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers. Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.", " Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.", "Small", "You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.");
INSERT INTO dnd5_races (name, speed, alignment, age, size, languages)
VALUES ("Half-Elf", "30", "Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules, resent others' demands, and sometimes prove unreliable, or at least unpredictable.", "Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.", "Medium", "You can speak, read, and write Common, Elvish, and one extra language of your choice.");
INSERT INTO dnd5_races (name, speed, alignment, age, size, languages)
VALUES ("Half-Orc", "30", " Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward good. Half-orcs raised among orcs and willing to live out their lives among them are usually evil.", "Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.", "Medium", "You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.");
INSERT INTO dnd5_races (name, speed, alignment, age, size, languages)
VALUES ("Tiefling", "30", "Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not, an independent nature inclines many tieflings toward a chaotic alignment.", "Tieflings mature at the same rate as humans but live a few years longer.", "Medium", "You can speak, read, and write Common and Infernal.");

create table if not exists dnd5_proficiencies (
	proficiency_id int not null AUTO_INCREMENT,
	proficiency_type text not null,
	proficiency_name text not null,
	primary key (proficiency_id)
);
INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Light armor");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Medium armor");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Heavy armor");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "All armor");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Padded");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Leather");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Studded Leather");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Hide");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Chain Shirt");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Scale Mail");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Breastplate");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Half Plate");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Ring Mail");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Chain Mail");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Splint");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Plate");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Armor" , "Shields");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Simple weapons");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Martial weapons");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Clubs");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Daggers");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Greatclubs");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Handaxes");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Javelins");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Light hammers");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Maces");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Quarterstaffs");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Sickles");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Spears");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Crossbows, light");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Darts");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Shortbows");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Slings");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Battleaxes");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Flails");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Glaives");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Greataxes");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Greatswords");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Halberds");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Lances");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Longswords");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Mauls");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Morningstars");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Pikes");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Rapiers");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Scimitars");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Shortswords");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Tridents");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "War picks");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Warhammers");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Whips");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Blowguns");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Crossbows, hand");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Crossbows, heavy");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Longbows");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Weapons" , "Nets");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Alchemist's supplies");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Brewer's supplies");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Calligrapher's supplies");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Carpenter's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Cartographer's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Cobbler's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Cook's utensils");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Glassblower's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Jeweler's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Leatherworker's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Mason's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Painter's supplies");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Potter's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Smith's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Tinker's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Weaver's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Woodcarver's tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Disguise kit");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Artisan's Tools" , "Forgery kit");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Gaming Sets" , "Dice Set");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Gaming Sets" , "Playing card set");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Musical Instruments" , "Bagpipes");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Musical Instruments" , "Drum");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Musical Instruments" , "Dulcimer");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Musical Instruments" , "Flute");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Musical Instruments" , "Lute");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Musical Instruments" , "Lyre");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Musical Instruments" , "Horn");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Musical Instruments" , "Pan flute");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Musical Instruments" , "Shawm");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Musical Instruments" , "Viol");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Other" , "Herbalism Kit");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Other" , "Navigator's Tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Other" , "Poisoner's Kit");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Other" , "Thieves' Tools");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Vehicles" , "Land Vehicles");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Vehicles" , "Water Vehicles");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Saving Throws" , "Saving Throw: STR");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Saving Throws" , "Saving Throw: DEX");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Saving Throws" , "Saving Throw: CON");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Saving Throws" , "Saving Throw: INT");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Saving Throws" , "Saving Throw: WIS");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Saving Throws" , "Saving Throw: CHA");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Acrobatics");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Animal Handling");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Arcana");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Athletics");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Deception");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: History");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Insight");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Intimidation");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Investigation");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Medicine");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Nature");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Perception");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Performance");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Persuasion");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Religion");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Sleight of Hand");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Stealth");

INSERT INTO dnd5_proficiencies (proficiency_type, proficiency_name)
VALUES ("Skills" , "Skill: Survival");

create table if not exists dnd5_proficiency_choices (
    id int not null AUTO_INCREMENT,
	proficiency_choices_id int not null,
	proficiency_id int not null,
	primary key (id),
	foreign key (proficiency_id) references dnd5_proficiencies(proficiency_id)
);

create table if not exists classes_proficiency_choices (
	id int not null AUTO_INCREMENT,
	class_id int not null,
	proficiency_choices_id int not null,
	num_choices int not null,
	primary key (id),
	foreign key (class_id) references dnd5_classes(class_id)
);

create table if not exists classes_proficiencies (
	id int not null AUTO_INCREMENT,
	class_id int not null,
	proficiency_id int not null,
	primary key (id),
	foreign key (class_id) references dnd5_classes(class_id),
	foreign key (proficiency_id) references dnd5_proficiencies(proficiency_id)
);

create table if not exists races_proficiency_choices (
	id int not null AUTO_INCREMENT,
	race_id int not null,
	proficiency_choices_id int not null,
	primary key (id),
	foreign key (race_id) references dnd5_races(race_id)
);

-- Linking the proficiencies and proficiency choice groups!
INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (1, 1, 2);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (1, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Animal Handling" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (1, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Athletics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (1, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Intimidation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (1, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Nature" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (1, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Perception" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (1, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Survival" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (1, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Light armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (1, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Medium armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (1, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Shields" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (1, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Simple weapons" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (1, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Martial weapons" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (2, 2, 3);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Acrobatics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Animal Handling" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Arcana" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Athletics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Deception" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: History" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Insight" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Intimidation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Investigation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Medicine" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Nature" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Perception" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Performance" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Persuasion" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Religion" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Sleight of Hand" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Stealth" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Survival" limit 1
    ));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (2, 2, 3);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Bagpipes" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Drum" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Dulcimer" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Flute" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Lute" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Lyre" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Horn" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Pan flute" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Shawm" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (2, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Viol" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (2, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Light armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (2, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Simple weapons" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (2, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Longswords" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (2, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Rapiers" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (2, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Shortswords" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (2, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Crossbows, hand" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (3, 3, 2);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (3, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: History" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (3, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Insight" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (3, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Medicine" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (3, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Persuasion" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (3, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Religion" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (3, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Light armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (3, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Medium armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (3, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Shields" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (3, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Simple weapons" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (4, 4, 2);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (4, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Animal Handling" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (4, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Arcana" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (4, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Insight" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (4, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Medicine" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (4, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Nature" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (4, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Perception" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (4, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Religion" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (4, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Survival" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Light armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Medium armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Shields" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Clubs" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Daggers" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Javelins" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Maces" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Quarterstaffs" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Sickles" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Spears" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Darts" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Slings" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Scimitars" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (4, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Herbalism Kit" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (5, 5, 2);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (5, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Acrobatics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (5, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Animal Handling" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (5, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Athletics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (5, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: History" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (5, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Insight" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (5, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Intimidation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (5, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Perception" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (5, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Survival" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (5, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="All armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (5, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Shields" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (5, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Simple weapons" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (5, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Martial weapons" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (6, 6, 1);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Alchemist's supplies" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Brewer's supplies" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Calligrapher's supplies" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Carpenter's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Cartographer's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Cobbler's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Cook's utensils" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Glassblower's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Jeweler's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Leatherworker's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Mason's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Painter's supplies" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Potter's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Smith's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Tinker's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Weaver's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Woodcarver's tools" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Disguise kit" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Forgery kit" limit 1
    ));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (6, 6, 1);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Bagpipes" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Drum" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Dulcimer" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Flute" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Lute" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Lyre" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Horn" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Pan flute" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Shawm" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Viol" limit 1
    ));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (6, 6, 2);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Acrobatics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Athletics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: History" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Insight" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Religion" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (6, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Stealth" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (6, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Simple weapons" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (6, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Shortswords" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (7, 7, 2);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (7, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Athletics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (7, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Insight" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (7, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Intimidation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (7, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Medicine" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (7, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Persuasion" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (7, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Religion" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (7, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="All armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (7, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Shields" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (7, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Simple weapons" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (7, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Martial weapons" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (8, 8, 3);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (8, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Animal Handling" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (8, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Athletics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (8, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Insight" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (8, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Investigation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (8, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Nature" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (8, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Perception" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (8, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Stealth" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (8, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Survival" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (8, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Light armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (8, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Medium armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (8, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Shields" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (8, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Simple weapons" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (8, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Martial weapons" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (9, 9, 4);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Acrobatics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Athletics" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Deception" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Insight" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Intimidation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Investigation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Perception" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Performance" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Persuasion" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Sleight of Hand" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (9, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Stealth" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (9, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Light armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (9, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Simple weapons" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (9, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Longswords" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (9, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Rapiers" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (9, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Shortswords" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (9, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Crossbows, hand" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (9, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Thieves' Tools" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (10, 10, 2);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (10, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Arcana" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (10, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Deception" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (10, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Insight" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (10, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Intimidation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (10, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Persuasion" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (10, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Religion" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (10, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Daggers" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (10, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Quarterstaffs" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (10, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Darts" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (10, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Slings" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (11, 11, 2);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (11, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Arcana" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (11, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Deception" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (11, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: History" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (11, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Intimidation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (11, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Investigation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (11, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Nature" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (11, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Religion" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (11, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Light armor" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (11, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Simple weapons" LIMIT 1
));

INSERT INTO classes_proficiency_choices (class_id, proficiency_choices_id, num_choices)
VALUES (12, 12, 2);

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (12, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Arcana" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (12, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: History" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (12, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Insight" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (12, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Investigation" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (12, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Medicine" limit 1
    ));

    INSERT INTO dnd5_proficiency_choices (proficiency_choices_id, proficiency_id)
    VALUES (12, (
        select proficiency_id from dnd5_proficiencies
        where proficiency_name="Skill: Religion" limit 1
    ));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (12, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Daggers" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (12, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Quarterstaffs" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (12, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Darts" LIMIT 1
));

INSERT INTO classes_proficiencies (class_id, proficiency_id)
VALUES (12, (
    SELECT proficiency_id from dnd5_proficiencies
    WHERE proficiency_name="Slings" LIMIT 1
));
