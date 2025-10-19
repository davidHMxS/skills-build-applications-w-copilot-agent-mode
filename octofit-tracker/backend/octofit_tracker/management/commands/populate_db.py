from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        # Drop collections if exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()
        # Create test data
        users = [
            {"name": "Superman", "email": "superman@dc.com", "team": "DC"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Spider-Man", "email": "spiderman@marvel.com", "team": "Marvel"},
            {"name": "Captain Marvel", "email": "captainmarvel@marvel.com", "team": "Marvel"},
        ]
        teams = [
            {"name": "Marvel", "members": ["Iron Man", "Spider-Man", "Captain Marvel"]},
            {"name": "DC", "members": ["Superman", "Batman", "Wonder Woman"]},
        ]
        activities = [
            {"user": "Superman", "activity": "Flight", "duration": 120},
            {"user": "Iron Man", "activity": "Armor Training", "duration": 90},
        ]
        leaderboard = [
            {"team": "Marvel", "points": 300},
            {"team": "DC", "points": 250},
        ]
        workouts = [
            {"user": "Batman", "workout": "Martial Arts", "duration": 60},
            {"user": "Spider-Man", "workout": "Wall Climbing", "duration": 45},
        ]
        db.users.insert_many(users)
        db.teams.insert_many(teams)
        db.activities.insert_many(activities)
        db.leaderboard.insert_many(leaderboard)
        db.workouts.insert_many(workouts)
        # Create unique index on email
        db.users.create_index([("email", 1)], unique=True)
        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
