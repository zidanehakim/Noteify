import { useEffect } from "react";

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Clean up function to revert document title when component unmounts
    return () => {
      document.title = "Noteify"; // Set default title when component unmounts
    };
  }, [title]); // Re-run effect whenever the title prop changes
};
