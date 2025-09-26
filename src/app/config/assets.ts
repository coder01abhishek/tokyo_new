/**
 * Asset URL Configuration
 * Manages URLs for media assets (local vs blob storage)
 */

// Environment flag to use blob storage URLs
// Always use blob storage to avoid hydration mismatches
const USE_BLOB_STORAGE = true;

// Blob storage URLs (populated from Vercel blob storage)
const BLOB_URLS = {
  // Critical videos (preloaded)
  '/videos/doll.mp4': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/videos/doll.mp4',
  '/videos/doll2.mp4': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/videos/doll2.mp4',
  '/videos/doll3.mp4': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/videos/doll3.mp4',
  
  // Secondary videos
  '/videos/AICharactor.mp4': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/videos/AICharactor.mp4',
  '/videos/step3.mp4': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/videos/step3.mp4',
  
  // Large GIF
  '/videos/doll.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/videos/doll.gif',
  
  // Loader GIF
  '/assets/gifs/loader.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/loader.gif',
  
  // Favicon/Icon URLs
  '/favicon.ico': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/favicon.ico',
  '/favicon-16x16.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/favicon-16x16.png',
  '/favicon-32x32.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/favicon-32x32.png',
  '/apple-touch-icon.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/apple-touch-icon.png',
  '/android-chrome-192x192.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/android-chrome-192x192.png',
  '/android-chrome-512x512.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/android-chrome-512x512.png',
  '/site.webmanifest': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/site.webmanifest',
  
  // Missing video
  '/videos/Aiagent.mp4': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/videos/Aiagent.mp4',
  
  // All GIF assets (both existing local and newly uploaded animated icons)
  '/assets/gifs/consciousness.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/consciousness.gif',
  '/assets/gifs/discord.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/discord.gif',
  '/assets/gifs/hearing.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/hearing.gif',
  '/assets/gifs/memory.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/memory.gif',
  '/assets/gifs/models.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/models.gif',
  '/assets/gifs/modules.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/modules.gif',
  '/assets/gifs/providers.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/providers.gif',
  '/assets/gifs/scene.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/scene.gif',
  '/assets/gifs/shortTerm.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/shortTerm.gif',
  '/assets/gifs/speech.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/speech.gif',
  '/assets/gifs/system.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/system.gif',
  '/assets/gifs/vision.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/vision.gif',
  '/assets/gifs/x.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/gifs/x.gif',
  
  // Image assets
  '/assets/images/ainew.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/images/ainew.png',
  '/assets/images/ainew_1.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/images/ainew_1.png',
  '/assets/images/ainew_2.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/images/ainew_2.png',
  '/assets/images/ainew_old.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/images/ainew_old.png',
  '/assets/images/eng.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/images/eng.png',
  '/assets/images/epanola.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/images/epanola.png',
  '/assets/images/pycc.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/images/pycc.png',
  '/assets/images/tech-mask.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/images/tech-mask.png',
  '/assets/images/tie.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/images/tie.png',
  '/assets/images/简体中文提示.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/images/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%E6%8F%90%E7%A4%BA.png',
  
  // Root level assets
  '/bg-inte.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/bg-inte.png',
  '/cursor.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/cursor.png',
  '/fader.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/fader.png',
  '/Gradient.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/Gradient.png',
  '/hand.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/hand.png',
  '/phone.png': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/phone.png',
  '/iPhone14Pro.svg': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/iPhone14Pro.svg',
  '/file.svg': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/file.svg',
  '/globe.svg': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/globe.svg',
  '/next.svg': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/next.svg',
  '/vercel.svg': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/vercel.svg',
  '/window.svg': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/window.svg',
  
  // Newly uploaded animated GIF icons (from Tokyo Intelligence/Modules Icons) - for future use
  '/assets/gifs/brain.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-2353-horizontal-brain-hover-pinch-trim.gif',
  '/assets/gifs/layers.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-12-layers-hover-slide.gif',
  '/assets/gifs/avatar.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-16-avatar-woman-nodding-hover-pinch.gif',
  '/assets/gifs/talking.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-2456-person-talking-hover-talking.gif',
  '/assets/gifs/discord-icon.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-2566-logo-discord-hover-rotation.gif',
  '/assets/gifs/intuitive.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-2602-intuitive-hover-pinch%20%281%29.gif',
  '/assets/gifs/x-logo.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-2714-logo-x-hover-pinch.gif',
  '/assets/gifs/film.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-62-film-hover-play.gif',
  '/assets/gifs/binoculars.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-741-binoculars-hover-pinch.gif',
  '/assets/gifs/circuits.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-746-technology-integrated-circuits-hover-pinch.gif',
  '/assets/gifs/settings.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/wired-outline-749-interface-settings-hover-pinch.gif',
  '/assets/gifs/special-animation.gif': 'https://4b7mwyeirrypbewg.public.blob.vercel-storage.com/icons/597596772154284bc17b7727e87b9678700e02e8.gif',
};

/**
 * Get the appropriate URL for an asset
 * @param localPath - The local path (e.g., '/videos/doll.mp4')
 * @returns Either blob URL or local path
 */
export function getAssetUrl(localPath: string): string {
  if (USE_BLOB_STORAGE && BLOB_URLS[localPath as keyof typeof BLOB_URLS]) {
    return BLOB_URLS[localPath as keyof typeof BLOB_URLS];
  }
  return localPath;
}

/**
 * Update blob URLs after upload
 * @param urlMapping - Mapping of local paths to blob URLs
 */
export function updateBlobUrls(urlMapping: Record<string, string>) {
  Object.assign(BLOB_URLS, urlMapping);
}

// Export the configuration
export { USE_BLOB_STORAGE, BLOB_URLS };
