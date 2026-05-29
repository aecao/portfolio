(function () {
  function createLightbox() {
    var existing = document.querySelector(".lightbox");
    if (existing) {
      return existing;
    }

    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close image viewer">&times;</button>' +
      '<img class="lightbox-image" alt="" />';

    document.body.appendChild(lightbox);

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
    }

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target.classList.contains("lightbox-close")) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });

    return lightbox;
  }

  function indexOfSmallest(values) {
    var smallestIndex = 0;
    for (var i = 1; i < values.length; i += 1) {
      if (values[i] < values[smallestIndex]) {
        smallestIndex = i;
      }
    }
    return smallestIndex;
  }

  function getNumberVar(element, variableName, fallbackValue) {
    var raw = getComputedStyle(element).getPropertyValue(variableName);
    var parsed = parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : fallbackValue;
  }

  function getColumnCount(gallery) {
    var raw = getComputedStyle(gallery).getPropertyValue("--masonry-columns");
    var parsed = parseInt(raw, 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
      return 1;
    }
    return parsed;
  }

  function layoutGallery(gallery) {
    var tiles = Array.prototype.slice.call(gallery.querySelectorAll(".tile"));
    if (!tiles.length) {
      return;
    }

    gallery.classList.add("masonry-enhanced");

    var columnCount = getColumnCount(gallery);
    var gap = getNumberVar(gallery, "--masonry-gap", 8);
    var paddingLeft = getNumberVar(gallery, "padding-left", 0);
    var paddingRight = getNumberVar(gallery, "padding-right", 0);
    var usableWidth = Math.max(0, gallery.clientWidth - paddingLeft - paddingRight);
    var totalGap = gap * (columnCount - 1);
    var columnWidth = (usableWidth - totalGap) / columnCount;
    var columnHeights = new Array(columnCount).fill(0);
    var stackColumns = new Map();

    tiles.forEach(function (tile) {
      var stackKey = tile.getAttribute("data-stack");
      var columnIndex;

      if (stackKey && stackColumns.has(stackKey)) {
        columnIndex = stackColumns.get(stackKey);
      } else {
        columnIndex = indexOfSmallest(columnHeights);
        if (stackKey) {
          stackColumns.set(stackKey, columnIndex);
        }
      }

      var x = paddingLeft + (columnWidth + gap) * columnIndex;
      var y = columnHeights[columnIndex];

      tile.style.width = columnWidth + "px";
      tile.style.left = x + "px";
      tile.style.top = y + "px";

      columnHeights[columnIndex] = y + tile.offsetHeight + gap;
    });

    var tallest = Math.max.apply(Math, columnHeights);
    gallery.style.height = Math.max(0, tallest - gap) + "px";
  }

  function initGallery(gallery) {
    var rafId = null;
    var lightbox = createLightbox();

    function scheduleLayout() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(function () {
        layoutGallery(gallery);
      });
    }

    var images = Array.prototype.slice.call(gallery.querySelectorAll("img"));

    images.forEach(function (image) {
      if (!image.complete) {
        image.addEventListener("load", scheduleLayout, { once: true });
        image.addEventListener("error", scheduleLayout, { once: true });
      }
    });

    window.addEventListener("resize", scheduleLayout);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleLayout);
    }

    Array.prototype.forEach.call(gallery.querySelectorAll('.tile[data-lightbox="true"]'), function (tile) {
      tile.addEventListener("click", function (event) {
        event.preventDefault();

        var tileImage = tile.querySelector("img");
        var lightboxImage = lightbox.querySelector(".lightbox-image");
        var fullImageSrc = tile.getAttribute("data-lightbox-src") || (tileImage && tileImage.getAttribute("src"));

        if (!tileImage || !lightboxImage || !fullImageSrc) {
          return;
        }

        lightboxImage.src = fullImageSrc;
        lightboxImage.alt = tileImage.getAttribute("alt") || "Gallery image";

        lightbox.classList.add("is-open");
        document.body.classList.add("lightbox-open");
      });
    });

    scheduleLayout();
  }

  function startMasonryWhenReady() {
    var galleries = document.querySelectorAll(".masonry");
    Array.prototype.forEach.call(galleries, initGallery);
  }

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(startMasonryWhenReady, { timeout: 300 });
  } else {
    window.setTimeout(startMasonryWhenReady, 120);
  }
})();
