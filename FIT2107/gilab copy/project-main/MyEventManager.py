# Make sure you are logged into your Monash student account.
# Go to: https://developers.google.com/calendar/quickstart/python
# Click on "Enable the Google Calendar API"
# Configure your OAuth client - select "Desktop app", then proceed
# Click on "Download Client Configuration" to obtain a credential.json file
# Do not share your credential.json file with anybody else, and do not commit it to your A2 git repository.
# When app is run for the first time, you will need to sign in using your Monash student account.
# Allow the "View your calendars" permission request.
# can send calendar event invitation to a student using the student.monash.edu email.
# The app doesn't support sending events to non student or private emails such as outlook, gmail etc
# students must have their own api key
# no test cases for authentication, but authentication may required for running the app very first time.
# http://googleapis.github.io/google-api-python-client/docs/dyn/calendar_v3.html


# Code adapted from https://developers.google.com/calendar/quickstart/python
from __future__ import print_function
import atexit
import datetime
import json
import pickle
import os.path
import re
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# If modifying these scopes, delete the file token.pickle.


SCOPES = ['https://www.googleapis.com/auth/calendar']


def get_calendar_api():
    """
    Get an object which allows you to consume the Google Calendar API.
    You do not need to worry about what this function exactly does, nor create test cases for it.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)

    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    return build('calendar', 'v3', credentials=creds)


def get_upcoming_events(api, starting_time, number_of_events):
    """
    Shows basic usage of the Google Calendar API.
    Prints the start and name of the next n events on the user's calendar.
    """
    if (number_of_events <= 0):
        raise ValueError("Number of events must be at least 1.")

    events_result = api.events().list(calendarId='primary', timeMin=starting_time,
                                      maxResults=number_of_events, singleEvents=True,
                                      orderBy='startTime').execute()
    # return events_result.get('items', [])
    return events_result.get('items')


def get_events_id(api):
    ret  = []
    page_token = None
    while True:
        events = api.events().list(calendarId='primary', pageToken=page_token).execute()
        for event in events['items']:
            ret.append(event['id'])
        page_token = events.get('nextPageToken')
        if not page_token:
            break
    return ret


def get_events(api):
    ret = []
    page_token = None
    while True:
        events = api.events().list(calendarId='primary', pageToken=page_token).execute()
        for event in events['items']:
            ret.append(event)
        page_token = events.get('nextPageToken')
        if not page_token:
            break
    return ret


def view_events(api, attendee = False):
    events = get_events(api)

    for event in events:
        if event.get('start') is not None and event.get('end').get('dateTime') is not None:
            dateStr = event.get('end').get('dateTime')[:10]
            date1 = dateStr.split('-')
            year = date1[0]
            month = date1[1]
            day1 = date1[2]
            d1 = datetime.datetime.now() - datetime.timedelta(days=5*365)
            d1f = datetime.datetime.now() + datetime.timedelta(days=5*365)
            d2 = datetime.datetime(int(year), int(month), int(day1))
            if d1 < d2 and d1f > d2 and attendee == True:
                print([event.get('summary'), event.get('end').get('dateTime'),event.get('id')])
            elif attendee == False:
                print([event.get('summary'), event.get('end').get('dateTime'),event.get('id')])


def get_events_by_id(api, event_id):
    temp = get_events_id(api)
    for i in temp:
        event = api.events().get(calendarId='primary', eventId=i).execute()
        if event['id'] == event_id:
            return event
    return None


def get_events_by_summary(api, summary):
    temp = get_upcoming_events(api, "0000-08-03T00:00:00.000000Z", 100)
    for i in temp:
        if i['summary'] == summary:
            return i
    return None

def get_events_by_date(api, date):
    events_result = api.events().list(calendarId='primary', timeMin=date+"T00:00:00-07:00",
                                        timeMax = date+"T23:59:59-07:00", singleEvents=True,
                                      orderBy='startTime').execute()
    events_list = events_result.get('items')
    ret = []
    for i in events_list:
        if i['end']['dateTime'][:10] == date:
            ret.append(i)
    if len(ret) == 0:
        return "no events"
    else:
        return ret

def get_events_by_year(api, year):
    all_events = get_events(api)
    events = []
    temp = []

    for i in all_events:
        event_year = ''
        try:
            if i['end'] is not None:
                try:
                    event_year = i['end']['date'][:4]
                except:
                    event_year = i['end']['dateTime'][:4]
        except:
            pass

        if event_year == year:
            temp.append(i)

    if len(temp) > 0:
        return temp
    else:
        return ["no events found"]


def print_main(api):
    welcome_msg = "Welcome to MyEventManager app !\n"
    print(welcome_msg)

    user_input = input("Select account:\n  [1] Event Organiser\n [2] Event Attendees\n [0] Exit program\n")

    while True:
        if user_input == "1":
            while True:
                print_menu_organiser()
                option = input("Your option >> ")

                if option == "1":
                    event = option1(api)
                    add_event(api, event)
                elif option == "2":
                    option2(api)
                elif option == "3":
                    option3(api)
                elif option == "4":
                    option4(api)
                elif option == "5":
                    option5(api)
                elif option == "6":
                    option6(api)
                elif option == "7":
                    print("Thank you for using MyEventManager app !")
                    break
                else:
                    print("Invalid option.")
                input("\nPress Enter to continue...")

        elif user_input == "2":
            print_menu_attendees()
            option = input("Your option >> ")

            if option == "1":
                option3(api, True)
            elif option == "2":
                option4(api)
            elif option == "3":
                print("Thank you for using MyEventManager app !")
                break
            else:
                print("Invalid option.")
            input("\nPress Enter to continue...")

        elif user_input == "0":
            print("Thank you for using MyEventManager app !")
            break

        else:
            print("Invalid option.")
        input("\nPress Enter to continue...")


def option1(api):
    event_summary = input("Enter event summary: ")
    address = input("Enter event location: ")

    event_description_option = input(
        "Enter event description: \n[1] Official meeting\n [2] Online meeting\n [3] Physical event\n [4] Other "
        "description\n ")
    event_description = ""

    if event_description_option == "1":
        event_description += input("This is an official meeting.\n")
    elif event_description_option == "2":
        event_description += input("This is an online meeting.\n")
    elif event_description_option == "3":
        event_description += input("This is an physical event.\n")

    max_date = datetime.datetime(2050, 1, 1)
    input_start_date = input("Enter event start date (yyyy-mm-dd hh:mm): ")
    input_end_date = input("Enter event end date (yyyy-mm-dd hh:mm): ")
    start_date = datetime.datetime.strptime(input_start_date, "%Y-%m-%d %H:%M")
    end_date = datetime.datetime.strptime(input_end_date, "%Y-%m-%d %H:%M")
    while True:
        if start_date > max_date or end_date > max_date:
            print("Invalid Date input, date input later than 2050")
            input_start_date = input("Enter event start date (yyyy-mm-dd hh:mm): ")
            input_end_date = input("Enter event end date (yyyy-mm-dd hh:mm): ")
            start_date = datetime.datetime.strptime(input_start_date, "%Y-%m-%d %H:%M")
            end_date = datetime.datetime.strptime(input_end_date, "%Y-%m-%d %H:%M")
        else:
            break

    email1 = input("Enter attendees' email: ")
    event = create_event(event_summary, address, event_description, email1, start_date, end_date)
    return event


def option2(api):
    input_event_id = input("Enter event id to be updated: ")
    old_event = get_events_by_id(api, input_event_id)
    updated_event = option1(api)
    update_event(api, old_event, updated_event)


def option3(api, attendee = False):
    view_events(api, attendee)


def option4(api):
    input_event_id = input("Enter event id to be deleted: ")
    event_to_be_deleted = get_events_by_id(api, input_event_id)
    res = delete_event(api, event_to_be_deleted)
    if res == "success":
        print("Event has been successfully deleted.")
    elif res == "error":
        print("Failed to delete event")

def option5(api):
    with open("events.txt", "r") as file:
        eventList = file.read()
        for i in eventList:
            add_event(i)
    print("Import is Successful")
    print_main(api)


def option6(api):
    events = get_events(api)
    with open("events.txt", "w") as file:
        file.write(json.dumps(events))
    print("Export is Successful")
    print_main(api)

def print_menu_organiser():
    print("--------------------")
    print("Select an option:")
    print("1) Create Event")
    print("2) Edit Event")
    print("3) View Event")
    print("4) Delete Event")
    print("5) Import Events")
    print("6) Export Events")
    print("7) Exit")
    print("--------------------")


def print_menu_attendees():
    print("--------------------")
    print("Select an option:")
    print("1) View Event")
    print("2) Delete Event")
    print("3) Exit")
    print("--------------------")


def create_event(event_summary=None, address=None, event_description=None, email1=None, start_date=None, end_date=None):

    today = datetime.date.today()
    start_date = datetime.datetime.strptime(str(start_date), "%Y-%m-%d %H:%M:%S").strftime("%Y-%b-%d")
    end_date = datetime.datetime.strptime(str(end_date), "%Y-%m-%d %H:%M:%S").strftime("%Y-%b-%d")
    if "Online" in event_description:
        online = True
    else:
        online = False

    if (check_name(event_summary) and check_address(address, online) and check_date(start_date, today)
            and check_date(end_date, today) and date_not_larger(start_date, end_date)):

        event = {
            'summary': event_summary,
            'location': address,
            'description': event_description,
            'start': {
                'dateTime': start_date.strftime("%Y-%m-%dT%H:%M:%S"),
                'timeZone': 'GMT+08:00',
            },
            'end': {
                'dateTime': end_date.strftime("%Y-%m-%dT%H:%M:%S"),
                'timeZone': 'GMT+08:00',
            },
            'attendees': [
                {'email': email1},
            ],
            'reminders': {
                'useDefault': False,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10},
                ],
            },
        }
        return event
    else:
        return None


def check_name(name):
    flag = False
    if name != "":
        flag = True
    return flag


def check_address(address, Online):
    flag = False
    if address != "" and ((Online == True) or ("UNITED STATES" in address.upper() or "AUSTRALIA" in address.upper())):
        flag = True
    return flag


def check_date(date, today):
    flag = True

    if date == '':
        flag = False
    else:
        try:
            date = date.split('-')
            day = int(date[2])
            month = int(date[1])
            year = int(date[0])
            date = datetime.date(year,month,day)

            if year > 2050 or today > date:
                flag = False

        except ValueError:
            flag = False


    return flag


def date_not_larger(start_date, end_date):
    flag = True
    if start_date > end_date:
        flag = False
    return flag


def add_attendees(api, eventID, attendee):
    event = api.events().get(calendarId='primary', eventId=eventID)
    if len(event['attendees']) <= 20:
        event['attendees'] += attendee

        api.events().update(calendarId='primary', eventId=eventID, body=event).execute()
        return "attendee added"
    else:
        return 'event is full'


def add_event(api, event):
    if len(event['attendees']) <= 20:
        api.events().insert(calendarId='primary', body=event).execute()
        return 'success'
    else:
        return 'error'


def quick_add(api, message):
    return api.events().quickAdd(
        calendarId='primary',
        text=message).execute()


def update_event(api, event1, event2):
    event = api.events().get(calendarId='primary', eventId=event1['id']).execute()
    event_id = event['id']
    api.events().update(calendarId='primary', eventId=event_id, body=event2).execute()
    return event


def quick_delete(api, event_id):
    api.events().delete(calendarId='primary', eventId=event_id).execute()


def delete_event(api, event):
    dateStr = event['end']['dateTime'][:10]
    date1 = dateStr.split('-')

    year = date1[0]
    month = date1[1]
    day1 = date1[2]
    d1 = datetime.date(int(year), int(month), int(day1))
    if d1 < datetime.date.today():
        api.events().delete(calendarId='primary', eventId=event['id']).execute()
        return "success"
    else:
        return 'error'


def cancel_event(api, event):
    event = api.events().get(calendarId='primary', eventId=event['id']).execute()
    event['status'] = 'cancelled'
    api.events().update(calendarId='primary', eventId=event['id'], body=event).execute()
    return event


def main():
    api = get_calendar_api()

    time_now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time

    print_main(api)
    print(get_events(api))

    # # get upcoming events
    # events = get_upcoming_events(api, time_now, 10)

    # if not events:
    #     print('No upcoming events found.')
    # for event in events:
    #     start = event['start'].get('dateTime', event['start'].get('date'))
    #     print("[{}] {} {}".format(counter, start, event['summary']))


def event_exporter(api):
    events = get_events(api)
    with open("events.txt", "w") as file:
        file.write(json.dumps(events))

def event_importer(api):
    with open("events.txt", "r") as file:
        eventList = file.read()
        for i in eventList:
            add_event(i)


if __name__ == "__main__":  # Prevents the main() function from being called by the test suite runner
    main()
