/**
 * @file this file handles collisions between two sprites
 */
/**
 * findIndexFromCoordinates - takes coordinates to find the index
 * @param {number} x 
 * @param {number} y 
 * @return number
 */
function findIndexFromCoordinate(x, y) {
    let temp1 = (60 * (y / 16)) - 1;
    let temp2 = x / 16;
    return temp1 + temp2;

}

/**
 * thePosition - finds the position of object
 * @param {number} num 
 * @param {number} px 
 * @return number
 */
function thePosition(num, px) {
    return Math.floor(num / px) * px;
}

/**
 * getPos - gets the position of the sprite element
 * @param {element} box - PIXI sprite element
 * @return arr[][]
 */
function getPos(box) {
    
    let boxArray = [[]];
    let newArray = [];
    let xoffset = 0;
    let pos = thePosition(box.leftEdge, 16);

    let mos = thePosition(box.bottomEdge, 16) - 16;


    boxArray[0] = [pos - 16, mos - 16*3];//top left
    boxArray.push([pos, mos - 16*3]);//top right
    boxArray.push([pos + 16, mos -16*3]);
    boxArray.push([pos + 32, mos - 16*3])

    boxArray.push([pos - 16, mos]);
    boxArray.push([pos, mos]);
    boxArray.push([pos + 16, mos]);
    boxArray.push([pos + 32, mos]);

    boxArray.push([pos - 16, mos - 32]);
    boxArray.push([pos - 16, mos - 16]);

    boxArray.push([pos + 32, mos - 32]);
    boxArray.push([pos + 32, mos - 16]);

    //console.log(boxArray);

    for(let i = 0; i < 12; i++){
        let a = boxArray[i][0];
        let b = boxArray[i][1];
        newArray.push([a/16, b/16]);
    }

    //console.log(newArray);


    return boxArray;
}


/**
 * indexArray - make an array of the index
 * @param {element} box - PIXI sprite element
 * @return arr[]
 */
function indexArray(box) {
    let thisArray = getPos(box);
    let temp1;
    let temp2;

    for (let i = 0; i < 12; i++) {
        temp1 = thisArray[i][0];
        temp2 = thisArray[i][1];
        arrayOfIndex[i] = findIndexFromCoordinate(temp1, temp2);
    }
    return arrayOfIndex;
}


//this newSpriteArray returns an array with all of the hurt boxes of neighboring tiles
/**
 * newSpriteArray - returns an array with all of the hurtBoxes of neighboring tiles
 * @param {element} box - PIXI sprite element
 * @return arr[]
 */
function newSpriteArray(box) {
    let spriteArray = new Array(12);
    let ind = indexArray(box);

    for (let i = 0; i < 12; i++) {
        let index = ind[i];
        spriteArray[i] = constantHurtBox[index];
        //platformSprites[index].width = 13;
    }

    return spriteArray;
}

/**
 * constructFromArray - contructs platformSprites and hurtboxes from the given platform array
 * @param {number} platformArray 
 */
function constructFromArray(platformArray, immutable) {
    let newResource = PIXI.Loader.shared.resources['./Assets/ashlands_tileset.json'].spritesheet;
    for (let i = 0; i < 60 * 30; i++) {
        if (platformArray[i] != 0) {

            let index = platformArray[i] - 1;
            let loc = 'ashlands_tileset' + index + '.png';

            platformSprites[i] = new PIXI.Sprite(newResource.textures[loc]);
            platformSprites[i].x = (i % 60) * 16;
            let yloc = Math.floor(i / 60);
            platformSprites[i].y = (yloc + 1) * 16;
            platformSprites[i].width = 16;
            platformSprites[i].height = 16;
            platformSprites[i].interactive = true;


            constantHurtBox[i] = new hurtBox(platformSprites[i]);
            constantHurtBox[i].immutable = immutable;
            constantHurtBox[i].calculateEdges();
            container.addChild(platformSprites[i]);
            /*if (platformArray[i] == 12) {
                constantHurtBox[i].gate = true;
            }*/
            if(platformArray[i] == 366 || platformArray[i] == 367|| platformArray[i] == 368 || platformArray[i] == 369){
                constantHurtBox[i].coins = true;
            }
            if(platformArray[i] == 268){
                constantHurtBox[i].immutable = false;
            }
        } /*else if (platformArray[i] == 14) {
            platformSprites[i] = new PIXI.AnimatedSprite(newResource.animations.coins);
            platformSprites[i].x = (i % 50) * 16;
            let yloc = Math.floor(i / 50);
            platformSprites[i].y = (yloc + 1) * 16;
            platformSprites[i].width = 16;
            platformSprites[i].height = 16;
            platformSprites[i].interactive = true;
            platformSprites[i].animationSpeed = 0.3;

            constantHurtBox[i] = new hurtBox(platformSprites[i]);
            constantHurtBox[i].immutable = false;
            constantHurtBox[i].coins = true;
            constantHurtBox[i].calculateEdges();
            platformSprites[i].play();
            container.addChild(platformSprites[i]);

        }*/
        else {


            platformSprites[i] = {
                x: (i % 50) * 16,
                y: (Math.floor(i / 50) + 1) * 16,
                height: 16,
                width: 16,
            };
            constantHurtBox[i] = new hurtBox(platformSprites[i]);
            constantHurtBox[i].height = platformSprites[i].height;
            constantHurtBox[i].width = platformSprites[i].width;
            //constantHurtBox[i].immutable = false;
            constantHurtBox[i].calculateEdges();
            constantHurtBox[i].coins = false;
            //container.addChild(platformSprites[i]);
        }
    }
    spriteHolder.push(platformSprites);
}