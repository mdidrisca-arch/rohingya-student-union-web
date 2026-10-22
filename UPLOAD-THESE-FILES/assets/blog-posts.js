/* The list of posts shown on the Blog page (rostudentunion.org/blog/).
   Each post is one block between { and }, separated by commas. The newest post is shown first (sorted by date).
   The "RSU New Post Maker" tool will write these blocks for you; you only paste them in here.

   Example of one post (remove the /* and *\/ around it to use it as a template):

   {
     slug: 'my-first-story',                    // the page address: /blog/my-first-story/   (small letters, numbers and dashes only)
     title: 'My First Story',
     date: '2026-10-22',                        // year-month-day
     author: 'Author Name',
     tag: 'Story',                              // a short label such as Story, Opinion, News, Reflection
     image: '/assets/img/blog/my-picture.jpg',  // optional: a file in assets/img/blog/, or a full https:// picture link
     imageAlt: 'Describe the picture in a few words',
     excerpt: 'One or two sentences that make people want to read it.'
   }
*/
window.blogPosts = [
  {
    slug: 'when-education-has-no-clear-future',
    title: 'When Education Has No Clear Future: The Rohingya Education Crisis in the Camps',
    date: '2026-10-22',
    author: 'Rohingya Student Union',
    tag: 'Education',
    image: '/assets/img/blog/education-has-no-clear-future.jpg',
    imageAlt: 'A smiling Rohingya schoolgirl in a red headscarf sits at a desk in a learning centre classroom.',
    excerpt: 'For thousands of Rohingya students, the path from the classroom to higher education remains uncertain. The challenge is not simply getting children into school; it is giving them a realistic path forward.'
  }
];
