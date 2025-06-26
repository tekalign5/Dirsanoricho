// attraction-v2.js - GitHub-hosted version
// This version works with direct GitHub raw URLs and React Native
const videoProcessor = {
  async getVideoInfo(url) {
    try {
      // This would be replaced with actual API call to your backend
      // For demo purposes, we'll simulate different URLs
      const videoId = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1] || 'VIDEO_ID';
      
      return {
        title: "Example Video - " + videoId,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        formats: [
          {
            quality: "1080p",
            url: `https://example.com/videoplayback/${videoId}/1080p`,
            type: "mp4",
            bitrate: 4000
          },
          {
            quality: "720p", 
            url: `https://example.com/videoplayback/${videoId}/720p`,
            type: "mp4",
            bitrate: 2500
          },
          {
            quality: "480p",
            url: `https://example.com/videoplayback/${videoId}/480p`,
            type: "mp4", 
            bitrate: 1000
          }
        ].filter(format => {
          // Simulate some formats not being available for certain videos
          return Math.random() > 0.2; // 80% chance format is available
        })
      };
    } catch (error) {
      console.error('Error in getVideoInfo:', error);
      throw new Error('Failed to get video information');
    }
  },

  async downloadVideo(url, quality) {
    try {
      const info = await this.getVideoInfo(url);
      const format = info.formats.find(f => f.quality === quality);
      
      if (!format) {
        const availableQualities = info.formats.map(f => f.quality).join(', ');
        throw new Error(`Quality ${quality} not available. Try: ${availableQualities}`);
      }

      // In a real implementation, this would generate a signed download URL
      return {
        directUrl: format.url,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://www.youtube.com/'
        }
      };
    } catch (error) {
      console.error('Error in downloadVideo:', error);
      throw error;
    }
  }
};

// For GitHub-hosted scripts, we need to handle both CommonJS and direct execution
if (typeof module !== 'undefined' && module.exports) {
  module.exports = videoProcessor;
} else {
  // Fallback for direct script execution
  window.videoProcessor = videoProcessor;
}