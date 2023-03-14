from django.shortcuts import render

from django.http import HttpResponse
from django.template import loader

def homepage(request):
    context = {'segment': 'index'}
    html_template = loader.get_template('homepage.html')
    return HttpResponse(html_template.render(context, request))
