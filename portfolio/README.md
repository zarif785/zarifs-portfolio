# Portfolio Website

A modern, interactive portfolio website built with React, TypeScript, and Vite. Features stunning animations, particle effects, and a responsive design to showcase your work and skills.

## ✨ Features

### Interactive Elements
- **Particle Background**: Dynamic particle system with rainbow colors that respond to cursor movement
- **Robot Avatar**: Animated robot companion with eye-tracking and contextual witty messages
- **Scroll Animations**: Smooth reveal animations triggered as you scroll through sections
- **3D Card Effects**: Interactive tilt effects on project and skill cards
- **Typing Animation**: Animated text effect in the hero section

### Sections
- **Hero**: Eye-catching introduction with animated text and anime character
- **About**: Personal introduction with statistics cards
- **Skills**: Showcase of technical skills with animated progress bars
- **Projects**: Featured projects with descriptions, tags, and links
- **Contact**: Contact form and information cards

### Design
- **Glassmorphism**: Modern glass-effect UI elements
- **Gradient Accents**: Vibrant gradient text and backgrounds
- **Dark Theme**: Professional dark color scheme
- **Responsive**: Fully responsive design for all screen sizes
- **Smooth Scrolling**: Seamless navigation between sections

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 19** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling with modern features (animations, gradients, glassmorphism)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🚢 Deployment

This project is configured for automated deployment to Vercel with CI/CD via GitHub Actions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

### Manual Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Automated CI/CD

The project includes a GitHub Actions workflow that automatically:
- ✅ Runs linting and builds on every PR
- 🚀 Deploys preview environments for pull requests
- 🌐 Deploys to production on push to `main` branch

**Setup Instructions:**

1. Create a Vercel account and link your GitHub repository
2. Get your Vercel credentials (see [DEPLOYMENT.md](./DEPLOYMENT.md))
3. Add these secrets to your GitHub repository:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🎨 Customization

### Update Personal Information

Edit `src/App.tsx` to customize:
- Your name and title
- About section content
- Skills and proficiency levels
- Project details
- Contact information

### Modify Styling

- `src/index.css` - Global styles and design tokens
- `src/App.css` - Main application styles
- Component-specific CSS files in `src/components/`

### Robot Avatar Messages

Edit `src/components/RobotAvatar.tsx` to customize the witty messages displayed by the robot companion.

## 📁 Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD workflow
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navigation.tsx   # Navigation bar
│   │   ├── ParticleBackground.tsx
│   │   ├── RobotAvatar.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── SkillCard.tsx
│   │   └── ProjectCard.tsx
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── vercel.json             # Vercel configuration
├── DEPLOYMENT.md           # Detailed deployment guide
└── package.json            # Project dependencies
```

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

Built with ❤️ using React and TypeScript
