'''
    Conversion un objet Django en JSON que le React peut lire
'''

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, Tag,Task, TaskComment

# Représentation d'un utilisateur: Read seulement
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = ['id', 'username', 'email']

class ProjectSerializer(serializers.ModelSerializer):
    
    # owner est automatiquement l'utilisateur connecté (Read only)
    owner = UserSerializer(read_only=True)	

    # task_count : nombre de tâches dans le projet (Read only)
    task_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "owner", "name", "description",
            "color", "is_archived", "task_count",
            "created_at", "updated_at",
        ]

        # Ces champs sont gérés automatiquement par Django, donc on ne peut pas les modifier

        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']

    def get_task_count(self,obj):
        # compte les tâches actives du projet.
        return obj.tasks.filter(is_deleted=False).count()
    
# Etiquetes
class TagSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only = True)

    class Meta:
        model = Tag
        fields = ['id', 'owner', 'name', 'color']
        read_only_fields = ['id','owner']

# Commentaire sur une tâche

class TaskCommentSerializer (serializers.ModelSerializer):
    # on affiche le nom de l'auteur mais on ne peut pas le modifier via l'API

    author = UserSerializer(read_only=True)

    class Meta:
        model = TaskComment
        fields = ['id','author','body','created_at','updated_at']
        read_only_fields = ['id','author','created_at','updated_at']

# Tâche
class TaskSerializer(serializers.ModelSerializer):
    
    #Lecture: on affiche les objets complets
    owner = UserSerializer(read_only = True)
    project = ProjectSerializer(read_only = True)
    tags = TagSerializer(many=True, read_only = True)
    comments = TaskCommentSerializer(many=True, read_only = True)

    # write_only
    project_id = serializers.UUIDField(write_only=True,required=False, allow_null=True)
    tag_ids = serializers.ListField(
        child = serializers.UUIDField(), 
        write_only=True, 
        required=False
    )

    # Nombre de commentaires
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            # Identifiants
            "id", "owner",
            # Relations (lecture)
            "project", "tags", "comments",
            # Relations (écriture)
            "project_id", "tag_ids",
            # Contenu
            "title", "description",
            # Classification
            "priority", "category", "status",
            # Planification
            "due_date", "position",
            # Horodatage
            "created_at", "updated_at", "completed_at",
            # Suppression douce
            "is_deleted",
            # Calculé
            "comment_count",
        ]
        read_only_fields = [
            "id", "owner", "created_at", "updated_at", "completed_at", "is_deleted",
        ]

    def get_comment_count (self, obj):
        return obj.comments.count()
    
    def create (self, validated_data):
        '''
            Appelé quand React envoie POST/api/task/
            On extrait project_id et tag_ids avant de créer la tâche
        '''

        # Extraire les champs spéciaux
        project_id = validated_data.pop("project_id",None)
        tag_ids  = validated_data.pop("tag_ids",[])

        #L'owner est toujours l'utilisateur connecté, jamis envoyé par React
        owner = self.context["request"].user

        # Créer la tâche
        task = Task.objects.create(owner = owner, **validated_data)

        #Associer le projet si fourni
        if project_id:
            try:
                task.project = Project.objects.get(id=project_id, owner = owner)
                task.save(update_fields = ["project"])

            except Project.DoesNotExist:
                pass
        
        # Associer les tags si fournis
        if tag_ids:
            tags = Tag.objects.filter(id__in = tag_ids, owner = owner)
            task.tags.set(tags)
        
        return task
    
    def update(self, instance, validated_data):
        '''
          Appelé quand React envoie PATCH/api/tasks{id}/
          Met à jour uniquement les chamos envoyés.
        '''
        project_id = validated_data.pop("project_id",None)
        tag_ids = validated_data.pop("tag_ids",None)
        owner = self.context["request"].user
        
        # Mettre à jour les champs simples
        for attr, value in validated_data.items():
            setattr(instance, attr,value)
          
        instance.save()
        
        #Mettre à jour le projet si fourni
        if project_id is not None:
            try:
                instance.project = Project.objects.get(id = project_id, owner = owner)
                
                instance.save(update_fields = ["project"])

            except Project.DoesNotExist:
                instance.project = None
                instance.save(update_fields = ["project"])

        # Mettre à jour les tafs si fournis
        if tag_ids is not None:
            tags = Tag.objects.filter(id__in = tag_ids, owner = owner)
            instance.tags.set(tags)

        return instance
    
  # Utilisé sur GET /api/task/ pour ne pas surcahnger la réponse

class TaskListSerializer (serializers.ModelSerializer):
    project_name = serializers.CharField(source = "project.name", read_only = True, default = None)
    tags = TagSerializer(many = True, read_only = True)
    comment_count = serializers.SerializerMethodField()

    class Meta :
        model = Task
        fields = [
            "id", "title", "priority", "category", "status",
            "due_date", "position", "project_name", "tags",
            "comment_count", "created_at", "completed_at",
        ]
    
    def get_comment_count (self, obj):
        return obj.comments.count()



  