# Unit 4 project
##  Pong!
##  with AI
##  mobile native app

    Plans so far:
    1.  Research canvas + phaser and implement for pong
        1.  https://phaser.io/tutorials/getting-started-phaser3
            1.  What does pong need?
                1.  1 player controlled paddle
                    1.  will need:
                        1.  sprite
                        2.  physics
                            1.  hit box
                            2.  acceleration
                        3.  initial position
                        4.  event listener to move paddle
                2.  1 computer controlled paddle
                    1.  will need:
                        1.  may start with a hard-coded computer opponent that doesn't learn.
                        2.  will need to research machine learning, Q algorithim (reinforcement matrix)
                        3.  sprite
                        4.  physics
                            1.  hit box
                            2.  acceleration
                3.  1 ball
                    1.  will need:
                        1.  sprite
                        2.  physics
                            1.  acceleration/velocity
                            2.  will need to redirect direction on contact with a hitbox
                            3.  will need to be deployed in the middle at the start of every round
                                1.  will need to randomize speed and direction each time it starts
                4.  2 boundary walls that cause a bounce
                    1.  contact with these walls will cause the ball to change it's direction/vector
                5.  2 boundary walls that count as a goal
                    1.  any time the ball goes past the paddle
                        1.  add a point to the side that scored
                        2.  replace the ball in the middle of the screen
                        3.  random velocity
                        4.  random direction (not entirely random, no straight up or down)
                    2.  A scoreboard to keep track of points
                6.  collision physics
                7.  acceleration physics?
    2.  Research machine learning utilizing reinforcement learning
        1.  Things the AI will need to keep track of:
            1.  AI paddle
            2.  ball position
            3.  ball trajectory
            4.  ball velocity
            5.  opponent paddle?
    3.  Research React Native to make it a mobile app
        1.  This may cause a complete refactoring of code, and might not get implemented
