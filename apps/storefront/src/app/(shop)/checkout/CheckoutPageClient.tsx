'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart.store';
import CheckoutSkeleton from '@/components/shared/CheckoutSkeleton';
import PaymentLoader from '@/components/shared/PaymentLoader';
import Spinner from '@/components/shared/Spinner';
import styles from './CheckoutPage.module.css';

export default function CheckoutPageClient() {
  const cartStore = useCartStore();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track hydration with useState so the condition is stable across renders
  // and we never violate Rules of Hooks with an early return before other hooks.
  const [hydrated, setHydrated] = useState(false);

  // Refs for cleanup (Leak 2 + Async 1)
  const rzpRef   = useRef<any>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Rehydrate cart from localStorage once on mount (skipHydration: true in store).
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setHydrated(useCartStore.persist.hasHydrated());

    return () => {
      // Leak 2: destroy the Razorpay iFrame + internal event listeners on unmount
      rzpRef.current?.close?.();
      // Async 1: cancel any in-flight fetch to /api/checkout/razorpay
      abortRef.current?.abort();
    };
  }, []);

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  // Stable handler — no recreation on every render
  const handlePaymentSelect = useCallback((method: string) => {
    setPaymentMethod(method);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent double-submission
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (paymentMethod === 'cod') {
      alert('Order Placed via COD Successfully! This is a demo.');
      cartStore.clearCart();
      setIsSubmitting(false); // reset so button is never permanently stuck
      // Async 2: use router.push instead of window.location.href to avoid
      // a full page reload that discards Next.js router cache.
      router.push('/?order=success');
      return;
    }

    try {
      // Async 1: attach an AbortController so the fetch is cancelled if the
      // component unmounts or the user navigates away mid-request.
      abortRef.current = new AbortController();
      const res = await fetch('/api/checkout/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartStore.subtotal }),
        signal: abortRef.current.signal,
      });
      const order = await res.json();

      if (order.error) throw new Error(order.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: order.amount,
        currency: order.currency,
        name: 'Furlivo',
        description: 'Storefront Checkout',
        order_id: order.id,
        handler: function (response: any) {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
          cartStore.clearCart();
          // Async 2: soft navigation — no full page reload
          router.push('/?order=success');
        },
        prefill: {
          name: 'Demo User',
          email: 'demo@example.com',
          contact: '9999999999',
        },
        theme: { color: '#FF6B35' },
      };

      // Leak 2: store the Razorpay instance in a ref so it can be closed on unmount.
      rzpRef.current = new (window as any).Razorpay(options);
      rzpRef.current.on('payment.failed', function (response: any) {
        alert('Payment Failed: ' + response.error.description);
        setIsSubmitting(false);
      });
      rzpRef.current.open();
    } catch (err: any) {
      if (err.name === 'AbortError') return; // navigation away — silently ignore
      console.error(err);
      alert('Error initiating payment');
      setIsSubmitting(false);
    }
  };

  // Show skeleton only during the brief hydration window
  if (!hydrated) return <CheckoutSkeleton />;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      {isSubmitting && <PaymentLoader />}
      <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>Furlivo</Link>
      </header>

      <div className={styles.layout}>
        {/* Forms */}
        <form onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h2 className={styles.title}>Contact Details</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input type="email" id="email" required className={styles.input} />
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.title}>Shipping Address</h2>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="fname" className={styles.label}>First Name</label>
                <input type="text" id="fname" required className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lname" className={styles.label}>Last Name</label>
                <input type="text" id="lname" required className={styles.input} />
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label htmlFor="address" className={styles.label}>Address</label>
                <input type="text" id="address" required className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="city" className={styles.label}>City</label>
                <input type="text" id="city" required className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="zip" className={styles.label}>PIN Code</label>
                <input type="text" id="zip" required className={styles.input} />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.title}>Payment Method</h2>
            <div
              className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.paymentActive : ''}`}
              onClick={() => handlePaymentSelect('card')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handlePaymentSelect('card')}
            >
              <input type="radio" checked={paymentMethod === 'card'} readOnly />
              <label className={styles.label}>Credit / Debit Card</label>
            </div>
            <div
              className={`${styles.paymentOption} ${paymentMethod === 'upi' ? styles.paymentActive : ''}`}
              onClick={() => handlePaymentSelect('upi')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handlePaymentSelect('upi')}
            >
              <input type="radio" checked={paymentMethod === 'upi'} readOnly />
              <label className={styles.label}>UPI</label>
            </div>
            <div
              className={`${styles.paymentOption} ${paymentMethod === 'cod' ? styles.paymentActive : ''}`}
              onClick={() => handlePaymentSelect('cod')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handlePaymentSelect('cod')}
            >
              <input type="radio" checked={paymentMethod === 'cod'} readOnly />
              <label className={styles.label}>Cash on Delivery (COD)</label>
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-xl ${styles.submitBtn}`}
            disabled={isSubmitting || cartStore.items.length === 0}
          >
            {isSubmitting
              ? <><Spinner size="sm" color="white" /> Processing…</>
              : `Pay ${fmt(cartStore.subtotal)}`
            }
          </button>
        </form>

        {/* Summary sidebar */}
        <div className={styles.summary}>
          <h2 className={styles.title}>Order Summary</h2>
          {cartStore.items.map((item) => (
            <div key={`${item.productId}-${item.variantId}`} className={styles.summaryItem}>
              <div className={styles.summaryImgWrap}>
                {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className={styles.summaryImg} />}
              </div>
              <div className={styles.summaryItemInfo}>
                <div className={styles.summaryItemName}>{item.name}</div>
                {item.variantName && <div className={styles.summaryItemVar}>{item.variantName}</div>}
              </div>
              <div className={styles.summaryItemPrice}>{fmt(item.price)}</div>
            </div>
          ))}

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{fmt(cartStore.subtotal)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>{fmt(cartStore.subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
