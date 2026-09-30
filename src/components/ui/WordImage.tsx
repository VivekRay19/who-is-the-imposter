import React, { useState, useEffect } from 'react';
import { CategoryId } from '../../types/game';
import { fetchWikiThumbnail } from '../../utils/imageService';
import { getCategoryById } from '../../data/categories';
import { Image as ImageIcon, Maximize2, X } from 'lucide-react';

interface WordImageProps {
  word: string;
  directUrl?: string;
  category?: CategoryId;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  allowZoom?: boolean;
}

export const WordImage: React.FC<WordImageProps> = ({
  word,
  directUrl,
  category,
  size = 'hero',
  className = '',
  allowZoom = true,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(directUrl || null);
  const [isLoading, setIsLoading] = useState<boolean>(!directUrl);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const categoryInfo = category ? getCategoryById(category) : null;

  useEffect(() => {
    if (directUrl) {
      setImageUrl(directUrl);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    fetchWikiThumbnail(word, category).then((url) => {
      if (isMounted) {
        if (url) {
          setImageUrl(url);
        } else {
          setHasError(true);
        }
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [word, directUrl, category]);

  const sizeStyles = {
    sm: 'w-12 h-12 rounded-xl text-lg',
    md: 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl text-3xl',
    lg: 'w-full h-40 sm:h-44 rounded-2xl text-4xl',
    hero: 'w-full h-48 sm:h-56 rounded-2xl text-5xl',
  };

  return (
    <>
      <div
        className={`relative overflow-hidden flex items-center justify-center bg-slate-900 border border-slate-700/60 shadow-lg ${sizeStyles[size]} ${className} ${
          allowZoom && imageUrl ? 'cursor-pointer group' : ''
        }`}
        onClick={() => {
          if (allowZoom && imageUrl) setIsZoomed(true);
        }}
      >
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-slate-600 animate-spin" />
          </div>
        )}

        {/* Real Photo */}
        {imageUrl && !hasError ? (
          <>
            <img
              src={imageUrl}
              alt={word}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className={`w-full h-full object-cover transition-all duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              } ${allowZoom ? 'group-hover:scale-105' : ''}`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                console.error(`[IMAGE ERROR]\nWord: ${word}\nPath: ${imageUrl}\nReason: Failed to load image asset`);
                setHasError(true);
              }}
            />

            {allowZoom && !isLoading && (
              <div className="absolute bottom-2 right-2 p-1.5 rounded-xl bg-slate-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-bold shadow-md">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom</span>
              </div>
            )}
          </>
        ) : (
          /* Clean Graceful Placeholder (Never shows wrong image) */
          <div className="flex flex-col items-center justify-center text-center p-4 space-y-1">
            <ImageIcon className="w-8 h-8 text-slate-600 mb-1" />
            <span className="text-xs font-semibold text-slate-400">Image unavailable</span>
          </div>
        )}
      </div>

      {/* Full-Screen Zoom Modal */}
      {isZoomed && imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-md w-full glass-card rounded-3xl p-4 border border-slate-700 shadow-2xl flex flex-col items-center gap-3 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
              <img
                src={imageUrl}
                alt={word}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-black text-white">{word}</h3>
              {categoryInfo && (
                <span className="text-xs text-indigo-400 font-semibold">
                  {categoryInfo.emoji} {categoryInfo.name}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
