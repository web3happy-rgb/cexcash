import { useEffect, useState } from 'react';
import { getPageContent } from '../services/api';

export function usePageContent(slug, { immediate = true } = {}) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!immediate) return;

    let isMounted = true;

    async function fetchContent() {
      setLoading(true);
      try {
        const { sections } = await getPageContent(slug);
        if (isMounted) {
          setSections(sections);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [slug, immediate]);

  return { sections, setSections, loading, error };
}
