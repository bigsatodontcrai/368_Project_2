let game;
let app;
let state = 'choose a move';

let yourMove;
let turnMove;

let sprites = new Array(18);
let background;
let huddy;
let hphud1;
let hphud2;
let enemyCurrent;
let myCurrent;
let container;
let faintException = false;
let opponentDamage = 0;
let myDamage = 0;
let turnTimer = 0;
let turnOppTimer = 0;

let platform1;
let platform2;
let currentSprite;
let currentMoves = new Array(4);
let thebody;
thebody = document.getElementById('bigboy');

let moveIsMade = false;
let enemyMove = false;

function createCanvas() {

    game = document.createElement('canvas');
    game.className = 'game';
    game.height = 1000;
    game.width = 1000;
    thebody.append(game);

    app = new PIXI.Application(
        {
            view: game,
            width: 900,
            height: 400,
            backgroundColor: 0xAAAAAA
        }
    );

    container = new PIXI.Container();

    console.log(myTeam);
    myTeam.forEach(creatures => {
        console.log(creatures);
        console.log(findCreatureByImage(creatures));
    })
    let myMons = myTeam.map(creatures => findCreatureByImage(creatures));
    let opponentMons = enemyTeam.map(creatures => findCreatureByImage(creatures));
    let playerSprites = [];
    let enemySprites = [];
    myTeam.forEach(creatures => {//creates my sprites
        let sprite = PIXI.Sprite.from(creatures);
        sprite.x = 100;
        sprite.y = 120;
        playerSprites.push(sprite);
    });

    enemyTeam.forEach(creatures => {//creates enemy's sprites
        let sprite = PIXI.Sprite.from(creatures);
        sprite.x = 700;
        sprite.y = 120;
        enemySprites.push(sprite);
    })
    myMons.forEach(creatures => {
        creatures.sprite = playerSprites.shift();
    });
    opponentMons.forEach(creatures => {
        creatures.sprite = enemySprites.shift();
    })

    console.log(myMons);
    console.log(opponentMons);


    let hudcontainer = new PIXI.Container();

    background = PIXI.Sprite.from('./Assets/battle-background-sunny-hillsx4.png');
    background.scale.x = 0.8;
    container.addChild(background);
    huddy = PIXI.Sprite.from('./Assets/HUD.png');
    huddy.y = 295;
    huddy.scale.y = 1.6;
    huddy.scale.x = 2.8;


    hudcontainer.addChild(huddy);
    container.addChild(hudcontainer);

    container.addChild(myMons[0].sprite);
    container.addChild(opponentMons[0].sprite);

    let text = new PIXI.Text(myMons[0].name + ' ' + myMons[0].level, { fontFamily: 'Helvetica', fontSize: 18, fill: 0xF00000, align: 'center' });
    let enemyText = new PIXI.Text(opponentMons[0].name + ' ' + opponentMons[0].level, { fontFamily: 'Helvetica', fontSize: 18, fill: 0xF00000, align: 'center' });
    text.x = 10;
    text.y = 20;
    enemyText.y = 20;
    enemyText.x = 600;
    hphud1 = PIXI.Sprite.from('./Assets/HUD.png');
    let hp1 = new PIXI.Text('HP: ' + myMons[0].stats[0] + '/' + myMons[0].stats[0], { fontFamily: 'Helvetica', fontSize: 18, fill: 0xF00000, align: 'center' });
    let hp2 = new PIXI.Text('HP: ' + opponentMons[0].stats[0] + '/' + opponentMons[0].stats[0], { fontFamily: 'Helvetica', fontSize: 18, fill: 0xF00000, align: 'center' });
    hp1.y = 20;
    hp1.x = 180;
    hp2.y = 20;
    hp2.x = 770;
    hphud1.y = 10;
    hphud1.scale.y = 0.8;
    container.addChild(hphud1);
    container.addChild(text);
    container.addChild(hp1);
    


    hphud2 = PIXI.Sprite.from('./Assets/HUD.png');
    hphud2.y = 10;
    hphud2.scale.y = 0.8;
    hphud2.x = 590;
    container.addChild(hphud2);
    container.addChild(hp2);
    container.addChild(enemyText);

    hudtext = new PIXI.Text(state, { fontFamily: 'sans-serif', fontSize: 20, fill: 0xFFFFFF, align: 'center' });
    hudtext.y = 320;
    hudtext.x = 30;
    container.addChild(hudtext);

    let timer = 0;
    

    app.ticker.add(() => {
        state = changeState(moveIsMade, enemyMove);
        hudtext.text = state;
        switch(state){
            case states.s1:
                break;
            case states.s2:
                timer++
                if(timer >= 150){
                    let thing = enemyMakesMove(opponentMons[enemyCurrent], myMons[myCurrent]);
                    yourMove = thing.name;
                    myDamage = thing.damage;
                    timer = 0;
                    enemyMove = true;
                }
                break;
            case states.s3:
                break;
            case states.s4:
                timer++
                if(timer >= 100){
                    moveIsMade = false;
                }
                break;
            case states.s5:
                
                calculateHP(myMons, opponentMons, hudtext);
                if(!myMons[myCurrent].checkFaint()){
                    useStatus(myMons, myCurrent, 'player');
                }
                if(!opponentMons[enemyCurrent].checkFaint()){
                    useStatus(opponentMons, enemyCurrent, 'enemy');
                }
                
                hp1.text = 'HP: ' + myMons[myCurrent].hp + '/' + myMons[myCurrent].stats[0];
                hp2.text = 'HP: ' + opponentMons[enemyCurrent].hp + '/' + opponentMons[enemyCurrent].stats[0];
                enemyText.text = opponentMons[enemyCurrent].name + ' ' + opponentMons[enemyCurrent].level;
                moveIsMade = false;
                if(myMons[myCurrent].status == 'intimidated' && turnTimer < 2){
                    turnTimer++;
                } if(turnTimer == 2){
                    turnTimer = 0;
                    myMons[myCurrent].status = 'none';
                }
                enemyMove = false;
                if (opponentMons[enemyCurrent].status == 'intimidated' && turnOppTimer < 2) {
                    turnOppTimer++;
                } if (turnOppTimer == 2) {
                    turnOppTimer = 0;
                    opponentMons[enemyCurrent].status = 'none';
                }
                

                opponentDamage = 0;
                myDamage = 0;
                let init = false;

                myMons.forEach(pkmn => {
                    init = init && pkmn.checkFaint();
                });

                if(init){
                    alert('Game over');
                }

        }
        
    });


    container.addChild(text);
    app.stage.addChild(container);
    app.renderer.render(app.stage);
    createButtons(myMons, opponentMons, text, hp1);
}

