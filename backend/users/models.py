from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

from users.managers import UserManager
from users.utils import unique_slug_generator


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('Email', max_length=255, unique=True)
    name = models.CharField('Name', max_length=255, blank=True)
    is_staff = models.BooleanField('Is staff', default=False)
    is_active = models.BooleanField('Is active', default=True)
    joined_at = models.DateTimeField('Joined at', default=timezone.now)
    slug = models.SlugField(
        blank=False, unique=True,
        default=unique_slug_generator)  # TODO fix: may not be unique

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
