ZairECMA.Audio = function(dynaudioOptions) {
  this._dynamicAudio = new DynamicAudio(dynaudioOptions);
  this._waveform = [];
  this._start();
};

ZairECMA.Audio.prototype.write = function(stream) {
  this._dynamicAudio.write(stream);
};

ZairECMA.Audio.prototype.play = function(note, octave) {
  if (note === null)
    return this._waveform  = [];
  
  var frequency  = ZairECMA.noteFrequency(note, octave),
      samples    = Math.round(ZairECMA.SAMPLE_RATE / frequency),
      sampledata = [];
  
  for (var i=0; i < samples; i++)
    sampledata[2*i] =
    sampledata[2*i+1] = ZairECMA.Wave.square(i/samples);
  
  this._waveform  = sampledata;
};

ZairECMA.Audio.prototype.playTune = function(story, options) {
  var self    = this,
      offset  = 0,
      options = options || {};
  
  for (var i = 0, n = story.length; i < n; i++)
    (function(step) {
      setTimeout(function() { self.play(step[1], step[2]) }, offset);
      offset += step[0];
    })(story[i]);
  
  if (options.loop)
    setTimeout(function() { self.playTune(story, options) }, offset);
};

ZairECMA.Audio.prototype._start = function() {
  var self = this;

  this._playerInterval = setInterval(function() {
    var wave  = self._waveform,
        audio = self._dynamicAudio,
        n     = Math.ceil((ZairECMA.SAMPLE_RATE / 100) / (wave.length/2 + 1));
    
    for (var i = 0; i < n; i++) audio.write(wave);
  }, 10);
};
