import locale
import time
from datetime import date
locale.setlocale(locale.LC_ALL, 'de_DE')


# Take 3 arguments: day, month, year
# calculate time since or until the selected date
def calc(day, month, year):
    today = date.today()
    userinput = date(year, month, day)
    if today > userinput:
        timediff = today - userinput
        return print("Since then, there have been", timediff.days, "days gone.")
    elif today < userinput:
        timediff = userinput - today
        return print("Until then, there are", timediff.days, "days left.")
    else:
        return print("Thats today, bro :D")


# request any date
def request(): 
    while True:
        userday = int(input("First select a day: "))
        usermonth = int(input("Then select a month: "))
        useryear = int(input("And finally select a year: "))
        start = input("Now type \"Go!\" to start calculation: ")
        if start.lower() in ["go", "go!"]:
            print("Calculating...")
            time.sleep(3)
            calc(userday, usermonth, useryear)
            break
        else:
            print("Once again...")
            time.sleep(6)
            request()


# first, main function call request after welcome message
def main():
    print("Hello there! I'm a time calculator - Just give me 3 inputs:")
    print()
    request()


if __name__ == "__main__":
    main()