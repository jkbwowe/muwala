import { useState, useEffect } from 'react';
import { useAssessmentStore } from './assessmentStore';

export function useHydratedAssessment() {
  const store = useAssessmentStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return { ...store, isHydrated };
}