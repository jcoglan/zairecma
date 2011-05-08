ZairECMA.Clock = {
  SAMPLE_RATE:    44100,
  TICK_INTERVAL:  10,
  
  tones: [],
  
  start: function() {
    var self     = this,
        interval = this.TICK_INTERVAL,
        time     = new Date().getTime();
    
    setInterval(function() {
      var tones = self.tones,
          i     = tones.length;
      
      time += interval;
      while (i--) tones[i].outputTimeSlice(time / 1000, interval / 1000);
        
    }, interval);
  },
  
  bind: function(tone) {
    this.tones.push(tone);
  }
};

ZairECMA.Clock.start();
