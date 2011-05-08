ZairECMA.Controller = function(tone) {
  this._tone = tone;
};

ZairECMA.Controller.prototype.getHTML = function() {
  if (this._rootHTML) return this._rootHTML;
  
  var note = this._tone._note + '<sup>' + this._tone._octave + '</sup>',
      form = this._tone._waveform,
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
      '</div>');
  
  this._noteDisplay = this._rootHTML.find('h4');
  this._setupWaveform();
  this._setupVolume();
  
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
      volume = tone._amplitude,
      slider = this._rootHTML.find('.volume .slider');
  
  slider.slider({
    orientation: 'vertical',
    range: 'min',
		min: 0,
		max: 100,
		value: volume * 100,
		slide: function(event, ui) {
		  tone.setAmplitude(ui.value / 100);
		}
  });
};
