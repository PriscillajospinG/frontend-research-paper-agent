# frontend-research-paper-agent
This repository contains the web interface for your AI Research Paper Writing Agent. It allows users to input paper metadata, monitor workflow progress, preview drafts, and download final papers.
Ah bro 😎 — I get what you mean. You want a ready-to-use README file in proper markdown format that you can literally save as README.md in your frontend repo, not just a pasted text. Here’s a clean version:

# Frontend - AI Research Paper Writing Agent

This is the **React.js frontend** for the AI Research Paper Writing Agent project.  
It allows users to input paper details, monitor progress, preview drafts, and download the final research paper.

---

## Prerequisites

- **Node.js** ≥ 18.x and **npm**
- Backend server running (**FastAPI / Flask**) at `http://localhost:8000` (or your configured URL)

---

## Installation

1. **Clone the repository**
```bash
git clone <frontend-repo-url>
cd frontend-research-paper-agent

	2.	Install dependencies

npm install

	3.	Setup TailwindCSS (if not already configured)

npx tailwindcss init -p

⚠️ This step can be skipped if tailwind.config.js is already included.

⸻

Project Structure

src/
├── components/     # Reusable UI components (PaperForm, DraftPreview, FileUploader)
├── pages/          # Pages (Dashboard, PaperGenerator, History)
├── services/       # Axios API calls to backend
├── styles/         # Tailwind / CSS
└── App.jsx         # Main React app


⸻

Configuration
	•	API URL for backend is set in src/services/api.js:

const API_BASE = "http://localhost:8000"; // Change if your backend runs elsewhere


⸻

Running Locally

Start the development server:

npm start

	•	Opens in browser at: http://localhost:3000
	•	Use the form to submit paper details to the backend.

⸻

Available Scripts

Command	Description
npm start	Runs the app in development mode
npm run build	Builds the app for production (build/ folder)
npm test	Runs frontend tests
npm run eject	Exposes configuration files (optional)


⸻

Features
	•	Submit paper topic, notes, keywords, figures
	•	WYSIWYG editor for notes (ReactQuill)
	•	Communicates with backend via Axios API calls
	•	Optional: Draft preview and download final paper (PDF/DOCX)
	•	Tailwind CSS for responsive UI

⸻

Notes
	•	Make sure backend is running before submitting papers
	•	If running on a remote backend, update API_BASE in api.js
	•	Frontend only handles UI; all AI processing is done on backend

⸻

✅ Ready to go! Just run npm start and your frontend will connect to the backend.

---

