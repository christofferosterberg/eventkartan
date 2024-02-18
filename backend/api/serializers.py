from rest_framework import serializers
from .models import Company, EmailAddress, Event, Subscription, SubscriptionOption

class EmailAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailAddress
        fields = '__all__'
        
class CompanySerializer(serializers.ModelSerializer):
    admins = EmailAddressSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = '__all__'
        
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        
class SubscriptionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionOption
        fields = '__all__'
        
class SubscriptionSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    SubscriptionOption = SubscriptionOptionSerializer(read_only=True)
    
    class Meta:
        model = Subscription
        fields = '__all__'
