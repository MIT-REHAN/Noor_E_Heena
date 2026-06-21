/**
 * Vercel Speed Insights Integration
 * This file initializes Speed Insights for performance monitoring
 */

import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights
// The debug option is automatically enabled in development environments
injectSpeedInsights({
    debug: false, // Set to true to see events in console during development
    // sampleRate: 1, // Send 100% of events (default)
});

console.log('Vercel Speed Insights initialized');
