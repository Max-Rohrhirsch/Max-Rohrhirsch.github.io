import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import styles from './gallery.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  location: string;
  year: string;
  description?: string;
}

export default function Gallery(): JSX.Element {  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => ({...prev, [src]: true}));
  };

  const categories = [
    { id: 'all', name: 'All Adventures' },
    { id: 'hiking', name: 'Hiking' },
    { id: 'climbing', name: 'Climbing' },
    { id: 'travel', name: 'Travel' },
    { id: 'projects', name: 'DIY Projects' }
  ];

  const galleryImages: GalleryImage[] = [
    {
      src: '/img/island1.jpg',
      alt: 'Iceland Landscape',
      category: 'travel',
      location: 'Iceland',
      year: '2024',
      description: 'Exploring the stunning volcanic landscapes and waterfalls of Iceland.'
    },
    {
      src: '/img/island2.jpg',
      alt: 'Iceland Landscape',
      category: 'travel',
      location: 'Iceland',
      year: '2024',
      description: 'Exploring the stunning volcanic landscapes and waterfalls of Iceland.'
    },
    {
      src: '/img/island3.jpg',
      alt: 'Iceland Landscape',
      category: 'travel',
      location: 'Iceland',
      year: '2024',
      description: 'Exploring the stunning volcanic landscapes and waterfalls of Iceland.'
    },
    {
      src: '/img/norwegen1.jpg',
      alt: 'Norway Polarlights',
      category: 'travel',
      location: 'Norway',
      year: '2023',
      description: 'Breathtaking views of the Norwegian fjords during summer.'
    },
    {
      src: '/img/zugspitze.jpg',
      alt: 'Zugspitze',
      category: 'climbing',
      location: 'Germany',
      year: '2024',
      description: 'Climbing the mountain in 4.5 hours'
    },
    {
      src: '/img/bungee.jpg',
      alt: 'Bungee Jumping',
      category: 'Others',
      location: 'Spain',
      year: '2023',
      description: ''
    },
    {
      src: '/img/fahrrad.jpg',
      alt: 'Fahrradtour',
      category: 'Travel',
      location: 'Germany',
      year: '2023',
      description: 'Fahradtour vom Bodensee bis nach Dänemark'
    },
    {
      src: '/img/fallschirm.png',
      alt: 'Fallschirm springen',
      category: 'climbing',
      location: 'Germany',
      year: '2024',
      description: ''
    },
    {
      src: '/img/fallschirm2.png',
      alt: 'Fallschirm springen',
      category: 'climbing',
      location: 'Germany',
      year: '2024',
      description: ''
    },
    {
      src: '/img/holz1.jpg',
      alt: 'Holz schnitzen',
      category: 'DIY Projects',
      location: 'Germany',
      year: '2020',
      description: ''
    },
    {
      src: '/img/holz2.jpg',
      alt: 'Holz schnitzen',
      category: 'DIY Projects',
      location: 'Germany',
      year: '2020',
      description: ''
    },
    {
      src: '/img/holz3.jpg',
      alt: 'Holz schnitzen',
      category: 'DIY Projects',
      location: 'Germany',
      year: '2020',
      description: ''
    },
    {
      src: '/img/ich klettern.jpg',
      alt: 'Österreich Klettersteige',
      category: 'climbing',
      location: 'Austria',
      year: '2024',
      description: ''
    },
    {
      src: '/img/klettern_oesterreich.jpg',
      alt: 'Zugspitze',
      category: 'climbing',
      location: 'Germany',
      year: '2024',
      description: ''
    },
    {
      src: '/img/klettern_oesterreich2.jpg',
      alt: 'Zugspitze',
      category: 'climbing',
      location: 'Germany',
      year: '2024',
      description: ''
    },
    {
      src: '/img/klettern1.jpg',
      alt: 'Klettersteig Grenoble',
      category: 'climbing',
      location: 'France',
      year: '2025',
      description: ''
    },
    {
      src: '/img/London.jpg',
      alt: 'London',
      category: 'Travel',
      location: 'England',
      year: '2025',
      description: ''
    },
    {
      src: '/img/london2.jpg',
      alt: 'London',
      category: 'Travel',
      location: 'England',
      year: '2025',
      description: ''
    },
  ];
  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeCategory);
  // Debug log for filtering
  console.log('Active category:', activeCategory);
  console.log('Filtered images count:', filteredImages.length);
  
  // Determine if we're showing filtered results
  const isFiltered = activeCategory !== 'all';
    const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };
    const closeModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);
    // Navigate to next/previous image
  const navigateImage = (direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(
      img => img.src === selectedImage.src
    );
    
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };
  
  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredImages, closeModal]);

  // Count images in each category
  const categoryCounts = categories.map(category => {
    const count = category.id === 'all' 
      ? galleryImages.length 
      : galleryImages.filter(image => image.category === category.id).length;
    return { ...category, count };
  });

  return (
    <Layout
      title="Adventure Gallery"
      description="Gallery of my travels, hiking, climbing adventures and DIY projects"
    >
      <div className={styles.galleryContainer}>        <div className={styles.galleryHeader}>
          <h1 className={styles.galleryTitle}>Adventure Gallery</h1>          <p className={styles.gallerySubtitle}>
            Exploring the world through hiking, climbing, travel, and DIY projects
          </p>
          
          {/* Mobile Category Dropdown */}
          <div className={styles.mobileFilter}>
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className={styles.categoryDropdown}
              aria-label="Filter by category"
            >
              {categoryCounts.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
          
          {isFiltered && (
            <div className={styles.filterIndicator}>
              Showing {filteredImages.length} {activeCategory} images
              <button 
                className={styles.clearFilterButton}
                onClick={() => setActiveCategory('all')}
              >
                <i className="fas fa-times"></i> Clear filter
              </button>
            </div>
          )}
        </div><div className={styles.filterContainer}>
          {categoryCounts.map(category => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                className={`${styles.filterButton} ${isActive ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault(); // Prevent any default behavior
                  console.log('Setting category to:', category.id);
                  setActiveCategory(category.id);
                }}
                aria-pressed={isActive}
                type="button"
              >
                {category.name} <span className={styles.countBadge}>{category.count}</span>
              </button>
            );
          })}
        </div>        <div className={`${styles.galleryGrid} ${isFiltered ? styles.filtered : ''}`}>
          {filteredImages.length > 0 ? (
            filteredImages.map((image, index) => (
              <div 
                className={styles.galleryItem} 
                key={index}
                onClick={() => handleImageClick(image)}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={useBaseUrl(image.src)}
                    alt={image.alt}
                    className={`${styles.galleryImage} ${loadedImages[image.src] ? styles.loaded : ''}`}
                    onLoad={() => handleImageLoad(image.src)}
                  />
                  {!loadedImages[image.src] && (
                    <div className={styles.imagePlaceholder}>
                      <div className={styles.loader}></div>
                    </div>
                  )}
                  <div className={styles.imageOverlay}>
                    <div className={styles.imageInfo}>
                      <h3>{image.alt}</h3>
                      <p>{image.location}, {image.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <i className="fas fa-search"></i>
              <h3>No images found</h3>
              <p>No {activeCategory} images match your current filter.</p>
              <button 
                className={styles.clearFilterButton}
                onClick={() => setActiveCategory('all')}
              >
                Show all images
              </button>
            </div>
          )}
        </div>        {/* Image Modal */}
        {selectedImage && (
          <div className={styles.modal} onClick={closeModal} role="dialog" aria-modal="true">
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <span className={styles.closeButton} onClick={closeModal} aria-label="Close">&times;</span>
                <div className={styles.modalControls}>
                <button 
                  className={styles.navButton} 
                  onClick={() => navigateImage('prev')}
                  aria-label="Previous image"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                <img 
                  src={useBaseUrl(selectedImage.src)} 
                  alt={selectedImage.alt} 
                  className={styles.modalImage} 
                />
                
                <button 
                  className={styles.navButton} 
                  onClick={() => navigateImage('next')}
                  aria-label="Next image"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              
              <div className={styles.modalInfo}>
                <h2>{selectedImage.alt}</h2>
                <p className={styles.modalLocation}>
                  <i className="fas fa-map-marker-alt"></i> {selectedImage.location}, {selectedImage.year}
                </p>
                {selectedImage.description && (
                  <p className={styles.modalDescription}>{selectedImage.description}</p>
                )}
                <p className={styles.modalCategory}>
                  <span className={styles.categoryTag}>
                    {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                  </span>
                </p>
                <p className={styles.imageCounter}>
                  {filteredImages.findIndex(img => img.src === selectedImage.src) + 1} of {filteredImages.length}
                </p>
              </div>
              <div className={styles.modalHint}>
                <small>Use arrow keys to navigate between images</small>
              </div>
            </div>
          </div>        )}
        
              </div>
    </Layout>
  );
}