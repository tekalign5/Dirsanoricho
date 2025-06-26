// attraction-v2.js - GitHub-compatible version
(function() {
  // Create processor object
  const videoProcessor = {
    async getVideoInfo(url) {
      try {
        // Extract video ID from URL
        const videoId = extractVideoId(url);
        if (!videoId) throw new Error('Invalid YouTube URL');
        
        // Simulate different quality options
        return {
          title: "YouTube Video - " + videoId,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
          formats: getAvailableFormats(videoId)
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
          const available = info.formats.map(f => f.quality).join(', ');
          throw new Error(`Quality ${quality} not available. Try: ${available}`);
        }

        return {
          url: format.url,
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

  // Helper functions
  function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  function getAvailableFormats(videoId) {
    const formats = [];
    const qualities = [
      { name: "1080p", code: "137", type: "mp4" },
      { name: "720p", code: "22", type: "mp4" },
      { name: "480p", code: "135", type: "mp4" },
      { name: "360p", code: "18", type: "mp4" }
    ];

    qualities.forEach(q => {
      if (Math.random() > 0.3) { // 70% chance format is available
        formats.push({
          quality: q.name,
          url: `https://example.com/videoplayback/${videoId}/${q.code}`,
          type: q.type,
          code: q.code
        });
      }
    });

    return formats.length ? formats : [{
      quality: "360p",
      url: `https://example.com/videoplayback/${videoId}/fallback`,
      type: "mp4",
      code: "fallback"
    }];
  }

  // Export for both browser and Node.js environments
  if (typeof exports !== 'undefined') {
    exports = videoProcessor;
  } else if (typeof window !== 'undefined') {
    window.videoProcessor = videoProcessor;
  } else if (typeof global !== 'undefined') {
    global.videoProcessor = videoProcessor;
  }

  return videoProcessor;
})();