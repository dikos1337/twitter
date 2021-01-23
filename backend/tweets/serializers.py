from rest_framework import serializers
from tweets.models import Tweet


class CreateTweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = (
            'user',
            'text',
        )
        read_only_fields = ('user', )
        extra_kwargs = {
            # 'author_id': {
            #     'required': True,
            # },
            'text': {
                'required': True,
            }
        }


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
        read_only_fields = ('user', )
        extra_kwargs = {
            # 'author_id': {
            #     'required': True,
            # },
            'text': {
                'required': True,
            }
        }

    # def create(self, validated_data):
    #     print("selfff", self.data, validated_data)
    #     return Tweet.objects.create(validated_data.pop('author_id'),
    #                                 validated_data.pop('text'),
    #                                 **validated_data)


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
