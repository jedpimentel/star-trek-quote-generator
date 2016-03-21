/* IMPORTANT:
for some reason the images aren't changing, they used to change depending on who was being quoted, I will look into this after finishing the other FCC front-end ziplines 

maybe this might help https://4loc.wordpress.com/2009/04/28/documentready-vs-windowload/
*/

window.onload = nextButtonClick;

var settings = {
	usePhotobucketImages 		: false, // use for hosting app in codepen, or other places without image hosting
	loadCharacterImagesAsNeeded	: true, // setting to fase will increase load time
}

//run this when 'NEXT' button is clicked
function nextButtonClick() {
	newQuote();
	portraitUpdate()
	return;
}

//encode string into twitter URL format, modified from: http://meyerweb.com/eric/tools/dencoder/
function encode(unencoded) {
	return unencoded.replace(/'/g,"%27").replace(/"/g,"%22");
}

//quote object
var currentQuote;
var canTweet; //Boolean flag,  can only tweet if id:'tweet-text' is 140 chars or less
function newQuote() {
	//return random quote object
	currentQuote = quote[Math.floor(Math.random() * quote.length)];
	document.getElementById('quote-text').innerHTML = currentQuote.line;
	document.getElementById('quote-person').innerHTML = "- " + currentQuote.character;
	document.getElementById('quote-episode').innerHTML = "EPISODE: " + currentQuote.episode;
	
	//set twitter text, check if 140 characters or less
	var twitterString = currentQuote.line + " - " + currentQuote.character;
	if(twitterString.length <= 140) {
		canTweet = true;
		twitterString = encode(twitterString);
		document.getElementById('tweet-this').innerHTML = "TWEET";
	} else{
		canTweet = false
		document.getElementById('tweet-this').innerHTML = "more than 140 characters, sorry";
		twitterString = encode("I insist on tweeting over 140 characters") + "&hashtags=YOLO";
	}
	document.getElementById('tweet-this').setAttribute('href', 'https://twitter.com/intent/tweet?text=' + twitterString);
	//console.log("Can tweet = " + canTweet + " (" +document.getElementById('tweet-text').innerHTML.length + " chars)" );return;
}


// urls will be replaced with the actual image objects
var portraits = (settings.usePhotobucketImages)? {
	'James T. Kirk'		: "http://i213.photobucket.com/albums/cc69/ramboman88/kirk.jpg",
	'Leonard McCoy'		: "http://i213.photobucket.com/albums/cc69/ramboman88/mccoy.jpg"	,
	'Vina'				: "http://i213.photobucket.com/albums/cc69/ramboman88/vina.jpg",
	'Spock'				: "http://i213.photobucket.com/albums/cc69/ramboman88/spock.jpg",
	'Trelane'			: "http://i213.photobucket.com/albums/cc69/ramboman88/trelane.jpg",
	'Scotty'			: "http://i213.photobucket.com/albums/cc69/ramboman88/scotty.jpg",
	'Sarek'				: "http://i213.photobucket.com/albums/cc69/ramboman88/sarek.jpg",
	'Richard Daystrom'	: "http://i213.photobucket.com/albums/cc69/ramboman88/daystrom.jpg",
	'Surak'				: "http://i213.photobucket.com/albums/cc69/ramboman88/Surak.jpg",
	'Colonel Green'		: "http://i213.photobucket.com/albums/cc69/ramboman88/green.jpg",
	'Abraham Lincoln'	: "http://i213.photobucket.com/albums/cc69/ramboman88/lincoln.jpg",
} : {
	'James T. Kirk'		: "images/kirk.jpg",
	'Leonard McCoy'		: "images/mccoy.jpg"	,
	'Vina'				: "images/vina.jpg",
	'Spock'				: "images/spock.jpg",
	'Trelane'			: "images/trelane.jpg",
	'Scotty'			: "images/scotty.jpg",
	'Sarek'				: "images/sarek.jpg",
	'Richard Daystrom'	: "images/daystrom.jpg",
	'Surak'				: "images/Surak.jpg",
	'Colonel Green'		: "images/green.jpg",
	'Abraham Lincoln'	: "images/lincoln.jpg",
}

if (settings.loadCharacterImagesAsNeeded == false) {
	for (var key in portraits) {
		var characterImage = new Image();
		characterImage.src = portraits[key];
		portraits[key] = characterImage;
	}
}

function portraitUpdate() {
	var character = currentQuote.character;
	
	if (typeof(portraits[character]) !== "object") {
		// load images as needed
		var characterImage = new Image();
		characterImage.src = portraits[character];
		portraits[character] = characterImage;
		
	}
	var oldImage = document.getElementById('quote-image').children[0];
	var newImage = portraits[character]
	document.getElementById('quote-image').replaceChild(newImage, oldImage)
	return;
	
}


function randQuote() {
	return quote[Math.floor(Math.random() * quote.length)];
}

function test() {
	document.getElementById('target').innerHTML = "ZAP!";
}





//array of quotes, with .episode .character and .line
var quote = [	
	{ episode: 'The Naked Time', character: 'James T. Kirk', line: 'Love... you\'re better off without it, and I\'m better off without mine. This vessel...I give... she takes. She won\'t permit me my life. I\'ve got to live hers.' },
	{ episode: 'The Enemy Within', character: 'Leonard McCoy', line: 'We all have our darker side. We need it; it\'s half of what we are. It\'s not really ugly, it\'s human.' },
	{ episode: 'What Are Little Girls Made Of?', character: 'James T. Kirk', line: 'We humans are full of unpredictable emotions that logic cannot solve.' },
	{ episode: 'Dagger of the Mind', character: 'James T. Kirk', line: 'One of the advantages of being a captain, Doctor, is being able to ask for advice without necessarily having to take it.' },
	{ episode: 'The Menagerie, Parts 1-2', character: 'Leonard McCoy', line: 'Blast medicine anyway. We\'ve learned to tie into every human organ in the body except one -- the brain. The brain is what life is all about. That man can think any thought that we can, and love, hope, dream as much as we can, but he can\'t reach out, and no one can reach in.' },
	{ episode: 'The Menagerie, Parts 1-2', character: 'Vina', line: 'When dreams become more important than reality, you give up travel, building, creating; you even forget how to repair the machines left behind by your ancestors. You just sit living and reliving other lives left behind in the thought records.' },
	{ episode: 'Shore Leave', character: 'Spock', line: 'After what this ship has been through in the last three months, there is not a crewman aboard who is not in need of rest. Myself excepted, of course.' },
	{ episode: 'Shore Leave', character: 'James T. Kirk', line: 'I do [believe you]! I\'ve met some interesting characters myself!' },
	{ episode: 'The Squire of Gothos', character: 'Trelane', line: 'Oh, how absolutely typical of your species! You don\'t understand something so you become fearful.' },
	{ episode: 'The Squire of Gothos', character: 'James T. Kirk', line: 'Our missions are peaceful ? not for conquest. When we do battle, it is only because we have no choice.' },
	{ episode: 'The Return of the Archons', character: 'James T. Kirk', line: 'Without freedom of choice there is no creativity.' },
	{ episode: 'The Return of the Archons', character: 'James T. Kirk', line: 'It\'s time you learned that freedom is never a gift. It has to be earned.' },
	{ episode: 'Space Seed', character: 'Spock', line: 'Insufficient facts always invite danger.' },
	{ episode: 'Space Seed', character: 'Spock', line: 'Superior ability breeds superior ambition.' },
	{ episode: 'A Taste of Armageddon', character: 'James T. Kirk', line: 'Death. Destruction. Disease. Horror. That\'s what war is all about. That\'s what makes it a thing to be avoided.' },
	{ episode: 'A Taste of Armageddon', character: 'James T. Kirk', line: 'Sometimes a feeling is all we humans have to go on.' },
	{ episode: 'A Taste of Armageddon', character: 'James T. Kirk', line: '[War] is instinctive. But the instinct can be fought. We\'re human beings with the blood of a million savage years on our hands! But we can stop it. We can admit that we\'re killers ... but we\'re not going to kill today. That\'s all it takes! Knowing that we\'re not going to kill - today!' },
	{ episode: 'This Side of Paradise', character: 'James T. Kirk', line: 'Another dream that failed. There\'s nothing sadder.' },
	{ episode: 'The Devil in the Dark', character: 'James T. Kirk', line: 'Either one of us, by himself, is expendable. Both of us are not.' },
	{ episode: 'Errand of Mercy', character: 'Spock', line: 'It is curious how often you humans manage to obtain that which you do not want.' },
	{ episode: 'The Alternative Factor', character: 'Spock', line: 'Madness has no purpose. Or reason. But it may have a goal.' },
	{ episode: 'The City on the Edge of Forever', character: 'Spock', line: 'I am endeavoring, Madam, to construct a mnemonic memory circuit using stone knives and bear skins.' },
	{ episode: 'The City on the Edge of Forever', character: 'James T. Kirk', line: 'Let\'s get the hell out of here.' },
	{ episode: 'Operation: Annihilate!', character: 'Spock', line: 'The City on the Edge of Forever' },
	{ episode: 'Who Mourns for Adonais?', character: 'Spock', line: 'Insults are effective only where emotion is present.' },
	{ episode: 'Who Mourns for Adonais?', character: 'Scotty', line: 'Without energy you can\'t do anything.' },
	{ episode: 'The Changeling', character: 'Leonard McCoy', line: 'He\'s dead, Jim.' },
	{ episode: 'Mirror, Mirror', character: 'James T. Kirk', line: 'Conquest is easy. Control is not.' },
	{ episode: 'The Doomsday Machine', character: 'Leonard McCoy', line: 'I\'m a doctor, not a mechanic.' },
	{ episode: 'Catspaw', character: 'James T. Kirk', line: 'You can\'t think a man to death.' },
	{ episode: 'I, Mudd', character: 'Spock', line: 'Logic is a little tweeting bird, chirping in a meadow. Logic is a wreath of pretty flowers which smell bad.' },
	{ episode: 'Journey to Babel', character: 'Sarek', line: 'One does not thank logic.' },
	{ episode: 'Friday\'s Child', character: 'Spock', line: 'Virtue is a relative term.' },
	{ episode: 'Wolf in the Fold', character: 'Spock', line: 'In the strict scientific sense, Doctor, we all feed on death, even vegetarians.' },
	{ episode: 'Wolf in the Fold', character: 'Spock', line: 'Computer. This is a Class-A compulsory directive. Compute, to the last digit, the value of pi.' },
	{ episode: 'The Trouble With Tribbles', character: 'James T. Kirk', line: 'Too much of anything, Lieutenant, even love, isn\'t necessarily a good thing.' },
	{ episode: 'The Immunity Syndrome', character: 'Spock', line: 'Brace yourself. The area of penetration will no doubt be sensitive.' },
	{ episode: 'A Private Little War', character: 'James T. Kirk', line: 'War isn\'t a good life, but it\'s life.' },
	{ episode: 'Return to Tomorrow', character: 'James T. Kirk', line: 'They used to say that if Man was meant to fly, he\'d have wings. But he did fly. He discovered he had to.' },
	{ episode: 'The Ultimate Computer', character: 'Richard Daystrom', line: 'When a child is taught, it\'s programmed with simple instructions, and at some point, if its mind develops properly, it exceeds the sum of what it was taught, thinks independently.' },
	{ episode: 'The Ultimate Computer', character: 'James T. Kirk', line: 'Genius doesn\'t work on an assembly line basis. Did Einstein, Kazanga or Sitar of Vulcan produce new and revolutionary theories on a regular schedule? You can\'t simply say, "Today I will be brilliant."' },
	{ episode: 'Assignment: Earth', character: 'Spock', line: 'Without facts, the decision cannot be made logically. You must rely on your human intuition.' },
	{ episode: 'Assignment: Earth', character: 'Spock', line: 'Live long and prosper.' },
	{ episode: 'Spock\'s Brain', character: 'Spock', line: 'Captain, there is a definite pleasurable experience connected with the hearing of your voice.' },
	{ episode: 'The Enterprise Incident', character: 'Spock', line: 'It would be illogical to assume that all conditions remain stable.' },
	{ episode: 'The Enterprise Incident', character: 'Spock', line: 'It is not a lie to keep the truth to oneself.' },
	{ episode: 'The Enterprise Incident', character: 'Spock', line: 'Military secrets are the most fleeting of all.' },
	{ episode: 'And the Children Shall Lead', character: 'Spock', line: 'Humans do have an amazing capacity for believing what they choose and excluding that which is painful.' },
	{ episode: 'And the Children Shall Lead', character: 'James T. Kirk', line: 'Most legends have their basis in fact.' },
	{ episode: 'And the Children Shall Lead', character: 'Spock', line: 'Without followers, evil cannot spread.' },
	{ episode: 'Is There in Truth No Beauty?', character: 'Leonard McCoy', line: 'He\'s dead, Jim.' },
	{ episode: 'Day of the Dove', character: 'Spock', line: 'No one can guarantee the actions of another.' },
	{ episode: 'The Empath', character: 'Leonard McCoy', line: 'I\'m a doctor, not a coal miner.' },
	{ episode: 'Let That Be Your Last Battlefield', character: 'James T. Kirk', line: 'The cause you fought about no longer exists...Give up your hate.' },
	{ episode: 'The Way to Eden', character: 'Spock', line: 'Many myths are based on truth.' },
	{ episode: 'The Cloud Minders', character: 'Spock', line: 'Violence in reality is quite different from theory.' },
	{ episode: 'The Savage Curtain', character: 'Surak', line: 'I am pleased to see that we have differences. May we together become greater than the sum of both of us.' },
	{ episode: 'The Savage Curtain', character: 'Colonel Green', line: 'History tends to exaggerate.' },
	{ episode: 'The Savage Curtain', character: 'Abraham Lincoln', line: 'There\'s no honorable way to kill, no gentle way to destroy. There is nothing good in war except its ending.' },
];	

