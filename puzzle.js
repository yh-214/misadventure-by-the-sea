PUZZLE_SOLVED = false;

function hello_world()
{
    console.log('hello world from puzzle.js');
}

function setup_puzzle(context)
{
    // Setup puzzle

    // Initial positions
    square_size = 71;
    gap_size = 2;
    pos_x = 200;
    prev_pos_x = pos_x;
    pos_y = 80;
    context.puzzle = [];
    context.puzzle_state = [[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,0]];
    context.loc_to_piece = {};

    context.puzzle_base = context.add.sprite(pos_x + 39, pos_y + 39, 'puzzle_base').setOrigin(0);

    // Setup?
    // Shuffle button
    // context.puzzle_shuffle_button = context.add.rectangle(624, 200, square_size, square_size, LIGHT_BLUE).setOrigin(0);
    // context.puzzle_shuffle_button.setInteractive({useHandCursor: true});
    // context.puzzle_shuffle_button.on('pointerup', function () {
    //     console.log(context.puzzle_state);
    //     // context.answer_key = shuffle(context.puzzle, context.puzzle_state, context.loc_to_piece, 'random_moves');
    //     turn_on_puzzle(context);
    // }
    // )

    // // Solve button
    // context.puzzle_debug_button = context.add.rectangle(684, 200, square_size, square_size, LIGHT_GREEN).setOrigin(0);
    // context.puzzle_debug_button.setInteractive({useHandCursor: true});
    // context.puzzle_debug_button.on('pointerup', function () {
    //     console.log('debug button');
    //     // move_puzzle(context.loc_to_piece, context.answer_key);
    //     turn_off_puzzle(context);
    // }
    // )

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i == 3 && j == 3) {
                context.loc_to_piece[[3,3]] = null;
                break;
            }
            let num = (i*4) + j + 1;
            // let temp = context.add.rectangle(pos_x + square_size + gap_size, pos_y + square_size + gap_size, square_size, square_size, LIGHT_BLUE).setOrigin(0);
            let temp = context.add.sprite(pos_x + square_size + gap_size, pos_y + square_size + gap_size, 'piece' + num).setOrigin(0);
            temp.row = i;
            temp.col = j;
            temp.num = num;
            temp_text = context.add.text(pos_x + square_size + gap_size + 10, pos_y + square_size + gap_size + 10, num).setOrigin(0).setVisible(false);
            temp.num_text = temp_text;
            temp.setInteractive({useHandCursor: true});
            temp.on('pointerup', function () {
                console.log('puzzle, x, y: ', num, temp.row, temp.col);
                // context.sound_piece.play();
                let motion = 'none';
                // Move piece
                // Piece can only move in 1 direction (left, right, up, down), or cannot move at all
                if (temp.row < 3 && context.loc_to_piece[[temp.row+1, temp.col]] == null) {
                    motion = 'down';
                    temp.y = temp.y + square_size + gap_size;
                    temp.num_text.y += square_size + gap_size;
                    context.loc_to_piece[[temp.row, temp.col]] = null;
                    temp.row += 1;
                    context.loc_to_piece[[temp.row, temp.col]] = temp;
                    context.puzzle_state[temp.row][temp.col] = 1;
                    context.puzzle_state[temp.row-1][temp.col] = 0;
                } else if (temp.col < 3 && context.loc_to_piece[[temp.row, temp.col+1]] == null) {
                    motion = 'right';
                    temp.x += square_size + gap_size;
                    temp.num_text.x += square_size + gap_size;
                    context.loc_to_piece[[temp.row, temp.col]] = null;
                    temp.col += 1;
                    context.loc_to_piece[[temp.row, temp.col]] = temp;
                    context.puzzle_state[temp.row][temp.col] = 1;
                    context.puzzle_state[temp.row][temp.col-1] = 0;
                } else if (temp.col > 0 && context.loc_to_piece[[temp.row, temp.col-1]] == null) {
                    motion = 'left';
                    temp.x -= square_size + gap_size;
                    temp.num_text.x -= square_size + gap_size;
                    context.loc_to_piece[[temp.row, temp.col]] = null;
                    temp.col -= 1;
                    context.loc_to_piece[[temp.row, temp.col]] = temp;
                    context.puzzle_state[temp.row][temp.col] = 1;
                    context.puzzle_state[temp.row][temp.col+1] = 0;
                } else if (temp.row > 0 && context.loc_to_piece[[temp.row-1, temp.col]] == null) {
                    motion = 'up';
                    temp.y -= square_size + gap_size;
                    temp.num_text.y -= square_size + gap_size;
                    context.loc_to_piece[[temp.row, temp.col]] = null;
                    temp.row -= 1;
                    context.loc_to_piece[[temp.row, temp.col]] = temp;
                    context.puzzle_state[temp.row][temp.col] = 1;
                    context.puzzle_state[temp.row+1][temp.col] = 0;
                } else {
                    console.log('this piece cannot move right now');
                }
                console.log('move ', temp.num, motion);
                solved = check_solved(context.puzzle);
                console.log('solved: ', solved);

                if (motion == 'none') {
                    context.sound_piece_2.play();
                } else {
                    context.sound_piece.play();
                }

                if (solved && !PUZZLE_SOLVED) {
                    context.sound_puzzle_box_unlock.play();
                    PUZZLE_SOLVED = true;
                    context.puzzle_box.setTexture('puzzle_box_open_1');
                }
            }, context);

            context.puzzle.push(temp);
            context.loc_to_piece[[i, j]] = temp;
            pos_x += square_size + gap_size;
        }
        pos_y += square_size + gap_size;
        pos_x = prev_pos_x;
    }
}

