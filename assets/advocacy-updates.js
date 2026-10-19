/* =====================================================================
   OUR ADVOCACY CARDS  -  the one file you edit to add or change a card
   in the "Our Advocacy" section of the Advocacy page (/advocacy/)
   ---------------------------------------------------------------------
   Every card in that section is listed below, in the order it appears on
   the page (newest first). To add a card: copy one block, paste it directly
   under the line "ADD NEW CARDS HERE", and change the values.
   Nothing else needs to be edited. "Our Recents" has its own file,
   assets/recents-updates.js, and is not affected by this one.

   TWO KINDS OF CARD
   1. Report card  - opens one of the full reports (the full-screen report page):
        { report: 3, tag: "...", title: "...", description: "...", image: "https://...", imageAlt: "..." },
      "report" is the report's number. Report numbers never change, so do not renumber.
      Give every report card its own tag, title, description and image, as below.
      (A brand-new report's text is added in assets/site.js, at the END of the list
      called progData; then add a card here that uses its number. A card whose report
      number does not exist is removed, with a note in the Console.)
   2. Link card    - opens a web address instead (for example a Facebook post):
        { title: "...", tag: "...", description: "...", image: "https://...", link: "https://..." },

   FIELDS  (a report card needs "report"; a link card needs "title")
     report       Report number (report cards only).
     title        Card heading.
     tag          Small green label above the title.
     date         Optional. Free text, shown after the tag, e.g. "12 October 2026".
     description  The text on the card. Start a new paragraph by typing \n\n (a backslash,
                  the letter n, twice). Keep it all on one line.
     image        Full https:// link, or a path on this site that starts with a slash.
     imageAlt     Describes the picture for screen readers. Defaults to the title.
     link         Link cards only. https:// links open in a new tab. No link = card is not clickable.
     linkLabel    Optional. Text of the link at the bottom of the card. Default: "Read Full Report".

   RULES FOR TEXT
     - Wrap every value in straight double quotes: "like this". Apostrophes are fine inside them.
       A double quote inside a value is typed \"  (backslash first).
     - Write plain text. Do NOT type HTML codes such as &amp; or &#39;.
     - Never press Enter inside a value. Keep the comma after every closing } .
     - The same report number or link must not be listed twice (the repeat is skipped).

   If something is mistyped the page still works: that card is skipped (press F12 > Console to see
   why). If this whole file fails to load, the saved copy of the cards that is already in the page stays on screen.
   ===================================================================== */

