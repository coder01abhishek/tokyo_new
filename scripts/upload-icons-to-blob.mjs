#!/usr/bin/env node

/**
 * Upload favicon and icon files to Vercel Blob Storage
 * Run with: node scripts/upload-icons-to-blob.mjs
 */

import { put } from '@vercel/blob';
import { readFileSync } from 'fs';
import { join } from 'path';

// Icon files to upload to blob storage
const ICON_FILES = [
  // Favicon files
  { local: '/Users/harshraj/Downloads/favicon_io/favicon.ico', remote: 'icons/favicon.ico', size: 'small' },
  { local: '/Users/harshraj/Downloads/favicon_io/favicon-16x16.png', remote: 'icons/favicon-16x16.png', size: '16x16' },
  { local: '/Users/harshraj/Downloads/favicon_io/favicon-32x32.png', remote: 'icons/favicon-32x32.png', size: '32x32' },
  { local: '/Users/harshraj/Downloads/favicon_io/apple-touch-icon.png', remote: 'icons/apple-touch-icon.png', size: '180x180' },
  { local: '/Users/harshraj/Downloads/favicon_io/android-chrome-192x192.png', remote: 'icons/android-chrome-192x192.png', size: '192x192' },
  { local: '/Users/harshraj/Downloads/favicon_io/android-chrome-512x512.png', remote: 'icons/android-chrome-512x512.png', size: '512x512' },
  { local: '/Users/harshraj/Downloads/favicon_io/site.webmanifest', remote: 'icons/site.webmanifest', size: 'manifest' },
];

async function uploadIcon(fileInfo) {
  try {
    console.log(`📤 Uploading ${fileInfo.remote} (${fileInfo.size})...`);
    
    const fileBuffer = readFileSync(fileInfo.local);
    
    const blob = await put(fileInfo.remote, fileBuffer, {
      access: 'public',
      addRandomSuffix: false, // Keep original names for favicons
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

async function uploadAllIcons() {
  console.log('🎯 Starting favicon upload to Vercel Blob Storage...\n');
  
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
    console.log('💡 Get your token from: https://vercel.com/dashboard/stores');
    process.exit(1);
  }
  
  const results = [];
  
  for (const file of ICON_FILES) {
    const result = await uploadIcon(file);
    if (result) {
      results.push(result);
    }
  }
  
  console.log('\n📋 Icon Upload Summary:');
  console.log('========================');
  
  const successful = results.filter(r => r !== null);
  const failed = ICON_FILES.length - successful.length;
  
  console.log(`✅ Successful uploads: ${successful.length}`);
  console.log(`❌ Failed uploads: ${failed}`);
  
  if (successful.length > 0) {
    console.log('\n🔗 Icon Blob URLs:');
    console.log('==================');
    successful.forEach(result => {
      console.log(`${result.size}: ${result.url}`);
    });
    
    // Generate favicon HTML for easy copy-paste
    console.log('\n📝 HTML for <head> section:');
    console.log('============================');
    successful.forEach(result => {
      if (result.remote.includes('favicon-16x16')) {
        console.log(`<link rel="icon" type="image/png" sizes="16x16" href="${result.url}">`);
      } else if (result.remote.includes('favicon-32x32')) {
        console.log(`<link rel="icon" type="image/png" sizes="32x32" href="${result.url}">`);
      } else if (result.remote.includes('apple-touch-icon')) {
        console.log(`<link rel="apple-touch-icon" sizes="180x180" href="${result.url}">`);
      } else if (result.remote.includes('android-chrome-192')) {
        console.log(`<link rel="icon" type="image/png" sizes="192x192" href="${result.url}">`);
      } else if (result.remote.includes('android-chrome-512')) {
        console.log(`<link rel="icon" type="image/png" sizes="512x512" href="${result.url}">`);
      } else if (result.remote.includes('favicon.ico')) {
        console.log(`<link rel="shortcut icon" href="${result.url}">`);
      } else if (result.remote.includes('site.webmanifest')) {
        console.log(`<link rel="manifest" href="${result.url}">`);
      }
    });
    
    // Find the 200x200 closest icon
    const icon200 = successful.find(r => r.remote.includes('192x192')) || 
                   successful.find(r => r.remote.includes('android-chrome-192'));
    
    if (icon200) {
      console.log('\n🎯 200x200 Icon URL (closest size - 192x192):');
      console.log('===============================================');
      console.log(icon200.url);
    }
  }
  
  console.log('\n🎉 Icon upload complete!');
}

// Run the upload
uploadAllIcons().catch(console.error);
