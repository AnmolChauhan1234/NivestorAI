from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
# from django.contrib.gis.db import models as geomodels  # Import GIS models

# Create your models here.


from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, full_name, phone_number, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        if not phone_number:
            raise ValueError("The Phone Number field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, phone_number, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, full_name, phone_number, password, **extra_fields)


class User(AbstractUser):
    # Remove username field completely
    username = None  

    # Use email as the unique identifier for authentication
    email = models.EmailField(unique=True)


    full_name = models.CharField(max_length=100, null=False)
    phone_number = models.CharField(max_length=15, unique=True, null=False)
    profile_picture = models.CharField(max_length=255, blank=True, null=True)  # Storing Cloudinary URL
    refresh_token = models.TextField(blank=True, null=True)  # Stores JWT Refresh Token
    joined_at = models.DateTimeField(auto_now_add=True)  # Timestamp when user registers
    reset_token = models.UUIDField(default=uuid.uuid4, null=True, blank=True)
    otp = models.CharField(max_length=6, null=True, blank=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)


    # Set email as the USERNAME_FIELD (authentication field)
    USERNAME_FIELD = 'email'
    
    # Fields required for creating a superuser
    REQUIRED_FIELDS = ['full_name', 'phone_number']

    objects = CustomUserManager()  # Use the custom user manager

    def __str__(self):
        return f"{self.email})"




class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.PositiveIntegerField(blank=True, null=True)  # Optional field
    gender = models.CharField(
        max_length=10, 
        choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')],
        blank=True, 
        null=True
    )  # Optional
    address = models.TextField(blank=True, null=True)  # Optional
    # preferred_stocks = models.ManyToManyField('market.Stock', blank=True)

    def __str__(self):
        return self.user.full_name
    


class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} - {self.message}"