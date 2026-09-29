const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('copy failed');
}

document.querySelectorAll('.link-card').forEach((card) => {
  const button = card.querySelector('.copy-btn');
  const platform = card.dataset.platform;
  const url = card.dataset.url;

  button.addEventListener('click', async () => {
    try {
      await copyText(url);
      button.textContent = 'تم النسخ';
      button.classList.add('copied');
      showToast(`تم نسخ رابط ${platform} إلى الحافظة`);
      setTimeout(() => {
        button.textContent = 'نسخ';
        button.classList.remove('copied');
      }, 1800);
    } catch {
      showToast('تعذر النسخ تلقائياً — انسخ الرابط من المتصفح');
    }
  });
});
