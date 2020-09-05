////////// TO DO ///////////
// uncomment listener
////////// TO DO ///////////
_btnStart.addEventListener("click", (e) => {
	// goFullScreen();

	_container.classList.remove("invisible");
	_landing.classList.add("invisible");
	_btnStart.classList.add("invisible");

	player = new Character("slimey", 0);
	_healthpointsCurrent.innerHTML = player.hp;
	_healthpointsMax.innerHTML = player.hp;
	_playerLvl.innerHTML = player.lvl;
	_playerAttackStrength.innerHTML = player.attackStrength;
	_playerAttackSpeed.innerHTML = player.speed;
	_playerDefense.innerHTML = player.def;
	_playerAgility.innerHTML = player.agility;
	_playerFOV.innerHTML = player.fov;
	_actionsTotal.innerHTML = player.actionsPerTurn
	_actionsLeft.innerHTML = player.actionsLeft
	_expCurrent.innerHTML = player.xp
	_expToNextLvl.innerHTML = player.nextLvl
	buildDungeon(
		CANVAS_HEIGHT,
		CANVAS_WIDTH,
		COLUMNS,
		ROWS,
		TILE_HEIGHT,
		TILE_WIDTH,
		[0, 160]
	);
});

// _btnReset.addEventListener("click", (e) => {
// 	const didExit = confirm(
// 		"Are You Sure You Want To Quit? You're progress will not be saved"
// 	);
// 	didExit && location.reload();
// });

////////// TO DO ///////////
// uncomment listener
////////// TO DO ///////////

// STATS
// 1. healthpoints
// 2. exp points
// 3. dungeon lvl
// 4. total steps walked

game.addEventListener("click", (e) => {
    _enemyDetails.innerHTML = ''

	const { top, left } = game.getBoundingClientRect();
	const percentDiff = game.width / e.target.clientWidth;

	const adjustedX = (e.clientX - left) * percentDiff;
	const adjustedY = (e.clientY - top) * percentDiff;


    // THIS SHOULD RETURN AN ARRAY OF ONE OR MORE ENEMIES THAT ARE IN THE CLICK LOCATION
    let index;
	const [clickedEnemy] = enemies.filter((enemy, i) => {
        if(checkIfEnemyCoord([adjustedX, adjustedY], enemy.coords)){
            console.log('got heer')
            index = i;
            return 1;
        }
    });

    !clickedEnemy ? _attackBtn.classList.add('invisible') : showEnemyDetails(clickedEnemy, index)
});

_attackBtn.addEventListener('click', e => {
    const i = e.target.dataset.enemy;
    const enemy = enemies[i];
    console.log(player.attackEnemy(enemy, i))
})

const showEnemyDetails = (enemy, i) => {
    _enemyDetails.innerHTML = ''
    // CREATE CONTAINER
    const _section = document.createElement('section')
    _section.classList.add('enemy-item')

    // CREATE 'H4' & APPEND TO CONTAINER
    const _h4 = document.createElement('h4')
    _h4.innerHTML = enemy.name
    _section.append(_h4)

    // CREATE 'CLASS' & APPEND TO CONTAINER
    const enemyClass = !enemy.class ? 'melee' : enemy.class == 1 ? 'magic' : 'ranged'
    _section.append(createParSpanPair('🧍 Class: ', enemyClass))
    // CREATE 'HP' & APPEND TO CONTAINER
    _section.append(createParSpanPair('❤ HP: ', enemy.hp))
    // CREATE 'ATTACK STRENGTH' & APPEND TO CONTAINER
    _section.append(createParSpanPair('🔪 Attack Strength: ', enemy.attack))
    // CREATE 'DEFENSE' & APPEND TO CONTAINER
    _section.append(createParSpanPair('🛡 Defense: ', enemy.def))
    // CREATE 'FOV' & APPEND TO CONTAINER
    _section.append(createParSpanPair('🔭 FOV: ', enemy.fov))

    if(player.inRange.length && window.onkeypress){
        _attackBtn.classList.remove('invisible');
        _attackBtn.setAttribute('data-enemy', i);
    } else {
        _attackBtn.classList.add('invisible');
    }

    _enemyDetails.append(_section)
}

const createParSpanPair = (title, data) => {
    const _p = document.createElement('p')
    const _span = document.createElement('span')
    _p.innerHTML = title
    _span.innerHTML = data
    _p.append(_span)
    return _p
}

const checkIfEnemyCoord = ([clickX, clickY], [enX, enY]) =>
	clickX >= enX &&
	clickY >= enY &&
	clickX < enX + TILE_WIDTH &&
	clickY < enY + TILE_WIDTH
		? true
		: false;

_lvlUp.addEventListener('click', e => player.addStat(e.target.dataset.stat))