from django.conf import settings
from django.contrib.auth import login, logout
from rest_framework import (authentication, generics, permissions, response,
                            views)

from .serializers import LoginSerializer, UserSerializer

# class CsrfExemptSessionAuthentication(authentication.SessionAuthentication):
#     def enforce_csrf(self, request):
#         return


class LoginView(views.APIView):
    permission_classes = (permissions.AllowAny, )
    # SessionAuthentication maybe?
    authentication_classes = (authentication.SessionAuthentication, )

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return response.Response(UserSerializer(user).data)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):
        logout(request)
        return response.Response()


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )

    def perform_create(self, serializer):
        user = serializer.save()
        user.backend = settings.AUTHENTICATION_BACKENDS[0]
        login(self.request, user)


class UserView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = UserSerializer
    lookup_field = 'pk'

    def get_object(self, *args, **kwargs):
        return self.request.user
