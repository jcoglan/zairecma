ZairECMA.Wave = {
  sine: function(x) {
    return Math.sin(2*Math.PI * x);
  },
  
  square: function(x) {
    return x < 0.5 ? 1 : -1;
  },
  
  sawtooth: function(x) {
    return -1 + x*2;
  },
  
  triangle: function(x) {
    var y = -1 + 4*x;
    if (y > 1) y = 1 - (y - 1);
    return y;
  }
};
