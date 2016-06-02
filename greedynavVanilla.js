/*
GreedyNav.js Vanilla
Licensed under the MIT license - http://opensource.org/licenses/MIT
Copyright (c) 2016 Luke Jackson, Ulf Maier
*/

window.addEventListener('load', function() {

  var $btn = document.querySelector('nav.greedy button');
  var $vlinks = document.querySelector('nav.greedy .links');
  var $hlinks = document.querySelector('nav.greedy .hidden-links');

  var numOfItems = 0;
  var totalSpace = 0;
  var breakWidths = [];

  // Get initial state
  var childrenVlinks = $vlinks.children;
  for (var i = 0; i < childrenVlinks.length; i++) {
    totalSpace += getWidth(childrenVlinks[i]);
    numOfItems += 1;
    breakWidths.push(totalSpace);
  }

  var availableSpace, numOfVisibleItems, requiredSpace;

  function check() {

    // Get instant state
    availableSpace = getWidth($vlinks) - 10;
    numOfVisibleItems = $vlinks.children.length;
    requiredSpace = breakWidths[numOfVisibleItems - 1];

    // There is not enought space
    if (requiredSpace > availableSpace) {
      $hlinks.insertBefore(
        $vlinks.children[$vlinks.children.length-1],
        $hlinks.firstChild
      );
      numOfVisibleItems -= 1;
      check();
      // There is more than enough space
    } else if (availableSpace > breakWidths[numOfVisibleItems]) {
      $vlinks.appendChild($hlinks.children[0]);
      numOfVisibleItems += 1;
      check();
    }
    // Update the button accordingly
    $btn.setAttribute("count", numOfItems - numOfVisibleItems);
    if (numOfVisibleItems === numOfItems) {
      $btn.classList.add('hidden');
    } else $btn.classList.remove('hidden');
  }
  
  function getWidth($el) {

    var rect = $el.getBoundingClientRect();
    return Math.round(rect.right - rect.left);
  }

  // Window listeners
  window.onresize = check;

  $btn.onclick = function() {
    $hlinks.classList.toggle('hidden');
  };

  check();

});
