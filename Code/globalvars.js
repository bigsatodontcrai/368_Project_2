/**
 * @file globalvars.js holds all of our global variables that are used throughout the game
 */
const Textures = {
    Platform: "./Assets/Assets.json",
    Character: "./Assets/adventurer-Sheet.json",
    Background: "./Assets/background.json"
};

const game = document.getElementById('game');

game.height = 500;
game.width = 500;

const app = new PIXI.Application(
    {
        view: game,
        width: 16*60,
        height: 16*30,
        backgroundColor: 0x410000
    }
);

/**
 * healthCheck - checks how many hearts player has left and alerts them
 */
function healthCheck () 
{
    if (hearts == 3)
    {
        alert('You have 3 hearts left');
    }
    else if (hearts == 2)
    {
        alert('you have 2 heart left');
    }
    else if (hearts == 1)
    {
        alert('you have 1 heart left');
    }
}

const BG = PIXI.Sprite.from('./Assets/Background_1.png');
BG.scale.x = 2;


let test2Invalid = 0;
let coinDetect = 0;
let bottom;
let maxHeight;
let gravity = false;
let hearts = 4;
let heartArray = new Array(3);
let enemyHurtBox;
let reset = 0;
let damageboost = 0;
let testing = 0;
let jumpspeed = -0.5;
let fallspeed = 0.5;
let sprite;
let state = 'idle';
let time = 0;
let collisionDetection = [{
    collision: false,
    vxMod: 0,
    vyMod: 0,
    immutable: false
}];
let onTheGround = false;
let coinCounter = 0;
let amAttacking = false;
let Goomba;

let levelIndex = 0;
let platformArrayContainer = [];

let resource;
let container;
let background;
let Forward = 1;
let arrayOfIndex = new Array(8);
let arrayOfSprites = new Array(8);

let platformSprites = new Array(50 * 15);
let constantHurtBox = new Array(50 * 15);

let platformArray = [ 0, 0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   14,   66,
                        0, 0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   14,   66, 
                        0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0, 0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0, 0,   0,   0,   0,   14,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  14,  14,  14,   14,   66, 
                        0,   0,   0,   0,   0,   14,   14,   14, 0,   0,   0,   14,   0, 0,  0,  0,   14,   14,   0,   0,   0,   0,   14,   14, 0,   0,   0,   0,   0,   0,   0, 0,   14,   14,   14,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   66,   66,   66,   14,   66, 
                        0,   0,   14,   0,   0,  66,  66,  66,   14,   14,   14,   66,   0, 0,   0,  0,   6,   6, 0,   0,   0,   0,   6,   6, 0,   0,   0,   0,   0,   0,   0,   14,   14,   0,   14,   14,   0,   0,   14,   14,   0,   0,   0,   0,   0,   0,   0,   0,   14,   66, 
                        0,   0,   14,   0,   0,   0,   0,   0,   66,   66,   66,   0,    0,  0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   14,   14,   14,   0,   0,   0,  66,  66,  0,   14,   14,   0,   0,   0,   0,   14,   14,   66, 
                        0,   0,   14,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   14,   14,   14,   0,   0,   0,   0,   0,   14,   0,   0,   0,   0,   0,   0,   0,   66,   66,   14,   14,   14,   66,   66, 66,  66, 
                        0,   0,   14,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   14,   14,   14,   0,   0,   0, 144, 144, 144,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   12,   12, 
                        0,   0,   14,   0,   0,   0,   0,   0,   0,   14,   14,   14,   0,   0,   66,   66,   0,   0,   0, 144, 144, 144,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   14,   14,   14,   0,   0,   0,   0,   0,   0,   0,   0,   0,   12,   12, 
                        0,   0,   14,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   14, 114, 115, 116,   0,   0,   0,   0,   0,   0,   0,   14,   14,   12,   12, 
                        0,   0,   14,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   14, 130, 128, 129, 130,   0,   0,   0,   0,   0,   0,   0,   14,   14, 187, 187, 
                        0,   0,   14,   14,   14,   14,   14,   14,   14,   14,   14,   14,   0,   0,   0,   0,   14,   14,   14,   14,   0,   0,   0,   0,   0,   0,   0,   14,   14,   14,   14,   0,   0,   14, 143, 144, 142, 143, 144,   0,   14,   14,   14, 187, 187,   14,   14,   14, 187, 187, 
                      144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 14, 144, 144, 144,   14,   14,   14,   14,   14,   14,   14, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144,   0,   0, 187, 187, 187, 187, 187,   14,   14, 187, 187, 
                      144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144,   0,   0, 187, 187, 187, 187, 187, 187, 187, 187, 187, 
                      144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144,   0,   0, 187, 187, 187, 187, 187, 187, 187, 187, 187];

