/* =====================================================================
   ADVOCACY UPDATES  -  the one file you edit to add a new update
   ---------------------------------------------------------------------
   Everything you add to the list below appears at the START of the
   "Our Advocacy" section on /advocacy/, in front of the existing report
   cards, using the same card design. Nothing else needs to be edited.
   (The "Our Recents" section is not affected.)

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
     description  The text on the card. To start a new paragraph, type \n\n (a backslash,
                  the letter n, twice) between the paragraphs. Keep it all on one line.
     image        Full https:// link to a picture, OR a path on this site that
                  starts with a slash, e.g. "/assets/advocacy/photo.jpg".
                  Leave out for a card with no picture.
     imageAlt     Describes the picture for screen readers. Defaults to the title.
     link         Where the card goes when clicked. Leave out for a card that is
                  not clickable. https:// links open in a new tab.
     linkLabel    Text of the link at the bottom of the card. Defaults to "Read Full Report"
                  (the same wording as the other cards).

   RULES FOR TEXT
     - Wrap every value in straight double quotes: "like this".
     - Write plain text. Do NOT type HTML codes such as &amp; or &#39;.
       Apostrophes are fine inside double quotes. If you need a double quote
       inside a value, type it as \"  (backslash first).
     - Never press Enter inside a value; keep each value on one line (use \n\n for paragraphs).

   If something is mistyped, the page still works: the update is skipped and
   the existing cards still show. Press F12 > Console to see what was wrong.
   ===================================================================== */


/* SETTING - Blogger feed on the "Our Advocacy" grid (unchanged behaviour when true).
   true  = any post published on the old Blogger blog (rostudentunion.blogspot.com)
           is added as an extra card at the very start of the "Our Advocacy" grid
           (above the updates listed below).
   false = turn that off, so the grid shows only the cards written in the site's own files.
   Changing this does not affect the updates listed below. */
var ADVOCACY_USE_BLOGGER_FEED = true;


var advocacyUpdates = [

  /* ↓↓↓  ADD NEW UPDATES HERE (newest first)  ↓↓↓ */

  {
    title: "Final-Term Teacher Development Workshop",
    tag: "Education Project",
    description: "Every step toward a brighter future begins with dedicated teachers and a commitment to helping every child learn. The Final-Term Teacher Development Workshop for the Literacy for Rohingya Girls program brought educators together to reflect on their teaching journeys, celebrate progress, and prepare to make learning even more effective for Rohingya girls.\n\nDuring the workshop, teachers reviewed students’ mid-term progress, identified learning gaps, shared classroom experiences, and developed practical strategies to strengthen reading, writing, speaking, listening, and mathematics instruction. Together, they renewed their commitment to ensuring every child receives quality education and achieves the program’s learning goals.\n\nA heartfelt thank you to all participating teachers for their dedication, passion, and tireless efforts in shaping a brighter future for Rohingya children through education.\n\nTogether, we continue building brighter futures—one classroom at a time.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAGLZGFVByccpExAcJcnDReU_P9YqsWuLHGHEG5P5jcp9u-r3LU4FW6S-geYFVIFQ8iCuZl59tn8teuFPcSaWOl7RtY1GpwxTjBAnhDjfRYfCBFy4UqjIX83TvfYoY35-6BtPJ0ZTYt96pvFlctY1I-qxFHEUHtaTNF8-v5ddBhz9G9BR9vRdafGEr-jI/s2048/758964303_1342166541432749_7409638839888242136_n.jpg",
 
  },

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
