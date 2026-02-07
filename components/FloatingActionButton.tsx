import React from 'react';
import Button from './Button';

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  href,
  label,
  position = 'bottom-right',
  className = '',
}) => {
  const positionStyles = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <div className={`fixed ${positionStyles[position]} z-50 ${className}`}>
      <Button
        href={href}
        onClick={onClick}
        variant="primary"
        size="lg"
        className="rounded-full w-14 h-14 p-0 shadow-2xl hover:scale-110 transition-transform duration-200"
        icon={icon}
      >
        {label && <span className="sr-only">{label}</span>}
      </Button>
    </div>
  );
};

export default FloatingActionButton;
