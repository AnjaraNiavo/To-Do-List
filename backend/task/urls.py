from django.urls import path
from . import views

urlpatterns = [

    # ── Authentification ─────────────────────────────────────
    path("auth/register/", views.register,    name="auth-register"),
    path("auth/login/",    views.user_login,  name="auth-login"),
    path("auth/logout/",   views.user_logout, name="auth-logout"),
    path("auth/me/",       views.get_me,      name="auth-me"),

    # ── Tâches ───────────────────────────────────────────────
    path("tasks/",           views.task_list,   name="task-list"),
    path("tasks/<uuid:pk>/", views.task_detail, name="task-detail"),

    # ── Commentaires ─────────────────────────────────────────
    path("tasks/<uuid:task_pk>/comments/",                    views.comment_create, name="comment-create"),
    path("tasks/<uuid:task_pk>/comments/<uuid:comment_pk>/",  views.comment_delete, name="comment-delete"),

    # ── Projets ──────────────────────────────────────────────
    path("projects/",            views.project_list,   name="project-list"),
    path("projects/<uuid:pk>/",  views.project_detail, name="project-detail"),

    # ── Tags ─────────────────────────────────────────────────
    path("tags/",            views.tag_list,   name="tag-list"),
    path("tags/<uuid:pk>/",  views.tag_detail, name="tag-detail"),

    # ── Statistiques ─────────────────────────────────────────
    path("stats/", views.stats, name="stats"),
]