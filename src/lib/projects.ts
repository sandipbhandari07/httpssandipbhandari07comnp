export type ProjectType = "github" | "published";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  github: string;
  imageUrl: string;
  images: string[];
  category: string;
  type: ProjectType;
  playStoreUrl?: string;
}

export const projects: Project[] = [
  {
    id: "kid-learning-game",
    title: "Kid Learning Game",
    subtitle: "Android Game Application",
    description: "An interactive Android application built with JAVA designed to help children learn through fun activities including alphabets, numbers, fruits, and drawing exercises.",
    features: ["AlphabeticActivity", "SettingActivity", "DrawingActivity", "FruitsActivity", "KnowledgeActivity", "NumberActivity"],
    github: "https://github.com/sandipbhandari07/KidLearningGame_androidApp",
    imageUrl: "/project-kid-game.jpg",
    images: ["/project-kid-game.jpg"],
    category: "Mobile App",
    type: "github",
  },
  {
    id: "gtbs",
    title: "GTBS",
    subtitle: "Ecommerce Android Application",
    description: "A complete ecommerce Android application with Firebase backend featuring multi-role dashboards for buyers, sellers, and administrators with full cart and payment functionality.",
    features: ["Add Products", "View Products", "Add to cart", "Buy", "Admin Dashboard", "Buyer Dashboard", "Seller Dashboard"],
    github: "https://github.com/sandipbhandari07/GTBS",
    imageUrl: "/project-gtbs.jpg",
    images: ["/project-gtbs.jpg"],
    category: "Mobile App",
    type: "github",
  },
  {
    id: "library-nepal",
    title: "Library Nepal",
    subtitle: "A learning android application",
    description: "Educational Android application with Firebase integration allowing students to access books, notes, solutions, and model questions for their studies.",
    features: ["Add book", "View book", "Notes", "Solution books", "Model questions"],
    github: "https://github.com/sandipbhandari07/LibraryNepal",
    imageUrl: "/project-library.jpg",
    images: ["/project-library.jpg"],
    category: "Mobile App",
    type: "github",
  },
  {
    id: "gamemartz",
    title: "GameMartz",
    subtitle: "A Gaming ecommerce web-application",
    description: "WordPress-based gaming ecommerce platform where users can browse, view, and purchase games with a complete shopping cart experience.",
    features: ["View store", "Games", "Add to cart"],
    github: "https://github.com/sandipbhandari07/gameMartz",
    imageUrl: "/project-gamemartz.jpg",
    images: ["/project-gamemartz.jpg"],
    category: "Web App",
    type: "github",
  },
  {
    id: "slayer",
    title: "Slayer",
    subtitle: "Web Based Game",
    description: "An exciting web-based battle game built with JavaScript featuring combat mechanics and interactive gameplay elements.",
    features: ["Battle"],
    github: "https://github.com/sandipbhandari07/Slayer_The_Web_Base_Game",
    imageUrl: "/project-slayer.jpg",
    images: ["/project-slayer.jpg"],
    category: "Web Game",
    type: "github",
  },
  {
    id: "cave-escape",
    title: "CaveEscape",
    subtitle: "Web Based Game",
    description: "A thrilling web-based escape game built with HTML and CSS where players must navigate through a cave and find their way out.",
    features: ["Replay", "Exit the game"],
    github: "https://github.com/sandipbhandari07/CaveEscape",
    imageUrl: "/project-cave.jpg",
    images: ["/project-cave.jpg"],
    category: "Web Game",
    type: "github",
  },
  {
    id: "agriculture-website",
    title: "Agriculture Website",
    subtitle: "Ecommerce Application",
    description: "Full-stack Laravel ecommerce application for agricultural products with admin dashboard, product management, and shopping cart functionality.",
    features: ["Add Products", "View Products", "Add to cart", "Admin Dashboard"],
    github: "https://github.com/sandipbhandari07/laravel_project",
    imageUrl: "/project-agriculture.jpg",
    images: ["/project-agriculture.jpg"],
    category: "Web App",
    type: "github",
  },
];
