#Tic Tac Toe
from random import choice
from time import sleep
import events


def main():
    active_game = True
    # Ask player to choose figure
    while True:
        playerfig = input("Choose your figure: X / O?").upper()
        if playerfig == "X":
            kifig = "O"
            break
        elif playerfig == "O":
            kifig = "X"
            break
        else:
            print("This is not a valid option!")

    # Aks player for who to start
    while True:
        active_player = input("Who begins? (Enter = Random)").upper()
        if active_player == "X":
            active_player = "X"
            break
        elif active_player == "O":
            active_player = "O"
            break
        elif active_player == "":
            active_player = choice(["X", "O"])
            break
        else: 
            print("Please choose X, O or random.")

    # Init game field
    field = ["","1","2","3","4","5","6","7","8","9"]

    # Print game field to console
    events.print_field(field)

    # Lets play
    while active_game == True:
        print("Player", active_player + "'s turn")
        ki_field = []
        for opt in field:
            if opt != "X" and opt != "O" and opt != "":
                ki_field += opt
        if active_player == kifig:
            sleep(2)
            turn = int(choice(ki_field))
            print("KI chose field no." + str(turn))
        else:
            turn = events.play_move(field)

        if turn:
            field[turn] = active_player
            events.print_field(field)
            win = events.check_win(field)
            if win:
                print("...")
                sleep(2)
                print("Player", win, "wins!")
                active_game = False
                break
            draw = events.check_draw(field)
            if draw:
                print("...")
                sleep(2)
                print(draw)
                active_game = False
            new_player = events.change_player(active_player)
            active_player = new_player
    restart = input("Another round? y/n ").lower()
    if restart in ["y", "yes"]:
        main()


if __name__ == "__main__":
    main()