from django.shortcuts import render

from rest_framework import viewsets
from .models import Event, EmailAddress, Company, Subscription, SubscriptionOption
from .serializers import CompanySerializer, EventSerializer, SubscriptionOptionSerializer, SubscriptionSerializer
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
class SubscriptionOptionViewSet(viewsets.ModelViewSet):
    queryset = SubscriptionOption.objects.all()
    serializer_class = SubscriptionOptionSerializer
    
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

def get_companies_by_user_email(request, user_email):
    email_addresses = EmailAddress.objects.filter(email=user_email)
    
    companies = []
    for email_address in email_addresses:
        # Retrieve companies related to this email address
        companies_for_email = email_address.companies.all()
        for company in companies_for_email:
            serializer = CompanySerializer(company)
            companies.append(serializer.data)
            
    return JsonResponse({"companies": companies})

@csrf_exempt
@require_http_methods(["POST"])  # Only allow POST requests for updates
def update_company(request, org_number):
    try:
        data = json.loads(request.body)
        company = Company.objects.get(pk=org_number)
        
        company.address = data.get('address', company.address)
        company.city = data.get('city', company.city)
        company.contactEmail = data.get('contactEmail', company.contactEmail)
        company.description = data.get('description', company.description)
        company.name = data.get('name', company.name)
        company.phone = data.get('phone', company.phone)
        company.zip = data.get('zip', company.zip)
        # Update other fields as necessary
        company.save()
        return JsonResponse({"message": "Company updated successfully."})
    except Company.DoesNotExist:
        return HttpResponseBadRequest("Company not found.")
    except Exception as e:
        return HttpResponseBadRequest("Error updating company: {}".format(e))
    

def get_subscription_options(request):
    subscription_options = SubscriptionOption.objects.all()
    print(subscription_options)
    options = []
    for option in subscription_options:
        serializer = SubscriptionOptionSerializer(option)
        options.append(serializer.data)
    return JsonResponse({"subscription_options": options})
    
    companies = []
    for email_address in email_addresses:
        # Retrieve companies related to this email address
        companies_for_email = email_address.companies.all()
        for company in companies_for_email:
            serializer = CompanySerializer(company)
            companies.append(serializer.data)
            
    return JsonResponse({"companies": companies})