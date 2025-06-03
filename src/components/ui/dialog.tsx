import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogTitle = DialogPrimitive.Title

const DialogContent = ({ className, ...props }: DialogPrimitive.DialogContentProps) => (
    <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <DialogPrimitive.Content
            className={cn(
                "fixed z-50 left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg",
                className
            )}
            {...props}
        />
    </DialogPrimitive.Portal>
)

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        {children}
    </div>
)

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
}
