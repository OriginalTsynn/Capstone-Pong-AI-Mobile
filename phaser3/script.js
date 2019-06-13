// @ts-ignore
var Pong = new Phaser.Class({
    // @ts-ignore
    Extends: Phaser.Scene,

    initialize: function Pong()
    {
        // @ts-ignore
        Phaser.Scene.call(this, { key: 'pong' });

        // global variables
        this.paddle1;
        this.paddle2;
        this.ball;
        this.ball_launched = false

        this.score1 = document.querySelector(".score1");
        this.score2 = document.querySelector(".score2");
        this.scoreCount1 = 0;
        this.scoreCount2 = 0;


        this.width = config.scale.width;        // canvas width
        this.height = config.scale.height;      // canvas height
        this.paddleTop = 525;                   // y coordinate to place the ball on

        this.cursor
        this.pc
        this.velocityX= Math.random() * 500 - 250
        this.velocityY= Math.random() * 500 - 250


    },
    //  TODO  Add option of 2p or computer with scaling difficulty
    //  TODO  Add gyrometer control for mobile
    //  TODO  Add score cap
    //  TODO Make it look pretty

    // ==================================================================================================
    preload: function (){
        // image files
        this.load.image('paddle', '../assets/paddle.png')
        this.load.image('paddle2', '../assets/paddle2.png')
        this.load.image('ball', '../assets/balls.png')      //  original ball was causing hitbox issues
        this.load.image('red', '../assets/ball.png');
    },
    create: function ()
    {
        //  Enables scene borders as collisions-- left, right, top, bottom
        this.physics.world.setBoundsCollision( true, true, true, true );

        var particles = this.add.particles( 'red' );
        var emitter = particles.createEmitter({
            speed: 5,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        // Create ball - give bounciness of 1 and allow it to interact with scene border.
        //  h/2 w/2 centers the ball
        //  TODO Randomize ball starting direction and velocity
        this.ball = this.physics.add.sprite( this.width / 2, this.height / 2, 'ball', 'balls.png' ).setCollideWorldBounds( true ).setBounce( 1 ).setScale(0.5,0.5).setVelocity(350);
        // Custom data property added to ball object to track its contact with the paddle.
        this.ball.setVelocityY(this.velocityY);
        this.ball.setVelocityX(this.velocityX);

        emitter.startFollow( this.ball )
        emitter.setScale( 0.1, 0.1 );



        // Setting up the paddles
        this.paddle1 = this.physics.add.sprite( 0, this.height / 2, 'paddle')                //  initializing the sprite
        this.paddle1.setImmovable()                                                                         //  Set paddle to immovable/impassable
        this.paddle1.setScale( 0.5, 0.5 )                                                                   //  shrink paddle size by 50%
        this.paddle1.setCollideWorldBounds( true )                                                          //  confine the paddle to the canvas boundaries

        this.paddle2 = this.physics.add.sprite( this.width - 50, this.height / 2, 'paddle2' )
        this.paddle2.setImmovable()
        this.paddle2.setScale( 0.5, 0.5 )
        this.paddle2.setCollideWorldBounds( true );

        // Colliders that handle ball to paddle contact
        this.physics.add.collider( this.ball, this.paddle1, this.collisionPaddle1, null, this)
        this.physics.add.collider( this.ball, this.paddle2, this.collisionPaddle2, null, this)
        this.physics.add.collider( this.paddle1, this.paddle2, this.collisionPaddle2, null, this)


        // @ts-ignore
        cursor = this.input.keyboard.createCursorKeys();//keyboard Access
        //player 2 gets up down left right, player 1 will have wasd
        this.keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    },

    reset: function()
    {
      this.velocityX=Phaser.Math.Between(-100, 100);
      this.velocityY=100;
      this.ball.x=this.width/2;
        this.ball.y = this.height / 2;
        this.ball.setVelocityX(Math.random() * 600 - 250)
        this.ball.setVelocityY(Math.random() * 600 - 250)
      this.paddle1.x=50;
      this.paddle1.y=this.height/2;
      this.paddle2.x=this.width-50;
      this.paddle2.y=this.height/2;
      this.ball.setVelocityX(this.velocityX);
      this.ball.setVelocityY(this.velocityY);
    },
    collisionPaddle1: function (ball, paddle)
    {
        // How far the ball hits the paddle compared to midpoint of the paddle
        let offset = 0;

        // Hits the top side
        if ( ball.y < paddle.y ) {
            console.log( 'top' )
            console.log(ball)
            offset = paddle.x - ball.x;
            // Faster speed the further away it is from the center
            ball.setVelocityX( -5 * offset );
        }
        // Hits the bot side
        else if ( ball.y > paddle.y ) {
            console.log( 'bot' )
            console.log(ball)
            offset = ball.y - paddle.y;
            ball.body.angle = ball.body.angle *1.05
            // Faster speed the further away it is from the center
            ball.setVelocityX( 5 * offset );
            ball.body.angle = ball.body.angle *1.05

        } else if ( ball.y === paddle.y ) {
            console.log( 'center' )
            console.log(ball)
            ball.setVelocityY( ball.y * 1.4 )
            ball.setVelocityX( ball.y * 1.4 )
            ball.body.angle = ball.body.angle *1.05

        }
    },
    // ==================================================================================================

    update: function ()
    {

            //  Scoreboard stuff
            this.score1.innerText = this.scoreCount1;
            this.score2.innerText = this.scoreCount2;

            if(this.ball.body.blocked.right){
                this.scoreCount1 += 1
                console.log( 'exit right, p1 scores' )
                this.reset()
            }
            if ( this.ball.body.blocked.left ) {
                this.scoreCount2 += 1
                console.log( 'exit left, computer scores' )
                this.reset()
            }


            //===================================================================
            //  Player 1 controls
            if ( this.keyW.isDown )
            {
                this.paddle1.setVelocityY(-450);
            }
            else if(this.keyS.isDown)
            {
              this.paddle1.setVelocityY(450);
            }
            else if(this.keyA.isDown)
            {
              this.paddle1.setVelocityX(-450);
            }
            else if(this.keyD.isDown)
            {
                if ( this.paddle1.x == this.width / 2 || this.paddle1.x > this.width/2) {
                    this.paddle1.setVelocityX( 0 )
                } else {
                    this.paddle1.setVelocityX( 450 );
                }
            }
            else
            {
              this.paddle1.setVelocityY(0);
              this.paddle1.setVelocityX(0);
            }

            //===================================================================
            //  Player 2 controls
            // @ts-ignore
            if(cursor.up.isDown)// move up if the up key is pressed
            {
                this.paddle2.setVelocityY( -350 );

            }
            // @ts-ignore
            else if(cursor.down.isDown)// move down if the down key is pressed
            {
              this.paddle2.setVelocityY(350);
            }
            // @ts-ignore
            else if(cursor.left.isDown)// move down if the down key is pressed
            {
                if ( this.paddle2.x == this.width / 2 || this.paddle2.x < this.width/2) {
                    this.paddle2.setVelocityX( 0 )
                } else {
                    this.paddle2.setVelocityX( -350 );
                }
            }
            // @ts-ignore
            else if(cursor.right.isDown)// move down if the down key is pressed
            {
                    this.paddle2.setVelocityX( 350 );
            }
            else//stop if no key is pressed.
            {
              this.paddle2.setVelocityY(0);
              this.paddle2.setVelocityX(0);
            }
           // ==============================================
           //  Introducing our fake AI computer opponent!

           this.paddle1.body.velocity.setTo(this.ball.body.velocity.y)       // This gets paddle 2 to track the ball
        //    this.paddle1.body.velocity.x=0                               // disable movement on x axis for p2
           this.paddle1.body.velocity.x=0                               // disable movement on x axis for p2
           this.paddle1.body.maxVelocity.y = 4500                        // cap p2 y velocity
           this.paddle1.body.maxVelocity.x = 4500                        // cap p2 x velocity
           if (this.ball.x >= this.width/2 ) {
                   this.paddle1.body.setVelocityX(0)
           }else {
                  this.paddle1.body.setVelocityX(this.ball.body.velocity.y*2)
                   }
           this.paddle2.body.velocity.setTo(this.ball.body.velocity.y)       // This gets paddle 2 to track the ball
        //    this.paddle1.body.velocity.x=0                               // disable movement on x axis for p2
           this.paddle2.body.maxVelocity.y = 450                        // cap p2 y velocity
           this.paddle2.body.maxVelocity.x = 450                        // cap p2 x velocity
           if (this.ball.x <= this.width/2 ) {
                   this.paddle2.body.setVelocityX(0)
               } else {
                       this.paddle2.body.setVelocityX(this.ball.body.velocity.y*2)
                   }



        }


    })
    // ==================================================================================================
    var config = {
        // @ts-ignore
        type: Phaser.AUTO,
        backgroundColor: '#000',
        scale: {
            width: 800,
            height: 600,
        },
        scene: [Pong],
        physics: {
            default: 'arcade',
        },
    };


    // @ts-ignore
    let game = new Phaser.Game(config);

    const instructionsButton = document. querySelector(".instructions");

