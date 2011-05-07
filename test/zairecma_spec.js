JS.ENV.ZairecmaSpec = JS.Test.describe("ZairECMA", function() { with(this) {
  describe("noteFrequency", function() { with(this) {
    it("returns the frequency of middle A", function() { with(this) {
      assertEqual( 440, ZairECMA.noteFrequency("A") )
    }})
    
    it("returns the frequency of middle C", function() { with(this) {
      assertEqual( 523.2511306011972, ZairECMA.noteFrequency("C") )
    }})
    
    it("returns the frequency of C-5", function() { with(this) {
      assertEqual( 1046.5022612023945, ZairECMA.noteFrequency("C", 5) )
    }})
  }})
}})
