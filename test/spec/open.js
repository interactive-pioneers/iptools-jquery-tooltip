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

    var $trigger = null;
    var $tooltip = null;
    var tooltip = null;
    var selector = '.js_tooltip';

    describe('open', function() {

      beforeEach(function() {
        $trigger = $(selector).iptTooltip(config);
        tooltip = $('#js_tooltip');
      });

      afterEach(function() {
        $trigger.data(pluginName).destroy();
      });

      it('expected to have class tooltip--active', function(done) {
        $trigger.trigger('mouseenter');
        $tooltip = $trigger.data(pluginName).$tooltip;
        setTimeout(function() {
          done();
          return expect($tooltip.hasClass('tooltip--active')).to.be.ok;
        }, config.delay + 5);
      });

      it('expected to have class tooltip--top-left', function(done) {
        $trigger.css({
          position: 'absolute',
          bottom: 0,
          right: 0
        }).trigger('mouseenter');
        $tooltip = $trigger.data(pluginName).$tooltip;
        setTimeout(function() {
          done();
          return expect($tooltip.hasClass('tooltip--top-left')).to.be.ok;
        }, config.delay + 5);
      });

    });

  });
})();
