from calendar import calendar
<<<<<<< MyEventManagerTest.py
import datetime
=======
from datetime import datetime
>>>>>>> MyEventManagerTest.py
import unittest
from unittest import mock
from unittest import mock
from unittest.mock import MagicMock, Mock, patch
import MyEventManager
import json
<<<<<<< MyEventManagerTest.py

# Add other imports here if needed
event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'id': '123214214u12h4u21bin',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
        'dateTime': '2015-05-28T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
    },
    'end': {
        'dateTime': '2015-05-28T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
    },
    'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
        {'email': 'lpage@example.com'},
        {'email': 'sbrin@example.com'},
    ],
    'reminders': {
        'useDefault': False,
        'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10},
        ],
    },
}

=======
# Add other imports here if needed
event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'id': '123214214u12h4u21bin',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': False,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
}


>>>>>>> MyEventManagerTest.py

class MyEventManagerTest(unittest.TestCase):

    def test_get_upcoming_events_number(self):
        num_events = 2
        time = "2020-08-03T00:00:00.000000Z"

        mock_api = Mock()
        MyEventManager.get_upcoming_events(mock_api, time, num_events)

<<<<<<< MyEventManagerTest.py
        args, kwargs = mock_api.events.return_value.list.call_args_list[0]
=======
        args,kwargs = mock_api.events.return_value.list.call_args_list[0]
>>>>>>> MyEventManagerTest.py
        print(kwargs)
        self.assertEqual(kwargs['maxResults'], num_events)

    # Add more test cases here
<<<<<<< MyEventManagerTest.py
    def test_check_name(self):
        """
        Test cases related to Event Summary
         - Test Case 1 => Event Summary is empty string
         - Test Case 2 => Event Summary is not empty string
        """
        name = ""
        self.assertFalse(MyEventManager.check_name(name), "It does not return false when it is an empty name")

        name = "Testing the Event Summary"
        self.assertTrue(MyEventManager.check_name(name), "It does not return true when it is a valid name")

    def test_check_date(self):
        """
        Test cases are related to validating the Event Date::
         - Test case 1 => Empty date
         - Test case 2 => Invalid date that is not in a calendar
         - Test case 3 => Invalid past date
         - Test case 4 => Invalid date where Future year is greater than 2050
         - Test case 5 => Valid future date
         - Test case 6 => Valid present date
        """

        date = ""
        current_date = datetime.date(2022, 7, 29)
        self.assertFalse(MyEventManager.check_date(date, current_date), "It does not return false for empty date")

        date = '2023-07-35'
        self.assertFalse(MyEventManager.check_date(date, current_date),
                         "It does not return false for invalid date that is not in the calendar")

        date = '2022-06-01'
        self.assertFalse(MyEventManager.check_date(date, current_date), "It does not return false for past date")

        date = '2055-05-15'
        self.assertFalse(MyEventManager.check_date(date, current_date),
                         "It does not return false for future year is greater than 2050")

        date = '2050-12-31'
        self.assertTrue(MyEventManager.check_date(date, current_date), "It does not return True for valid future date")

        date = '2022-10-29'
        self.assertTrue(MyEventManager.check_date(date, current_date), "It does not return True for present date")

    def test_date_not_larger(self):
        """
        Tests Related to checking whether the Start date is before the End date :
         - Test case 1 => d1 <= d2
         - Test case 2 => d1 > d2
        """
        date1 = '2022-09-23'
        date2 = '2022-09-24'

        self.assertTrue(MyEventManager.date_not_larger(date1, date2),
                        "It returns False when date1 is less than or equal to date2")
        self.assertFalse(MyEventManager.date_not_larger(date2, date1), "It returns True when date1 larger than date2")

    def test_check_address(self):
        """
        Tests Related to checking whether Location are in Australia or United States when it is a physical event.
         - Test case 1 => Empty address
         - Test case 2 => Valid online address. Any address is given valid if it contains online
         - Test case 3 => Valid Physical address in Australia
         - Test case 4 => Valid Physical address in United States
         - Test case 5 => Invalid offline address (Any place outside Australia and US)
        """

        address = ''
        online = True
        self.assertFalse(MyEventManager.check_address(address, online), "It returns true when there is empty address")

        address = "asdasdasdasdasd"
        online = True
        self.assertTrue(MyEventManager.check_address(address, online), "It returns False when it is online")

        address = "Mrs Smith 98 Shirley Street PIMPAMA QLD 4209 AUSTRALIA"
        online = False
        self.assertTrue(MyEventManager.check_address(address, online), "It returns False when it is valid address in Australia")

        address = "Mrs Smith 98 Fake Street Ohio Colombus 4209 UNITED STATES"
        online = False
        self.assertTrue(MyEventManager.check_address(address, online), "It returns False when it is valid address in United States")

        address = "Fake City"
        online = False
        self.assertFalse(MyEventManager.check_address(address, online), "It returns true when it is invalid address")

