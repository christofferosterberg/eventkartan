from django.db import models

class EmailAddress(models.Model):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email

class Company(models.Model):
    admins = models.ManyToManyField(EmailAddress, related_name='companies')
    address = models.CharField(max_length=40)
    city = models.CharField(max_length=30)
    contactEmail = models.EmailField(unique=False)
    name = models.CharField(max_length=50)
    orgNumber = models.CharField(max_length=30, primary_key=True)
    phone = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True, max_length=200)
    zip = models.CharField(max_length=5)

    def __str__(self):
        return self.name

# Create your models here.
class Event(models.Model):
    address = models.CharField(max_length=200)
    book = models.TextField()
    date = models.DateTimeField()
    host = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='events')
    img = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    longDesciption = models.TextField()
    shortDescription = models.TextField()
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title
    
class SubscriptionOption(models.Model):
    name = models.CharField(max_length=50)
    eventQuantity = models.IntegerField()
    type = models.IntegerField()
    price = models.FloatField()
    recurring = models.BooleanField()

    def __str__(self):
        return self.name
    
class Subscription(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='subscriptions')
    eventsLeft = models.IntegerField()
    subscriptionOption = models.ForeignKey(SubscriptionOption, on_delete=models.CASCADE, related_name='subscriptions')
    price = models.FloatField()
    recurring = models.BooleanField()
    renewDate = models.DateTimeField()
    subscribeDate = models.DateTimeField()
    type = models.IntegerField()

    def __str__(self):
        company_name = str(self.company)
        option = str(self.subscriptionOption)
        subscribe_date_str = self.subscribeDate.strftime("%Y-%m-%d")
        return f"{company_name} - {option} (Subscribed on {subscribe_date_str})"