
class ClearScene extends Phaser.Scene
{
    constructor ()
    {
        super({ "key": "clear_scene" });
    }

    preload ()
    {
        console.log('prelaoding clear screen')
        // progressBar();
        // Load images
        this.load.image('clear_screen', 'assets/clear-screen.JPG');
    }

    create ()
    {
        this.add.image('clear_screen', 0, 0).setScale(0.5).setOrigin(0).setVisible(true);
    }


    update ()
    {
    }
}

var clear_scene = new ClearScene();  // this has to match up with what's in index.html?