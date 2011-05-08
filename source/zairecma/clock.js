ZairECMA.Clock = {
  SAMPLE_RATE:    44100,
  TICK_INTERVAL:  10,
  
  samples: [],
  
  start: function() {
    var self = this;
    
    setInterval(function() {
      var samples = self.samples,
          i = samples.length;
      
      while (i--)
        samples[i].write(self.SAMPLE_RATE * self.TICK_INTERVAL/1000);
        
    }, this.TICK_INTERVAL);
  },
  
  bind: function(sample) {
    this.samples.push(sample);
  }
};

ZairECMA.Clock.start();
