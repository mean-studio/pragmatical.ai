# Pragmatical AI - Beyond the Hype

A modern, mobile-friendly static website for Pragmatical AI, focused on delivering AI implementations with tangible results.

## 🚀 Features

- **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Static Site** - No backend required, perfect for Cloudflare Pages
- **SEO Optimized** - Includes meta tags, sitemap, and robots.txt
- **Security Headers** - Pre-configured security headers for Cloudflare
- **Fast Loading** - Minimal dependencies, optimized performance

## 📁 Project Structure

```
pragmatical.ai/
├── public/               # Static files (ready for deployment)
│   ├── index.html       # Main landing page
│   ├── css/
│   │   └── style.css    # All styles
│   ├── js/
│   │   └── main.js      # Interactive functionality
│   ├── robots.txt       # SEO crawling rules
│   └── sitemap.xml      # SEO sitemap
├── _headers             # Cloudflare Pages security headers
├── _redirects           # Cloudflare Pages redirect rules
└── wrangler.toml        # Cloudflare configuration
```

## 🌐 Deployment to Cloudflare Pages

### Option 1: Via Git Integration (Recommended)

1. Push this repository to GitHub/GitLab
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Navigate to **Pages** → **Create a project**
4. Select **Connect to Git**
5. Choose your repository
6. Configure build settings:
   - **Build command:** (leave empty)
   - **Build output directory:** `/public`
7. Click **Save and Deploy**

### Option 2: Direct Upload

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Deploy directly:
   ```bash
   wrangler pages deploy public
   ```

### Option 3: Drag and Drop

1. Go to Cloudflare Pages dashboard
2. Click **Create a project** → **Direct Upload**
3. Drag and drop the `public` folder
4. Click **Deploy**

## 🛠️ Local Development

To preview the site locally, you can use any static file server:

### Using Python:
```bash
cd public
python3 -m http.server 8000
```

### Using Node.js (http-server):
```bash
npx http-server public -p 8000
```

### Using Wrangler:
```bash
wrangler pages dev public
```

Then open http://localhost:8000 in your browser.

## 🎨 Customization

### Colors
Edit CSS variables in `public/css/style.css`:
```css
:root {
    --primary-color: #FFA500;
    --secondary-color: #FF8C00;
    --dark-bg: #1a1a1a;
    /* ... more variables */
}
```

### Content
- **Company Info:** Edit `public/index.html`
- **Email:** Update contact email in the Contact section
- **Legal Info:** Add your terms, privacy policy links in the footer

### Form Submission
The contact form currently logs to console. To enable real form submission:

1. **Use Cloudflare Forms** (built-in)
2. **Use Formspree:** Add `action="https://formspree.io/f/YOUR_ID"` to the form
3. **Use Cloudflare Workers:** Create a serverless function to handle submissions
4. **Use third-party services:** EmailJS, Basin, etc.

## 📱 Mobile Support

The site is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 769px - 1024px
- Desktop: > 1024px

## 🔒 Security

Pre-configured security headers in `_headers`:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## 📊 Analytics

To add analytics, insert your tracking code in `public/index.html` before `</head>`:

**Cloudflare Web Analytics:**
```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

**Google Analytics:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

## 🤝 Contributing

This is a company website. Please coordinate any changes with the team.

## 📄 License

© 2025 Pragmatical AI. All rights reserved.

## 🆘 Support

For issues or questions, contact: contact@pragmatical.ai
