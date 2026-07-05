import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User

users = User.objects.all()
for u in users:
    print(f"User: {u.username}, Email: {u.email}")
