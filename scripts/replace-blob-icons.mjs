#!/usr/bin/env node

/**
 * Replace existing blob storage icons with updated versions
 * Run with: BLOB_READ_WRITE_TOKEN=your_token node scripts/replace-blob-icons.mjs
 */

import { put, del } from '@vercel/blob';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const SOURCE_DIR = '/Users/harshraj/Downloads/to be uploaded to blob';

// Icons that need to be replaced (these are the old URLs from blob storage)
const ICONS_TO_REPLACE = [
  'icons/597596772154284bc17b7727e87b9678700e02e8.gif',
  'icons/wired-outline-12-layers-hover-slide.gif',
  'icons/wired-outline-16-avatar-woman-nodding-hover-pinch.gif',
  'icons/wired-outline-2353-horizontal-brain-hover-pinch-trim.gif',
  'icons/wired-outline-2456-person-talking-hover-talking%20%281%29.gif',
  'icons/wired-outline-2456-person-talking-hover-talking.gif',
  'icons/wired-outline-2566-logo-discord-hover-rotation.gif',
  'icons/wired-outline-2602-intuitive-hover-pinch%20%281%29.gif',
  'icons/wired-outline-2714-logo-x-hover-pinch.gif',
  'icons/wired-outline-62-film-hover-play.gif',
  'icons/wired-outline-741-binoculars-hover-pinch.gif',
  'icons/wired-outline-746-technology-integrated-circuits-hover-pinch.gif',
  'icons/wired-outline-749-interface-settings-hover-pinch.gif'
];

async function deleteOldIcon(iconPath) {
  try {
    console.log(`🗑️  Deleting old version: ${iconPath}...`);
    await del(`https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/${iconPath}`);
    console.log(`✅ Deleted: ${iconPath}`);
    return true;
  } catch (error) {
    console.log(`⚠️  Could not delete ${iconPath}:`, error.message);
    return false;
  }
}

async function uploadNewIcon(localFileName) {
  try {
    const localPath = join(SOURCE_DIR, localFileName);
    const remotePath = `icons/${localFileName}`;
    
    console.log(`📤 Uploading new version: ${remotePath}...`);
    
    const fileBuffer = readFileSync(localPath);
    const stats = statSync(localPath);
    
    const blob = await put(remotePath, fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
    });
    
    console.log(`✅ Uploaded: ${remotePath} (${Math.round(stats.size / 1024)} KB)`);
    console.log(`🔗 New URL: ${blob.url}`);
    console.log('---');
    
    return {
      local: localFileName,
      remote: remotePath,
      url: blob.url,
      size: stats.size
    };
  } catch (error) {
    console.error(`❌ Error uploading ${localFileName}:`, error.message);
    return null;
  }
}

async function replaceIcons() {
  console.log('🔄 Starting icon replacement process...\n');
  
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
    console.log('💡 Set it like: BLOB_READ_WRITE_TOKEN=your_token node scripts/replace-blob-icons.mjs');
    process.exit(1);
  }
  
  // Get all GIF files from source directory
  const files = readdirSync(SOURCE_DIR);
  const gifFiles = files.filter(file => {
    const filePath = join(SOURCE_DIR, file);
    return statSync(filePath).isFile() && extname(file).toLowerCase() === '.gif';
  });
  
  console.log(`📁 Found ${gifFiles.length} updated GIF files:`);
  gifFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  // Step 1: Delete old versions
  console.log('🗑️  STEP 1: Deleting old versions from blob storage...');
  console.log('='.repeat(60));
  
  let deletedCount = 0;
  for (const iconPath of ICONS_TO_REPLACE) {
    const deleted = await deleteOldIcon(iconPath);
    if (deleted) deletedCount++;
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log(`\n✅ Deleted ${deletedCount} old icons\n`);
  
  // Step 2: Upload new versions
  console.log('📤 STEP 2: Uploading new versions...');
  console.log('='.repeat(60));
  
  const results = [];
  for (const fileName of gifFiles) {
    const result = await uploadNewIcon(fileName);
    if (result) {
      results.push(result);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Summary
  console.log('\n📋 Replacement Summary:');
  console.log('======================');
  console.log(`🗑️  Old icons deleted: ${deletedCount}`);
  console.log(`📤 New icons uploaded: ${results.length}`);
  console.log(`❌ Failed uploads: ${gifFiles.length - results.length}`);
  
  if (results.length > 0) {
    console.log('\n🔗 New Icon URLs:');
    console.log('=================');
    results.forEach(result => {
      console.log(`${result.remote}: ${result.url}`);
    });
    
    const totalSize = results.reduce((sum, result) => sum + result.size, 0);
    console.log(`\n📊 Total uploaded: ${Math.round(totalSize / 1024)} KB`);
  }
  
  console.log('\n🎉 Icon replacement complete!');
  console.log('💡 The new versions are now live and will be used by your website.');
}

// Run the replacement
replaceIcons().catch(console.error);
