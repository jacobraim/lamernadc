/* ============================================================
   LA MERNA DC — events.js
   Replace EVENTS_DATA with real data from your CMS/API.
   ============================================================ */

(function () {
  'use strict';

  // ── Helpers ────────────────────────────────────────────────
  const $ = id => document.getElementById(id);

  // ── State ──────────────────────────────────────────────────
  const today = new Date();
  let currentYear  = today.getFullYear();
  let currentMonth = today.getMonth(); // 0-indexed
  let activeFilter = 'all';
  let activeView   = 'grid'; // 'grid' | 'agenda'

  // ── Category config ────────────────────────────────────────
  const CATEGORIES = {
    music:    { label: 'Live Music',      pillClass: 'cat-music',   barColor: '#8B1A1A', badgeBg: 'rgba(62,10,10,0.1)', badgeColor: '#8B1A1A' },
    tasting:  { label: "Chef's Tasting",  pillClass: 'cat-tasting', barColor: '#7A4010', badgeBg: 'rgba(92,40,10,0.1)', badgeColor: '#7A4010' },
    seasonal: { label: 'Seasonal',        pillClass: 'cat-seasonal',barColor: '#1A6040', badgeBg: 'rgba(10,50,30,0.1)', badgeColor: '#1A6040' },
    holiday:  { label: 'Holiday',         pillClass: 'cat-holiday', barColor: '#1A2880', badgeBg: 'rgba(10,20,80,0.1)', badgeColor: '#1A2880' },
    buyout:   { label: 'Private Buyout',  pillClass: 'cat-buyout',  barColor: '#444',    badgeBg: 'rgba(60,60,60,0.1)', badgeColor: '#444' },
  };

  // ── Event Data ─────────────────────────────────────────────
  // TODO: Replace with real events from your CMS or API.
  // Date format: YYYY-MM-DD
  const EVENTS_DATA = [
    // ── April 2026 ──
    {
      id: 'e01',
      title: 'Jazz & Rye',
      date: '2026-04-03',
      time: '8:00 PM – 11:00 PM',
      category: 'music',
      shortDesc: 'Live jazz trio in the dining room.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. The Merna Jazz Trio takes over the dining room for a long evening of standards, originals, and the kind of improvisation that pairs perfectly with a glass of Barolo. No cover charge — just come hungry.',
      capacity: '40 guests',
      price: 'No cover · À la carte dining',
      cta: 'Reserve a Table',
    },
    {
      id: 'e02',
      title: "Chef's Tasting: Spring Awakening",
      date: '2026-04-09',
      time: '7:00 PM – 10:00 PM',
      category: 'tasting',
      shortDesc: '6-course seasonal tasting menu.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Six courses built entirely around what arrived at the back door this week — spring peas, ramps, morels, and a suckling pig from a farm two hours north. Wine pairings available. Seats are extremely limited.',
      capacity: '16 guests',
      price: '$95 per person · Wine pairing +$55',
      cta: 'Reserve Your Seat',
    },
    {
      id: 'e03',
      title: 'Easter Sunday Feast',
      date: '2026-04-05',
      time: '12:00 PM – 8:00 PM',
      category: 'holiday',
      shortDesc: 'Special Easter menu, all day.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. La Merna opens for lunch and dinner on Easter Sunday with a special prix-fixe that celebrates the season — slow-roasted lamb, handmade agnolotti, and a dessert cart rolling tableside.',
      capacity: 'Full restaurant',
      price: '$75 per person · Children under 12 free',
      cta: 'Reserve a Table',
    },
    {
      id: 'e04',
      title: 'Private Buyout — Rossi Wedding Rehearsal',
      date: '2026-04-11',
      time: '7:00 PM – Midnight',
      category: 'buyout',
      shortDesc: 'Restaurant closed for private event.',
      desc: 'La Merna is reserved for a private event this evening. We will reopen for regular service on Saturday.',
      capacity: 'Private',
      price: 'Private event',
      cta: 'Inquire About Buyouts',
    },
    {
      id: 'e05',
      title: 'Live Acoustic: Soft Opening Series',
      date: '2026-04-17',
      time: '7:30 PM – 10:30 PM',
      category: 'music',
      shortDesc: 'Intimate acoustic set, dinner service.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A songwriter in the corner, candlelight, and the best pasta in the city. Our acoustic series continues with a rotating cast of DC-based musicians playing original material through dinner service. No reservations required for bar seating.',
      capacity: '45 guests',
      price: 'No cover · À la carte dining',
      cta: 'Reserve a Table',
    },
    {
      id: 'e06',
      title: 'Amaro & Digestivo Night',
      date: '2026-04-22',
      time: '9:00 PM – Midnight',
      category: 'seasonal',
      shortDesc: 'Late-night amaro flights + small plates.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. The kitchen stays open late and the bar goes deep into its Italian bottle collection. Guided amaro flights, late-night small plates, and a chance to taste the full digestivo program that most guests never see.',
      capacity: '30 guests',
      price: '$45 per person for the flight · À la carte food',
      cta: 'Reserve Your Spot',
    },
    {
      id: 'e07',
      title: "Chef's Tasting: Black Truffle Menu",
      date: '2026-04-28',
      time: '7:00 PM – 10:00 PM',
      category: 'tasting',
      shortDesc: '7-course menu centered on black truffle.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Once a season we go all-in on a single ingredient. This time: black truffle from Périgord, worked into every course from the amuse-bouche to the cheese cart. Wine pairings curated by our sommelier.',
      capacity: '14 guests',
      price: '$125 per person · Wine pairing +$75',
      cta: 'Reserve Your Seat',
    },
    // ── May 2026 ──
    {
      id: 'e08',
      title: "Mother's Day Brunch",
      date: '2026-05-10',
      time: '11:00 AM – 3:00 PM',
      category: 'holiday',
      shortDesc: 'Special brunch menu for Mother\'s Day.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A special brunch service for Mother\'s Day featuring a prix-fixe menu, Aperol spritzes on arrival, and a whole lot of handmade pasta.',
      capacity: 'Full restaurant',
      price: '$65 per person',
      cta: 'Reserve a Table',
    },
    {
      id: 'e09',
      title: 'Jazz Quartet: Spring Residency',
      date: '2026-05-01',
      time: '8:00 PM – 11:00 PM',
      category: 'music',
      shortDesc: 'Monthly jazz residency kicks off.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. We are thrilled to announce a monthly jazz residency kicking off this May. The DC-based quartet brings a mix of bebop and modern jazz for a full evening of live music through dinner service.',
      capacity: '40 guests',
      price: 'No cover · À la carte dining',
      cta: 'Reserve a Table',
    },
    {
      id: 'e10',
      title: 'Spring Menu Launch',
      date: '2026-05-15',
      time: '6:00 PM – 9:00 PM',
      category: 'seasonal',
      shortDesc: 'New spring menu debuts tonight.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. The full spring menu launches tonight. Come be among the first to try the new pasta program, updated desserts, and a refreshed cocktail list built around seasonal Italian aperitivi.',
      capacity: 'Full restaurant',
      price: 'À la carte dining',
      cta: 'Reserve a Table',
    },
    {
      id: 'e11',
      title: 'Memorial Day Weekend Cookout',
      date: '2026-05-23',
      time: '4:00 PM – 10:00 PM',
      category: 'holiday',
      shortDesc: 'Italian-American BBQ on the patio.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. We are taking the cookout Italian-American style this Memorial Day weekend — porchetta on the spit, grilled vegetables, Negroni slushies, and the patio fully open.',
      capacity: 'Patio + dining room',
      price: 'À la carte',
      cta: 'Reserve a Table',
    },
    {
      id: 'e12',
      title: "Chef's Tasting: Seafood Omakase",
      date: '2026-05-19',
      time: '7:00 PM – 10:30 PM',
      category: 'tasting',
      shortDesc: '8-course seafood-forward tasting menu.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A rare all-seafood tasting menu drawn from the day\'s catch. Eight courses, Italian preparations, and a wine list skewing hard toward coastal whites and Sicilian reds.',
      capacity: '12 guests',
      price: '$110 per person · Wine pairing +$65',
      cta: 'Reserve Your Seat',
    },
    // ── March 2026 ──
    {
      id: 'e13',
      title: 'Soft Opening Night',
      date: '2026-03-27',
      time: '6:00 PM – Midnight',
      category: 'seasonal',
      shortDesc: 'La Merna opens its doors.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. After months of preparation, La Merna opens its doors to the public for the first time. Come as you are. The pasta is ready.',
      capacity: 'Full restaurant',
      price: 'À la carte dining',
      cta: 'Reserve a Table',
    },
    {
      id: 'e14',
      title: 'Friends & Family Preview',
      date: '2026-03-25',
      time: '7:00 PM – 11:00 PM',
      category: 'buyout',
      shortDesc: 'Invite-only preview dinner.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A private dinner for friends, family, and the people who helped make La Merna possible.',
      capacity: 'Invite only',
      price: 'Private event',
      cta: 'Inquire About Buyouts',
    },
  ];

  // ── Filtered event list ────────────────────────────────────
  function getFilteredEvents() {
    return activeFilter === 'all'
      ? EVENTS_DATA
      : EVENTS_DATA.filter(e => e.category === activeFilter);
  }

  function getEventsForMonth(year, month) {
    return getFilteredEvents().filter(e => {
      const d = new Date(e.date + 'T00:00:00');
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }

  function getEventsForDay(year, month, day) {
    return getFilteredEvents().filter(e => {
      const d = new Date(e.date + 'T00:00:00');
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });
  }

  // ── Format helpers ─────────────────────────────────────────
  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function formatDateLong(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  // ── Render: grid view ──────────────────────────────────────
  function renderGrid() {
    const container = $('cal-days');
    container.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      const cell = document.createElement('div');
      cell.className = 'cal-day cal-day--empty cal-day--other-month';
      cell.innerHTML = `<span class="cal-day-num">${daysInPrevMonth - i}</span>`;
      container.appendChild(cell);
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      const isToday = (d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear());
      cell.className = 'cal-day' + (isToday ? ' cal-day--today' : '');

      const numEl = document.createElement('span');
      numEl.className = 'cal-day-num';
      numEl.textContent = d;
      cell.appendChild(numEl);

      const events = getEventsForDay(currentYear, currentMonth, d);
      const maxVisible = 2;

      events.slice(0, maxVisible).forEach(ev => {
        const btn = document.createElement('button');
        btn.className = `cal-event-pill ${CATEGORIES[ev.category].pillClass}`;
        btn.textContent = ev.title;
        btn.addEventListener('click', e => { e.stopPropagation(); openPopup(ev); });
        cell.appendChild(btn);
      });

      if (events.length > maxVisible) {
        const more = document.createElement('button');
        more.className = 'cal-event-pill cal-event-pill--more';
        more.textContent = `+${events.length - maxVisible} more`;
        more.addEventListener('click', e => {
          e.stopPropagation();
          openPopup(events[maxVisible]);
        });
        cell.appendChild(more);
      }

      container.appendChild(cell);
    }

    // Next month padding
    const totalCells = firstDay + daysInMonth;
    const remainder = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remainder; i++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day cal-day--empty cal-day--other-month';
      cell.innerHTML = `<span class="cal-day-num">${i}</span>`;
      container.appendChild(cell);
    }
  }

  // ── Render: agenda view ────────────────────────────────────
  function renderAgenda() {
    const container = $('cal-agenda');
    container.innerHTML = '';

    const events = getEventsForMonth(currentYear, currentMonth)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (events.length === 0) {
      container.innerHTML = '<p class="agenda-empty">No events this month.</p>';
      return;
    }

    // Group by date
    const grouped = {};
    events.forEach(ev => {
      if (!grouped[ev.date]) grouped[ev.date] = [];
      grouped[ev.date].push(ev);
    });

    Object.keys(grouped).sort().forEach(dateKey => {
      const group = document.createElement('div');
      group.className = 'agenda-group';

      const header = document.createElement('p');
      header.className = 'agenda-date-header';
      header.textContent = formatDateLong(dateKey);
      group.appendChild(header);

      grouped[dateKey].forEach(ev => {
        const cat = CATEGORIES[ev.category];
        const item = document.createElement('div');
        item.className = 'agenda-item';
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.innerHTML = `
          <div class="agenda-item-cat" style="background:${cat.barColor}"></div>
          <div class="agenda-item-time">${ev.time.split('–')[0].trim()}</div>
          <div class="agenda-item-body">
            <div class="agenda-item-title">${ev.title}</div>
            <div class="agenda-item-desc">${ev.shortDesc}</div>
          </div>
          <span class="agenda-item-tag ${cat.pillClass}">${cat.label}</span>
        `;
        item.addEventListener('click', () => openPopup(ev));
        item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openPopup(ev); });
        group.appendChild(item);
      });

      container.appendChild(group);
    });
  }

  // ── Render both views ──────────────────────────────────────
  function render() {
    $('month-label').textContent = `${MONTHS[currentMonth]} ${currentYear}`;
    renderGrid();
    renderAgenda();
  }

  // ── Popup ──────────────────────────────────────────────────
  function openPopup(ev) {
    const cat = CATEGORIES[ev.category];
    const overlay = $('popup-overlay');

    $('popup-badge').textContent   = cat.label;
    $('popup-badge').style.background = cat.badgeBg;
    $('popup-badge').style.color      = cat.badgeColor;

    $('popup-date').textContent  = formatDateLong(ev.date);
    $('popup-title').textContent = ev.title;
    $('popup-time').textContent  = ev.time;
    $('popup-desc').textContent  = ev.desc;

    $('popup-details').innerHTML = `
      <div class="popup-detail-row">
        <span class="popup-detail-label">Date</span>
        <span class="popup-detail-value">${formatDateLong(ev.date)}</span>
      </div>
      <div class="popup-detail-row">
        <span class="popup-detail-label">Time</span>
        <span class="popup-detail-value">${ev.time}</span>
      </div>
      <div class="popup-detail-row">
        <span class="popup-detail-label">Capacity</span>
        <span class="popup-detail-value">${ev.capacity}</span>
      </div>
      <div class="popup-detail-row">
        <span class="popup-detail-label">Pricing</span>
        <span class="popup-detail-value">${ev.price}</span>
      </div>
    `;

    $('popup-cta').textContent = ev.cta || 'Reserve Your Spot';

    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    $('popup-close').focus();
  }

  function closePopup() {
    $('popup-overlay').hidden = true;
    document.body.style.overflow = '';
  }

  // ── Event listeners ────────────────────────────────────────

  // Month navigation
  $('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    render();
  });

  $('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    render();
  });

  // View toggle
  $('btn-grid').addEventListener('click', () => {
    activeView = 'grid';
    $('view-grid').hidden   = false;
    $('view-agenda').hidden = true;
    $('btn-grid').classList.add('view-btn--active');
    $('btn-grid').setAttribute('aria-pressed', 'true');
    $('btn-agenda').classList.remove('view-btn--active');
    $('btn-agenda').setAttribute('aria-pressed', 'false');
  });

  $('btn-agenda').addEventListener('click', () => {
    activeView = 'agenda';
    $('view-grid').hidden   = true;
    $('view-agenda').hidden = false;
    $('btn-agenda').classList.add('view-btn--active');
    $('btn-agenda').setAttribute('aria-pressed', 'true');
    $('btn-grid').classList.remove('view-btn--active');
    $('btn-grid').setAttribute('aria-pressed', 'false');
  });

  // Category filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      activeFilter = btn.dataset.category;
      render();
    });
  });

  // Popup close
  $('popup-close').addEventListener('click', closePopup);
  $('popup-overlay').addEventListener('click', e => {
    if (e.target === $('popup-overlay')) closePopup();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePopup();
  });

  // Share button (Web Share API with clipboard fallback)
  $('popup-share').addEventListener('click', () => {
    const title = $('popup-title').textContent;
    const url   = window.location.href;
    if (navigator.share) {
      navigator.share({ title: `${title} — La Merna DC`, url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        $('popup-share').textContent = 'Link Copied!';
        setTimeout(() => { $('popup-share').textContent = 'Share Event'; }, 2000);
      });
    }
  });

  // ── Init ───────────────────────────────────────────────────
  // Default to current month, or April 2026 if before that
  if (currentYear < 2026 || (currentYear === 2026 && currentMonth < 3)) {
    currentYear  = 2026;
    currentMonth = 3; // April
  }

  render();

})();
