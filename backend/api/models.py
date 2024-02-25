from django.db import models

class SubscriptionOption(models.Model):
    name = models.CharField(max_length=50)
    eventQuantity = models.IntegerField()
    type = models.IntegerField()
    price = models.FloatField()
    recurring = models.BooleanField()

    def __str__(self):
        return self.name
    
class Subscription(models.Model):
    eventsLeft = models.IntegerField()
    subscriptionOption = models.ForeignKey(SubscriptionOption, on_delete=models.CASCADE, related_name='subscriptions')
    price = models.FloatField()
    recurring = models.BooleanField()
    renewDate = models.DateTimeField()
    subscribeDate = models.DateTimeField()
    type = models.IntegerField()

    def __str__(self):
        option = str(self.subscriptionOption)
        subscribe_date_str = self.subscribeDate.strftime("%Y-%m-%d")
        return f"Subscription: {option} started on {subscribe_date_str}"

class EmailAddress(models.Model):
    email = models.EmailField(primary_key=True)

    def __str__(self):
        return self.email

class Company(models.Model):
    admins = models.ManyToManyField(EmailAddress, related_name='companies')
    billAddress = models.CharField(max_length=40, blank=True)
    billCity = models.CharField(max_length=40, blank=True)
    billZip = models.CharField(max_length=40, blank=True)
    billCountry = models.CharField(max_length=40, blank=True)
    visitAddress = models.CharField(max_length=40, blank=True)
    visitCity = models.CharField(max_length=40, blank=True)
    visitZip = models.CharField(max_length=40, blank=True)
    visitCountry = models.CharField(max_length=40, blank=True)
    visitLatitude = models.FloatField(blank=True, null=True)
    visitLongitude = models.FloatField(blank=True, null=True)
    contactEmail = models.EmailField(unique=False, blank=True)
    description = models.TextField(blank=True, max_length=200)
    name = models.CharField(max_length=50)
    orgNumber = models.CharField(max_length=30, primary_key=True)
    phone = models.CharField(max_length=50, blank=True)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, null=True, blank=True, related_name='companies')
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
    longDescription = models.TextField()
    shortDescription = models.TextField()
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title
