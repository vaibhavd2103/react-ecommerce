import { useState } from "react";

interface ImageSliderProps {
  images: string[];
  alt: string;
}

export default function ImageSlider({ images, alt }: ImageSliderProps) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const hasMultiple = images.length > 1;
  const goTo = (i: number) => setIndex((i + images.length) % images.length);

  return (
    <div className="image-slider">
      <div className="image-slider__stage">
        {hasMultiple && (
          <button
            type="button"
            className="image-slider__control image-slider__control--prev"
            aria-label="Previous image"
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>
        )}

        <img
          className="image-slider__image"
          src={images[index]}
          alt={`${alt} — image ${index + 1} of ${images.length}`}
        />

        {hasMultiple && (
          <button
            type="button"
            className="image-slider__control image-slider__control--next"
            aria-label="Next image"
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
        )}
      </div>

      {hasMultiple && (
        <div className="image-slider__thumbnails">
          {images.map((src, i) => (
            <button
              type="button"
              key={src}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={
                "image-slider__thumbnail" +
                (i === index ? " image-slider__thumbnail--active" : "")
              }
              onClick={() => setIndex(i)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
