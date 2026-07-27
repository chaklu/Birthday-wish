// App.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CylinderCarousel from './components/ui/cylinder-carousel';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesButtonVisible, setYesButtonVisible] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);
  const containerRef = useRef(null);

  const moveNoButton = () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;
    setNoButtonPosition({ x, y });
    setNoClickCount(prev => prev + 1);
    
    if (noClickCount >= 2) {
      setTimeout(() => {
        setYesButtonVisible(true);
      }, 3000);
    }
  };

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Floating hearts animation
  const FloatingHearts = () => {
    return (
      <div className="floating-hearts">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            initial={{ 
              y: '100vh', 
              x: Math.random() * 100 + 'vw',
              opacity: 0 
            }}
            animate={{ 
              y: '-100vh', 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {['💖', '💕', '💗', '💝', '💘', '❤️'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>
    );
  };

  // Sparkle effect
  const Sparkles = () => {
    return (
      <div className="sparkles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="sparkle"
            initial={{ 
              scale: 0,
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh'
            }}
            animate={{ 
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    );
  };

  // Your custom images with captions
  const images = {
    page1Bg: '/images/background.jpg',
    page2Bg: '/images/background.jpg',
    page3Bg: '/images/background.jpg',
    page4Bg: '/images/background.jpg',
    page5Bg: '/images/background.jpg',
    page6Bg: '/images/background.jpg',
    page7Bg: '/images/background.jpg',
    gallery: [
      { src: '/images/photo1.jpeg', caption: 'Beautiful You 🌸', date: 'Our First Memory' },
      { src: '/images/photo2.jpeg', caption: 'Lovely Smile 😊', date: 'Perfect Moment' },
      { src: '/images/photo3.jpeg', caption: 'Stunning Look ✨', date: 'Special Day' },
      { src: '/images/photo4.jpeg', caption: 'My Everything 💕', date: 'Cherished Time' },
      { src: '/images/photo5.jpeg', caption: 'Beautiful Soul 💖', date: 'Magical Evening' },
      { src: '/images/photo6.jpeg', caption: 'Queen 👑', date: 'Royal Day' },
      { src: '/images/photo7.jpeg', caption: 'Love of My Life 💝', date: 'Sweet Memory' },
      { src: '/images/photo8.jpeg', caption: 'Angel 😇', date: 'Heavenly Moment' },
      { src: '/images/photo9.jpeg', caption: 'Princess 👸', date: 'Fairytale' },
      { src: '/images/photo10.jpeg', caption: 'Dream Girl 🌙', date: 'Dreamy Night' },
      { src: '/images/photo11.jpeg', caption: 'My Sunshine ☀️', date: 'Bright Day' },
      { src: '/images/photo12.jpeg', caption: 'Heart Stealer 💘', date: 'Love at First Sight' },
      { src: '/images/photo13.jpeg', caption: 'Gorgeous 🌹', date: 'Romantic Date' },
      { src: '/images/photo14.jpeg', caption: 'Perfect Piece 💎', date: 'Priceless Memory' },
    ]
  };

  const openLightbox = (img) => {
    setSelectedImage(img);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setSelectedImage(null);
  };

  // Your custom videos
  const videos = {
    birthday: '/videos/birthday-video.mp4',
  };

  const pages = [
    // Page 1: Background with Wish
    <motion.div
      key="page1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page page-1"
      style={{
        backgroundImage: `url(${images.page1Bg})`
      }}
    >
      <FloatingHearts />
      <Sparkles />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="wish-container"
      >
        <motion.div
          initial={{ rotate: -10, scale: 0.5 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", duration: 2 }}
          className="cake-icon"
        >
          🎂
        </motion.div>
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
          className="wish-text"
        >
          Happy Birthday My Love! 💕
        </motion.h1>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="wish-subtext"
        >
          Click to open your special gift
        </motion.p>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextPage}
          className="next-button"
        >
          <span>Open Gift</span> 🎁
        </motion.button>
      </motion.div>
    </motion.div>,

    // Page 2: Love Question
    <motion.div
      key="page2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page page-2"
      style={{
        backgroundImage: `url(${images.page2Bg})`
      }}
    >
      <FloatingHearts />
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1.5 }}
        className="question-box"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="heart-icon"
        >
          💖
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="question-text"
        >
          Do You Love Me?
        </motion.h2>
        
        <div className="button-container">
          <motion.button
            initial={{ x: -200, opacity: 0 }}
            animate={{ 
              x: yesButtonVisible ? 0 : -200, 
              opacity: yesButtonVisible ? 1 : 0 
            }}
            transition={{ type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(76, 175, 80, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={nextPage}
            className="yes-button"
          >
            Yes! 💍
          </motion.button>
          
          <motion.button
            animate={{ 
              x: noButtonPosition.x, 
              y: noButtonPosition.y 
            }}
            transition={{ type: "spring", stiffness: 300 }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            className="no-button"
          >
            No 😢
          </motion.button>
        </div>
        
        {noClickCount > 0 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hint-text"
          >
            {noClickCount < 3 
              ? "Try clicking No... if you can! 😉" 
              : "You can't escape love! 💕"}
          </motion.p>
        )}
      </motion.div>
    </motion.div>,

    // Page 3: Khat (Letter)
    <motion.div
      key="page3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page page-3"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(255,236,210,0.85) 0%, rgba(252,182,159,0.85) 100%), url(${images.page3Bg})`
      }}
    >
      <Sparkles />
      <motion.div
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="khat-container"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="khat-content"
        >
          <motion.h2
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="khat-title"
          >
            My Dearest Love 💌
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="khat-text-container"
          >
            <p className="khat-text">
              Meri pyari Zaini,

Aaj tumhara din hai, aur main chahta hoon ke tum jano ke tum meri duniya mein sab se khoobsurat cheez ho.

Tumhari har muskurahat meri zindagi mein roshni laati hai. Tumhara saath mujhe wo sukoon deta hai jo kisi aur cheez mein nahi milta.

Har din tumhare saath guzarna aik tohfa hai. Main dua karta hoon ke hum aisi hi countless yaadein aur banayein.

Happy Birthday meri jaan. Tum hamesha khush raho, yahi meri sabse badi dua hai. 💕
            </p>
          </motion.div>
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextPage}
            className="next-button"
          >
            Continue 💝
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>,

    // Page 4: Video
    <motion.div
      key="page4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page page-4"
      style={{
        backgroundImage: `url(${images.page4Bg})`
      }}
    >
      <FloatingHearts />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="video-container"
      >
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="video-title"
        >
          A Special Video For You 🎥
        </motion.h2>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="video-wrapper"
        >
          <video
            controls
            className="video-player"
          >
            <source src={videos.birthday} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.1, rotate: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextPage}
          className="next-button"
        >
          Next 💖
        </motion.button>
      </motion.div>
    </motion.div>,

    // Page 5: Infinite 3D Cylinder Image Carousel
    <motion.div
      key="page5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page page-5"
      style={{
        backgroundImage: `url(${images.page5Bg})`
      }}
    >
      <div className="gallery-stars" />
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="gallery-title"
      >
        Our Beautiful Memories 📸
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="gallery-subtitle"
      >
        Click any photo to view closer 💕
      </motion.p>

      {/* 3D Cylinder Carousel - Infinite auto-rotation */}
      <CylinderCarousel 
        images={images.gallery} 
        radius={400}
        duration={15}
        autoRotate={true}
        onImageClick={(img) => openLightbox(img)} 
      />

      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextPage}
        className="next-button"
      >
        Next 💕
      </motion.button>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="lightbox-close"
                onClick={closeLightbox}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.caption}
                className="lightbox-image"
              />
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="lightbox-info"
              >
                <h3>{selectedImage.caption}</h3>
                <p>{selectedImage.date}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,

    // Page 6: Meri Nazm, Wadaein & Wajahain
    <motion.div
      key="page6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page page-6"
      style={{
        backgroundImage: `url(${images.page6Bg})`
      }}
    >
      <FloatingHearts />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="urdu-section"
      >
        {/* Section 1: Nazm */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="nazm-section"
        >
          <motion.h2
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="nazm-title"
          >
            Meri Nazm Tumhare Liye 🌸
          </motion.h2>
          <p className="nazm-sub">Chand alfaaz jo dil se nikle hain</p>
          <motion.div className="nazm-content">
            <p className="nazm-verse">
              Tumhari yaadon mein beet jata hai din,<br />
              Tumhari khwabon mein guzar jata hai raat.<br />
              Tum ho meri zindagi ka sabse pyara hissa,<br />
              Tum ho meri duniya ka sabse khoobsurat ehsaas.
            </p>
          </motion.div>
        </motion.div>

        {/* Section 2: Wadaein */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="wadaein-section"
        >
          <motion.h2
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="wadaein-title"
          >
            Meri Wadaein ✿
          </motion.h2>
          <p className="wadaein-sub">Jo main tumse karta hoon, dil se karta hoon</p>
          <div className="wadaein-list">
            {[
              "Main hamesha tumhari muskurahat ki wajah banunga",
              "Main har mushkil mein tumhara saath dunga",
              "Main tumhe kabhi akela nahi chhodunga",
              "Main tumhari har baat sununga aur samajhunga",
              "Main tumhe har din aur zyada pyar dunga",
              "Main tumhari har khushi mein shamil rahunga",
            ].map((wada, index) => (
              <motion.div
                key={index}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.12 }}
                className="wada-item"
              >
                <span className="wada-icon">🤝</span>
                <span className="wada-text">{wada}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section 3: Wajahain - Flip Cards */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="wajahain-section"
        >
          <motion.h2
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="wajahain-title"
          >
            Kuch Wajahain ✿
          </motion.h2>
          <p className="wajahain-sub">Cards par tap karke reason dekho</p>
          <div className="wajahain-grid">
            {[
              { num: "01", reason: "Tumhari muskurahat sab kuch theek kar deti hai" },
              { num: "02", reason: "Tum meri sabse achi dost ho" },
              { num: "03", reason: "Tum mujhe hamesha better banne ke liye motivate karti ho" },
              { num: "04", reason: "Tumhara saath sabse comfortable jaga hai" },
              { num: "05", reason: "Tum meri baat dhyan se sunti ho" },
              { num: "06", reason: "Tumhari hansi meri favourite awaaz hai" },
              { num: "07", reason: "Tum mujhe samajhti ho bina kuch kahe" },
              { num: "08", reason: "Bas tum ho, is liye ❤️" },
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`wajahain-card ${flippedCard === index ? 'flipped' : ''}`}
                onClick={() => setFlippedCard(flippedCard === index ? null : index)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="wajahain-card-inner">
                  <div className="wajahain-card-front">
                    <span className="wajahain-card-label">REASON</span>
                    <span className="wajahain-card-num">{card.num}</span>
                    <span className="wajahain-card-heart">♥</span>
                  </div>
                  <div className="wajahain-card-back">
                    <span className="wajahain-card-reason">{card.reason}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5 }}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextPage}
          className="next-button"
        >
          Final Surprise 💝
        </motion.button>
      </motion.div>
    </motion.div>,
        
    // Page 7: Ending Wish
    <motion.div
      key="page7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page page-7"
      style={{
        backgroundImage: `url(${images.page7Bg})`
      }}
    >
      <FloatingHearts />
      <Sparkles />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="ending-container"
      >
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="ending-title"
        >
          Forever & Always 💕
        </motion.h1>
        
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="ending-text"
        >
          Happy Birthday, my love! Here's to our beautiful journey together
          and the amazing future that awaits us. I love you more than words
          can express! 💍✨
        </motion.p>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="heart-container"
        >
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="big-heart"
          >
            💖
          </motion.span>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage(0)}
          className="restart-button"
        >
          Relive the Magic ✨
        </motion.button>
      </motion.div>
    </motion.div>
  ];

  return (
    <div className="app" ref={containerRef}>
      <AnimatePresence mode="wait">
        {pages[currentPage]}
      </AnimatePresence>
    </div>
  );
}
export default App;