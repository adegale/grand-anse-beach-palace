export function resolveImage(localPaths: string[], unsplashQuery: string): string {
  for (const path of localPaths) {
    const img = new Image();
    img.src = path;
    if (img.complete || img.naturalWidth > 0) {
      return path;
    }
  }

  const encodedQuery = encodeURIComponent(unsplashQuery);
  return `https://source.unsplash.com/1600x900/?${encodedQuery}`;
}

export function getUnsplashImage(query: string, width = 1600, height = 900): string {
  const encodedQuery = encodeURIComponent(query);
  return `https://source.unsplash.com/${width}x${height}/?${encodedQuery}`;
}
