from django.contrib import admin

# Register your models here.

from .models import EmailAddress, Company, Event, SubscriptionOption, Subscription
admin.site.register(EmailAddress)
admin.site.register(Company)
admin.site.register(Event)
admin.site.register(SubscriptionOption)
admin.site.register(Subscription)