// TODO: some loading screen
// TODO: language selection

var temp_here;
var current_text;

var text_x;
var text_y;
var text_style = {
            fontFamily: 'MS Mincho',
            fontSize: '21px',
            fontStyle: 'bold',
            backgroundColor: null,
            color: '#41c3f2',
            stroke: '#41c3f2',
            strokeThickness: 0,
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: '#000',
                blur: 0,
                stroke: false,
                fill: false
            },
            align: 'left',  // 'left'|'center'|'right'|'justify'
            padding: {
                left: 0,
                right: 0,
                top: 5,
                bottom: 0,
            }
        };

var game_text;

var language;

// Set up variables
var mid_x = 864 / 2;  // TODO: put these in separate config file?
var mid_y = 540 / 2;
var state = 'START_STATE';
var prev_state = 'START_STATE';  // For detecting state changes

// Notes: 
// State: Ok so I need to organize this (TODO)
//      - START_STATE: Start screen, before player clicks start
//      - PLAY_STATE_[]: Prologue?
//      - 

class Example extends Phaser.Scene
{
    constructor ()
    {
        super({ "key": "start_scene" });
    }

    preload ()
    {
        console.log('prelaoding start screen')
        // progressBar();
        // Load images
        this.load.image('start_bg', 'assets/bg_1.png');
        this.load.image('start_button', 'assets/start_button.png');
        this.load.image('start_button_bright', 'assets/start_button_bright.png');
        this.load.image('ceiling_bg', 'assets/bg_2.png');
        this.load.image('button_1', 'assets/button_1.png');
        this.load.image('bg_1', 'assets/bg_1.png');
        this.load.image('option_en', 'assets/en.png');
        this.load.image('option_jp', 'assets/jp.png');

        // Load text
        // TODO: add language options
        this.load.json('game_text', 'assets/game_text_jp.json');

        // Setup for main in-game text, should be displayed on the bottom center
        text_x = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        text_y = this.cameras.main.worldView.y + this.cameras.main.height - 50;
        // text_style = {
        //     fontFamily: 'MS Mincho',
        //     fontSize: '21px',
        //     fontStyle: '',
        //     backgroundColor: null,
        //     color: '#41c3f2',
        //     stroke: '#fff',
        //     strokeThickness: 0,
        //     shadow: {
        //         offsetX: 0,
        //         offsetY: 0,
        //         color: '#000',
        //         blur: 0,
        //         stroke: false,
        //         fill: false
        //     },
        //     align: 'left',  // 'left'|'center'|'right'|'justify'
        //     padding: {
        //         left: 0,
        //         right: 0,
        //         top: 0,
        //         bottom: 0,
        //     }
        // }
    }

