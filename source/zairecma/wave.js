ZairECMA.Wave = function(options) {
  this.frequency = options.frequency || 1;
  this.amplitude = options.amplitude || 0;
  this.waveform  = options.waveform  || 'sine';
};

ZairECMA.Wave.prototype.valueAt = function(time) {
  var wave = ZairECMA.Wave[this.waveform],
      pi   = Math.PI,
      f    = this.frequency,
      x    = f * time,
      y    = x - Math.floor(x);
  
  return wave(y);
};

ZairECMA.Wave.sine = function(x) {
  return Math.sin(2*Math.PI * x);
};

ZairECMA.Wave.square = function(x) {
  return x < 0.5 ? 1 : -1;
};

ZairECMA.Wave.sawtooth = function(x) {
  return -1 + x*2;
};

ZairECMA.Wave.triangle = function(x) {
  var y = -1 + 4*x;
  if (y > 1) y = 1 - (y - 1);
  return y;
};
