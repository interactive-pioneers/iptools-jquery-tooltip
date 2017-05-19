# iptools-jquery-tooltip [![Build Status](http://img.shields.io/travis/interactive-pioneers/iptools-jquery-tooltip.svg)](https://travis-ci.org/interactive-pioneers/iptools-jquery-tooltip)

Simple jQuery Tooltip Plugin

## Features

Simple tooltip plugin, fully customizable with CSS, animation using CSS3 transitions.

## Requirements

- jQuery >=1.11.3 <4.0.0

## Example

```html
<head>
  <link rel="stylesheet" href="dist/iptools-jquery-tooltip.css" type="text/css">
</head>
<body>
<a class="has-tooltip" data-tooltip-text="Text to display inside Tooltip" data-tooltip-headline="A headline">Open Tooltip</a>

<script src="src/iptools-jquery-tooltip.js"></script>
<script type="text/javascript">
   $(document).ready(function() {
      $('.has-tooltip').iptTooltip({
         // options
      });
   });
</script>
</body>
```

## Options

Name                      | Default                      | Type    | Description
:-------------------------|:-----------------------------|:--------|:-----------
bubbleArrow               | `false`                      | boolean | Append an arrow / triangle element to the tooltip
bubbleArrowClass          | `tooltip__bubble-arrow`      | string  | Class of the bubble arrow element
closeButton               | `false`                      | boolean | Add a close button
closeButtonClass          | `tooltip__close`             | string  | Class of the close button
dataAttrTooltipText       | `data-tooltip-text`          | string  | Data attribute which holds the tooltip text
dataAttrTooltipHeadline   | `data-tooltip-headline`      | string  | Data attribute which holds a tooltip headline
defaultHorizontalPosition | `right`                      | string  | right / center / left
defaultVertivalPosition   | `top`                        | string  | top / bottom
delay                     | `150`                        | int     | Delay until tooltip is shown / hidden
fadeDuration              | `250`                        | int     | Fade duration
headlineClass             | `tooltip__headline`          | string  | Class of the tooltip headline
margin                    | `5`                          | int     | Margin of the tooltip
maxWidth                  | `300`                        | int     | Maximum width of the tooltip
openOnClick               | `false`                      | boolean | Open tooltip on click instead of mouseenter
stick                     | `false`                      | boolean | Tooltip does not close on mouseleave
textWrapperClass          | `tooltip__text`              | string  | Class of the tooltip text wrapper
tooltipClass              | `tooltip`                    | string  | Tooltip base class
tooltipClassActiveModifier| `--active`                   | string  | Modifier that is added to the base class when tooltip is active

## Events

- beforeShow.iptTooltip
- afterShow.iptTooltip
- beforeHide.iptTooltip
- afterHide.iptTooltip

## Contributions

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence
Copyright © 2015 Interactive Pioneers GmbH. Licenced under [GPLv3](LICENSE).
