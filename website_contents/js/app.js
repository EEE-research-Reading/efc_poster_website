/**
 * Energy Flexibility Certificates Showcase — Interactive Application
 * Pure vanilla JavaScript (zero external dependencies).
 */
(function () {
  "use strict";

  /**
   * Central configuration: update `fullReportUrl` here whenever the final
   * published report link changes. If left as "#", clicking "Full Report"
   * displays a friendly status message.
   */
  const SITE_CONFIG = {
    fullReportUrl: "https://www.edrc.ac.uk/publications/demand-flexibility-certificates/",
    copyrightStartYear: 2026,
    siteTitle: "Energy Flexibility Certificates — Interactive Showcase",
    defaultShareText:
      "Explore how Energy Flexibility Certificates (EFCs) make building electricity flexibility visible, measurable, and easy to compare across a net-zero grid:"
  };

  /**
   * Thematic groups for the section-by-section browser.
   */
  const MODULE_GROUPS = [
    {
      id: "why-flexibility",
      title: "Part 1: Why Building Flexibility Matters",
      description: "How shifting electricity demand lowers costs, cuts carbon, and eases grid pressure."
    },
    {
      id: "how-efcs-work",
      title: "Part 2: How Energy Flexibility Certificates Work",
      description: "From scoring dimensions and building data to paired summer and winter ratings."
    },
    {
      id: "ratings-and-impact",
      title: "Part 3: Building Ratings & Real-World Benefits",
      description: "Bringing everything onto a clear rating grid and unlocking value across the network."
    }
  ];

  /**
   * Precision-calibrated metadata for the 10 modular poster sections (`efc1`–`efc10`).
   * - `hotspot`: exact percentages on `media/efc_poster.png` (9933 × 7016 px)
   * - `image`: dimensions and tight SVG `viewBox` framing the content inside each
   *   `single_paragraphs/efcN.png` file so there is no excessive blank margin.
   */
  const SECTIONS = [
    {
      id: "section-1",
      number: 1,
      group: "why-flexibility",
      title: "Flexibility shifts electricity use to cheaper, lower-carbon periods",
      shortLabel: "1. Shifting Electricity Use",
      summary:
        "Adjusting when buildings draw power helps match renewable solar and wind generation in real time, lowering bills and carbon emissions without burning fossil fuels.",
      transcript:
        "Instead of using fossil fuels to balance fluctuations in solar and wind energy, flexibility allows energy use to be adjusted in real time to better match available supply. Flexibility can significantly reduce the costs of electricity as it is about moving consumption to lower-carbon and lower-cost periods.",
      hotspot: { left: 3.8, top: 11.2, width: 21.8, height: 22.0 },
      image: {
        src: "media/single_paragraphs/efc1.png",
        downloadName: "EFC_Section_01_Shifts_Electricity_Use.png",
        width: 3334,
        height: 3334,
        viewBox: "540 850 2210 1660"
      }
    },
    {
      id: "section-2",
      number: 2,
      group: "why-flexibility",
      title: "The hidden flexibility potential of buildings",
      shortLabel: "2. Hidden Building Potential",
      summary:
        "Buildings are set to become one of the largest sources of demand flexibility in a net-zero system, yet we currently lack a consistent way to measure and compare it.",
      transcript:
        "Buildings are expected to become one of the largest sources of demand flexibility in a net-zero energy system. However, their flexibility potential remains largely untapped because there is currently no consistent way to measure and compare flexibility at the building level.",
      hotspot: { left: 26.5, top: 11.2, width: 21.4, height: 22.0 },
      image: {
        src: "media/single_paragraphs/efc2.png",
        downloadName: "EFC_Section_02_Hidden_Potential_of_Buildings.png",
        width: 3334,
        height: 3334,
        viewBox: "540 850 2270 1720"
      }
    },
    {
      id: "section-3",
      number: 3,
      group: "why-flexibility",
      title: "Demand flexibility reduces pressure on electricity networks",
      shortLabel: "3. Easing Network Pressure",
      summary:
        "As electric heating and transport create sharper demand peaks alongside intermittent renewables, demand-side response keeps supply and demand smoothly balanced.",
      transcript:
        "As renewables replace fossil fuels, energy supply becomes more intermittent and less flexible. Meanwhile, electrification of transport and heat is pushing demand higher and creating sharper peaks. Flexibility, through storage, interconnection, and demand-side response, is essential to keep supply and demand in balance.",
      hotspot: { left: 48.9, top: 11.2, width: 23.2, height: 22.0 },
      image: {
        src: "media/single_paragraphs/efc3.png",
        downloadName: "EFC_Section_03_Reduces_Network_Pressure.png",
        width: 3334,
        height: 3334,
        viewBox: "540 850 2250 1760"
      }
    },
    {
      id: "section-4",
      number: 4,
      group: "why-flexibility",
      title: "Energy Flexibility Certificates make flexibility visible and measurable",
      shortLabel: "4. Visible & Measurable",
      summary:
        "Consistent property-level assessments help network operators, market participants, consumers, and local authorities participate, plan, and invest with confidence.",
      transcript:
        "Limited understanding of building flexibility restricts participation in flexibility services and makes network planning and decarbonisation harder for all stakeholders, from network operators to local authorities. Consistent methods to assess and communicate flexibility potential at the property level are essential to improve participation, planning, and investment decisions.",
      hotspot: { left: 73.1, top: 11.2, width: 23.1, height: 22.0 },
      image: {
        src: "media/single_paragraphs/efc4.png",
        downloadName: "EFC_Section_04_Visible_and_Measurable.png",
        width: 3334,
        height: 3334,
        viewBox: "540 850 2360 1720"
      }
    },
    {
      id: "section-5",
      number: 5,
      group: "how-efcs-work",
      title: "EFCs quantify building flexibility potential",
      shortLabel: "5. Dual Rating (A–F & 1–6)",
      summary:
        "A dual rating captures both 'How much?' (Nominal rating A–F for shiftable demand) and 'How good?' (Quality rating 1–6 based on speed, frequency, and duration).",
      transcript:
        "EFCs summarise a building's flexibility potential through a dual rating. A nominal rating (A–F) captures the magnitude of demand that can be increased or decreased. A quality rating (1–6) reflects how easily that flexibility can be harnessed, based on how fast, how often, and for how long the building can respond.",
      hotspot: { left: 3.8, top: 38.2, width: 21.8, height: 25.4 },
      image: {
        src: "media/single_paragraphs/efc5.png",
        downloadName: "EFC_Section_05_Quantify_Flexibility_Potential.png",
        width: 3334,
        height: 3334,
        viewBox: "540 850 2240 1900"
      }
    },
    {
      id: "section-6",
      number: 6,
      group: "how-efcs-work",
      title: "Flexibility dimensions that contribute to EFCs",
      shortLabel: "6. Flexibility Dimensions",
      summary:
        "Scores nine key dimensions: upper & lower bounds, top 3 sources, response rate, frequency, duration, notice period, passive/active ratio, control type, and preconditioning.",
      transcript:
        "Demand Flexibility potential is mapped across nine defined dimensions, where higher scores reflect better quality and suitability: Upper & Lower bounds, Top 3 Flexibility sources, Response Rate, Frequency, Duration, Notice Period, Passive/Active source ratio, Manual/Automated control, and Preconditioning.",
      hotspot: { left: 26.5, top: 38.2, width: 21.4, height: 25.4 },
      image: {
        src: "media/single_paragraphs/efc6.png",
        downloadName: "EFC_Section_06_Flexibility_Dimensions.png",
        width: 3334,
        height: 3334,
        viewBox: "540 850 2180 1830"
      }
    },
    {
      id: "section-7",
      number: 7,
      group: "how-efcs-work",
      title: "Data needed to inform ratings",
      shortLabel: "7. Data Requirements",
      summary:
        "Groups building flexibility into Basal (fabric cooldown), Heating/Cooling (system COP), and Technology-enabled (managed loads) alongside practical data metrics.",
      transcript:
        "Components contributing to a building's Demand Flexibility potential are grouped into three types: (1) Basal Flexibility — e.g. building cooldown profile measured via temperature drop rate from half-hourly internal temperature records; (2) Heating/Cooling Flexibility — e.g. system performance via Coefficient of Performance from minutely heat records; and (3) Technology-enabled Flexibility — e.g. power ratings of managed demand loads [kW] during operation.",
      hotspot: { left: 48.9, top: 38.2, width: 23.2, height: 25.4 },
      image: {
        src: "media/single_paragraphs/efc7.png",
        downloadName: "EFC_Section_07_Data_Needed_for_Ratings.png",
        width: 3334,
        height: 3334,
        viewBox: "510 850 2400 2100"
      }
    },
    {
      id: "section-8",
      number: 8,
      group: "how-efcs-work",
      title: "Summer/winter flexibility ratings",
      shortLabel: "8. Summer & Winter Ratings",
      summary:
        "Because energy use shifts across seasons, working days, and times of day, ratings come in seasonal pairs—one for winter and one for summer.",
      transcript:
        "The data collected on each component reflects a moving target. Demand and flexibility shift with seasons, working days, and time of day: a building's flexibility potential in winter looks very different from summer. The ratings therefore come in pairs: one for summer, one for winter, ensuring flexibility is captured as it actually occurs.",
      hotspot: { left: 73.1, top: 38.2, width: 23.1, height: 25.4 },
      image: {
        src: "media/single_paragraphs/efc8.png",
        downloadName: "EFC_Section_08_Summer_Winter_Ratings.png",
        width: 3334,
        height: 3334,
        viewBox: "470 850 2560 2040"
      }
    },
    {
      id: "section-9",
      number: 9,
      group: "ratings-and-impact",
      title: "A rating for every building",
      shortLabel: "9. Rating Grid (e.g. C2 / B5)",
      summary:
        "Weighted component scores condense into two clear coordinates on a 6×6 rating grid—giving every building comparable winter and summer assessments.",
      transcript:
        "Once the relevant data has been collected, it is fed into the Demand Flexibility rating procedure. Each component is scored and weighted based on its contribution to flexibility provision, condensing a wealth of information into two summary ratings: Nominal (A–F), capturing how much demand can be shifted, and Quality (1–6), capturing how easily. Every building receives two final assessments: one for winter (e.g. C2) and one for summer (e.g. B5).",
      hotspot: { left: 3.8, top: 68.6, width: 24.1, height: 27.8 },
      image: {
        src: "media/single_paragraphs/efc9.png",
        downloadName: "EFC_Section_09_A_Rating_for_Every_Building.png",
        width: 3334,
        height: 3334,
        viewBox: "550 850 2420 2110"
      }
    },
    {
      id: "section-10",
      number: 10,
      group: "ratings-and-impact",
      title: "Benefits associated with use cases",
      shortLabel: "10. Use Cases & Benefits",
      summary:
        "Supports four core use cases—granular forecasting, network planning, DSO flexibility procurement, and operational dispatch—benefiting teams and government alike.",
      transcript:
        "EFCs support four core use cases: (i) Granular Forecasting — more efficient network investments and improved LV-level demand forecasting; (ii) Network Planning — identifying weak/strong areas and improving planning reliability; (iii) DSO Flexibility Procurement — higher success rates, accuracy in availability, and targeted products for consumer groups; and (iv) Flexibility Dispatch / Manage Network Load — higher system efficiency, lower operational costs, and increased network resilience.",
      wide: true,
      hotspot: { left: 28.9, top: 68.6, width: 67.3, height: 27.8 },
      image: {
        src: "media/single_paragraphs/efc10.png",
        downloadName: "EFC_Section_10_Benefits_and_Use_Cases.png",
        width: 7545,
        height: 3334,
        viewBox: "160 580 6830 2260"
      }
    }
  ];

  /**
   * Mock Certificate lightbox item (accessible alongside sections via `#certificate-view`).
   */
  const CERTIFICATE_ITEM = {
    id: "certificate-view",
    isCertificate: true,
    counterLabel: "Illustrative Certificate",
    title: "Mock Demand Flexibility Certificate (For Illustration Only)",
    transcript:
      "Illustrative HM Government-style Demand Flexibility Certificate for a domestic/non-domestic building. Displays a Summer Rating of C4 and a Winter Rating of A3. Technical Information lists Main Flexible Load: Heat Pump; Demand Management Control: Automated; Response Frequency: 2 events/day. Benchmarks indicate similar buildings could achieve A1 if newly built or D5 if typical of existing stock.",
    image: {
      src: "media/mock_efc.jpg",
      downloadName: "Mock_Energy_Flexibility_Certificate.jpg",
      width: 1241,
      height: 1755,
      viewBox: "0 0 1241 1755"
    }
  };

  // All navigable items in the lightbox (10 poster sections + mock certificate)
  const ALL_MODAL_ITEMS = [...SECTIONS, CERTIFICATE_ITEM];

  // State
  let currentModalIndex = -1;
  let currentZoom = 1;
  let lastFocusedElement = null;
  let toastTimer = null;

  // DOM Elements
  const posterStage = document.getElementById("poster-stage");
  const posterHotspots = document.getElementById("poster-hotspots");
  const toggleGuidesBtn = document.getElementById("toggle-guides-btn");
  const toggleGuidesLabel = document.getElementById("toggle-guides-label");
  const startTourBtn = document.getElementById("start-tour-btn");
  const modulesContainer = document.getElementById("modules-container");

  const openCertBtn = document.getElementById("open-certificate-btn");
  const openCertBtnSecondary = document.getElementById("open-certificate-btn-secondary");
  const shareCertBtn = document.getElementById("share-certificate-btn");

  const lightbox = document.getElementById("lightbox");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxViewport = document.getElementById("lightbox-viewport");
  const lightboxCanvas = document.getElementById("lightbox-canvas");
  const lightboxStageWrap = lightbox.querySelector(".lightbox-stage-wrap");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxDownload = document.getElementById("lightbox-download");
  const lightboxTranscriptDetails = document.getElementById("lightbox-transcript-details");
  const lightboxTranscriptBody = document.getElementById("lightbox-transcript-body");
  const zoomButtons = Array.from(lightbox.querySelectorAll("[data-zoom]"));
  const toastEl = document.getElementById("toast");

  /**
   * Build an inline SVG that frames the exact content bounds of an image cleanly.
   */
  function createFramedSvgMarkup(imageMeta, ariaLabel, lazy) {
    const hrefAttr = lazy ? `data-href="${imageMeta.src}"` : `href="${imageMeta.src}"`;
    return `
      <svg viewBox="${imageMeta.viewBox}" role="img" aria-label="${escapeHtml(ariaLabel)}" xmlns="http://www.w3.org/2000/svg">
        <image ${hrefAttr} width="${imageMeta.width}" height="${imageMeta.height}" preserveAspectRatio="xMidYMid meet" />
      </svg>
    `;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /**
   * Render the 10 section hotspots + QR report hotspot onto the full poster.
   */
  function renderPosterHotspots() {
    const frag = document.createDocumentFragment();

    // QR Code 'Full report' hotspot at the top of the poster
    const qrLink = document.createElement("a");
    qrLink.className = "poster-hotspot poster-hotspot--qr js-report-link";
    qrLink.href = SITE_CONFIG.fullReportUrl || "#full-report";
    qrLink.target = "_blank";
    qrLink.rel = "noopener noreferrer";
    qrLink.style.left = "40.5%";
    qrLink.style.top = "2.8%";
    qrLink.style.width = "4.7%";
    qrLink.style.height = "4.1%";
    qrLink.setAttribute("aria-label", "Open the Full Report referenced by the poster QR code");
    qrLink.innerHTML = `<span class="hotspot-cta">Full report</span>`;
    frag.appendChild(qrLink);

    // 10 modular section hotspots
    SECTIONS.forEach((sec, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "poster-hotspot poster-hotspot--section";
      btn.style.left = `${sec.hotspot.left}%`;
      btn.style.top = `${sec.hotspot.top}%`;
      btn.style.width = `${sec.hotspot.width}%`;
      btn.style.height = `${sec.hotspot.height}%`;
      btn.setAttribute(
        "aria-label",
        `Zoom into Section ${sec.number} of 10: ${sec.title}`
      );
      btn.innerHTML = `
        <span class="hotspot-badge">${sec.number} / 10</span>
        <span class="hotspot-cta">Zoom into section ${sec.number}</span>
      `;
      btn.addEventListener("click", () => openModalByIndex(index));
      frag.appendChild(btn);
    });

    posterHotspots.appendChild(frag);
  }

  /**
   * Render the mobile-friendly grouped module cards below the poster.
   */
  function renderModuleCards() {
    const html = MODULE_GROUPS.map((group) => {
      const items = SECTIONS.filter((s) => s.group === group.id);
      const cardsHtml = items
        .map((sec) => {
          const idx = SECTIONS.indexOf(sec);
          return `
            <article class="module-card ${sec.wide ? "module-card--wide" : ""}">
              <button
                type="button"
                class="module-card-thumb"
                data-open-index="${idx}"
                aria-label="Open high-resolution graphic for Section ${sec.number}: ${escapeHtml(sec.title)}"
              >
                ${createFramedSvgMarkup(sec.image, sec.title, true)}
              </button>
              <div class="module-card-body">
                <span class="module-card-num">Section ${sec.number} of 10</span>
                <h4 class="module-card-title">${escapeHtml(sec.title)}</h4>
                <p class="module-card-summary">${escapeHtml(sec.summary)}</p>
                <div class="module-card-footer">
                  <button type="button" class="module-open-btn" data-open-index="${idx}">
                    Inspect graphic &rarr;
                  </button>
                  <a href="${sec.image.src}" download="${sec.image.downloadName}" class="nav-link" title="Download section PNG">
                    PNG
                  </a>
                </div>
              </div>
            </article>
          `;
        })
        .join("");

      return `
        <div class="module-group">
          <div class="module-group-header">
            <h3 class="module-group-title">${escapeHtml(group.title)}</h3>
            <p class="module-group-desc">${escapeHtml(group.description)}</p>
          </div>
          <div class="module-cards-grid">
            ${cardsHtml}
          </div>
        </div>
      `;
    }).join("");

    modulesContainer.innerHTML = html;

    // Bind click listeners
    modulesContainer.querySelectorAll("[data-open-index]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-open-index"));
        openModalByIndex(idx);
      });
    });

    // Lazy-hydrate SVG `<image data-href="...">` thumbnails when scrolled near viewport
    const lazySvgImages = modulesContainer.querySelectorAll("image[data-href]");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const imgEl = entry.target;
              const src = imgEl.getAttribute("data-href");
              if (src) {
                imgEl.setAttribute("href", src);
                imgEl.removeAttribute("data-href");
              }
              obs.unobserve(imgEl);
            }
          });
        },
        { rootMargin: "350px 0px" }
      );
      lazySvgImages.forEach((el) => observer.observe(el));
    } else {
      lazySvgImages.forEach((el) => {
        el.setAttribute("href", el.getAttribute("data-href"));
        el.removeAttribute("data-href");
      });
    }
  }

  /**
   * Open the lightbox modal at a given index in `ALL_MODAL_ITEMS`.
   */
  function openModalByIndex(index, updateHash = true) {
    if (index < 0 || index >= ALL_MODAL_ITEMS.length) return;

    if (lightbox.hidden) {
      lastFocusedElement = document.activeElement;
      lightbox.hidden = false;
      document.body.classList.add("modal-open");
    }

    currentModalIndex = index;
    const item = ALL_MODAL_ITEMS[index];

    lightboxCounter.textContent = item.isCertificate
      ? item.counterLabel
      : `Section ${item.number} of ${SECTIONS.length}`;
    lightboxTitle.textContent = item.title;

    lightboxStageWrap.classList.toggle("is-white-bg", Boolean(item.isCertificate));
    lightboxCanvas.innerHTML = createFramedSvgMarkup(item.image, item.title, false);

    lightboxTranscriptBody.innerHTML = `<p>${escapeHtml(item.transcript)}</p>`;
    lightboxTranscriptDetails.open = false;

    lightboxDownload.href = item.image.src;
    lightboxDownload.setAttribute("download", item.image.downloadName);

    setZoom(1);

    if (updateHash) {
      history.replaceState(null, "", `#${item.id}`);
    }

    // Preload neighbouring section images for instant Next/Previous transitions
    preloadAdjacentImages(index);
    lightboxClose.focus();
  }

  function preloadAdjacentImages(index) {
    const prevIdx = (index - 1 + ALL_MODAL_ITEMS.length) % ALL_MODAL_ITEMS.length;
    const nextIdx = (index + 1) % ALL_MODAL_ITEMS.length;
    [prevIdx, nextIdx].forEach((i) => {
      const preload = new Image();
      preload.src = ALL_MODAL_ITEMS[i].image.src;
    });
  }

  function closeModal(clearHash = true) {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("modal-open");
    currentModalIndex = -1;

    if (clearHash && window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function stepModal(delta) {
    if (currentModalIndex === -1) return;
    const nextIndex =
      (currentModalIndex + delta + ALL_MODAL_ITEMS.length) % ALL_MODAL_ITEMS.length;
    openModalByIndex(nextIndex);
  }

  /**
   * Adjust zoom level inside the modal (`1`, `1.65`, `2.4`).
   */
  function setZoom(zoomFactor) {
    currentZoom = zoomFactor;
    const isZoomed = zoomFactor > 1.01;
    lightboxViewport.classList.toggle("is-zoomed", isZoomed);
    lightboxCanvas.style.width = isZoomed ? `${Math.round(zoomFactor * 100)}%` : "100%";

    zoomButtons.forEach((btn) => {
      const btnZoom = Number(btn.getAttribute("data-zoom"));
      btn.classList.toggle("is-active", Math.abs(btnZoom - zoomFactor) < 0.05);
    });

    lightboxViewport.scrollTop = 0;
    lightboxViewport.scrollLeft = 0;
  }

  /**
   * Enable click-and-drag panning inside the modal viewport when zoomed in.
   */
  function setupDragToPan() {
    let isDown = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    lightboxViewport.addEventListener("mousedown", (e) => {
      if (currentZoom <= 1.01) return;
      isDown = true;
      startX = e.pageX - lightboxViewport.offsetLeft;
      startY = e.pageY - lightboxViewport.offsetTop;
      scrollLeft = lightboxViewport.scrollLeft;
      scrollTop = lightboxViewport.scrollTop;
    });

    window.addEventListener("mouseup", () => {
      isDown = false;
    });

    lightboxViewport.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - lightboxViewport.offsetLeft;
      const y = e.pageY - lightboxViewport.offsetTop;
      lightboxViewport.scrollLeft = scrollLeft - (x - startX);
      lightboxViewport.scrollTop = scrollTop - (y - startY);
    });
  }

  /**
   * Build contextual URL & message for social sharing (page-level or current modal view).
   */
  function getSharePayload(scope) {
    const baseUrl = window.location.origin + window.location.pathname + window.location.search;
    if (scope === "modal" && currentModalIndex >= 0) {
      const item = ALL_MODAL_ITEMS[currentModalIndex];
      const deepUrl = `${baseUrl}#${item.id}`;
      const prefix = item.isCertificate
        ? `Take a look at this illustrative Energy Flexibility Certificate:`
        : `Section ${item.number} of the Energy Flexibility Certificates poster — "${item.title}":`;
      return {
        url: deepUrl,
        title: `${item.title} | ${SITE_CONFIG.siteTitle}`,
        text: prefix
      };
    }

    if (scope === "certificate") {
      return {
        url: `${baseUrl}#mock-certificate`,
        title: `Mock Energy Flexibility Certificate | ${SITE_CONFIG.siteTitle}`,
        text: "See what an illustrative Energy Flexibility Certificate looks like for a real building:"
      };
    }

    return {
      url: baseUrl,
      title: SITE_CONFIG.siteTitle,
      text: SITE_CONFIG.defaultShareText
    };
  }

  function triggerShare(platform, scope) {
    const { url, title, text } = getSharePayload(scope);

    switch (platform) {
      case "linkedin": {
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank", "noopener,noreferrer,width=640,height=580");
        break;
      }
      case "bluesky": {
        const composeText = `${text} ${url}`;
        const shareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(composeText)}`;
        window.open(shareUrl, "_blank", "noopener,noreferrer,width=640,height=580");
        break;
      }
      case "twitter": {
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank", "noopener,noreferrer,width=640,height=520");
        break;
      }
      case "email": {
        const mailto = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
        window.location.href = mailto;
        break;
      }
      case "copy": {
        copyToClipboard(url);
        break;
      }
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => showToast("Link copied to clipboard"))
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Link copied to clipboard");
    } catch (_) {
      showToast(`Copy link: ${text}`);
    }
    document.body.removeChild(ta);
  }

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 3200);
  }

  /**
   * Configure Full Report links across header, poster toolbar, QR hotspot, and footer.
   */
  function setupReportLinks() {
    document.querySelectorAll(".js-report-link").forEach((link) => {
      if (SITE_CONFIG.fullReportUrl) {
        link.href = SITE_CONFIG.fullReportUrl;
      } else {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          showToast(
            "Full report link placeholder — set SITE_CONFIG.fullReportUrl in js/app.js when ready."
          );
        });
      }
    });
  }

  /**
   * Open deep-linked section or certificate if URL hash matches (`#section-1`..`#section-10`, `#certificate-view`).
   */
  function handleHashRoute() {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    const matchIdx = ALL_MODAL_ITEMS.findIndex((item) => item.id === hash);
    if (matchIdx !== -1) {
      openModalByIndex(matchIdx, false);
    }
  }

  /**
   * Wire up UI events and keyboard navigation.
   */
  function bindEvents() {
    toggleGuidesBtn.addEventListener("click", () => {
      const nextState = toggleGuidesBtn.getAttribute("aria-pressed") !== "true";
      toggleGuidesBtn.setAttribute("aria-pressed", String(nextState));
      posterStage.classList.toggle("show-guides", nextState);
      toggleGuidesLabel.textContent = nextState
        ? "Hide Section Outlines"
        : "Show Section Outlines";
    });

    startTourBtn.addEventListener("click", () => openModalByIndex(0));

    const certIdx = ALL_MODAL_ITEMS.indexOf(CERTIFICATE_ITEM);
    openCertBtn.addEventListener("click", () => openModalByIndex(certIdx));
    openCertBtnSecondary.addEventListener("click", () => openModalByIndex(certIdx));
    shareCertBtn.addEventListener("click", () => triggerShare("copy", "certificate"));

    lightboxClose.addEventListener("click", () => closeModal(true));
    lightboxPrev.addEventListener("click", () => stepModal(-1));
    lightboxNext.addEventListener("click", () => stepModal(1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeModal(true);
      }
    });

    zoomButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        setZoom(Number(btn.getAttribute("data-zoom")));
      });
    });

    document.querySelectorAll("[data-share-platform]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const platform = btn.getAttribute("data-share-platform");
        const scope = btn.getAttribute("data-share-scope") || "page";
        triggerShare(platform, scope);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeModal(true);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepModal(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        stepModal(1);
      } else if (e.key === "Tab") {
        // Keep keyboard focus trapped cleanly inside the open modal
        const focusables = Array.from(
          lightbox.querySelectorAll(
            'button:not([disabled]), [href], summary, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);

        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("hashchange", handleHashRoute);
  }

  /**
   * Automatically format the footer copyright year or year range
   * (e.g. "2026" in 2026, then "2026–2027" in 2027, etc.).
   */
  function updateCopyrightYears() {
    const el = document.getElementById("copyright-years");
    if (!el) return;
    const startYear =
      Number(el.getAttribute("data-start-year")) || SITE_CONFIG.copyrightStartYear;
    const currentYear = new Date().getFullYear();
    el.textContent =
      currentYear > startYear ? `${startYear}\u2013${currentYear}` : `${startYear}`;
  }

  // Initialise
  updateCopyrightYears();
  renderPosterHotspots();
  renderModuleCards();
  setupReportLinks();
  setupDragToPan();
  bindEvents();
  handleHashRoute();
})();
