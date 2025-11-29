// src/data/projects.data.js

/**
 * How to add a project:
 * {
 *   title: "Short Title",
 *   desc: "One-liner that explains what it is.",
 *   img: "/projects/<section>/<filename>",
 *   github: "https://github.com/yourname/your-repo"
 * }
 *
 * Sections: deepLearning, backend, machineLearning, computerVision
 * Images live under /public/projects/<section>/...
 */

export const projects = {
  deepLearning: [
    {
      title: "YOLO Realtime",
      desc: "Webcam inference with async preproc + custom NMS + overlay HUD.",
      img: "/projects/deep-learning/yolo-realtime.webp",
      github: "https://github.com/yourname/yolo-realtime"
    },
    // Add more...
  ],

  backend: [
    {
      title: "FastAPI API",
      desc: "JWT auth + WebSockets + MongoDB + Docker on EC2.",
      img: "/projects/backend/chat-service.webp",
      github: "https://github.com/gkhot27/Digit7/tree/main/src/gender"
    },
    {
      title: "Highheat",
      desc: "JWT auth + WebSockets + MongoDB + Docker on EC2.",
      img: "/projects/backend/chat-service.webp",
      github: "https://github.com/gkhot27/Digit7/tree/main/src/gender"
    }
    // Add more...
  ],

  machineLearning: [
    {
      title: "Retinal optical coherence tomography",
      desc: "Image classification model using CNN to detect retinal diseases.",
      img: "/projects/machine-learning/churn-shap.webp",
      github: "https://github.com/gkhot27/Retinal_OCT_project/blob/main/retinal_oct_cnn_converted(works).ipynb"
    },

    // Add more...
  ],

  computerVision: [
    {
      title: "Lighting‑Robust Color Detection",
      desc: "HSV + normalization + CLAHE for stable tracking.",
      img: "/projects/computer-vision/color-detect.webp",
      github: "https://github.com/yourname/color-detect"
    },
    {
        title: "My CV Project",
        desc: "Short one‑liner about it.",
        img: "/projects/computer-vision/my-cv-project.webp",
        github: "https://github.com/yourname/my-cv-project"
}

    // Add more...
  ],
};
