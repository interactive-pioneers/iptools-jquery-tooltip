'use strict';

/* jshint undef: false, expr: true */
/* global expect */

(function() {

  describe('iptTooltip', function() {

    var config = {
      margin: 10,
      maxWidth: 200
    };
    var pluginName = 'plugin_iptTooltip';
    var object = null;
    var selector = '.js_tooltip';

    describe('destroy', function() {

      beforeEach(function() {
        object = $(selector).iptTooltip(config);
      });

      afterEach(function() {
        $(selector).off();
      });

      it('expected to remove data', function() {
        object.data(pluginName).destroy();
        var plugin = object.data(pluginName);
        return expect(plugin).to.be.undefined;
      });

    });

  });

})();
