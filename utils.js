var utils_test = 'hello world';

function test()
{
	console.log('testing');
}

function testPreload(context)
{
    console.log('testing preload');
    context.load.image('test_preload_img', 'assets/bg_13.png');
    context.test_preload_bg = context.add.image(mid_x, mid_y, 'testing_preload').setVisible(true);
}

function progressBar(context)
{
	// Display progress bar. Tutorial link: https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
    context.add.image(0, 0, 'computer').setOrigin(0);
	var progressBar = context.add.graphics();
    var progressBox = context.add.graphics();
    progressBox.setAngle(-4);
    progressBox.lineStyle(1, 0x14db9c, 1);
    progressBox.strokeRect(420, 232, 90, 10);

    progressBar.setAngle(-4);

    // var testRect = context.add.graphics();
    // progressBox.strokeRect(240, 270, 320, 50);
    
    var width = context.cameras.main.width;
    var height = context.cameras.main.height;
    var loadingText = context.make.text({
        x: 437,
        y: 215,
        text: 'Loading... ',
        style: {
            font: '10px monospace',
            fill: '#14db9c'
        }
    });
    loadingText.setOrigin(0, 0);
    loadingText.setAngle(-4);
    
    var percentText = context.make.text({
        x: 497,
        y: 211,
        text: '0%',
        style: {
            font: '10px monospace',
            fill: '#14db9c'
        }
    });
    percentText.setOrigin(0, 0);
    percentText.setAngle(-4);
    
    var assetText = context.make.text({
        x: 455,
        y: 478,
        text: '',
        style: {
            font: '25px monospace',
            fill: '#ffffff'
        }
    });
    assetText.setOrigin(0, 0);
    
    context.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0x14db9c, 1);
        progressBar.fillRect(422, 234, 86 * value, 6);
    });
    
    context.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
    });
    
    context.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });
}


function displayInventory(context, curr_item=null)
{
    console.log('displayInventory()');

    // Replace with gif
    if (context.found_pieces.length == 5) {
        console.log('All pieces found, replace with GIF');
        for (var i = 0; i < context.inventory.length; i++) {
            if (context.inventory[i] == context.found_pieces) {
                context.inventory[i] = context.flip_anim;
                // Set the pieces to not visible
                for (var j = 0; j < context.found_pieces.length; j++) {
                    context.found_pieces[j].setVisible(false);
                }
                break;
            }
        }
    }

    curr_inventory = context.inventory;
    boxes = context.inventory_boxes;

    for (var i = 0; i < inventory_size; i++) {
        boxes[i].setVisible(false);
    }


	// console.log('display inventory: ', curr_inventory)
	for (var i = 0; i < curr_inventory.length; i++) {
		let curr = curr_inventory[i];
		let curr_box = boxes[i];

        if (curr != curr_item) {
            if (!Array.isArray(curr)) {
                curr.setX(curr_box.x + 10);
                curr.setY(curr_box.y);

                curr.prevX = curr.x;
                curr.prevY = curr.y;

                curr.setVisible(true);
                curr_box.setVisible(true);
            } else {
                // Multiple items in 1 inventory box
                console.log('multiple items in inventory box');
                curr.forEach(function (item, index) {
                    item.setX(curr_box.x + item.inventory_x);
                    item.setY(curr_box.y + item.inventory_y);

                    item.prevX = item.x;
                    item.prevY = item.y;

                    item.setVisible(true);
                    curr_box.setVisible(true);

                    console.log(item.x, item.y);
                });
            }
            
        }
    }
}

function loadPuzzlePieces(context)
{
    for (var i = 1; i < 16; i++) {
        context.load.image('piece'+ i, 'assets/pieces/p-' + i + '.png');
    }
    context.load.image('puzzle_base', 'assets/pieces/base.png')
}

