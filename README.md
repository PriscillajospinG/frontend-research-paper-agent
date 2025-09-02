# IEEE Paper Generation Agent Ecosystem

A comprehensive AI-powered frontend application for generating IEEE-compliant research papers, managing citations, and assisting with academic research workflows.

## 🚀 Features

- **AI-Powered Paper Generation**: Generate complete IEEE-format research papers with AI assistance
- **Research Assistant**: Search and discover relevant papers and citations
- **Template Library**: Pre-built IEEE conference and journal templates
- **Citation Management**: Generate citations in multiple formats (IEEE, APA, MLA, Chicago)
- **Paper Management**: Track and organize your research papers and publications
- **Analytics Dashboard**: Monitor your research progress and publication metrics
- **Responsive Design**: Modern, mobile-friendly interface built with React and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19.x
- **Styling**: Tailwind CSS 3.x
- **Build Tool**: Create React App
- **Icons**: Heroicons (SVG)
- **State Management**: React Hooks

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18.x or higher)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/PriscillajospinG/frontend-research-paper-agent.git
cd frontend-research-paper-agent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js              # Main navigation header
│   ├── Sidebar.js             # Navigation sidebar
│   ├── MainContent.js         # Content area router
│   ├── Footer.js              # Footer component
│   └── sections/
│       ├── Dashboard.js       # Main dashboard
│       ├── GeneratePaper.js   # Paper generation wizard
│       ├── Templates.js       # IEEE template library
│       ├── ResearchAssistant.js # Research and citation tools
│       ├── MyPapers.js        # Paper management
│       ├── Citations.js       # Citation generator
│       ├── Analytics.js       # Progress analytics
│       └── Settings.js        # User preferences
├── App.js                     # Main application component
├── index.js                   # Application entry point
└── index.css                  # Global styles with Tailwind
```

## 🎯 Available Features

### 1. Dashboard
- Overview of research activity
- Quick action buttons
- Recent papers summary
- Statistics and metrics

### 2. Generate Paper
- Step-by-step paper generation wizard
- Topic selection and keywords
- Automatic content generation
- IEEE format compliance

### 3. Research Assistant
- Literature search functionality
- Citation discovery
- Research tools and resources
- Reference management

### 4. Templates
- IEEE Conference Paper template
- IEEE Journal Article template  
- IEEE Letter template
- IEEE Survey Paper template

### 5. My Papers
- Paper library management
- Status tracking (Draft, In Review, Published)
- Citation and download metrics

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Theme**: Professional academic interface
- **Interactive Elements**: Hover effects, transitions, and animations
- **Accessibility**: Screen reader friendly, keyboard navigation
- **Modern Layout**: Clean, professional design suitable for academic use

## 🔧 Available Scripts

### Development
```bash
npm start          # Start development server
npm test           # Run test suite
npm run build      # Build for production
npm run eject      # Eject from Create React App (irreversible)
```

### Production Build
```bash
npm run build
```
Creates a `build` folder with optimized production files.

## 🚀 Deployment

The app can be deployed to various platforms:

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `npm run build` and deploy the build folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/PriscillajospinG/frontend-research-paper-agent/issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🙏 Acknowledgments

- IEEE for the formatting standards
- React team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Heroicons for the beautiful icon set

---

Built with ❤️ for the academic research community

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
