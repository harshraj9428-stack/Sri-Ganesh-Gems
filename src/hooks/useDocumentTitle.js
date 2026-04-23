import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | Sri Ganesh Gems` : 'Sri Ganesh Gems & Jewellery';
  }, [title]);
};
