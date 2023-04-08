from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('login/', views.login, name='login'),
    path('create_product/', views.create_product, name='create_product'),
    path('carrinho/', views.CheckoutCart, name='CheckoutCart'),
]
