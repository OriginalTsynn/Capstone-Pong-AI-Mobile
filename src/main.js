

let game = new Phaser.Game({
    width: 800,
    height: 600,
    scene: [
        LoadScene, MenuScene
    ],
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    import { LoadScene } from "./scenes/LoadScene.js";
    import { MenuScene } from "./scenes/MenuScene.js";
    // import { PlayScene } from "./scenes/PlayScene.js";
});

