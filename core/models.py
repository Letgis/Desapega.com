from django.db import models
import uuid

class Product(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True,  editable=False)
    name = models.CharField(max_length=120)
    description = models.TextField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    # category = models.ForeignKey('Category', on_delete=models.CASCADE)
    # user = models.ForeignKey('User', on_delete=models.CASCADE)

    objects = models.Manager()

    def __str__(self):
        return str(self.id)


class Cliente(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True,  editable=False)
    name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=500)
    age = models.DecimalField(max_digits=10, decimal_places=2)
    picture = models.ImageField(upload_to='products')
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return str(self.id)


class Empresas(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True,  editable=False)
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=500)
    cnpj = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return str(self.id)
