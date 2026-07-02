import uuid

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator
from django.db import models
from django.utils import timezone

# Create your models here.
class Priority (models.TextChoices):
    # Niveaux de priorité d'une tâches
    LOW = "low", "Faible"
    MEDIUM ="medium", "Moyenne"
    HIGH = "high", "Haute"
    
class Category(models.TextChoices):
    # Catégories possibles pour classer une tâche
    WORK = "work", "Travail"
    PERSONAL = "personal", "Personnel"
    URGENT = "urgent", "Urgent"
    OTHER = "other","Autre"

class TaskStatus (models.TextChoices):
    # Etat d'avacement d'une tâches
    PENDING = "pending", "En attente"
    IN_PROGRESS = "in_progress","En cours"
    DONE = "done", "Terminée"
    ARCHIVED = "archived", "Archivée"


# Projet permet de regourpr plusieurs tâches ensemble

class Project (models.Model):
    
    # Clé primaire en UUID
    id = models.UUIDField(primary_key= True, default = uuid.uuid4, editable= False)

    # Chaque projet appartient à un utilisateur
    owner =  models.ForeignKey(
        User, 
        on_delete = models.CASCADE, 
        related_name = "projects"
        )
    
    # Champ de text court et doit contenir au moins 1 caractère
    name = models.CharField(max_length=120, validators=[MinLengthValidator(1)])

    # Champe de texte longue pour la description
    description = models.TextField(blank= True, default = "")

    # stocke une couleur en format HEX
    color = models.CharField(max_length= 7, default= "#378ADD")

    # Champ vrai ou faux
    is_archived = models.BooleanField(default= False)

    # Rempli automatiquement à la création
    created_at = models.DateTimeField(auto_now_add= True)

    # Mis à jour automatiquement à chaque modification
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "projects" # nom exact de la table dans PostgreSQL

        # tir par defaut: plus récent d'abords
        ordering = ["-created_at"]

        indexes = [
            #Index poru accélérer les recherches "mes projets non archivés"

            models.Index(fields= ["owner","is_archived"], name = "idx_project_owner_archived")
        ]
        
    
    def __str__ (self):
        return f"{self.name} ({self.owner.username})"


# Etiquettes libres qu'on peut attacher à une tâche

class Tag (models.Model):
    id = models.UUIDField(
        primary_key= True,
        default= uuid.uuid4,
        editable= False)
    
    owner = models.ForeignKey(User, 
                              on_delete= models.CASCADE, related_name="tags")
    name = models.CharField(max_length= 50)
    color = models.CharField(max_length=7,default="#888780")
    
    class Meta :
        db_table = "tags"

        # un user ne peut pas avoir deux tags avec le même nom
        unique_together = [("owner","name")]
        ordering = ["name"]

    def __str__(self):
        return self.name
    
class Task (models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable= False)
    owner = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "tasks")

    # Si le projet est supprim'e, la tâche reste mais project devient NULL
    project = models.ForeignKey(
        Project, on_delete= models.SET_NULL, null = True, blank = True, related_name =  "tasks"
    )
    
    # Relation many-to-many: Une tâche peut avoir plusieur tags
    tags = models.ManyToManyField(Tag, blank=True, related_name = "tasks")

    # Contenu
    title  = models.CharField(max_length= 255)
    priority= models.CharField(max_length= 10, choices = Priority.choices, default= Priority.MEDIUM)
    description = models.TextField(blank= True, default = "")

    # Classification
    category = models.CharField(max_length= 10, choices = Category.choices, default= Category.OTHER )

    status = models.CharField(max_length = 15, choices= TaskStatus.choices, default = TaskStatus.PENDING)

    # Planification
    due_date = models.DateTimeField(null = True, blank = True)

    #Sert à mémoriser l'ordre choisi par l'utilisateur 
    position = models.PositiveBigIntegerField(default = 0, db_index= True)

    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    completed_at = models.DateTimeField(null = True, blank= True)

    # Suppression douce
    is_deleted = models.BooleanField(default= False)

    class Meta:
        db_table = "tasks"
        ordering = ["position","-created_at"]
        indexes = [
            models.Index(
                fields = ["owner","status"],
                name = "idx_task_owner_status",
                condition= models.Q(is_deleted = False), # ignore les tâches supprimées
            ),

            models.Index(fields =["owner","priority"], name = "idx_task_owner_priority"),
            models.Index(fields =["owner","due_date"], name = "idx_task_due_date"),
            models.Index(fields =["project"], name = "idx_task_project"),
            models.Index(fields =["position"], name = "idx_task_position"),

        ]

        constraints = [
            # Règle de validation au niveau de données
            # La data limite doit toijours être la data de création

            models.CheckConstraint(
                check = models.Q(due_date__isnull = True) | models.Q(due_date__gt=models.F("created_at")),
                name = "chk_due_date_after_created",
            ),
        ]

    def __str__(self):
        return self.title


    @property
    def is_done(self):
        ## True si la taches est terminée
        return self.status == TaskStatus.DONE

    def mark_done (self):
        self.status = TaskStatus.DONE
        self.completed_at = timezone.now()
        self.save(update_fields = ["status","completed_at","updated_at"])


# Task_comments : permet de laisser des commentaires sur une taches

class TaskComment(models.Model):
    id = models.UUIDField(primary_key= True,default= uuid.uuid4, editable= False)
    
    task = models.ForeignKey(
        Task, 
        on_delete= models.CASCADE, related_name = "comments")
    
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "task_comments")

    body = models.TextField(validators= [MinLengthValidator(1)])

    created_at = models.DateTimeField(auto_now_add = True)

    updated_at = models.DateTimeField(auto_now = True)

    class Meta :
        db_table = "task_comments"
        ordering =["created_at"]
        indexes =[
            models.Index(fields=["task","created_at"], name = "idx_comment_task_ts")

        ]

    def __str__(self):
        return f"Commentaire de {self.author.username} sur '{self.task.title}'"