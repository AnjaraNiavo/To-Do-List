import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User

def setup_admin():
    admin_username = "harisoaandrianjaka"
    admin_password = "anjara311#!!"
    admin_email = "harisoaandrianjaka@example.com"

    # 1. Reset all other staff
    User.objects.all().update(is_staff=False)
    print("All other staff privileges revoked.")

    # 2. Create or update the specific admin
    user, created = User.objects.get_or_create(username=admin_username)
    user.set_password(admin_password)
    user.email = admin_email
    user.is_staff = True
    user.is_superuser = True
    user.save()

    if created:
        print(f"User {admin_username} created as admin.")
    else:
        print(f"User {admin_username} updated as admin.")

if __name__ == "__main__":
    setup_admin()
