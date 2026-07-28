import React from 'react';
import { Instagram, Sparkles, MessageCircle } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../../data/mockData';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-20 bg-stone-100/80 dark:bg-neutral-900/40 border-t border-[#C5A880]/20 space-y-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-bold flex items-center justify-center md:justify-start gap-1.5">
            <Instagram className="w-4 h-4" /> @PREPPY.HAUTECOUTURE
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl font-medium tracking-tight">
            As Seen On Instagram
          </h2>
          <p className="text-xs text-gray-500 max-w-md">
            Tag #PREPPYGown or #PREPPYAtelier to be featured on our official global gallery.
          </p>
        </div>
      </div>

      {/* Horizontally Scrollable Reels */}
      <div
  className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 max-w-7xl mx-auto snap-x snap-mandatory snap-always py-2"
style={{ scrollPaddingLeft: "16px", scrollPaddingRight: "16px" }}
>
       
        {INSTAGRAM_POSTS.map(post => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[220px] sm:w-[260px] md:w-[280px] shrink-0 snap-start group relative aspect-[9/16] rounded-xl overflow-hidden bg-stone-200 dark:bg-neutral-800 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={post.image}
              alt="Instagram haute couture reel"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Reel Badge */}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white p-1.5 rounded-full">
              <Instagram className="w-4 h-4 text-[#E5C158]" />
            </div>

            {/* Hover overlay with reel details */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white gap-2">
              <div className="flex gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 fill-white" /> {post.comments}
                </span>
              </div>
              <p className="text-xs line-clamp-2 text-stone-200 italic font-light">{post.caption}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

