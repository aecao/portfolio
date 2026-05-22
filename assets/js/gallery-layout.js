(function () {
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

    Array.prototype.forEach.call(gallery.querySelectorAll(".tile"), function (tile) {
      tile.addEventListener("click", function (event) {
        event.preventDefault();
      });
    });

    scheduleLayout();
  }

  var galleries = document.querySelectorAll(".masonry");
  Array.prototype.forEach.call(galleries, initGallery);
})();