function setup_puzzle_test(context)
{
    // Setup puzzle

    // Initial positions
    square_size = 30;
    gap_size = 2;
    pos_x = 624;
    pos_y = 25;
    context.puzzle = [];
    context.puzzle_state = [[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,0]];
    context.loc_to_piece = {};

    // Setup?
    context.puzzle_shuffle_button = context.add.rectangle(624, 200, square_size, square_size, LIGHT_BLUE).setOrigin(0);
    context.puzzle_shuffle_button.setInteractive({useHandCursor: true});
    context.puzzle_shuffle_button.on('pointerup', function () {
        console.log(context.puzzle_state);
        context.answer_key = shuffle(context.puzzle, context.puzzle_state, context.loc_to_piece, 'random_moves');
    }
    )

    context.puzzle_debug_button = context.add.rectangle(684, 200, square_size, square_size, LIGHT_GREEN).setOrigin(0);
    context.puzzle_debug_button.setInteractive({useHandCursor: true});
    context.puzzle_debug_button.on('pointerup', function () {
        console.log('debug button');
        move_puzzle(context.loc_to_piece, context.answer_key);
    }
    )

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i == 3 && j == 3) {
                context.loc_to_piece[[3,3]] = null;
                break;
            }
            console.log(pos_x+(i*square_size)+gap_size, pos_y+(j*square_size)+gap_size);
            let num = (i*4) + j + 1;
            let temp = context.add.rectangle(pos_x + square_size + gap_size, pos_y + square_size + gap_size, square_size, square_size, LIGHT_BLUE).setOrigin(0);
            temp.row = i;
            temp.col = j;
            temp.num = num;
            temp_text = context.add.text(pos_x + square_size + gap_size + 10, pos_y + square_size + gap_size + 10, num).setOrigin(0);
            temp.num_text = temp_text;
            temp.setInteractive({useHandCursor: true});
            temp.on('pointerup', function () {
                console.log('puzzle, x, y: ', num, temp.row, temp.col);
                let motion = 'none';
                // Move piece
                // Piece can only move in 1 direction (left, right, up, down), or cannot move at all
                if (temp.row < 3 && context.loc_to_piece[[temp.row+1, temp.col]] == null) {
                    motion = 'down';
                    temp.y = temp.y + square_size + gap_size;
                    temp.num_text.y += square_size + gap_size;
                    context.loc_to_piece[[temp.row, temp.col]] = null;
                    temp.row += 1;
                    context.loc_to_piece[[temp.row, temp.col]] = temp;
                    context.puzzle_state[temp.row][temp.col] = 1;
                    context.puzzle_state[temp.row-1][temp.col] = 0;
                } else if (temp.col < 3 && context.loc_to_piece[[temp.row, temp.col+1]] == null) {
                    motion = 'right';
                    temp.x += square_size + gap_size;
                    temp.num_text.x += square_size + gap_size;
                    context.loc_to_piece[[temp.row, temp.col]] = null;
                    temp.col += 1;
                    context.loc_to_piece[[temp.row, temp.col]] = temp;
                    context.puzzle_state[temp.row][temp.col] = 1;
                    context.puzzle_state[temp.row][temp.col-1] = 0;
                } else if (temp.col > 0 && context.loc_to_piece[[temp.row, temp.col-1]] == null) {
                    motion = 'left';
                    temp.x -= square_size + gap_size;
                    temp.num_text.x -= square_size + gap_size;
                    context.loc_to_piece[[temp.row, temp.col]] = null;
                    temp.col -= 1;
                    context.loc_to_piece[[temp.row, temp.col]] = temp;
                    context.puzzle_state[temp.row][temp.col] = 1;
                    context.puzzle_state[temp.row][temp.col+1] = 0;
                } else if (temp.row > 0 && context.loc_to_piece[[temp.row-1, temp.col]] == null) {
                    motion = 'up';
                    temp.y -= square_size + gap_size;
                    temp.num_text.y -= square_size + gap_size;
                    context.loc_to_piece[[temp.row, temp.col]] = null;
                    temp.row -= 1;
                    context.loc_to_piece[[temp.row, temp.col]] = temp;
                    context.puzzle_state[temp.row][temp.col] = 1;
                    context.puzzle_state[temp.row+1][temp.col] = 0;
                } else {
                    console.log('this piece cannot move right now');
                }
                console.log('move ', temp.num, motion);
                solved = check_solved(context.puzzle);
                console.log('solved: ', solved);
                if (solved && !PUZZLE_SOLVED) {
                    context.sound_puzzle_box_unlock.play();
                    PUZZLE_SOLVED = true;
                }
            }, context);

            context.puzzle.push(temp);
            context.loc_to_piece[[i, j]] = temp;
            pos_x += square_size + gap_size;
        }
        pos_y += square_size + gap_size;
        pos_x = 624;
    }
}

