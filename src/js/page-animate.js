/* 
Helper code for Animate CSS library:
 * Add animation effects to elements via DOM data attributes
 * Add a delay to the animation for chaining animations
 * Animations will be triggered once they are scrolled into view by the user. 
 
HOW TO USE:
* First, add the css class 'animated' to the element you would like to apply an animation to
* Next, specify the animation effect you would like to add with the data attribute 'data-animate-effect'
    Ex: data-animate-effect="fadeIn"
* For animations that happen in sequence, add an offset time with 'data-animate-timing'
    Ex: data-animate-timing="200" (200ms delay)
    The data-animate-timing attribute must be set, if you do not wish to add a delay, set this value to 0

Note:
    * Animation effects are stored in /_/css/animations.css. Add new effects to this file
    * A full list of effects can be found at https://daneden.github.io/animate.css/
*/




//When the document loads, check the windows width to determine
//whether or not to show or hide the animated elements
$(document).ready(function(){
    animateElementsInView();
});

$(window).scroll( function () {
    animateElementsInView();
});


//returns true if an element is currently visible within the users viewport
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
  
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height() / 3;
  
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


//Check to see elements with .animated are in view, if so, add their respective
//animation class to their HTML element
function animateElementsInView() {
    $('.animated').each(function () {
      if (isScrolledIntoView(this) === true) {
  
        var animationTimeout;
        var currentElement = $(this);
        var currentElementEffect = currentElement.attr("data-animate-effect");
        var currentElementTiming = currentElement.attr("data-animate-timing")
  
        animationTimeout = setTimeout(function() {
  
          currentElement.addClass(currentElementEffect);
  
        }, currentElementTiming );
  
      }
      });
  }