from random import choice


print("Hangman via Python")
print("Exit with \"BYE\" ")
#List of words
wordlist = 'Dog Cat House Car Street Sky'.split()
guess = []
userinput = ""
attempts = 7
word = choice(wordlist)

# print a _ for every letter in word
for letter in word:
    guess.append('_')

while userinput != "bye":
    for output in guess:
        print(output, end=' ')
    print()
    print("Remaining attempts: ", attempts)
    userinput = input("Your suggestion: ")
    #for loop with x increasing during looping
    x = 0 
    for letter in word:
        if letter.lower() == userinput.lower():
            print("Hit!")
            guess[x] = letter
        x += 1
    print()
    #check for winner
    if '_' in guess: 
        attempts -= 1
        if attempts == 0:
            print("Game over!")
            break
    else:
        print("You won! The word was: ", word)
        break