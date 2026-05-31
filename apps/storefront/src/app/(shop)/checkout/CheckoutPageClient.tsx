'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useCartStore } from '@/store/cart.store';
import CheckoutSkeleton from '@/components/shared/CheckoutSkeleton';
import PaymentLoader from '@/components/shared/PaymentLoader';
import Spinner from '@/components/shared/Spinner';
import styles from './CheckoutPage.module.css';

export default function CheckoutPageClient() {
  const cartStore = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <CheckoutSkeleton />;

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (paymentMethod === 'cod') {
      alert('Order Placed via COD Successfully! This is a demo.');
      cartStore.clearCart();
      window.location.href = '/';
      return;
    }

    try {
      const res = await fetch('/api/checkout/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartStore.subtotal })
      });
      const order = await res.json();

      if (order.error) {
        throw new Error(order.error);
      }

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
          window.location.href = '/';
        },
        prefill: {
          name: 'Demo User',
          email: 'demo@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#000000'
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        alert('Payment Failed: ' + response.error.description);
        setIsSubmitting(false);
      });
      rzp1.open();
    } catch (err: any) {
      console.error(err);
      alert('Error initiating payment');
      setIsSubmitting(false);
    }
  };

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
              onClick={() => setPaymentMethod('card')}
            >
              <input type="radio" checked={paymentMethod === 'card'} readOnly />
              <label className={styles.label}>Credit / Debit Card</label>
            </div>
            <div 
              className={`${styles.paymentOption} ${paymentMethod === 'upi' ? styles.paymentActive : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              <input type="radio" checked={paymentMethod === 'upi'} readOnly />
              <label className={styles.label}>UPI</label>
            </div>
            <div 
              className={`${styles.paymentOption} ${paymentMethod === 'cod' ? styles.paymentActive : ''}`}
              onClick={() => setPaymentMethod('cod')}
            >
              <input type="radio" checked={paymentMethod === 'cod'} readOnly />
              <label className={styles.label}>Cash on Delivery (COD)</label>
            </div>
          </div>

          <button type="submit" className={`btn btn-primary btn-xl ${styles.submitBtn}`} disabled={isSubmitting || cartStore.items.length === 0}>
            {isSubmitting ? (
              <><Spinner size="sm" color="white" /> Processing…</>
            ) : (
              `Pay ${fmt(cartStore.subtotal)}`
            )}
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
              <div className={styles.summaryItemPrice}>
                {fmt(item.price)}
              </div>
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
