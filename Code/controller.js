class controller {
    /**
     * class contructor
     * @param {element} sprite - PIXI sprite element
     */
    constructor(sprite){
        this.jumpspeed = -3;
        this.fallspeed = 3;
        this.sprite = sprite;
        this.hori = sprite.x;
        this.vert = sprite.y;
        this.vx = 0;
        this.vy = 0;
        this.vxmax = 0;
        this.vxmod = 0;
        this.vymod = 0;
        this.curr = [];
        this.size = 0;
        //this.time = 0;
    }

    /**
     * movement - controlls the distances of how far the character moves on each keystroke
     * @param {KeyboardEvent} e 
     * @param {hurtBox} spriteHurtBox 
     * @return boolean 
     */
    movement (e, spriteHurtBox) {
        this.curr.push(e.key);
        this.size++;
        if(e.key == 'a'){
            this.vy = 0;
            this.vx = -3;
        } else if (e.key == 'd'){
            this.vy = 0;
            this.vx = 3;
        } else if (e.key == 'w'){
            this.vx = 0;
            this.vy = -2;
            
        } else if(e.key == 's'){
            this.vx = 0;
            this.vy = 2;
        }
        
        return true;
         
    }

    /**
     * move - moves the character accross the screen
     * @return boolean
     */
    move(){
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
        this.vxMod = 0;
        this.vyMod = 0;
        //alert(this.sprite.y);
        return true;
    }

    /**
     * calculateParameters - calculate the parameters of the character 
     */
    calculateParameters(){
        this.hori = this.sprite.x;
        this.vert = this.sprite.y;
    }

    /**
     * moveLeft - moves the character left
     * @return boolean
     */
    moveLeft(){
        this.sprite.x -= this.vx;
        return true;
    }

    /**
     * Jump - the character jumps
     * @return boolean
     */
    Jump(){
        this.sprite.y -= this.vy;
        //this.sprite.y += this.vy;
        return true;
    }

    /**
     * stopMovement - stops the character from moving if it hits something
     * @param {KeyboardEvent} e 
     * @param {hurtBox} spriteHurtBox 
     */
    stopMovement(e, spriteHurtBox){
        if (e.key == 'd' || e.key == 'a') {
            if (this.vy == 0) {
                this.vx = 0;
            }
        } if (e.key == 'w') {
            this.vy = 0;
        }
        if((e.key != 'd' || e.key != 'a') && this.vx != 0){
            this.vx = 0;
        }
        if(e.key == 'm'){
            //this.sprite.animationSpeed = 2;
        }
        if (e.key == 's'){
            this.vy = 0;
        }
        
    }

    /**
     * clearList - clears the list
     */
    clearList(){
        this.curr = [];
    }
}

/**
 * 
 * @param {KeyBoardEvent} e 
 */
function keypress(e) {
    controller.keyP(e);
}

/**
 * keydown - 
 * @param {KeyBoardEvent} e 
 */
function keydown(e) {

}

/**
 * keyup - 
 * @param {KeyBoardEvent} e 
 */
function keyup(e) {

}



