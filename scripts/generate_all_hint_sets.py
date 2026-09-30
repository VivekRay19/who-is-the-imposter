import os
import json
import re

# Generator for 13 categories with 4 explicit pairs of 2 hints (8 distinct hints total) per word.

from cats_animals_birds_insects import ANIMALS, BIRDS, INSECTS
from cats_fruits_veg_food import FRUITS, VEGETABLES, FOOD
from cats_countries_cities_sports import COUNTRIES, CITIES, SPORTS
from cats_household_professions_vehicles import HOUSEHOLD, PROFESSIONS, VEHICLES
from cats_movies import MOVIES

CATEGORIES = [
  {"id": "animals", "name": "Animals", "varName": "animalsWords", "data": ANIMALS},
  {"id": "fruits", "name": "Fruits", "varName": "fruitsWords", "data": FRUITS},
  {"id": "vegetables", "name": "Vegetables", "varName": "vegetablesWords", "data": VEGETABLES},
  {"id": "birds", "name": "Birds", "varName": "birdsWords", "data": BIRDS},
  {"id": "food", "name": "Food", "varName": "foodWords", "data": FOOD},
  {"id": "household", "name": "Household Objects", "varName": "householdWords", "data": HOUSEHOLD},
  {"id": "insects", "name": "Insects", "varName": "insectsWords", "data": INSECTS},
  {"id": "countries", "name": "Countries", "varName": "countriesWords", "data": COUNTRIES},
  {"id": "cities", "name": "Cities", "varName": "citiesWords", "data": CITIES},
  {"id": "sports", "name": "Sports", "varName": "sportsWords", "data": SPORTS},
  {"id": "professions", "name": "Professions", "varName": "professionsWords", "data": PROFESSIONS},
  {"id": "vehicles", "name": "Vehicles", "varName": "vehiclesWords", "data": VEHICLES},
  {"id": "movies", "name": "Movies", "varName": "moviesWords", "data": MOVIES}
]

def slugify(text):
    clean = re.sub(r'\s*\(.*?\)\s*', '', text)
    return re.sub(r'[^a-z0-9]+', '_', clean.lower()).strip('_')

# Rich conceptual hint sets for all categories
# Every entry gets 4 distinct pairs of 2 hints
print("Generating comprehensive hint sets...")
