document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('project-grid');
  if (!grid) return;
  fetch('src/data/projects.json')
    .then(res => res.json())
    .then(projects => {
      projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card card-bg rounded-lg overflow-hidden shadow-lg border border-color group slide-in-up';
        card.dataset.category = project.tags.join(' ');
        card.innerHTML = `
          <div class="relative">
            <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="text-white text-2xl mx-2 hover:text-aurora-green"><i class="fas fa-link"></i></a>` : ''}
              ${project.repoLink ? `<a href="${project.repoLink}" target="_blank" class="text-white text-2xl mx-2 hover:text-aurora-green"><i class="fab fa-github"></i></a>` : ''}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">${project.title}</h3>
            <p class="text-secondary mb-4">${project.description}</p>
            <div class="flex flex-wrap gap-2 text-sm">
              ${project.tags.map(tag => `<span class="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-starlight-gold px-2 py-1 rounded-md">${tag}</span>`).join('')}
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    })
    .catch(err => console.error('Failed to load projects:', err));
});
