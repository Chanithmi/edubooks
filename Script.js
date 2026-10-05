// Wait until the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const books = document.querySelectorAll('.book');
  const searchInput = document.getElementById('searchInput');
  const noResults = document.getElementById('noResults');

  // Feature 1: search / filter book cards
  function filterBooks() {
    const q = searchInput.value.trim().toLowerCase();
    let visible = 0;
    books.forEach(book => {
      const text = (book.dataset.title + ' ' + book.dataset.category).toLowerCase();
      const match = text.includes(q);
      book.classList.toggle('hidden', !match);
      if (match) visible++;
    });
    noResults.hidden = visible !== 0;
  }
  searchInput.addEventListener('input', filterBooks);
  document.getElementById('searchForm').addEventListener('submit', e => {
    e.preventDefault();
    filterBooks();
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
  });

  // Feature 2: newsletter validation (no real server)
  const form = document.getElementById('newsletterForm');
  const msg = document.getElementById('formMsg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    msg.className = 'form-msg ' + (valid ? 'ok' : 'err');
    msg.textContent = !email ? 'Please enter your email address.'
      : valid ? 'Thank you for subscribing to EduBooks!'
      : 'Please enter a valid email address (e.g. name@example.com).';
    if (valid) form.reset();
  });

  // Feature 3: View Details opens a dialog with book info
  const dialog = document.getElementById('bookDialog');
  books.forEach(book => {
    book.querySelector('button').addEventListener('click', () => {
      document.getElementById('dlgTitle').textContent = book.dataset.title;
      document.getElementById('dlgText').textContent = 'Category: ' + book.dataset.category + '. Full details coming soon.';
      dialog.showModal();
    });
  });
  document.getElementById('dlgClose').addEventListener('click', () => dialog.close());

  // Feature 4: Explore Books button scrolls to the books section
  document.getElementById('exploreBtn').addEventListener('click', () =>
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' }));

  // View All clears the search and shows every book
  document.getElementById('viewAll').addEventListener('click', () => { searchInput.value = ''; filterBooks(); });

  // Mobile menu toggle
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    links.querySelectorAll('a').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  }));
});