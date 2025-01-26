import { ReactElement } from "react"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

interface ModalProps {
    isOpen?: boolean
    onCLose?: () => void
    body?: ReactElement
    footer?: ReactElement
    step?: number
    totalSteps?: number
}

export default function Modal({ body, footer, isOpen, onCLose, step, totalSteps }: ModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onCLose}>
            <DialogContent className='bg-black'>
                <div className="flex items-center gap-6">
                    <button className="p-1 border-0 text-white hover:opacity-70 transition w-fit">
                        <X size={28} onClick={onCLose} />
                    </button>
                    {step && totalSteps && (
                        <div className="text-xl font-bold">Step {step} of {totalSteps}</div>
                    )}
                </div>
                <div className="mt-4">{body}</div>
                {footer && <div>{footer}</div>}
            </DialogContent>
        </Dialog>
    )
}
