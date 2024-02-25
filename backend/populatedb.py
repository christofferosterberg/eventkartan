import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eventkartan_api.settings')
django.setup()

from api.models import EmailAddress, Company, Event, SubscriptionOption, Subscription

def populate():
    email_1 = EmailAddress(email='test@test.se')
    email_2 = EmailAddress(email='test2@test.se')
    email_3 = EmailAddress(email='test3@test.se')
    email_1.save()
    email_2.save()
    email_3.save()

    company = Company(
        billAddress='Masthuggstorget',
        billCity='Göteborg',
        billZip='413 27',
        billCountry='Sverige',
        visitAddress='Andra Långgatan 20',
        visitCity='Göteborg',
        visitZip='413 27',
        visitCountry='Sverige',
        contactEmail='info@hops.se',
        name='Hops',
        orgNumber='551111-1111',
        phone='123-456-7890',
        description='En mysig bar längst upp på Andra Långgatan',
    )
    company.save()
    company.admins.add(email_1)
    company.admins.add(email_2)
    company.admins.add(email_3)

    event = Event(
        address='Masthuggstorget',
        book='www.lank-till-sida.se',
        date='2025-01-01 10:00:00',
        host=company,  # Use the company instance created earlier
        img='',
        latitude=57.698558,
        longitude=-11.9436,
        longDesciption='Välkommen till ett roligt event! Det blir quiz!',
        shortDescription='Välkommen till ett roligt event!',
        title='Musikquiz på Hops'
    )
    event.save()

    subscription_option_1 = SubscriptionOption(
        name='Ett event',
        eventQuantity=1,
        type=1,
        price=200,
        recurring=False
    )
    subscription_option_2 = SubscriptionOption(
        name='Fem event',
        eventQuantity=5,
        type=2,
        price=400,
        recurring=False
    )
    subscription_option_3 = SubscriptionOption(
        name='Tre event per månad',
        eventQuantity=3,
        type=3,
        price=300,
        recurring=True
    )
    subscription_option_4 = SubscriptionOption(
        name='Fem event per månad',
        eventQuantity=5,
        type=4,
        price=400,
        recurring=True
    )
    subscription_option_5 = SubscriptionOption(
        name='Tio event per månad',
        eventQuantity=10,
        type=5,
        price=700,
        recurring=True
    )
    subscription_option_1.save()
    subscription_option_2.save()
    subscription_option_3.save()
    subscription_option_4.save()
    subscription_option_5.save()

    subscription = Subscription(
        eventsLeft=2,
        subscriptionOption=subscription_option_3,  # Use the SubscriptionOption instance
        price=300,
        recurring=True,
        renewDate='2025-01-01 00:00:00',
        subscribeDate='2024-01-01 00:00:00',
        type=3
    )
    subscription.save()
    company.subscription = subscription
    company.save()

    print(Company.objects.all())
    print(Event.objects.all())
    print(Subscription.objects.all())
    
if __name__ == '__main__':
    print("Populating the database... Please wait.")
    populate()
    print("Populating complete.")