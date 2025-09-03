# Research Paper Agent Frontend

🤖 **Autonomous AI-Powered Research Paper Generation System**

A modern React frontend that connects to an intelligent backend system featuring multiple AI agents working together to generate high-quality research papers automatically.

## 🎯 What This Does

This system automatically generates complete research papers by:
1. **Analyzing your topic** - Understanding what you want to research
2. **Finding relevant sources** - Searching the web for academic references
3. **Writing content** - Creating sections like introduction, methodology, results
4. **Formatting properly** - Ensuring IEEE/ACM/APA compliance
5. **Real-time monitoring** - Showing you exactly what each AI agent is doing

## ✨ Key Features

### 🤖 **Multi-Agent AI System**
- **Draft Refiner**: Improves your existing content
- **Web Researcher**: Finds relevant academic sources automatically
- **Content Writer**: Creates paper sections and content
- **Format Enforcer**: Ensures proper academic formatting

### 📊 **Real-Time Monitoring**
- Watch AI agents work in real-time via WebSocket connections
- Visual progress tracking for each processing step
- Live status updates and logging

### 📁 **Smart File Handling**
- Drag-and-drop file uploads (PDF, DOCX, TXT)
- Upload your own draft to improve it
- Upload format templates for custom styling
- Download in multiple formats (DOCX, PDF, LaTeX)

### 🏥 **System Health Dashboard**
- Monitor backend connectivity
- Check system status and services
- View processing statistics

## 🚀 Quick Start Guide

### Step 1: Prerequisites

Make sure you have these installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Step 2: Setup Frontend

```bash
# Clone this repository
git clone https://github.com/PriscillajospinG/frontend-research-paper-agent.git
cd frontend-research-paper-agent

# Install dependencies
npm install

# Start the frontend (will run on http://localhost:3000)
npm start
```

### Step 3: Setup Backend (Required!)

**⚠️ Important**: You need the backend running for this to work!

The backend should be running on `http://localhost:8000`. If your backend runs on a different port, update the `.env` file:

```bash
# Edit .env file
REACT_APP_API_URL=http://localhost:YOUR_BACKEND_PORT
```

## 📖 How to Use

### 1. **Check System Status**
- Open http://localhost:3000
- Go to **Dashboard** to verify backend connection
- Green indicators = everything working ✅
- Red indicators = backend not running ❌

### 2. **Generate Your First Paper**

#### Option A: Start from scratch
1. Click **"Generate Paper"** in the sidebar
2. Enter your research topic (e.g., "Machine Learning in Healthcare")
3. Choose paper type (Conference, Journal, etc.)
4. Select format (IEEE, ACM, APA, MLA)
5. Pick required sections
6. Click **"Generate Paper"**

#### Option B: Improve existing content
1. Go to **"Generate Paper"**
2. Enter your topic
3. **Upload your draft** (PDF, DOCX, or TXT file)
4. Optionally upload format templates
5. Click **"Generate Paper"**

### 3. **Monitor Progress**
- Watch the **Agent Monitor** in real-time
- See which agent is currently working
- View processing logs and status updates
- Get estimated completion time

### 4. **Download Results**
- Once complete, download in your preferred format:
  - **DOCX** - For editing in Microsoft Word
  - **PDF** - For sharing and submission
  - **LaTeX** - For academic journal submission

## 🔧 Configuration

### Environment Variables (`.env` file)

```env
# Backend API URL (where your Python backend is running)
REACT_APP_API_URL=http://localhost:8000

# WebSocket URL for real-time updates
REACT_APP_WS_URL=ws://localhost:8000

# Application settings
REACT_APP_NAME=Research Paper Agent
REACT_APP_VERSION=1.0.0

# Feature toggles
REACT_APP_ENABLE_REAL_TIME_MONITORING=true
REACT_APP_ENABLE_FILE_UPLOAD=true
REACT_APP_ENABLE_MULTI_FORMAT_EXPORT=true
```

## � Troubleshooting

### Problem: "Connection Failed" or Red Status Indicators

**Solution**: Your backend isn't running or isn't accessible.

1. **Check if backend is running**:
   ```bash
   # Test if backend is responding
   curl http://localhost:8000/health
   # Should return: {"status":"healthy",...}
   ```

2. **Start your backend**:
   ```bash
   # Navigate to your backend directory
   cd ../backend-research-paper-agent
   
   # Start the backend (example commands)
   python -m uvicorn app:app --reload --port 8000
   # OR
   python app.py
   ```

3. **Check port configuration**:
   - Ensure backend runs on port 8000
   - Or update `REACT_APP_API_URL` in `.env` file

### Problem: File Upload Not Working

**Cause**: File too large or wrong format

**Solution**: 
- Max file size: 50MB
- Supported formats: PDF, DOCX, TXT (for drafts), JSON, DOCX (for formats)

### Problem: WebSocket Connection Issues

**Cause**: Network or backend WebSocket not enabled

**Solution**:
1. Check browser console for errors
2. Ensure backend WebSocket endpoints are working
3. Try refreshing the page

## 🏗️ Project Structure

