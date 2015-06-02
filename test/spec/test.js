'use strict';
/* jshint undef: false */
(function() {
  describe('iptTooltip', function() {

    var config = {
      margin: 10,
      maxWidth: 200
    };

    var tooltip = null;

    describe('init', function() {

      beforeEach(function() {
        tooltip = $('.js_tooltip').iptTooltip(config);
      });

      it('expected to construct object', function() {
        return expect(tooltip).to.be.an.object;
      });

      it('expected to set margin to ' + config.margin, function() {
        return expect(tooltip.data('plugin_iptTooltip').settings.margin).to.equal(config.margin);
      });

      it('expected to set maxWidth to ' + config.maxWidth, function() {
        return expect(tooltip.data('plugin_iptTooltip').settings.maxWidth).to.equal(config.maxWidth);
      });

    });
  });
})();
