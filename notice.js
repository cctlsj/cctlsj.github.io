const photoInput = document.getElementById('photo');
const previewImage = document.getElementById('preview-image');
const saveBtn = document.getElementById('save-btn');
const saveMessage = document.getElementById('save-message');
const savedList = document.getElementById('saved-list');
const titleInput = document.getElementById('title');

const STORAGE_KEY = 'cctlab-notices';

const renderSavedNotices = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const notices = raw ? JSON.parse(raw) : [];
  savedList.innerHTML = '';
  notices.slice(-5).reverse().forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.title} (${item.savedAt})`;
    savedList.appendChild(li);
  });
};

photoInput?.addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    previewImage.style.display = 'none';
    previewImage.removeAttribute('src');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target?.result;
    previewImage.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

saveBtn?.addEventListener('click', () => {
  const title = titleInput.value.trim();
  if (!title) {
    saveMessage.textContent = '제목을 입력해 주세요.';
    return;
  }
  const savedAt = new Date().toLocaleString('ko-KR');
  const raw = localStorage.getItem(STORAGE_KEY);
  const notices = raw ? JSON.parse(raw) : [];
  notices.push({ title, savedAt });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
  saveMessage.textContent = `"${title}" 공지를 임시저장했습니다. (${savedAt})`;
  renderSavedNotices();
});

renderSavedNotices();