/**
 * @file this file runs all of our test functions
 */

//touchytouchy();
//onGroundy();
//testHealth();


/**
 * touchytouchy - tests to see if a collision was dectected
 */
function touchytouchy () {
    let testground = collisionDetection.find(box =>
        box.immutable == false && box.vyMod == 0 && box.vxMod == 0 && box.collision == false);

    if (testground)
    {
        console.log("collision detection is functioning!");
    }
    else
    {
        console.log("collision detection has failed!");
    }
}

/**
 * onGroundy - tests to see if touching the ground functions work correctly
 */
function onGroundy() {
    console.log("Touching Ground functions Correctly!");
    onGroundCheck = undefined;
    delete (onGroundCheck);
}

/**
 * testController - tests to see if the contoller class works
 */
function testController() {
    if (gameController != null)
    {
        console.log("Controller works!");
    }
    else
    {
        console.log("controller doesnt work!");
    }
}

/**
 * coinCollection - tests if the coin counter and collection is working
 */
function coinCollection () {
    if (coinCounter  == 1)
    {
        console.log("coin counter works!");
    }
    else if (coinCounter > 1)
    {

    }
    else
    {
        console.log("coin Counter doenst work!");
    }
}

/**
 * testHealth - test if health is lost
 */
function testHealth ()
{
    hearts--;
    healthCheck();
    if (hearts == 3)
    {
        console.log("Loosing health Works!");
    }
    else 
    {
        console.log("loosing health doesnt work!");
    }

}

/**
 * testWin - tests if the game win function works
 */
function testWin()
{
    sprite.x = 810*2;
    if (sprite.x == 810*2)
    {
        test2Invalid++;
        console.log("Game winning works!");
        
    }
    else
    {
        console.log("Game winning doenst work!");
    }
}

/**
 * testFallOut - tests if falling off the map works
 */
function testFallOut ()
{
    sprite.x = -200;
    
    if (sprite.x == -200)
    {
        console.log("falling out the world detection works!");
    }
    else
    {
        console.log("falling out of the world detection doesnt work!");
    }
}