'use client';

import { useEffect, useRef } from 'react';
import FocusTrapReact from 'focus-trap-react';

interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  focusTrapOptions?: {
    onDeactivate?: () => void;
    clickOutsideDeactivates?: boolean;
    escapeDeactivates?: boolean;
  };
}

export default function FocusTrap({ 
  children, 
  active = true,
  focusTrapOptions = {}
}: FocusTrapProps) {
  const defaultOptions = {
    clickOutsideDeactivates: true,
    escapeDeactivates: true,
    ...focusTrapOptions
  };

  return (
    <FocusTrapReact active={active} focusTrapOptions={defaultOptions}>
      <div>{children}</div>
    </FocusTrapReact>
  );
}