function checkInventoryItem(context, inventoryItem)
{
    // Call when clicking on item in inventory.
    // Disable buttons, and add tint to current background.
    // Disable clicking for other inventory items (TODO)
    console.log('checkInventoryItem()');
    inventoryItem.prev_scale = inventoryItem.scale;
    context.inventory.curr_item = inventoryItem;
    context.curr_background.setTint(DARK_TINT);

    // Make a list of currently enabled items, and turn them off
    var enabled_items = [];

    if (!Array.isArray(inventoryItem)) {
        context.items.forEach(function (item, index) {
            if (item.visible && item != inventoryItem && item != context.back_button && item != context.back_button_text) {
                enabled_items.push(item);
                if (context.inventory.includes(item)) {
                    item.setVisible(false);
                } else {
                    item.setVisible(false);
                }
            };
        });
    } else {
        // Inventory item is an array
        console.log('Inventory item to focus on is array');
        context.items.forEach(function (item, index) {
            if (item.visible && !inventoryItem.includes(item)) {
                enabled_items.push(item);
                item.setVisible(false);
            };
        });
    }
    

    context.prev_back_button = context.back_button.visible;

    context.back_button.setVisible(true);
    context.back_button_text.setVisible(true);

    context.curtain_text.setText('');
    if (inventoryItem.desc) {
        context.inventory_text.setText(inventoryItem.desc);
    } else {
        console.log('something wrong with description: ', inventoryItem.desc);
        context.inventory_text.setText('???');
    }

    if (inventoryItem == context.flip_anim && context.flip_anim.curr_frame != 0) {
        context.postcard_letters.setVisible(true);
    }
    

    return enabled_items;
}

function exitInventoryItem(context, enabled_items)
{
    // Call when exiting out of inventory item.
    // Clear background tint, restore buttons.
    console.log('exitInventoryItem()');

    let curr = context.inventory.curr_item;

    if (Array.isArray(curr)) {
        curr.forEach(function (item, index) {
            item.setX(item.prevX);
            item.setY(item.prevY);
            item.state = 0;
            // item.setScale(item.prev_scale);
            item.setScale(item.inventory_scale);
            item.setAngle(0);
        });
    } else {
        curr.setX(curr.prevX);
        curr.setY(curr.prevY);
        curr.state = 0;

        if (curr.inventory_scale) {
            curr.setScale(curr.inventory_scale);
        } else {
            curr.setScale(curr.prev_scale);
        }
        


        curr.setAngle(0);
    }

    context.inventory.curr_item = null;
    context.curr_background.clearTint();
    enabled_items.forEach(function (item, index) {
        item.setVisible(true);
    });

    // if (!context.prev_back_button) {
    //     context.back_button.setVisible(false);
    //     context.back_button_text.setVisible(false);
    // }
    if (context.curr_background.texture.key == 'bg_4' || context.curr_background.texture.key == 'bg_bright') {
        context.back_button.setVisible(false);
        context.back_button_text.setVisible(false);
    }

    context.inventory_text.setText('');
    context.postcard_flip_text.setVisible(false);

    displayInventory(context);
    return;
}


function setupInventoryItem(context, item)
{
    // Call when setting up basic inventory item
    console.log('setupInventoryItem()');
    item.on('pointerup', function () {
        if (item.state == 0) {
                item.prev_button_state = checkInventoryItem(context, item);
                if (item == context.flip_anim && context.inventory.includes(context.lighter2)) {
                    context.lighter.setVisible(true);
                }
                // this.curr_background.setTint(DARK_TINT);
                item.setX(412);
                item.setY(130);
                item.prev_scale = item.scale;
                item.setScale(0.8);
                if (item == context.puzzle_box) {
                    item.setAngle(0);
                    item.setX(350);
                    item.setY(130);
                } else if (item == context.flip_anim) {
                    item.setAngle(0);
                    item.setX(470);
                    item.setY(230);
                } else if (item == context.lighter2) {
                    item.setAngle(0);
                } else {
                    item.setAngle(30);
                }
                item.state = 1;

                if (item == context.flip_anim) {
                    context.postcard_flip_text.setVisible(true);
                }

        } else if (item.state == 1) { 
            if (item == context.puzzle_box) {
                if (!PUZZLE_SOLVED) {
                    console.log('Display puzzle');
                    item.setVisible(false);
                    turn_on_puzzle(context);
                } else if (!context.postcard_5.in_inventory){
                    // Solved, so get item
                    context.postcard_5.in_inventory = true;
                    context.found_pieces.push(context.postcard_5);

                    if (context.found_pieces.length == 1) {
                        context.inventory.push(context.found_pieces);
                    }
                    context.sound_paper.play();
                    item.setTexture('puzzle_box_open_2');
                }
                item.state = 2;
            }
        } else if (item.state == 2) {
            console.log('should not go here');
        }
    }, context);
}


function setupPostcardInventoryItem(context, item)
{
    // Call when setting up basic inventory item
    console.log('setupPostcardInventoryItem()');
    item.on('pointerup', function () { 
        var all_pieces = context.found_pieces;
        if (item.state == 0) {
            all_pieces.prev_button_state = checkInventoryItem(context, all_pieces);
            // this.curr_background.setTint(DARK_TINT);
            all_pieces.forEach(function (item, index) {
                item.prev_scale = item.scale;
                item.setScale(0.8);
                item.setAngle(0);
                item.setX(172 + item.display_x);
                item.setY(95 + item.display_y);
                
                item.state = 1;
            });
        }

        // context.postcard_flip_text.setVisible(true);
    }, context);
}


