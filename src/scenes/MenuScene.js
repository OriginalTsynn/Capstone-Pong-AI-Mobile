import { CST } from "../CST"

export class MenuScene extends Phaser.Scene
{
    constructor()
    {
        super( {
            key: CST.SCENES.MENU
        })
    }

    init (data)
    {
        console.log( data )
        console.log ("Got the data!")

    }

    create ()       //  creating the menu screen
    {
        //  as always in phaser, create images in Z order
        this.add.image( 0, 0, "title_bg" ).setOrigin( 0 )
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, "logo").setDepth(1)
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button").setDepth(1)
        let optionsButton = this.add.image(this.game.renderer.width / 2 + 50, this.game.renderer.height / 2, "options_button").setDepth(1)
        let instructionsButton = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2, "instructions_button").setDepth(1)

        //  sprite
        let hoverSprite = this.add.sprite( 100, 100, "paddle3" )
        hoverSprite.setScale( 2 )
        hoverSprite



        //   setting up button interactivity
        playButton.setInteractive()

        playButton.on( "pointerover", () =>
        {
            console.log("hover")
        })
        playButton.on( "pointerout", () =>
        {
            console.log("out of here")
        })
        playButton.on( "pointerup", () =>
        {
            console.log("DA GATES!")
        })

        //  last create bracket
    }





//  last bracket
}
