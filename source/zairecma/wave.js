ZairECMA.Wave = {
  sine: function(x) {
    return Math.sin(2*Math.PI * x);
  },
  
  square: function(x) {
    return x < 0.5 ? 1 : -1;
  },
  
  sawtooth: function(x) {
    return -1 + x*2;
  },
  
  triangle: function(x) {
    var y = -1 + 4*x;
    if (y > 1) y = 1 - (y - 1);
    return y;
  },
  
  createSamples: function(note, octave, type) {
    if (note === null)
      return [];
    
    var frequency  = ZairECMA.noteFrequency(note, octave),
        samples    = Math.round(ZairECMA.Clock.SAMPLE_RATE / frequency),
        sampledata = [],
        type       = type || 'sine';
    
    for (var i = 0; i < samples; i++)
      sampledata[i] = ZairECMA.Wave[type](i/samples);
    
    return sampledata;
  }
};