function turn_off_puzzle(context)
{
    for (let i = 0; i < context.puzzle.length; i++) {
        context.puzzle[i].setVisible(false);
    }
    context.puzzle_base.setVisible(false);
}

function turn_on_puzzle(context)
{
    for (let i = 0; i < context.puzzle.length; i++) {
        context.puzzle[i].setVisible(true);
    }
    context.puzzle_base.setVisible(true);
}

function check_solved(pieces)
{
    // Check if puzzle has been solved
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i == 3 & j == 3) {
                return true;
            }
            if (pieces[(i * 4 ) + j].row != i || pieces[(i * 4 ) + j].col != j) {
                return false;
            }
        }
    }
}

function shuffle(pieces, puzzle_state, loc_to_piece, mode='debug')
{
    // Shuffle puzzle
    if (mode == 'random') {
        // Shuffle completely randomly, resulting configuration may be unsolvable
        // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
        //
        // ...apparently half of the configurations are unsolvable so probably just
        // better to randomly generate moves from sovled state
        for (let i = 14; i >= 1; i--) {
            let j = Math.floor(Math.random() * i);
            let curr_i = pieces[i];
            let curr_j = pieces[j];

            [curr_i.row, curr_j.row] = [curr_j.row, curr_i.row];
            [curr_i.col, curr_j.col] = [curr_j.col, curr_i.col];

            [curr_i.x, curr_j.x] = [curr_j.x, curr_i.x];
            [curr_i.y, curr_j.y] = [curr_j.y, curr_i.y];

            [curr_i.num_text.x, curr_j.num_text.x] = [curr_j.num_text.x, curr_i.num_text.x];
            [curr_i.num_text.y, curr_j.num_text.y] = [curr_j.num_text.y, curr_i.num_text.y];
        }
        console.log(pieces[0].row, pieces[0].col);
    } else if (mode == 'debug') {
        console.log('shuffle debug');
        console.log('before shuffle: ', pieces);
        pieces[0] = pieces[1];
        // pieces[0], pieces[1] = pieces[1], pieces[0];
        console.log('after shuffle: ', pieces);
    } else if (mode == 'random_moves') {
        // let NUM_MOVES = 30;
        console.log('shuffle via random moves ', NUM_MOVES);

        let answer_key = [];

        // Find the open slot
        let open_r = 0;
        let open_c = 0;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (loc_to_piece[[r, c]] == null) {
                    open_r = r;
                    open_c = c;
                }
            }
        }
        console.log('open slot (row, col): ', open_r, open_c);

        let move_piece;
        let prev_move = 'nothing';
        for (let i = 0; i < NUM_MOVES; i++) {
            // Randomly pick which piece to move
            candidates = [];
            if (open_r > 0 && prev_move != 'up') {
                candidates.push([open_r-1, open_c, 'down']);
            }
            if (open_r < 3 && prev_move != 'down') {
                candidates.push([open_r+1, open_c, 'up']);
            }
            if (open_c > 0 && prev_move != 'left') {
                candidates.push([open_r, open_c-1, 'right']);
            }
            if (open_c < 3 && prev_move != 'right') {
                candidates.push([open_r, open_c+1, 'left']);
            }
            let rand_ind = Math.floor(Math.random() * candidates.length);
            move_piece = candidates[rand_ind];

            // Move piece and update open slot
            console.log('moving piece with index ', move_piece[0]*4 + move_piece[1]);
            let curr = loc_to_piece[[move_piece[0], move_piece[1]]];
            console.log(move_piece[2]);
            loc_to_piece[[curr.row, curr.col]] = null;
            let opposite_move = null;
            prev_move = move_piece[2];
            switch (move_piece[2]) {
                case 'up':
                    curr.row -= 1;
                    curr.y -= square_size + gap_size;
                    curr.num_text.y -= square_size + gap_size;
                    open_r += 1;
                    opposite_move = 'down';
                    console.log('moved up');
                    break;
                case 'down':
                    curr.row += 1
                    curr.y += square_size + gap_size;
                    curr.num_text.y += square_size + gap_size;
                    open_r -= 1;
                    opposite_move = 'up';
                    console.log('moved down');
                    break;
                case 'left':
                    curr.col -= 1;
                    curr.x -= square_size + gap_size;
                    curr.num_text.x -= square_size + gap_size;
                    open_c += 1;
                    opposite_move = 'right';
                    console.log('moved left');
                    break;
                case 'right':
                    curr.col += 1;
                    curr.x += square_size + gap_size;
                    curr.num_text.x += square_size + gap_size;
                    open_c -= 1;
                    opposite_move = 'left';
                    console.log('moved right');
                    break;
            }
            loc_to_piece[[curr.row, curr.col]] = curr;
            console.log('current open slot row, col: ', open_r, open_c);
            answer_key.push([curr.row, curr.col, opposite_move]);
        }
        answer_key.reverse();
        return answer_key;

    }
    return;
}

