import React from 'react';

import { LayoutSection } from '../../types/config';
import { AppTheme } from '../../theme/createTheme';

import HeroBanner from './HeroBanner';
import CategoryChips from './CategoryChips';
import QuickActions from './QuickActions';
import ServiceGrid from './ServiceGrid';
import DoctorCarousel from './DoctorCarousel';
import OfferStrip from './OfferStrip';

interface SectionRendererProps {
  section: LayoutSection;
  theme: AppTheme;
}

function SectionRenderer({ section, theme }: SectionRendererProps) {
  switch (section.type) {
    case 'hero_banner':
      return <HeroBanner section={section} theme={theme} />;

    case 'category_chips':
      return <CategoryChips section={section} theme={theme} />;

    case 'quick_actions':
      return <QuickActions section={section} theme={theme} />;

    case 'service_grid':
      return <ServiceGrid section={section} theme={theme} />;

    case 'doctor_carousel':
      return <DoctorCarousel section={section} theme={theme} />;

    case 'offer_strip':
      return <OfferStrip section={section} theme={theme} />;

    default:
      // Unknown remote section types should render nothing.
      return null;
  }
}

export default SectionRenderer;
