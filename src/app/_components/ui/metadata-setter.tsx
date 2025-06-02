'use client';

import { useEffect } from 'react';

type MetadataSetterProps = {
  title: string;
  description?: string;
};

export default function MetadataSetter({ title, description }: MetadataSetterProps) {
  useEffect(() => {
    const previousTitle = document.title;
    const prevDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = title;

    if (description) {
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) {
        descTag = document.createElement('meta');
        descTag.setAttribute('name', 'description');
        document.head.appendChild(descTag);
      }
      descTag.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (prevDescription) {
        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) descTag.setAttribute('content', prevDescription);
      }
    };
  }, [title, description]);

  return null;
}