function check_solvable(pieces) {
    // Check if configuration is solvable
    // https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
}

function move_puzzle(loc_to_piece, moves) {
    // Move puzzle according to given moves
    // If a move is invalid, piece will stay unmoved and will proceed to
    // the next step
    for (let i = 0; i < moves.length; i++) {
        let m = moves[i];
        let piece = loc_to_piece[[m[0], m[1]]];
        let move = m[2];

        // Check if the location to move to is valid (valid coordinates + there is not another piece there)
        let next_loc = [m[0], m[1]];
        switch (move) {
            case 'up':
                next_loc[0] -= 1;
                break;
            case 'down':
                next_loc[0] += 1;
                break;
            case 'left':
                next_loc[1] -= 1;
                break;
            case 'right':
                next_loc[1] += 1;
                break;
        }
        if (next_loc[0] > 3 || next_loc[0] < 0 || next_loc[1] > 3 || next_loc[1] < 0 || loc_to_piece[next_loc] != null) {
            continue;
        }

        // If valid, move piece
        loc_to_piece[[m[0], m[1]]] = null;
        loc_to_piece[next_loc] = piece;
        switch (move) {
            case 'up':
                piece.row -= 1;
                piece.y -= square_size + gap_size;
                piece.num_text.y -= square_size + gap_size;
                break;
            case 'down':
                piece.row += 1;
                piece.y += square_size + gap_size;
                piece.num_text.y += square_size + gap_size;
                break;
            case 'left':
                piece.col -= 1;
                piece.x -= square_size + gap_size;
                piece.num_text.x -= square_size + gap_size;
                break;
            case 'right':
                piece.col += 1;
                piece.x += square_size + gap_size;
                piece.num_text.x += square_size + gap_size;
                break;
        }
    }
}