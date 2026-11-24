import React, { ImgHTMLAttributes, useState } from 'react';

type ImageWithFallbackProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: string;
};

/**
 * Simple <img> wrapper that swaps to a fallback src when the original fails to load.
 * Usage: <ImageWithFallback src="/assets/foo.jpg" fallback="https://..." className="..." />
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallback,
  alt,
  onError,
  ...rest
}) => {
  const DEFAULT_FALLBACK =
    'https://images.pexels.com/photos/356004/pexels-photo-356004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // neutral tree/team placeholder

  const [currentSrc, setCurrentSrc] = useState<string | undefined>(
    (src as string) || fallback || DEFAULT_FALLBACK
  );

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const newSrc = fallback || DEFAULT_FALLBACK;
    if (currentSrc === newSrc) return;
    setCurrentSrc(newSrc);
    if (onError) onError(e as any);
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      {...rest}
    />
  );
};

export default ImageWithFallback;
