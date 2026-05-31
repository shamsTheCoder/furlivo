'use client';

import React, { useEffect, useMemo, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiMinus, HiPlus } from 'react-icons/hi2';
import { useCartStore } from '@/store/cart.store';
import CartSkeleton from '@/components/shared/CartSkeleton';
import Spinner from '@/components/shared/Spinner';
import styles from './CartPage.module.css';

export default function CartPage() {
  const router = useRouter();
  const cartStore = useCartStore();
  // useTransition ties the loading state to the actual navigation lifecycle —
  // isPending auto-resolves when navigation completes (unlike a manual boolean).
  const [isPending, startTransition] = useTransition();

  // Rehydrate cart from localStorage once on mount.
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  // Show skeleton only during the brief hydration window.
  if (!useCartStore.persist.hasHydrated()) return <CartSkeleton />;

  // Perf 3: compute subtotal once per render via useMemo rather than
  // letting the Zustand getter call get().items.reduce() on every access.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const subtotal = useMemo(
    () => cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartStore.items]
  );

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  if (cartStore.items.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <div className={styles.emptyState}>
          <h2>Your cart is empty</h2>
          <Link href="/products/steam-grooming-brush" className="btn btn-primary btn-xl">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Your Cart</h1>
      
      <div className={styles.layout}>
        {/* Items */}
        <div className={styles.cartItems}>
          {cartStore.items.map((item) => (
            <div key={`${item.productId}-${item.variantId}`} className={styles.item}>
              <div className={styles.itemImgWrap}>
                {item.imageUrl && (
                  <Image src={item.imageUrl} alt={item.name} fill className={styles.itemImg} />
                )}
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>{item.name}</div>
                {item.variantName && <div className={styles.itemVariant}>Color: {item.variantName}</div>}
                <div className={styles.itemPrice}>{fmt(item.price)}</div>
                
                <div className={styles.itemActions}>
                  <div className={styles.qty}>
                    <button 
                      className={styles.qtyBtn} 
                      onClick={() => cartStore.updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                    >
                      <HiMinus size={14} />
                    </button>
                    <span className={styles.qtyNum}>{item.quantity}</span>
                    <button 
                      className={styles.qtyBtn} 
                      onClick={() => cartStore.updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                    >
                      <HiPlus size={14} />
                    </button>
                  </div>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => cartStore.removeItem(item.productId, item.variantId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <button
            className={`btn btn-primary btn-xl ${styles.checkoutBtn}`}
            disabled={isPending}
            onClick={() => {
              // startTransition ties isPending to the navigation lifecycle —
              // it auto-clears when the destination page finishes rendering.
              startTransition(() => {
                router.push('/checkout');
              });
            }}
          >
            {isPending
              ? <><Spinner size="sm" color="white" /> Loading checkout…</>
              : 'Proceed to Checkout'
            }
          </button>
        </div>
      </div>
    </div>
  );
}
