// TODO: inventory: disable back button when focusing on object
// - udpate text when bottle is removed
// - add interactions for laptop
// - add interactions for drawers
// - add 21 puzzle logic?

var text1;
var on_curtain;
var door_bg;
var door_bg_closeup_dark;

var postcard_scale = 0.05;

var test;

var curtain_opened = false;

const DARK_TINT = 0x31628D;
const LIGHT_BLUE = '#79c7d1';
const LIGHT_GREEN = 0x16f02b;
const LIGHT_GREEN_TEXT = '#38ebc4';
const PINK = 0xf2168b;

const NUM_MOVES = 10;

var window_knock_sound_played = false;

var inventory_size = 10;

var buffer_len = 17;

var middle_drawers_opened = false;
var botton_drawers_opened = false;

var laptop_liquid_anim_played = false;


class MainGame extends Phaser.Scene
{
    // Initial room
    constructor ()
    {
        super({ "key": "main_game", pack: {
                files: [
                    { type: 'image', key: 'computer', url: 'assets/computer.png' }
                ]
            }});
    }

    preload ()
    {
        console.log('preloading main scene');
        reloadCache(this);
        // testPreload(this);
        progressBar(this);
        // Load images
        this.load.image('bg_4', 'assets/bg_4.png');
        this.load.image('bg_bright', 'assets/bg_8.png');
        this.load.image('button', 'assets/button_1.png');
        this.load.image('door_bg_dark', 'assets/bg_5.png');
        this.load.image('door_bg_bright', 'assets/bg_6.png');
        this.load.image('door_close_dark', 'assets/bg_7.png');
        this.load.image('door_close_bright', 'assets/bg_9.png');
        this.load.image('curtain_bg_bright', 'assets/bg_10.png');
        this.load.image('curtain_bg_dark', 'assets/curtain_bg_dark.png');
        this.load.image('desk_bg_bright', 'assets/bg_11.png');
        this.load.image('desk_bg_dark', 'assets/bg_12.png');
        this.load.image('drawers_bg_bright', 'assets/bg_13.png?' + Math.random());
        this.load.image('drawers_bg_dark', 'assets/bg_14.png');
        this.load.image('drawers_bg_open', 'assets/bg_15.png');
        this.load.image('bg_laptop_dark', 'assets/bg-laptop-dark.png');
        this.load.image('bg_laptop_bright', 'assets/bg-laptop-bright.png?' + Math.random());
        this.load.image('bg_drawers_close_bright', 'assets/bg-drawers-close-bright.png?' + Math.random());
        this.load.image('bg_drawers_close_dark', 'assets/bg-drawers-close-dark.png?' + Math.random());
        this.load.image('bg_middle_drawers_open', 'assets/middle-drawers-open.png?' + Math.random());
        this.load.image('bg_laptop_red', 'assets/laptop-bg-2.png?' + Math.random());
        this.load.image('bg_bottom_drawers_open', 'assets/bg-bottom-drawers-open.png?' + Math.random());
        this.load.image('clear_screen', 'assets/clear-screen.JPG?' + Math.random());
        this.load.image('bg_keyboard', 'assets/keyboard.png?' + Math.random());


        // Sprites
        this.load.image('bottle', 'assets/bottle.png');
        this.load.image('bottle_empty', 'assets/bottle_empty.png');
        this.load.image('bottle_open', 'assets/bottle_open.png');
        this.load.image('bottle_open_empty', 'assets/bottle_open_empty.png');
        this.load.image('sprite_1', 'assets/blood-sprite.png');
        this.load.image('partial_bottle', 'assets/partial_bottle.png');
        this.load.image('item_box', 'assets/item_box.png');
        this.load.image('bandaid', 'assets/bandaid.png');
        this.load.image('drawers_key', 'assets/key-sprite.png');
        this.load.image('partial_bandaid', 'assets/partial_bandaid.png');
        this.load.image('box', 'assets/box.png');
        this.load.image('postcard', 'assets/postcard-pieces/postcard.png');
        this.load.image('postcard-1', 'assets/postcard-pieces/piece-1.png');
        this.load.image('postcard-2', 'assets/postcard-pieces/piece-2.png');
        this.load.image('postcard-3', 'assets/postcard-pieces/piece-3.png');
        this.load.image('postcard-4', 'assets/postcard-pieces/piece-4.png');
        this.load.image('postcard-5', 'assets/postcard-pieces/piece-5.png');
        this.load.image('postcard-window', 'assets/postcard-pieces/window-piece.png');
        this.load.image('postcard-door', 'assets/postcard-pieces/door-piece.png');
        this.load.image('puzzle_box_1', 'assets/puzzle_box_1.png');
        this.load.image('puzzle_box_2', 'assets/puzzle_box_2.png');
        this.load.image('puzzle_box_open_1', 'assets/puzzle-box-open-1.png');
        this.load.image('puzzle_box_open_2', 'assets/puzzle-box-open-2.png');
        this.load.image('bandaid_open', 'assets/bandaid-open.png');
        this.load.image('bandaid_open_2', 'assets/bandaid-open-2.png');
        this.load.image('bandaid_open_3', 'assets/bandaid-open-3.png');
        this.load.image('window_arrow_green', 'assets/arrows/window-arrow-green.png');
        this.load.image('window_arrow_red', 'assets/arrows/window-arrow-red.png');
        this.load.image('door_arrow_1_pink', 'assets/arrows/main-door-arrow-1.png');
        this.load.image('door_arrow_1_red', 'assets/arrows/main-door-arrow-2.png');
        this.load.image('door_arrow_2_pink', 'assets/arrows/door-arrow-1.png');
        this.load.image('door_arrow_2_red', 'assets/arrows/door-arrow-2.png');
        this.load.image('door_arrow_3_pink', 'assets/arrows/door-close-arrow-1.png');
        this.load.image('door_arrow_3_red', 'assets/arrows/door-close-arrow-2.png');
        this.load.image('postcard_letters', 'assets/postcard-letters.png');
        this.load.image('laptop_login_screen', 'assets/laptop-login-screen.png?' + Math.random());
        this.load.image('laptop_email_screen', 'assets/laptop-email-screen.png?' + Math.random());
        this.load.image('email_template', 'assets/email-template.png?' + Math.random());
        this.load.image('brush', 'assets/brush.png?' + Math.random());
        this.load.image('lighter_off', 'assets/lighter-off.png?' + Math.random());
        this.load.image('lighter_on', 'assets/lighter-on.png?' + Math.random());
        this.load.image('green_light', 'assets/green-light.png?' + Math.random());
        this.load.image('red_light', 'assets/red-light.png?' + Math.random());
        this.load.image('main_screen_laptop_red', 'assets/main-screen-laptop-red.png?' + Math.random());
        this.load.image('lighter_in_drawers', 'assets/lighter-in-drawers.png?' + Math.random());
        this.load.image('glass_key_in_drawers', 'assets/glass-key-in-drawers.png?' + Math.random());
        this.load.image('glass_key', 'assets/glass-key.png?' + Math.random());




        // Puzzle pieces
        loadPuzzlePieces(this);

        // Animations
        this.load.image('sparkle1', 'assets/animations/sparkle1.png');
        this.load.image('sparkle2', 'assets/animations/sparkle2.png');
        this.load.image('sparkle3', 'assets/animations/sparkle3.png');
        this.load.image('sparkle4', 'assets/animations/sparkle4.png');
        this.load.image('sparkle5', 'assets/animations/sparkle5.png');
        this.load.atlas('flip', 'assets/animations/flip.png?' + Math.random(), 'assets/animations/flip_atlas.json?' + Math.random());
        this.load.atlas('drip', 'assets/animations/drip/drip.png?' + Math.random(), 'assets/animations/drip/drip_atlas.json?' + Math.random());
        this.load.atlas('laptop_liquid', 'assets/animations/laptop-liquid/laptop_liquid.png?' + Math.random(), 'assets/animations/laptop-liquid/laptop_liquid_atlas.json?' + Math.random());
        // ?' + Math.random()

        // Audio
        this.load.audio('bgm', 'assets/sound_effects/waves1.mp3');
        this.load.audio('sound_glass', 'assets/sound_effects/glass_clink.mp3');
        this.load.audio('sound_door', 'assets/sound_effects/locked_door.mp3');
        this.load.audio('sound_window', 'assets/sound_effects/window_click.mp3');
        this.load.audio('sound_key', 'assets/sound_effects/key_pick_up.mp3');
        this.load.audio('sound_drawers_unlock', 'assets/sound_effects/drawers_unlock.mp3');
        this.load.audio('sound_drawers_open', 'assets/sound_effects/drawers_open.mp3');
        this.load.audio('sound_piece', 'assets/sound_effects/piece-move.mp3');
        this.load.audio('sound_piece_2', 'assets/sound_effects/piece-cannot-move.mp3');
        this.load.audio('sound_paper', 'assets/sound_effects/paper.mp3');
        this.load.audio('sound_puzzle_box_unlock', 'assets/sound_effects/puzzle-box-unlock.mp3');
        this.load.audio('sound_window_knock', 'assets/sound_effects/window_knock.mp3');
        this.load.audio('sound_window_lock', 'assets/sound_effects/locked-window.mp3');
        this.load.audio('sound_window_lock_2', 'assets/sound_effects/locked-window-2.mp3');
        this.load.audio('sound_blood', 'assets/sound_effects/blood.mp3');
        this.load.audio('sound_bandaid', 'assets/sound_effects/bandaid.mp3');
        this.load.audio('sound_door_knock', 'assets/sound_effects/door-knock.mp3');


        // Misc
        this.load.image('dark_tint', 'assets/dark.png');

        if (language == 'JP') {
            this.load.json('game_text', 'assets/game_text_jp.json?' + Math.random());
        } else if (language == 'EN') {
            this.load.json('game_text', 'assets/game_text_en.json?' + Math.random());
        } else {
            this.load.json('game_text', 'assets/game_text_jp.json?' + Math.random());
        }
        
        // this.load.start();

        text_x = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        text_y = this.cameras.main.worldView.y + this.cameras.main.height - 30;
    }

