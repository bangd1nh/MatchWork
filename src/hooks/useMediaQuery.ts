// src/hooks/useMediaQuery.ts
import { useState, useEffect } from "react";

/**
 * Custom hook để theo dõi một media query.
 * @param query Chuỗi media query (ví dụ: '(max-width: 768px)')
 * @returns `true` nếu query khớp, ngược lại `false`.
 */
export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => {
            setMatches(media.matches);
        };

        // Sử dụng addEventListener và removeEventListener để tương thích với các trình duyệt mới
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
};
