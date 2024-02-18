from django.shortcuts import render

from rest_framework import viewsets
from .models import Event, EmailAddress, Company
from .serializers import CompanySerializer, EventSerializer
from django.http import JsonResponse

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

def get_companies_by_user_email(request, user_email):
    # Find the email address instance(s)
    email_addresses = EmailAddress.objects.filter(email=user_email)
    
    companies = []
    for email_address in email_addresses:
        # Retrieve companies related to this email address
        companies_for_email = email_address.companies.all()
        for company in companies_for_email:
            serializer = CompanySerializer(company)
            companies.append(serializer.data)
            # companies.append({
            #     "admins":company.admins,
            #     "name": company.name,
            #     "address": company.address,
            #     "city": company.city,
            #     "contactEmail": company.contactEmail,
            #     "orgNumber": company.orgNumber,
            #     "phone": company.phone,
            #     "description": company.description,
            #     "zip": company.zip,
            # })
            
    return JsonResponse({"companies": companies})