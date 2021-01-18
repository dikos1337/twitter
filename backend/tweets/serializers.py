from rest_framework import serializers
from tweets.models import Tweet


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = '__all__'


# class TweetCommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TweetComment
#         fields = '__all__'
#         # fields = ('id', 'passphrase')
