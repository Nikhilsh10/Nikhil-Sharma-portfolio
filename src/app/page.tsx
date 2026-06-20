import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import TechStackStrip from '@/components/TechStackStrip';
import ProjectCard, { ProjectData } from '@/components/ProjectCard';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const projects: ProjectData[] = [
    {
      title: 'Fraud Detection MLOps Pipeline',
      badge: 'MLOps',
      description: 'End-to-end credit card fraud detection pipeline with real-time FastAPI inference, Dockerized serving, automated CI/CD, and Evidently AI drift detection triggering automatic retraining. avg_precision ~0.83 on Kaggle transaction data.',
      tags: ['FastAPI', 'Docker', 'GitHub Actions', 'MLflow', 'AWS ECS'],
      githubUrl: 'github.com/Nikhilsh10/Fraud-Detection-MLOps-Pipeline',
      featured: true,
    },
    {
      title: 'AgriFuture India',
      badge: 'Full-Stack AI',
      description: 'AI-powered agri-tech platform with crop recommendation, plant disease detection, market forecasting, and a digital twin module. Built as ML Training Lead on a 4-person capstone team; deployed on Render.',
      tags: ['TypeScript', 'FastAPI', 'React', 'PyTorch'],
      githubUrl: 'github.com/Nikhilsh10/AgriFuture-INDIA',
    },
    {
      title: 'RAG-QA-System',
      badge: 'LLM/RAG',
      description: 'Local-LLM document Q&A system — no data leaves the machine. Multi-format ingestion, FAISS vector search, streaming responses, multi-model switching.',
      tags: ['LangChain', 'FAISS', 'Ollama', 'Streamlit'],
      githubUrl: 'github.com/Nikhilsh10/RAG-QA-System',
    },
    {
      title: 'Deepfake Detector',
      badge: 'Computer Vision',
      description: 'Real-time detection of AI-generated face manipulation with visual tampering explanations across images, video, and live webcam, built on EfficientNet-B4.',
      tags: ['TensorFlow', 'OpenCV', 'EfficientNet', 'Grad-CAM'],
      githubUrl: 'github.com/Nikhilsh10/Deepfake-detector',
    },
    {
      title: 'House Price Prediction Platform',
      badge: 'ML/Deployment',
      description: 'Property valuation platform using XGBoost and LightGBM with SHAP-based explainability, deployed as an interactive app on Hugging Face Spaces. XGBoost R² = 0.641 on the Bengaluru housing dataset.',
      tags: ['XGBoost', 'SHAP', 'LightGBM', 'Gradio'],
      githubUrl: 'github.com/Nikhilsh10/AI-Powered-House-Price-Prediction-Platform',
    },
    {
      title: 'Public Transport Delay Analysis',
      badge: 'ML Pipeline',
      description: 'Production-style pipeline predicting transit arrival delays from weather, traffic, and event data using a Scikit-Learn Pipeline and Random Forest Regression.',
      tags: ['Scikit-learn', 'Pandas', 'Joblib', 'Python'],
      githubUrl: 'github.com/Nikhilsh10/Public-Transport-delay-Analysis',
    }
  ];

  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <TechStackStrip />
        
        {/* Featured Projects Section */}
        <section id="projects" aria-label="Featured Projects" className="py-24 px-4 md:px-8 xl:px-0">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-h2 font-medium text-textPrimary mb-12">featured projects</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project, idx) => (
                <div key={idx} className={idx < 2 ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1 sm:col-span-1 lg:col-span-1'}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ExperienceTimeline />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  );
}
