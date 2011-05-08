ZairECMA = {};

ZairECMA.noteFrequency = function(note, octave) {
  if (octave === undefined) octave = 4;
  
  var middleA   = ZairECMA.MIDDLE_A,
      semitones = ZairECMA.NOTES[note],
      frequency = middleA * Math.pow(2, semitones/12),
      shift     = octave - 4;
  
  return frequency * Math.pow(2, shift);
};

ZairECMA.MIDDLE_A = 440;

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
