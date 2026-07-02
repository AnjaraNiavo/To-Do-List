import Modal from '../ui/Modal'
import Button from '../ui/Button'
import TaskForm from './TaskForm'

export default function TaskModal({ open, onClose, onSave, task, projects, tags }) {
  const isEditing = Boolean(task)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Modifier la tâche' : 'Nouvelle tâche'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" form="task-form">
            {isEditing ? 'Enregistrer' : 'Créer'}
          </Button>
        </>
      }
    >
      <TaskForm
        initialData={task}
        projects={projects}
        tags={tags}
        onSubmit={onSave}
        onCancel={onClose}
      />
    </Modal>
  )
}
