from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .forms import ProductForm
from django.template import Context


def homepage(request):
    context = {'segment': 'index'}
    html_template = loader.get_template('pages/homepage.html')
    return HttpResponse(html_template.render(context, request))


def login(request):
    context = {'segment': 'index'}
    html_template = loader.get_template('accounts/login.html')
    return HttpResponse(html_template.render(context, request))


def create_product(request):
    form = ProductForm()
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()

    context = {'form': form}
    html_template = loader.get_template('pages/create_product.html')
    html_content = html_template.render(context, request)
    return HttpResponse(html_content)
