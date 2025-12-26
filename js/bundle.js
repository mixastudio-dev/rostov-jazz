document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const yOffset = -200;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.btn-page-up');

  if (!btn) return;

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  if (window.pageYOffset > 300) {
    btn.classList.add('visible');
  }
});

function checkVisibility() {
  const blocks = document.querySelectorAll('.animate-section');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, 500);
    }
  });
}

window.addEventListener('load', checkVisibility);
window.addEventListener('scroll', checkVisibility);

var swiper1 = new Swiper(".gallery-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  // navigation: {
  //   nextEl: ".gallery-slider .swiper-button-next",
  //   prevEl: ".gallery-slider .swiper-button-prev",
  // },
  breakpoints: {
    320: {
      slidesPerView: 1.25,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 2.2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  if (accordionItems) {
    accordionItems.forEach(item => {
      const trigger = item.querySelector('.accordion-item-header');
      const content = item.querySelector('.accordion-item-content');

      trigger.addEventListener('click', function() {
        const parent = this.parentNode;

        if (parent.classList.contains('active')) {
          parent.classList.remove('active');
          content.style.height = '0';
        } else {
          document.querySelectorAll('.accordion-item').forEach(child => {
            child.classList.remove('active');
            child.querySelector('.accordion-item-content').style.height = '0';
          });
          parent.classList.add('active');
          content.style.height = content.scrollHeight + 'px';
        }
      });
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-item .filter');

  if (filterButtons.length > 0 && !document.querySelector('.filter.active')) {
    filterButtons[0].classList.add('active');
    filterButtons[0].closest('.filter-item').classList.add('active');
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();

      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.closest('.filter-item').classList.remove('active');
      });

      this.classList.add('active');
      this.closest('.filter-item').classList.add('active');

      const filterText = this.textContent;

    });
  });

  const dropdownContainer = document.querySelector('.filter-drop-down');

  if (dropdownContainer) {
    const dropdownHeader = dropdownContainer.querySelector('.filter-dropdown-header');
    const dropdownOptions = dropdownContainer.querySelectorAll('.option');
    const dropdownParent = dropdownContainer.closest('.filter-item');

    dropdownParent.classList.remove('active');

    dropdownHeader.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdownContainer.classList.toggle('open');
    });

    dropdownOptions.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();

        const selectedValue = this.dataset.value;
        const selectedText = this.textContent;
        dropdownHeader.textContent = selectedText;
        dropdownContainer.classList.remove('open');
        dropdownOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });

    document.addEventListener('click', function(e) {
      if (!dropdownContainer.contains(e.target)) {
        dropdownContainer.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        dropdownContainer.classList.remove('open');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const videoContainers = document.querySelectorAll('.custom-video');

  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.button-play-video');
    const pauseBtn = container.querySelector('.button-pause-video');

    video.removeAttribute('controls');

    const updateState = () => {
      const isPlaying = !video.paused && !video.ended;
      const isHovering = container.matches(':hover');

      playBtn.classList.toggle('hidden', isPlaying);

      pauseBtn.classList.toggle('hidden', !isPlaying || !isHovering);
    };

    ['play', 'pause', 'ended'].forEach(evt => {
      video.addEventListener(evt, updateState);
    });

    ['mouseenter', 'mouseleave'].forEach(evt => {
      container.addEventListener(evt, updateState);
    });

    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.play();
    });

    pauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.pause();
    });

    video.addEventListener('click', (e) => {
      e.stopPropagation();
      video[video.paused || video.ended ? 'play' : 'pause']();
    });

    updateState();
  });
});