function createInventoryBackButton(context)
{
    context.inventory_button = context.add.image(187, 347, 'button').setScale(0.25);
    context.inventory_button.scaleX = 0.07;
    context.inventory_button.setOrigin(0);
    console.log('here: ', context.game_text2.inventory_back_button);
    context.inventory_button_text = context.add.text(187, 347, context.game_text2.inventory_back_button, text_style).setOrigin(0); // TODO: find better way to do this
    context.inventory_button_text.x += Math.round((context.back_button.displayWidth - context.back_button_text.displayWidth) / 2);
    context.inventory_button_text.y += Math.round((context.back_button.displayHeight - context.back_button_text.displayHeight) / 2);
    context.inventory_button.setInteractive({ useHandCursor: true  });
    context.inventory_button.alpha = 0.5;
    context.inventory_button.on('pointerover', function () {
        this.alpha = 1.0;
    });
    context.inventory_button.on('pointerout', function () {
        this.alpha = 0.5;
    });
    context.inventory_button.on('pointerup', function () {
        console.log('inventory back button clicked');
        console.log('here: ', context.game_text2.inventory_back_button);
        console.log(context.game_text2);
        // context.curtain_text.setText('');
        // if (state == 'DOOR_CLOSE_1') {
        //     // Go back to door
        //     context.checkDoor();
        //     state = 'DOOR_2';
        // } else if (state == 'DOOR_2' || state == 'CURTAIN_2' || state == 'CURTAIN_3' || state == 'DESK_2' || state == 'DRAWERS_2') {
        //     // Go back to main room
        //     context.goToMainRoom();
        //     state = 'MAIN_ROOM';
        // }
    }, context);     
    context.inventory_button.setVisible(false);
    context.inventory_button_text.setVisible(false);
}


function reloadCache(context) {
    // Reload cache
    console.log('Reloading cache');
    // context.cache = new Phaser.Cache(context);
    console.log(context.cache);
    context.cache.json.remove('game_text');
    // context.load.removeAll();
}

function setupPostcardWindowButtons(context) {
    console.log('setupPostcardWindowButtons()');
    var buttonsYN = [];
    var buttonsYN_text = [];

    for (let i = 0; i < 2; i++) {
        var currY = context.add.image(252, 345, 'button').setScale(0.25);
        currY.scaleX = 0.4;
        currY.setOrigin(0);
        var currY_text = context.add.text(252, 345, context.game_text2.buttons.window_photo_1, text_style).setOrigin(0.5); // TODO: find better way to do this
        currY_text.x += Math.round((currY.displayWidth - currY_text.displayWidth) / 2);
        currY_text.y += Math.round((currY.displayHeight - currY_text.displayHeight) / 2);
        currY_text.setColor('#071938');
        currY.setInteractive({ useHandCursor: true  });

        // Make buttons opaque when hovering over them
        currY.alpha = 0.5;
        currY.on('pointerover', function () {
            this.alpha = 1.0;
        });
        currY.on('pointerout', function () {
            this.alpha = 0.5;
        });

        // Behavior when button is clicked
        var item = context.postcard_window;
        if (i == 0) {
            currY.on('pointerup', function () {
                console.log('photo window yes button clicked, item state: ', item.state);
                switch (item.state) {
                    case 1:
                        context.curtain_text.setText(context.game_text2.window_piece_2);
                        context.window_photo_button_1_text.setText(context.game_text2.buttons.window_photo_3);
                        context.window_photo_button_2_text.setText(context.game_text2.buttons.window_photo_4);
                        context.sound_window_lock.play();
                        item.state = 2;
                        break;
                    case 2:
                        // Pick up photo piece and turn off buttons
                        context.curtain_text.setText(context.game_text2.window_piece_3);
                        if (!context.postcard_1.in_inventory) {
                            context.postcard_1.in_inventory = true;
                            context.found_pieces.push(context.postcard_1);
                            if (context.found_pieces.length == 1) {
                                context.inventory.push(context.found_pieces);
                            }
                            // item.setVisible(false);
                            // displayInventory(context);
                        }

                        context.window_photo_button_1.setVisible(false);
                        context.window_photo_button_1_text.setVisible(false);
                        context.window_photo_button_2.setVisible(false);
                        context.window_photo_button_2_text.setVisible(false);

                        // context.window_blood.setVisible(true);

                        context.sound_window_lock_2.play(); // Plays door knock after completion

                        // Display 5th piece
                        context.door_arrow_on = true;
                }
            }, context); 
        } else {
            currY.on('pointerup', function () {
                console.log('photo window no button clicked');
            }, context); 
        }
            
        currY.setVisible(false);
        currY_text.setVisible(false);
        buttonsYN.push(currY);
        buttonsYN_text.push(currY_text);
        }

    buttonsYN_text[1].setText(context.game_text2.buttons.window_photo_2);

    buttonsYN[1].setY(buttonsYN[1].y + 50);
    buttonsYN_text[1].setY(buttonsYN_text[1].y + 50);

    context.window_photo_button_1 = buttonsYN[0];
    context.window_photo_button_1_text = buttonsYN_text[0];
    context.window_photo_button_2 = buttonsYN[1];
    context.window_photo_button_2_text = buttonsYN_text[1];
    
}

