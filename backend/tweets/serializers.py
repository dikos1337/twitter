from rest_framework import serializers

from tweets.models import Tweet


class CreateTweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = (
            'id',
            'text',
            'created',
        )


class DetailTweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = (
            'user',
            'text',
            'likes',
            'reposts',
            'created',
        )


class UserTweetsListSerializer(serializers.ModelSerializer):
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
