#!/usr/bin/env node

/**
 * Upload all missing assets to Vercel Blob Storage
 * Run with: BLOB_READ_WRITE_TOKEN=your_token node scripts/upload-missing-assets-to-blob.mjs
 */

import { put } from '@vercel/blob';
import { readFileSync, statSync } from 'fs';
import { join } from 'path';

const PUBLIC_DIR = '/Users/harshraj/Downloads/tokyo-website/public';

// Assets to upload organized by target folder in blob storage
const ASSETS_TO_UPLOAD = {
  // Videos folder
  'videos': [
    { local: 'videos/Aiagent.mp4', remote: 'videos/Aiagent.mp4' },
    // Note: Other videos are already uploaded
  ],
  
  // Assets/gifs folder -> gifs folder in blob
  'gifs': [
    { local: 'assets/gifs/consciousness.gif', remote: 'gifs/consciousness.gif' },
    { local: 'assets/gifs/discord.gif', remote: 'gifs/discord.gif' },
    { local: 'assets/gifs/hearing.gif', remote: 'gifs/hearing.gif' },
    { local: 'assets/gifs/memory.gif', remote: 'gifs/memory.gif' },
    { local: 'assets/gifs/models.gif', remote: 'gifs/models.gif' },
    { local: 'assets/gifs/modules.gif', remote: 'gifs/modules.gif' },
    { local: 'assets/gifs/providers.gif', remote: 'gifs/providers.gif' },
    { local: 'assets/gifs/scene.gif', remote: 'gifs/scene.gif' },
    { local: 'assets/gifs/shortTerm.gif', remote: 'gifs/shortTerm.gif' },
    { local: 'assets/gifs/speech.gif', remote: 'gifs/speech.gif' },
    { local: 'assets/gifs/system.gif', remote: 'gifs/system.gif' },
    { local: 'assets/gifs/vision.gif', remote: 'gifs/vision.gif' },
    { local: 'assets/gifs/x.gif', remote: 'gifs/x.gif' },
  ],
  
  // Assets/images folder -> images folder in blob
  'images': [
    { local: 'assets/images/ainew.png', remote: 'images/ainew.png' },
    { local: 'assets/images/ainew_1.png', remote: 'images/ainew_1.png' },
    { local: 'assets/images/ainew_2.png', remote: 'images/ainew_2.png' },
    { local: 'assets/images/ainew_old.png', remote: 'images/ainew_old.png' },
    { local: 'assets/images/eng.png', remote: 'images/eng.png' },
    { local: 'assets/images/epanola.png', remote: 'images/epanola.png' },
    { local: 'assets/images/pycc.png', remote: 'images/pycc.png' },
    { local: 'assets/images/tech-mask.png', remote: 'images/tech-mask.png' },
    { local: 'assets/images/tie.png', remote: 'images/tie.png' },
    { local: 'assets/images/简体中文提示.png', remote: 'images/简体中文提示.png' },
  ],
  
  // Root level files -> root folder in blob
  'root': [
    { local: 'bg-inte.png', remote: 'bg-inte.png' },
    { local: 'cursor.png', remote: 'cursor.png' },
    { local: 'fader.png', remote: 'fader.png' },
    { local: 'Gradient.png', remote: 'Gradient.png' },
    { local: 'hand.png', remote: 'hand.png' },
    { local: 'phone.png', remote: 'phone.png' },
    { local: 'iPhone14Pro.svg', remote: 'iPhone14Pro.svg' },
    { local: 'file.svg', remote: 'file.svg' },
    { local: 'globe.svg', remote: 'globe.svg' },
    { local: 'next.svg', remote: 'next.svg' },
    { local: 'vercel.svg', remote: 'vercel.svg' },
    { local: 'window.svg', remote: 'window.svg' },
  ]
};

async function uploadAsset(localPath, remotePath) {
  try {
    const fullLocalPath = join(PUBLIC_DIR, localPath);
    console.log(`📤 Uploading ${remotePath}...`);
    
    const fileBuffer = readFileSync(fullLocalPath);
    const stats = statSync(fullLocalPath);
    
    const blob = await put(remotePath, fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
    });
    
    console.log(`✅ Uploaded: ${remotePath} (${Math.round(stats.size / 1024)} KB)`);
    console.log(`🔗 URL: ${blob.url}`);
    console.log('---');
    
    return {
      local: localPath,
      remote: remotePath,
      url: blob.url,
      size: stats.size
    };
  } catch (error) {
    console.error(`❌ Error uploading ${localPath}:`, error.message);
    return null;
  }
}

async function uploadAllAssets() {
  console.log('🎯 Starting missing assets upload to Vercel Blob Storage...\n');
  
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
    console.log('💡 Set it like: BLOB_READ_WRITE_TOKEN=your_token node scripts/upload-missing-assets-to-blob.mjs');
    process.exit(1);
  }
  
  const results = [];
  let totalUploaded = 0;
  
  // Upload assets by category
  for (const [category, assets] of Object.entries(ASSETS_TO_UPLOAD)) {
    console.log(`\n📂 Uploading ${category.toUpperCase()} assets:`);
    console.log('='.repeat(50));
    
    for (const asset of assets) {
      const result = await uploadAsset(asset.local, asset.remote);
      if (result) {
        results.push(result);
        totalUploaded++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log('\n📋 Upload Summary:');
  console.log('==================');
  console.log(`✅ Total successful uploads: ${totalUploaded}`);
  console.log(`❌ Failed uploads: ${Object.values(ASSETS_TO_UPLOAD).flat().length - totalUploaded}`);
  
  if (results.length > 0) {
    // Group results by folder for organized output
    const resultsByFolder = {};
    results.forEach(result => {
      const folder = result.remote.includes('/') ? result.remote.split('/')[0] : 'root';
      if (!resultsByFolder[folder]) resultsByFolder[folder] = [];
      resultsByFolder[folder].push(result);
    });
    
    console.log('\n🔗 Uploaded Asset URLs by Folder:');
    console.log('==================================');
    
    Object.keys(resultsByFolder).sort().forEach(folder => {
      console.log(`\n📂 ${folder.toUpperCase()}:`);
      resultsByFolder[folder].forEach(result => {
        console.log(`${result.remote}: ${result.url}`);
      });
    });
    
    // Calculate total size
    const totalSize = results.reduce((sum, result) => sum + result.size, 0);
    console.log(`\n📊 Total uploaded: ${Math.round(totalSize / 1024 / 1024 * 100) / 100} MB`);
  }
  
  console.log('\n🎉 Asset upload complete!');
  console.log('💡 Next step: Update assets.ts configuration with new URLs');
}

// Run the upload
uploadAllAssets().catch(console.error);