window.toggleAudio = function(button) {
  const audioItem = button.closest('.audio-item');
  const audio = audioItem.querySelector('audio');
  const allAudioItems = document.querySelectorAll('.audio-item audio');

  allAudioItems.forEach(otherAudio => {
    if (otherAudio !== audio && !otherAudio.paused) {
      otherAudio.pause();
      const otherButton = otherAudio.closest('.audio-item').querySelector('.audio-control');
      otherButton.classList.remove('playing');
    }
  });

  if (audio.paused) {
    audio.play();
    button.classList.add('playing');
  } else {
    audio.pause();
    button.classList.remove('playing');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const audioButtons = document.querySelectorAll('.audio-control');

  audioButtons.forEach(button => {
    button.removeAttribute('onclick');
    button.addEventListener('click', function() {
      toggleAudio(this);
    });
  });

  const audioElements = document.querySelectorAll('.audio-item audio');

  audioElements.forEach(audio => {
    const button = audio.closest('.audio-item').querySelector('.audio-control');

    audio.addEventListener('ended', function() {
      button.classList.remove('playing');
    });

    audio.addEventListener('pause', function() {
      button.classList.remove('playing');
    });

    audio.addEventListener('error', function() {
      button.classList.remove('playing');
      button.style.backgroundColor = '#f44336';
      button.title = 'Ошибка загрузки аудио';
    });
  });
});


const popup = document.querySelector('.header-nav');
const openButton = document.querySelector('.btn-popup-menu');
const closeButton = document.querySelector('.close-popup-menu');
const body = document.body;

function openPopup() {
  popup.classList.add('show');
  body.style.overflow = 'hidden';
}

function closePopup() {
  popup.classList.remove('show');
  body.style.overflow = '';
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

popup.addEventListener('click', function(e) {
  if (e.target === popup) {
    closePopup();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && popup.classList.contains('show')) {
    closePopup();
  }
});


document.addEventListener("DOMContentLoaded", function () {
  function isMobileResolution() {
    return window.innerWidth <= 1024;
  }

  function handleMenuAccordion() {
    const menuItems = document.querySelectorAll(".header-nav .menu-item-has-children");

    if (isMobileResolution()) {
      menuItems.forEach(function (item) {
        item.removeEventListener("click", liClickHandler);

        const link = item.querySelector("a:first-child");
        if (link) {
          link.removeEventListener("click", linkClickHandler);
        }

        item.addEventListener("click", liClickHandler);

        if (link) {
          link.addEventListener("click", linkClickHandler);
        }

        const subMenu = item.querySelector("ul");
        if (subMenu) {
          if (item.classList.contains("show")) {
            subMenu.style.height = subMenu.scrollHeight + "px";
          } else {
            subMenu.style.height = "0px";
          }
        }
      });
    } else {
      menuItems.forEach(function (item) {
        item.removeEventListener("click", liClickHandler);
        const link = item.querySelector("a:first-child");
        if (link) {
          link.removeEventListener("click", linkClickHandler);
        }
        const subMenu = item.querySelector("ul");
        if (subMenu) {
          subMenu.style.height = "";
        }
      });
    }
  }

  function liClickHandler(e) {
    if (e.target === this || e.target.parentElement === this) {
      if (e.target.tagName === 'A') return;
      toggleSubmenu(this);
    }
  }

  function linkClickHandler(e) {
    const parentLi = this.closest('.menu-item-has-children');
    if (!parentLi) return;

    if (!parentLi.classList.contains("show")) {
      e.preventDefault();
      toggleSubmenu(parentLi);
    }
  }

  function toggleSubmenu(liElement) {
    const subMenu = liElement.querySelector("ul");
    if (!subMenu) return;

    if (!liElement.classList.contains("show")) {
      document.querySelectorAll(".header-nav .menu-item-has-children.show").forEach(function (openItem) {
        if (openItem !== liElement) {
          const openSubMenu = openItem.querySelector("ul");
          openItem.classList.remove("show");
          if (openSubMenu) {
            openSubMenu.style.height = "0px";
          }
        }
      });
    }

    liElement.classList.toggle("show");

    if (liElement.classList.contains("show")) {
      const height = subMenu.scrollHeight + "px";
      subMenu.style.height = "0px";
      setTimeout(() => {
        subMenu.style.height = height;
      }, 10);
    } else {
      subMenu.style.height = "0px";
    }
  }

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      handleMenuAccordion();
    }, 250);
  });

  handleMenuAccordion();
});
