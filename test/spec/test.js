'use strict';
/* jshint undef: false */
(function() {
  describe('iptTooltip', function() {

    var tooltip = null;

    describe('init', function() {
      
      beforeEach(function() {
        tooltip = $('.js_tooltip').iptTooltip();
      });
      
      it('expected to construct object', function() {
        return expect(tooltip).to.exist;
      });

    });
  });
})();
