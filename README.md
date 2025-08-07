# Project Dashboard

Full-stack application untuk Project Dashboard menggunakan React, TypeScript, TailwindCSS untuk frontend dan Node.js, Express untuk backend.

## Fitur

### ✨ Komponen Utama

- **Login System** - Halaman login dengan form validasi
- **Dashboard** - Statistik dan overview project
- **Project Management** - CRUD operations untuk project
- **Blog/Stories** - CRUD operations untuk blog posts
- **REST API** - Backend API untuk semua operasi data

### 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach dengan TailwindCSS
- **Modern Interface** - Clean dan modern design
- **Interactive Components** - Modal, form validations, dan animations
- **Dark/Light Theme Support** - Siap untuk implementasi tema
- **Modular Architecture** - Component-based design untuk easy debugging dan maintenance

### 🏗️ Modular Component Architecture

Setiap halaman dibagi menjadi komponen-komponen kecil yang dapat digunakan kembali:

- **Dashboard Components**: Statistics, activities, dan project breakdown
- **Projects Components**: Card, grid, dan modal untuk project management
- **Blog Components**: Card, grid, modal, dan search untuk blog management
- **Experience Components**: Tab navigation, cards untuk experience/skills/achievements

## Tech Stack

### Frontend

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **React Router Dom** - Client-side routing
- **Lucide React** - Modern icon library

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## Struktur Project

```
project-dashboard/
├── src/                     # Frontend React App
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx      # Main layout wrapper
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   ├── Topbar.tsx      # Top navigation bar
│   │   ├── StatCard.tsx    # Statistics card component
│   │   ├── Login.tsx       # Login form component
│   │   ├── dashboard/      # Dashboard modular components
│   │   │   ├── DashboardStats.tsx    # Statistics display
│   │   │   ├── RecentActivities.tsx  # Activity feed
│   │   │   ├── ProjectBreakdown.tsx  # Project progress
│   │   │   └── index.ts             # Clean exports
│   │   ├── projects/       # Projects modular components
│   │   │   ├── ProjectCard.tsx      # Individual project card
│   │   │   ├── ProjectGrid.tsx      # Grid layout
│   │   │   ├── ProjectModal.tsx     # Create/edit modal
│   │   │   └── index.ts            # Clean exports
│   │   ├── blog/          # Blog modular components
│   │   │   ├── BlogCard.tsx        # Individual blog card
│   │   │   ├── BlogGrid.tsx        # Grid layout
│   │   │   ├── BlogModal.tsx       # Create/edit modal
│   │   │   ├── BlogSearch.tsx      # Search functionality
│   │   │   └── index.ts           # Clean exports
│   │   └── experience/    # Experience modular components
│   │       ├── TabNavigation.tsx   # Tab switching
│   │       ├── SearchAndFilters.tsx # Search & filters
│   │       ├── ExperienceCard.tsx  # Work experience cards
│   │       ├── SkillCard.tsx       # Skill display cards
│   │       ├── AchievementCard.tsx # Achievement cards
│   │       └── index.ts           # Clean exports
│   ├── views/              # Page components
│   │   ├── Dashboard.tsx   # Dashboard page
│   │   ├── Projects.tsx    # Projects management page
│   │   ├── Blog.tsx        # Blog/Stories page
│   │   └── Experience.tsx  # Experience & Skills page
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Main types
│   ├── utils/              # Utility functions
│   │   └── api.ts          # API integration
│   ├── App.tsx            # Main App component
│   ├── index.tsx          # Entry point
│   └── index.css          # TailwindCSS imports
├── controllers/            # Backend controllers
│   ├── projectController.js
│   └── blogController.js
├── middleware/             # Express middleware
│   └── validation.js
├── models/                 # Data models
│   ├── Project.js
│   └── BlogPost.js
├── routes/                 # API routes
│   ├── projects.js
│   └── blog.js
├── public/                 # Static files
│   └── index.html         # HTML template
├── package.json           # Dependencies & scripts
├── index.js               # Server entry point
├── .env                   # Environment variables
├── tailwind.config.js     # TailwindCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Instalasi & Menjalankan

### Development Mode

```bash
# Install dependencies
npm install

# Jalankan backend server (port 3001)
npm run dev:server

# Di terminal baru, jalankan frontend (port 3000)
npm run dev:client

# Atau jalankan keduanya sekaligus
npm run dev:full
```

### Production Mode

```bash
# Build frontend
npm run build

# Set environment variable
set NODE_ENV=production

# Jalankan server (akan serve built React app)
npm start
```

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Blog

- `GET /api/blog` - Get all blog posts
- `POST /api/blog` - Create new blog post

### Stats

- `GET /api/stats` - Get dashboard statistics

### Health

- `GET /api/health` - Health check endpoint

## Komponen Detail

### Layout Components

- **Layout**: Wrapper utama dengan sidebar dan topbar
- **Sidebar**: Navigation menu dengan routing
- **Topbar**: Header dengan search dan user info

### Dashboard Components

- **StatCard**: Card untuk menampilkan statistik
- **Chart placeholder**: Siap untuk implementasi chart library

### Project Components

- **Project Card**: Card untuk menampilkan project info
- **Project Modal**: Form untuk create/edit project
- **Status Badge**: Badge untuk status project

### Blog Components

- **Post Card**: Card untuk menampilkan blog post
- **Post Modal**: Form untuk create/edit blog post
- **Tag System**: System untuk tagging posts

## Customization

### Colors

Gunakan TailwindCSS color palette atau custom colors di `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Custom primary colors
      }
    }
  }
}
```

### Components

Semua komponen dibuat modular dan reusable. Anda dapat dengan mudah:

- Menambah props baru
- Mengubah styling
- Menambah functionality

## API Integration

Project ini sudah dilengkapi dengan REST API backend. Untuk menggunakan API di frontend:

```typescript
import { projectAPI, blogAPI, statsAPI } from "./utils/api";

// Get all projects
const projects = await projectAPI.getAll();

// Create new project
const newProject = await projectAPI.create({
  title: "My Project",
  description: "Project description",
  status: "active",
  technologies: ["React", "Node.js"],
  progress: 50,
});

// Get dashboard stats
const stats = await statsAPI.get();
```

## Future Enhancements

- [ ] State management dengan Redux/Zustand
- [ ] Authentication dengan JWT
- [ ] Real-time updates dengan WebSocket
- [ ] Chart integration dengan Chart.js/Recharts
- [ ] File upload untuk project images
- [ ] Advanced search dan filtering
- [ ] Export functionality
- [ ] PWA support

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request
