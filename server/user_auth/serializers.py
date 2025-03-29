from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Profile
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


from rest_framework import serializers

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'phone_number', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')

        # Create User instance
        user = User(**validated_data)
        user.set_password(password)  # Hash password
        user.save()

        # Create Profile automatically
        Profile.objects.create(user=user)

        return user




class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()  # Assuming login via email
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])  # Use email instead of username
        
        if not user:
            raise serializers.ValidationError("Invalid email or password.")
        
        if not user.is_active:
            raise serializers.ValidationError("User account is not active.")
        
        return user
