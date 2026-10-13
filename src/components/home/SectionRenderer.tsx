import React from 'react';

import { useLanguageStore } from '../../store/languageStore';
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
  const language = useLanguageStore(state => state.language);

  switch (section.type) {
    case 'hero_banner':
      return <HeroBanner section={section} theme={theme} language={language} />;

    case 'category_chips':
      return (
        <CategoryChips section={section} theme={theme} language={language} />
      );

    case 'quick_actions':
      return (
        <QuickActions section={section} theme={theme} language={language} />
      );

    case 'service_grid':
      return (
        <ServiceGrid section={section} theme={theme} language={language} />
      );

    case 'doctor_carousel':
      return (
        <DoctorCarousel section={section} theme={theme} language={language} />
      );

    case 'offer_strip':
      return <OfferStrip section={section} theme={theme} language={language} />;

    default:
      // Unknown remote section types should render nothing.
      return null;
  }
}

export default SectionRenderer;
