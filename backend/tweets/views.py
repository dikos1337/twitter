from rest_framework import generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from tweets.models import Tweet
from tweets.serializers import CreateTweetSerializer, TweetSerializer


class CreateTweetView(generics.CreateAPIView):
    """Создание секрета"""
    queryset = Tweet.objects.all()
    serializer_class = CreateTweetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer, user):
        # Добавляю к форме объект пользователя из сессии
        serializer.save(**{"user": user})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer, user=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)


class DetailTweetView(generics.RetrieveAPIView):
    serializer_class = TweetSerializer
    queryset = Tweet.objects.all()


class UserTweetsListView(generics.ListAPIView):
    serializer_class = TweetSerializer

    def get_queryset(self):
        # TODO except 404
        return Tweet.objects.filter(
            user=self.kwargs['pk']).order_by('-created')


class FeedTweetsListView(generics.ListAPIView):
    # TODO Получать только свои и из подписок
    queryset = Tweet.objects.all().order_by('-created')
    serializer_class = TweetSerializer


# class TweetCommentsView(generics.ListAPIView):
#     queryset = TweetComment.objects.all()
#     serializer_class = TweetCommentSerializer
