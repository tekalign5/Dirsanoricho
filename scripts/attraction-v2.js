// ===== attraction-v2.js =====
// Safe for GitHub raw URLs - No Node.js dependencies
var videoProcessor = (function() {
  'use strict';
  
  // Main processor object
  return {
    /**
     * Get video information
     * @param {string} url - YouTube URL
     * @returns {Promise<object>} Video info
     */
    async getVideoInfo(url) {
      try {
        // 1. Validate URL
        const videoId = this._extractVideoId(url);
        if (!videoId) throw new Error('Invalid YouTube URL');
        
        // 2. Return simulated data (replace with real API call)
        return {
          title: `YouTube Video (${videoId})`,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
          formats: this._generateFormats(videoId),
          duration: '10:30'
        };
        
      } catch (error) {
        console.error('Video info error:', error.message);
        throw error;
      }
    },
    
    /**
     * Get download URL for specific quality
     * @param {string} url - YouTube URL
     * @param {string} quality - Desired quality (e.g., "1080p")
     * @returns {Promise<string>} Download URL
     */
    async downloadVideo(url, quality) {
      const info = await this.getVideoInfo(url);
      const format = info.formats.find(f => f.quality === quality);
      
      if (!format) {
        const available = info.formats.map(f => f.quality).join(', ');
        throw new Error(`Quality "${quality}" not available. Try: ${available}`);
      }
      
      return format.url;
    },
    
    // === Private Methods ===
    _extractVideoId(url) {
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    },
    
    _generateFormats(videoId) {
      const qualities = [
        { name: "1080p", code: "137", type: "mp4" },
        { name: "720p", code: "22", type: "mp4" }, 
        { name: "480p", code: "135", type: "mp4" },
        { name: "360p", code: "18", type: "mp4" }
      ];
      
      return qualities
        .filter(() => Math.random() > 0.3) // 70% availability
        .map(q => ({
          quality: q.name,
          url: `https://example-proxy.com/stream/${videoId}/${q.code}`,
          type: q.type,
          bitrate: this._getBitrate(q.name)
        }));
    },
    
    _getBitrate(quality) {
      const rates = { "1080p": 4000, "720p": 2500, "480p": 1000, "360p": 700 };
      return rates[quality] || 500;
    }
  };
})();

// Universal export pattern
if (typeof window !== 'undefined') window.videoProcessor = videoProcessor;