/**
 * @file main.js sets up the beginning of the game.
 */

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;






document.addEventListener('DOMContentLoaded', () => {
    let myMusic;
    myMusic = new sound("448_beat.mp3");
    myMusic.play();
    
    document.body.appendChild(app.view);

    //const level = import('./Assets/Platforms.json');
    container = new PIXI.Container();
    text = new PIXI.Text('Bones: ' + coinCounter, { fontFamily: 'Helvetica', fontSize: 12, fill: 0xF00000, align: 'center' });
    text.x = 16*4;
    
    
    //makePlatforms(level);

    let loadScene = PIXI.Loader.shared.add('./Assets/ashlands_tileset.json');
    let loadPlayer = PIXI.Loader.shared.add('./Assets/rpg-girl.json');
    let loadEnemy = PIXI.Loader.shared.add('./Assets/Walk.json');
    
    loadScene.load(() => {
        
        
        constructFromArray(platformArray, false);
        constructFromArray(platform2, false);
        constructFromArray(platform3, true);
        
        for(let i = 0; i < 3; i++){
            heartArray[i] = new PIXI.Sprite.from('./Assets/heart.png');
            heartArray[i].height = 8;
            heartArray[i].width = 8;
            heartArray[i].x = 16 * i + 3;
            heartArray[i].y = 4;
            container.addChild(heartArray[i]);
        }

        container.addChild(text);

        //console.log(platformSprites);
        //console.log(constantHurtBox);
        
    });

    loadEnemy.load(() => {

    });

    loadPlayer.load(() => {
        
        playCharacter();
        
        
        container.addChild(sprite);
        app.stage.addChild(container);
        app.renderer.render(app.stage);
    
    });

    

    
});









