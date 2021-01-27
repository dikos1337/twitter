from rest_framework import serializers
from users.serializers import UserTweetSerializer

from tweets.models import Tweet


class CreateTweetSerializer(serializers.ModelSerializer):
    """Create a tweet serializer"""
    class Meta:
        model = Tweet
        fields = (
            'id',
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


# class TweetCommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TweetComment
#         fields = '__all__'
#         # fields = ('id', 'passphrase')
