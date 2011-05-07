ZairECMA = function(dynaudioOptions) {
  this._dynamicAudio = new DynamicAudio(dynaudioOptions);
  this._start();
};

ZairECMA.prototype.play = function(note, octave) {
  var frequency  = Math.round(ZairECMA.noteFrequency(note, octave)),
      samples    = ZairECMA.SAMPLE_RATE / frequency,
      sampledata = Array(Math.floor(samples));
  
  for (var i=0; i < sampledata.length; i++)
    sampledata[i] = Math.sin(2*Math.PI * (i / sampledata.length));
  
  this._frequency = frequency;
  this._waveform  = sampledata;
};

ZairECMA.prototype.playTune = function(story) {
  var self   = this,
      offset = 0;
  
  for (var i = 0, n = story.length; i < n; i++)
    (function(step) {
      setTimeout(function() { self.play(step[1], step[2]) }, offset + step[0]);
      offset += step[0];
    })(story[i]);
};

ZairECMA.prototype._start = function() {
  var self = this;

  this._playerInterval = setInterval(function() {
    var freq  = self._frequency,
        wave  = self._waveform,
        audio = self._dynamicAudio,
        n     = Math.ceil(freq / 100) * 2;
    
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
