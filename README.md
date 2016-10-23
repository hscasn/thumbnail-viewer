# Thumbnail viewer

Simple library for displaying images from thumbnails without leaving the page, very lightweight and without dependencies.

No setup required, although you probably want to add some CSS to it. Read the Styling section in this document for details.

## Demo

A demo website is available under /demo. Just download and execute index.html in your browser.

## Installing
### NPM
```
npm install thumbnail-viewer --save
```
In your project:
```
require('thumbnail-viewer');
or
import 'thumbnail-viewer';
```
That's it.
### HTML embedded
Download the thumbnailViewer.min.js and include it in your HTML:
```
<script src="thumbnailViewer.min.js"></script>
```
That's it.

## Using
Your thumbnails should follow this DOM structure:
```
<a href="image url" class="thumbnail-viewer">
  ...your thumbnail goes here...
</a>
```
In other words, include the class "thumbnail viewer" in a link that contains the image url as the HREF attribute.

If you have an <img> tag inside the <a> element, the library will recover its ALT attribute, which will be used for the image displayed.
```
<a href="image url" class="thumbnail-viewer">
  <img src="image url" alt="this attribute will also be used by the library">
</a>
```
When the user clicks on a link, the link action (redirection) will be consumed, and instead, it will be displayed in the same page. This is the structure of the created element:
```
<div class="thumbnail-viewer-overall">
  <figure class="thumbnail-viewer-container">
    <img src="..." alt="..." class="thumbnail-viewer-image" />
    <a href="#" alt="Close image" class="thumbnail-viewer-close" />
  </figure>
 </div>
 ```
You can use the classes indicated above for styling.

## Styling
Use the classes described in the Using section for styling:

*thumbnail-viewer-overall* - Occupies the whole window. If you give it a background, you can use it to dim the screen.
*thumbnail-viewer-figure* - Contains the image and the link to close the popup.
*thumbnail-viewer-image* - Image.
*thumbnail-viewer-close* - Button to close the popup.


This is my suggestion for styling (also used in the demo):
```
.thumbnail-viewer-overall {
    background-color: rgba(0, 0, 0, 0.9);
    font-family: helvetica, arial, verdana;
}
.thumbnail-viewer-close {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 10px;
    color: #ffffff;
    font-size: 12px;
    text-decoration: none;
}
.thumbnail-viewer-close:hover {
    background-color: rgba(0, 0, 0, 0.7);
    text-decoration: underline;
}
```