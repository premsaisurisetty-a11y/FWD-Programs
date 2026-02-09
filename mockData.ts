
import { Problem, Difficulty, Submission, SubmissionStatus, Tutorial, UserStats } from './types';

export const PROBLEMS: Problem[] = [
  {
    id: 'html-basics-1',
    title: 'Hello World HTML',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['HTML Basics', 'Structure'],
    category: 'HTML Fundamentals',
    status: 'unsolved',
    description: 'Create a basic HTML document structure. Include a heading that says "Hello World" and a paragraph describing yourself.',
    inputFormat: 'No input',
    outputFormat: 'Rendered HTML page with h1 and p tags',
    constraints: 'Must use <h1> and <p> tags',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <h1>Hello World</h1>
        <p>My name is [Your Name] and I love coding!</p>
      </div>
    `
  },
  {
    id: 'html-text-2',
    title: 'Text Formatting',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['HTML Text', 'Formatting'],
    category: 'Text Formatting',
    status: 'unsolved',
    description: 'Format a text block using bold, italic, and underline tags. Create a sentence where different words have different styles.',
    inputFormat: 'No input',
    outputFormat: 'Rendered text with <b>, <i>, <u> styling',
    constraints: 'Use <b>/<strong>, <i>/<em>, and <u> tags',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <p>This is <b>bold</b> text.</p>
        <p>This is <i>italic</i> text.</p>
        <p>This is <u>underlined</u> text.</p>
      </div>
    `
  },
  {
    id: 'html-lists-3',
    title: 'Ordered & Unordered Lists',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['HTML Lists', 'ul', 'ol'],
    category: 'Text Formatting',
    status: 'unsolved',
    description: 'Create a shopping list using an unordered list, and a recipe steps list using an ordered list.',
    inputFormat: 'No input',
    outputFormat: 'Two visible lists',
    constraints: 'Use <ul> for shopping, <ol> for recipe',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <h3>Shopping List</h3>
        <ul><li>Apples</li><li>Bread</li><li>Milk</li></ul>
        <h3>Recipe</h3>
        <ol><li>Mix ingredients</li><li>Bake for 30 mins</li><li>Serve</li></ol>
      </div>
    `
  },
  {
    id: 'html-links-4',
    title: 'Hyperlinks & Navigation',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['HTML Links', 'img'],
    category: 'Text Formatting',
    status: 'unsolved',
    description: 'Create a navigation menu with 3 links (Home, components, Contact) and display an image below them.',
    inputFormat: 'No input',
    outputFormat: 'Clickable links and a visible image',
    constraints: 'Use <a href="#"> and <img src="...">',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <nav>
          <a href="#" style="color: cyan; margin-right: 10px;">Home</a>
          <a href="#" style="color: cyan; margin-right: 10px;">About</a>
          <a href="#" style="color: cyan;">Contact</a>
        </nav>
        <br/>
        <div style="width: 100px; height: 100px; background: #334155; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          Image Placeholder
        </div>
      </div>
    `
  },
  {
    id: 'html-table-5',
    title: 'Data Tables',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['HTML Tables'],
    category: 'Tables',
    status: 'unsolved',
    description: 'Create a table showing a student schedule. Include headers for Day, Time, and Subject.',
    inputFormat: 'No input',
    outputFormat: 'Table with borders and headers',
    constraints: 'Use <table>, <tr>, <th>, <td>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <tr><th>Day</th><th>Time</th><th>Subject</th></tr>
          <tr><td>Mon</td><td>9:00</td><td>Math</td></tr>
          <tr><td>Tue</td><td>10:00</td><td>Science</td></tr>
        </table>
      </div>
    `
  },
  {
    id: 'html-forms-6',
    title: 'Registration Form',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['HTML Forms', 'Input'],
    category: 'Forms',
    status: 'unsolved',
    description: 'Build a user registration form with fields for Name, Email, Password, and a Submit button.',
    inputFormat: 'No input',
    outputFormat: 'Functional form structure',
    constraints: 'Use <form>, <input type="email">, <input type="password">',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <form style="display: flex; flex-direction: column; gap: 10px; max-width: 200px;">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button style="background: cyan; padding: 5px;">Register</button>
        </form>
      </div>
    `
  },
  {
    id: 'html-semantics-7',
    title: 'Semantic Layout',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['Semantic HTML'],
    category: 'HTML Fundamentals',
    status: 'unsolved',
    description: 'Refactor a layout using semantic tags like <header>, <main>, <article>, and <footer> instead of generic divs.',
    inputFormat: 'No input',
    outputFormat: 'Semantically structured page',
    constraints: 'Avoid using <div> for main layout sections',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white; border: 1px dashed gray; padding: 10px;">
        <header style="background: #334155; padding: 5px;">Header</header>
        <main style="padding: 10px;">
          <article>Article Content</article>
        </main>
        <footer style="background: #334155; padding: 5px;">Footer</footer>
      </div>
    `
  },
  {
    id: 'html-media-8',
    title: 'Embedding Media',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['Audio', 'Video'],
    category: 'Multimedia',
    status: 'unsolved',
    description: 'Embed a sample audio file and a video file into the webpage with controls enabled.',
    inputFormat: 'No input',
    outputFormat: 'Playable audio and video players',
    constraints: 'Use <audio controls> and <video controls>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <p>Audio Player:</p>
        <div style="background: #333; height: 30px; width: 200px; border-radius: 15px;"></div>
        <p>Video Player:</p>
        <div style="background: #000; height: 120px; width: 200px; display: flex; align-items: center; justify-content: center; border: 1px solid #333;">
          ▶
        </div>
      </div>
    `
  },
  {
    id: 'html-meta-9',
    title: 'Meta Tags & SEO',
    difficulty: Difficulty.HARD,
    type: 'web',
    tags: ['SEO', 'Meta'],
    category: 'HTML Fundamentals',
    status: 'unsolved',
    description: 'Configure the <head> section of a document with proper character set, viewport settings, and SEO meta description.',
    inputFormat: 'No input',
    outputFormat: 'Invisible metadata in head',
    constraints: 'Include <meta charset>, <meta name="viewport">',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <p><em>(Meta tags are invisible, but here is the expected head structure)</em></p>
        <pre style="background: #1e293b; padding: 10px; border-radius: 5px;">
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="description" content="..."&gt;
&lt;/head&gt;
        </pre>
      </div>
    `
  },
  {
    id: 'html-access-10',
    title: 'Accessible ARIA Form',
    difficulty: Difficulty.HARD,
    type: 'web',
    tags: ['Accessibility', 'ARIA'],
    category: 'Forms',
    status: 'unsolved',
    description: 'Create a form that is fully accessible to screen readers, using labels and ARIA attributes where necessary.',
    inputFormat: 'No input',
    outputFormat: 'Accessible form elements',
    constraints: 'All inputs must have associated <label>s',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <form>
          <label for="username">Username:</label><br/>
          <input id="username" type="text" aria-required="true" /><br/><br/>
          <label for="bio">Bio:</label><br/>
          <textarea id="bio" aria-label="User Bio"></textarea>
        </form>
      </div>
    `
  },
  // --- NEW: Structure & Text ---
  {
    id: 'html-quotes-11',
    title: 'Blockquotes & Citations',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['HTML Text', 'Quotes'],
    category: 'HTML Fundamentals',
    status: 'unsolved',
    description: 'Use the `<blockquote>` tag for a long quote and `<q>` for a short inline quote. Add a `<cite>` tag for the source.',
    inputFormat: 'No input',
    outputFormat: 'Rendered quotes',
    constraints: 'Use <blockquote>, <q>, <cite>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <blockquote cite="https://example.com">
          The only way to do great work is to love what you do.
        </blockquote>
        <p>As <cite>Steve Jobs</cite> said, <q>Stay hungry, stay foolish.</q></p>
      </div>
    `
  },
  {
    id: 'html-pre-12',
    title: 'Preformatted Text',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['HTML Text', 'Pre'],
    category: 'HTML Fundamentals',
    status: 'unsolved',
    description: 'Display a block of code (like a function) preserving whitespace and line breaks using the `<pre>` and `<code>` tags.',
    inputFormat: 'No input',
    outputFormat: 'Monospace code block',
    constraints: 'Use <pre> and <code>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <pre>
function hello() {
  console.log("Hello!");
}
        </pre>
      </div>
    `
  },
  {
    id: 'html-hr-13',
    title: 'Breaks and Rules',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['HTML Structure', 'hr', 'br'],
    category: 'HTML Fundamentals',
    status: 'unsolved',
    description: 'Separate two paragraphs with a horizontal rule `<hr>`. Use line breaks `<br>` to format a poem or address.',
    inputFormat: 'No input',
    outputFormat: 'Visual separator and line breaks',
    constraints: 'Use <hr> and <br>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <p>Paragraph 1</p>
        <hr>
        <p>Line 1<br>Line 2<br>Line 3</p>
      </div>
    `
  },
  // --- NEW: Lists & Links ---
  {
    id: 'html-nested-14',
    title: 'Nested Lists',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['HTML Lists', 'Nesting'],
    category: 'Text Formatting',
    status: 'unsolved',
    description: 'Create an ordered list of "Chapters". Inside "Chapter 1", add an unordered list of "Sections".',
    inputFormat: 'No input',
    outputFormat: 'Nested list structure',
    constraints: 'Use <ol> inside <li> or vice versa',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <ol>
          <li>Chapter 1
            <ul>
              <li>Section A</li>
              <li>Section B</li>
            </ul>
          </li>
          <li>Chapter 2</li>
        </ol>
      </div>
    `
  },
  {
    id: 'html-dl-15',
    title: 'Description Lists',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['HTML Lists', 'dl'],
    category: 'Text Formatting',
    status: 'unsolved',
    description: 'Create a description list for terms like "HTML", "CSS", and "JS" with their definitions.',
    inputFormat: 'No input',
    outputFormat: 'Defined terms and descriptions',
    constraints: 'Use <dl>, <dt>, <dd>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <dl>
          <dt>HTML</dt>
          <dd>Markup Language</dd>
          <dt>CSS</dt>
          <dd>Styling Language</dd>
        </dl>
      </div>
    `
  },
  {
    id: 'html-anchor-16',
    title: 'Page Anchors',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['HTML Links', 'Anchors'],
    category: 'Text Formatting',
    status: 'unsolved',
    description: 'Create a long page with a "Jump to Bottom" link at the top that links to a footer with a specific ID.',
    inputFormat: 'No input',
    outputFormat: 'Link that jumps to id',
    constraints: 'Use <a href="#id"> and id="..."',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <a href="#footer">Jump to Bottom</a>
        <div style="height: 100px;">Spacer</div>
        <footer id="footer">You made it!</footer>
      </div>
    `
  },
  // --- NEW: Multimedia ---
  {
    id: 'html-picture-17',
    title: 'Responsive Picture',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['Multimedia', 'Picture'],
    category: 'Multimedia',
    status: 'unsolved',
    description: 'Use the `<picture>` tag to show different images based on screen width (simulate using source media).',
    inputFormat: 'No input',
    outputFormat: 'Responsive image element',
    constraints: 'Use <picture>, <source>, <img>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <picture>
          <source media="(min-width: 650px)" srcset="img_large.jpg">
          <img src="img_small.jpg" alt="Responsive">
        </picture>
      </div>
    `
  },
  {
    id: 'html-figure-18',
    title: 'Figures & Captions',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['Multimedia', 'Semantic'],
    category: 'Multimedia',
    status: 'unsolved',
    description: 'Display an image with a visible caption using `<figure>` and `<figcaption>`.',
    inputFormat: 'No input',
    outputFormat: 'Image with attached caption',
    constraints: 'Use <figure>, <figcaption>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <figure>
          <img src="https://via.placeholder.com/150" alt="Demo">
          <figcaption>Fig 1. A placeholder image.</figcaption>
        </figure>
      </div>
    `
  },
  {
    id: 'html-iframe-yt-19',
    title: 'YouTube Embed',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['Multimedia', 'Iframe'],
    category: 'Multimedia',
    status: 'unsolved',
    description: 'Embed a YouTube video using an iframe (use a sample ID like `dQw4w9WgXcQ` or placeholder).',
    inputFormat: 'No input',
    outputFormat: 'Video player iframe',
    constraints: 'Use <iframe>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <iframe width="300" height="200" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
      </div>
    `
  },
  // --- NEW: Tables ---
  {
    id: 'html-colspan-20',
    title: 'Table Column Span',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['HTML Tables', 'Colspan'],
    category: 'Tables',
    status: 'unsolved',
    description: 'Create a table where the header cell "Contact" spans 2 columns (Email and Phone).',
    inputFormat: 'No input',
    outputFormat: 'Table with merged header',
    constraints: 'Use colspan="2"',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <table border="1">
          <tr><th colspan="2">Contact</th></tr>
          <tr><td>Email</td><td>Phone</td></tr>
        </table>
      </div>
    `
  },
  {
    id: 'html-rowspan-21',
    title: 'Table Row Span',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['HTML Tables', 'Rowspan'],
    category: 'Tables',
    status: 'unsolved',
    description: 'Create a table where the first column "Category" spans 2 rows for "A" and "B".',
    inputFormat: 'No input',
    outputFormat: 'Table with merged row',
    constraints: 'Use rowspan="2"',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <table border="1">
          <tr><td rowspan="2">Category</td><td>Item 1</td></tr>
          <tr><td>Item 2</td></tr>
        </table>
      </div>
    `
  },
  {
    id: 'html-complex-table-22',
    title: 'Complex Table Layout',
    difficulty: Difficulty.HARD,
    type: 'web',
    tags: ['HTML Tables', 'Complex'],
    category: 'Tables',
    status: 'unsolved',
    description: 'Create a comprehensive table with a Caption, Thead, Tbody, and Tfoot. Use valid semantic structure.',
    inputFormat: 'No input',
    outputFormat: 'Full semantic table',
    constraints: 'Use <caption>, <thead>, <tfoot>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <table border="1">
          <caption>Sales</caption>
          <thead><tr><th>Item</th><th>Cost</th></tr></thead>
          <tbody><tr><td>Apple</td><td>$1</td></tr></tbody>
          <tfoot><tr><td>Total</td><td>$1</td></tr></tfoot>
        </table>
      </div>
    `
  },
  // --- NEW: Forms ---
  {
    id: 'html-radio-23',
    title: 'Radio Buttons',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['HTML Forms', 'Radio'],
    category: 'Forms',
    status: 'unsolved',
    description: 'Create a "Choose Gender" question with 3 options. Ensure users can only select one.',
    inputFormat: 'No input',
    outputFormat: 'Grouped radio buttons',
    constraints: 'Use <input type="radio"> with same name',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <form>
          <input type="radio" name="gender" id="m"><label for="m">Male</label>
          <input type="radio" name="gender" id="f"><label for="f">Female</label>
        </form>
      </div>
    `
  },
  {
    id: 'html-checkbox-24',
    title: 'Checkboxes',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['HTML Forms', 'Checkbox'],
    category: 'Forms',
    status: 'unsolved',
    description: 'Create a "Select Interests" section with multiple checkboxes (e.g., Coding, Music, Sports).',
    inputFormat: 'No input',
    outputFormat: 'Selectable checkboxes',
    constraints: 'Use <input type="checkbox">',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <form>
          <input type="checkbox" id="c"><label for="c">Coding</label>
          <input type="checkbox" id="m"><label for="m">Music</label>
        </form>
      </div>
    `
  },
  {
    id: 'html-select-25',
    title: 'Dropdown Menus',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['HTML Forms', 'Select'],
    category: 'Forms',
    status: 'unsolved',
    description: 'Create a dropdown list for selecting a Country.',
    inputFormat: 'No input',
    outputFormat: 'Dropdown with options',
    constraints: 'Use <select> and <option>',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <select>
          <option>USA</option>
          <option>Canada</option>
          <option>UK</option>
        </select>
      </div>
    `
  },
  {
    id: 'html-inputs-26',
    title: 'Special Input Types',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['HTML Forms', 'Inputs'],
    category: 'Forms',
    status: 'unsolved',
    description: 'Use modern input types to ask for a Date, a Color, and a Number (range).',
    inputFormat: 'No input',
    outputFormat: 'Specialized inputs',
    constraints: 'Use type="date", type="color", type="range"',
    sampleTestCases: [],
    expectedOutput: `
      <div style="font-family: sans-serif; color: white;">
        <input type="date">
        <input type="color">
        <input type="range">
      </div>
    `
  }
];

export const SUBMISSIONS: Submission[] = [
  // Submissions cleared for new problem set
];

export const HTML_MODULES: Tutorial[] = [
  // Module 1: Introduction to HTML
  {
    id: 'html-01',
    title: 'HTML Basics: Structure & Doctype',
    category: 'HTML Fundamentals',
    duration: '10 min',
    level: Difficulty.EASY,
    content: `
      <h2>1. Introduction to HTML</h2>
      <p>HTML stands for <strong>HyperText Markup Language</strong>. It is the standard markup language for creating Web pages. HTML describes the structure of a Web page using markup. HTML elements are the building blocks of HTML pages, represented by tags.</p>
      
      <h3>A Brief History</h3>
      <p>HTML was created by Sir Tim Berners-Lee in late 1991 but was not released as a standard until 1995 as HTML 2.0. HTML 4.01 was a major version published in late 1999. In 2014, HTML5 was released, bringing a wide range of new features and capabilities that power modern web applications.</p>

      <h3>The HTML5 Structure</h3>
      <p>Every modern HTML document follows a tree-like structure. The browser reads this reference and renders the visible page. Here is the breakdown of a standard boilerplate:</p>
      
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Main Heading&lt;/h1&gt;
    &lt;p&gt;Content paragraph...&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

      <h3>Key Components Explained</h3>
      <ul>
        <li><strong>&lt;!DOCTYPE html&gt;</strong>: This declaration defines that this document is an HTML5 document. It helps browsers display web pages correctly.</li>
        <li><strong>&lt;html&gt;</strong>: The root element of an HTML page. All other elements must be descendants of this element.</li>
        <li><strong>&lt;head&gt;</strong>: Contains meta-information about the HTML page (like title, character set, styles, scripts) that is not visible to the page visitor.</li>
        <li><strong>&lt;title&gt;</strong>: Specifies a title for the HTML page (which is shown in the browser's title bar or in the page's tab).</li>
        <li><strong>&lt;body&gt;</strong>: Defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.</li>
      </ul>

      <h3>Why HTML5?</h3>
      <p>HTML5 is not just about structure; it introduced native support for multimedia (audio/video), semantic elements (article, section, nav), and powerful APIs like Geolocation, Drag and Drop, and Local Storage.</p>
      
      <div class="tip-box">
         <strong>Pro Tip:</strong> Always include the <code>lang</code> attribute in the <code>&lt;html&gt;</code> tag to assist search engines and screen readers.
      </div>
      <br><br><br><br><p>Scroll down for more...</p>
    `,
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>body { font-family: sans-serif; line-height: 1.6; padding: 20px; }</style>
</head>
<body>
  <h1>Welcome to HTML5</h1>
  <p>This is a standard paragraph element. HTML is the skeleton of the web.</p>
  <hr>
  <h2>Why learn it?</h2>
  <p>Because it is the foundation of every website you see!</p>
</body>
</html>`
  },
  {
    id: 'html-02',
    title: 'Tags, Elements, and Attributes',
    category: 'HTML Fundamentals',
    duration: '15 min',
    level: Difficulty.EASY,
    content: `
      <h2>Understanding HTML Syntax</h2>
      <p>To master HTML, you must understand the difference between tags, elements, and attributes.</p>

      <h3>1. HTML Tags</h3>
      <p>Tags are used to mark up the start and end of an HTML element. They are surrounded by angle brackets.</p>
      <ul>
         <li>Start tag: <code>&lt;h1&gt;</code></li>
         <li>End tag: <code>&lt;/h1&gt;</code></li>
      </ul>
      <p>Some tags are <strong>self-closing</strong> (void elements), meaning they don't need a closing tag. Examples include <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, and <code>&lt;input&gt;</code>.</p>

      <h3>2. HTML Elements</h3>
      <p>An element is everything from the start tag to the end tag:</p>
      <div class="code-block">
        <code>&lt;p&gt;My content is here&lt;/p&gt;</code>
      </div>
      <p>Nested elements are elements inside other elements.</p>

      <h3>3. HTML Attributes</h3>
      <p>Attributes provide additional information about elements. They are always specified in the start tag and usually come in name/value pairs like <code>name="value"</code>.</p>
      
      <h4>Common Attributes:</h4>
      <ul>
        <li><strong>href</strong>: Used in <code>&lt;a&gt;</code> tags to specify the URL.</li>
        <li><strong>src</strong>: Used in <code>&lt;img&gt;</code> tags to verify the image path.</li>
        <li><strong>width / height</strong>: Specifies dimensions for images/videos.</li>
        <li><strong>alt</strong>: Alternative text for images if they fail to load.</li>
        <li><strong>style</strong>: Used to add inline CSS styles.</li>
        <li><strong>lang</strong>: Declares the language of the page content.</li>
        <li><strong>title</strong>: Defines extra information about an element (displayed as a tool tip).</li>
      </ul>
      <br><br><br><p>Try experimenting with the code on the right!</p>
    `,
    initialCode: `<div class="container">
  <!-- Title attribute shows a tooltip on hover -->
  <h1 title="This is a main heading">Attributes Demo</h1>
  
  <p>Here is a link with an <code>href</code> attribute:</p>
  <a href="https://www.google.com" target="_blank">Go to Google</a>
  
  <p>Here is an image with <code>src</code>, <code>alt</code>, and <code>width</code> attributes:</p>
  <img src="https://picsum.photos/200" alt="Random geometric art" width="150" style="border: 2px solid black; border-radius: 10px;">
  
  <p>This input field has <code>type</code> and <code>placeholder</code> attributes:</p>
  <input type="text" placeholder="Type something..." />
</div>`
  },
  {
    id: 'html-03',
    title: 'Head vs Body: Metadata Explained',
    category: 'HTML Fundamentals',
    duration: '10 min',
    level: Difficulty.EASY,
    content: `
      <h3>The &lt;head&gt; Section</h3>
      <p>The <code>&lt;head&gt;</code> element contains meta information about the HTML page. It is not displayed on the page itself.</p>
      <ul>
        <li><code>&lt;title&gt;</code>: Browser tab title.</li>
        <li><code>&lt;meta charset="UTF-8"&gt;</code>: Character set.</li>
        <li><code>&lt;style&gt;</code>: Internal CSS.</li>
      </ul>
      <h3>The &lt;body&gt; Section</h3>
      <p>The <code>&lt;body&gt;</code> element defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.</p>
    `,
    initialCode: `<html>
<head>
  <title>My Page Title</title>
  <style>
    h1 { color: blue; }
  </style>
</head>
<body>
  <h1>Visible Content</h1>
  <p>Currently, the title isn't visible in this preview, but the CSS in the head works!</p>
</body>
</html>`
  },

  // Module 2: Text Formatting
  {
    id: 'html-04',
    title: 'Headings and Paragraphs',
    category: 'Text Formatting',
    duration: '10 min',
    level: Difficulty.EASY,
    content: `
      <h3>Headings</h3>
      <p>HTML headings are defined with the <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> tags.</p>
      <p><code>&lt;h1&gt;</code> defines the most important heading. <code>&lt;h6&gt;</code> defines the least important heading.</p>
      <h3>Paragraphs</h3>
      <p>The <code>&lt;p&gt;</code> tag defines a paragraph. Browsers automatically add a single blank line before and after each element.</p>
    `,
    initialCode: `<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>`
  },
  {
    id: 'html-05',
    title: 'Lists: Ordered, Unordered, Definition',
    category: 'Text Formatting',
    duration: '15 min',
    level: Difficulty.EASY,
    content: `
      <h3>Unordered Lists</h3>
      <p>Currently starts with the <code>&lt;ul&gt;</code> tag. Each list item starts with the <code>&lt;li&gt;</code> tag.</p>
      <h3>Ordered Lists</h3>
      <p>Starts with the <code>&lt;ol&gt;</code> tag.</p>
    `,
    initialCode: `<h3>Shopping List (Unordered)</h3>
<ul>
  <li>Milk</li>
  <li>Eggs</li>
  <li>Bread</li>
</ul>

<h3>Steps (Ordered)</h3>
<ol>
  <li>Mix ingredients</li>
  <li>Bake at 350°</li>
  <li>Serve</li>
</ol>`
  },
  {
    id: 'html-06',
    title: 'Links and Anchor Tags',
    category: 'Text Formatting',
    duration: '12 min',
    level: Difficulty.EASY,
    content: `
    <h2>Hyperlinks: The Web's Glue</h2>
    <p>HTML links are hyperlnkks. You can click on a link and jump to another document. When you move the mouse over a link, the mouse arrow will turn into a little hand.</p>
    
    <h3>The Anchor Tag</h3>
    <p>The <code>&lt;a&gt;</code> tag defines a hyperlink. It has the following syntax:</p>
    <pre><code>&lt;a href="url"&gt;link text&lt;/a&gt;</code></pre>
    <p>The most important attribute of the <code>&lt;a&gt;</code> element is the <code>href</code> attribute, which indicates the link's destination.</p>

    <h3>Target Attribute</h3>
    <p>The <code>target</code> attribute specifies where to open the linked document.</p>
    <ul>
      <li><code>_self</code> - Default. Opens the document in the same window/tab as it was clicked.</li>
      <li><code>_blank</code> - Opens the document in a new window or tab.</li>
      <li><code>_parent</code> - Opens the document in the parent frame.</li>
      <li><code>_top</code> - Opens the document in the full body of the window.</li>
    </ul>

    <h3>Image Links</h3>
    <p>It is common to use images as links:</p>
    <pre><code>&lt;a href="default.asp"&gt;
  &lt;img src="smiley.gif" alt="HTML tutorial"&gt;
&lt;/a&gt;</code></pre>
    
    <h3>Email Links</h3>
    <p>Use <code>mailto:</code> inside the href attribute to create a link that opens the user's email program (to let them send a new email):</p>
    <pre><code>&lt;a href="mailto:someone@example.com"&gt;Send email&lt;/a&gt;</code></pre>

    <h3>Internal Links (Bookmarks)</h3>
    <p>You can create bookmarks to allow users to jump to specific parts of a web page. First create a bookmark with the <code>id</code> attribute, then add a link to it using the hash (<code>#</code>) symbol.</p>
    `,
    initialCode: `<h2>Link Examples</h2>

<p>1. Absolute Link:</p>
<!-- Try adding target="_blank" to open in new tab -->
<a href="https://www.wikipedia.org">Visit Wikipedia</a>

<p>2. Image Link:</p>
<a href="https://www.google.com">
  <img src="https://via.placeholder.com/100x50" alt="Go to Google">
</a>

<p>3. Email Link:</p>
<a href="mailto:support@learn2code.com">Contact Support</a>

<p>4. Empty Link (often used in JS):</p>
<a href="#">Back to Top</a>`
  },
  {
    id: 'html-07',
    title: 'Text Semantics: Strong, Em, Span',
    category: 'Text Formatting',
    duration: '10 min',
    level: Difficulty.EASY,
    content: `
      <h2>Semantic Formatting</h2>
      <p>HTML defines special elements for defining text with a special meaning. Semantic elements clearly describe their meaning to both the browser and the developer.</p>
      
      <h3>Bold and Strong</h3>
      <ul>
        <li><code>&lt;b&gt;</code> - Bold text, without any extra importance.</li>
        <li><code>&lt;strong&gt;</code> - Important text. Browsers typically show this as bold, but screen readers may announce it with extra emphasis.</li>
      </ul>

      <h3>Italic and Emphasized</h3>
      <ul>
        <li><code>&lt;i&gt;</code> - Italic text, often used for technical terms, phrases from another language, or thoughts.</li>
        <li><code>&lt;em&gt;</code> - Emphasized text. Screen readers will verbally stress these words.</li>
      </ul>
      
      <h3>Small, Mark, Del, Ins</h3>
      <ul>
        <li><code>&lt;small&gt;</code> - Defines smaller text (copyrights, etc).</li>
        <li><code>&lt;mark&gt;</code> - Defines marked/highlighted text.</li>
        <li><code>&lt;del&gt;</code> - Defines text that has been deleted from a document.</li>
        <li><code>&lt;ins&gt;</code> - Defines a text that has been inserted into a document.</li>
        <li><code>&lt;sub&gt;</code> - Subscript text.</li>
        <li><code>&lt;sup&gt;</code> - Superscript text.</li>
      </ul>
      
      <h3>Span vs Div</h3>
      <p><code>&lt;span&gt;</code> is an inline container used to mark up a part of a text, or a part of a document.</p>
      <p><code>&lt;div&gt;</code> is a block-level container. It starts on a new line.</p>
    `,
    initialCode: `<p>This is normal text.</p>
<p><b>This text is bold.</b></p>
<p><strong>This text is important!</strong></p>
<p><i>This text is italic.</i></p>
<p><em>This text is emphasized.</em></p>
<hr>
<p>Price: <del>$100</del> <ins>$50</ins></p>
<p>H<sub>2</sub>O is water.</p>
<p>E = mc<sup>2</sup></p>
<p>Do not forget to buy <mark>milk</mark> today.</p>`
  },

  // Module 3: Multimedia
  {
    id: 'html-08',
    title: 'Working with Images (Img tag)',
    category: 'Multimedia',
    duration: '15 min',
    level: Difficulty.EASY,
    content: `
      <h2>Images in HTML</h2>
      <p>Images can improve the design and the appearance of a web page. The <code>&lt;img&gt;</code> tag is empty, it contains attributes only, and does not have a closing tag.</p>

      <h3>The src Attribute</h3>
      <p>The <code>src</code> attribute specifies the path (URL) to the image.</p>
      <ul>
         <li>Absolute URL: Links to an external image hosted on another website.</li>
         <li>Relative URL: Links to an image hosted within the website.</li>
      </ul>

      <h3>The alt Attribute</h3>
      <p>The <code>alt</code> attribute provides an alternate text for an image, if the user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).</p>
      <pre><code>&lt;img src="img_chania.jpg" alt="Flowers in Chania"&gt;</code></pre>

      <h3>Image Size - Width and Height</h3>
      <p>You can use the <code>style</code> attribute to specify the width and height of an image.</p>
      <pre><code>&lt;img src="img_girl.jpg" alt="Girl in a jacket" style="width:500px;height:600px;"&gt;</code></pre>
      <p>Alternatively, you can use the <code>width</code> and <code>height</code> attributes directly. The values are in pixels by default.</p>

      <h3>Common Formats</h3>
      <ul>
        <li><strong>JPEG / JPG</strong>: Good for photos with many colors.</li>
        <li><strong>PNG</strong>: Good for graphics, supports transparency.</li>
        <li><strong>GIF</strong>: Supports simple animations.</li>
        <li><strong>SVG</strong>: Scalable Vector Graphics, quality doesn't degrade on zoom.</li>
        <li><strong>WebP</strong>: Modern format providing superior compression.</li>
      </ul>
      <br><br><br>
    `,
    initialCode: `<style>img { border-radius: 8px; margin-bottom: 10px; }</style>
<h2>Image Gallery Demo</h2>

<h3>From Unsplash (Random)</h3>
<img src="https://picsum.photos/300/200" alt="Random placeholder">

<h3>Specific Size</h3>
<img src="https://via.placeholder.com/150" alt="150x150 placeholder">

<h3>Broken Link Test (Check Alt Text)</h3>
<img src="invalid-link.jpg" alt="This description is visible because the image failed to load">`
  },
  {
    id: 'html-09',
    title: 'Embedding Audio and Video',
    category: 'Multimedia',
    duration: '20 min',
    level: Difficulty.EASY,
    content: `
      <h2>HTML5 Media</h2>
      <p>Before HTML5, audio/video files could only be played in a browser with a plug-in (like Flash). The HTML5 <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code> elements specify a standard way to embed media.</p>

      <h3>The Video Element</h3>
      <p>To show a video, use the <code>&lt;video&gt;</code> element.</p>
      <pre><code>&lt;video width="320" height="240" controls&gt;
  &lt;source src="movie.mp4" type="video/mp4"&gt;
  Your browser does not support the video tag.
&lt;/video&gt;</code></pre>
      <p>The <code>controls</code> attribute adds video controls, like play, pause, and volume.</p>
      <p>Attributes: <code>autoplay</code>, <code>loop</code>, <code>muted</code>, <code>poster</code>.</p>

      <h3>The Audio Element</h3>
      <p>To play an audio file, use the <code>&lt;audio&gt;</code> element.</p>
      <pre><code>&lt;audio controls&gt;
  &lt;source src="horse.ogg" type="audio/ogg"&gt;
  &lt;source src="horse.mp3" type="audio/mpeg"&gt;
  Your browser does not support the audio element.
&lt;/audio&gt;</code></pre>
      
      <h3>Formats Support</h3>
      <ul>
        <li>Video: MP4, WebM, Ogg</li>
        <li>Audio: MP3, WAV, Ogg</li>
      </ul>
      <br><br><br>
    `,
    initialCode: `<h2>Video</h2>
<!-- Note: Autoplay often requires muted to work in modern browsers -->
<video width="400" controls poster="https://via.placeholder.com/400x225?text=Video+Poster">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support HTML5 video.
</video>

<h2>Audio</h2>
<audio controls>
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>`
  },
  {
    id: 'html-10',
    title: 'Iframes and Embedding Content',
    category: 'Multimedia',
    duration: '15 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>The Iframe Element</h2>
      <p>An HTML iframe (Inline Frame) is used to display a web page within a web page.</p>
      <pre><code>&lt;iframe src="url" title="description"&gt;&lt;/iframe&gt;</code></pre>
      
      <h3>Key Attributes</h3>
      <ul>
        <li><strong>src</strong>: The URL of the page to embed.</li>
        <li><strong>height</strong> and <strong>width</strong>: Specifies the size of the iframe.</li>
        <li><strong>title</strong>: Description for screen readers.</li>
        <li><strong>name</strong>: Used to target the iframe from links.</li>
      </ul>

      <h3>Iframe Border</h3>
      <p>By default, an iframe has a border around it. To remove it, use the style attribute:</p>
      <pre><code>style="border:none;"</code></pre>

      <h3>Target for a Link</h3>
      <p>An iframe can be used as the target frame for a link.</p>
      <pre><code>&lt;iframe name="iframe_a"&gt;&lt;/iframe&gt;
&lt;a href="https://www.w3schools.com" target="iframe_a"&gt;Open in iframe&lt;/a&gt;</code></pre>
    `,
    initialCode: `<h3>Iframe Demo</h3>
<p>Here is a map embedded via iframe:</p>
<iframe 
  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.15%2C51.5%2C-0.1%2C51.52&layer=mapnik" 
  width="100%" 
  height="300" 
  style="border: 1px solid black">
</iframe>

<h3>Targeting Iframe</h3>
<p><a href="https://example.com" target="my-frame">Load Example.com info frame</a></p>
<iframe name="my-frame" width="100%" height="200" srcdoc="<p>Click the link above!</p>"></iframe>`
  },

  // Module 4: Tables and Data
  {
    id: 'html-11',
    title: 'Creating Basic Tables',
    category: 'Tables',
    duration: '15 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>HTML Tables</h2>
      <p>A table allows data to be arranged into rows and columns. It effectively displays tabular data like financial reports, calendars, or pricing lists.</p>

      <h3>Table Structure</h3>
      <ul>
        <li><code>&lt;table&gt;</code>: Defines the table.</li>
        <li><code>&lt;tr&gt;</code>: Defines a table row.</li>
        <li><code>&lt;th&gt;</code>: Defines a header cell (bold, centered).</li>
        <li><code>&lt;td&gt;</code>: Defines a data cell (regular left-aligned).</li>
      </ul>
      
      <h3>Borders</h3>
      <p>To add a border, use CSS. The <code>border</code> attribute on table tags is deprecated but still works in many places.</p>
      
      <h3>Cell Padding and Spacing</h3>
      <p>Controlled via CSS properties <code>padding</code> and <code>border-spacing</code>.</p>
      <br><br><br>
    `,
    initialCode: `<style>
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f2f2f2; color: black; }
</style>

<h3>Employees</h3>
<table>
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Role</th>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
    <td>Developer</td>
  </tr>
  <tr>
    <td>Jane</td>
    <td>Smith</td>
    <td>Designer</td>
  </tr>
</table>`
  },
  {
    id: 'html-12',
    title: 'Table Headers, Footers',
    category: 'Tables',
    duration: '15 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>Semantic Table Structure</h2>
      <p>For complex tables (and accessibility), you should group rows into three sections:</p>
      <ul>
         <li><code>&lt;thead&gt;</code>: Table Header. Wraps the header rows.</li>
         <li><code>&lt;tbody&gt;</code>: Table Body. Wraps the main data rows.</li>
         <li><code>&lt;tfoot&gt;</code>: Table Footer. Wraps the footer rows (like summaries, totals).</li>
      </ul>
      
      <p>The <code>&lt;caption&gt;</code> tag defines a table caption, which must be inserted immediately after the <code>&lt;table&gt;</code> tag.</p>
    `,
    initialCode: `<style>table { width: 100%; border: 1px solid #333; } th { background: #333; color: white; }</style>

<table>
  <caption>Monthly Savings</caption>
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>Total</th>
      <th>$180</th>
    </tr>
  </tfoot>
</table>`
  },
  {
    id: 'html-13',
    title: 'Merging Cells',
    category: 'Tables',
    duration: '20 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>Spanning Cells</h2>
      <p>Sometimes you want a cell to span multiple rows or columns.</p>
      
      <h3>Colspan</h3>
      <p>To make a cell span more than one column, use the <code>colspan</code> attribute.</p>
      <pre><code>&lt;th colspan="2"&gt;Telephone&lt;/th&gt;</code></pre>

      <h3>Rowspan</h3>
      <p>To make a cell span more than one row, use the <code>rowspan</code> attribute.</p>
      <pre><code>&lt;td rowspan="2"&gt;...&lt;/td&gt;</code></pre>
      <br><br><br>
    `,
    initialCode: `<style>table, th, td { border: 1px solid white; border-collapse: collapse; padding: 10px; }</style>

<!-- Complex Layout -->
<table>
  <tr>
    <th colspan="2">Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
  <tr>
    <th colspan="3">Contact Info</th>
  </tr>
  <tr>
    <td rowspan="2">Phone:</td>
    <td colspan="2">555-1234</td>
  </tr>
  <tr>
    <td colspan="2">555-4321</td>
  </tr>
</table>`
  },

  // Module 5: Forms & Input
  {
    id: 'html-14',
    title: 'Form Structure and Input Types',
    category: 'Forms',
    duration: '20 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>Working with Forms</h2>
      <p>The <code>&lt;form&gt;</code> element is used to create an HTML form for user input. It is the container for input elements like text fields, checkboxes, radio buttons, etc.</p>

      <h3>The Input Element</h3>
      <p>The <code>&lt;input&gt;</code> element is the most used form element. It can be displayed in many ways, depending on the <code>type</code> attribute.</p>

      <h3>Common Input Types</h3>
      <ul>
        <li><code>type="text"</code>: Standard single-line text field.</li>
        <li><code>type="password"</code>: Masked characters.</li>
        <li><code>type="email"</code>: Validates email format.</li>
        <li><code>type="number"</code>: Numeric input with spinners.</li>
        <li><code>type="date"</code>: Date picker.</li>
        <li><code>type="color"</code>: Color picker.</li>
        <li><code>type="range"</code>: Slider control.</li>
        <li><code>type="file"</code>: File uploader.</li>
      </ul>

      <h3>Action and Method</h3>
      <p>The <code>action</code> attribute defines where to send the form data on submit.</p>
      <p>The <code>method</code> attribute specifies the HTTP method (GET or POST).</p>
      <br><br><br>
    `,
    initialCode: `<form action="/submit-data">
  <h3>Register</h3>
  
  <label>Username:</label>
  <input type="text" name="user" placeholder="Enter username"><br><br>
  
  <label>Password:</label>
  <input type="password" name="pass"><br><br>
  
  <label>Birthday:</label>
  <input type="date" name="bday"><br><br>
  
  <label>Favorite Color:</label>
  <input type="color" name="favcolor"><br><br>
  
  <input type="submit" value="Sign Up">
</form>`
  },
  {
    id: 'html-15',
    title: 'Labels, Fieldsets',
    category: 'Forms',
    duration: '15 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>Accessibility and Grouping</h2>
      
      <h3>The Label Element</h3>
      <p>The <code>&lt;label&gt;</code> tag defines a label for many form elements. It is useful for screen reader users and also helps clickability (clicking the label focuses the input).</p>
      <p>To bind a label to an input, the <code>for</code> attribute of the label must match the <code>id</code> attribute of the input.</p>

      <h3>Fieldset and Legend</h3>
      <p>The <code>&lt;fieldset&gt;</code> element groups related data in a form, drawing a box around them.</p>
      <p>The <code>&lt;legend&gt;</code> element defines a caption for the fieldset.</p>
    `,
    initialCode: `<form>
 <fieldset>
  <legend>Personal Information:</legend>
  <label for="fname">First name:</label>
  <input type="text" id="fname" name="fname"><br><br>
  <label for="lname">Last name:</label>
  <input type="text" id="lname" name="lname"><br><br>
 </fieldset>
</form>`
  },
  {
    id: 'html-16',
    title: 'Form Validation',
    category: 'Forms',
    duration: '20 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>Client-Side Validation</h2>
      <p>HTML5 introduces built-in form validation, removing the need for JavaScript for simple checks.</p>
      
      <h3>Required Fields</h3>
      <p>The <code>required</code> attribute specifies that an input field must be filled out before submitting the form.</p>
      <pre><code>&lt;input type="text" required&gt;</code></pre>

      <h3>Input Constraints</h3>
      <ul>
        <li><code>min</code> / <code>max</code>: Specifies minimum and maximum values for numbers/dates.</li>
        <li><code>maxlength</code>: Specifies the maximum number of characters allowed.</li>
        <li><code>pattern</code>: Specifies a regular expression the value must match.</li>
      </ul>
      
      <h3>CSS Pseudo-classes</h3>
      <p>You can style valid/invalid inputs using CSS selectors:</p>
      <ul>
        <li><code>:valid</code></li>
        <li><code>:invalid</code></li>
      </ul>
    `,
    initialCode: '<form>\n  <label>Username (required):</label>\n  <input type="text" required placeholder="Required Field"><br><br>\n  <label>Age (18-100):</label>\n  <input type="number" min="18" max="100"><br><br>\n  <button>Submit</button>\n</form>'
  },
  {
    id: 'html-17',
    title: 'Select, Checkboxes, Radios',
    category: 'Forms',
    duration: '20 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>Selection Inputs</h2>
      <p>HTML provides several ways for users to select options from a set.</p>

      <h3>Radio Buttons</h3>
      <p>Radio buttons let a user select ONE of a limited number of choices. All radios in a group must share the same <code>name</code> attribute.</p>
      <pre><code>&lt;input type="radio" name="gender" value="male"&gt;</code></pre>

      <h3>Checkboxes</h3>
      <p>Checkboxes let a user select ZERO or MORE options of a limited number of choices.</p>
      <pre><code>&lt;input type="checkbox" name="vehicle" value="Bike"&gt;</code></pre>

      <h3>The Select Element</h3>
      <p>The <code>&lt;select&gt;</code> element defines a drop-down list. The <code>&lt;option&gt;</code> tags define the available options.</p>
    `,
    initialCode: '<form>\n  <h3>Select One (Radio)</h3>\n  <input type="radio" id="male" name="gender" value="male">\n  <label for="male">Male</label><br>\n  <input type="radio" id="female" name="gender" value="female">\n  <label for="female">Female</label><br>\n\n  <h3>Select Multiple (Checkbox)</h3>\n  <input type="checkbox" id="html" name="skills">\n  <label for="html">HTML</label><br>\n  <input type="checkbox" id="css" name="skills">\n  <label for="css">CSS</label><br>\n\n  <h3>Dropdown</h3>\n  <select name="cars">\n    <option value="volvo">Volvo</option>\n    <option value="saab">Saab</option>\n  </select>\n</form>'
  },

  // Module 6: Semantic HTML
  {
    id: 'html-18',
    title: 'Semantic Divs',
    category: 'Semantic HTML',
    duration: '15 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>Why Semantics Matter</h2>
      <p>Semantic elements = elements with a meaning. A <code>&lt;div&gt;</code> tells nothing about its content. A <code>&lt;form&gt;</code>, <code>&lt;table&gt;</code>, or <code>&lt;article&gt;</code> clearly defines its content.</p>

      <h3>Major Semantic Elements</h3>
      <ul>
        <li><code>&lt;header&gt;</code> - Defines a header for a document or section.</li>
        <li><code>&lt;nav&gt;</code> - Defines a set of navigation links.</li>
        <li><code>&lt;main&gt;</code> - Specifies the main content of a document.</li>
        <li><code>&lt;footer&gt;</code> - Defines a footer for a document or section.</li>
      </ul>
      
      <h3>Content Structure</h3>
      <ul>
        <li><code>&lt;section&gt;</code> - Defines a section in a document.</li>
        <li><code>&lt;article&gt;</code> - Defines independent, self-contained content.</li>
        <li><code>&lt;aside&gt;</code> - Defines content aside from the page content (like a sidebar).</li>
      </ul>
    `,
    initialCode: '<header>\n  <h1>Website Title</h1>\n  <nav><a href="#">Home</a> | <a href="#">About</a></nav>\n</header>\n<main>\n  <article>\n    <h2>Blog Post Title</h2>\n    <p>This is the main content of the article.</p>\n  </article>\n  <aside>\n    <h3>Sidebar</h3>\n    <p>Related links...</p>\n  </aside>\n</main>\n<footer>\n  <p>Copyright 2024</p>\n</footer>'
  },
  {
    id: 'html-19',
    title: 'Articles vs Sections',
    category: 'Semantic HTML',
    duration: '15 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>Choosing the Right Tag</h2>
      <p>It can be confusing to know when to use <code>&lt;article&gt;</code> vs <code>&lt;section&gt;</code>.</p>

      <h3>The &lt;article&gt; Element</h3>
      <p>Use <code>&lt;article&gt;</code> for independent, self-contained content that makes sense on its own. Examples: Forum post, Blog post, News story.</p>

      <h3>The &lt;section&gt; Element</h3>
      <p>Use <code>&lt;section&gt;</code> to group thematically related content. A rule of thumb is that a section should typically have a heading.</p>
      
      <h3>Nesting</h3>
      <p>You can nest sections inside articles, and articles inside sections.</p>
    `,
    initialCode: '<section>\n  <h2>Latest News</h2>\n  <article>\n    <h3>News Item 1</h3>\n    <p>Details about news item 1...</p>\n  </article>\n  <article>\n    <h3>News Item 2</h3>\n    <p>Details about news item 2...</p>\n  </article>\n</section>'
  },
  {
    id: 'html-20',
    title: 'Footer and Address',
    category: 'Semantic HTML',
    duration: '10 min',
    level: Difficulty.EASY,
    content: `
      <h2>The Footer Element</h2>
      <p>The <code>&lt;footer&gt;</code> element defines a footer for a document or section. It often contains:</p>
      <ul>
        <li>Authorship information</li>
        <li>Copyright information</li>
        <li>Contact information</li>
        <li>Sitemap</li>
      </ul>

      <h3>The Address Element</h3>
      <p>The <code>&lt;address&gt;</code> tag defines the contact information for the author/owner of a document or an article. The text in the <code>&lt;address&gt;</code> element is usually rendered in italic.</p>
    `,
    initialCode: '<footer>\n  <p>Written by: John Doe</p>\n  <address>\n    Contact us at: <a href="mailto:john@example.com">john@example.com</a><br>\n    Box 564, Disneyland<br>\n    USA\n  </address>\n</footer>'
  },

  // Module 7: Advanced HTML5 Attributes
  {
    id: 'html-21',
    title: 'Global Attributes',
    category: 'Advanced HTML',
    duration: '15 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>Common Attributes</h2>
      <p>Global attributes are attributes common to all HTML elements; they can be used on all elements, though they may have no effect on some.</p>

      <h3>Identification & Styling</h3>
      <ul>
        <li><code>id</code> - Specifies a unique id for an element.</li>
        <li><code>class</code> - Specifies one or more classnames for an element.</li>
        <li><code>style</code> - Specifies an inline CSS style for an element.</li>
      </ul>

      <h3>Interaction</h3>
      <ul>
        <li><code>contenteditable</code> - Specifies whether the content of an element is editable or not.</li>
        <li><code>hidden</code> - Specifies that an element is not yet, or is no longer, relevant.</li>
        <li><code>title</code> - Specifies extra information about an element (tooltip).</li>
      </ul>
    `,
    initialCode: '<div class="card" id="main-card">\n  <h2 title="I am a header">Hover Me</h2>\n  <p contenteditable="true" style="border: 1px dashed white; padding: 5px;">\n    Click here to edit this text directly in the browser!\n  </p>\n  <p hidden>You cannot see me.</p>\n</div>'
  },
  {
    id: 'html-22',
    title: 'Data Attributes',
    category: 'Advanced HTML',
    duration: '20 min',
    level: Difficulty.HARD,
    content: `
      <h2>Custom Data Storage</h2>
      <p>The <code>data-*</code> attributes are used to store custom data private to the page or application. This is essential for building complex web applications.</p>

      <h3>Syntax</h3>
      <p>The attribute name must start with <code>data-</code> and contain only lowercase letters, numbers, dashes, dots, colons or underscores.</p>
      <pre><code>&lt;div data-user-id="123"&gt;...&lt;/div&gt;</code></pre>

      <h3>Accessing with JavaScript</h3>
      <p>You can read these values using the <code>dataset</code> property in JavaScript.</p>
      <pre><code>const id = element.dataset.userId; // "123"</code></pre>
    `,
    initialCode: '<ul>\n  <li data-animal-type="bird" data-sound="Tweet">Owl</li>\n  <li data-animal-type="fish" data-sound="Blub">Salmon</li>\n  <li data-animal-type="spider" data-sound="Silence">Tarantula</li>\n</ul>\n\n<script>\n  // Click handling would go here\n</script>'
  },
  {
    id: 'html-23',
    title: 'Accessibility Basics',
    category: 'Accessibility',
    duration: '25 min',
    level: Difficulty.HARD,
    content: `
      <h2>What is Web Accessibility?</h2>
      <p>Web accessibility (a11y) means designing websites so that they can be used by people with disabilities.</p>

      <h3>Semantic HTML</h3>
      <p>The first step to accessibility is using the correct HTML elements (nav, button, header) instead of generic divs. Screen readers rely on this structure.</p>

      <h3>ARIA Roles</h3>
      <p>WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) specifies ways to make Web content more accessible.</p>
      <ul>
         <li><code>aria-label</code>: Defines a string that labels the current element.</li>
         <li><code>role</code>: Defines the type of element (e.g. <code>role="alert"</code>).</li>
      </ul>
      
      <h3>Alt Text</h3>
      <p>Always provide text alternatives for non-text content (images).</p>
    `,
    initialCode: '<button aria-label="Close Menu" onclick="alert(\'closed\')">X</button>\n\n<div role="alert" style="border: 1px solid red; padding: 10px;">\n  This is an important alert message.\n</div>'
  },
  {
    id: 'html-24',
    title: 'SEO Best Practices',
    category: 'SEO',
    duration: '20 min',
    level: Difficulty.MEDIUM,
    content: `
      <h2>Search Engine Optimization</h2>
      <p>Good HTML structure is the foundation of technical SEO.</p>

      <h3>Title and Meta Description</h3>
      <p>The <code>&lt;title&gt;</code> tag is the most important tag for SEO. The meta description summarizes the page content for search results.</p>

      <h3>Heading Hierarchy</h3>
      <p>Use <code>&lt;h1&gt;</code> for the main title (only one per page). Use <code>&lt;h2&gt;</code>-<code>&lt;h6&gt;</code> for subsections. Do not skip levels.</p>

      <h3>Link Text</h3>
      <p>Links should be descriptive. Avoid "click here". Instead use "Read our annual report".</p>
    `,
    initialCode: '<head>\n  <title>Essential HTML for SEO Guide</title>\n  <meta name="description" content="Learn how to structure your HTML for better search engine rankings.">\n</head>\n<body>\n  <h1>SEO Best Practices</h1>\n  <h2>1. Use Semantic HTML</h2>\n  <p>...</p>\n</body>'
  }
];

export const TUTORIALS: Tutorial[] = [
  {
    id: 'course-html',
    title: 'Complete HTML & HTML5 Masterclass',
    category: 'Web Development',
    duration: '6 Hours',
    level: Difficulty.EASY
  }
];

export const LEADERBOARD = [];

export const USER_STATS: UserStats = {
  rank: 0,
  solvedCount: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  rating: 0,
  points: 0,
  username: 'johndoe_codes',
  fullName: 'John Doe',
  bio: '"Passionate competitive programmer exploring the depths of dynamic programming and graph theory. Always looking for a challenge."',
  location: 'San Francisco, CA',
  website: 'johndoe.dev',
  email: 'john@example.com',
  joinedDate: 'Joined May 2024',
  skills: ['C++', 'Java', 'Python', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  avatarUrl: 'https://picsum.photos/seed/currentuser/128/128'
};
