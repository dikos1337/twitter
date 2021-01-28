from django.db import models
from users.models import User


# Create your models here.
class Tweet(models.Model):
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE,
                             related_name="tweets")
    text = models.CharField(max_length=300, blank=False)
    created = models.DateTimeField(auto_now=True)
    likes = models.PositiveIntegerField(default=0)
    reposts = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.text[:100] + ("..." if len(self.text) > 100 else "")


class TweetComment(models.Model):
    tweet = models.ForeignKey(Tweet,
                              related_name='comments',
                              on_delete=models.CASCADE)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=300, blank=False)
    created = models.DateTimeField(auto_now=True)
    likes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.text[:100] + ("..." if len(self.text) > 100 else "")
