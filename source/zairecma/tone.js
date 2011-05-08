ZairECMA.Tone = function(options) {
  this._audio   = new DynamicAudio({swf: ZairECMA.swf});
  this._options = options;
  
  this.setAmplitude(options.amplitude);
  this.setWaveform(options.waveform);
  this.setNote(options.note, options.octave);
};

ZairECMA.Tone.prototype.outputTimeSlice = function(time, interval) {
  var rate    = ZairECMA.Clock.SAMPLE_RATE,
      samples = Math.ceil(interval * rate),
      dt      = 1 / rate,
      data    = [];
  
  for (var i = 0; i < samples; i++) {
    var value = this.valueAt(time + i * dt);
    data.push(value); // L
    data.push(value); // R
  }
  this._audio.write(data);
};

ZairECMA.Tone.prototype.setAmplitude = function(amplitude) {
  this._amplitude = amplitude;
};


ZairECMA.Tone.prototype.setNote = function(note, octave) {
  this._frequency = ZairECMA.noteFrequency(note, octave);
};

ZairECMA.Tone.prototype.setWaveform = function(type) {
  this._waveform = type || 'sine';
};

ZairECMA.Tone.prototype.valueAt = function(time) {
  var wave = ZairECMA.Wave[this._waveform],
      pi   = Math.PI,
      f    = this._frequency,
      x    = f * time,
      y    = x - Math.floor(x);
  
  return this._amplitude * wave(y);
};
