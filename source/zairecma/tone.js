ZairECMA.Tone = function(options) {
  this._audio   = new DynamicAudio({swf: ZairECMA.swf});
  this._options = options;
  
  this.setNote(options.note, options.octave);
  
  this._wave = new ZairECMA.Wave({
    frequency:  this._frequency,
    amplitude:  options.amplitude,
    waveform:   options.waveform
  });
  
  this._am = new ZairECMA.Wave(options.am);
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
  this._wave.amplitude = amplitude;
};


ZairECMA.Tone.prototype.setNote = function(note, octave) {
  this._note      = note;
  this._octave    = octave || 4;
  this._frequency = ZairECMA.noteFrequency(this._note, this._octave);
  
  if (this._wave) this._wave.frequency = this._frequency;
};

ZairECMA.Tone.prototype.setWaveform = function(type) {
  this._wave.waveform = type || 'sine';
};

ZairECMA.Tone.prototype.setAMFrequency = function(frequency) {
  this._am.frequency = frequency;
};

ZairECMA.Tone.prototype.setAMAmplitude = function(amplitude) {
  this._am.amplitude = amplitude;
};

ZairECMA.Tone.prototype.valueAt = function(time) {
  return this._am.valueAt(time) * this._wave.valueAt(time);
};
