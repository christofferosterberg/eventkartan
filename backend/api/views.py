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
    print(user_email)
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
        print("start")
        data = json.loads(request.body)
        company = Company.objects.get(pk=org_number)
        print(company.orgNumber)
        company.billAddress = data.get('billAddress', company.billAddress)
        company.billCity = data.get('billCity', company.billCity)
        company.billZip = data.get('billZip', company.billZip)
        company.billCountry = data.get('billCountry', company.billCountry)
        company.visitAddress = data.get('visitAddress', company.visitAddress)
        company.visitCity = data.get('visitCity', company.visitCity)
        company.visitZip = data.get('visitZip', company.visitZip)
        company.visitCountry = data.get('visitCountry', company.visitCountry)
        company.visitLatitude = data.get('visitLatitude', company.visitLatitude)
        company.visitLongitude = data.get('visitLongitude', company.visitLongitude)
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

@csrf_exempt
def get_events():
    print("hej")
    all_events = Event.objects.all()
    print(events)
    events = []
    for event in all_events:
        serializer = EventSerializer(event)
        events.append(serializer.data)
    return JsonResponse({"events": events})
    

@csrf_exempt
@require_http_methods(["POST"])  # Only allow POST requests for updates
def create_event(request):
    try:
        data = json.loads(request.body)
        try:
            host_company = Company.objects.get(orgNumber=data.get('host'))
            print(host_company.orgNumber)
        except Company.DoesNotExist:
            return HttpResponseBadRequest("Company not found.")
        
        event = Event(
            address=data.get('address'),
            book=data.get('book'),
            date=data.get('date'),
            host=host_company,  # Use the company instance created earlier
            # img=data.get('img'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            longDescription=data.get('longDescription'),
            shortDescription=data.get('shortDescription'),
            title=data.get('title')
        )
        event.save()
        return JsonResponse({"message": "Company updated successfully."})
    except Company.DoesNotExist:
        return HttpResponseBadRequest("Company not found.")
    except Exception as e:
        return HttpResponseBadRequest("Error updating company: {}".format(e))