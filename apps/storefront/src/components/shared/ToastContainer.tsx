'use client';

import { useEffect } from 'react';
import { useToastStore, Toast } from '@/store/toast.store';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Toast.module.css';

const ToastItem = ({ toastItem }: { toastItem: Toast }) => {
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const duration = toastItem.duration || 5000;
    const timer = setTimeout(() => {
      removeToast(toastItem.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [toastItem.id, toastItem.duration, removeToast]);

  const icons = {
    success: <FiCheckCircle className={styles.icon} />,
    error: <FiAlertCircle className={styles.icon} />,
    warning: <FiAlertCircle className={styles.icon} />,
    info: <FiInfo className={styles.icon} />,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`${styles.toast} ${styles[toastItem.type]}`}
    >
      {icons[toastItem.type]}
      <div className={styles.content}>
        {toastItem.title && <div className={styles.title}>{toastItem.title}</div>}
        <div className={styles.message}>{toastItem.message}</div>
      </div>
      <button onClick={() => removeToast(toastItem.id)} className={styles.close} aria-label="Close">
        <FiX size={16} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {toasts.map((toastItem) => (
          <ToastItem key={toastItem.id} toastItem={toastItem} />
        ))}
      </AnimatePresence>
    </div>
  );
};
