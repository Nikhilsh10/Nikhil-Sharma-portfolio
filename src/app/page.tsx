import NavBar from '@/components/NavBar';
import NeuralPulseHero from '@/components/NeuralPulseHero';
import TechStackStrip from '@/components/TechStackStrip';
import ProjectCard, { ProjectData } from '@/components/ProjectCard';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import PageBackground from '@/components/PageBackground';
import Footer from '@/components/Footer';
import Link from 'next/link';

const projects: ProjectData[] = [
  {
    title: 'Fraud Detection MLOps Pipeline',
    badge: 'MLOps',
    description:
      'End-to-end credit card fraud detection pipeline with real-time FastAPI inference, Dockerized serving, automated CI/CD, and Evidently AI drift detection triggering automatic retraining. avg_precision ~0.83 on Kaggle transaction data.',
    tags: ['FastAPI', 'Docker', 'GitHub Actions', 'MLflow', 'AWS ECS'],
    githubUrl: 'github.com/Nikhilsh10/Fraud-Detection-MLOps-Pipeline',
    featured: true,
  },
  {
    title: 'AgriFuture India',
    badge: 'Full-Stack AI',
    description:
      'AI-powered agri-tech platform with crop recommendation, plant disease detection, market forecasting, and a digital twin module. Built as ML Training Lead on a 4-person capstone team; deployed on Render.',
    tags: ['TypeScript', 'FastAPI', 'React', 'PyTorch'],
    githubUrl: 'github.com/Nikhilsh10/AgriFuture-INDIA',
  },
  {
    title: 'RAG-QA-System',
    badge: 'LLM/RAG',
    description:
      'Local-LLM document Q&A system — no data leaves the machine. Multi-format ingestion, FAISS vector search, streaming responses, multi-model switching.',
    tags: ['LangChain', 'FAISS', 'Ollama', 'Streamlit'],
    githubUrl: 'github.com/Nikhilsh10/RAG-QA-System',
  },
  {
    title: 'Deepfake Detector',
    badge: 'Computer Vision',
    description:
      'Real-time detection of AI-generated face manipulation with visual tampering explanations across images, video, and live webcam, built on EfficientNet-B4.',
    tags: ['TensorFlow', 'OpenCV', 'EfficientNet', 'Grad-CAM'],
    githubUrl: 'github.com/Nikhilsh10/Deepfake-detector',
  },
  {
    title: 'House Price Prediction Platform',
    badge: 'ML/Deployment',
    description:
      'Property valuation platform using XGBoost and LightGBM with SHAP-based explainability, deployed as an interactive app on Hugging Face Spaces. XGBoost R² = 0.641 on the Bengaluru housing dataset.',
    tags: ['XGBoost', 'SHAP', 'LightGBM', 'Gradio'],
    githubUrl:
      'github.com/Nikhilsh10/AI-Powered-House-Price-Prediction-Platform',
  },
  {
    title: 'Public Transport Delay Analysis',
    badge: 'ML Pipeline',
    description:
      'Production-style pipeline predicting transit arrival delays from weather, traffic, and event data using a Scikit-Learn Pipeline and Random Forest Regression.',
    tags: ['Scikit-learn', 'Pandas', 'Joblib', 'Python'],
    githubUrl: 'github.com/Nikhilsh10/Public-Transport-delay-Analysis',
  },
];

export default function Home() {
  return (
    <>
      <PageBackground />
      <NavBar />
      <main className="flex flex-col min-h-screen">
        {/* ── Hero ── */}
        <NeuralPulseHero />

        {/* ── Tech Stack Strip ── */}
        <TechStackStrip />

        {/* ── Featured Projects (home teaser — all 6) ── */}
        <section
          id="work"
          aria-labelledby="work-heading"
          className="py-24 px-4 md:px-8 xl:px-0"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col gap-2 mb-12">
              <span className="text-micro font-semibold tracking-[0.15em] uppercase text-primary opacity-70">
                01 / Work
              </span>
              <div className="flex items-baseline justify-between">
                <h2
                  id="work-heading"
                  className="text-h2 font-semibold text-textPrimary"
                >
                  Featured projects
                </h2>
                <a
                  href="https://github.com/Nikhilsh10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bodySm text-textSecondary hover:text-primary transition-colors focus-ring rounded-micro inline-flex items-center gap-1"
                >
                  All on GitHub
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className={
                    idx < 2
                      ? 'sm:col-span-2 lg:col-span-2'
                      : 'col-span-1 sm:col-span-1 lg:col-span-1'
                  }
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <ExperienceTimeline />

        {/* ── Education & Certifications ── */}
        <EducationSection />

        {/* ── Contact ── */}
        <ContactSection />

        {/* ── Footer ── */}
        <Footer />
      </main>
    </>
  );
}
