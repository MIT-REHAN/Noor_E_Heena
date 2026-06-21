# Vercel Speed Insights Setup

This project uses Vercel Speed Insights to monitor web performance and Core Web Vitals.

## Overview

Speed Insights automatically tracks:
- Core Web Vitals (LCP, FID, CLS)
- First Contentful Paint (FCP)
- Time to First Byte (TTFB)
- And other performance metrics

## Implementation

### Files Added/Modified

1. **package.json** - Added dependencies and build scripts
   - `@vercel/speed-insights` - The Speed Insights package
   - `esbuild` - Bundler to create standalone JavaScript file

2. **speed-insights.js** - Speed Insights initialization module
   - Imports and initializes the Speed Insights tracker
   - Can be configured with options like debug mode, sample rate, etc.

3. **dist/speed-insights.min.js** - Bundled Speed Insights script
   - Created by running `npm run build`
   - This file is included in the HTML via a module script tag

4. **index.html** - Added Speed Insights script tag
   - Script tag added in the `<head>` section
   - Loaded as an ES module with `defer` attribute

5. **.gitignore** - Updated to include the Speed Insights bundle
   - Ignores most dist files but keeps `speed-insights.min.js`

## Building

To rebuild the Speed Insights bundle:

```bash
npm install
npm run build
```

This will:
1. Install dependencies including `@vercel/speed-insights` and `esbuild`
2. Bundle the Speed Insights module into a standalone file at `dist/speed-insights.min.js`

## Development

The Speed Insights package automatically:
- **Does not track** in development mode (localhost, file://, etc.)
- Only sends data when the site is deployed on Vercel
- Tracks real user performance metrics in production

## Configuration

To customize Speed Insights behavior, edit `speed-insights.js`:

```javascript
injectSpeedInsights({
    debug: true,      // Enable console logging (useful for development)
    sampleRate: 0.5,  // Sample 50% of events (for high-traffic sites)
    route: '/custom', // Custom route name for dynamic pages
});
```

### Available Options

- **debug** (boolean): Log events to console. Default: `false`
- **sampleRate** (number): Percentage of events to send (0-1). Default: `1` (100%)
- **route** (string): Custom route name for aggregating similar pages
- **beforeSend** (function): Modify or filter events before sending

## Viewing Data

After deploying to Vercel:

1. Go to your project dashboard on Vercel
2. Navigate to the "Speed Insights" tab
3. View real-time performance metrics and trends

## Deployment

When deploying to Vercel:

1. The `dist/speed-insights.min.js` file is committed to the repository
2. No build step is required during deployment
3. Speed Insights will automatically start collecting data

If you make changes to `speed-insights.js`, remember to rebuild:

```bash
npm run build
```

Then commit the updated `dist/speed-insights.min.js` file.

## Troubleshooting

### Script not loading
- Verify `dist/speed-insights.min.js` exists
- Check browser console for any errors
- Ensure the path in `index.html` is correct

### No data in dashboard
- Speed Insights only tracks on deployed Vercel projects
- Data won't appear when running locally
- Allow a few minutes for data to appear after deployment
- Ensure at least one user has visited the site

### Rebuilding the bundle
If you need to rebuild from scratch:

```bash
rm -rf node_modules dist
npm install
npm run build
```

## More Information

- [Vercel Speed Insights Documentation](https://vercel.com/docs/speed-insights)
- [Speed Insights Package](https://vercel.com/docs/speed-insights/package)
- [Web Vitals](https://web.dev/vitals/)
