# 368_Project_2
Overworld add-on to the previous game.

In EECS 448, our Project 3 & 4 was a platformer similar to Mario made in Javascript, CSS, and HTML with the library PixiJS.

I designed a majority of the code with the only exceptions being the test system and the enemies for the platformer. 

Using this code as a basis, I will create an overworld with a character where the person can walk around. After engaging with NPCs, the characters
will engage in the battles using the Project 1 turn-based combat.

While the physics, the controller, and the state handling differ from the platformer game, the tileset system and the method of animation can be built on
to make this style of game. Both are tileset based so the character walks around tiles. However, collision is handled a bit differently. Since nothing is rotated,
I can still use the already established Aligned Axis Bounding Box (AABB) collision method, but it will be a bit simpler in that I don't have to be concerned with
diagional collisions as the character will not have 8-directional movement but only 4-directional. 

The new elements that will be coded for this project are the controller, interaction with opponents, and linking the previous project with this project.

WASD keys will be used to move in 4 directions of the map. The map will be a maze where you begin at the center. Players can walk faster if the K key is held down. Player can interact with characters by bumping
into them. When the player interacts with an NPC, a dialogue will play, and then they will engage in battle. There are 5 characters and each will have the 
teams that weren't picked in the introduction. After winning the battles, you will return to the overworld section. After losing the battle, the game will
not return to the overworld section and you'll have to reload. 
