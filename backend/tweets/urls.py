from django.urls import path
from tweets.views import TweetView

# app_name will help us do a reverse look-up latter.
urlpatterns = [
    path(r'tweet/', TweetView.as_view()),
    # path(r'tweets/', TweetCommentsView.as_view()),
]
