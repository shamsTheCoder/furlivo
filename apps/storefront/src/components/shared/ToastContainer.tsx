'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useToastStore, Toast } from '@/store/toast.store';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import styles from './Toast.module.css';

// Pure CSS animation — framer-motion (~35KB gzipped) removed from the
// critical path. Exit animation is handled by class toggling + animationend.
const ToastItem = ({ toastItem }: { toastItem: Toast }) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const ref = useRef<HTMLDivElement>(null);

  // Play CSS exit animation then remove from store
  const dismiss = useCallback(() => {
    const el = ref.current;
    if (!el) {
      removeToast(toastItem.id);
      return;
    }
    // styles.toastExiting is always defined — non-null assertion avoids TS error
    // from CSS module's `string | undefined` index signature.
    el.classList.add(styles.toastExiting!);
    const onEnd = () => {
      el.removeEventListener('animationend', onEnd);
      removeToast(toastItem.id);
    };
    el.addEventListener('animationend', onEnd);
  }, [toastItem.id, removeToast]);

  // Auto-dismiss
  useEffect(() => {
    const duration = toastItem.duration ?? 5000;
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [toastItem.id, toastItem.duration, dismiss]);

  const icons: Record<Toast['type'], React.ReactNode> = {
    success: <FiCheckCircle className={styles.icon} />,
    error:   <FiAlertCircle className={styles.icon} />,
    warning: <FiAlertCircle className={styles.icon} />,
    info:    <FiInfo className={styles.icon} />,
  };

  return (
    <div
      ref={ref}
      className={`${styles.toast} ${styles[toastItem.type]}`}
    >
      {icons[toastItem.type]}
      <div className={styles.content}>
        {toastItem.title && <div className={styles.title}>{toastItem.title}</div>}
        <div className={styles.message}>{toastItem.message}</div>
      </div>
      <button onClick={dismiss} className={styles.close} aria-label="Close">
        <FiX size={16} />
      </button>
    </div>
  );
};

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      {toasts.map((toastItem) => (
        <ToastItem key={toastItem.id} toastItem={toastItem} />
      ))}
    </div>
  );
};
