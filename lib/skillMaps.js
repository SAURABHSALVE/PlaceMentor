export const SKILL_MAPS = {
  "data_analyst": {
    name: "Data Analyst",
    skills: {
      sql: {
        name: "SQL",
        weight: 25,
        keywords: ["sql", "mysql", "postgresql", "postgres", "oracle", "joins", "aggregation", "subqueries", "indexing", "query", "database queries"]
      },
      python: {
        name: "Python for Data",
        weight: 20,
        keywords: ["python", "pandas", "numpy", "scipy", "jupyter", "notebook", "data analysis", "data manipulation"]
      },
      visualization: {
        name: "Data Visualization",
        weight: 20,
        keywords: ["power bi", "tableau", "matplotlib", "seaborn", "plotly", "dashboard", "visualization", "charts", "graphs", "excel", "looker"]
      },
      statistics: {
        name: "Statistics",
        weight: 15,
        keywords: ["statistics", "statistical", "regression", "hypothesis", "probability", "correlation", "a/b testing", "analytics"]
      },
      projects: {
        name: "Real-world Projects",
        weight: 15,
        keywords: ["project", "analysis", "insights", "business", "report", "findings", "recommendation"]
      },
      communication: {
        name: "Communication",
        weight: 5,
        keywords: ["presentation", "stakeholder", "communicate", "explain", "documentation", "teamwork"]
      }
    }
  },
  "backend_developer": {
    name: "Backend Developer",
    skills: {
      dsa: {
        name: "DSA Fundamentals",
        weight: 20,
        keywords: ["data structures", "algorithms", "dsa", "leetcode", "arrays", "linked list", "trees", "graphs", "sorting", "searching", "dynamic programming", "recursion"]
      },
      api: {
        name: "API Building",
        weight: 25,
        keywords: ["api", "rest", "restful", "graphql", "express", "fastapi", "django", "flask", "spring boot", "node.js", "endpoints", "http"]
      },
      database: {
        name: "Database Knowledge",
        weight: 20,
        keywords: ["database", "sql", "nosql", "mongodb", "postgresql", "mysql", "redis", "orm", "sequelize", "prisma", "schema"]
      },
      auth: {
        name: "Authentication",
        weight: 15,
        keywords: ["authentication", "authorization", "jwt", "oauth", "session", "security", "bcrypt", "passport"]
      },
      deployment: {
        name: "Deployment",
        weight: 10,
        keywords: ["docker", "kubernetes", "aws", "gcp", "azure", "ci/cd", "deployment", "heroku", "vercel", "nginx"]
      },
      projects: {
        name: "Backend Projects",
        weight: 10,
        keywords: ["project", "built", "developed", "implemented", "backend", "server", "microservice"]
      }
    }
  },
  "frontend_developer": {
    name: "Frontend Developer",
    skills: {
      htmlcss: {
        name: "HTML/CSS Fundamentals",
        weight: 15,
        keywords: ["html", "css", "html5", "css3", "flexbox", "grid", "responsive", "sass", "scss", "tailwind", "bootstrap"]
      },
      javascript: {
        name: "JavaScript",
        weight: 25,
        keywords: ["javascript", "js", "es6", "typescript", "dom", "async", "promises", "fetch"]
      },
      react: {
        name: "React",
        weight: 25,
        keywords: ["react", "reactjs", "next.js", "nextjs", "hooks", "components", "jsx", "virtual dom", "vue", "angular"]
      },
      stateManagement: {
        name: "State Management",
        weight: 10,
        keywords: ["redux", "context", "zustand", "recoil", "state management", "mobx"]
      },
      apiIntegration: {
        name: "API Integration",
        weight: 10,
        keywords: ["api", "fetch", "axios", "rest", "graphql", "integration", "http"]
      },
      responsive: {
        name: "UI/Responsiveness",
        weight: 10,
        keywords: ["responsive", "mobile", "ui", "ux", "design", "figma", "accessibility"]
      },
      portfolio: {
        name: "Portfolio Quality",
        weight: 5,
        keywords: ["portfolio", "github", "project", "demo", "live", "deployed"]
      }
    }
  }
}

export const ROLES = [
  { id: "data_analyst", name: "Data Analyst" },
  { id: "backend_developer", name: "Backend Developer" },
  { id: "frontend_developer", name: "Frontend Developer" }
]