
# Pong!
[2 axis pong](http://pingpangpong.surge.sh/) <br>
Welcome to the classic-ish game of Pong!  An old favorite, with a couple new twists, and a few more still to come!  Traditionally, Pong is only played on one axis, X or Y.  This version is played on both! <br>
This should be used for entertainment purposes, and it solves a common problem many of us face everyday:  BOREDOM

## Brief Example
Reference-style:
![alt text][logo]

[logo]: https://github.com/OriginalTsynn/Capstone-Pong-AI-Mobile/blob/master/screenshot.png "Pong"

##  List of Features / User Stories

### Currently implemented features:
        1.  Player vs computer
        2.  Fun collision physics!
            1.  The further you hit the ball from the midpoint of the paddle greatly increases the acceleration of the ball!
                1.  If you hit the ball closer to the center of the paddle, you end up bunting the ball.
                2.  If you end up hitting on the very top or very bottom of the paddle, you spike it!
                3.  Because of the addition of the second axis, you can also "catch" the ball on the back side of your paddle and "throw" it at a rather rapid rate once it climbs to the end of your paddle
### Features yet to be implemented:
        1. Player vs Player on computer
        2. Player vs Player on mobile
        3. Demo Mode (Computer vs Computer)
        4. Difficulty selection
        5. Scenes (through Phaser)
        6. A score cap/game over terms.
        7.  COMBAT FUNCTIONALITY

## List of Technologies Used
This project is fairly light on technologies used.  In its current iteration, this project is done in HTML and JavaScript, as well as utilizing a very powerful library known as Phaser.

    Phaser links:
        https://phaser.io/
        https://photonstorm.github.io/phaser3-docs/index.html
        https://labs.phaser.io/
        https://rexrainbow.github.io/phaser3-rex-notes/docs/site/

Technlogogies that are going to be added in the future: <br>
    NLP, Machine Learning utilizing Q Algorithims and the MDP (Markov Decision Process) <br>
    As well as react-game-kit and react-native (for a better over all mobile experience)<br>



## Installation Instructions / Getting Started
Pretty simple to set up and start modifying, now libraries were actually downloaded via usage of

        <script src="//cdn.jsdelivr.net/npm/phaser@3.17.0/dist/phaser.js"></script>
So all you have to do to get started is fork this library, and clone it down


## Contribution Guidelines
If you'd like to contribute, please fork [this repository](https://github.com/OriginalTsynn/Capstone-Pong-AI-Mobile)


If you run into any issues, or find any bugs with the code [please submit an issue](https://github.com/OriginalTsynn/Capstone-Pong-AI-Mobile/issues)







