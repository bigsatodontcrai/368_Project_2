# 368_Project_2
Overworld add-on to the previous game.

In EECS 448, our Project 3 & 4 was a platformer similar to Mario made in Javascript, CSS, and HTML with the library PixiJS.

I designed a majority of the code with the only exceptions being the test system and the enemies for the platformer. 

Using this code as a basis, I will create an overworld with a character where the person can walk around. After engaging with NPCs, the characters
will engage in the battles using the Project 1 turn-based combat.

While the physics, the controller, and the state handling differ from the platformer game, the tileset system and the method of animation can be built on
to make this style of game. Both are tileset based so the character walks around tiles. However, collision is handled a bit differently. Since nothing is rotated,
I reuse the already established Aligned Axis Bounding Box (AABB) collision method. 

The new elements that will be coded for this project are the controller, interaction with opponents, and linking the previous project with this project.

The object is to fight and defeat the beasts that ravage this place and kill anyone who walks here by collecting every bone in the yard and then finding the 
hiding spot of the creatures. You pick up a bone by simply walking over it. After collecting all 100 bones in the yard, you'll have to hunt for the hiding spot
of these creatures. After that, you will fight against the creatures with your own creatures who you've tamed to fight on your side. Defeating these creatures
is the final goal of this game.
