import { CMSData } from './cmsService';

export const compressBase64Image = (base64Str: string): Promise<string> => {
  if (!base64Str || typeof window === 'undefined' || !base64Str.startsWith('data:image')) {
    return Promise.resolve(base64Str);
  }
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const maxDim = 1000;
        if (width > maxDim || height > maxDim) {
          if (width > height) { height = Math.round((height * maxDim) / width); width = maxDim; }
          else { width = Math.round((width * maxDim) / height); height = maxDim; }
        }
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      } catch { resolve(base64Str); }
    };
    img.onerror = () => resolve(base64Str);
    img.src = base64Str;
  });
};

export const compressCMSImages = async (data: CMSData): Promise<CMSData> => {
  const cloned = JSON.parse(JSON.stringify(data)) as CMSData;
  if (cloned.hero?.image) cloned.hero.image = await compressBase64Image(cloned.hero.image);
  if (cloned.bio?.image) cloned.bio.image = await compressBase64Image(cloned.bio.image);
  for (const s of cloned.slides ?? []) { if (s.image) s.image = await compressBase64Image(s.image); }
  for (const s of cloned.services ?? []) { if (s.image) s.image = await compressBase64Image(s.image); }
  for (const t of cloned.testimonials ?? []) { if (t.image) t.image = await compressBase64Image(t.image); }
  return cloned;
};
