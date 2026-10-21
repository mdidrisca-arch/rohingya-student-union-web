/* =====================================================================
   REPORT PAGE DETAILS  -  titles, web addresses and link-preview text for each report
   ---------------------------------------------------------------------
   Every report has its own page at  https://rostudentunion.org/advocacy/reports/<slug>/
   (the existing  /advocacy/#report-N  links keep working exactly as before).
   The number on the left is the report's number in assets/site.js (progData). Numbers never change.
   These details are used to build each report page's title, description and the picture,
   title and text that Facebook, WhatsApp, LinkedIn and X show when the page is shared.

   FIELDS
     slug        The last part of the page address: lowercase words joined by hyphens. Never change it
                 after the page has been shared.
     title       Page and link-preview title. Must be unique.
     summary     One or two sentences (70 to 160 characters). Shown as the page description and in link
                 previews. Plain text only.
     imageAlt    Describes the photo for screen readers and link previews.
     image       Optional. Picture used in link previews. If left out, the report's own picture (img in
                 assets/site.js) is used. Use this to supply a larger copy of the same photo, or a
                 self-hosted picture (see below).
     imageWidth, imageHeight   Optional. The picture's size in pixels, if known.

   NEW REPORTS (use self-hosted pictures, kept in this repository)
     1. Link-preview picture: a JPEG exactly 1200 x 630 pixels, under 300 KB, saved as
        /assets/og/report-N.jpg   then set   image: "/assets/og/report-N.jpg", imageWidth: 1200, imageHeight: 630
     2. Report picture: a JPEG about 1600 x 900 pixels, under 300 KB, saved as
        /assets/img/reports/report-N.jpg   and used as the report's img in assets/site.js.
     3. Remove location data and camera details from the photos before saving them.
     After editing this file, the report pages must be regenerated (ask your developer or assistant).
   ===================================================================== */

var reportExtras = {

  0: {
    slug: "train-the-teacher-workshop-educational-literacy",
    title: "Train-the-Teacher Workshop on Educational Literacy",
    summary: "RSU's first Train-the-Teacher workshop on educational literacy: modern teaching methods, inclusive classrooms and stronger safeguarding for girls.",
    imageAlt: "Train-the-Teacher Workshop"
  },

  1: {
    slug: "introduction-to-human-rights",
    title: "Introduction to Human Rights",
    summary: "Session 8 of RSU's Skills for Advocacy training: lawyer Nezam Uddin introduced human rights, the UDHR, the 1951 Refugee Convention, CEDAW and the CRC.",
    imageAlt: "Human Rights Training"
  },

  2: {
    slug: "photojournalism-training",
    title: "Photojournalism Training",
    summary: "Session 6 of 12 in RSU's Skills for Advocacy series: award-winning photographer Abdullah taught photojournalism, photography techniques and photo captions.",
    imageAlt: "Photojournalism Training"
  },

  3: {
    slug: "research-methodology",
    title: "Research Methodology",
    summary: "Session 4 of 12 in RSU's Skills for Advocacy series: research design, literature review, data collection and analysis, led by M. Furquan Mirza.",
    imageAlt: "Research Methodology Training",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4MUU7xDmz24-FEzg97ZOgMHEynTaRkQyXy4BCTWSUe6H452iFkn5YCXQdyxhMl1C2vkSg71bMRWZNePDSh30yWtWhMJ-ZXjkC1Qu6MhxnTOSjR5ZY2aHZK_DrQnS46iQCu6YDyhSVkRM9vFGUw-sUUbfn_hp518Jy5oMUvU65e2aNy-bbPIL7xL8Q5cM/s2048/482033142_950616090587798_5192982234632189680_n.jpg"
  },

  4: {
    slug: "disaster-risk-management-training-batch-3",
    title: "Disaster Risk Management Training — Batch 3",
    summary: "RSU completed the third batch of its two-day Disaster Risk Management training, 24–25 November 2023, for residents of the Rohingya refugee camps.",
    imageAlt: "Disaster Risk Management Training Batch 3"
  },

  5: {
    slug: "disaster-risk-management-training-batch-4",
    title: "Disaster Risk Management Training — Batch 4",
    summary: "RSU's fourth two-day Disaster Risk Management training batch, 1–2 December 2023, combined classroom lessons, scenario exercises and practical drills.",
    imageAlt: "Disaster Risk Management Training Batch 4"
  },

  6: {
    slug: "drm-training-rohingya-women-and-girls",
    title: "DRM Training for Rohingya Women and Girls",
    summary: "A two-day Disaster Risk Management training for Rohingya women and girls, building the skills and confidence to lead during emergencies.",
    imageAlt: "DRM Training for Rohingya Women and Girls"
  },

  7: {
    slug: "disaster-risk-management-training-batch-5",
    title: "Disaster Risk Management Training — Batch 5",
    summary: "RSU concluded the fifth batch of its two-day Disaster Risk Management training, 9–10 December 2023, with lectures, practical exercises and emergency drills.",
    imageAlt: "Disaster Risk Management Training Batch 5"
  },

  8: {
    slug: "final-term-teacher-development-workshop",
    title: "Final-Term Teacher Development Workshop",
    summary: "Teachers in the Literacy for Rohingya Girls program reviewed student progress, identified learning gaps and planned stronger teaching strategies.",
    imageAlt: "Final-Term Teacher Development Workshop"
  },

  9: {
    slug: "bridging-the-gap-in-education-for-every-child",
    title: "Bridging the Gap in Education for Every Child",
    summary: "RSU's six-month education program in Cox's Bazar supported 90 Rohingya children in six learning centers, with 68% girls' enrollment and 99% average attendance.",
    imageAlt: "A Classroom inside a shelter."
  },

};
