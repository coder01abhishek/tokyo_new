#!/usr/bin/env node

/**
 * Upload extracted GIF icon files to Vercel Blob Storage
 * Run with: BLOB_READ_WRITE_TOKEN=your_token node scripts/upload-gif-icons-to-blob.mjs
 */

import { put } from '@vercel/blob';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const SOURCE_DIR = '/Users/harshraj/Downloads/to be uploaded to blob';

async function uploadGifFile(filePath, fileName) {
  try {
    console.log(`📤 Uploading icons/${fileName}...`);
    
    const fileBuffer = readFileSync(filePath);
    
    const blob = await put(`icons/${fileName}`, fileBuffer, {
      access: 'public',
      addRandomSuffix: false, // Keep original names
    });
    
    console.log(`✅ Uploaded: icons/${fileName}`);
    console.log(`🔗 URL: ${blob.url}`);
    console.log('---');
    
    return {
      local: filePath,
      remote: `icons/${fileName}`,
      url: blob.url,
      fileName: fileName
    };
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error.message);
    return null;
  }
}

async function uploadAllGifIcons() {
  console.log('🎯 Starting GIF icons upload to Vercel Blob Storage...\n');
  
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
    console.log('💡 Set it like: BLOB_READ_WRITE_TOKEN=your_token node scripts/upload-gif-icons-to-blob.mjs');
    process.exit(1);
  }
  
  // Get all GIF files from the source directory
  const files = readdirSync(SOURCE_DIR);
  const gifFiles = files.filter(file => {
    const filePath = join(SOURCE_DIR, file);
    return statSync(filePath).isFile() && extname(file).toLowerCase() === '.gif';
  });
  
  if (gifFiles.length === 0) {
    console.log('❌ No GIF files found in the source directory');
    process.exit(1);
  }
  
  console.log(`📁 Found ${gifFiles.length} GIF files to upload:`);
  gifFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  const results = [];
  
  for (const fileName of gifFiles) {
    const filePath = join(SOURCE_DIR, fileName);
    const result = await uploadGifFile(filePath, fileName);
    if (result) {
      results.push(result);
    }
  }
  
  console.log('\n📋 GIF Icons Upload Summary:');
  console.log('============================');
  
  const successful = results.filter(r => r !== null);
  const failed = gifFiles.length - successful.length;
  
  console.log(`✅ Successful uploads: ${successful.length}`);
  console.log(`❌ Failed uploads: ${failed}`);
  
  if (successful.length > 0) {
    console.log('\n🔗 GIF Icon Blob URLs:');
    console.log('======================');
    successful.forEach(result => {
      console.log(`${result.fileName}: ${result.url}`);
    });
  }
  
  console.log('\n🎉 GIF icons upload complete!');
}

// Run the upload
uploadAllGifIcons().catch(console.error);
