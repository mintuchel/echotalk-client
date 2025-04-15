import { useModalStore } from "@/store/modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Modal() {
  const open = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.closeModal);
  const config = useModalStore((state) => state.config);


  const { title, description, content, footer } = config || {};
  return (
     <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) closeModal(); // 닫힐 때만 처리
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}