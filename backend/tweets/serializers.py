from rest_framework import serializers
from users.serializers import UserTweetSerializer

from tweets.models import Tweet, TweetComment


class CreateTweetSerializer(serializers.ModelSerializer):
    """Create a tweet serializer"""
    class Meta:
        model = Tweet
        fields = (
            'id',
            'text',
            'created',
        )


class CreateCommentSerializer(serializers.ModelSerializer):
    """Create a tweet serializer"""
    class Meta:
        model = TweetComment
        fields = (
            'id',
            'tweet',
            'text',
            'created',
        )


class TweetSerializer(serializers.ModelSerializer):
    """
    Tweet serializer with detailed user information
    """
    user = UserTweetSerializer()

    class Meta:
        model = Tweet
        fields = (
            'id',
            'user',
            'text',
            'likes',
            'reposts',
            'created',
        )


class TweetShortSerializer(serializers.ModelSerializer):
    """
    Tweet serializer with detailed user information
    """
    user = UserTweetSerializer()

    class Meta:
        model = Tweet
        fields = (
            'id',
            'user',
        )


class TweetCommentSerializer(serializers.ModelSerializer):
    tweet = TweetShortSerializer()
    user = UserTweetSerializer()

    class Meta:
        model = TweetComment
        fields = '__all__'
