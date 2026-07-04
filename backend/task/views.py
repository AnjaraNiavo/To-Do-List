
'''
    une view reçoit une requête de React, exécute la logique et retourn une réponse JSON

    Endpoints couverts :
  GET    /api/tasks/          : liste des tâches de l'utilisateur connecté
  POST   /api/tasks/          : créer une nouvelle tâche
  GET    /api/tasks/{id}/     : détail d'une tâche
  PATCH  /api/tasks/{id}/     : modifier une tâche
  DELETE /api/tasks/{id}/     : suppression douce (is_deleted=True)

  GET    /api/projects/       : liste des projets
  POST   /api/projects/       : créer un projet
  PATCH  /api/projects/{id}/  : modifier un projet
  DELETE /api/projects/{id}/  : archiver un projet

  GET    /api/tags/           : liste des tags
  POST   /api/tags/           : créer un tag

  POST   /api/tasks/{id}/comments/   : ajouter un commentaire
  DELETE /api/tasks/{id}/comments/{comment_id}/ : supprimer un commentaire

'''
from rest_framework.authentication import BasicAuthentication
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.shortcuts import render
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Project, Tag, Task, TaskComment
from .serializers import(
    ProjectSerializer,
    TagSerializer,
    TaskSerializer,
    TaskListSerializer,
    TaskCommentSerializer,
)

