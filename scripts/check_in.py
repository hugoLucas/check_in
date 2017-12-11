import requests
import json

BASE = "https://randomapi.com/api/"
REF_ID = "INSERT_YOUR_OWN_REFID"
KEY = "INSERT_YOUR_OWN_KEY"
FMT = "prettyjson"


def get_many_users(num=1):
    results = []
    for i in range(0, num):
        results.extend(get_random_user(10))
    return results


def get_random_user(num_users=1):
    """
    Uses the random API to generate a random toro-net user. Using free-tier of API so num_users can be at most 10.
    :param num_users: the number of users to generate
    :return: a list of json objects containing the user information
    """
    if num_users > 10 or num_users < 1:
        raise ValueError("Parameter num_users is should be in range [1, 10]")

    url = BASE + REF_ID + "?key=" + KEY + "&fmt=" + FMT + "&results=" + str(num_users)
    req = requests.get(url)

    if req.status_code == 200:
        json_data = json.loads(req.text)
        return json_data["results"]
    else:
        raise ConnectionError("API returned status code: {}".format(req.status_code))


def add_users(url, user_list):
    """
    Iterates through the list of users provided and calls the url given to add the user using the appropriate
    toro-net API endpoint.
    :param url: the url route for the add user endpoint
    :param user_list: a list of encoded user objects
    :return: None
    """
    for usr in user_list:
        post_req = requests.post(url, data={
            'name': usr['name'],
            'email': usr['email'],
            'telephone': usr['telephone'],
            'company': usr['company'],
            'official': usr['official'],
            'escort': usr['escort'],
            'escortName': usr['escortName']
        })
        if post_req.status_code != 200:
            print("Failed to add user: {}".format(usr['displayName']))
        else:
            print(post_req.status_code)


new_users = get_many_users(num=10)
# new_users = get_random_user(1)
add_users(url='http://localhost:3000/visitor/add', user_list=new_users)
