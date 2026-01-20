# TODO: SEO Content & Pages Requiring Attention

This document tracks pages/routes that need content creation or have SEO issues.

## Pages That Need to Be Created

### 1. Case Studies Index Page (`/case-studies`)
- **Issue**: The case study pages reference `/case-studies` in breadcrumb schema but this page doesn't exist
- **Action**: Create a case studies hub page listing all available case studies
- **Priority**: Medium
- **File to create**: `client/src/pages/case-studies/index.tsx`

### 2. InfoQuest Case Study (`/case-study/infoquest`)
- **Issue**: Case study data exists in `case-study.tsx` but is NOT in `validIds` array and NOT in sitemap
- **Action**: Either add to `validIds` and sitemap, OR remove the data from `caseStudies` object
- **File**: `client/src/pages/case-study.tsx` (line 286 - add 'infoquest' to validIds)
- **Sitemap**: Add `<url><loc>https://bytebeam.co/case-study/infoquest</loc>...</url>` if enabling
- **Prerender**: Add `/case-study/infoquest` to `scripts/prerender.js` if enabling
- **Priority**: Low (data already exists, just needs to be enabled)

## SEO Issues Fixed (2026-01-20)

### Redirect Errors (6 pages) - FIXED
Added 301 redirects in `vercel.json` for duplicate URL aliases:
- `/uae-food-label-localization` -> `/solutions/uae-food-label-localization`
- `/food-label-localization-uae` -> `/solutions/uae-food-label-localization`
- `/dubai-food-label-compliance` -> `/solutions/uae-food-label-localization`
- `/sfda-dossier-gap-analysis` -> `/solutions/saudi-pharma-gap-analysis`
- `/saudi-pharma-registration` -> `/solutions/saudi-pharma-gap-analysis`
- `/sfda-drug-registration` -> `/solutions/saudi-pharma-gap-analysis`
- `/fmcg-label-compliance` -> `/industries/fmcg`

### Soft 404s (10 pages) - FIXED
Added missing routes to prerender script (`scripts/prerender.js`):
- Tool pages: screenshot-to-text, photo-to-text, pdf-page-remover, pdf-rotate, image-compressor, image-resizer, image-converter, heic-to-jpg, webp-converter, csv-to-excel, excel-to-csv, json-to-excel, excel-to-json, qr-code-generator, qr-code-reader, nda-generator, lease-generator, w2-generator, 1099-generator, file-search
- Case studies: takhlees, carrefour, research-copilot

### Duplicate Routes - FIXED
Removed duplicate client-side routes from `App.tsx` (now handled by server-side 301 redirects)

## Remaining Issues to Monitor

### "Discovered - currently not indexed" (9 pages)
These are pages Google has found but hasn't indexed yet. After deploying the fixes above, request indexing in Google Search Console for:
1. Any pages still showing this status after 1-2 weeks
2. Monitor if the number decreases after prerendering is deployed

### "Excluded by 'noindex' tag" (1 page)
- **Action**: Check Google Search Console to identify which specific page has this issue
- **Possible cause**: Could be a meta tag injected during prerendering or from a third-party script

## After Deploying These Fixes

1. Deploy the changes to production
2. Run `npm run build:seo` to regenerate prerendered pages
3. In Google Search Console:
   - Go to Pages > Not indexed
   - Click on each issue type
   - Use "Validate Fix" to request re-crawling
4. For pages showing "Discovered - currently not indexed":
   - Use URL Inspection tool
   - Request indexing for important pages
5. Monitor the Pages report over the next 2-4 weeks
