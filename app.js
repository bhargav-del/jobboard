const $ = (s) => document.querySelector(s);
let cards = JSON.parse(localStorage.getItem('jobboard-cards') || 'null') || [
  { company: 'Northstar Labs', role: 'Product engineer', stage: 'Interview', meta: 'Technical round · Thu, Apr 24', logo: 'N' },
  { company: 'Linear', role: 'Frontend engineer', stage: 'Applied', meta: 'Applied Apr 18 · Follow up in 3 days', logo: 'L' },
  { company: 'Arc', role: 'Founding engineer', stage: 'Saved', meta: 'Remote · Series A', logo: 'A' },
  { company: 'Vercel', role: 'Developer experience', stage: 'Offer', meta: 'Offer received · Reply by Apr 25', logo: 'V' }
];
const stages = ['Saved', 'Applied', 'Interview', 'Offer'];
let searchQuery = '';
let filterMode = 'all';
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const save = () => localStorage.setItem('jobboard-cards', JSON.stringify(cards));
const toast = (message) => { const el = $('#toast'); el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2600); };

function cardMarkup(card, stageIndex) {
  const canMoveLeft = stageIndex > 0;
  const canMoveRight = stageIndex < stages.length - 1;
  return `<article class="job-card" draggable="true" data-company="${escapeHtml(card.company)}">
    <div class="job-card-top"><span class="company-logo">${escapeHtml(card.logo)}</span><button class="dots" aria-label="More options">•••</button></div>
    <strong>${escapeHtml(card.company)}</strong>
    <span class="job-role">${escapeHtml(card.role)}</span>
    <span class="job-meta">${escapeHtml(card.meta)}</span>
    <div class="job-actions">
      ${canMoveLeft ? `<button data-move="left" data-company="${escapeHtml(card.company)}">←</button>` : '<span></span>'}
      ${canMoveRight ? `<button data-move="right" data-company="${escapeHtml(card.company)}">Move →</button>` : '<span class="pill">Decision</span>'}
    </div>
  </article>`;
}

function render() {
  $('#pipeline').innerHTML = stages.map((stage, index) => {
    const stageCards = cards.filter((card) => {
      const matchesSearch = `${card.company} ${card.role} ${card.meta}`.toLowerCase().includes(searchQuery);
      const matchesFilter = filterMode === 'all' || (filterMode === 'interview' && card.stage === 'Interview') || (filterMode === 'followup' && /follow|due|reply/i.test(card.meta));
      return card.stage === stage && matchesSearch && matchesFilter;
    });
    return `<div class="stage"><div class="stage-head"><div><span class="kicker">0${index + 1}</span><h3>${stage}</h3></div><span class="stage-count">${stageCards.length}</span></div><div class="stage-cards">${stageCards.map((card) => cardMarkup(card, index)).join('') || '<div class="stage-empty">Nothing here yet</div>'}</div></div>`;
  }).join('');

  $('#metric-total').textContent = cards.length + 14;
  $('#active-count').textContent = cards.length + 14;
  $('#metric-interviews').textContent = cards.filter((card) => card.stage === 'Interview').length;
  document.querySelectorAll('[data-move]').forEach((button) => button.addEventListener('click', () => {
    const card = cards.find((item) => item.company === button.dataset.company);
    const current = stages.indexOf(card.stage);
    const next = current + (button.dataset.move === 'right' ? 1 : -1);
    card.stage = stages[Math.max(0, Math.min(stages.length - 1, next))];
    save();
    render();
    toast(`${card.company} moved to ${card.stage}.`);
  }));
  document.querySelectorAll('.job-card').forEach(card => card.addEventListener('dragstart', event => { event.dataTransfer.setData('text/company', card.dataset.company); card.classList.add('dragging'); }));
  document.querySelectorAll('.job-card').forEach(card => card.addEventListener('dragend', () => card.classList.remove('dragging')));
  document.querySelectorAll('.stage').forEach(stage => { stage.addEventListener('dragover', event => { event.preventDefault(); stage.classList.add('drag-over'); }); stage.addEventListener('dragleave', () => stage.classList.remove('drag-over')); stage.addEventListener('drop', event => { event.preventDefault(); stage.classList.remove('drag-over'); const card = cards.find(item => item.company === event.dataTransfer.getData('text/company')); if (card && stages.includes(stage.querySelector('h3').textContent)) { card.stage = stage.querySelector('h3').textContent; save(); render(); toast(`${card.company} moved to ${card.stage}.`); } }); });
}

$('#add').addEventListener('click', () => { $('#modal').showModal(); setTimeout(() => document.querySelector('[name="company"]').focus(), 50); });
$('#form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const company = data.get('company');
  cards.unshift({ company, role: data.get('role'), stage: 'Saved', meta: data.get('follow') || 'Added today', logo: String(company).slice(0, 1).toUpperCase() });
  save(); render(); event.currentTarget.reset(); $('#modal').close(); toast('Application added to Saved.');
});
$('#export').addEventListener('click', () => { const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([JSON.stringify(cards, null, 2)], { type: 'application/json' })); link.download = 'jobboard-pipeline.json'; link.click(); toast('Pipeline exported as JSON.'); });
$('#pipeline-search').addEventListener('input', event => { searchQuery = event.target.value.toLowerCase().trim(); render(); });
$('#filter').addEventListener('click', () => { filterMode = filterMode === 'all' ? 'interview' : filterMode === 'interview' ? 'followup' : 'all'; $('#filter').textContent = filterMode === 'all' ? 'All roles⌄' : filterMode === 'interview' ? 'Interviewing⌄' : 'Follow-ups⌄'; render(); });
document.addEventListener('keydown', event => { if (event.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) { event.preventDefault(); $('#pipeline-search').focus(); } });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
render();
