# what the field looks like
def print_field(field):
    print (field[1] + "|" + field[2] + "|" + field[3] )
    print (field[4] + "|" + field[5] + "|" + field[6] )
    print (field[7] + "|" + field[8] + "|" + field[9] )


# single move's logic
def play_move(field):
    global active_game
    while True:
        turn = input("Your field (1-9): ")
        if turn == "e":
            active_game = False
            return
        try:
            turn = int(turn)
        except ValueError:
            print("Please type in a Number from 1 to 9")
        else:
            if turn >= 1 and turn <= 9:
                if field[turn] == "X" or field[turn] == "O":
                    print("The field is already taken. Choose another one.")
                else:
                    return turn
            else:
                print("The number must be between 1 and 9")


# Change player figure
def change_player(player):
    if player == "X":
        return "O"
    else:
        return "X"


# if there is any of the following constellation, we have a winner
def check_win(field):
    #left - right
    if field[1] == field[2] == field[3]:
        return field[1]
    if field[4] == field[5] == field[6]:
        return field[4]
    if field[7] == field[8] == field[9]:
        return field[7]
    #up - down
    if field[1] == field[4] == field[7]:
        return field[1]
    if field[2] == field[5] == field[8]:
        return field[2]
    if field[3] == field[6] == field[9]:
        return field[3]
    #dia
    if field[1] == field[5] == field[9]:
        return field[5]
    if field[7] == field[5] == field[3]:
        return field[5]
    

# if field looks like this, its a draw
def check_draw(field):
    if ((field[1] == 'X' or field[1] == 'O') 
    and (field[2] == 'X' or field[2] == 'O') 
    and (field[3] == 'X' or field[3] == 'O') 
    and (field[4] == 'X' or field[4] == 'O') 
    and (field[5] == 'X' or field[5] == 'O') 
    and (field[6] == 'X' or field[6] == 'O') 
    and (field[7] == 'X' or field[7] == 'O') 
    and (field[8] == 'X' or field[8] == 'O') 
    and (field[9] == 'X' or field[9] == 'O')):
        return ('Draw!')