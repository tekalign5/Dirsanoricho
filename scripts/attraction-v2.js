// Make sure this is EXACTLY how your script looks
const videoProcessor = {
  async getVideoInfo(url) {
    // Replace this with actual implementation
    return {
      title: "Example Video",
      thumbnail: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
      formats: [
        { quality: "1080p", url: "https://.../videoplayback?quality=1080...", type: "mp4" },
        { quality: "720p", url: "https://.../videoplayback?quality=720...", type: "mp4" },
        { quality: "480p", url: "https://.../videoplayback?quality=480...", type: "mp4" }
      ]
    };
  },

  async downloadVideo(url, quality) {
    const info = await this.getVideoInfo(url);
    const format = info.formats.find(f => f.quality === quality);
    if (!format) throw new Error('Quality not available');
    return format.url;
  }
};

// Must use module.exports (not just exports)
module.exports = videoProcessor;