function setupPostcardWindow(context, item)
{
    // Setup postcard piece in window
    console.log('setupPostcardWindow()');
    item.state = 0;
    item.setInteractive({ useHandCursor: true  });
    item.desc = context.game_text2.items.photo_window;
    item.on('pointerup', function () { 
        console.log('window photo piece clicked');
        switch (item.state) {
            case 0:
                console.log('Take the piece?');
                context.curtain_text.setText(context.game_text2.window_piece_1);
                // Show yes/no button on whether to take the piece or not
                context.window_photo_button_1.setVisible(true);
                context.window_photo_button_1_text.setVisible(true);
                context.window_photo_button_2.setVisible(true);
                context.window_photo_button_2_text.setVisible(true);
                item.state = 1;
                break;
            case 1:
                console.log('Really?');
                // context.curtain_text.setText(context.game_text2.window_piece_2);
                // Show yes/no button on whether to take the piece or not again
                // item.state = 2;
                break;
            case 2:
                console.log('Piece added to inventory');
                // Add piece to inventory
                // context.curtain_text.setText(context.game_text2.window_piece_3);
                // if (!context.postcard_1.in_inventory) {
                //     context.postcard_1.in_inventory = true;
                //     context.found_pieces.push(context.postcard_1);
                //     if (context.found_pieces.length == 1) {
                //         context.inventory.push(context.found_pieces);
                //     }
                //     item.setVisible(false);
                //     displayInventory(context);
                // }
                // Add sprite
                break;
        }
        // Adding window piece to inventory
        // if (!context.postcard_1.in_inventory) {
        //     context.postcard_1.in_inventory = true;
        //     context.found_pieces.push(context.postcard_1);
        //     if (context.found_pieces.length == 1) {
        //         context.inventory.push(context.found_pieces);
        //     }
        //     item.setVisible(false);
        //     displayInventory(context);
        // }
    }, context);
}

function playWindowKnockSound(context) {
    console.log('num found pieces: ', context.found_pieces.length);
    if (state != 'CURTAIN_2' && context.found_pieces.length > 0 && !window_knock_sound_played) {
        console.log('window knock sound played');
        context.sound_window_knock.play();
        window_knock_sound_played = true;
    }
}

function pickUpPostcardPiece(context, piece) {
    piece.in_inventory = true;
    context.found_pieces.push(piece);

    if (context.found_pieces.length == 1) {
        context.inventory.push(context.found_pieces);
    }
    context.sound_paper.play();
}

function setupPostcardDoor(context, piece) {
    // Setup postcard piece in window
    console.log('setupPostcardDoor()');
    piece.setInteractive({ useHandCursor: true  });
    piece.desc = context.game_text2.items.photo_door;
    piece.on('pointerup', function () { 
        console.log('Pick up door piece');
        pickUpPostcardPiece(context, context.postcard_2);
        piece.setVisible(false);
        displayInventory(context);
        context.door_arrow_1.setTexture('door_arrow_1_red');
        context.door_arrow_2.setTexture('door_arrow_2_red');
        context.door_arrow_3.setTexture('door_arrow_3_red');
        context.drip_anim.setVisible(true).play('drip_frames');
    }, context);
}

function removeFromInventory(context, item) {
    // Remove item from context.inventory
    for (var i = 0; i < context.inventory.length; i++) {
        if (item == context.inventory[i]) {
            context.inventory.splice(i, 1);
            break;
        }
    } 
    item.setVisible(false);
    displayInventory(context);
}

