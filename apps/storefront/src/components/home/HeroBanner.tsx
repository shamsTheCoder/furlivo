'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi2';
import styles from './HeroBanner.module.css';

const slides = [
  {
    id: 1,
    eyebrow: 'New Arrival',
    title: 'The Ultimate Spa Experience.',
    subtitle: 'Reduce shedding by 90% while giving your pet a relaxing massage with our steam grooming brush.',
    img: '/images/lifestyle.png',
    alt: 'Happy pet looking groomed and fresh',
    link: '/products/steam-grooming-brush',
    btnText: 'Shop the Brush'
  },
  {
    id: 2,
    eyebrow: 'Best Value',
    title: 'The Complete Grooming Bundle.',
    subtitle: 'Everything you need for a perfectly groomed pet in one premium package. Save 33% when you buy the bundle.',
    img: '/images/flatlay.png',
    alt: 'Furlivo Ultimate Grooming Bundle',
    link: '/products/grooming-bundle',
    btnText: 'Shop the Bundle'
  },
  {
    id: 3,
    eyebrow: 'Bestseller',
    title: 'Effortless Hair Removal.',
    subtitle: 'Keep your furniture and clothes completely fur-free with our reusable, self-cleaning pet hair roller.',
    img: '/images/cat-lifestyle.png',
    alt: 'Using the Furlivo Pet Hair Remover Roller',
    link: '/products/pet-hair-remover-roller',
    btnText: 'Shop the Roller'
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero} aria-label="Promotional Banner">
      <div className={`container ${styles.container}`}>
        
        {/* Left Side: Content */}
        <div className={styles.contentCol}>
          {slides.map((slide, index) => (
             <div 
               key={`content-${slide.id}`}
               className={`${styles.textContent} ${index === currentSlide ? styles.activeText : ''}`}
               aria-hidden={index !== currentSlide}
             >
               <span className={styles.eyebrow}>{slide.eyebrow}</span>
               <h1 className={styles.title}>{slide.title}</h1>
               <p className={styles.subtitle}>{slide.subtitle}</p>
               <Link href={slide.link} className={`btn btn-primary btn-xl ${styles.shopBtn}`} tabIndex={index === currentSlide ? 0 : -1}>
                  {slide.btnText} <HiArrowRight size={18} />
               </Link>
             </div>
          ))}
          
          {/* Slider Controls */}
          <div className={styles.controls}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Images */}
        <div className={styles.imageCol}>
           {slides.map((slide, index) => (
             <div 
               key={`image-${slide.id}`}
               className={`${styles.imgWrap} ${index === currentSlide ? styles.activeImg : ''}`}
               aria-hidden={index !== currentSlide}
             >
               <Image 
                 src={slide.img} 
                 alt={slide.alt} 
                 fill 
                 priority={index === 0}
                 className={styles.image}
                 sizes="(max-width: 900px) 100vw, 50vw"
               />
             </div>
           ))}
        </div>
        
      </div>
    </section>
  );
}
