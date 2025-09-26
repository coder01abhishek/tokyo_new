#!/usr/bin/env node

/**
 * Upload heavy assets to Vercel Blob Storage
 * Run with: node scripts/upload-to-blob.js
 */

import { put } from '@vercel/blob';
import { readFileSync } from 'fs';
import { join } from 'path';

// Heavy files to upload to blob storage
const HEAVY_FILES = [
  // Critical videos (preloaded)
  { local: 'public/videos/doll.mp4', remote: 'videos/doll.mp4', size: '18MB' },
  { local: 'public/videos/doll2.mp4', remote: 'videos/doll2.mp4', size: '19MB' },
  { local: 'public/videos/doll3.mp4', remote: 'videos/doll3.mp4', size: '16MB' },
  
  // Secondary videos
  { local: 'public/videos/AICharactor.mp4', remote: 'videos/AICharactor.mp4', size: '13MB' },
  { local: 'public/videos/step3.mp4', remote: 'videos/step3.mp4', size: '12MB' },
  
  // Large GIF
  { local: 'public/videos/doll.gif', remote: 'videos/doll.gif', size: '36MB' },
  
  // Loader GIF
  { local: 'public/assets/gifs/loader.gif', remote: 'gifs/loader.gif', size: '6.7MB' },
];

async function uploadFile(fileInfo) {
  try {
    console.log(`📤 Uploading ${fileInfo.local} (${fileInfo.size})...`);
    
    const filePath = join(process.cwd(), fileInfo.local);
    const fileBuffer = readFileSync(filePath);
    
    const blob = await put(fileInfo.remote, fileBuffer, {
      access: 'public',
      addRandomSuffix: false, // Keep original names
    });
    
    console.log(`✅ Uploaded: ${fileInfo.remote}`);
    console.log(`🔗 URL: ${blob.url}`);
    console.log('---');
    
    return {
      local: fileInfo.local,
      remote: fileInfo.remote,
      url: blob.url,
      size: fileInfo.size
    };
  } catch (error) {
    console.error(`❌ Error uploading ${fileInfo.local}:`, error.message);
    return null;
  }
}

async function uploadAll() {
  console.log('🚀 Starting upload to Vercel Blob Storage...\n');
  
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
    console.log('💡 Get your token from: https://vercel.com/dashboard/stores');
    process.exit(1);
  }
  
  const results = [];
  
  for (const file of HEAVY_FILES) {
    const result = await uploadFile(file);
    if (result) {
      results.push(result);
    }
  }
  
  console.log('\n📋 Upload Summary:');
  console.log('==================');
  
  const successful = results.filter(r => r !== null);
  const failed = HEAVY_FILES.length - successful.length;
  
  console.log(`✅ Successful uploads: ${successful.length}`);
  console.log(`❌ Failed uploads: ${failed}`);
  
  if (successful.length > 0) {
    console.log('\n🔗 Blob URLs:');
    successful.forEach(result => {
      console.log(`${result.remote} -> ${result.url}`);
    });
    
    // Generate URL mapping for code updates
    console.log('\n📝 URL Mapping for Code Updates:');
    console.log('================================');
    successful.forEach(result => {
      const originalPath = result.local.replace('public/', '/');
      console.log(`"${originalPath}" -> "${result.url}"`);
    });
  }
  
  console.log('\n🎉 Upload complete!');
}

// Run the upload
uploadAll().catch(console.error);
