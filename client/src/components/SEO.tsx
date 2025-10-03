import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  keywords?: string;
  canonical?: string;
}

export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogUrl,
  keywords,
  canonical,
}: SEOProps) {
  useEffect(() => {
    const currentUrl = canonical || window.location.href;
    const finalOgUrl = ogUrl || currentUrl;
    const finalOgTitle = ogTitle || title;
    const finalOgDescription = ogDescription || description;

    document.title = title;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      
      element.setAttribute('href', href);
    };

    updateMetaTag('description', description);
    
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    updateMetaTag('og:title', finalOgTitle, true);
    updateMetaTag('og:description', finalOgDescription, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', finalOgUrl, true);

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalOgTitle);
    updateMetaTag('twitter:description', finalOgDescription);

    updateLinkTag('canonical', currentUrl);

    return () => {
    };
  }, [title, description, ogTitle, ogDescription, ogType, ogUrl, keywords, canonical]);

  return null;
}
