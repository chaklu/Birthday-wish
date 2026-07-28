import React, { useMemo } from 'react';
import './cylinder-carousel.css';

/**
 * CylinderCarousel - A 3D cylinder image carousel with infinite auto-rotation
 * 
 * @param {Object} props
 * @param {Array<{src: string, alt?: string, caption?: string}>} props.images - Array of image objects
 * @param {number} [props.radius] - The translateZ radius for the cylinder (auto-calculated if not provided)
 * @param {number} [props.duration=15] - Animation duration in seconds for one full rotation
 * @param {boolean} [props.autoRotate=true] - Whether the carousel auto-rotates
 * @param {Function} [props.onImageClick] - Callback when an image is clicked
 */
const CylinderCarousel = ({ 
  images = [], 
  radius: propRadius, 
  duration = 15, 
  autoRotate = true,
  onImageClick 
}) => {
  // Fixed radius (no responsive adjustments)
  const radius = propRadius ?? 400;

  const totalImages = images.length;
  const angle = totalImages > 0 ? 360 / totalImages : 0;

  const carouselStyle = useMemo(() => ({
    animation: autoRotate ? `cylinder-rotate ${duration}s linear infinite` : 'none',
  }), [autoRotate, duration]);

  if (!images || images.length === 0) {
    return (
      <div className="cylinder-carousel-wrapper">
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem' }}>
          No images to display
        </p>
      </div>
    );
  }

  return (
    <div className="cylinder-carousel-wrapper">
      <div 
        className="cylinder-carousel" 
        style={carouselStyle}
      >
        {images.map((img, index) => {
          const rotateY = index * angle;
          return (
            <div
              key={index}
              className="cylinder-carousel__item"
              style={{
                transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`,
              }}
              onClick={() => onImageClick?.(img, index)}
            >
              <img 
                src={img.src} 
                alt={img.alt || img.caption || ''}
                className="cylinder-carousel__image"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CylinderCarousel;