    create ()
    {
        // Set up main background
        test = 'in create';

        state = 'MAIN_ROOM';
        // this.load.json('game_text', 'assets/game_text_jp.json');
        // this.load.json('game_text', 'assets/game_text_jp.json');
        // this.load.start();

        this.top_drawer_unlocked = false;
        this.medium_drawer_unlocked = false;
        this.bottom_drawer_unlocked = false;

        this.game_text2 = this.cache.json.get('game_text'); 

        // Setup clickable areas
        // Curtain
        // left: 344, right: 550, top: 127, bottom: 280
        this.curtain = this.add.rectangle(344, 127, 200, 153, 0x6666ff).setOrigin(0);
        this.curtain.visible = true;
        this.curtain.setInteractive({useHandCursor: true}); 
        this.curtain.on('pointerup', function () {
            //this.curtain.alpha = 0;
            this.curtainClickHandler();
            state = 'CURTAIN_1';
        }, this);


        // Door
        // left: 344, right: 550, top: 127, bottom: 280
        this.door = this.add.rectangle(0, 111, 130, 323, 0x6666ff).setOrigin(0);
        this.door.visible = true;
        this.door.setInteractive({useHandCursor: true}); 
        this.door.on('pointerup', function () {
            //this.curtain.alpha = 0;
            this.doorClickHandler();
            state = 'DOOR_1';
        }, this);

        // Desk
        // left: 344, right: 550, top: 127, bottom: 280
        this.laptop = this.add.rectangle(413, 282, 30, 22, 0x6666ff).setOrigin(0); // laptop
        this.desk = this.add.rectangle(329, 305, 200, 20, 0x6666ff).setOrigin(0);
        this.laptop.setInteractive({useHandCursor: true});
        this.desk.setInteractive({useHandCursor: true}); 
        this.laptop.on('pointerup', function () {
            //this.curtain.alpha = 0;
            this.deskClickHandler();
            state = 'DESK_1';
        }, this);
        this.desk.on('pointerup', function () {
            //this.curtain.alpha = 0;
            this.deskClickHandler();
            state = 'DESK_1';
        }, this);

        // Drawers
        this.drawers = this.add.rectangle(559, 356, 160, 107, 0x6666ff).setOrigin(0);
        this.drawers.setInteractive({useHandCursor: true}); 
        this.drawers.on('pointerup', function () {
            this.button.setVisible(false);
            this.button_text.setVisible(false);
            this.curtain_text.setText(this.game_text2.drawers_1);
            this.drawersClickHandler();
            state = 'DRAWERS_1';
        }, this);

        // Door 2
        this.door2 = this.add.rectangle(240, 431, 150, 50, 0x6666ff).setOrigin(0);
        this.door2.visible = false;
        this.door2.setInteractive({useHandCursor: true}); 
        this.door2.on('pointerup', function () {
            this.updateButton(this.button, this.button_text, this.game_text2.door_button_1, 397, 441);
            this.button.setVisible(true);
            this.button_text.setVisible(true);
            this.curtain_text.setText(this.game_text2.under_door);
            // state = 'DOOR_CLOSE_1';
        }, this);

        // 247 306
        // Doorknob
        this.doorknob = this.add.rectangle(247, 306, 25, 25, 0x6666ff).setOrigin(0);
        this.doorknob.visible = false;
        this.doorknob.setInteractive({useHandCursor: true}); 
        this.doorknob.on('pointerup', function () {
            // this.updateButton(this.button, this.button_text, this.game_text2.door_button_1, 271, 321);
            if (!this.inventory.includes(this.glass_key)) {
                this.button.setVisible(false);
                this.button_text.setVisible(false);
                this.sound_door.play();
                // state = 'DOOR_CLOSE_1';
                this.curtain_text.setText(this.game_text2.door_locked);
            } else {
                setButtonVisibility(this.main_door_button, true);
            }
            
        }, this);

        // Close door
        this.close_door = this.add.rectangle(215, 0, 540, 327, 0x6666ff).setOrigin(0);
        this.close_door.visible = false;
        this.close_door.setInteractive({useHandCursor: true}); 
        this.close_door.on('pointerup', function () {
            // this.updateButton(this.button, this.button_text, this.game_text2.door_button_1, 394, 238);
            // this.button.setVisible(true);
            // this.button_text.setVisible(true);
            if (curtain_opened) {
                if (!this.inventory.includes(this.bottle)) {
                    this.curtain_text.setText(this.game_text2.door_bottle);
                }
            } else {
                this.curtain_text.setText(this.game_text2.dark_door_1);
            }
        }, this);

        // Curtains (close)
        this.curtains = this.add.rectangle(145, 30, 589, 475, 0x6666ff).setOrigin(0);
        this.curtains.visible = false;
        this.curtains.setInteractive({useHandCursor: true}); 
        this.curtains.on('pointerup', function () {
            if (curtain_opened) {
                this.curtain_text.setText(this.game_text2.curtains_close_bright);
            } else {
                this.updateButton(this.button, this.button_text, this.game_text2.open_curtain, 361, 196);
                this.updateButton(this.button2, this.button2_text, this.game_text2.close_curtain, 361, 275);
                this.button.setVisible(true);
                this.button_text.setVisible(true);
                this.button2.setVisible(true);
                this.button2_text.setVisible(true);
                this.curtain_text.setText(this.game_text2.curtains_close_dark);
            }
            state = 'CURTAIN_3';
        }, this);

        // Windowframe
        this.windowframe = this.add.rectangle(198, 263, 486, 29, 0x6666ff).setOrigin(0);
        this.windowframe.visible = false;
        this.windowframe.setInteractive({useHandCursor: true}); 
        this.windowframe.on('pointerup', function () {
            this.curtain_text.setText(this.game_text2.windowframe);
            this.sound_window.play();
        }, this);

        // Drawer knobs
        // 442, 329
        this.topDrawerKnob = this.add.rectangle(442, 329, 25, 35, PINK).setOrigin(0);
        this.topDrawerKnob.visible = false;
        this.topDrawerKnob.setInteractive({useHandCursor: true}); 
        this.topDrawerKnob.open = false;
        this.topDrawerKnob.on('pointerup', function () {
            console.log('top drawer clicked');
            if (!this.top_drawer_unlocked) {
                this.curtain_text.setText(this.game_text2.drawers_locked);
            } else {
                removeFromInventory(this, this.drawers_key);
                if (this.topDrawerKnob.open) {
                    console.log('open drawers');
                    this.sound_drawers_open.play();
                    this.drawers_bg_open.setVisible(true);
                    this.curr_background = this.drawers_bg_open;
                    this.topDrawerKnob.setVisible(false);
                    if (!this.inventory.includes(this.bandaid)) {
                        this.partial_bandaid.setVisible(true);
                    }
                    if (!this.inventory.includes(this.puzzle_box)) {
                        this.box.setVisible(true);
                    }
                } else {
                    console.log('unlock drawers');
                    this.sound_drawers_unlock.play();
                    this.topDrawerKnob.open = true;
                }
            }
        }, this);


        this.middleDrawerKnob = this.add.rectangle(442, 396, 25, 35, PINK).setOrigin(0);
        this.middleDrawerKnob.visible = false;
        this.middleDrawerKnob.setInteractive({useHandCursor: true}); 
        this.middleDrawerKnob.on('pointerup', function () {
            console.log('middle drawer clicked');
            moveButton(this.drawers_button_1, 500, 380);
            moveButton(this.drawers_button_2, 500, 430);
            setButtonVisibility(this.drawers_button_1, true);
            setButtonVisibility(this.drawers_button_2, true);
            // this.checkDrawersClose();
            // state = 'DRAWERS_CLOSE';
        }, this);

        this.bottomDrawerKnob = this.add.rectangle(442, 460, 25, 35, PINK).setOrigin(0);
        this.bottomDrawerKnob.visible = false;
        this.bottomDrawerKnob.setInteractive({useHandCursor: true}); 
        this.bottomDrawerKnob.on('pointerup', function () {
            console.log('bottom drawer clicked');
            moveButton(this.drawers_button_1, 500, 420);
            moveButton(this.drawers_button_2, 500, 470);
            setButtonVisibility(this.drawers_button_1, true);
            setButtonVisibility(this.drawers_button_2, true);
            // this.checkDrawersClose();
            // state = 'DRAWERS_CLOSE';
        }, this);


        // Items on desk
        this.laptop_on_desk = this.add.rectangle(400, 165, 150, 200, PINK).setOrigin(0);
        this.laptop_on_desk.setVisible(false);
        this.laptop_on_desk.setInteractive({useHandCursor: true});
        this.laptop_on_desk.on('pointerup', function () {
                console.log('laptop on desk clicked');
                this.checkLaptop();
                state = 'LAPTOP';
        }, this);

        this.laptop_power = this.add.rectangle(260, 35, 370, 242, PINK).setOrigin(0);
        this.laptop_power.setVisible(false);
        this.laptop_power.setInteractive({useHandCursor: true});
        this.laptop_power.on('pointerup', function () {
                console.log('laptop screen clicked');
                if (curtain_opened) {
                    this.laptop_login_screen.setVisible(true)
                    if (this.laptop_login_screen.texture.key == 'laptop_login_screen') {
                        this.laptop_pw_text.setVisible(true);
                        this.keys_on = true;
                    } else if (!this.email_1_sent) {
                        this.email_template.setVisible(true);
                        this.email_send_rect.setVisible(true);
                    }
                }
                
        }, this);

        this.keyboard_area = this.add.rectangle(570, 350, 100, 100, PINK).setOrigin(0).setVisible(false).setInteractive({ useHandCursor: true});
        this.keyboard_area.on('pointerup', function () {
            console.log('keyboard clicked');
            this.checkKeyboard();
            state = 'KEYBOARD';
        }, this);


        this.email_send_rect = this.add.rectangle(533, 219, 35, 15, PINK).setOrigin(0);
        this.email_send_rect.setVisible(false);
        this.email_send_rect.setInteractive({useHandCursor: true});
        this.email_send_rect.on('pointerup', function () {
                console.log('send email');
                this.email_template.setVisible(false);
                this.email_1_sent = true;
                this.laptop_liquid_anim.play('laptop_liquid_frames');
                this.email_send_rect.setVisible(false);
                laptop_liquid_anim_played = true;
        }, this);

        this.email_1_sent = false;




        this.start_dark = this.add.image(mid_x, mid_y, 'bg_4').setScale(0.5);
        this.curtain_text = this.add.text(Math.round(text_x), Math.round(text_y), '', text_style).setOrigin(0.5);

        text1 = this.add.text(10, 10, '', { fill: '#00ff00' });

        this.button = this.add.image(580, 230, 'button').setScale(0.25);
        this.button.setOrigin(0);
        this.button_text = this.add.text(580, 230, this.game_text2.curtain_button_1, text_style).setOrigin(0); // TODO: find better way to do this
        // Center the text in the button
        this.button_text.x += Math.round((this.button.displayWidth - this.button_text.displayWidth) / 2);
        this.button_text.y += Math.round((this.button.displayHeight - this.button_text.displayHeight) / 2);
        this.button.setInteractive({useHandCursor: true});
        this.button.alpha = 0.5;
        this.button.on('pointerover', function () {
            this.alpha = 1.0;
        });
        this.button.on('pointerout', function () {
            this.alpha = 0.5;
        });
        this.button.on('pointerup', function () {
            console.log('button clicked');
            this.curtain_text.setText('');
            if (state == 'CURTAIN_1') {
                console.log('go to curtain');
                this.checkCurtain();
                state = 'CURTAIN_2';
            } else if (state == 'DOOR_1') {
                console.log('go to door');
                state = 'DOOR_2';
                this.checkDoor();
            } else if (state == 'DESK_1') {
                console.log('go to desk');
                this.checkDesk();
                state = 'DESK_2';
            } else if (state == 'DOOR_2') {
                this.checkDoorClose();
                state = 'DOOR_CLOSE_1';
            } else if (state == 'CURTAIN_3') {
                // Player opens curtains, erase buttons
                this.button.setVisible(false);
                this.button_text.setVisible(false);
                this.button2.setVisible(false);
                this.button2_text.setVisible(false);
                this.openCurtain();
            } else if (state == 'DRAWERS_1') {
                console.log('go to drawers');
                this.checkDrawers();
                state = 'DRAWERS_2';
            }
        }, this);     
        this.button.setVisible(false);
        this.button_text.setVisible(false);



        this.button2 = this.add.image(580, 230, 'button').setScale(0.25);
        this.button2.setOrigin(0);
        this.button2_text = this.add.text(580, 230, this.game_text2.close_curtain, text_style).setOrigin(0); // TODO: find better way to do this
        // Center the text in the button
        this.button2_text.x += Math.round((this.button2.displayWidth - this.button2_text.displayWidth) / 2);
        this.button2_text.y += Math.round((this.button2.displayHeight - this.button2_text.displayHeight) / 2);
        this.button2.setInteractive({useHandCursor: true});
        this.button2.alpha = 0.5;
        this.button2.on('pointerover', function () {
            this.alpha = 1.0;
        });
        this.button2.on('pointerout', function () {
            this.alpha = 0.5;
        });
        this.button2.on('pointerup', function () {
            console.log('button 2 clicked');
            if (state == 'CURTAIN_3') {
                // When player chooses to not open curtain, just remove the buttons
                this.button2.setVisible(false);
                this.button2_text.setVisible(false);
                this.button.setVisible(false);
                this.button_text.setVisible(false);
            }
        }, this);     
        this.button2.setVisible(false);
        this.button2_text.setVisible(false);


        this.back_button = this.add.image(55, 480, 'button').setScale(0.25);
        this.back_button.scaleX = 0.1;
        this.back_button.setOrigin(0);
        this.back_button_text = this.add.text(55, 480, this.game_text2.back_button, text_style).setOrigin(0); // TODO: find better way to do this
        this.back_button_text.x += Math.round((this.back_button.displayWidth - this.back_button_text.displayWidth) / 2);
        this.back_button_text.y += Math.round((this.back_button.displayHeight - this.back_button_text.displayHeight) / 2);
        this.back_button.setInteractive({ useHandCursor: true  });
        this.back_button.alpha = 0.5;
        this.back_button.on('pointerover', function () {
            this.alpha = 1.0;
        });
        this.back_button.on('pointerout', function () {
            this.alpha = 0.5;
        });
        this.back_button.on('pointerup', function () {
            console.log('back button clicked');
            // this.flip_anim.setVisible(false);
            this.keys_on = false;

            this.lighter.setVisible(false);
            // if (this.inventory.curr_item == this.flip_anim) {
            //     this.lighter.setVisible(false);
            //     displayInventory(this);
            // }

            if (this.inventory.curr_item != null) {
                this.postcard_letters.setVisible(false);
                if (this.inventory.curr_item == this.puzzle_box && this.inventory.curr_item.state == 2) {
                    console.log('Turn off puzzle');
                    this.inventory.curr_item.setVisible(true);
                    turn_off_puzzle(this);
                    this.inventory.curr_item.state = 1;
                    return;
                }
                console.log('exit inventory');
                // let curr = this.inventory.curr_item;
                // curr.setX(curr.prevX);
                // curr.setY(curr.prevY);
                // curr.state = 0;
                // curr.setScale(curr.prev_scale);
                // curr.setAngle(0);
                exitInventoryItem(this, this.inventory.curr_item.prev_button_state);
                return;
            } else {
                console.log('not inventory');
            }

            this.curtain_text.setText('');
            if (state == 'DOOR_CLOSE_1') {
                // Go back to door
                this.checkDoor();
                state = 'DOOR_2';
            } else if (state == 'DOOR_2' || state == 'CURTAIN_2' || state == 'CURTAIN_3' || state == 'DESK_2' || state == 'DRAWERS_2') {
                // Go back to main room
                this.goToMainRoom();
                this.postcard_window.state = 0;
                state = 'MAIN_ROOM';
                playWindowKnockSound(this);
            } else if (state == 'LAPTOP') {
                this.checkDesk();
                state = 'DESK_2';
            } else if (state == 'DRAWERS_CLOSE') {
                this.checkDrawers();
                state = 'DRAWERS_2';
            } else if (state == 'KEYBOARD') {
                this.checkLaptop();
                state = 'LAPTOP';
            }
        }, this);     
        this.back_button.setVisible(false);
        this.back_button_text.setVisible(false);

        // Setup rest of the backgrounds
        this.start_bright = this.add.image(mid_x, mid_y, 'bg_bright').setScale(0.5).setVisible(false);
        this.door_bg_closeup_dark = this.add.image(mid_x, mid_y, 'door_close_dark').setScale(0.5).setVisible(false);
        this.door_bg_closeup_bright = this.add.image(mid_x, mid_y, 'door_close_bright').setScale(0.5).setVisible(false);
        this.door_bg_dark = this.add.image(mid_x, mid_y, 'door_bg_dark').setScale(0.5).setVisible(false);
        this.door_bg_bright = this.add.image(mid_x, mid_y, 'door_bg_bright').setScale(0.5).setVisible(false);
        this.curtain_bg_dark = this.add.image(mid_x, mid_y, 'curtain_bg_dark').setScale(0.5).setVisible(false);
        this.curtain_bg_bright = this.add.image(mid_x, mid_y, 'curtain_bg_bright').setScale(0.5).setVisible(false);
        this.desk_bg_dark = this.add.image(mid_x, mid_y, 'desk_bg_dark').setScale(0.5).setVisible(false);
        this.desk_bg_bright = this.add.image(mid_x, mid_y, 'desk_bg_bright').setScale(0.5).setVisible(false);
        this.drawers_bg_dark = this.add.image(mid_x, mid_y, 'drawers_bg_dark').setVisible(false);
        this.drawers_bg_bright = this.add.image(mid_x, mid_y, 'drawers_bg_bright').setVisible(false);
        this.drawers_bg_open = this.add.image(mid_x, mid_y, 'drawers_bg_open').setVisible(false);
        this.bg_laptop_dark = this.add.image(mid_x, mid_y, 'bg_laptop_dark').setVisible(false);
        this.bg_laptop_bright = this.add.image(mid_x, mid_y, 'bg_laptop_bright').setVisible(false);
        this.bg_drawers_close_bright = this.add.image(mid_x, mid_y, 'bg_drawers_close_bright').setVisible(false);
        this.bg_drawers_close_dark = this.add.image(mid_x, mid_y, 'bg_drawers_close_dark').setVisible(false);
        this.bg_middle_drawers_open = this.add.image(mid_x, mid_y, 'bg_middle_drawers_open').setVisible(false);
        this.bg_laptop_red = this.add.image(mid_x, mid_y, 'bg_laptop_red').setVisible(false);
        this.bg_bottom_drawers_open = this.add.image(mid_x, mid_y, 'bg_bottom_drawers_open').setVisible(false);
        this.clear_screen = this.add.image(mid_x, mid_y, 'clear_screen').setScale(0.5).setVisible(false);
        this.bg_keyboard = this.add.image(mid_x, mid_y, 'bg_keyboard').setVisible(false);


        this.backgrounds = [this.start_dark, this.start_bright, 
                            this.door_bg_closeup_dark, this.door_bg_closeup_bright,
                            this.door_bg_dark, this.door_bg_bright,
                            this.curtain_bg_dark, this.curtain_bg_bright,
                            this.desk_bg_dark, this.desk_bg_bright,
                            this.drawers_bg_dark, this.drawers_bg_bright,
                            this.drawers_bg_open,
                            this.bg_laptop_dark, this.bg_laptop_bright,
                            this.bg_keyboard,
                            this.bg_drawers_close_bright, this.bg_drawers_close_dark,
                            this.bg_middle_drawers_open, this.bg_laptop_red,
                            this.bg_bottom_drawers_open,
                            this.clear_screen];
        this.curr_background = this.start_dark;

        this.inventory_boxes = [];
        for (var i = 0; i < inventory_size; i++) {
            let curr = this.add.sprite(17, 15+(i*90), 'item_box').setScale(0.5).setVisible(false).setOrigin(0);
            this.inventory_boxes.push(curr);
        }

        // Spritess
        // this.bottle1 = this.add.sprite(380, 190, 'bottle').setScale(0.5).setVisible(false);
        // this.bottle2 = this.add.sprite(380, 190, 'bottle_empty').setScale(0.5).setVisible(false);
        // this.bottle3 = this.add.sprite(380, 190, 'bottle_open').setScale(0.5).setVisible(false);
        // this.bottle4 = this.add.sprite(380, 190, 'bottle_open_empty').setScale(0.5).setVisible(false);
        this.bottle = this.add.sprite(380, 190, 'bottle').setScale(0.1).setVisible(false).setOrigin(0);
        this.bottle.setInteractive({ useHandCursor: true  });
        this.bottle.closeup = false;
        this.bottle.desc = this.game_text2.items.bottle;
        this.bottle.state = 0;
        this.bottle.on('pointerup', function () {
            console.log('Bottle in inventory clicked');
            if (this.bottle.state == 0) {
                    // this.curr_background.setTint(DARK_TINT);
                    this.bottle.prev_button_state = checkInventoryItem(this, this.bottle);
                    this.bottle.setX(412);
                    this.bottle.setY(130);
                    this.bottle.setScale(0.5);
                    this.bottle.setAngle(30);
                    if (this.bottle.texture.key == 'bottle_open_empty') {
                        this.bottle.state = 3;
                    } else {
                        this.bottle.state = 1;
                    }
            } else if (this.bottle.state == 1) {
                this.bottle.setTexture('bottle_open');
                this.sound_glass.play();
                this.bottle.state = 2;
            } else if (this.bottle.state == 2) {
                this.bottle.setTexture('bottle_open_empty');
                // this.sound_glass.play();
                // this.found_pieces = [this.postcard_3];
                // this.inventory.push(this.found_pieces);

                // this.postcard_texture.draw(this.postcard_3);
                // this.inventory.push(this.postcard_base);


                this.found_pieces.push(this.postcard_3);
                this.postcard_3.in_inventory = true;
                if (this.found_pieces.length == 1) {
                    console.log('postcard pieces added to inventory');
                    this.inventory.push(this.found_pieces);
                }

                // this.found_pieces.push(this.postcard_3);
                
                // displayInventory(this, this.bottle);
                this.sound_paper.play();
                this.bottle.state = 3;
                // console.log('screen text: ', this.game_text2);
                // this.curtain_text.setText(this.game_text2.items.bottle);
            } else {
                // this.bottle.setX(this.bottle.prevX);
                // this.bottle.setY(this.bottle.prevY);
                // this.bottle.setScale(0.08);
                // this.bottle.setAngle(0);
                // this.bottle.state = 0;
                // this.curr_background.clearTint();
                //exitInventoryItem(this, this.bottle.prev_button_state);
            }
        }, this);

        this.window_blood = this.add.sprite(600, 270, 'sprite_1').setScale(0.5).setVisible(false); // window blood

        this.window_arrow = this.add.sprite(635, 220, 'window_arrow_green').setScale(0.5).setVisible(false);
        this.door_arrow_1 = this.add.sprite(75, 400, 'door_arrow_1_pink').setVisible(false);
        this.door_arrow_2 = this.add.sprite(327, 420, 'door_arrow_2_pink').setVisible(false);
        this.door_arrow_3 = this.add.sprite(475, 180, 'door_arrow_3_pink').setVisible(false);

        this.door_arrow_on = false;

        this.partial_bottle = this.add.sprite(505, 319, 'partial_bottle').setScale(0.5).setVisible(false).setOrigin(0); // bottle under door
        this.partial_bottle.setInteractive({ useHandCursor: true  });
        this.partial_bottle.on('pointerup', function () {
            console.log('pick up bottle');
            this.sound_glass.play();
            this.partial_bottle.setVisible(false);
            this.inventory.push(this.bottle);
            displayInventory(this);
        }, this);

        this.bandaid = this.add.sprite(505, 250, 'bandaid').setScale(0.08).setVisible(false).setOrigin(0); // bandaid
        this.bandaid.setInteractive({ useHandCursor: true  });
        this.bandaid.state = 0;
        this.bandaid.desc = this.game_text2.items.bandaid;
        this.bandaid.on('pointerup', function () {
            if (this.bandaid.state == 0) {
                this.bandaid.prev_button_state = checkInventoryItem(this, this.bandaid);
                // this.curr_background.setTint(DARK_TINT);
                this.bandaid.setX(330);
                this.bandaid.setY(50);
                this.bandaid.setScale(0.5);
                // this.bandaid.setAngle(30);
                this.bandaid.state = 1;
            } else if (this.bandaid.state == 1) {
                console.log('bandiad box clicked ', this.bandaid.texture.key);
                if (this.postcard_1.in_inventory) {
                    switch (this.bandaid.texture.key) {
                        case 'bandaid':
                            this.bandaid.setTexture('bandaid_open');
                            break;
                        case 'bandaid_open':
                            this.bandaid.setTexture('bandaid_open_2');
                            this.sound_bandaid.play();
                            break;
                        case 'bandaid_open_2':
                            this.bandaid.setTexture('bandaid_open_3');
                            pickUpPostcardPiece(this, this.postcard_4);
                            this.sound_paper.play();
                    }       
                }
            }
        }, this);


        this.drawers_key = this.add.sprite(505, 319, 'drawers_key').setScale(0.2).setVisible(false).setOrigin(0);
        this.drawers_key.setInteractive({ useHandCursor: true  });
        this.drawers_key.state = 0;
        this.drawers_key.desc = this.game_text2.items.key;
        setupInventoryItem(this, this.drawers_key);

        this.partial_bandaid = this.add.sprite(463, 295, 'partial_bandaid').setVisible(false).setOrigin(0);
        this.partial_bandaid.setInteractive({ useHandCursor: true});
        this.partial_bandaid.on('pointerup', function () {
            if (!this.inventory.includes(this.partial_bandaid)) {
                this.inventory.push(this.bandaid);
                this.partial_bandaid.setVisible(false);
                displayInventory(this);
            }
            
        }, this);


        this.box = this.add.sprite(369, 293, 'box').setVisible(false).setOrigin(0);
        this.box.setInteractive({ useHandCursor: true  });
        this.box.on('pointerup', function () {
            console.log('pick up puzzle box');
            this.box.setVisible(false);
            this.inventory.push(this.puzzle_box);
            displayInventory(this);
            shuffle(this.puzzle, this.puzzle_state, this.loc_to_piece, 'random_moves');
        }, this);

        this.found_pieces = [];
        this.postcard = this.add.sprite(286, 207, 'postcard').setVisible(false).setOrigin(0);
        this.postcard_1 = this.add.sprite(286, 207, 'postcard-1').setVisible(false).setOrigin(0);
        this.postcard_2 = this.add.sprite(286, 207, 'postcard-2').setVisible(false).setOrigin(0);
        this.postcard_3 = this.add.sprite(286, 207, 'postcard-3').setVisible(false).setScale(postcard_scale).setOrigin(0);
        this.postcard_4 = this.add.sprite(286, 207, 'postcard-4').setVisible(false).setOrigin(0);
        this.postcard_5 = this.add.sprite(286, 207, 'postcard-5').setVisible(false).setOrigin(0);
        this.postcard_window = this.add.sprite(568, 292, 'postcard-window').setVisible(false).setOrigin(0);
        this.postcard_door = this.add.sprite(410, 317, 'postcard-door').setVisible(false).setOrigin(0);
        setupPostcardWindow(this, this.postcard_window);
        setupPostcardDoor(this, this.postcard_door);

        this.postcard_base = this.add.sprite(286, 207, 'postcard_texture').setVisible(false).setScale(postcard_scale).setOrigin(0);

        
        


        this.postcard_pieces = [this.postcard_1, this.postcard_2, this.postcard_3, this.postcard_4, this.postcard_5];
        this.postcard_pieces.forEach(function (item, index) {
            item.state = 0;
            item.setInteractive({ useHandCursor: true  });
            item.desc = this.game_text2.items.photo_piece;
            item.setScale(postcard_scale);
            item.display_x = 0;
            item.display_y = 0;
            item.inventory_x = 0;
            item.inventory_y = 0;
            item.inventory_scale = postcard_scale;
        }, this);
        // this.postcard_3.state = 0;
        // this.postcard_3.setInteractive({ useHandCursor: true  });
        this.postcard_1.inventory_x = 30;
        this.postcard_1.inventory_y = 10;
        this.postcard_1.display_x = 300;

        this.postcard_2.inventory_x = 27;
        this.postcard_2.inventory_y = 18;
        this.postcard_2.display_x = 257;
        this.postcard_2.display_y = 125;

        this.postcard_5.inventory_x = 15;
        this.postcard_5.inventory_y = 20;
        this.postcard_5.display_x = 105;
        this.postcard_5.display_y = 172;

        this.postcard_3.inventory_x = 10;
        this.postcard_3.inventory_y = 10;

        this.postcard_4.inventory_x = 20;
        this.postcard_4.inventory_y = 10;
        this.postcard_4.display_x = 125;
        setupPostcardInventoryItem(this, this.postcard_3);
        setupPostcardInventoryItem(this, this.postcard_5);
        setupPostcardInventoryItem(this, this.postcard_1);
        setupPostcardInventoryItem(this, this.postcard_4);
        setupPostcardInventoryItem(this, this.postcard_2);



        setupPostcardWindowButtons(this);

        this.puzzle_box = this.add.sprite(329, 222, 'puzzle_box_1').setVisible(false).setOrigin(0).setScale(0.08);
        this.puzzle_box.state = 0;
        this.puzzle_box.setInteractive({ useHandCursor: true  });
        this.puzzle_box.desc = this.game_text2.items.puzzle_box_1;
        setupInventoryItem(this, this.puzzle_box);

        /*
context.window_photo_button_1 = buttonsYN[0];
    context.window_photo_button_1_text = buttonsYN_text[0];
    context.window_photo_button_2 = buttonsYN[1];
    context.window_photo_button_2_text = buttonsYN_text[1];
        */


        this.laptop_login_screen = this.add.sprite(256, 32, 'laptop_login_screen').setOrigin(0).setVisible(false);

        // this.keys = this.input.keyboard.addKeys('A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9');
        // this.keys_on = false;
        // this.keys_pressed = false;

        this.input.keyboard.on('keyup', this.keyPressHandler, this);
        this.laptop_pw_buffer = [];

        this.laptop_pw_text = this.add.text(356, 148, '', text_style).setOrigin(0).setColor(LIGHT_GREEN_TEXT).setAngle(0);
        console.log('font size: ', text_style);
        this.laptop_pw_text.setFontSize(19);
        this.laptop_pw_text.setVisible(false);

        this.email_template = this.add.sprite(345, 50, 'email_template').setOrigin(0).setVisible(false);

        // this.input.setDefaultCursor('url(assets/cursor-lighter-off.png), pointer');

        
        
        this.items = [this.curtain, this.door, this.door2, this.close_door, this.laptop, this.desk,
                        this.button, this.button_text,
                        this.back_button, this.back_button_text,
                        this.doorknob, this.curtains, this.windowframe,
                        this.button2, this.button2_text,
                        this.drawers,
                        this.window_blood, this.partial_bottle,
                        this.bandaid,
                        this.topDrawerKnob, this.middleDrawerKnob, this.bottomDrawerKnob,
                        this.laptop_on_desk, this.laptop_power, this.laptop_login_screen, this.laptop_pw_text, this.email_template, this.email_send_rect,
                        this.keyboard_area,
                        this.partial_bandaid, this.box,
                        this.drawers_key, this.bottle,
                        this.postcard, this.postcard_1, this.postcard_2, this.postcard_3, this.postcard_4, this.postcard_5, this.postcard_window, this.postcard_door,
                        this.puzzle_box,
                        this.window_photo_button_1, this.window_photo_button_1_text,
                        this.window_photo_button_2, this.window_photo_button_2_text,
                        this.window_arrow, this.door_arrow_1, this.door_arrow_2, this.door_arrow_3];

        this.drawer_pw_text = []
        for (let i = 0; i < 3; i ++) {
            let curr_text = this.add.text(368, 476, '0').setOrigin(0).setVisible(false);
            curr_text.setInteractive({ useHandCursor: true  });
            curr_text.on('pointerup', function () {
                console.log('drawers puzzle: ', curr_text.text + 1);
                let digit = curr_text.text;
                let new_digit;

                if (digit == '9') {
                    new_digit = '0'
                } else {
                   new_digit = String.fromCharCode((digit.charCodeAt(0) + 1));
                }    
                console.log('new digit: ', new_digit, '0'.charCodeAt(0));

                curr_text.setText(new_digit);
            }, this);
            curr_text.setFontSize(32);
            this.items.push(curr_text);
            this.drawer_pw_text.push(curr_text);
        }
        this.drawer_pw_text[1].setX(432);
        this.drawer_pw_text[2].setX(491);

        this.green_light = this.add.sprite(337, 70, 'green_light').setOrigin(0).setVisible(false);
        this.red_light = this.add.sprite(337, 70, 'red_light').setOrigin(0).setVisible(false);
        this.items.push(this.green_light);
        this.items.push(this.red_light);

        this.drawers_button_1 = createButton(this, this.game_text2.buttons.drawers_1, 500, 380);
        this.drawers_button_1.on('pointerup', function () {
            console.log('drawers button clicked');
            if (this.drawers_button_1.y == 380) {
                if (this.email_1_sent) {
                    console.log('open middle drawer');
                    openMiddleDrawers(this);
                } else {
                    this.curtain_text.setText(this.game_text2.locked);
                }
            } else {
                if (this.drawer_pw_text[0].text == '3' && this.drawer_pw_text[1].text == '6' && this.drawer_pw_text[2].text == '2') {
                    console.log('open bottom drawer');
                    openBottomDrawers(this);
                } else {
                    this.curtain_text.setText(this.game_text2.locked);
                }
            }
        }, this); 
        this.items.push(this.drawers_button_1);
        this.items.push(this.drawers_button_1.text);

        this.drawers_button_2 = createButton(this, this.game_text2.buttons.drawers_2, 500, 430);
        this.drawers_button_2.on('pointerup', function () {
            console.log('drawers button clicked');
            this.checkDrawersClose();
            state = 'DRAWERS_CLOSE';
        }, this); 
        this.items.push(this.drawers_button_2);
        this.items.push(this.drawers_button_2.text);

        this.main_screen_laptop_red = this.add.sprite(385, 310, 'main_screen_laptop_red').setOrigin(0).setVisible(false);
        this.items.push(this.main_screen_laptop_red);

        this.lighter_in_drawers = this.add.sprite(388, 387, 'lighter_in_drawers').setOrigin(0).setVisible(false);
        this.lighter_in_drawers.setInteractive({ useHandCursor: true  });
        this.lighter_in_drawers.on('pointerup', function () {
            console.log('lighter in drawers clicked');
            this.inventory.push(this.lighter2);
            displayInventory(this);
            this.lighter_in_drawers.setVisible(false);
        }, this);
        this.items.push(this.lighter_in_drawers);

        this.glass_key_in_drawers = this.add.sprite(437, 454, 'glass_key_in_drawers').setOrigin(0).setVisible(false);
        this.glass_key_in_drawers.setInteractive({ useHandCursor: true  });
        this.glass_key_in_drawers.on('pointerup', function () {
            console.log('glass key in drawers clicked');
            this.inventory.push(this.glass_key);
            this.sound_key.play();
            this.glass_key_in_drawers.setVisible(false);
            displayInventory(this);
        }, this);
        this.items.push(this.glass_key_in_drawers);

        this.glass_key = this.add.sprite(472, 465, 'glass_key').setScale(0.15).setOrigin(0).setVisible(false);
        this.glass_key.setInteractive({ useHandCursor: true });
        setupInventoryItem(this, this.glass_key);
        this.items.push(this.glass_key);

        this.main_door_button = createButton(this, this.game_text2.buttons.main_door, 290, 288, 0.3, 0.25);
        this.main_door_button.on('pointerup', function () {
            console.log('main door opened');
            this.resetItems();
            openMainDoor(this);
        }, this); 
        this.items.push(this.main_door_button);
        this.items.push(this.main_door_button.text);
        


        // this.bottom_drawer_text_1 = this.add.text(368, 476, '0').setOrigin(0).setVisible(false);
        // this.bottom_drawer_text_1.setFontSize(32);
        // this.bottom_drawer_text_2 = this.add.text(432, 476, '0').setOrigin(0).setVisible(false);
        // this.bottom_drawer_text_2.setFontSize(32);
        // this.bottom_drawer_text_3 = this.add.text(491, 476, '0').setOrigin(0).setVisible(false);
        // this.bottom_drawer_text_3.setFontSize(32);
        // this.items.push(this.bottom_drawer_text_1);
        // this.items.push(this.bottom_drawer_text_2);
        // this.items.push(this.bottom_drawer_text_3);

        // Setup animations
        this.anims.create({
            key: 'sparkle',
            frames: [
                { key: 'sparkle1' },
                { key: 'sparkle2' },
                { key: 'sparkle3' },
                { key: 'sparkle4'},
                { key: 'sparkle5'}
            ],
            frameRate: 7,
            repeat: -1,
            yoyo: true
        });

        this.sparkle = this.add.sprite(343, 474, 'sparkle1')
        this.sparkle.play('sparkle').setScale(0.5);
        this.sparkle.setInteractive({ useHandCursor: true  });
        this.sparkle.setVisible(false);
        this.sparkle.on('pointerup', function () {
            console.log('sparkle clicked');
            if (state == 'DOOR_2') {
                this.updateButton(this.button, this.button_text, this.game_text2.door_button_1, 375, 414);
                this.button.setVisible(true);
                this.button_text.setVisible(true);
                this.curtain_text.setText(this.game_text2.sparkle);
            } else if (state == 'DESK_2') {
                if (!this.inventory.includes(this.drawers_key)) {
                    console.log('picked up drawers key');
                    this.inventory.push(this.drawers_key);
                    this.sparkle.setVisible(false);
                    this.sound_key.play();
                    this.top_drawer_unlocked = true;
                    displayInventory(this);
                }
            }
        }, this);
        this.items.push(this.sparkle);


        this.anims.create({
            key: 'flip_anim',
            frames: this.anims.generateFrameNames('flip', { prefix: 'flip', end: 11, zeroPad: 0 }),
            frameRate: 8,
            repeat: 0 }
        );
        // Uncomment below to display animation
        this.flip_anim = this.add.sprite(470, 230, 'flip', 'flip0').setScale(postcard_scale).setVisible(false);
        this.flip_anim.state = 0;
        this.flip_anim.curr_frame = 0;
        this.flip_anim.inventory_scale = postcard_scale;
        this.flip_anim.setInteractive({ useHandCursor: true  });
        setupInventoryItem(this, this.flip_anim);
        this.items.push(this.flip_anim);

        // Drip animation near door
        this.anims.create({
            key: 'drip_frames',
            frames: this.anims.generateFrameNames('drip', { prefix: 'drip', start: 1, end: 10, zeroPad: 0 }),
            frameRate: 7,
            repeat: 0 }
        );
        this.drip_anim = this.add.sprite(440, 170, 'drip_anim').setVisible(false).setOrigin(0,0);
        this.items.push(this.drip_anim);

        // Liquid animation for laptop
        this.anims.create({
            key: 'laptop_liquid_frames',
            frames: this.anims.generateFrameNames('laptop_liquid', { prefix: 'laptop-liquid-', start: 1, end: 12, zeroPad: 0 }),
            frameRate: 8,
            repeat: 0 }
        );
        this.laptop_liquid_anim = this.add.sprite(432, 413, 'laptop_liquid', 'laptop-liquid-0').setVisible(false).setOrigin(0);
        this.items.push(this.laptop_liquid_anim);


        // Make lighter reveal words by dragging
        // Tutorial link: https://blog.ourcade.co/posts/2020/phaser-3-object-reveal-scratch-off-blendmode-erase/
        //                https://blog.ourcade.co/posts/2020/phaser-3-object-reveal-scratch-off-alpha-mask/
        //                https://phaser.io/examples/v3/view/game-objects/render-texture/scratch
        // const bg = this.add.sprite(400, 300, 'bg').setOrigin(0.5).setScale(2.5);

        const brush = this.make.sprite({key:'brush', add: false}).setScale(0.5);
        const rt = this.make.renderTexture({x: 0, y: 0, width: 800, height: 600, add: false}).setOrigin(0.0);

        // const bunny1 = this.add.sprite(400, 300, 'postcard_letters').setTint(0x000000);
        // const checker = this.add.sprite(400, 300, 'postcard_letters');
        // checker.setTint(0x4bf542);
        const postcard_letters = this.add.sprite(250, 200, 'postcard_letters').setScale(0.8).setOrigin(0,0);

        postcard_letters.mask = new Phaser.Display.Masks.BitmapMask(this, rt);
        // bunny0.mask.invertAlpha = true;
        // checker.mask = new Phaser.Display.Masks.BitmapMask(this, bunny1);

        postcard_letters.setInteractive();
        postcard_letters.on(Phaser.Input.Events.POINTER_DOWN, eraserDown, this);
        postcard_letters.on(Phaser.Input.Events.POINTER_MOVE, eraserMove, this);
        postcard_letters.on(Phaser.Input.Events.POINTER_UP, () => this.isDown = false);

        postcard_letters.setVisible(false);

        this.brush = brush;
        this.renderTexture = rt;
        this.postcard_letters = postcard_letters;

        this.flip_anim.on('animationcomplete', function () {
            console.log('flip animation completed');
            if (this.flip_anim.prev_frame == 0) {
                this.postcard_letters.setVisible(true);
            }
        }, this);



        this.postcard_flip_text = this.add.text(764, 125, this.game_text2.buttons.postcard_flip, text_style).setOrigin(0.5);
        this.postcard_flip_text.setVisible(false);
        this.postcard_flip_text.setInteractive({ useHandCursor: true  });
        this.postcard_flip_text.on('pointerup', function () {
            console.log('flip postcard');
            if (this.found_pieces.length > 0) {
                console.log('curr flip_anim texture frame: ', this.flip_anim.frame.name);
                this.flip_anim.prev_frame = this.flip_anim.curr_frame;
                if (this.flip_anim.curr_frame == 0) {
                    this.flip_anim.setVisible(true).play('flip_anim');
                    this.flip_anim.state = 1;
                    this.flip_anim.curr_frame = 11;
                } else {
                    this.postcard_letters.setVisible(false);
                    this.flip_anim.setVisible(true).playReverse('flip_anim');
                    this.flip_anim.state = 0;
                    this.flip_anim.curr_frame = 0;
                }
                console.log('curr flip_anim texture frame: ', this.flip_anim.frame.name);
            }
        }, this);
        this.items.push(this.postcard_flip_text);

        this.lighter = this.add.sprite(380, 50, 'lighter_off').setScale(0.8).setOrigin(0).setVisible(false);
        this.lighter.setInteractive({ useHandCursor: true  });
        this.lighter.on('pointerdown', function () {
            console.log('click lighter');
            this.lighter.setTexture('lighter_on');
            this.isDown = true;
        }, this);
        this.lighter.on('pointerup', function () {
            console.log('click lighter');
            this.lighter.setTexture('lighter_off');
            this.isDown = false;
        }, this);
        this.items.push(this.lighter);

        this.lighter2 = this.add.sprite(380, 50, 'lighter_off').setScale(0.2).setOrigin(0).setVisible(false);
        setupInventoryItem(this, this.lighter2);
        this.lighter2.setInteractive({ useHandCursor: true  });
        this.lighter2.on('pointerdown', function () {
            console.log('click lighter');
            this.lighter2.setTexture('lighter_on');
            this.isDown = true;
        }, this);
        this.lighter2.on('pointerup', function () {
            console.log('click lighter');
            this.lighter2.setTexture('lighter_off');
            this.isDown = false;
        }, this);
        this.items.push(this.lighter2);

        // Audio
        this.bgm = this.sound.add('bgm', { volume: 0.25, loop: true });
        this.bgm.prev_volume = 0.25;
        this.sound_glass = this.sound.add('sound_glass', { volume: 0.5});
        this.sound_door = this.sound.add('sound_door', {volume: 0.5});
        this.sound_window = this.sound.add('sound_window', {volume: 0.5});
        this.sound_key = this.sound.add('sound_key', {volume: 0.5});
        this.sound_drawers_unlock = this.sound.add('sound_drawers_unlock', {volume: 0.5});
        this.sound_drawers_open = this.sound.add('sound_drawers_open', {volume: 0.5});
        this.sound_piece = this.sound.add('sound_piece', {volume: 0.5});
        this.sound_piece_2 = this.sound.add('sound_piece_2', {volume: 0.5});
        this.sound_paper = this.sound.add('sound_paper', {volume: 0.5});
        this.sound_puzzle_box_unlock = this.sound.add('sound_puzzle_box_unlock', {volume: 0.5});
        this.sound_window_knock = this.sound.add('sound_window_knock', {volume: 0.5});
        this.sound_window_lock = this.sound.add('sound_window_lock', {volume: 0.5});
        this.sound_window_lock_2 = this.sound.add('sound_window_lock_2', {volume: 0.8});
        this.sound_blood = this.sound.add('sound_blood', {volume: 0.8});
        this.sound_bandaid = this.sound.add('sound_bandaid', {volume: 0.5});
        this.sound_door_knock = this.sound.add('sound_door_knock', {volume: 0.5});


        

        // this.sound_paper.onStop.addOnce(function() {
        //     console.log('paper sound stopped playing');
        // }, this);

        this.sound_paper.once('complete', function () {
            console.log('paper sound stopped playing, once()');
            playWindowKnockSound(this);
        }, this);

        // this.sound_paper.on('complete', function () {
        //     console.log('paper sound stopped playing, on()');
        // }, this);

        this.sound_window_lock.on('play', function () {
            this.back_button.setVisible(false);
            this.back_button_text.setVisible(false);
            this.window_photo_button_1.setVisible(false);
            this.window_photo_button_1_text.setVisible(false);
            this.window_photo_button_2.setVisible(false);
            this.window_photo_button_2_text.setVisible(false);
        }, this);

        this.sound_window_lock.on('complete', function () {
            this.back_button.setVisible(true);
            this.back_button_text.setVisible(true);
            this.window_photo_button_1.setVisible(true);
            this.window_photo_button_1_text.setVisible(true);
            this.window_photo_button_2.setVisible(true);
            this.window_photo_button_2_text.setVisible(true);
        }, this);

        this.sound_window_lock_2.on('play', function () {
            this.back_button.setVisible(false);
            this.back_button_text.setVisible(false);
            this.window_photo_button_1.setVisible(false);
            this.window_photo_button_1_text.setVisible(false);
            this.window_photo_button_2.setVisible(false);
            this.window_photo_button_2_text.setVisible(false);
        }, this);

        this.sound_window_lock_2.on('complete', function () {
            this.sound_blood.play();
            this.window_blood.setVisible(true);

            this.postcard_window.setVisible(false);
            displayInventory(this);

            this.back_button.setVisible(true);
            this.back_button_text.setVisible(true);

            this.sound_door_knock.play();
        }, this);

        // this.sound_toggle = this.add.rectangle(174, 15, 25, 25, LIGHT_BLUE).setOrigin(0);
        // this.add.text(174, 50, 'bgm toggle', text_style).setOrigin(0);
        // this.sound_toggle.setInteractive({useHandCursor: true});
        // this.sound_toggle.on('pointerup', function () {
        //     console.log('bgm toggle: ', this.bgm.volume);
        //     if (this.bgm.volume == 0) {
        //         this.bgm.setVolume(this.bgm.prev_volume);
        //     } else {
        //         this.bgm.prev_volume = this.bgm.volume;
        //         this.bgm.setVolume(0);
        //     }
        // }, this);

        // Puzzle logic?
        // setup_puzzle(this);
        hello_world();
        setup_puzzle(this);
        turn_off_puzzle(this);

        // Some extra buttons
        createInventoryBackButton(this);




        this.inventory = [];
        // this.inventory.push(this.found_pieces);

        this.inventory.curr_item = null;

        this.inventory_text = this.add.text(Math.round(text_x), Math.round(text_y), '', text_style).setOrigin(0.5).setColor(LIGHT_BLUE);
    }


