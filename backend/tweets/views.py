from rest_framework import generics, permissions, status, viewsets
from rest_framework.generics import get_object_or_404
# from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from tweets.models import Tweet
from tweets.serializers import (CreateTweetSerializer, DetailTweetSerializer,
                                UserTweetsListSerializer)


class CreateTweetView(generics.CreateAPIView):
    """Создание секрета"""
    # queryset = Tweet.objects.all()
    # serializer_class = CreateTweetSerializer
    # permission_classes = [permissions.IsAuthenticated]

    # def create(self, request, *args, **kwargs):
    #     request.data._mutable = True
    #     request.data['user'] = request.user.id
    #     request.data._mutable = False

    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)

    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data,
    #                     status=status.HTTP_201_CREATED,
    #                     headers=headers)
    pass


class DetailTweetView(APIView):
    def get(self, request, pk):
        tweets = get_object_or_404(Tweet, user=pk)
        serializer = DetailTweetSerializer(tweets, many=False)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserTweetsListView(APIView):
    # pagination_class = PageNumberPagination()

    def get(self, request, pk):
        # TODO use slug instead pk
        tweets = Tweet.objects.filter(user=pk)  # TODO except 404
        # paginator = PageNumberPagination()
        # result_page = paginator.paginate_queryset(tweets, request)

        # serializer = UserTweetsListSerializer(result_page, many=True)
        serializer = UserTweetsListSerializer(tweets, many=True)
        return Response({"tweets": serializer.data}, status=status.HTTP_200_OK)


# class UserTweetsListView(viewsets.ViewSet):
#     """
#     A simple ViewSet for listing or retrieving users.
#     """
#     def list(self, request, pk):
#         queryset = Tweet.objects.all()
#         serializer = UserTweetsListSerializer(queryset, many=True)
#         return Response(serializer.data)

#     def retrieve(self, request, pk=None):
#         queryset = Tweet.objects.all()
#         user = get_object_or_404(queryset, user=pk)
#         serializer = UserTweetsListSerializer(user)
#         return Response(serializer.data)

# class TweetCommentsView(generics.ListAPIView):
#     queryset = TweetComment.objects.all()
#     serializer_class = TweetCommentSerializer
