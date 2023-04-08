from django.shortcuts import redirect, render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from .forms import ProductForm

def homepage(request):
    context = {'segment': 'index'}
    html_template = loader.get_template('pages/homepage.html')
    return HttpResponse(html_template.render(context, request))

def login(request):
    context = {'segment': 'index'}
    html_template = loader.get_template('accounts/login.html')
    return HttpResponse(html_template.render(context, request))

def CheckoutCart(request):
    context = {'segment': 'index'}
    html_template = loader.get_template('pages/CheckoutCart.html')
    return HttpResponse(html_template.render(context, request))

def create_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('pages/homepage.html')
    else:
        form = ProductForm()
    return render(request, 'pages/create_product.html', {'form': form})
