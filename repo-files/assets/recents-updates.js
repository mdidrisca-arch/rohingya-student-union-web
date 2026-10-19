/* =====================================================================
   OUR RECENTS CARDS  -  the one file you edit to add or change a card
   in the "Our Recents" section of the Advocacy page (/advocacy/)
   ---------------------------------------------------------------------
   Every card in that section is listed below, in the order it appears on
   the page (newest first). To add a card: copy one block, paste it directly
   under the line "ADD NEW CARDS HERE", and change the values.
   Nothing else needs to be edited. "Our Advocacy" has its own file,
   assets/advocacy-updates.js, and is not affected by this one.

   EACH CARD (only "title" is required)
     title        Card heading.
     tag          Small green label above the title.
     date         Optional. Free text, shown after the tag, e.g. "12 October 2026".
     description  The text on the card. Start a new paragraph by typing \n\n (a backslash,
                  the letter n, twice). Keep it all on one line.
     image        Full https:// link, or a path on this site that starts with a slash.
     imageAlt     Describes the picture for screen readers. Defaults to the title.
     link         Where the card goes (for example a Facebook post). https:// links open in a
                  new tab. No link = the card is not clickable.
     linkLabel    Optional. Text of the link at the bottom of the card. Default: "View Post".

   RULES FOR TEXT
     - Wrap every value in straight double quotes: "like this". Apostrophes are fine inside them.
       A double quote inside a value is typed \"  (backslash first).
     - Write plain text. Do NOT type HTML codes such as &amp; or &#39;.
     - Never press Enter inside a value. Keep the comma after every closing } .
     - The same link must not be listed twice (the repeat is skipped).

   If something is mistyped the page still works: that card is skipped (press F12 > Console to see
   why). If this whole file fails to load, the saved copy of the cards that is already in the page stays on screen.
   ===================================================================== */

var recentsUpdates = [

  /* ↓↓↓  ADD NEW CARDS HERE (newest first)  ↓↓↓ */

  {
    tag: "Learning Centers Update",
    title: "Education That Transforms Lives",
    description: "At RSU's learning centers in the Rohingya refugee camps, children are gaining knowledge, confidence, and hope through quality education — demonstrating the life-changing power of learning and the importance of ensuring every child has the opportunity to succeed.",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEg3cM-SKzTfTsrEmrSlrwHe_tOEGB1mcFGjTUezVUgnGaS7YPZuMXovl2V9UJ_93oSdNIIOmy5sIfGVATbTscrdeK9Xh86IudS3f22YsqQY_s9kBWvQxRYP-QaTnyijWkSYIQDx2YvBMrrP0cC-udeiuUZLQLBGsd93x451vAHCbVYYmO-tv7-75nDH-5I",
    imageAlt: "Education That Transforms Lives",
    link: "https://www.facebook.com/share/p/1D8hCw6ZPy/"
  },

  {
    tag: "Classroom Spotlight",
    title: "Small Classrooms, Big Dreams",
    description: "Across six classrooms in the Rohingya camps, children who once lacked access to education are now learning with confidence, supported by dedicated teachers, families, and their community — proving education is hope, opportunity, and a pathway to lasting change.",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEhekXgauksLsFufbIyGr_O4oYRJSObTmjAG03sOOJ1xZrRzT0WQB4eGjDLF5CqNRkQPJ8tR24TGxEJ1TSAPkCvkU3AkVpLxN3AqIyvc3EAfvBuuqJtx-n0U3gf1NJtXQ7PeVdVvUYtk8eWb6M9iAcuX3ZJ6NMrborwZYijrSQ-W5B6nfuWHw6asOYQwX5s",
    imageAlt: "Small Classrooms, Big Dreams",
    link: "https://www.facebook.com/share/p/1AJejEPq7i/"
  },

  {
    tag: "Teacher Training",
    title: "Empowering Educators for Inclusive Learning",
    description: "RSU successfully held its first Train-the-Teacher Workshop, equipping educators with modern teaching strategies and inclusive classroom practices while strengthening safeguarding measures for all students, especially girls. Hosted at the TİKA Computer and Robotics Lab.",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEgtYvl0JYETa7a73ZiPcQ81TWkaCUT3d7CfAt-tZPjix58SZIWuTllqiwPOEXjWopBRytElW-uKWvtdUwi7th6WvFOjSz-phfx0h5y0jLeTz6saiurBr0nxK67kg2NZybjLEbuHITDSjNHCR-PoluN6Sulgh_CWlODpBWMb6Ed9aE5GXZscXl0T1yfuqNw",
    imageAlt: "Empowering Educators for Inclusive Learning",
    link: "https://www.facebook.com/share/p/1EvqtvAihK/"
  },

  {
    tag: "Community Engagement",
    title: "Community Voices for Girls' Education",
    description: "RSU is conducting Focus Group Discussions across the camps in Ukhiya to identify the barriers preventing girls from accessing education — engaging parents, students, and community members to develop practical solutions for inclusive learning opportunities.",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEh_l_XwlUNcVyIis-rxgtWSyp2FbIcvEqcZx343WML_RkWKYo8kqNueZ6g4AeN0pesRRrVTaGcDg1Xp33WptjVKLuUPXhxE-IY24OWsBd4P7KOqpK8ljnMtc5C-71gKuWyHU-gEkNmjfRJiHVrtQbxXAlyPDEh52Dt-QxTQFgUH698AbFQ8NklNncE6Z-8",
    imageAlt: "Community Voices for Girls' Education",
    link: "https://www.facebook.com/share/p/1JLV8WPCvJ/"
  },

];
