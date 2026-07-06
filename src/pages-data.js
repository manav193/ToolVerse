module.exports = [
  {
    slug: 'about',
    title: 'About ToolVerse',
    metaTitle: 'About Us | ToolVerse',
    metaDescription: 'Learn about ToolVerse, our mission to provide free online tools for everyone without compromising privacy.',
    contentHTML: `
      <h2>Our Mission</h2>
      <p>At ToolVerse, our mission is simple: provide a comprehensive suite of high-quality, completely free online tools for everyone. Whether you're a student, developer, professional, or just someone who needs to resize an image quickly, ToolVerse is here to help.</p>
      
      <h2>Why Free?</h2>
      <p>We believe that essential utility tools shouldn't be hidden behind paywalls or require account registrations. By offering these tools for free, we aim to make everyday tasks easier and more accessible to people worldwide.</p>
      
      <h2>Your Privacy First</h2>
      <p>One of the core philosophies of ToolVerse is privacy. The majority of our tools operate entirely on the client-side, meaning your data (images, PDFs, text) never leaves your browser. We don't upload your files to our servers, ensuring your sensitive information remains secure and private.</p>
    `
  },
  {
    slug: 'contact',
    title: 'Contact Us',
    metaTitle: 'Contact Us | ToolVerse',
    metaDescription: 'Get in touch with the ToolVerse team for support, feedback, or feature requests.',
    contentHTML: `
      <p>Have a question, suggestion, or found a bug? We'd love to hear from you!</p>
      
      <div style="margin-top: 2rem;">
        <form id="contact-form" onsubmit="event.preventDefault(); alert('Message sent successfully!'); this.reset();">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label" for="name">Name</label>
            <input type="text" id="name" class="form-input" style="width: 100%; padding: 0.5rem;" required>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label" for="email">Email</label>
            <input type="email" id="email" class="form-input" style="width: 100%; padding: 0.5rem;" required>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label" for="message">Message</label>
            <textarea id="message" class="form-input" rows="5" style="width: 100%; padding: 0.5rem;" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
      </div>
    `
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy | ToolVerse',
    metaDescription: 'Read the ToolVerse Privacy Policy to understand how we protect your data.',
    contentHTML: `
      <p>Last updated: October 2023</p>
      
      <h2>1. Data Collection</h2>
      <p>ToolVerse is designed with privacy in mind. We do not require you to create an account or provide personal information to use our tools. The majority of our tools, especially image and text processors, run entirely within your web browser (client-side processing). This means your files are not uploaded to our servers.</p>
      
      <h2>2. Cookies and Analytics</h2>
      <p>We use essential cookies to ensure our website functions correctly. We may also use anonymous analytics to understand how visitors use our site, which helps us improve our tools.</p>
      
      <h2>3. Third-Party Ads</h2>
      <p>ToolVerse is supported by advertising. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.</p>
    `
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    metaTitle: 'Terms of Service | ToolVerse',
    metaDescription: 'Terms of Service for using ToolVerse free online tools.',
    contentHTML: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using ToolVerse, you agree to be bound by these Terms of Service.</p>
      
      <h2>2. Use of Service</h2>
      <p>ToolVerse provides free online tools for personal and commercial use. You agree not to misuse the services or help anyone else to do so.</p>
      
      <h2>3. Disclaimer of Warranties</h2>
      <p>The tools and information on ToolVerse are provided "as is" without warranty of any kind. We do not guarantee the accuracy, completeness, or reliability of any tool results.</p>
      
      <h2>4. Limitation of Liability</h2>
      <p>ToolVerse shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.</p>
    `
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    metaTitle: 'Disclaimer | ToolVerse',
    metaDescription: 'Disclaimer for ToolVerse tools and services.',
    contentHTML: `
      <p>The information and tools provided by ToolVerse on https://toolverse.com are for general informational and utility purposes only.</p>
      
      <h2>Not Professional Advice</h2>
      <p>The calculators (e.g., BMI, Financial) and tools are provided for convenience and estimate purposes. They do not substitute for professional medical, financial, or legal advice. Always consult with a qualified professional for specific advice.</p>
      
      <h2>External Links</h2>
      <p>Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with ToolVerse. Please note that ToolVerse does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
    `
  },
  {
    slug: 'sitemap',
    title: 'Sitemap',
    metaTitle: 'Sitemap | ToolVerse',
    metaDescription: 'Directory of all free online tools available on ToolVerse.',
    contentHTML: `
      <p>Find all the tools available on ToolVerse below.</p>
      
      <div class="sitemap-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem;">
        {{TOOL_LINKS}}
      </div>
      
      <h2 style="margin-top: 3rem;">Pages</h2>
      <ul>
        <li><a href="../index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Contact Us</a></li>
        <li><a href="privacy-policy.html">Privacy Policy</a></li>
        <li><a href="terms.html">Terms of Service</a></li>
        <li><a href="disclaimer.html">Disclaimer</a></li>
      </ul>
    `
  }
];
