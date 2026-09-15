(function () {
  const overlay = document.getElementById('modal');
  const closeBtn = document.getElementById('modal-close');
  const modalIcon = document.getElementById('modal-icon');
  const modalStatus = document.getElementById('modal-status');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalShots = document.getElementById('modal-shots');
  const modalNoShots = document.getElementById('modal-no-shots');

  if (!overlay) return;

  function openModal(card) {
    const name = card.dataset.name || '';
    const status = card.dataset.status || '';
    const isLive = card.dataset.live === 'true';
    const desc = card.dataset.desc || '';
    const iconSrc = card.dataset.icon || '';
    let screenshots = [];
    try { screenshots = JSON.parse(card.dataset.screenshots || '[]'); } catch (e) {}

    // Icon
    if (iconSrc) {
      modalIcon.innerHTML = `<img src="${iconSrc}" alt="${name} icon">`;
    } else {
      const emojiEl = card.querySelector('.card-icon');
      const emoji = emojiEl ? emojiEl.textContent.trim() : '📱';
      modalIcon.innerHTML = `<span style="font-size:36px">${emoji}</span>`;
    }

    // Status badge
    const dotCls = isLive ? 'dot dot--live' : 'dot';
    const badgeCls = isLive ? 'card-status card-status--live' : 'card-status';
    modalStatus.className = badgeCls;
    modalStatus.innerHTML = `<span class="${dotCls}"></span>${status}`;

    // Text
    modalTitle.textContent = name;
    modalDesc.textContent = desc;

    // Screenshots
    modalShots.innerHTML = '';
    if (screenshots.length > 0) {
      modalNoShots.style.display = 'none';
      modalShots.style.display = 'flex';
      screenshots.forEach(function (src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = name + ' screenshot';
        img.className = 'modal-shot';
        modalShots.appendChild(img);
      });
    } else {
      modalShots.style.display = 'none';
      modalNoShots.style.display = 'block';
    }

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Wire up all cards
  document.querySelectorAll('.app-card').forEach(function (card) {
    card.addEventListener('click', function () { openModal(card); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  // Close handlers
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
