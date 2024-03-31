const input = document.querySelector('input');
const display = document.querySelector('.links');
const shortenBtn = document.querySelector('.shorten');
const copyBtn = document.querySelector('.copy');
const linksContainer = document.querySelector('.links');
const error = document.querySelector('.error');

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

async function displayData(string) {
  const validity = isValidUrl(string);
  if (!validity || string.value === '') {
    error.style.display = 'block';
    input.style.border = '2px solid hsl(0, 87%, 67%)';
    return;
  } else {
    input.style.border = 'none';
    error.style.display = 'none';
  }
  const { data, url } = await shortenUrl(string);
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

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}
