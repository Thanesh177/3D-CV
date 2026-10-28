export type Project = {
  index: string;
  slug: string;
  title: string;
  type: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  stack: string[];
  url?: string;
};

export const portfolio = {
  name: "THANESH",
  fullName: "Thanesh Nagarajan Thiruppathi",
  role: "Cloud engineer · Full-stack developer · Security practitioner",
  email: "ntthanesh@gmail.com",
  location: "Canada · Open to cloud engineering opportunities",
  statement: "I architect resilient cloud systems where infrastructure, automation and security operate as one.",
  intro:
    "Cloud engineer with 2+ years of hands-on experience designing secure AWS platforms, automating delivery and optimizing infrastructure for performance and cost.",
  availability: "Open to opportunities",
  links: {
    github: "https://github.com/Thanesh177",
    linkedin: "https://www.linkedin.com/in/ntthanesh",
  },
  experience: [
    {
      role: "IT Security Specialist",
      company: "Vosyn",
      location: "Canada",
      period: "Dec 2025 — Present",
      summary: "Building secure, highly available AWS systems and automated delivery pipelines while strengthening cloud governance, vulnerability management and operational resilience.",
    },
    {
      role: "Cloud Administrator",
      company: "Anu Medicals",
      location: "India",
      period: "Jul 2022 — Aug 2023",
      summary: "Deployed and operated a cloud commerce platform, reducing cloud operating costs by approximately 30% through monitoring, rightsizing and improved storage management.",
    },
  ],
  projects: [
    {
      index: "01",
      slug: "smarty",
      title: "SMARTY",
      type: "Cloud-native social learning platform",
      year: "2026",
      summary:
        "A serverless social learning platform connecting a Kotlin Android app and React web client with AI-powered content, live discussion and personalized learning.",
      challenge:
        "Create one secure, scalable learning experience across mobile and web while supporting real-time communication, media, AI-assisted content and rapidly changing social data.",
      solution:
        "A serverless AWS architecture built around API Gateway, Lambda, Cognito and DynamoDB, with WebSockets for live interactions and Terraform plus GitHub Actions for repeatable delivery.",
      outcomes: ["Secure multi-client authentication", "Real-time synchronized interactions", "Repeatable infrastructure and release workflows"],
      stack: ["AWS Lambda", "API Gateway", "DynamoDB", "Cognito", "Terraform", "React", "Kotlin"],
      url: "https://main.d3qiuefonbn8n9.amplifyapp.com/feed",
    },
    {
      index: "02",
      slug: "stockie",
      title: "STOCKIE",
      type: "Cloud & machine-learning platform",
      year: "2025",
      summary:
        "A cloud-native stock prediction system combining automated market-data collection, machine learning and serverless inference on AWS.",
      challenge:
        "Turn continuously changing financial data into a reproducible prediction pipeline that could be trained, deployed and served without maintaining traditional servers.",
      solution:
        "An automated Python pipeline for collection and feature engineering, Lambda-based inference behind API Gateway, secure S3 model storage and containerized services deployed through ECR and App Runner.",
      outcomes: ["Automated data-to-inference pipeline", "Reproducible model deployment", "Scalable managed container hosting"],
      stack: ["Python", "Pandas", "Scikit-learn", "AWS Lambda", "S3", "ECR", "App Runner", "Docker"],
    },
  ] satisfies Project[],
  capabilities: [
    "AWS cloud architecture",
    "Terraform & CloudFormation",
    "CI/CD automation",
    "Cloud security",
    "Full-stack development",
    "Cost optimization",
  ],
  certifications: ["AWS Certified Cloud Practitioner (CLF-C02)", "HashiCorp Terraform Associate"],
  education: [
    "Master of Computer Science — Lakehead University, Canada",
    "Bachelor of Computer Science — Panimalar Engineering College, India",
  ],
} as const;

export function getProject(slug: string) {
  return portfolio.projects.find((project) => project.slug === slug);
}
