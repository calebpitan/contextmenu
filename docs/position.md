# Position

A proper positioning of the contextmenu in the view window should not be treated with triviality. Setting your contextmenu with the most appropriate positioning system, make it more accessible and boosts user's experience.

# Positioning system

  * Static
  * Relative
  * Absolute
  * Fixed

## Static

The `static` positioning is in its purest form, unmodified, no fine tunning, no recalibrating. This psoitioning is more of WYSIWYG or "what you get is what is real". 

## Relative

The `relative` positioning system considers directional relativity in positioning. Is the positioning from the top or bottom and right or left? What direction is it relative to? With the `relative` positioning method, you have to assign the calculated value of `position`&mdash;with the help of the `ViewPortQuery` passed as second argument to the validate handler&mdash;to the property/direction that exceeds the viewport.  
**Example**
```js
if (viewportQuery.right) { // contextmenu exceeds viewport from the right
  target.style.right = position.x + 'px';
} else if (viewportQuery.bottom) { // contextmenu exceeds viewport from the bottom
  target.style.bottom = position.x + 'px';
}
```

## Absolute

The `absolute` positioning system is independent of direction. It is absolutely _toply_ and _leftly_ positioned. A unique feature of the `absolute` quite similar to the relative is; contextmenu shouldn't exceed viewport. The excessive dimension that exceeds viewport is calculated and subtracted from the original positional values&mdash;**recalibration**

## Fixed

The `fixed` position only does the good of centrally positioning the contextmenu. It keeps it at the middle of the viewport.