```
frontend-research-paper-agent/
├── src/
│   ├── components/
│   │   ├── AgentMonitor.js      # Real-time agent monitoring
│   │   ├── FileUpload.js        # File upload with drag-and-drop
│   │   ├── PaperGenerator.js    # Main paper generation workflow
│   │   └── sections/
│   │       ├── Dashboard.js     # System health and overview
│   │       └── GeneratePaper.js # Paper generation interface
│   ├── services/
│   │   └── api.js              # Backend API communication
│   └── App.js                  # Main application component
│   │   └── api.js              # Backend API communication
│   └── App.js                  # Main application component
├── public/                     # Static assets
└── package.json              # Dependencies and scripts
```

## 🔗 Backend Integration

This frontend connects to these backend endpoints:

| Endpoint | Purpose |
|----------|---------|
| `POST /upload-draft` | Upload research draft files |
| `POST /upload-format` | Upload format template files |
| `POST /generate-paper` | Start paper generation process |
| `GET /status/{execution_id}` | Check processing status |
| `GET /download/{execution_id}` | Download generated papers |
| `WebSocket /ws/status/{execution_id}` | Real-time progress updates |
| `GET /health` | System health check |

## 🎯 Current Features

### 1. Dashboard
- Backend connectivity status
- System health monitoring
- Quick navigation to paper generation

### 2. Generate Paper (PaperGenerator)
- 4-step guided paper generation process
- File upload for drafts and format templates
- Real-time agent monitoring via WebSocket
- Multi-format paper downloads (DOCX, PDF, LaTeX)

### 3. File Upload System
- Drag-and-drop file upload
- Support for PDF, DOCX, TXT drafts
- JSON and DOCX format templates
- File validation and progress tracking

### 4. Real-Time Monitoring (AgentMonitor)
- Live WebSocket connection to backend
- Track agent progress: Draft Refiner, Web Researcher, Content Writer, Format Enforcer
- Automatic reconnection handling

## 💡 Tips for Best Results

1. **Be Specific with Topics**: Instead of "AI", use "Applications of Deep Learning in Medical Image Analysis"
2. **Upload Good Drafts**: The better your initial draft, the better the AI can improve it
3. **Choose Right Format**: Select the format required by your target venue
4. **Monitor Progress**: Watch the agents work - you can see what they're doing in real-time
5. **Download Multiple Formats**: Get DOCX for editing, PDF for sharing, LaTeX for submission

## 🆘 Need Help?

1. **Check Dashboard**: Always start by checking if the backend is connected
2. **Browser Console**: Press F12 and check for error messages
3. **Backend Logs**: Check your Python backend console for errors
4. **File Formats**: Ensure uploaded files are in supported formats (PDF, DOCX, TXT, JSON)
5. **Network**: Verify frontend (port 3000) and backend (port 8000) can communicate

## 🚀 Advanced Usage

### Custom Format Templates
Upload JSON files with custom formatting rules:
```json
{
  "paper_type": "conference",
  "format_style": "ieee",
  "sections": ["abstract", "introduction", "methods", "results", "conclusion"],
  "citation_style": "ieee",
  "page_limit": 6
}
```

### API Integration
The `api.js` service provides methods for:
- `uploadDraft(file)` - Upload draft files
- `uploadFormat(file)` - Upload format templates  
- `generatePaper(data)` - Start paper generation
- `getStatus(executionId)` - Check progress
- `downloadPaper(executionId, format)` - Download results
- `connectWebSocket(executionId)` - Real-time monitoring

---

**Ready to generate research papers with AI? Start by checking your Dashboard! 🚀**
```

## � Backend Integration

This frontend connects to these backend endpoints:

| Endpoint | Purpose |
|----------|---------|
| `POST /upload-draft` | Upload research draft files |
| `POST /upload-format` | Upload format template files |
| `POST /generate-paper` | Start paper generation process |
| `GET /status/{execution_id}` | Check processing status |
| `GET /download/{execution_id}` | Download generated papers |
| `WebSocket /ws/status/{execution_id}` | Real-time progress updates |
| `GET /health` | System health check |

## 💡 Tips for Best Results

1. **Be Specific with Topics**: Instead of "AI", use "Applications of Deep Learning in Medical Image Analysis"
2. **Upload Good Drafts**: The better your initial draft, the better the AI can improve it
3. **Choose Right Format**: Select the format required by your target venue
4. **Monitor Progress**: Watch the agents work - you can see what they're doing in real-time
5. **Download Multiple Formats**: Get DOCX for editing, PDF for sharing, LaTeX for submission

## 🆘 Need Help?

1. **Check Dashboard**: Always start by checking if the backend is connected
2. **Browser Console**: Press F12 and check for error messages
3. **Backend Logs**: Check your Python backend console for errors
4. **File Formats**: Ensure uploaded files are in supported formats
5. **Network**: Verify frontend and backend can communicate

## 🚀 Advanced Usage

### Custom Format Templates
Upload JSON files with custom formatting rules:
```json
{
  "paper_type": "conference",
  "format_style": "custom",
  "sections": ["abstract", "introduction", "methods", "results"],
  "citation_style": "ieee",
  "page_limit": 6
}
```

### Batch Processing
Generate multiple papers by:
1. Using the API service directly
2. Creating custom scripts that call the backend
3. Processing multiple topics in sequence

---

**Ready to generate research papers with AI? Start by checking your Dashboard! 🚀**

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
