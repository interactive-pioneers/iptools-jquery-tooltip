'use strict';

/* global describe, expect, it, beforeEach, afterEach */

(function() {

  describe('iptTooltip', function() {

    var config = {
      delay: 0,
      margin: 10,
      maxWidth: 200
    };
    var pluginName = 'plugin_iptTooltip';
    var $tooltip = null;
    var selector = '.js_tooltip';

    describe('open', function() {

      beforeEach(function() {
        $tooltip = $(selector).iptTooltip(config);
      });

      afterEach(function() {
        $tooltip.data(pluginName).destroy();
      });

      it('expected to have class tooltip--active', function(done) {
        setTimeout(function() {
          done();
          return expect($tooltip.hasClass('tooltip--active')).to.be.ok;
        }, config.delay + 5);
        $tooltip.trigger('mouseenter');
      });

      it('expected to have class tooltip--top-left', function(done) {
        setTimeout(function() {
          done();
          return expect($tooltip.hasClass('tooltip--top-left')).to.be.ok;
        }, config.delay + 5);
        $tooltip.css({
          position: 'absolute',
          bottom: 0,
          right: 0
        }).trigger('mouseenter');
      });

    });

  });
})();
