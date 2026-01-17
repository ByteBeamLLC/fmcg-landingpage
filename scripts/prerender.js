/**
 * Prerender Script for ByteBeam Landing Page
 * 
 * This script prerenders all marketing pages to static HTML for SEO.
 * It runs after the Vite build and saves rendered HTML for each route.
 * 
 * Usage: node scripts/prerender.js
 */

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '../dist/public');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// Routes to prerender (imported from vite.config.ts concept)
const ROUTES = [
  // Main pages
  '/',
  '/about',
  
  // Hub pages
  '/solutions',
  '/industries',
  
  // Solution pages
  '/solutions/uae-food-label-localization',
  '/solutions/saudi-pharma-gap-analysis',
  
  // Industry pages
  '/industries/fmcg',
  '/industries/pharma',
  '/industries/finance',
  '/industries/legal',
  '/industries/insurance',
  '/industries/operations',
  
  // Tools directory
  '/tools',
  
  // High-value AI tools (prioritized)
  '/tools/contract-analyzer',
  '/tools/contract-clause-finder',
  '/tools/contract-compare',
  '/tools/legal-summarizer',
  '/tools/policy-analyzer',
  '/tools/document-compare',
  '/tools/pdf-chat',
  '/tools/ai-summarizer',
  '/tools/invoice-parser',
  '/tools/receipt-scanner',
  '/tools/bank-statement-parser',
  '/tools/resume-parser',
  
  // PDF & Document tools
  '/tools/pdf-table-extractor',
  '/tools/image-to-text',
  '/tools/pdf-to-text',
  '/tools/handwriting-to-text',
  '/tools/pdf-redactor',
  '/tools/pdf-compressor',
  '/tools/pdf-merger',
  '/tools/pdf-splitter',
  '/tools/image-to-pdf',
  
  // Blog
  '/blog',
  '/blog/automation-platform-comparison-2026',
  '/blog/uae-food-labeling-requirements-2026',
  '/blog/sfda-drug-registration-guide-saudi-arabia',
  '/blog/dubai-municipality-montaji-food-registration',
  '/blog/gcc-document-compliance-automation-2026',
  '/blog/no-code-document-automation-regulatory-teams-2026',
  '/blog/intelligent-document-processing-business-guide-2026',
  '/blog/automating-invoice-processing-2026',
];

/**
 * Start a local server to serve the built files
 */
function startServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['serve', DIST_DIR, '-l', PORT.toString(), '-s'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });
    
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Accepting connections') || output.includes('Local:')) {
        console.log('✓ Server started on port', PORT);
        resolve(server);
      }
    });
    
    server.stderr.on('data', (data) => {
      const error = data.toString();
      if (!error.includes('WARN')) {
        console.error('Server error:', error);
      }
    });
    
    server.on('error', reject);
    
    // Timeout fallback
    setTimeout(() => resolve(server), 3000);
  });
}

/**
 * Prerender a single route
 */
async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  const url = `${BASE_URL}${route}`;

  try {
    // Navigate to the page - use 'domcontentloaded' to avoid hanging on persistent connections
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    });

    // Wait for React to render
    await page.waitForSelector('#root > *', { timeout: 5000 });

    // Brief wait for content to render (reduced from 500ms)
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 200)));
    
    // Get the rendered HTML
    const html = await page.content();
    
    // Determine output path
    const outputPath = route === '/' 
      ? path.join(DIST_DIR, 'index.html')
      : path.join(DIST_DIR, route, 'index.html');
    
    // Create directory if needed
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });
    
    // Write the prerendered HTML
    await fs.writeFile(outputPath, html, 'utf-8');
    
    console.log(`  ✓ ${route}`);
    return true;
  } catch (error) {
    console.error(`  ✗ ${route}: ${error.message}`);
    return false;
  } finally {
    await page.close();
  }
}

/**
 * Main prerender function
 */
async function prerender() {
  console.log('\n🚀 Starting prerender process...\n');
  
  // Check if dist exists
  try {
    await fs.access(DIST_DIR);
  } catch {
    console.error('❌ Build directory not found. Run `npm run build` first.');
    process.exit(1);
  }
  
  // Start local server
  console.log('Starting local server...');
  const server = await startServer();
  
  // Launch browser
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  console.log(`\nPrerendering ${ROUTES.length} routes:\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  // Prerender routes in batches for better performance
  const BATCH_SIZE = 5;
  for (let i = 0; i < ROUTES.length; i += BATCH_SIZE) {
    const batch = ROUTES.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(route => prerenderRoute(browser, route))
    );
    
    results.forEach(success => {
      if (success) successCount++;
      else failCount++;
    });
  }
  
  // Cleanup
  await browser.close();
  server.kill();
  
  console.log(`\n✅ Prerendering complete!`);
  console.log(`   Success: ${successCount}/${ROUTES.length}`);
  if (failCount > 0) {
    console.log(`   Failed: ${failCount}/${ROUTES.length}`);
  }
  
  // Verify homepage has content
  const homepageHtml = await fs.readFile(path.join(DIST_DIR, 'index.html'), 'utf-8');
  const hasContent = homepageHtml.includes('ByteBeam') && homepageHtml.length > 10000;
  
  if (hasContent) {
    console.log('\n✓ Homepage verified: Contains rendered content');
  } else {
    console.log('\n⚠ Warning: Homepage may not have rendered properly');
  }
}

// Run
prerender().catch(console.error);
