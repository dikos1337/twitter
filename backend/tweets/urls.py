from django.urls import include, path

from tweets.views import (CreateTweetView, DetailTweetView, FeedTweetsListView,
                          TweetCommentsView, UserTweetsListView)

urlpatterns = [
    path(r'tweet/create/', CreateTweetView.as_view()),
    path(r'tweet/detail/<str:slug>/<int:pk>', DetailTweetView.as_view()),
    path(r'tweet/comments/<str:slug>/<int:pk>', TweetCommentsView.as_view()),
    path(r'tweet/user/<str:slug>', UserTweetsListView.as_view()),
    path(r'tweet/feed/', FeedTweetsListView.as_view()),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework'))
]