@api_view(["POST"])
@permission_classes([AllowAny])  # pas besoin d'être connecté pour s'inscrire
def register(request):
    """POST /api/auth/register/ → créer un compte utilisateur."""

    username = request.data.get("username")
    email    = request.data.get("email")
    password = request.data.get("password")

    # Vérifications basiques
    if not username or not password:
        return Response(
            {"error": "username et password sont obligatoires."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Ce nom d'utilisateur est déjà pris."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Créer l'utilisateur
    user = User.objects.create_user(username=username, email=email, password=password)

    return Response(
        {"message": f"Compte créé avec succès pour {user.username}."},
        status=status.HTTP_201_CREATED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def user_login(request):
    """POST /api/auth/login/ → se connecter et récupérer un token de session."""

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request, username=username, password=password)

    if user is None:
        return Response(
            {"error": "Identifiants incorrects."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    login(request, user)
    return Response({
        "message": f"Bienvenue {user.username} !",
        "user": {
            "id":       user.id,
            "username": user.username,
            "email":    user.email,
        }
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_logout(request):
    """POST /api/auth/logout/ → se déconnecter."""
    logout(request)
    return Response({"message": "Déconnecté avec succès."})


@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def task_list (request):

    '''
        GET: Retourne toutes les tâches actives de l'utilisateur connecté
        POST: Crée une nouvelle tâche
    '''

    if request.method == "GET":
        #On ne retourne que les tâches non supprimées de l'utilisateur connecté
        tasks = Task.objects.filter(
            owner = request.user,
            is_deleted = False,
        ).select_related("project").prefetch_related("tags","comments")

        # Filtres optionnels: project_id, tag_id, is_completed

        status_filter = request.query_params.get("status")
        priority_filter = request.query_params.get("priority")
        category_filter = request.query_params.get("category")
        project_filter = request.query_params.get("project_id")
        search = request.query_params.get("search")

        if status_filter:
            tasks = tasks.filter(status = status_filter)

        if priority_filter:
            tasks = tasks.filter(priority = priority_filter)

        if category_filter:
            tasks = tasks.filter(category = category_filter)

        if project_filter:
            tasks = tasks.filter(project__id = project_filter)

        if search :
            # Recherche dans le titre et la description
            tasks = tasks.filter(title__icontains = search)

        # Version allégée du serializer pour les listes
        serializer = TaskListSerializer(tasks, many = True)
        return Response(serializer.data)
    
    if request.method == "POST":
        serializer = TaskSerializer(data = request.data, context ={"request":request})

        if serializer.is_valid():
            serializer.save()

            # status.HTTP_201_CREATED : the client request was succesfully received
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        #Si les donnés envoyée par React sont ivalide, on retourn les erreurs
        return Response (serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET","PATCH","DELETE"])
@permission_classes([IsAuthenticated])
def task_detail (request, pk):
    
    '''
      GET    : détail complet d'une tâche (avec commentaires)
      PATCH  : modifier partiellement une tâche
      DELETE : suppression douce (la tâche reste en base, is_deleted=True) 

    '''

    # Vérifier que la tâche existe Et appartien à l'utlisateur connecté

    try:
        task = Task.objects.get(pk = pk , owner = request.user, is_deleted = False)

    except Task.DoesNotExist:
        return Response (
            {"error": "Tâce introuvable."},
            status = status.HTTP_404_NOT_FOUND
        )
    
    if request.method == "GET":
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    if request.method == "PATCH":
        # partial = True -> on accepte que React n'envoie que les champs modifiés
        serializer = TaskSerializer(
            task, data = request.data, partial = True, context = {"request": request}
        )

        if serializer.is_valid():
              # Si le status passe à "donne", on enregistre la date de complétion
              if request.data.get("status") == "done" and task.status != "done":
                  serializer.save(completed_at = timezone.now())

              else :
                  serializer.save()

              return Response(serializer.data)

        return Response (serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        # Suppresion douce: on ne supprime pas varaiment la ligne en base
        task.is_deleted = True
        task.save (update_fields= ["is_deleted","updated_at"])
        return Response (
            {"message":"Tâche supprimée."},
            status= status.HTTP_204_NO_CONTENT

        )
# Projects
@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def project_list (request):
    '''
        GET: Liste des projets non arichvés de l'utilisateur connecté
        POST : Créer un nouveau projet
    '''

    if request.method == "GET":
        projects = Project.objects.filter(
            owner = request.user,
            is_archived = False
        )

        serializer = ProjectSerializer(projects, many = True)
        return Response(serializer.data)
    
    if request.method == "POST":
        serializer = ProjectSerializer(data = request.data, context = {"request": request})

        if serializer.is_valid():

            #On force l'owner à être l'utilisateur connecté
            serializer.save(owner = request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def project_detail(request,pk):
    '''
        GET : Détail d'un projet avec ses tâches
        PATCH: Modification d'un projet
        DELETE: Archiver un projet (is_archived = True)
    '''

    try: 
        project = Project.objects.get(pk = pk, owner = request.user)
    
    except Project.DoesNotExist:
        return Response (
            {"error": "Projet introuvable."},
            status = status.HTTP_404_NOT_FOUND
        )
    
    if request.method == "GET":
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
    
    if request.method == "PATCH":
        serializer = ProjectSerializer(
            project, data = request.data, partial = True, context = {"request": request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        #On archive le plutot que supprimer
        project.is_archived = True
        project.save(update_fields = ["is_archived","updated_at"])
        return Response(
            {"message":"Projet archivé."},
            status = status.HTTP_204_NO_CONTENT
        )

# Tags
@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def tag_list(request):
    '''
        GET: Liste des tags de l'utilisateur connecté
        POST: Créer un nouveau tag
    '''

    if request.method == "GET":
        tags = Tag.objects.filter(owner = request.user)
        serializer = TagSerializer(tags, many = True)
        return Response(serializer.data)
    
    if request.method == "POST":
        serializer = TagSerializer(data = request.data, context = {"request": request})

        if serializer.is_valid():
            serializer.save(owner = request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def tag_detail(request, pk):
    '''
        DELETE: Supprimer un tag (si il n'est pas utilisé par une tâche)
    '''

    try:
        tag = Tag.objects.get(pk = pk, owner = request.user)

    except Tag.DoesNotExist:
        return Response(
            {"error":"Tag introuvable."},
            status = status.HTTP_404_NOT_FOUND
        )
    
    tag.delete()
    return Response({"message":"Tag supprimé."}, status = status.HTTP_204_NO_CONTENT)

#Commentaire
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def comment_create(request, task_pk):
    '''
        POST: Ajouter un commentaire sur une tâche
        
    '''

    try: 
        task = Task.objects.get(pk = task_pk, owner = request.user, is_deleted = False)

    except Task.DoesNotExist:
        return Response(
            {"error":"Tâche introuvable."},
            status = status.HTTP_404_NOT_FOUND
        )
    
    serializer = TaskCommentSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save(task = task, author = request.user)
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def comment_delete (request, task_pk, comment_pk):
    '''
        DELETE: Supprimer un commentaire d'une tâche
    '''

    try:
        comment = TaskComment.objects.get(
            pk = comment_pk,
            task__id = task_pk,
            author = request.user,
        )

    except TaskComment.DoesNotExist:
        return Response({"error":"Commenaire introuvable."}, status = status.HTTP_404_NOT_FOUND)
    
    comment.delete()
    return Response({"message":"Commentaire supprimé."}, status = status.HTTP_204_NO_CONTENT)


#Statistiques
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def stats(request):

    '''
        GET/api/stats/: retourne les chiffres pour le dashboard

    '''

    tasks = Task.objects.filter(owner =request.user, is_deleted = False)

    total = tasks.count()
    completed = tasks.filter(status="done").count()
    pending = tasks.filter(status = "pending").count()
    in_progress = tasks.filter(status = "in_progress").count()
    high_open = tasks.filter(priority = "high").exclude(status = "done").count()
    pct = round((completed/total * 100),1) if total > 0 else 0

    return Response ({
        "total":              total,
        "completed":          completed,
        "pending":            pending,
        "in_progress":        in_progress,
        "high_priority_open": high_open,
        "completion_pct":     pct,
    })

