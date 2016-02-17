'use strict';
/* jshint undef: false */
(function() {
  describe('iptTooltip', function() {

    var config = {
      margin: 10,
      maxWidth: 200
    };

    var pluginName = 'plugin_iptTooltip';

    var tooltip = null;

    var object = null;

    describe('init', function() {

      beforeEach(function() {
        object = $('.js_tooltip').iptTooltip(config);
      });

      afterEach(function() {
        // object.data(pluginName).destroy();
      });

      it('expected to construct object', function() {
        return expect(object).to.be.an.object;
      });

      it('expected to set margin to ' + config.margin, function() {
        return expect(object.data(pluginName).settings.margin).to.equal(config.margin);
      });

      it('expected to set maxWidth to ' + config.maxWidth, function() {
        return expect(object.data(pluginName).settings.maxWidth).to.equal(config.maxWidth);
      });

    });

    describe('open', function() {

      beforeEach(function() {
        object = $('.js_tooltip').iptTooltip(config);
      });

      afterEach(function() {
        // object.data(pluginName).destroy();
        tooltip = null;
      });

      it('expected to have class tooltip--active', function() {
        object.trigger('mouseenter');
        tooltip = object.data(pluginName).$tooltip;
        return expect(tooltip.hasClass('tooltip--active')).to.be.ok;
      });

      it('expected to have class tooltip--top-left', function() {
        object.css({
          position: 'absolute',
          bottom: 0,
          right: 0
        }).trigger('mouseenter');
        tooltip = object.data(pluginName).$tooltip;
        return expect(tooltip.hasClass('tooltip--top-left')).to.be.ok;
      });

    });

    describe('close', function() {

      beforeEach(function() {
        object = $('.js_tooltip').iptTooltip(config);
      });

      afterEach(function() {
        // object.data(pluginName).destroy();
        tooltip = null;
      });

      it('expected to not have class tooltip--active', function() {
        object
          .trigger('mouseenter')
          .trigger('mouseleave');
        tooltip = object.data(pluginName).$tooltip;
        return expect(tooltip.hasClass('tooltip--active')).to.be.not.ok;
      });

    });

  });
})();
