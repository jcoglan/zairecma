ZairECMA.Controller = function(tone) {
  this._tone = tone;
};

ZairECMA.Controller.prototype.getHTML = function() {
  if (this._rootHTML) return this._rootHTML;
  
  var note = this._tone._note + '<sup>' + this._tone._octave + '</sup>',
      form = this._tone._wave.waveform,
      s    = 'selected="selected"';

  this._rootHTML = jQuery(
      '<div class="tone">' +
        '<h4>' + note + '</h4>' +
        '<div class="waveform">' +
          '<select>' +
            '<option value="sine" ' + (form === 'sine' ? s : '') + '>Sine</option>' +
            '<option value="triangle" ' + (form === 'triangle' ? s : '') + '>Triangle</option>' +
            '<option value="sawtooth" ' + (form === 'sawtooth' ? s : '') + '>Sawtooth</option>' +
            '<option value="square" ' + (form === 'square' ? s : '') + '>Square</option>' +
          '</select>' +
        '</div>' +
        '<div class="volume">' +
          '<h5>Volume</h5>' +
          '<div class="slider"></div>' +
        '</div>' +
        '<div class="am">' +
          '<h5>A.M.</h5>' +
          '<div class="slider frequency"></div>' +
          '<div class="slider amplitude"></div>' +
        '</div>' +
        '<div class="fm">' +
          '<h5>F.M.</h5>' +
          '<div class="slider frequency"></div>' +
          '<div class="slider amplitude"></div>' +
        '</div>' +
        '<div class="footer"></div>' +
      '</div>');
  
  this._noteDisplay = this._rootHTML.find('h4');
  this._setupWaveform();
  this._setupVolume();
  this._setupAmplitudeModeration();
  this._setupFrequencyModeration();
  
  return this._rootHTML;
};

ZairECMA.Controller.prototype._setupWaveform = function() {
  this._waveformSelect = this._rootHTML.find('.waveform select');
  var tone = this._tone;
  this._waveformSelect.change(function() {
    tone.setWaveform(this.value);
  });
};

ZairECMA.Controller.prototype._setupVolume = function() {
  var tone   = this._tone,
      volume = tone._wave.amplitude,
      slider = this._rootHTML.find('.volume .slider');
  
  this._slider(slider, volume * 100, function(value) {
		tone.setAmplitude(value / 100);
	});
};

ZairECMA.Controller.prototype._setupAmplitudeModeration = function() {
  var frequency = this._rootHTML.find('.am .frequency'),
      amplitude = this._rootHTML.find('.am .amplitude'),
      tone      = this._tone;
  
  this._slider(frequency, tone._am.frequency * 10, function(value) {
    tone.setAMFrequency(value / 10);
  });
  this._slider(amplitude, tone._am.amplitude * 100, function(value) {
    tone.setAMAmplitude(value / 100);
  });
};

ZairECMA.Controller.prototype._setupFrequencyModeration = function() {
  var frequency = this._rootHTML.find('.fm .frequency'),
      amplitude = this._rootHTML.find('.fm .amplitude'),
      tone      = this._tone;
  
  this._slider(frequency, tone._fm.frequency * 10, function(value) {
    tone.setFMFrequency(value / 10);
  });
  this._slider(amplitude, tone._fm.amplitude * 1000000000, function(value) {
    tone.setFMAmplitude(value / 1000000000);
  });
};

ZairECMA.Controller.prototype._slider = function(element, value, callback) {
  element.slider({
    orientation: 'vertical',
    range: 'min',
		min: 0,
		max: 100,
		value: value,
		slide: function(event, ui) { callback(ui.value) }
  });
};