    update ()
    {
        // this.input.once('pointerdown', this.mainGameClickHandler, this);

        var pointer = this.input.activePointer;


        // var on_curtain = (pointer.worldX < 550) && (pointer.worldX > 344) && (pointer.worldY < 280) && (pointer.worldY > 127);
        on_curtain = (pointer.worldX < this.curtain.getBottomRight().x) 
                        && (pointer.worldX > this.curtain.getTopLeft().x)
                        && (pointer.worldY < this.curtain.getBottomRight().y)
                        && (pointer.worldY > this.curtain.getTopLeft().y);
        // text1.setText([
        //     'x: ' + pointer.worldX,
        //     'y: ' + pointer.worldY,
        //     'isDown: ' + pointer.isDown,
        //     'curtain: ' + on_curtain,
        //     'state: ' + state,
        //     'test: ' + test
        // ]);

        if (state != prev_state) {
            console.log('state change: ', state);
            prev_state = state;
        }

        this.laptop_pw_text.setText(this.laptop_pw_buffer.join(''));

        // Display lighter if lighter is in inventory (todo) and current item is postcard
        if (this.inventory.curr_item == this.flip_anim && pointer.worldX > 250 && pointer.worldX < 663) {
            this.lighter.setX(pointer.worldX - 30);
            this.lighter.setY(pointer.worldY - 170);

            if (this.isDown) {
                this.renderTexture.draw(this.brush, pointer.x - 20, pointer.y - 150);
            }
        }

        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            console.log('fade out complete');
            this.scene.start('clear_scene');
        }, this);


        // this.lighter.setX(pointer.worldX);
        // this.lighter.setY(pointer.worldY);

        // if (this.keys_on) {
        //     if (this.keys.A.isDown) {
        //         if (!this.keys_pressed) {
        //             console.log('A pressed');
        //             this.keys_pressed = true;
        //         }
        //     } else {
        //         this.keys_pressed = false;
        //     }
        // } else {
        //     this.keys_pressed = false;
        // }
    }

    mainGameClickHandler()
    {
        console.log('mainGameClickHandler()');
    }

    curtainClickHandler()
    {
        console.log('curtainClickHandler()');
        if (curtain_opened) {
            this.curtain_text.setText(this.game_text2.window_open);
        } else {
            this.curtain_text.setText(this.game_text2.curtain_1);
        }

        this.updateButton(this.button, this.button_text, this.game_text2.door_button_1, 580, 150);

        this.button.setVisible(true);
        this.button_text.setVisible(true);
        state = 'CURTAIN_2';
    }

    doorClickHandler()
    {
        console.log('doorClickHandler()');
        this.curtain_text.setText(this.game_text2.door_1);

        this.updateButton(this.button, this.button_text, this.game_text2.door_button_1, 150, 223);

        // this.add.text(text_x, text_y, game_text.ceiling_1, text_style).setOrigin(0.5);
        this.button.setVisible(true);
        this.button_text.setVisible(true);
    }

    deskClickHandler()
    {
        console.log('deskClickHandler()');
        this.curtain_text.setText(this.game_text2.desk_1);

        this.updateButton(this.button, this.button_text, this.game_text2.door_button_1, 417, 357);

        // this.add.text(text_x, text_y, game_text.ceiling_1, text_style).setOrigin(0.5);
        this.button.setVisible(true);
        this.button_text.setVisible(true);
    }

    drawersClickHandler()
    {
        console.log('drawersClickHandler()');
        // this.curtain_text.setText(this.game_text2.desk_1);

        this.updateButton(this.button, this.button_text, this.game_text2.door_button_1, 659, 445);

        // this.add.text(text_x, text_y, game_text.ceiling_1, text_style).setOrigin(0.5);
        this.button.setVisible(true);
        this.button_text.setVisible(true);
    }

    updateButton(button, button_text, text, x, y)
    {
        button_text.setText(text);
        button.x = x;
        button.y = y;
        button_text.x = x;
        button_text.y = y;
        button_text.x += Math.round((button.displayWidth - button_text.displayWidth) / 2);
        button_text.y += Math.round((button.displayHeight - button_text.displayHeight) / 2);
    }

    resetItems()
    {
        for (var i = 0; i < this.items.length; i++) {
            if (!this.inventory.includes(this.items[i]) && !this.items[i].in_inventory) {
                this.items[i].setVisible(false);
            }
        }

        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].setVisible(false);
        }
    }

    goToMainRoom()
    {
        this.resetItems();

        var curr_depth;
        if (curtain_opened) {
            curr_depth = this.start_bright.depth + 1;
            this.start_bright.setVisible(true);
            this.curr_background = this.start_bright;
        } else {
            curr_depth = this.start_dark.depth + 1;
            this.start_dark.setVisible(true);
            this.curr_background = this.start_dark;
        }
        this.setTextAndButtons(curr_depth);

        this.door.setVisible(true);
        this.curtain.setVisible(true);
        this.desk.setVisible(true);
        this.laptop.setVisible(true);
        this.drawers.setVisible(true);

        if (curtain_opened) {
            this.bgm.setVolume(0.1);
        }

        if (this.door_arrow_on) {
            this.door_arrow_1.setVisible(true);
        }

        if (laptop_liquid_anim_played) {
            this.main_screen_laptop_red.setVisible(true);
        }


    }

    setTextAndButtons(curr_depth)
    {
        this.curtain_text.setDepth(curr_depth);
        text1.setDepth(curr_depth);
        this.button.setDepth(curr_depth);
        this.button_text.setDepth(curr_depth);
        this.back_button.setDepth(curr_depth);
        this.back_button_text.setDepth(curr_depth);
        this.button2.setDepth(curr_depth);
        this.button2_text.setDepth(curr_depth);
    }

    checkDoor()
    {
        this.resetItems();

        var curr_depth;
        if (curtain_opened) {
            curr_depth = this.door_bg_bright.depth + 1;
            this.door_bg_bright.setVisible(true);
            this.curr_background = this.door_bg_bright;
        } else {
            curr_depth = this.door_bg_dark.depth + 1;
            this.door_bg_dark.setVisible(true);
            this.curr_background = this.door_bg_dark;
        }

        this.setTextAndButtons(curr_depth);

        this.door2.setVisible(true);
        this.back_button.setVisible(true);
        this.back_button_text.setVisible(true);
        this.doorknob.setVisible(true);
        this.curtain_text.setVisible(true);

        if (curtain_opened && !this.inventory.includes(this.bottle)) {
            this.sparkle.setX(343);
            this.sparkle.setY(474);
            this.sparkle.setVisible(true);
            this.door2.setVisible(false);
        }

        if (this.door_arrow_on) {
            this.door_arrow_2.setVisible(true);
        }

    }

    checkDoorClose()
    {
        this.resetItems();

        var curr_depth;
        if (curtain_opened) {
            curr_depth = this.door_bg_closeup_bright.depth + 1;
            this.door_bg_closeup_bright.setVisible(true);
            this.curr_background = this.door_bg_closeup_bright;
            if (!this.inventory.includes(this.bottle)) {
                this.partial_bottle.setVisible(true);
            }
        } else {
            curr_depth = this.door_bg_closeup_dark.depth + 1;
            this.door_bg_closeup_dark.setVisible(true);
            this.curr_background = this.door_bg_closeup_dark;
        }

        this.setTextAndButtons(curr_depth);

        this.back_button.setVisible(true);
        this.back_button_text.setVisible(true);
        this.close_door.setVisible(true);

        if (curtain_opened) {
            this.bgm.setVolume(0.25);
        }

        if (this.inventory.includes(this.bottle)) {
            this.close_door.setVisible(false);
        }

        if (this.door_arrow_on) {
            this.door_arrow_3.setVisible(true);
            if (!this.postcard_2.in_inventory) {
                this.postcard_door.setVisible(true);
            } else {
                this.drip_anim.setVisible(true);
            }
        }
    }

    checkCurtain()
    {
        this.resetItems();

        var curr_depth;
        if (curtain_opened) {
            curr_depth = this.curtain_bg_bright.depth + 1;
            this.curtain_bg_bright.setVisible(true);
            this.curr_background = this.curtain_bg_bright;
        } else {
            curr_depth = this.curtain_bg_dark.depth + 1;
            this.curtain_bg_dark.setVisible(true);
            this.curr_background = this.curtain_bg_dark;
        }

        this.setTextAndButtons(curr_depth);

        this.back_button.setVisible(true);
        this.back_button_text.setVisible(true);

        if (curtain_opened) {
            this.windowframe.setVisible(true);
        }
        this.curtains.setVisible(true);

        if (curtain_opened) {
            this.bgm.setVolume(0.25);
        }

        if (curtain_opened && this.found_pieces.includes(this.postcard_3) && !this.found_pieces.includes(this.postcard_window) && !this.postcard_1.in_inventory) {
            this.postcard_window.setVisible(true);
            this.window_arrow.setVisible(true);
        }

        if (this.postcard_1.in_inventory) {
            this.window_blood.setVisible(true);
            this.window_arrow.setVisible(true);
            this.window_arrow.setTexture('window_arrow_red');
        }
    }

    checkDesk()
    {
        this.resetItems();

        var curr_depth;
        if (curtain_opened) {
            curr_depth = this.desk_bg_bright.depth + 1;
            if (laptop_liquid_anim_played) {
                this.bg_laptop_red.setVisible(true);
                this.curr_background = this.bg_laptop_red;
            } else {
                this.desk_bg_bright.setVisible(true);
                this.curr_background = this.desk_bg_bright;
            }
            
        } else {
            curr_depth = this.desk_bg_dark.depth + 1;
            this.desk_bg_dark.setVisible(true);
            this.curr_background = this.desk_bg_dark;
        }

        this.setTextAndButtons(curr_depth);

        this.back_button.setVisible(true);
        this.back_button_text.setVisible(true);

        this.laptop_on_desk.setVisible(true);

        if (curtain_opened && !this.inventory.includes(this.drawers_key) && !this.top_drawer_unlocked) {
            this.sparkle.setX(630);
            this.sparkle.setY(493);
            this.sparkle.setVisible(true);
        }
        
    }

    checkLaptop()
    {
        this.resetItems();

        var curr_depth;
        var curr_bg;
        if (curtain_opened) {
            curr_bg = this.bg_laptop_bright;
        } else {
            curr_bg = this.bg_laptop_dark;
        }

        curr_depth = curr_bg.depth + 1;
        curr_bg.setVisible(true);
        this.curr_background = curr_bg;

        this.setTextAndButtons(curr_depth);

        this.laptop_power.setVisible(true);
        this.laptop_liquid_anim.setVisible(true);

        this.back_button.setVisible(true);
        this.back_button_text.setVisible(true);

        if (curtain_opened) {
            this.keyboard_area.setVisible(true);
        }
        
    }

    checkKeyboard()
    {
        this.resetItems();

        var curr_depth;
        var curr_bg;
        if (curtain_opened) {
            curr_bg = this.bg_keyboard;
        } else {
            curr_bg = this.bg_keyboard;
        }

        curr_depth = curr_bg.depth + 1;
        curr_bg.setVisible(true);
        this.curr_background = curr_bg;

        this.setTextAndButtons(curr_depth);

        this.back_button.setVisible(true);
        this.back_button_text.setVisible(true);
    }

    checkDrawers()
    {
        this.resetItems();

        var curr_depth;
        if (curtain_opened) {
            curr_depth = this.drawers_bg_dark.depth + 1;
            this.drawers_bg_bright.setVisible(true);
            this.curr_background = this.drawers_bg_bright;
        } else {
            curr_depth = this.drawers_bg_dark.depth + 1;
            this.drawers_bg_dark.setVisible(true);
            this.curr_background = this.drawers_bg_dark;
        }

        this.setTextAndButtons(curr_depth);

        this.back_button.setVisible(true);
        this.back_button_text.setVisible(true);
        this.topDrawerKnob.setVisible(true);
        this.middleDrawerKnob.setVisible(true);
        this.bottomDrawerKnob.setVisible(true);
    }

    checkDrawersClose()
    {
        this.resetItems();

        var curr_depth;
        var curr_bg;
        if (curtain_opened) {
            curr_bg = this.bg_drawers_close_bright;
        } else {
            curr_bg = this.bg_drawers_close_dark;
        }

        curr_depth = curr_bg.depth + 1;
        curr_bg.setVisible(true);
        this.curr_background = curr_bg;

        this.setTextAndButtons(curr_depth);

        this.back_button.setVisible(true);
        this.back_button_text.setVisible(true);

        for (let i = 0; i < 3; i++) {
            this.drawer_pw_text[i].setVisible(true);
        }

        if (this.email_1_sent) {
            this.green_light.setVisible(true);
        } else {
            this.red_light.setVisible(true);
        }
        
    }

    openCurtain()
    {
        curtain_opened = true;

        this.curtain_bg_dark.setVisible(false);
        this.curtain_bg_bright.setVisible(true);
        this.windowframe.setVisible(true);

        this.curtain_text.setColor('#071938');
        this.button_text.setColor('#071938');
        this.button2_text.setColor('#071938');
        this.back_button_text.setColor('#071938');

        this.bgm.play();
    }

    keyPressHandler(event)
    {
        if (!this.laptop_pw_text.visible) {
            return;
        }
        console.log('keyPressHandler(): ', event.keyCode);

        if (this.laptop_pw_buffer.length < buffer_len 
            && ((event.keyCode >= Phaser.Input.Keyboard.KeyCodes.A && event.keyCode <= Phaser.Input.Keyboard.KeyCodes.Z )
                || (event.keyCode >= Phaser.Input.Keyboard.KeyCodes.ZERO && event.keyCode <= Phaser.Input.Keyboard.KeyCodes.NINE))) {
            this.laptop_pw_buffer.push(String.fromCharCode(event.keyCode));
        }

        if (this.laptop_pw_buffer.length > 0 && event.keyCode == Phaser.Input.Keyboard.KeyCodes.BACKSPACE) {
            this.laptop_pw_buffer.pop();
        }

        if (this.laptop_pw_buffer.length > 0 && event.keyCode == Phaser.Input.Keyboard.KeyCodes.ENTER) {
            // console.log('hash for current pw: ', hash(this.laptop_pw_buffer.join('')));
            if (checkPW(hash(this.laptop_pw_buffer.join('')))) {
                console.log('Password is correct');
                this.laptop_pw_text.setVisible(false);
                this.laptop_login_screen.setTexture('laptop_email_screen');
            } else {
                console.log('Password is incorrect');
            }
        } 
    }

}

var main_game = new MainGame();