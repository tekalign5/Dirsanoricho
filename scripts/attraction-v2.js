// attraction-v2.js - Updated with proper exports
const videoProcessor = {
  async getVideoInfo(url) {
    return {
      title: "Example Video",
      thumbnail: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
      formats: [
        { quality: "1080p", url: "https://youtu.be/fxajJlGlp5w/videoplayback?quality=1080..." },
        { quality: "720p", url: "https://youtu.be/fxajJlGlp5w/videoplayback?quality=720..." },
        { quality: "480p", url: "https://youtu.be/fxajJlGlp5w/videoplayback?quality=480..." }
      ]
    };
  },

  downloadVideo(url, quality) {
    return this.getVideoInfo(url)
      .then(info => info.formats.find(f => f.quality === quality).url);
  }
};

// Export for Node.js/CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = videoProcessor;
}

// Make available for global scope (for in-app execution)
window.videoProcessor = videoProcessor;