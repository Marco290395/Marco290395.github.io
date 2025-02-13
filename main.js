var ids = ['nav-about', 'nav-services', 'nav-fee', 'nav-contact'];
var nadineAge;
var nelioAge;

const scrollEventListener = () => {
  this.updateHash();
};

function addScrollEventListener() {
  document
    .querySelector('main')
    .addEventListener('scroll', scrollEventListener);
}

function removeScrollEventListener() {
  document
    .querySelector('main')
    .removeEventListener('scroll', scrollEventListener);
}

function setActiveNavigationClass(activeId) {
  ids.forEach((id) => {
    document.getElementById(id).classList.remove('active');
  });
  if (activeId === 'nav-') return;
  document.getElementById(activeId).classList.add('active');
}

function navigationClick(activeId) {
  removeScrollEventListener();
  setActiveNavigationClass(activeId);
}

function updateHash() {
  document.querySelectorAll('h1').forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top > 0 && rect.top < 150 && section.id) {
      const location = window.location.toString().split('#')[0];
      history.replaceState(null, null, location + '#' + section.id);
      this.setActiveNavigationClass(`nav-${section.id}`);
    }
  });
}

function scrollIntoViewAndWait(element) {
  return new Promise((resolve) => {
    document
      .querySelector('main')
      .addEventListener('scrollend', resolve, { once: true });
    if (element) {
      element.scrollIntoView();
    }
  });
}

function calculateAndSetBirthDates() {
  const nadineBirthDate = new Date(1991, 7, 26);
  const nelioBirthDate = new Date(2022, 10, 25);

  const nadineDiffMs = Date.now() - nadineBirthDate;
  const nadineAgeDate = new Date(nadineDiffMs); // miliseconds from epoch
  nadineAge = Math.abs(nadineAgeDate.getUTCFullYear() - 1970);
  document.getElementById('nadineAge').innerText = nadineAge;

  const nelioDiffMs = Date.now() - nelioBirthDate;
  const nelioAgeDate = new Date(nelioDiffMs); // miliseconds from epoch
  nelioAge = Math.abs(nelioAgeDate.getUTCFullYear() - 1970);
  document.getElementById('nelioAge').innerText = nelioAge;
}

function onImprintClick() {
  location.href = 'imprint.html';
}

function onDataPrivacyClick() {
  location.href = 'data-privacy.html';
}

function onStartUp() {
  addScrollEventListener();

  window.addEventListener('DOMContentLoaded', (event) => {
    calculateAndSetBirthDates();

    const hash = event.target.location.hash;

    const hashWithoutHashChar = hash.substring(1); // #menu -> menu
    this.setActiveNavigationClass(`nav-${hashWithoutHashChar}`);

    scrollIntoViewAndWait(document.getElementById(hashWithoutHashChar)).then(
      this.updateHash()
    );
  });

  document.querySelector('main').addEventListener('scrollend', () => {
    this.addScrollEventListener();
  });
}

onStartUp();
