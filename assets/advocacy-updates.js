/* =====================================================================
   ADVOCACY UPDATES  -  the one file you edit to add a new update
   ---------------------------------------------------------------------
   Everything you add to the list below appears at the TOP of the
   "Our Recents" section on /advocacy/, using the same card design as
   the existing cards. Nothing else needs to be edited.

   HOW TO ADD AN UPDATE
   1. Find the line marked "ADD NEW UPDATES HERE" below.
   2. Copy the commented template under it and paste it directly below
      that line. Delete the two slashes (//) at the start of each pasted line.
   3. Fill in the fields. Newest update first.
   4. Keep the comma after the closing } of every update.

   FIELDS  (only "title" is required)
     title        Card heading.
     tag          Small green label above the title, e.g. "Learning Centers Update".
     date         Free text, shown after the tag, e.g. "12 October 2026".
     description  The short paragraph on the card.
     image        Full https:// link to a picture, OR a path on this site that
                  starts with a slash, e.g. "/assets/advocacy/photo.jpg".
                  Leave out for a card with no picture.
     imageAlt     Describes the picture for screen readers. Defaults to the title.
     link         Where the card goes when clicked. Leave out for a card that is
                  not clickable. https:// links open in a new tab.
     linkLabel    Text of the link at the bottom of the card. Defaults to "View Post".

   RULES FOR TEXT
     - Wrap every value in straight double quotes: "like this".
     - Write plain text. Do NOT type HTML codes such as &amp; or &#39;.
       Apostrophes are fine inside double quotes. If you need a double quote
       inside a value, type it as \"  (backslash first).
     - Never put a line break inside a value; keep each value on one line.

   If something is mistyped, the page still works: the update is skipped and
   the existing cards still show. Press F12 > Console to see what was wrong.
   ===================================================================== */


/* SETTING - Blogger feed on the Advocacy "Our Advocacy" grid.
   true  = keep the current behaviour: any post published on the old Blogger blog
           (rostudentunion.blogspot.com) is added as an extra card at the start
           of the "Our Advocacy" grid.
   false = turn that off, so the page shows only the cards written in the site's own files.
   Changing this does not affect the updates listed below. */
var ADVOCACY_USE_BLOGGER_FEED = true;


var advocacyUpdates = [

  /* ↓↓↓  ADD NEW UPDATES HERE (newest first)  ↓↓↓ */

  // {
  //   title: "Title of the update",
  //   tag: "Short label",
  //   date: "Month Day, Year",
  //   description: "One or two sentences describing the update.",
  //   image: "https://example.org/photo.jpg",
  //   imageAlt: "What the photo shows",
  //   link: "https://example.org/the-full-post",
  //   linkLabel: "View Post"
  // },

];
