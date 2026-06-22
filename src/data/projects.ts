import { ProjectData } from '@/types';

export const projects: ProjectData[] = [
  {
    title: 'Fraud Detection MLOps Pipeline',
    badge: 'MLOps',
    description:
      'End-to-end credit card fraud detection pipeline with real-time FastAPI inference, Dockerized serving, automated CI/CD, and Evidently AI drift detection triggering automatic retraining. avg_precision ~0.83 on Kaggle transaction data.',
    tags: ['FastAPI', 'Docker', 'GitHub Actions', 'MLflow', 'AWS ECS'],
    githubUrl: 'github.com/Nikhilsh10/Fraud-Detection-MLOps-Pipeline',
    featured: true,
    accuracy: 94,
    metrics: [
      { label: 'Precision', value: '0.83' },
      { label: 'Latency', value: '12ms' },
      { label: 'Dataset', value: '284k' },
    ],
  },
  {
    title: 'AgriFuture India',
    badge: 'Full-Stack AI',
    description:
      'AI-powered agri-tech platform with crop recommendation, plant disease detection, market forecasting, and a digital twin module. Built as ML Training Lead on a 4-person capstone team; deployed on Render.',
    tags: ['TypeScript', 'FastAPI', 'React', 'PyTorch'],
    githubUrl: 'github.com/Nikhilsh10/AgriFuture-INDIA',
    accuracy: 96,
    metrics: [
      { label: 'Accuracy', value: '96.2%' },
      { label: 'Classes', value: '38' },
    ],
  },
  {
    title: 'RAG-QA-System',
    badge: 'LLM/RAG',
    description:
      'Local-LLM document Q&A system — no data leaves the machine. Multi-format ingestion, FAISS vector search, streaming responses, multi-model switching.',
    tags: ['LangChain', 'FAISS', 'Ollama', 'Streamlit'],
    githubUrl: 'github.com/Nikhilsh10/RAG-QA-System',
    accuracy: 91,
    metrics: [
      { label: 'Retrieval Rate', value: '0.91' },
      { label: 'Embeddings', value: '768-dim' },
    ],
  },
  {
    title: 'Deepfake Detector',
    badge: 'Computer Vision',
    description:
      'Real-time detection of AI-generated face manipulation with visual tampering explanations across images, video, and live webcam, built on EfficientNet-B4.',
    tags: ['TensorFlow', 'OpenCV', 'EfficientNet', 'Grad-CAM'],
    githubUrl: 'github.com/Nikhilsh10/Deepfake-detector',
    accuracy: 93,
    metrics: [
      { label: 'F1 Score', value: '0.93' },
      { label: 'FPS', value: '30+' },
    ],
  },
  {
    title: 'House Price Prediction Platform',
    badge: 'ML/Deployment',
    description:
      'Property valuation platform using XGBoost and LightGBM with SHAP-based explainability, deployed as an interactive app on Hugging Face Spaces. XGBoost R² = 0.641 on the Bengaluru housing dataset.',
    tags: ['XGBoost', 'SHAP', 'LightGBM', 'Gradio'],
    githubUrl: 'github.com/Nikhilsh10/AI-Powered-House-Price-Prediction-Platform',
    accuracy: 88,
    metrics: [
      { label: 'R²', value: '0.641' },
      { label: 'MAE', value: '1.2M' },
    ],
  },
  {
    title: 'Public Transport Delay Analysis',
    badge: 'ML Pipeline',
    description:
      'Production-style pipeline predicting transit arrival delays from weather, traffic, and event data using a Scikit-Learn Pipeline and Random Forest Regression.',
    tags: ['Scikit-learn', 'Pandas', 'Joblib', 'Python'],
    githubUrl: 'github.com/Nikhilsh10/Public-Transport-delay-Analysis',
    accuracy: 85,
    metrics: [
      { label: 'RMSE', value: '4.2m' },
      { label: 'Dataset', value: '1.2M' },
    ],
  },
];
