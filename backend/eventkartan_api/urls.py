"""
URL configuration for eventkartan_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r'events', views.EventViewSet)
router.register(r'companies', views.CompanyViewSet)
router.register(r'subscriptions', views.SubscriptionOptionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/get_companies_by_user_email/<str:user_email>/', views.get_companies_by_user_email, name='get_companies_by_user_email'),
    path('api/company/<int:org_number>/update/', views.update_company, name='update_company'),
    path('api/subscription_options/', views.get_subscription_options, name='get_subscription_options'),
]
