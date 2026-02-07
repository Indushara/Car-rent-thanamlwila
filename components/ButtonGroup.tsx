import React from 'react';

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const spacingStyles = {
  none: 'gap-0',
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-4',
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = '',
  orientation = 'horizontal',
  spacing = 'md',
}) => {
  const orientationClass = orientation === 'horizontal' ? 'flex-row' : 'flex-col';
  const spacingClass = spacingStyles[spacing];
  
  return (
    <div className={`flex ${orientationClass} ${spacingClass} ${className}`}>
      {children}
    </div>
  );
};

export default ButtonGroup;
