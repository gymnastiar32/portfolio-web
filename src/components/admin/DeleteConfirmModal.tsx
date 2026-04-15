import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react'

interface DeleteConfirmModalProps {
  open: boolean
  title: string
  description: string
  deleting?: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirmModal({
  open,
  title,
  description,
  deleting,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Modal show={open} size="md" onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <div className="space-y-4 text-center">
          <h3 className="text-2xl text-stone-900">{title}</h3>
          <p className="text-sm leading-7 text-stone-600">{description}</p>
          <div className="flex justify-center gap-3">
            <Button color="failure" disabled={deleting} onClick={onConfirm}>
              {deleting ? <Spinner size="sm" className="mr-2" /> : null}
              Delete item
            </Button>
            <Button color="light" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
