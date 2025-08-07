# Firebase Setup Guide

## 🔥 Setup Firebase Realtime Database

### 1. Buat Project Firebase
1. Pergi ke [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" dan buat project baru
3. Aktifkan Realtime Database dari menu "Database"
4. Pilih "Start in test mode" untuk development

### 2. Dapatkan Service Account Key
1. Pergi ke Project Settings → Service accounts
2. Klik "Generate new private key"
3. Download file JSON yang dihasilkan

### 3. Setup Environment Variables
Copy informasi dari service account JSON ke file `.env`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-client-email%40your-project-id.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com/
```

### 4. Database Structure
Firebase Realtime Database akan memiliki struktur seperti ini:

```json
{
  "projects": {
    "projectId1": {
      "title": "Project Title",
      "description": "Project Description",
      "status": "active",
      "technologies": ["React", "Node.js"],
      "progress": 75,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "blogPosts": {
    "postId1": {
      "title": "Blog Title",
      "content": "Blog Content",
      "excerpt": "Blog Excerpt",
      "tags": ["tag1", "tag2"],
      "published": true,
      "author": "Admin",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "experiences": {
    "expId1": {
      "company": "Company Name",
      "position": "Position",
      "location": "Location",
      "startDate": "2024-01",
      "endDate": "2024-12",
      "current": false,
      "description": "Job description",
      "technologies": ["React", "Node.js"],
      "type": "work"
    }
  },
  "skills": {
    "skillId1": {
      "name": "React",
      "category": "frontend",
      "level": "expert",
      "yearsOfExperience": 4,
      "description": "Skill description"
    }
  },
  "achievements": {
    "achievementId1": {
      "title": "AWS Certified Developer",
      "description": "Achievement description",
      "date": "2024-01-01",
      "category": "certification",
      "issuer": "Amazon Web Services",
      "credentialId": "ABC123",
      "credentialUrl": "https://aws.amazon.com/verification",
      "skills": ["AWS", "Cloud"],
      "featured": true
    }
  }
}
```

## 🛠️ API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Blog Posts
- `GET /api/posts` - Get all blog posts
- `POST /api/posts` - Create new blog post
- `PUT /api/posts/:id` - Update blog post
- `DELETE /api/posts/:id` - Delete blog post

### Experiences
- `GET /api/experiences` - Get all experiences
- `POST /api/experiences` - Create new experience
- `PUT /api/experiences/:id` - Update experience
- `DELETE /api/experiences/:id` - Delete experience

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Achievements
- `GET /api/achievements` - Get all achievements
- `POST /api/achievements` - Create new achievement
- `PUT /api/achievements/:id` - Update achievement
- `DELETE /api/achievements/:id` - Delete achievement

## 🚀 Testing the API

Setelah setup selesai, Anda dapat test API dengan:

```bash
# Start the server
npm run dev:server

# Test health endpoint
curl http://localhost:3001/api/health

# Test create project
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Project","description":"Test Description"}'
```

## 🔐 Security Rules (Optional)

Untuk production, setup Firebase security rules:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```
