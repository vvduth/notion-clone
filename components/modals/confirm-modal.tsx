import React from 'react'
import { AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger
} from '../ui/alert-dialog'

interface ConfirmModalProps {
    children: React.ReactNode,
    onConfirm: () =>  void, 

}
const ConfirmModal = ({children, onConfirm}: ConfirmModalProps) => {

    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation(); 
        onConfirm();
    }
  return (
    <AlertDialog>
        <AlertDialogTrigger onClick={(e) => e.stopPropagation()}>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are your absilutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmModal
