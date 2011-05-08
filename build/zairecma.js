ZairECMA = function(dynaudioOptions) {
  this._dynamicAudio = new DynamicAudio(dynaudioOptions);
  this._waveform = [];
  this._start();
};

ZairECMA.prototype.write = function(stream) {
  this._dynamicAudio.write(stream);
};

ZairECMA.prototype.play = function(note, octave) {
  if (note === null)
    return this._waveform  = [];
  
  var frequency  = ZairECMA.noteFrequency(note, octave),
      samples    = Math.round(ZairECMA.SAMPLE_RATE / frequency),
      sampledata = [];
  
  for (var i=0; i < samples; i++)
    sampledata[2*i] =
    sampledata[2*i+1] = Math.sin(2*Math.PI * (i / samples));
  
  this._waveform  = sampledata;
};

ZairECMA.prototype.playTune = function(story, options) {
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

ZairECMA.prototype._start = function() {
  var self = this;

  this._playerInterval = setInterval(function() {
    var wave  = self._waveform,
        audio = self._dynamicAudio,
        n     = Math.ceil((ZairECMA.SAMPLE_RATE / 100) / (wave.length/2 + 1));
    
    for (var i = 0; i < n; i++) audio.write(wave);
  }, 10);
};

ZairECMA.noteFrequency = function(note, octave) {
  if (octave === undefined) octave = 4;
  
  var middleA   = ZairECMA.MIDDLE_A,
      semitones = ZairECMA.NOTES[note],
      frequency = middleA * Math.pow(2, semitones/12),
      shift     = octave - 4;
  
  return frequency * Math.pow(2, shift);
};

ZairECMA.MIDDLE_A    = 440;
ZairECMA.SAMPLE_RATE = 44100;

ZairECMA.NOTES = {
  'A' : 0,
  'A#': 1, 'Bb': 1,
  'B' : 2,
  'C' : 3,
  'C#': 4,  'Db': 4,
  'D' : 5,
  'D#': 6,  'Eb': 6,
  'E' : 7,
  'F' : 8,
  'F#': 9,  'Gb': 9,
  'G' : 10,
  'G#': 11,  'Ab': 11,
};
