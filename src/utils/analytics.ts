export type AnalyticsEventName =
  | 'landing_view'
  | 'cta_click'
  | 'pricing_view'
  | 'checkout_start'
  | 'purchase_complete'
  | 'email_signup'
  | 'email_capture_submit'
  | 'advent_day_open'
  | 'advent_day_complete'
  | 'ambient_audio_toggle'
  | 'download_resource'
  | 'share_card_copied'
  | 'emergency_mode_printed'
  | 'emergency_timeframe_selected'
  | 'gift_helper_generated'
  | 'gift_saved_to_planner';

export interface AnalyticsEventPayload {
  eventName: AnalyticsEventName;
  timestamp: string;
  properties?: Record<string, unknown>;
}

export function trackEvent(eventName: AnalyticsEventName, properties?: Record<string, unknown>): void {
  const event: AnalyticsEventPayload = {
    eventName,
    timestamp: new Date().toISOString(),
    properties,
  };

  // Structured console telemetry for debugging & production analytics adapter readiness
  if (typeof window !== 'undefined') {
    // Allows integration with Google Analytics, PostHog, or Meta Pixel without rewriting application components
    const customWindow = window as Window & { dataLayer?: unknown[] };
    if (customWindow.dataLayer && Array.isArray(customWindow.dataLayer)) {
      customWindow.dataLayer.push(event);
    }
  }

  // Developer visibility
  if (process.env.NODE_ENV !== 'production') {
    console.info(`[Analytics Event] ${eventName}`, properties || {});
  }
}
