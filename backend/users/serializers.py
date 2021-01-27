from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import User
from .validators import validate_username


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs['email'],
                            password=attrs['password'])

        if not user:
            raise serializers.ValidationError('Incorrect email or password.')

        if not user.is_active:
            raise serializers.ValidationError('User is disabled.')

        return {'user': user}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'slug', 'last_login', 'email', 'name', 'is_active',
                  'joined_at', 'password')
        read_only_fields = ('last_login', 'is_active', 'joined_at')
        extra_kwargs = {
            'password': {
                'required': True,
                'write_only': True
            },
            'name': {
                'required': True
            },
            'slug': {
                'required': False
            }
        }

    @staticmethod
    def validate_email(value):
        return validate_username(value)

    def create(self, validated_data):
        return User.objects.create_user(validated_data.pop('email'),
                                        validated_data.pop('password'),
                                        **validated_data)


class UserTweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'slug')
        extra_kwargs = {
            'id': {
                'read_only': True
            },
            'name': {
                'read_only': True
            },
            'slug': {
                'read_only': True
            }
        }


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'slug', 'joined_at')
