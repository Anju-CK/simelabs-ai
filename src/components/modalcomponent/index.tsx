import styles from "./Modalcomponent.module.css";
type ModalcomponentProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: any;
};

export default function Modalcomponent({
  isOpen,
  onClose,
  children,
}: ModalcomponentProps) {
  if (!isOpen) return null;
  return (
    <div className={styles.modalBackground} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
