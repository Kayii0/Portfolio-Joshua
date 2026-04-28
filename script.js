function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';

  const name = id.replace('modal-', '');
  if (document.getElementById('slider-' + name)) {
    initSlider(name);
  }
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

const sliderState = {};

function initSlider(name) {
  const track = document.getElementById('slider-' + name);
  const dotsContainer = document.getElementById('dots-' + name);
  const count = track.children.length;

  sliderState[name] = 0;

  dotsContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(name, i);
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(name, index) {
  const track = document.getElementById('slider-' + name);
  const dots = document.querySelectorAll('#dots-' + name + ' .dot');
  const count = track.children.length;

  sliderState[name] = (index + count) % count;
  track.style.transform = 'translateX(-' + (sliderState[name] * 100) + '%)';

  dots.forEach((d, i) => d.classList.toggle('active', i === sliderState[name]));
}

function changeSlide(name, direction) {
  goToSlide(name, sliderState[name] + direction);
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal(this.id);
  });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});