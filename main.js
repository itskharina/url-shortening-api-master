const input = document.querySelector('input');
const display = document.querySelector('.links');
const shortenBtn = document.querySelector('.shorten');
const copyBtn = document.querySelector('.copy');
const linksContainer = document.querySelector('.links');

async function shortenUrl(url) {
  const encoded = encodeURIComponent(url);
  const response = await fetch(
    `https://is.gd/create.php?format=json&url=${encoded}`,
    {
      mode: 'cors',
    }
  );
  const data = await response.json();
  console.log(data);
  return { data, url };
}

async function displayData(input) {
  if (!input.value) {
  }

  const { data, url } = await shortenUrl(input);
  display.innerHTML += `
  <li>
    <div class='left'>
      <p>${url}</p>
    </div>
    <div class='right'>
      <a href="${data.shorturl}">${data.shorturl}</a>
      <button class='copy'>Copy</button>
    </div>
  </li>`;
}

shortenBtn.addEventListener('click', function () {
  displayData(input.value);
});

linksContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('copy')) {
    const link = e.target.closest('li').querySelector('a');

    navigator.clipboard.writeText(link.textContent);
  }
});
