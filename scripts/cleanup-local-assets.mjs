#!/usr/bin/env node

/**
 * Remove local assets that are available in blob storage
 * Run with: BLOB_READ_WRITE_TOKEN=your_token node scripts/cleanup-local-assets.mjs
 */

import { list } from '@vercel/blob';
import { unlinkSync, existsSync, statSync } from 'fs';
import { join } from 'path';

const PUBLIC_DIR = '/Users/harshraj/Downloads/tokyo-website/public';

// Files that should be removed from local storage (they exist in blob)
const LOCAL_FILES_TO_REMOVE = [
  // Videos
  'videos/Aiagent.mp4',
  'videos/AICharactor.mp4', 
  'videos/doll.gif',
  'videos/doll.mp4',
  'videos/doll2.mp4',
  'videos/doll3.mp4',
  'videos/step3.mp4',
  
  // GIFs
  'assets/gifs/consciousness.gif',
  'assets/gifs/discord.gif',
  'assets/gifs/hearing.gif',
  'assets/gifs/loader.gif',
  'assets/gifs/memory.gif',
  'assets/gifs/models.gif',
  'assets/gifs/modules.gif',
  'assets/gifs/providers.gif',
  'assets/gifs/scene.gif',
  'assets/gifs/shortTerm.gif',
  'assets/gifs/speech.gif',
  'assets/gifs/system.gif',
  'assets/gifs/vision.gif',
  'assets/gifs/x.gif',
  
  // Images
  'assets/images/ainew.png',
  'assets/images/ainew_1.png',
  'assets/images/ainew_2.png',
  'assets/images/ainew_old.png',
  'assets/images/eng.png',
  'assets/images/epanola.png',
  'assets/images/pycc.png',
  'assets/images/tech-mask.png',
  'assets/images/tie.png',
  'assets/images/简体中文提示.png',
  
  // Root level assets
  'bg-inte.png',
  'cursor.png',
  'fader.png',
  'Gradient.png',
  'hand.png',
  'phone.png',
  'iPhone14Pro.svg',
  'file.svg',
  'globe.svg',
  'next.svg',
  'vercel.svg',
  'window.svg',
  
  // Favicons (these are in blob)
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'site.webmanifest'
];

async function verifyBlobStorage() {
  console.log('🔍 Verifying blob storage contents...\n');
  
  try {
    const { blobs } = await list();
    const blobPaths = blobs.map(blob => blob.pathname);
    
    console.log(`📦 Found ${blobs.length} files in blob storage`);
    
    // Check which local files have blob equivalents
    const verified = [];
    const missing = [];
    
    for (const localFile of LOCAL_FILES_TO_REMOVE) {
      const localPath = join(PUBLIC_DIR, localFile);
      
      if (!existsSync(localPath)) {
        console.log(`⚠️  Local file doesn't exist: ${localFile}`);
        continue;
      }
      
      // Check if this file exists in blob storage
      const blobEquivalents = [
        localFile,
        localFile.replace('assets/gifs/', 'gifs/'),
        localFile.replace('assets/images/', 'images/'),
        localFile.replace('assets/', ''),
        `icons/${localFile.split('/').pop()}` // For favicon files
      ];
      
      const hasBlob = blobEquivalents.some(path => blobPaths.includes(path));
      
      if (hasBlob) {
        verified.push(localFile);
      } else {
        missing.push(localFile);
        console.log(`❌ No blob equivalent found for: ${localFile}`);
      }
    }
    
    return { verified, missing };
    
  } catch (error) {
    console.error('❌ Error accessing blob storage:', error.message);
    process.exit(1);
  }
}

function removeLocalFile(filePath) {
  try {
    const fullPath = join(PUBLIC_DIR, filePath);
    const stats = statSync(fullPath);
    const sizeKB = Math.round(stats.size / 1024);
    
    unlinkSync(fullPath);
    console.log(`🗑️  Removed: ${filePath} (${sizeKB} KB)`);
    return stats.size;
  } catch (error) {
    console.log(`⚠️  Could not remove ${filePath}:`, error.message);
    return 0;
  }
}

async function cleanupLocalAssets() {
  console.log('🧹 Starting local assets cleanup...\n');
  
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
    console.log('💡 Set it like: BLOB_READ_WRITE_TOKEN=your_token node scripts/cleanup-local-assets.mjs');
    process.exit(1);
  }
  
  // Step 1: Verify blob storage
  const { verified, missing } = await verifyBlobStorage();
  
  if (missing.length > 0) {
    console.log('\n⚠️  WARNING: Some files are missing from blob storage:');
    missing.forEach(file => console.log(`   - ${file}`));
    console.log('\nPlease upload these files to blob storage first.');
    process.exit(1);
  }
  
  console.log(`\n✅ All ${verified.length} files verified in blob storage`);
  console.log('\n🗑️  Starting local file removal...');
  console.log('='.repeat(50));
  
  // Step 2: Remove local files
  let totalSaved = 0;
  let removedCount = 0;
  
  for (const filePath of verified) {
    const savedBytes = removeLocalFile(filePath);
    if (savedBytes > 0) {
      totalSaved += savedBytes;
      removedCount++;
    }
  }
  
  // Step 3: Summary
  console.log('\n📋 Cleanup Summary:');
  console.log('===================');
  console.log(`🗑️  Files removed: ${removedCount}`);
  console.log(`💾 Space saved: ${Math.round(totalSaved / 1024 / 1024 * 100) / 100} MB`);
  console.log(`📦 Files in blob: ${verified.length}`);
  
  console.log('\n🎉 Local assets cleanup complete!');
  console.log('💡 Your website will now load all assets from blob storage CDN.');
  console.log('🚀 This should improve loading times and reduce bundle size!');
}

// Run the cleanup
cleanupLocalAssets().catch(console.error);