var advocacyUpdates = [

  /* ↓↓↓  ADD NEW CARDS HERE (newest first)  ↓↓↓ */

   {
  report: 9,
  tag: "Education Support Program",
  title: "Bridging the Gap in Education for Every Child",
  description: "RSU completed its six-month education program in Cox’s Bazar, supporting 90 Rohingya children across six learning centers, with 68% girls’ enrollment and 99% average attendance—advancing inclusive education and brighter futures.",
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3bOkwOXWJK4D5-j5-iwUEydjsYMEsxYIarUZB2v0T18CkEEBiX5rJxb1GTECHXfZqY4BON8hkgyRYCfvA3ihjYVBo0axqXuHF7bm7xKYrOISHH0R40ntRu6f0crCELrm_Pf4UID99gnjCQPCSR7lfLdubyivVfilh_RVhDrwQU4hLZYaz9HclDf67-xU/s320/2.jpg'",
  imageAlt: "A Classroom inside a shelter."
},

  {
    report: 8,
    tag: "Education Project",
    title: "Final-Term Teacher Development Workshop",
    description: "Teachers came together for the final-term workshop of the Literacy for Rohingya Girls program to review students’ progress, identify learning gaps, and strengthen teaching strategies for more effective learning.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAGLZGFVByccpExAcJcnDReU_P9YqsWuLHGHEG5P5jcp9u-r3LU4FW6S-geYFVIFQ8iCuZl59tn8teuFPcSaWOl7RtY1GpwxTjBAnhDjfRYfCBFy4UqjIX83TvfYoY35-6BtPJ0ZTYt96pvFlctY1I-qxFHEUHtaTNF8-v5ddBhz9G9BR9vRdafGEr-jI/s2048/758964303_1342166541432749_7409638839888242136_n.jpg"
  },

  {
    report: 0,
    tag: "Education · Train-the-Teacher",
    title: "Train-the-Teacher Workshop on Educational Literacy",
    description: "RSU's first Train-the-Teacher Workshop — bridging the education gap while prioritizing girls' access to learning through modern teaching methods and safeguarding.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikN4QQUukk60Ojc_ozNhwPnDIWroVi_W4FEFRhhqgwEUzNo1-VrbbS1wvcUA86lFelmoQho_HquCCxiWkFGssDLXg-XQAaQngB8EdqGwYSPYMN49yyoDB7myRtg23eERtN5NeV1fgQDDuP4RrQZA09NxrcesV0lEqgwy6cavJjW9XejBNSTcE-wEuCVOs/s2048/643414370_1221653586817379_6580813680708586534_n.jpg",
    imageAlt: "Train-the-Teacher Workshop"
  },

  {
    report: 1,
    tag: "Skills for Advocacy · Session 8",
    title: "Introduction to Human Rights",
    description: "The 8th advocacy session covering UDHR, 1951 Refugee Convention, CEDAW, CRC and key international covenants. Trainer: Nezam Uddin (Lawyer).",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj0Yiyk60GG9YsKkeJgqOB7W45cZF4Yf1OJJH-1z5AJtrWU_8r0pEbEYe7uCY926r7yjZrZkLrNEny2mouxeOsHRXqgLR1wbcgJX31hwBnB_IXJ7YJrhx6kJyf6Fs6mTm3fg3ixMoXBBIkXwTADhI-nJbjlWX8CrhDdMWiN1zXlSHQuWxy-gobY2giy2yU/s2048/484043856_950005650648842_1146111830082606848_n.jpg",
    imageAlt: "Human Rights Training"
  },

  {
    report: 2,
    tag: "Skills for Advocacy · Session 6/12",
    title: "Photojournalism Training",
    description: "Award-winning photographer Abdullah (Khin Maung Thein) trained participants in photojournalism fundamentals and visual storytelling for advocacy.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYvFQLRFbTgM6cyVP8SawfOHWAFoEgnGLeGL9lO1OiO373a8gPrv11rSzGS51QSdmNKTEFnhEnxwGEAnF7m8ahik10cRNTdx0nhGGqzYV4SVFtdnadHmhUZ9h-hpKD16kWOybFskx_4SxltWxLiaZb3aeRz1yKFfn5kcU6Zy00QfzwDsKuFIn9VpQMX-4/s2048/480612699_950627720586635_4699305135200217118_n.jpg",
    imageAlt: "Photojournalism Training"
  },

  {
    report: 3,
    tag: "Skills for Advocacy · Session 4/12",
    title: "Research Methodology",
    description: "Comprehensive training on research design, data collection, literature review, ethical considerations, and proposal writing. Trainer: M. Furquan Mirza.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4MUU7xDmz24-FEzg97ZOgMHEynTaRkQyXy4BCTWSUe6H452iFkn5YCXQdyxhMl1C2vkSg71bMRWZNePDSh30yWtWhMJ-ZXjkC1Qu6MhxnTOSjR5ZY2aHZK_DrQnS46iQCu6YDyhSVkRM9vFGUw-sUUbfn_hp518Jy5oMUvU65e2aNy-bbPIL7xL8Q5cM/s320/482033142_950616090587798_5192982234632189680_n.jpg",
    imageAlt: "Research Methodology Training"
  },

  {
    report: 4,
    tag: "Disaster Preparedness · Batch 3",
    title: "Disaster Risk Management Training",
    description: "RSU completed the third batch of its two-day DRM training, equipping camp residents with practical skills in disaster planning, first aid, and emergency response.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhspRcyH37jCM3zPDKsfUlZOMSRYPaQace2K4hJEZ6g6Zg5663JMRcEePAmd4wUh3caa_iKO-USRWQ57aSb4K6aik2Fbani__tSwTi8a2BYkZxwcN7JmevJA6-IhPcvhK6n-M1yF2mkjAZzGNAkQt92ELsueNd-rRKtFmB2cqes2KNYNiz11YZnbRSWdt0/s2048/482201294_948604717455602_1558052512247191560_n.jpg",
    imageAlt: "Disaster Risk Management Training Batch 3"
  },

  {
    report: 5,
    tag: "Disaster Preparedness · Batch 4",
    title: "Disaster Risk Management Training",
    description: "Building on previous sessions, RSU conducted its fourth DRM training batch, combining classroom instruction with scenario-based drills and emergency simulations.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjYSN11g4sYC_RUP4ynNtVkzugHmXiIu3ywN5pDinhIlHKeus0EbGjM1UFOFWAxeYEDRReSegYkHvpW3HY8nHWia2FzgPN4NAz4b623gjmbK9pd1aOmRKLtfMHowtRUrAqI8-4x3vAEiTIZOPlDUp2OxG-AEf28p5OYEIB7Xnmx5BtDR5nVTi1cvkXmlUc/s2048/483101284_948614664121274_9198498412357262276_n.jpg",
    imageAlt: "Disaster Risk Management Training Batch 4"
  },

  {
    report: 6,
    tag: "Disaster Preparedness · Women & Girls",
    title: "DRM Training for Rohingya Women and Girls",
    description: "A dedicated two-day DRM training for Rohingya women and girls, strengthening their role as first responders and community leaders in disaster preparedness.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgG2jaJUN4R1B2pcBshrqZPWnL0H9xZ5UrAwkA8x2fzppuiolXKc8u7bS79w7T6RDcEMdKGIFycQV59y2jIkiMYLwcKrNJF6G4S87R0uNsKtzu9aVa6Bp4k3bLxk9y8MhAedpuEsJ-XP-M1Ws4j8IVrIJjP2_jUagVoIgdk1Z9VG0DiNOIeWS59wSMPbT4/s2048/482216826_948012507514823_5207696665213387018_n.jpg",
    imageAlt: "DRM Training for Rohingya Women and Girls"
  },

  {
    report: 7,
    tag: "Disaster Preparedness · Batch 5",
    title: "Disaster Risk Management Training",
    description: "RSU concluded its fifth DRM training batch, combining interactive lectures, hands-on drills, and group exercises to build community-wide emergency response capacity.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9JCScm3iqL_qvarbhAwviUchShdcuKChGD_MMXAW_VIoJqe9AS1wZ1luYZOwexbVWYVjWNVM_C0Hzo-d2ctLTXKBTy6qYA8CFcsxvx74VwCichWpQpBUp4ZQUq7jUl3xLDx1hukrA4AracBktQlKaj_mPsbXz2-_ZBPKKr3hnIfLOmS8ctYMe-5WmDZE/s2048/482345904_949143654068375_1750521253115406580_n.jpg",
    imageAlt: "Disaster Risk Management Training Batch 5"
  },

];