function eraserDown(pointer) {
    // Called when pointer is clicked down on postcard to erase
    this.isDown = true;
    // console.log('down: ', pointer.x - this.postcard_letters.x + this.postcard_letters.width * 0.5, pointer.x);
    eraserMove(pointer);
}

function eraserMove(pointer) {
    // Called when pointer is dragged on postcard to erase
    if (!this.isDown)
    {
        return;
    }
    // console.log('eraserMove()');
    // const x = pointer.x - this.postcard_letters.x + this.postcard_letters.width * 0.5;
    // const y = pointer.y - this.postcard_letters.y + this.postcard_letters.height * 0.5;
    this.renderTexture.draw(this.brush, pointer.x, pointer.y);
}

function hash(s) {
    // Compute simple hash of string
    // Reference: https://en.wikipedia.org/wiki/Jenkins_hash_function
    var hash = 0;
    for (var i = 0; i < s.length; i ++) {
        hash += s.charCodeAt(i);
        hash += hash << 10;
        hash ^= hash >> 6;
    }
    hash += hash << 3;
    hash ^= hash >> 11;
    hash += hash << 15;
    return hash;
}

function checkPW(n) {
    return n == 2354368177;
}

function createButton(context, button_text, x=580, y=230, scale_x=0.25, scale_y=0.25) {
    var curr_button = context.add.image(x, y, 'button').setScale(0.25);
    curr_button.scaleX = scale_x;
    curr_button.scaleY = scale_y;
    curr_button.setOrigin(0);
    curr_button.text = context.add.text(x, y, button_text, text_style).setOrigin(0); // TODO: find better way to do this
    // Center the text in the button
    curr_button.text.x += Math.round((curr_button.displayWidth - curr_button.text.displayWidth) / 2);
    curr_button.text.y += Math.round((curr_button.displayHeight - curr_button.text.displayHeight) / 2);
    curr_button.setInteractive({useHandCursor: true});
    curr_button.alpha = 0.5;
    curr_button.on('pointerover', function () {
        this.alpha = 1.0;
    });
    curr_button.on('pointerout', function () {
        this.alpha = 0.5;
    });    
    curr_button.setVisible(false);
    curr_button.text.setVisible(false);

    return curr_button;
}

function setButtonVisibility(button, visibility) {
    button.setVisible(visibility);
    button.text.setVisible(visibility);
}

function moveButton(button, x, y) {
    delta_x = x - button.x;
    delta_y = y - button.y;

    button.setX(button.x + delta_x);
    button.text.setX(button.text.x + delta_x);
    button.setY(button.y + delta_y);
    button.text.setY(button.text.y + delta_y);
}

function openMiddleDrawers(context) {
    console.log('open middle drawers');
    context.sound_drawers_open.play();
    context.bg_middle_drawers_open.setVisible(true);
    context.curr_background = context.bg_middle_drawers_open;
    context.middleDrawerKnob.setVisible(false);
    context.topDrawerKnob.setVisible(true);
    context.bottomDrawerKnob.setVisible(true);
    context.lighter_in_drawers.setVisible(true);
    setButtonVisibility(context.drawers_button_1, false);
    setButtonVisibility(context.drawers_button_2, false);
}

function openBottomDrawers(context) {
    console.log('open bottom drawers');
    context.sound_drawers_open.play();
    context.bg_bottom_drawers_open.setVisible(true);
    context.curr_background = context.bg_bottom_drawers_open;
    context.middleDrawerKnob.setVisible(true);
    context.topDrawerKnob.setVisible(true);
    context.bottomDrawerKnob.setVisible(false);
    context.glass_key_in_drawers.setVisible(true);
    setButtonVisibility(context.drawers_button_1, false);
    setButtonVisibility(context.drawers_button_2, false);
}

function openMainDoor(context) {
    console.log('openMainDoor');
    curr_inventory = context.inventory;
    boxes = context.inventory_boxes;

    for (var i = 0; i < inventory_size; i++) {
        boxes[i].setVisible(false);
    }

    for (var i = 0; i < curr_inventory.length; i++) {
        curr = curr_inventory[i];
        if (Array.isArray(curr)) {
            curr.forEach(function (item, index) {
                item.setVisible(false);
            });
        } else {
            curr.setVisible(false);
        }
    }
    context.curtain_text.setVisible(false);
    context.clear_screen.setVisible(true);
    // context.cameras.main.fadeOut(1000, 255, 255, 255);

}