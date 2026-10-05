/**
 * Drop-in replacement for useNavigate() that always preserves the ?client= param.
 * Usage: const navigate = useClientNavigate();
 *        navigate('/brands');  →  navigates to /brands?client=slug
 */
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useClientNavigate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientSlug = searchParams.get('client');

  return useCallback(
    (path: string, options?: Parameters<typeof navigate>[1]) => {
      if (clientSlug) {
        // Preserve ?client= in the target path
        const hasQuery = path.includes('?');
        const separator = hasQuery ? '&' : '?';
        navigate(`${path}${separator}client=${clientSlug}`, options);
      } else {
        navigate(path, options);
      }
    },
    [navigate, clientSlug]
  );
}
