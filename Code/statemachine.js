/**
 * @file statemachine.js updates the state of the character 
 */
/**
 * updateState - Updates the state of the charcter
 * @param {number} vx x-direction velocity 
 * @param {number} vy y-direction velocity 
 * @param {element} sprite - PIXI sprite element
 * @return string - state of the character
 */
function updateState(vx, vy, sprite) {
    let thisState = '';
    
    if (vx != 0 && vy == 0) {
        //alert('himbo');
        sprite.animationSpeed = 0.5;
        if (vx > 0) {
            if (Forward == -1) {
                //sprite.x = sprite.x - sprite.width;
            }
            Forward = 1;
            horizontal = 1;
            vertical = 0;
            sprite.scale.x = Math.abs(sprite.scale.x) * Forward;

        } else if (vx < 0) {
            if (Forward == 1) {
                //sprite.x = sprite.x + sprite.width;
            }
            Forward = -1;
            horizontal = -1;
            vertical = 0;
            sprite.scale.x = Math.abs(sprite.scale.x) * Forward;
            
        }
        thisState = 'running';
    } else if (vy > 0) {
        up = true;
        sprite.animationSpeed = 0.5;
        thisState = 'falling';
        vertical = -1;
        horizontal = 0;
    } else if (vy < 0) {
        up = true;
        horizontal = 0;
        vertical = 1;
        sprite.animationSpeed = 0.5;
        thisState = 'jumping';
    } else {
        sprite.animationSpeed = 0.1;
        if(horizontal == 0 && vertical == -1){
            thisState = 'idle';
        } else if(horizontal == 0 && vertical == 1){
            thisState = 'idle_up';
        } else if(horizontal == 1 && vertical == 0){
            thisState = 'idle_hori';
        } else if(horizontal == -1 && vertical == 0){
            thisState = 'idle_hori';
        } else {
            thisState = 'idle';
        }
    }

    if(amAttacking){
        sprite.animationSpeed = 0.3;
        thisState = 'attack';
    }

    return thisState;

}//will move this to statemachine

/**
 * attackState - changes state to attacking 
 * @param {KeyboardEvent} e 
 * @return string 
 */
function attackState(e){
    if(e.keyCode == 32){
        return 'attack';
    }
}
//32 is the keyCode for space