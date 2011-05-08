ZairECMA.Audio = function(dynaudioOptions) {
  this._dynamicAudio = new DynamicAudio(dynaudioOptions);
  this._waveform     = [];
  this._needle       = 0;
  
  ZairECMA.Clock.bind(this);
};

ZairECMA.Audio.prototype.write = function(samples) {
  var wave = this._waveform;
  if (wave.length === 0) return;
  
  var output = [];
  while (output.length < samples * 2) {
    output.push(wave[this._needle]); // L
    output.push(wave[this._needle]); // R
    this._needle = (this._needle + 1) % wave.length;
  }
  this._dynamicAudio.write(output);
};

ZairECMA.Audio.prototype.play = function(note, octave) {
  this._waveform = ZairECMA.Wave.createSamples(note, octave, 'square');
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
