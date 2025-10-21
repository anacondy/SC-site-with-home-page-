# Ramsey's Legal Archive

A modern, responsive web application showcasing landmark Supreme Court of India judgments with detailed legal analysis. The project features a clean, minimalist design with a frosted glass effect and comprehensive dark/light mode support.

🌐 **Live Site**: [https://anacondy.github.io/SC-site-with-home-page-/](https://anacondy.github.io/SC-site-with-home-page-/)

## 🌟 Features

### 📱 Fully Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes from smartphones (320px) to large desktops (1200px+)
- **Adaptive Layouts**: Timeline, arguments grid, and justice sections automatically adjust for smaller screens
- **Touch-Friendly**: Large tap targets and optimized spacing for mobile devices

### 🎨 Theme Switcher
- **Light & Dark Modes**: Seamlessly switch between light and dark themes
- **System Preference Detection**: Automatically detects and applies OS-level theme preference
- **Persistent Choice**: Remembers your theme preference using localStorage
- **Smooth Transitions**: All theme changes are animated for a polished experience

### 🏛️ Case Archive
Current landmark cases include:
1. **Electoral Bond Case (2024)**: ADR v. Union of India - Struck down Electoral Bond Scheme
2. **Waqf Tribunal Jurisdiction (2023)**: Maharashtra Waqf Board v. Shaikh Chawla - Clarified tribunal jurisdiction
3. **Kesavananda Bharati (1973)**: Established the Basic Structure doctrine of the Constitution

Each case includes:
- Detailed case information (parties, judges, timeline)
- Comprehensive arguments from both sides
- Interactive timeline of case progression
- Court's analysis and reasoning
- Final verdict and ratio decidendi
- Visual representation of judges' opinions

### 🎯 Interactive Elements
- **Navigation Controls**: Browser-style back, forward, and refresh buttons
- **Hamburger Menu**: Quick access to About page
- **Easter Egg**: Hidden surprise in the close (X) button
- **Smooth Scrolling**: Enhanced reading experience
- **Frosted Glass Effect**: Modern UI with backdrop blur

### 🔒 Security Features
- **Security Headers**: X-Content-Type-Options and Referrer-Policy meta tags
- **No External Scripts**: All JavaScript is inline for better security audit
- **HTTPS-Ready**: Designed to work seamlessly with HTTPS deployment

## 📸 Screenshots

### Light Mode
![Homepage Light Mode](https://github.com/user-attachments/assets/80300960-a5c0-4a61-9a36-f064e90c685a)

### Dark Mode
![Homepage Dark Mode](https://github.com/user-attachments/assets/4362a3d7-f6e5-4a04-a40f-3f3ae8b6ddb5)

### Mobile Responsive
![Mobile View](https://github.com/user-attachments/assets/fc47be0c-2916-40ce-9c2f-e5dbc263c85b)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anacondy/SC-site-with-home-page-.git
   cd SC-site-with-home-page-
   ```

2. **Open in browser**
   
   Simply open `index.html` in your web browser, or use a local server:

   **Using Python:**
   ```bash
   python3 -m http.server 8080
   ```
   Then navigate to `http://localhost:8080`

   **Using Node.js:**
   ```bash
   npx http-server -p 8080
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8080
   ```

## 📁 Project Structure

```
SC-site-with-home-page-/
├── index.html                  # Homepage with case listings
├── electoralbonds.html         # Electoral Bond Case details
├── waqf-case.html             # Waqf Tribunal Case details
├── kesavananda-bharati.html   # Kesavananda Bharati Case details
├── about.html                 # About and support page
├── style.css                  # Main stylesheet with responsive design
└── README.md                  # This file
```

## 🎨 Design Philosophy

### Color Scheme
- **Light Mode**: Clean whites with subtle grays and blue accents
- **Dark Mode**: Dark backgrounds (#1a1a1a) with yellow highlights for better readability
- **Accent Colors**: Crimson red for "v." in case names, purple for dates

### Typography
- **Font Family**: Inter (sans-serif) for modern, clean readability
- **Responsive Sizes**: Font sizes scale appropriately across device sizes
- **Line Height**: Optimized at 1.7-1.8 for comfortable reading

### Layout
- **Frosted Glass Cards**: Semi-transparent content cards with backdrop blur
- **Fixed Navigation**: Always-accessible top navigation bar
- **Spacious Padding**: Generous whitespace for comfortable reading
- **Visual Hierarchy**: Clear distinction between headings, body text, and metadata

## 🔧 Customization

### Adding a New Case

1. **Add entry to index.html**:
   ```html
   <div class="article-entry">
       <h2><a href="your-case.html">Case Name <span class="v-text">v.</span> Respondent</a></h2>
       <p class="article-summary">Brief summary of the case...</p>
       <span class="article-date">Date</span>
   </div>
   ```

2. **Create case detail page**: Copy an existing case HTML file and modify the content following the established structure.

### Modifying Theme Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --text-color: #333333;
    --link-color: #007bff;
    --v-color: #DC143C;
    /* ... other variables */
}

body.dark-mode {
    --text-color: #e0e0e0;
    --link-color: #FFFF00;
    /* ... other variables */
}
```

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1199px
- **Large Desktop**: 1200px+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Contribution Guidelines
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available for educational purposes. All case information is derived from public records and court judgments.

## ⚖️ Legal Disclaimer

**Shreya Singhal v. Union of India (2015)**

The information presented on this website constitutes fair reporting and analysis of judicial pronouncements, which are matters of public record. The content herein is intended for informational and educational purposes only. 

In accordance with the principles upheld in *Shreya Singhal v. Union of India*, which struck down Section 66A of the Information Technology Act, 2000 as violative of Article 19(1)(a) of the Constitution, the dissemination of such information is protected under the fundamental right to freedom of speech and expression. 

This website does not provide legal advice, and the content should not be construed as such. Reliance on any information provided herein is solely at the user's own risk.

## 👥 Authors

- **Puppy pilot**
- **anacondy**

## 🙏 Acknowledgments

- Supreme Court of India for making judgments publicly accessible
- All the legal professionals and researchers who document and analyze these cases
- The open-source community for inspiration and tools

## 📮 Support & Feedback

If you find this project useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs or issues
- 💡 Suggesting new features or cases to add
- 📧 Sending feedback

---

**Note**: This is an educational project showcasing web development skills and legal research. It is not affiliated with any official legal institution.

Made with ⚖️ by Puppy pilot & anacondy
