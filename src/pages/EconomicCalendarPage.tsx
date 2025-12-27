import React, { useState } from 'react';
import { EconomicCalendar } from '../components/EconomicCalendar';

interface EconomicCalendarPageProps {
  theme?: 'dark' | 'light';
}

export function EconomicCalendarPage({ theme = 'dark' }: EconomicCalendarPageProps) {
  return <EconomicCalendar theme={theme} />;
}