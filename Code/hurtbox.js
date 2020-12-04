/**
 * @file hurtbox.js sets up the class hurtBox and its functions
 */
class hurtBox {
    /**
     * class contructor
     * @param {element} sprite - PIXI sprite element
     */
    constructor(sprite) {
        this.sprite = sprite;
        this.height = sprite.height;
        this.width = sprite.width;
        this.x = sprite.x;
        this.y = sprite.y;
        this.nextX = sprite.x;
        this.nextY = sprite.y;
        this.immutable = false;
        this.vx = 0;
        this.vy = 0;
        this.rightEdge = 0;
        this.leftEdge = 0;
        this.topEdge = 0;
        this.bottomEdge = 0;
        this.coins = false;
        this.dead = false;
        this.gate = false;
        
        this.touchingGround = false;
        
    }

    /**
     * calculateEdges - calculates the edges of the hurtbox
     */
    calculateEdges(){
        this.rightEdge = this.sprite.x + this.sprite.width;
        this.leftEdge = this.sprite.x;
        this.topEdge = this.sprite.y;
        this.bottomEdge = this.sprite.y + this.sprite.height;

        this.y = this.sprite.y;
        this.x = this.sprite.x;
        this.width = this.sprite.width;
        this.height = this.sprite.height;
    }

    /**
     * calculateCharEdges - calcutlates the character's edges
     */
    calculateCharEdges(){
        this.width = 16;
        this.height = 28;

        this.rightEdge = this.sprite.x + 0.5 * this.width;
        this.leftEdge = this.sprite.x - 0.5 * this.width;
        this.topEdge = this.sprite.y + (7/37) * this.sprite.height;
        this.bottomEdge = this.sprite.y + (36/37) * this.sprite.height;
        this.topEdge = Math.floor(this.topEdge);
        this.bottomEdge = Math.floor(this.bottomEdge);
        this.rightEdge = Math.floor(this.rightEdge);
        this.leftEdge = Math.floor(this.leftEdge);

        this.x = this.leftEdge;
        this.y = this.topEdge;

        this.nextX = this.x;
        this.nextY = this.y;
    }

    /**
     * updateVelocity - updates the velocity of the controller object
     * @param {controller} controller 
     */
    updateVelocity(controller){
        this.vx = controller.vx;
        this.vy = controller.vy;
    }

    /**
     * updateHurtBox - updates the hurtbox
     * @param {controller} controller 
     */
    updateHurtBox(controller){
        this.calculateCharEdges();
        this.updateVelocity(controller);
       // this.downCollision = false;
        
    }

    /**
     * AABBCollision - checks to see if any two rectables in the same axis collide
     * @param {hurtBox} rect1 
     * @param {element} rect2 - PIXI sprite element 
     * @return boolean
     */
    AABBCollision(rect1, rect2){
        return (
            rect1.nextX < rect2.x + rect2.width &&
            rect1.nextX + rect1.width > rect2.x &&
            rect1.nextY < rect2.y + rect2.height &&
            rect1.nextY + rect1.height > rect2.y
        );
    }

    /**
     * horiCollision - controlls collision on the horizontal part of the box
     * @param {element} rect2 - PIXI sprite element 
     * @return number
     */
    horiCollision(rect1, rect2){
        rect2.nextX = rect2.x + rect2.vx;
        rect2.nextY = rect2.y;
        let isCollide = this.AABBCollision(rect2, rect1);
        
        if(isCollide){
            if(this.vx >= 0){
                return rect1.x - (rect2.nextX + rect2.width)
            } else {
                return rect1.x + rect1.width - rect2.nextX;
            }
        }
        return 0;
    }

    /**
     * vertCollision - controlls collision on the vertical part of the box
     * @param {element} rect2 - PIXI sprite element 
     * @return number
     */
    vertCollision(rect1, rect2){
        rect2.nextX = rect2.x;
        rect2.nextY = rect2.y + rect2.vy;
        let isCollide = this.AABBCollision(rect2, rect1);
        
        if(isCollide){
            if(this.vy > 0){
                return rect1.y - (rect2.nextY + rect2.height);
            } else if(this.vy < 0){
                return rect1.y + rect1.height - rect2.nextY;
            }
            
        }
        return 0;
    }