function createButtons(myMons, opponentMons, nameText, hpText){
    let myHud = document.createElement('div');
    myHud.className = 'hud';
    myHud.id = 'myHud';
    let switchHud = document.createElement('div');
    switchHud.className = 'hud';
    switchHud.id = 'switchHud';
    thebody.append(myHud);
    thebody.append(switchHud);

    myCurrent = 0;
    enemyCurrent = 0;
    let moveButtons = new Array(4);
    let switchButtons = new Array(3);
    let thisMove = new Array(4);
    for(let i = 0; i < 4; i++){
        
        moveButtons[i] = document.createElement('button');
        moveButtons[i].className = 'move';
        thisMove[i] = myMons[0].moves[i];
        moveButtons[i].innerText = thisMove[i].name;
        moveButtons[i].addEventListener('click', () => {
            if(state == 'choose a move'){
                console.log(opponentMons[enemyCurrent].hp);
                opponentDamage = thisMove[i].doAttack(myMons[myCurrent], opponentMons[enemyCurrent]);
                console.log(opponentMons[enemyCurrent].hp);
                moveIsMade = true;
                turnMove = thisMove[i].name;
                if(opponentDamage == -1){
                    turnMove = 'Intimidated! NO attack';
                }
            } else {
                alert('Not your turn!');
            }   
        });
        myHud.append(moveButtons[i]);
    }

    for(let i = 0; i < 3; i++){
        switchButtons[i] = document.createElement('button');
        switchButtons[i].className = 'move';
        let thisMon = myMons[i];
        switchButtons[i].innerText = thisMon.name;
        switchButtons[i].addEventListener('click', () => {
            if((state == 'choose a move' || faintException)&& !thisMon.checkFaint() && i != myCurrent){
                console.log('switch to ' + thisMon.name);
                myMons[myCurrent].status = 'none';
                container.removeChild(myMons[myCurrent].sprite);
                container.addChild(myMons[i].sprite);
                for(let j = 0; j < 4; j++){
                    thisMove[j] = myMons[i].moves[j];
                    moveButtons[j].innerText = myMons[i].moves[j].name;
                }
                turnMove = 'You switched to: ' + thisMon.name;
                nameText.text = thisMon.name + ' ' + thisMon.level;
                hpText.text = 'HP: ' + thisMon.hp + '/' + thisMon.stats[0];
                myCurrent = i;
                if(faintException == false) {
                    moveIsMade = true;
                } else {
                    moveIsMade = false;
                }
                faintException = false;
            } else if(thisMon.checkFaint()){
                alert('This monster has fainted');
            }
            else {
                alert('Not your turn!');
                console.log('illegal');
            }
        });
        switchHud.append(switchButtons[i]);
    }
    

}




function createDivs(arrayOfSprites) {

    let divSet = arrayOfSprites.map(x => x.map(box => box.sprite));//creates array of images

    let userMenu = document.createElement('div');//creates the menu div
    

    userMenu.className = 'Menu';

    divSet.forEach(thing => {
        let piece = document.createElement('div');
        piece.className = 'set';

        thing.forEach(part => {
            let image = document.createElement('img');
            image.className = part;
            image.src = part;
            image.width = 30;
            image.height = 30;
            piece.append(image);
        });
        piece.addEventListener('click', () => {
            console.log('click');
            while (piece.firstChild != null) {
                myTeam.push(piece.firstChild.className);
                piece.removeChild(piece.firstChild);
            }
            userMenu.removeChild(piece);
            let next = userMenu.firstChild;
            let pop = getRandomInt(4);
            for(let i = 0; i < pop; i++){
                userMenu.removeChild(userMenu.firstChild);
            }
            next = userMenu.firstChild;
            while (next.firstChild != null) {
                enemyTeam.push(next.firstChild.className);
                next.removeChild(next.firstChild);
            }
            console.log(myTeam);
            console.log(enemyTeam);
            while (thebody.firstChild != null) {
                thebody.removeChild(thebody.firstChild);
            }
            createCanvas();
        });
        userMenu.append(piece);
    });


    thebody.append(userMenu);
    //alert('choose your randomized team');



}