let level2 = [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 14, 2, 2, 2, 0, 0, 152, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 152, 0, 0, 0, 14, 14, 14, 14, 14, 14, 14, 14, 4, 2, 0, 0, 0, 0, 0, 14, 2, 2, 0, 0, 0, 63, 64, 65, 0, 0, 0, 0, 6, 0, 0, 0, 14, 14, 14, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 63, 64, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 4, 2, 0, 0, 0, 0, 14, 2, 2, 0, 0, 0, 0, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 14, 0, 0, 14, 78, 79, 80, 0, 0, 0, 0, 14, 0, 0, 14, 0, 14, 4, 2, 0, 0, 0, 14, 2, 2, 0, 0, 0, 0, 0, 92, 93, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 92, 93, 94, 0, 0, 0, 0, 180, 14, 14, 180, 0, 14, 4, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 180, 180, 180, 180, 0, 14, 4, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 0, 0, 0, 0, 0, 0, 0, 14, 12, 12, 14, 14, 0, 0, 0, 0, 14, 14, 14, 0, 0, 0, 0, 14, 14, 0, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 180, 180, 0, 0, 0, 0, 0, 0, 0, 14, 12, 12, 130, 14, 14, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 14, 14, 14, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 0, 1, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 12, 12, 130, 130, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 6, 0, 0, 0, 14, 14, 14, 0, 0, 0, 0, 0, 66, 66, 66, 0, 1, 1, 14, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 130, 130, 130, 130, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 14, 0, 0, 0, 14, 14, 167, 0, 0, 0, 0, 14, 130, 130, 130, 130, 130, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 130, 130, 130, 130, 130, 130, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0, 0, 14, 14, 14, 14, 0, 0, 0, 0, 81, 81, 81, 0, 0, 0, 1, 1, 1, 14, 14, 14, 1, 1, 1, 0, 0, 14, 14, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 0, 0, 0, 130, 130, 130, 130, 0, 0, 0, 0, 0, 0, 0, 14, 14, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 0, 0, 0, 130, 130, 130, 130, 0, 0, 0, 0, 0, 0, 0, 58, 58, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 130, 130, 130, 130, 130];
let level3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 46, 46, 46, 46, 3, 3, 46, 14, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 14, 14, 14, 0, 0, 0, 0, 46, 46, 46, 46, 3, 3, 46, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 14, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 0, 14, 14, 0, 0, 0, 46, 46, 46, 46, 14, 14, 46, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 110, 110, 110, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 0, 0, 0, 14, 14, 14, 0, 0, 0, 0, 46, 46, 46, 46, 14, 14, 12, 14, 0, 0, 0, 0, 0, 14, 14, 14, 14, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 46, 46, 46, 0, 14, 14, 12, 14, 0, 0, 0, 0, 0, 110, 110, 110, 110, 0, 4, 0, 0, 0, 0, 0, 14, 14, 14, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 46, 0, 14, 14, 12, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 46, 0, 14, 14, 12, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 14, 14, 14, 14, 14, 14, 14, 14, 14, 110, 0, 0, 0, 0, 51, 51, 51, 0, 0, 0, 0, 0, 0, 14, 0, 46, 14, 14, 14, 0, 4, 0, 0, 0, 14, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 57, 46, 110, 110, 110, 0, 4, 4, 0, 14, 14, 14, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 57, 46, 6, 0, 0, 0, 0, 0, 14, 14, 0, 14, 14, 4, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0, 52, 52, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 14, 0, 46, 6, 0, 0, 0, 0, 0, 0, 14, 14, 14, 0, 4, 110, 110, 110, 0, 0, 0, 14, 14, 14, 14, 0, 0, 0, 179, 14, 14, 179, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 0, 14, 14, 14, 46, 46, 0, 46, 6, 14, 14, 14, 0, 0, 0, 0, 14, 0, 0, 4, 0, 0, 0, 14, 14, 0, 110, 110, 110, 110, 0, 0, 0, 179, 179, 179, 179, 0, 0, 0, 57, 14, 14, 14, 14, 57, 0, 0, 0, 57, 14, 14, 14, 14, 46, 57, 0, 46, 6, 110, 110, 110, 6, 6, 0, 0, 0, 0, 0, 4, 0, 51, 51, 51, 51, 0, 0, 0, 0, 0, 0, 0, 0, 179, 179, 179, 179, 0, 0, 0, 57, 57, 57, 57, 57, 57, 0, 0, 0, 57, 57, 57, 57, 57, 57, 57, 0, 46, 6, 6, 6, 6, 4, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 179, 179, 179, 179, 179, 179, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46];
platformArrayContainer.push(platformArray);
platformArrayContainer.push(level2);
platformArrayContainer.push(level3);

let spriteHolder = [];
let text;
let spriteHurtBox;
let gameController;
let isOnGround;
let onGroundCheck = 1;

/**
 * sound - controls the sounds in the game
 * @param {string} src 
 */
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

let coinSound;
coinSound = new sound('./Assets/coineff.mp3');

let enemyArray = [];