      /**
     * diagCollision - controlls collision the occurs diagonally
     * @param {element} rect2 - PIXI sprite element 
     * @return number - horizontal number and vertical number
     */
    diagCollision(rect1, rect2){
        rect2.nextX = rect2.x + this.vx;
        rect2.nextY = rect2.y + this.vy;

        const NE = rect2.vx > 0 && rect2.vy < 0;
        const NW = rect2.vx < 0 && rect2.vy < 0;
        const SE = rect2.vx > 0 && rect2.vy > 0;
        const SW = rect2.vx < 0 && rect2.vy > 0;

        if(this.AABBCollision(rect2, rect1)){
            if(NE) {
                return {
                    h: rect2.x - (rect2.nextX + rect1.width),
                    v: rect2.y + rect2.height - rect2.nextY,
                };
            } else if (NW){
                return {
                    h: rect1.x + rect1.width - rect2.nextX,
                    v: rect1.y + rect1.height - rect2.nextY,
                };
            } else if(SE){
                return {
                    h: rect1.x - (rect2.nextX + rect2.width),
                    v: rect1.y - (rect2.nextY + rect2.height),
                };
            } else if (SW) {
                return {
                    h: rect1.x + rect1.width - rect2.nextX,
                    v: rect1.y - (rect2.nextY + rect2.height),
                };
            }
        }
        
        return {
            h: 0,
            v: 0,
        }
    }

    /**
     * checkBoxCollision - checks if there was a collision on a hurt box
     * @param {elelment} box - PIXI sprite element
     * @param {controller} controller
     */
    checkBoxCollision(box, controller){
        this.updateVelocity(controller);
        let hori = this.horiCollision(this, box);
        let vert = this.vertCollision(this, box);
        let diag = this.diagCollision(this, box);
        return this.processCollision(box, hori, vert, diag, controller);
    }

    /**
     * processCollision - processes the collision of boxes
     * @param {element} box - PIXI sprite element
     * @param {number} hori 
     * @param {number} vert 
     * @param {number} diag 
     * @param {controller} controller 
     */
    processCollision(box, hori, vert, diag, controller){
        if (this.AABBCollision(box, this) && this.coins == true) {
            container.removeChild(this.sprite);
            container.removeChild(text);
            coinCounter++;
            text = new PIXI.Text('Bones: ' + coinCounter, { fontFamily: 'Helvetica', fontSize: 12, fill: 0xF00000, align: 'center' });
            text.x = 16 * 4;
            container.addChild(text);
            this.coins = false;
            this.immutable = false;
            coinCollection();
        }
        if(hori != 0 && controller.vy == 0){
            
            return {
                collision: true,
                vxMod: hori, 
                vyMod: 0,
                immutable: this.immutable,
                y: this.y,
                x: this.x
            }
            
        }
        if(vert != 0 && controller.vx == 0){
            if(vert < 0){
                //alert('gangshit');
                box.touchingGround = true;
                
            }
            return {
                collision: true,
                vxMod: 0,
                vyMod: vert,
                immutable: this.immutable,
                y: this.y,
                x: this.x
                
            }
        }
        if(diag.h != 0 && diag.v != 0){
            return {
                collision: true,
                vxMod: hori,
                vyMod: vert,
                immutable: this.immutable,
                y: this.y,
                x: this.x
            }
        }
        
        
        return {
            collision: false,
            vxMod: 0,
            vyMod: 0,
            immutable: this.immutable,
            y: this.y,
            x: this.x
        }
    }

   

    /**
     * collide - calculates if a collision happened
     * @param {element} box - PIXI sprite element
     * @param {controller} controller 
     * @param {number} Forward 
     * @return boolean
     */


    collide(box, controller, Forward) {
        return this.checkBoxCollision(box, controller);
    }

    collideWithEnemy(enemyBox){
        if(this.AABBCollision(this, enemyBox)) {
            return true;
        } else {
            return false;
        }
    }


}