    create ()
    {
        // Set up start screen
        var start = this.add.image(mid_x, mid_y, 'start_bg');
        start.scale = 0.5;  

        // Get game text
        game_text = this.cache.json.get('game_text'); 

        // Set up start button
        var start_button = this.add.sprite(700, 182, 'start_button_bright').setScale(0.5);
        start_button.setInteractive()
        start_button.alpha = 0.5;

        // Set up language options
        var option_jp = this.add.sprite(632, 230, 'option_jp').setScale(0.5).setOrigin(0);
        option_jp.setInteractive()
        option_jp.alpha = 0.5;
        option_jp.setVisible(false);

        var option_en = this.add.sprite(630, 275, 'option_en').setScale(0.5).setOrigin(0);
        option_en.setInteractive()
        option_en.alpha = 0.5;
        option_en.setVisible(false);


        // Set up camera behavior
        this.cameras.main.on('camerafadeoutstart', function () {
            console.log('fade start');
        }, this);

        this.cameras.main.on('camerafadeoutcomplete', function () {
            console.log('fade done');
            if (state == 'PLAY_STATE_1') {
                state = 'PLAY_STATE_2';
            }
        }, this);

        this.cameras.main.on('camerafadeincomplete', function () {
            console.log('fade in done');
            if (state == 'PLAY_STATE_2') {
                state = 'PLAY_STATE_3';
            }
        }, this);


        //  Start button:
        //      - Hover: Glow
        //      - Click: Go to play state
        start_button.on('pointerover', function () {
            start_button.alpha = 1.0;
        });

        start_button.on('pointerout', function () {
            start_button.alpha = 0.5;
        });    

        start_button.once('pointerdown', function () {
            start_button.alpha = 1.0;
            option_jp.setVisible(true);
            option_en.setVisible(true);
            // TODO: cleanup
            state = 'PLAY_STATE_1';
            // this.cameras.main.fade(2000, 0, 0, 0);
        }, this);

        option_jp.on('pointerover', function () {
            option_jp.alpha = 1.0;
        });

        option_jp.on('pointerout', function () {
            option_jp.alpha = 0.5;
        });    

        option_jp.once('pointerdown', function () {
            option_jp.alpha = 1.0;
            // TODO: cleanup
            state = 'PLAY_STATE_1';
            language = 'JP';
            this.cameras.main.fade(2000, 0, 0, 0);
            this.scene.pause();
            this.scene.start('main_game');
        }, this);

        option_en.on('pointerover', function () {
            option_en.alpha = 1.0;
        });

        option_en.on('pointerout', function () {
            option_en.alpha = 0.5;
        });    

        option_en.once('pointerdown', function () {
            option_en.alpha = 1.0;
            // TODO: cleanup
            state = 'PLAY_STATE_1';
            language = 'EN';
            this.cameras.main.fade(2000, 0, 0, 0);
            this.scene.pause();
            this.scene.start('main_game');
        }, this);
    }


    update ()
    {
        // Looks like update is polling?, only do action when state changes
        if (state != this.prev_state){
            console.log('state changed: ' + state);

            if (state == 'PLAY_STATE_2') {
                this.add.image(mid_x, mid_y, 'ceiling_bg').setScale(0.5);
                // TODO: maybe update this to have a blinking effect/shift in to focus
                this.cameras.main.fadeIn(2000); 
                console.log('display ceiling');
            } else if (state == 'PLAY_STATE_3') {
                current_text = this.add.text(text_x, text_y, game_text.ceiling_1, text_style).setOrigin(0.5);
                console.log(game_text.ceiling_1);
                this.input.on('pointerdown', this.clickHandler, this);
            }
            this.prev_state = state;
        }
    }

    clickHandler()
    {
        // Handle mouse clicks during Play state
        console.log('click handler');
        if (state == 'PLAY_STATE_3') {
            current_text.setText(game_text.ceiling_2);
            state = 'PLAY_STATE_4';
        } else if (state == 'PLAY_STATE_4') {
            current_text.setText(game_text.light_1);
            state = 'PLAY_STATE_5';
        } else if (state == 'PLAY_STATE_5') {
            current_text.destroy();
            this.prologuePopup();
        }
    }

    prologuePopup()
    {
        // Show prologue popup
        console.log('Display prologue popup');
        var button_1 = this.createButton('button_1', game_text.button_1, mid_x, mid_y, 0.5);
        button_1.on('pointerdown', function () {
            button_1.alpha = 1.0;
            this.add.image(mid_x, mid_y, 'bg_1').setScale(0.5);
            state = 'MAIN_1'
            console.log('button clicked');
            // TODO: this 'main_game' is a key associated with the specific instance(?) of the scene?
            this.scene.pause();
            this.scene.start('main_game');
        }, this);
        state = 'PLAY_STATE_6';
    }

    createButton(img, text, x, y, scale)
    {
        // Create a button with given image, text, position, scale
        // and make brighter on hover
        // Behavior on click should be set after calling this function
        var button = this.add.image(x, y, img).setScale(scale);
        var button_text = this.add.text(x-75, y-9, text, text_style); // TODO: find better way to do this
        button_text.color = '#ffffff'
        button.setInteractive();
        button.alpha = 0.5;
        button.on('pointerover', function () {
            button.alpha = 1.0;
        });
        button.on('pointerout', function () {
            button.alpha = 0.5;
        });    
        return button;
    }
}

var start_scene = new Example();  // this has to match up with what's in index.html?