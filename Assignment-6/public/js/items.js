let currentPage = 1;

window.addEventListener('load', () => {
  loadItems();
});

function loadItems(page = 1) {
  currentPage = page;
  const category = document.getElementById('category-filter')?.value || '';
  const condition = document.getElementById('condition-filter')?.value || '';
  const minPrice = document.getElementById('min-price')?.value || '';
  const maxPrice = document.getElementById('max-price')?.value || '';
  const search = document.getElementById('search-filter')?.value || '';

  let url = `${API_URL}/items/?page=${page}&limit=12`;
  if (category) url += `&category=${category}`;
  if (condition) url += `&condition=${condition}`;
  if (minPrice) url += `&minPrice=${minPrice}`;
  if (maxPrice) url += `&maxPrice=${maxPrice}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;

  // Check URL params
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('category')) {
    url = `${API_URL}/items/?page=${page}&limit=12&category=${urlParams.get('category')}`;
    document.getElementById('category-filter').value = urlParams.get('category');
  }
  if (urlParams.has('search')) {
    url = `${API_URL}/items/?page=${page}&limit=12&search=${encodeURIComponent(urlParams.get('search'))}`;
    document.getElementById('search-filter').value = urlParams.get('search');
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById('items-grid');
      grid.innerHTML = data.items.length > 0 
        ? data.items.map(item => createItemCard(item)).join('')
        : '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No items found</p>';

      // Pagination
      const paginationDiv = document.getElementById('pagination');
      let paginationHTML = '';
      for (let i = 1; i <= data.pages; i++) {
        paginationHTML += `
          <button class="${i === currentPage ? 'active' : ''}" onclick="loadItems(${i})">
            ${i}
          </button>
        `;
      }
      paginationDiv.innerHTML = paginationHTML;
    })
    .catch(err => {
      console.error('Error loading items:', err);
      document.getElementById('items-grid').innerHTML = '<p>Error loading items</p>';
    });
}

function applyFilters() {
  loadItems(1);
}

function resetFilters() {
  document.getElementById('category-filter').value = '';
  document.getElementById('condition-filter').value = '';
  document.getElementById('min-price').value = '';
  document.getElementById('max-price').value = '';
  document.getElementById('search-filter').value = '';
  loadItems(1);
}
