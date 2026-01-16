import { useEffect } from 'react';

interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  keywords?: string;
  canonical?: string;
  structuredData?: StructuredData | StructuredData[];
}

export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogUrl,
  ogImage,
  keywords,
  canonical,
  structuredData,
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

    // Handle ogImage
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
      updateMetaTag('twitter:image', ogImage);
    }

    updateLinkTag('canonical', currentUrl);

    // Handle structured data
    if (structuredData) {
      // Remove any existing page-level structured data scripts
      const existingScripts = document.querySelectorAll('script[data-seo-structured-data]');
      existingScripts.forEach(script => script.remove());

      // Add new structured data
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      dataArray.forEach((data, index) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-structured-data', `page-${index}`);
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Cleanup structured data scripts on unmount
      const scripts = document.querySelectorAll('script[data-seo-structured-data]');
      scripts.forEach(script => script.remove());
    };
  }, [title, description, ogTitle, ogDescription, ogType, ogUrl, ogImage, keywords, canonical, structuredData]);

  return null;
}
