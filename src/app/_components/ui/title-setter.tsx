'use client';

import { useEffect } from 'react';

type TitleSetterProps = {
  title: string;
};

export default function TitleSetter({ title }: TitleSetterProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle; // restore on modal close
    };
  }, [title]);

  return null;
}
