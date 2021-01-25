from django.urls import include, path

from tweets.views import (CreateTweetView, DetailTweetView, FeedTweetsListView,
                          UserTweetsListView)

urlpatterns = [
    path(r'tweet/create/', CreateTweetView.as_view()),
    path(r'tweet/detail/<int:pk>', DetailTweetView.as_view()),
    path(r'tweet/user/<int:pk>', UserTweetsListView.as_view()),
    path(r'tweet/feed/', FeedTweetsListView.as_view()),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework'))
    # path('', include(router.urls)),
    # path(r'tweets/', TweetCommentsView.as_view()),
]
