import { CST } from "../CST"
import { MenuScene } from "./MenuScene";

export class LoadScene extends Phaser.Scene
{
    constructor()
    {
        super( {
            key: CST.SCENES.LOAD
        })
    }
    init ()
    {
    //instantiate plugins, recieve data from other scenes


    }

    preload ()
    {
        //load sprites, images, audio
        this.preload.image("title_bg", "../../dist/assets/title_bg.png")    //  title background image
        this.preload.image("options_button", "../../dist/assets/options_button.png")    //  options button
        this.preload.image("play_button", "../../dist/assets/play_button.png")
        this.preload.image("play_button", "../../dist/assets/instructions_button.png")
        this.preload.image( "logo", "../../dist/assets/logo.png" )
        this.preload.image("paddle3", "../../dist/assets/paddle3.png")

        //  loading bar initializing
        let loadingBar = this.add.graphics( {
            fillStyle: {
            color: 0xfffff
            }
        } )

        this.load.on( "progress", ( percent ) =>{
            loadingBar.fillRect( 0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50 )
            console.log("percent: " + percent )
        })


//  last preload bracket
    }


    create() {
        this.scene.start( CST.SCENES.MENU, "Hello from load scene" )
        //to launch in parallel
        // this.scene.launch(/*key of scene */ )
        //to launch scene dynamically
        //  route, name, autostartvalue
        // this.scene.add(CST.SCENES.MENU, MenuScene, false)


    }





    //last bracket
}
