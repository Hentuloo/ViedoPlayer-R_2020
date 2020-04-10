import React from 'react';

import Navigation from 'components/Navigation';

export interface NavigationTemplateProps {
  children: React.ReactChild;
}

const NavigationTemplate: React.FC<NavigationTemplateProps> = ({
  children,
}) => {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default NavigationTemplate;
