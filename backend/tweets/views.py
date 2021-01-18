from rest_framework import generics
from tweets.models import Tweet
from tweets.serializers import TweetSerializer


class TweetView(generics.ListAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer


# class TweetCommentsView(generics.ListAPIView):
#     queryset = TweetComment.objects.all()
#     serializer_class = TweetCommentSerializer
