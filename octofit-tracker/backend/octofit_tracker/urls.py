from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
import os


@api_view(['GET'])
def api_root(request, format=None):
    """Return API root with URLs adjusted for Codespaces when available.

    If the CODESPACE_NAME env var is set, build absolute URLs using the
    Codespace domain https://$CODESPACE_NAME-8000.app.github.dev to avoid
    certificate issues. Otherwise fall back to DRF's reverse which uses the
    current request host.
    """
    codespace = os.environ.get('CODESPACE_NAME')
    def build(name):
        if codespace:
            base = f'https://{codespace}-8000.app.github.dev'
            # reverse without request to get the path only
            path = reverse(name, request=None, format=format)
            return f'{base}{path}'
        return reverse(name, request=request, format=format)

    return Response({
        'users': build('user-list'),
        'teams': build('team-list'),
        'activities': build('activity-list'),
        'leaderboard': build('leaderboard-list'),
        'workouts': build('workout-list'),
    })
"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, TeamViewSet, ActivityViewSet, LeaderboardViewSet, WorkoutViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'leaderboard', LeaderboardViewSet)
router.register(r'workouts', WorkoutViewSet)

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
