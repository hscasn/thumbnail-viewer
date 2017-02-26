/**
 * Thumbnail Viewer
 *
 * @author: Henrique Salvadori Coelho
 *          henriquesc@gmail.com
 *          hcoelho.com
 *
 * The generated DOM elements have the following structure:
 * <div class="thumbnail-viewer-overall">
 *   <figure class="thumbnail-viewer-container">
 *     <img src="" alt="" class="thumbnail-viewer-image" />
 *     <a href="#" alt="Close image" class="thumbnail-viewer-close" />
 *   </figure>
 * </div>
*/
document.addEventListener("DOMContentLoaded", function() {

  // Display settings
  //---------------------------------------------------------------------------
  // The maximum width/height will be multiplied by the following
  // factors. If you want the image to have a maximum width of 80%
  // of the window size, use 0.8
  var widthFactor = 0.8;
  var heightFactor = 0.8;

  // By default, the images will be rendered in the middle of the screen, but
  // you can add an offset to shift it vertically using this value
  var topOffset = 0.8;

  // Finding elements with the class thumbnail-viewer
  var els = document.getElementsByClassName('thumbnail-viewer');

  // Keeping a list of the elements that are visible
  var activeElements = [];

  if (els === null || els === undefined) { return; }

  for (var i = 0; i < els.length; i++) {
    var e = els[i];

    // Supressing the default events (in case of links, the redirection)
    // and displaying the image
    (function (element) {
      element.addEventListener('click', function (event) {
        event.preventDefault();

        var alt;

        var containedImages = element.getElementsByTagName('img');

        if (containedImages.length > 0) {
          alt = containedImages[0].alt;
        }

        display(element.href, alt);
      });
    })(e);
  }


  /**
   * Displays the thumbnail
   * @param {String} url
   * @param {String} (alt)
   */
  function display(url, alt) {
    var overall = getOverall();
    var figure  = getFigure();
    var image   = getImage(url, alt);
    var close   = getClose();

    // We mount the elements one inside the other, set their
    // display style as hidden (we still have to style them),
    // append the figure in the body, remove other thumbnails
    // that are being displayed (if any), put the new figure
    // in the list of visible elements, style it, and then
    // make it visible
    mount(overall, figure, image, close);
    hide(overall);
    document.body.appendChild(overall);
    clearActiveElements();
    activeElements.push(overall);
    style(overall, figure, image, close);
    show(overall);
  }


  /**
   * Builds the <div> (overall) element
   * @returns {Element}
   */
  function getOverall() {
    const e = document.createElement('div');
    e.className = 'thumbnail-viewer-overall';
    e.addEventListener('click', function (event) {
      if (event.target.className === 'thumbnail-viewer-overall') {
        clearActiveElements();
      }
    });
    return e;
  }


  /**
   * Builds the <figure> element
   * @returns {Element}
   */
  function getFigure() {
    const e = document.createElement('figure');
    e.className = 'thumbnail-viewer-container';
    return e;
  }


  /**
   * Builds the <img> element
   * @param {String} url
   * @param {String} (alt)
   * @returns {Element}
   */
  function getImage(url, alt) {
    const e = document.createElement('img');
    e.className = 'thumbnail-viewer-image';
    e.src = url;
    if (alt !== null && alt !== undefined ) { e.alt = alt; }
    return e;
  }


  /**
   * Builds the <a> element for closing
   * @returns {Element}
   */
  function getClose() {
    const e = document.createElement('a');
    e.className = 'thumbnail-viewer-close';
    e.alt = 'Close image';
    e.href = '#';
    e.innerHTML = 'Close';
    e.addEventListener('click', function (event) {
      event.preventDefault();
      clearActiveElements();
    });
    return e;
  }


  /**
   * Mounts the <img> and <a> element inside <figure> and
   * the figure inside the overall
   * @param {Element} overall
   * @param {Element} figure
   * @param {Element} image
   * @param {Element} close
   */
  function mount(overall, figure, image, close) {
    overall.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(close);
  }


  /**
   * Applies the essential styles to the elements
   * @param {Element} overall
   * @param {Element} figure
   * @param {Element} image
   * @param {Element} close
   */
  function style(overall, figure, image, close) {
    // Getting the current width and height of the browser
    var clientWidth  = window.innerWidth;
    var clientHeight = window.innerHeight;

    var clientImageWidth;
    var clientImageHeight;


    // Styling overall
    //-------------------------------------------------------------------------
    
    if (!isNaN(clientHeight)) {
      overall.style.height = clientHeight + 'px';
    }

    overall.style.position = 'fixed';
    overall.style.margin   = 0;
    overall.style.top      = 0;
    overall.style.left     = 0;
    overall.style.width    = '100%';
   
     // Styling image
    //-------------------------------------------------------------------------
    // Calculating the maximum width and height the image can have
    var maxImageWidth  = '';
    var maxImageHeight = '';

    if (!isNaN(clientWidth)) {
      image.style.maxWidth = (clientWidth * widthFactor) + 'px';
    }
    if (!isNaN(clientHeight)) {
      image.style.maxHeight = (clientHeight * heightFactor) + 'px';
    }

    clientImageWidth  = image.clientWidth;
    clientImageHeight = image.clientHeight;

    // Styling figure
    //-------------------------------------------------------------------------
    var figureTopPosition = ((clientHeight - clientImageHeight) / 2)
                          * topOffset;

    var figureLeftPosition = ((clientWidth - clientImageWidth) / 2);

    if (!isNaN(figureTopPosition)) {
      figure.style.top = figureTopPosition + 'px';
    }

    if (!isNaN(figureLeftPosition)) {
      figure.style.left = figureLeftPosition + 'px';      
    }

    figure.style.position = 'fixed';
    figure.style.margin = 0;

    // Styling close button
    //-------------------------------------------------------------------------
    close.style.position = 'absolute';
    close.style.top = 0;
    close.style.right = 0;
  }


  /**
   * Clears all the elements that are currently being displayed
   */
  function clearActiveElements() {
    for (var i = 0; i < activeElements.length; i++) {
      document.body.removeChild(activeElements[i]);
    }
    activeElements = [];
  }


  /**
   * Hides a element
   * @param {Element} e
   */
  function hide(e) {
    e.style.visibility = 'hidden';
  }


  /**
   * Shows an element
   * @param {Element} e
   */
  function show(e) {
    e.style.visibility = 'visible';
  }
});