=======
>>>>>>> MyEventManagerTest.py
    def test_add_event(self):
        """
        This part is testing the add_event function with a predetermined event in a JSON format, it should return 
        a "success" string to indicate that the program has run correctly
        """
        mock_api = Mock()
<<<<<<< MyEventManagerTest.py
        temp = MyEventManager.add_event(mock_api, event)
        self.assertEqual(temp, 'success')

        """
        Now we try to add more  than it is allowed, we should expect the function to return
=======
        temp = MyEventManager.add_event(mock_api,event)
        self.assertEqual(temp, 'success')

        """
        Now we try to add more attendees than it is allowed, we should expect the function to return
>>>>>>> MyEventManagerTest.py
        "error" as a string to indicate that the function has not achieved it's goal
        """
        tempEvent = event
        i = 0
        while i != 30:
<<<<<<< MyEventManagerTest.py
            tempEvent['attendees'].append({'email': 'testing@example.com'})
            i += 1
        temp = MyEventManager.add_event(mock_api, tempEvent)
=======
            tempEvent['attendees'].append( {'email': 'testing@example.com'})
            i += 1
        temp = MyEventManager.add_event(mock_api,tempEvent)
>>>>>>> MyEventManagerTest.py
        self.assertEqual(temp, 'error')

        """
        We try to add an event from the past and present to prove that the programs can take
        any date to put in the calendar
        """
        futureEvent = event
        futureEvent['attendees'] = []
        futureEvent['end']['dateTime'] = '2030-05-28T09:00:00-07:00'
<<<<<<< MyEventManagerTest.py
        temp = MyEventManager.add_event(mock_api, futureEvent)
=======
        temp = MyEventManager.add_event(mock_api,futureEvent)
>>>>>>> MyEventManagerTest.py
        self.assertEqual(temp, 'success')

        pastEvent = event
        pastEvent['end']['dateTime'] = '1942-05-28T09:00:00-07:00'
<<<<<<< MyEventManagerTest.py
        temp = MyEventManager.add_event(mock_api, pastEvent)
        self.assertEqual(temp, 'success')

=======
        temp = MyEventManager.add_event(mock_api,pastEvent)
        self.assertEqual(temp, 'success')
    
>>>>>>> MyEventManagerTest.py
    def test_delete_event(self):
        """
        In here, we try to set the predetermined event to a past date, where
        we should expect a success since the program only allows deleteing past events.
        """
        mock_api = Mock()
        event['end']['dateTime'] = '2012-05-28T09:00:00-07:00'
        temp = MyEventManager.delete_event(mock_api, event)
        self.assertEqual(temp, 'success')

        """
        In here, we try to set the predetermined event to a future date, where
        we should expect an error since the program only allows deleteing past events.
        """
        event['end']['dateTime'] = '2030-05-28T09:00:00-07:00'
        temp2 = MyEventManager.delete_event(mock_api, event)
        self.assertEqual(temp2, 'error')
<<<<<<< MyEventManagerTest.py

    def test_search_event_by_summary(self):
        mock_api = Mock()
        mock_api.events.return_value.list.return_value.execute.return_value = {
            "items": [
                {
                    "summary": "test",
                    "start": {
                        "dateTime": "2019-06-03T02:00:00+09:00"
                    },
                    "end": {
                        "dateTime": "2019-06-03T02:45:00+09:00"
                    },
                },
                {
                    "summary": "test1",
                    "start": {
                        "dateTime": "2019-06-03T02:00:00+09:00"
                    },
                    "end": {
                        "dateTime": "2019-06-03T02:45:00+09:00"
                    },
                },
            ]
        }
        summary = 'test1'
        test = MyEventManager.get_events_by_summary(mock_api, summary)
        self.assertIsNotNone(test)
        summary = 'nonexistent'
        test2 = MyEventManager.get_events_by_summary(mock_api, summary)
        self.assertEqual(test2, None)

    def test_show_events_by_year(self):
        mock_api = Mock()
        mock_api.events.return_value.list.return_value.execute.return_value = {
            "items": [
                {
                    "summary": "test",
                    "start": {
                        "dateTime": "2019-06-03T02:00:00+09:00"
                    },
                    "end": {
                        "dateTime": "2019-06-03T02:45:00+09:00"
                    },
                },
                {
                    "summary": "test1",
                    "start": {
                        "dateTime": "2019-06-03T02:00:00+09:00"
                    },
                    "end": {
                        "dateTime": "2019-06-03T02:45:00+09:00"
                    },
                },
            ]
        }

        year = '2019'
        events = MyEventManager.get_events_by_year(mock_api, year)
        self.assertEqual(len(events), 2)
        for i in events:
            self.assertEqual(i['start']['dateTime'][:4], year)

    def test_cancel_event(self):
        """
        In this test, we used a hardcoded event and added a cancelled status. to verify it again,
        we check the returned event's status
        """
        mock_api = Mock()
        event = {
            "summary": "testCancel",
            "id": "14124214gHui46",
            "start": {
                "dateTime": "2019-06-03T02:00:00+09:00"
            },
            "end": {
                "dateTime": "2019-06-03T02:45:00+09:00"
            },
        }
        mock_api.events.return_value.get.return_value.execute.return_value = event
        ret = MyEventManager.cancel_event(mock_api, event)
        self.assertEqual(ret['status'], 'cancelled')

    def test_get_event_by_date(self):
        """
        We check with a hardcoded calendar to test every path in the function.
        """
        mock_api = Mock()
        calendar = {
            "items": [
                {
                    "summary": "test",
                    "start": {
                        "dateTime": "2019-06-03T02:00:00+09:00"
                    },
                    "end": {
                        "dateTime": "2019-06-03T02:45:00+09:00"
                    },
                },
                {
                    "summary": "test1",
                    "start": {
                        "dateTime": "2019-06-03T02:00:00+09:00"
                    },
                    "end": {
                        "dateTime": "2019-06-03T02:45:00+09:00"
                    },
                },
            ]
        }
        mock_api.events.return_value.list.return_value.execute.return_value = calendar
        ret = MyEventManager.get_events_by_date(mock_api, "2019-06-03")
        self.assertEqual(len(ret), 2)

        calendar2 = {
            "items": [
                {
                    "summary": "test",
                    "start": {
                        "dateTime": "2020-06-03T02:00:00+09:00"
                    },
                    "end": {
                        "dateTime": "2020-06-03T02:45:00+09:00"
                    },
                },
                {
                    "summary": "test1",
                    "start": {
                        "dateTime": "2020-06-03T02:00:00+09:00"
                    },
                    "end": {
                        "dateTime": "2020-06-03T02:45:00+09:00"
                    },
                },
            ]
        }
        mock_api.events.return_value.list.return_value.execute.return_value = calendar2
        ret = MyEventManager.get_events_by_date(mock_api, "2019-06-03")
        self.assertEqual(ret, "no events")

=======
>>>>>>> MyEventManagerTest.py

    def test_search_event_by_summary(self):
        mock_api = Mock()
        mock_api.events.return_value.list.return_value.execute.return_value = {
        "items": [
                    {
                        "summary": "test",
                        "start": {
                            "dateTime": "2019-06-03T02:00:00+09:00"
                        },
                        "end": {
                            "dateTime": "2019-06-03T02:45:00+09:00"
                        },
                    },
                        {
                        "summary": "test1",
                        "start": {
                            "dateTime": "2019-06-03T02:00:00+09:00"
                        },
                        "end": {
                            "dateTime": "2019-06-03T02:45:00+09:00"
                        },
                    },
        ]
    }
        summary = 'test1'
        test = MyEventManager.get_events_by_summary(mock_api, summary)
        self.assertIsNotNone(test)
        summary = 'nonexistent'
        test2 = MyEventManager.get_events_by_summary(mock_api, summary)
        self.assertEqual(test2, None)
    
    def test_show_events_by_year(self):
        mock_api = Mock()
        mock_api.events.return_value.list.return_value.execute.return_value = {
        "items": [
                    {
                        "summary": "test",
                        "start": {
                            "dateTime": "2019-06-03T02:00:00+09:00"
                        },
                        "end": {
                            "dateTime": "2019-06-03T02:45:00+09:00"
                        },
                    },
                        {
                        "summary": "test1",
                        "start": {
                            "dateTime": "2019-06-03T02:00:00+09:00"
                        },
                        "end": {
                            "dateTime": "2019-06-03T02:45:00+09:00"
                        },
                    },
        ]
    }
        
        year = '2019'
        events = MyEventManager.get_events_by_year(mock_api, year)
        self.assertEqual(len(events), 2)
        for i in events:
            self.assertEqual(i['start']['dateTime'][:4], year)
    
    def test_cancel_event(self):
        """
        In this test, we used a hardcoded event and added a cancelled status. to verify it again,
        we check the returned event's status
        """
        mock_api = Mock()
        event = {
                        "summary": "testCancel",
                        "id": "14124214gHui46",
                        "start": {
                            "dateTime": "2019-06-03T02:00:00+09:00"
                        },
                        "end": {
                            "dateTime": "2019-06-03T02:45:00+09:00"
                        },
                    }
        mock_api.events.return_value.get.return_value.execute.return_value = event
        ret = MyEventManager.cancel_event(mock_api, event)
        self.assertEqual(ret['status'], 'cancelled')
    
    def test_get_event_by_date(self):
        """
        We check with a hardcoded calendar to test every path in the function.
        """
        mock_api = Mock()
        calendar = {
        "items": [
                    {
                        "summary": "test",
                        "start": {
                            "dateTime": "2019-06-03T02:00:00+09:00"
                        },
                        "end": {
                            "dateTime": "2019-06-03T02:45:00+09:00"
                        },
                    },
                        {
                        "summary": "test1",
                        "start": {
                            "dateTime": "2019-06-03T02:00:00+09:00"
                        },
                        "end": {
                            "dateTime": "2019-06-03T02:45:00+09:00"
                        },
                    },
        ]
    }
        mock_api.events.return_value.list.return_value.execute.return_value = calendar
        ret = MyEventManager.get_events_by_date(mock_api, "2019-06-03")
        self.assertEqual(len(ret),  2)

        calendar2 = {
        "items": [
                    {
                        "summary": "test",
                        "start": {
                            "dateTime": "2020-06-03T02:00:00+09:00"
                        },
                        "end": {
                            "dateTime": "2020-06-03T02:45:00+09:00"
                        },
                    },
                        {
                        "summary": "test1",
                        "start": {
                            "dateTime": "2020-06-03T02:00:00+09:00"
                        },
                        "end": {
                            "dateTime": "2020-06-03T02:45:00+09:00"
                        },
                    },
        ]
    }
        mock_api.events.return_value.list.return_value.execute.return_value = calendar2
        ret = MyEventManager.get_events_by_date(mock_api, "2019-06-03")
        self.assertEqual(ret,  "no events")

    
def main():
    # Create the test suite from the cases above.
    suite = unittest.TestLoader().loadTestsFromTestCase(MyEventManagerTest)
    # This will run the test suite.
    unittest.TextTestRunner(verbosity=2).run(suite)


main()
