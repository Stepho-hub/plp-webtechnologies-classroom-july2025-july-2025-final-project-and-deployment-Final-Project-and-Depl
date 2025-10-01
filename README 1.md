# Somtech Technologies Website

A professional, responsive website for Somtech Technologies - a leading manufacturer of household disinfectants and provider of comprehensive cleaning services.

## 🏢 About Somtech Technologies

Somtech Technologies specializes in:
- **Manufacturing**: Premium household disinfectants and cleaning products
- **Services**: Industrial, commercial, and environmental cleaning solutions
- **Expertise**: Professional cleaning with eco-friendly and safety-focused approaches

## 🌟 Features

### Core Website Features
- **Multi-page responsive design** with consistent branding across all pages
- **Interactive hero image slider** with smooth transitions and touch/swipe support
- **Mobile-first responsive design** optimized for all device sizes
- **Professional contact form** with real-time validation and user feedback
- **Product filtering system** with smooth animations and category-based organization
- **Smooth scrolling navigation** with active page highlighting
- **Accessibility features** including skip links and keyboard navigation support

### Technical Features
- **Pure HTML5, CSS3, and JavaScript** - No external dependencies
- **Semantic HTML structure** for better SEO and accessibility
- **CSS Grid and Flexbox** for modern, flexible layouts
- **Intersection Observer API** for scroll-triggered animations
- **Debounced scroll handlers** for optimized performance
- **Touch/swipe gestures** for mobile slider interaction
- **Form validation** with regex patterns and visual feedback

## 📁 File Structure

```
somtech-website/
├── index.html              # Home page with hero slider and company intro
├── services.html           # Detailed services page (Industrial, Commercial, Environmental)
├── products.html           # Product catalog with filtering functionality
├── contact.html           # Contact form and company information
├── css/
│   └── style.css          # Comprehensive stylesheet with CSS variables
├── js/
│   └── script.js          # All JavaScript functionality and interactions
└── README.md              # Project documentation (this file)
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Professional, trustworthy
- **Secondary Green**: `#059669` - Eco-friendly, clean
- **Accent Orange**: `#f59e0b` - Call-to-action highlights
- **Success Green**: `#22c55e` - Positive feedback
- **Error Red**: `#ef4444` - Form validation errors
- **Neutral Grays**: Complete range from `#f9fafb` to `#111827`

### Typography
- **Font Family**: System font stack for optimal performance
- **Scale**: Responsive type scale from 0.75rem to 3rem
- **Weight**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Height**: 1.6 for body text, 1.2 for headings

### Spacing System
- **8px Grid System**: All spacing values are multiples of 8px
- **CSS Variables**: Consistent spacing from `--space-1` (4px) to `--space-24` (96px)
- **Responsive**: Spacing scales appropriately across device sizes

## 📱 Responsive Breakpoints

### Mobile First Approach
- **Extra Small**: 320px - 480px (Primary mobile)
- **Small**: 481px - 768px (Large mobile/Small tablet)  
- **Medium**: 769px - 1024px (Tablet/Small desktop)
- **Large**: 1025px+ (Desktop)

### Key Responsive Features
- **Mobile navigation**: Hamburger menu with smooth animations
- **Touch-friendly**: Larger tap targets and swipe gestures
- **Readable typography**: Optimized font sizes for each breakpoint
- **Flexible layouts**: Grid and flexbox adapt to screen size
- **Performance optimized**: Smaller images and optimized animations on mobile

## 🚀 Deployment Options

### Netlify
1. Drag and drop the project folder to [Netlify Deploy](https://app.netlify.com/drop)
2. Or connect your GitHub repository for continuous deployment
3. Custom domain and SSL included automatically

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts for deployment
4. Or connect GitHub repository via Vercel dashboard

### GitHuub pages:
1. Push your project from local directory to your repository.
2. Ensure your repo is public. Move to settings and click select pages from side bar.
3. Follow instructions on how to finalize it.

### Live link: https://stepho-hub.github.io/plp-webtechnologies-classroom-july2025-july-2025-final-project-and-deployment-Final-Project-and-Depl/


### Traditional Web Hosting
1. Upload all files to your web hosting provider
2. Ensure `index.html` is in the root directory
3. All relative paths will work correctly


## 💻 Development Setup

### Local Development
1. **Clone or download** the project files
2. **Open `index.html`** in a modern web browser
3. **For development server** (optional):
   ```bash
   # Using Node.js http-server
   npx http-server . -p 3000
   
   # Using Python
   python -m http.server 3000
   ```

### Browser Compatibility
- **Modern browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Features**: CSS Grid, Flexbox, Intersection Observer, ES6+

## 🛠️ Customization Guide

### Branding Updates
1. **Colors**: Modify CSS variables in `:root` selector in `style.css`
2. **Logo**: Update company name in `.nav-logo h1` across all HTML files
3. **Content**: Update text content in HTML files
4. **Images**: Replace image URLs with your own (hosted on CDN or locally)

### Content Management
- **Services**: Edit service descriptions in `services.html`
- **Products**: Update product information in `products.html`
- **Contact**: Modify contact details in `contact.html` and footer sections
- **About**: Update company information in `index.html`

### Adding New Pages
1. Create new HTML file following the existing structure
2. Include header and footer sections for consistency
3. Add navigation link to all existing pages
4. Update active navigation logic in `script.js`

## 🔧 JavaScript Functionality

### Core Features
- **Mobile Navigation**: Hamburger menu with touch support
- **Image Slider**: Auto-advancing with manual controls and touch/swipe
- **Form Validation**: Real-time validation with visual feedback
- **Product Filtering**: Category-based filtering with animations
- **Smooth Scrolling**: Enhanced navigation experience
- **Scroll Animations**: Intersection Observer for element animations

### Performance Optimizations
- **Debounced scroll handlers** to reduce CPU usage
- **Lazy loading preparation** for images (easily extendable)
- **Efficient DOM queries** with utility functions
- **Event delegation** where appropriate
- **Memory cleanup** on page unload

## 📞 Contact Information

**Somtech Technologies**
- 📍 53 Butere Road, Business City, 3rd Floor
- 📞 Main: (+254) 0746852868
- 📞 Emergency: (254) 746852868
- ✉️ Email: somtechhub@gmai.com
- ⏰ Hours: Monday-Friday 7:00 AM - 6:00 PM

## 📄 License

This website template is created for Somtech Technologies. All content, design, and branding elements are proprietary. The code structure and techniques may be adapted for other projects with appropriate modifications.

---

**Built with** ❤️ **for professional cleaning excellence**

*Last updated: September 2025*