from django.contrib import admin
from .models import Project, Tag, Task, TaskComment

'''
  Enregistre les modèles dans l'interface dans l'administration Django
'''

admin.site.register(Project)
admin.site.register(Tag)
admin.site.register(Task)
admin.site.register(TaskComment)

