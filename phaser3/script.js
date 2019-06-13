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
        this.velocityX= Math.random() * 1000 - 350
        this.velocityY= Math.random() * 1000 - 350


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
            speed: 20,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        // Create ball - give bounciness of 1 and allow it to interact with scene border.
        //  h/2 w/2 centers the ball
        //  TODO Randomize ball starting direction and velocity
        this.ball = this.physics.add.sprite( this.width / 2, this.height / 2, 'ball', 'balls.png' )
        this.ball.setCollideWorldBounds( true )
        this.ball.setBounce( 1, 1.01 )
        this.ball.setScale( 0.5, 0.5 )
        this.ball.setVelocity( 350 );
        this.ball.setVelocityY(this.velocityY);
        this.ball.setVelocityX( this.velocityX );


        emitter.startFollow( this.ball )
        emitter.setScale( 0.05, 0.05 );



        // Setting up the paddles
        this.paddle1 = this.physics.add.sprite( 0, this.height / 2, 'paddle')       //  initializing the sprite
        this.paddle1.setImmovable()                                                                         //  Set paddle to immovable/impassable
        this.paddle1.setScale( 0.5, 0.5 )                                                                   //  shrink paddle size by 50%
        this.paddle1.setCollideWorldBounds( true )                                                          //  confine the paddle to the canvas boundaries

        this.paddle2 = this.physics.add.sprite( this.width - 50, this.height / 2, 'paddle2' )
        this.paddle2.setImmovable()
        this.paddle2.setScale( 0.5, 0.5 )
        this.paddle2.setCollideWorldBounds( true );

        // Colliders that handle ball to paddle contact
        this.physics.add.collider( this.ball, this.paddle1, this.collisionPaddle1, null, this)
        this.physics.add.collider( this.ball, this.paddle2)
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
        //! console.log('pre angle mod: ' + ball.body.angle.toFixed(5 ))
        // ball.angle = ball.angle*2
        // console.log( 'post angle mod: ' + ball.body.angle.toFixed(5) )


        // console.log('paddle1 hit-- ball.x: ' + ball.x + "  and ball.y: " + ball.y)
        // console.log('paddle1 hit-- ball.x: ' + ball.body.x + "  and ball.y: " + ball.y)
        // console.log( ball.body )
        console.log(paddle.body)

        // How far the ball hits the paddle compared to midpoint of the paddle
        let offset = 0;

        // Hits the top side
        if ( ball.y < paddle.y ) {
            // console.log( 'top' )
            // console.log(ball)
            offset = ball.y - paddle.y;
            // Faster speed the further away it is from the center
            // ball.setVelocityY( -5 * offset );
            ball.setVelocityX( -5 * offset );
            // ball.body.angle = ball.body.angle + 2

        }
        // Hits the bot side
        else if ( ball.y > paddle.y ) {
            // console.log( 'bot' )
            // console.log(ball)
            offset = ball.y - paddle.y;
            // ball.body.angle = ball.body.angle *250
            // Faster speed the further away it is from the center
            // ball.setVelocityY( 5 * offset );
            ball.setVelocityX( 5 * offset );

        } else if ( ball.y === paddle.y ) {
            // console.log('paddle1 hit-- ball.x: ' + ball.x + "  and ball.y: " + ball.y)
            console.log(ball.body)
            // ball.setVelocityY(Math.random() * 500)
            // ball.body.angle = ball.body.angle *1.10

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
        if ( this.ball.body.blocked.up ) {
            // console.log('top bound hit-- ball.x: ' + this.ball.velocityX + "  and ball.y: " + this.ball.y)
            console.log( this.ball.body.angle )
            // this.ball.body.angle.RotateTo(this.ball.body.angle, this.ball.body.angle*1.1)
            console.log(this.ball.Phaser.Math.Angle(ball))

        }
        if ( this.ball.body.blocked.down ) {
            console.log(this.ball.body)
            // console.log('top bound hit-- ball.x: ' + this.ball.velocityX + "  and ball.y: " + this.ball.y)
        // this.ball.body.angularAcceleration = this.ball.body.angle * 2
        // this.ball.velocity = this.ball.velocity*.98
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
        this.paddle1.body.velocity.setTo(this.ball.body.velocity.y)         // This gets paddle 2 to track the ball
        //    this.paddle1.body.velocity.x=0                                   // disable movement on x axis for p2
        this.paddle1.body.maxVelocity.y = 450                               // cap p2 y velocity
        this.paddle1.body.maxVelocity.x = 450                                   // cap p2 x velocity

        if (this.ball.x >= (this.width/2 -30) ) {
                this.paddle1.body.setVelocityX(0)
        }else {
                this.paddle1.body.setVelocityX(this.ball.body.velocity.y*2)
                }
        this.paddle2.body.velocity.setTo(this.ball.body.velocity.y)       // This gets paddle 2 to track the ball
    //    this.paddle2.body.velocity.x=0                               // disable movement on x axis for p2
        this.paddle2.body.maxVelocity.y = 400                        // cap p2 y velocity
        this.paddle2.body.maxVelocity.x = 400                        // cap p2 x velocity

        if ( this.ball.x <= this.width / 2 + 30 ) {
               this.paddle2.body.setVelocityX(0)
           } else {
                   this.paddle2.body.setVelocityX(this.ball.body.velocity.y*2)
               }

    if ( this.ball.x < this.paddle1.x ) {       //  cheat mode for p1,
        this.paddle1.x = 50
        this.paddle1.y = this.ball.y
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
            arcade: {
                debug: true
            }        },
    };


    // @ts-ignore
    let game = new Phaser.Game(config);

    const instructionsButton = document. querySelector(".instructions");

