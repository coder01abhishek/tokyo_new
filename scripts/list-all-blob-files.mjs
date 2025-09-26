#!/usr/bin/env node

/**
 * List all files in Vercel Blob Storage
 * Run with: BLOB_READ_WRITE_TOKEN=your_token node scripts/list-all-blob-files.mjs
 */

import { list } from '@vercel/blob';

async function listAllBlobFiles() {
  console.log('🔍 Listing all files in Vercel Blob Storage...\n');
  
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
    console.log('💡 Set it like: BLOB_READ_WRITE_TOKEN=your_token node scripts/list-all-blob-files.mjs');
    process.exit(1);
  }
  
  try {
    // List all files in blob storage
    const { blobs } = await list();
    
    if (blobs.length === 0) {
      console.log('📁 No files found in blob storage');
      return [];
    }
    
    console.log(`📁 Found ${blobs.length} files in blob storage:\n`);
    
    // Group files by folder/prefix
    const filesByFolder = {};
    
    blobs.forEach(blob => {
      const pathParts = blob.pathname.split('/');
      const folder = pathParts.length > 1 ? pathParts[0] : 'root';
      
      if (!filesByFolder[folder]) {
        filesByFolder[folder] = [];
      }
      
      filesByFolder[folder].push({
        pathname: blob.pathname,
        url: blob.url,
        size: blob.size,
        uploadedAt: blob.uploadedAt
      });
    });
    
    // Display organized results
    Object.keys(filesByFolder).sort().forEach(folder => {
      console.log(`📂 ${folder}/`);
      console.log('─'.repeat(50));
      
      filesByFolder[folder].forEach(file => {
        console.log(`📄 ${file.pathname}`);
        console.log(`   🔗 URL: ${file.url}`);
        console.log(`   📊 Size: ${file.size} bytes`);
        console.log(`   📅 Uploaded: ${new Date(file.uploadedAt).toLocaleString()}`);
        console.log('');
      });
    });
    
    return blobs;
    
  } catch (error) {
    console.error('❌ Error listing blob files:', error.message);
    return [];
  }
}

// Run the listing
listAllBlobFiles().catch(console.error);
