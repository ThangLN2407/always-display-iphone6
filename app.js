/**
 * StandBy 6s — Ứng dụng màn hình chờ ngang tối giản cho iPhone 6s (iOS 15)
 * Đồng hồ + Lịch Âm Dương Việt Nam + Thời tiết & Độ ẩm (Open-Meteo API)
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'standby_6s_config_v1';
  var WEATHER_CACHE_KEY = 'standby_6s_weather_v1';
  var WEATHER_INTERVAL_MS = 15 * 60 * 1000; // 15 phút
  var PIXEL_SHIFT_INTERVAL_MS = 10 * 60 * 1000; // 10 phút

  var WEEKDAYS_VI = [
    'Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'
  ];

  var CLOCK_STYLES = ['minimal', 'cards', 'bold'];
  var CLOCK_STYLE_LABELS = {
    minimal: 'Tối giản',
    cards: 'Thẻ đôi',
    bold: 'Đậm nét'
  };

  var defaultConfig = {
    cityName: 'Hà Nội',
    lat: 21.0285,
    lon: 105.8542,
    clockStyle: 'minimal',
    hourFormat: '24',
    nightMode: 'auto', // 'auto' | 'on' | 'off'
    dimmer: 0,
    forceLandscape: false
  };

  var config = loadConfig();
  var lastRenderedDateKey = '';
  var wakeLockSentinel = null;
  var noSleepVideo = null;
  var isWakeLockActive = false;

  // DOM Elements
  var els = {
    topWeekday: document.getElementById('top-weekday'),
    topSolarDate: document.getElementById('top-solar-date'),
    topLunarBadge: document.getElementById('top-lunar-badge'),
    locationName: document.getElementById('location-name'),
    btnLocation: document.getElementById('btn-location'),
    btnWakelock: document.getElementById('btn-wakelock'),
    wakelockDot: document.getElementById('wakelock-dot'),
    wakelockText: document.getElementById('wakelock-text'),
    btnRotate: document.getElementById('btn-rotate'),
    btnNight: document.getElementById('btn-night'),
    btnSettings: document.getElementById('btn-settings'),
    btnCloseSettings: document.getElementById('btn-close-settings'),

    dayPeriod: document.getElementById('day-period'),
    clockStyleLabel: document.getElementById('clock-style-label'),
    clockDisplay: document.getElementById('clock-display'),
    hD1: document.getElementById('h-d1'),
    hD2: document.getElementById('h-d2'),
    mD1: document.getElementById('m-d1'),
    mD2: document.getElementById('m-d2'),
    sD1: document.getElementById('s-d1'),
    sD2: document.getElementById('s-d2'),
    clockColon: document.getElementById('clock-colon'),
    secondBar: document.getElementById('second-bar'),
    fullSolarLine: document.getElementById('full-solar-line'),
    fullLunarLine: document.getElementById('full-lunar-line'),

    calendarPanel: document.getElementById('calendar-panel'),
    calMonthSolar: document.getElementById('cal-month-solar'),
    calMonthLunar: document.getElementById('cal-month-lunar'),
    calendarGrid: document.getElementById('calendar-grid'),

    envRow: document.getElementById('env-row'),
    weatherIconWrap: document.getElementById('weather-icon-wrap'),
    weatherDesc: document.getElementById('weather-desc'),
    tempValue: document.getElementById('temp-value'),
    tempHl: document.getElementById('temp-hl'),
    tempFeels: document.getElementById('temp-feels'),
    humidityStatus: document.getElementById('humidity-status'),
    humidityValue: document.getElementById('humidity-value'),
    humidityBarFill: document.getElementById('humidity-bar-fill'),
    dewPoint: document.getElementById('dew-point'),
    weatherUpdated: document.getElementById('weather-updated'),

    settingsPanel: document.getElementById('settings-panel'),
    citySearchForm: document.getElementById('city-search-form'),
    citySearchInput: document.getElementById('city-search-input'),
    btnGps: document.getElementById('btn-gps'),
    presetCities: document.getElementById('preset-cities'),
    searchResults: document.getElementById('search-results'),
    dimmerRange: document.getElementById('dimmer-range'),
    dimmerVal: document.getElementById('dimmer-val'),
    dimmerOverlay: document.getElementById('dimmer-overlay')
  };

  function loadConfig() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return cloneObj(defaultConfig);
      var parsed = JSON.parse(raw);
      var merged = cloneObj(defaultConfig);
      for (var k in parsed) {
        if (Object.prototype.hasOwnProperty.call(parsed, k)) {
          merged[k] = parsed[k];
        }
      }
      return merged;
    } catch (e) {
      return cloneObj(defaultConfig);
    }
  }

  function saveConfig() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      // Ignore storage errors in private mode
    }
  }

  function cloneObj(obj) {
    var copy = {};
    for (var k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        copy[k] = obj[k];
      }
    }
    return copy;
  }

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function getDayPeriodVi(hour) {
    if (hour >= 5 && hour < 11) return 'Buổi sáng';
    if (hour >= 11 && hour < 13) return 'Buổi trưa';
    if (hour >= 13 && hour < 18) return 'Buổi chiều';
    if (hour >= 18 && hour < 22) return 'Buổi tối';
    return 'Ban đêm';
  }

  // =========================================================================
  // 1. Đồng hồ & Lịch Âm Dương
  // =========================================================================
  function tickClock() {
    var now = new Date();
    var hours24 = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    var displayHour = hours24;
    if (config.hourFormat === '12') {
      displayHour = hours24 % 12;
      if (displayHour === 0) displayHour = 12;
    }

    var hStr = pad2(displayHour);
    var mStr = pad2(minutes);
    var sStr = pad2(seconds);

    els.hD1.textContent = hStr.charAt(0);
    els.hD2.textContent = hStr.charAt(1);
    els.mD1.textContent = mStr.charAt(0);
    els.mD2.textContent = mStr.charAt(1);
    els.sD1.textContent = sStr.charAt(0);
    els.sD2.textContent = sStr.charAt(1);

    if (seconds % 2 === 1) {
      els.clockColon.classList.add('dim');
    } else {
      els.clockColon.classList.remove('dim');
    }

    var pct = ((seconds / 59) * 100).toFixed(1);
    els.secondBar.style.width = pct + '%';

    var periodText = getDayPeriodVi(hours24);
    if (config.hourFormat === '12') {
      periodText += hours24 >= 12 ? ' · PM' : ' · AM';
    }
    els.dayPeriod.textContent = periodText;

    // Kiểm tra chế độ Đỏ ban đêm tự động (22:00 - 06:00)
    applyNightModeState(hours24);

    // Cập nhật Lịch nếu sang ngày mới
    var dateKey = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    if (dateKey !== lastRenderedDateKey) {
      lastRenderedDateKey = dateKey;
      renderDateAndCalendar(now);
    }
  }

  function scheduleClock() {
    tickClock();
    var delay = 1000 - (Date.now() % 1000);
    setTimeout(function () {
      tickClock();
      setInterval(tickClock, 1000);
    }, delay);
  }

  function renderDateAndCalendar(now) {
    var dd = now.getDate();
    var mm = now.getMonth() + 1;
    var yy = now.getFullYear();
    var wk = WEEKDAYS_VI[now.getDay()];

    var lunar = window.LunarCalendar.convertSolar2Lunar(dd, mm, yy, 7);

    // Thanh trạng thái trên cùng
    els.topWeekday.textContent = wk;
    els.topSolarDate.textContent = pad2(dd) + '/' + pad2(mm) + '/' + yy;
    els.topLunarBadge.textContent = pad2(lunar.day) + '/' + pad2(lunar.month) + (lunar.leap ? 'N' : '') + ' Âm';

    // Chân khối đồng hồ
    els.fullSolarLine.textContent = wk + ', ' + dd + ' Tháng ' + mm + ', ' + yy;
    els.fullLunarLine.textContent = 'Ngày ' + lunar.day + ' ' + lunar.monthLabel + ' · Năm ' + lunar.yearCanChi;

    // Tiêu đề khối lịch tháng
    els.calMonthSolar.textContent = 'Tháng ' + mm + ', ' + yy;
    els.calMonthLunar.textContent = 'Tháng ' + lunar.month + (lunar.leap ? ' Nhuận' : '') + ' Âm · Ngày ' + lunar.dayCanChi;

    // Xây dựng lưới lịch 42 ô (Thứ Hai -> Chủ Nhật)
    var firstDayOfMonth = new Date(yy, mm - 1, 1);
    var startOffset = (firstDayOfMonth.getDay() + 6) % 7; // T2 = 0 ... CN = 6
    var daysInMonth = new Date(yy, mm, 0).getDate();
    var daysInPrevMonth = new Date(yy, mm - 1, 0).getDate();

    var totalCells = 42;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < totalCells; i++) {
      var cellDate, cellMonth, cellYear;
      var isOutside = false;

      if (i < startOffset) {
        cellDate = daysInPrevMonth - startOffset + i + 1;
        cellMonth = mm - 1;
        cellYear = yy;
        if (cellMonth < 1) {
          cellMonth = 12;
          cellYear = yy - 1;
        }
        isOutside = true;
      } else if (i >= startOffset + daysInMonth) {
        cellDate = i - (startOffset + daysInMonth) + 1;
        cellMonth = mm + 1;
        cellYear = yy;
        if (cellMonth > 12) {
          cellMonth = 1;
          cellYear = yy + 1;
        }
        isOutside = true;
      } else {
        cellDate = i - startOffset + 1;
        cellMonth = mm;
        cellYear = yy;
      }

      var cellLunar = window.LunarCalendar.convertSolar2Lunar(cellDate, cellMonth, cellYear, 7);
      var isToday = !isOutside && cellDate === dd;
      var isSunday = (i % 7) === 6;

      var cellEl = document.createElement('div');
      var classes = ['cal-cell'];
      if (isOutside) classes.push('is-outside');
      if (isToday) classes.push('is-today');
      if (isSunday) classes.push('is-sunday');
      cellEl.className = classes.join(' ');
      cellEl.setAttribute('role', 'gridcell');

      var solarSpan = document.createElement('span');
      solarSpan.className = 'cal-solar';
      solarSpan.textContent = String(cellDate);

      var lunarSpan = document.createElement('sub');
      lunarSpan.className = 'cal-lunar' + (cellLunar.isSpecial ? ' is-special' : '');
      lunarSpan.textContent = cellLunar.shortCell;

      cellEl.appendChild(solarSpan);
      cellEl.appendChild(lunarSpan);
      fragment.appendChild(cellEl);
    }

    els.calendarGrid.innerHTML = '';
    els.calendarGrid.appendChild(fragment);
  }

  // =========================================================================
  // 2. Thời tiết & Độ ẩm (Open-Meteo API - Không cần API Key)
  // =========================================================================
  function getWeatherInfo(code, isDay) {
    // WMO Weather interpretation codes (WW)
    var sunSvg = '<svg class="weather-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/></svg>';
    var moonSvg = '<svg class="weather-svg" viewBox="0 0 24 24"><path d="M20.2 14.2A8.2 8.2 0 0 1 9.8 3.8a8.2 8.2 0 1 0 10.4 10.4Z"/></svg>';
    var partCloudSvg = '<svg class="weather-svg" viewBox="0 0 24 24"><path d="M12 3v1.5M5.6 5.6l1.1 1.1M3 12h1.5M18.4 5.6l-1.1 1.1"/><path d="M9 12a3.5 3.5 0 0 1 6.3-2.1 4 4 0 0 1 2.2 7.6H8.5a3.5 3.5 0 0 1 0-7c.2 0 .3 0 .5.1"/></svg>';
    var cloudSvg = '<svg class="weather-svg" viewBox="0 0 24 24"><path d="M17.5 19H7a4.5 4.5 0 0 1-.8-8.9 5.5 5.5 0 0 1 10.7-1.1A4 4 0 0 1 17.5 19Z"/></svg>';
    var rainSvg = '<svg class="weather-svg" viewBox="0 0 24 24"><path d="M17.5 15.5H7a4.2 4.2 0 0 1-.8-8.3 5.2 5.2 0 0 1 10.2-1 3.8 3.8 0 0 1 1.1 7.3"/><path d="M8.5 18.5l-1 2.5M12.5 18.5l-1 2.5M16.5 18.5l-1 2.5"/></svg>';
    var stormSvg = '<svg class="weather-svg" viewBox="0 0 24 24"><path d="M17.5 15H7a4.2 4.2 0 0 1-.8-8.3 5.2 5.2 0 0 1 10.2-1 3.8 3.8 0 0 1 1.1 7.3"/><path d="M13 15l-2 4h3l-1.5 3.5"/></svg>';
    var fogSvg = '<svg class="weather-svg" viewBox="0 0 24 24"><path d="M4 9h16M6 13h14M4 17h12"/></svg>';

    if (code === 0) {
      return { label: isDay ? 'Trời quang' : 'Đêm quang', svg: isDay ? sunSvg : moonSvg };
    }
    if (code === 1 || code === 2) {
      return { label: 'Ít mây', svg: partCloudSvg };
    }
    if (code === 3) {
      return { label: 'Nhiều mây', svg: cloudSvg };
    }
    if (code === 45 || code === 48) {
      return { label: 'Sương mù', svg: fogSvg };
    }
    if (code >= 51 && code <= 57) {
      return { label: 'Mưa phùn', svg: rainSvg };
    }
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
      return { label: code >= 65 || code === 82 ? 'Mưa lớn' : 'Mưa rào', svg: rainSvg };
    }
    if (code >= 95) {
      return { label: 'Dông sét', svg: stormSvg };
    }
    return { label: 'Có mây', svg: cloudSvg };
  }

  function getHumidityComfort(rh) {
    if (rh < 40) return 'Khô';
    if (rh <= 70) return 'Dễ chịu';
    return 'Ẩm ướt';
  }

  function calcDewPoint(tempC, rh) {
    var a = 17.27;
    var b = 237.7;
    var alpha = ((a * tempC) / (b + tempC)) + Math.log(Math.max(rh, 1) / 100);
    return Math.round((b * alpha) / (a - alpha));
  }

  function renderWeatherData(data, isCached) {
    if (!data) return;
    els.locationName.textContent = config.cityName;

    var temp = Math.round(data.temp);
    var rh = Math.round(data.humidity);
    var feels = Math.round(data.feelsLike);
    var high = typeof data.high === 'number' ? Math.round(data.high) : temp + 2;
    var low = typeof data.low === 'number' ? Math.round(data.low) : temp - 3;
    var dew = typeof data.dewPoint === 'number' ? Math.round(data.dewPoint) : calcDewPoint(temp, rh);

    var info = getWeatherInfo(data.weatherCode, data.isDay);

    els.weatherIconWrap.innerHTML = info.svg;
    els.weatherDesc.textContent = info.label;
    els.tempValue.textContent = String(temp);
    els.tempHl.textContent = high + '° / ' + low + '°';
    els.tempFeels.textContent = 'Như ' + feels + '°';

    els.humidityStatus.textContent = getHumidityComfort(rh);
    els.humidityValue.textContent = String(rh);
    els.humidityBarFill.style.width = Math.min(Math.max(rh, 5), 100) + '%';
    els.dewPoint.textContent = 'Sương ' + dew + '°C';

    if (data.updatedAt) {
      var d = new Date(data.updatedAt);
      var tStr = pad2(d.getHours()) + ':' + pad2(d.getMinutes());
      els.weatherUpdated.textContent = isCached ? ('Lưu ' + tStr) : tStr;
      els.weatherUpdated.classList.remove('is-error');
    }
  }

  function renderWeatherError() {
    els.weatherDesc.textContent = 'Mất mạng';
    els.tempValue.textContent = '--';
    els.tempHl.textContent = '-- / --';
    els.tempFeels.textContent = 'Như --';
    els.humidityStatus.textContent = 'Không có dữ liệu';
    els.humidityValue.textContent = '--';
    els.humidityBarFill.style.width = '0%';
    els.dewPoint.textContent = 'Sương --';
    els.weatherUpdated.textContent = 'Thử lại';
    els.weatherUpdated.classList.add('is-error');
  }

  function loadCachedWeather() {
    try {
      var raw = localStorage.getItem(WEATHER_CACHE_KEY);
      if (raw) {
        renderWeatherData(JSON.parse(raw), true);
        return true;
      }
    } catch (e) {
      // Ignore
    }
    return false;
  }

  function fetchWeather() {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' +
      encodeURIComponent(config.lat) +
      '&longitude=' + encodeURIComponent(config.lon) +
      '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,dew_point_2m' +
      '&daily=temperature_2m_max,temperature_2m_min' +
      '&timezone=auto&forecast_days=1';

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (json) {
        if (!json || !json.current) throw new Error('Empty payload');
        var cur = json.current;
        var daily = json.daily || {};
        var payload = {
          temp: cur.temperature_2m,
          humidity: cur.relative_humidity_2m,
          feelsLike: cur.apparent_temperature,
          isDay: cur.is_day === 1,
          weatherCode: cur.weather_code,
          dewPoint: typeof cur.dew_point_2m === 'number'
            ? cur.dew_point_2m
            : calcDewPoint(cur.temperature_2m, cur.relative_humidity_2m),
          high: daily.temperature_2m_max && daily.temperature_2m_max.length ? daily.temperature_2m_max[0] : null,
          low: daily.temperature_2m_min && daily.temperature_2m_min.length ? daily.temperature_2m_min[0] : null,
          updatedAt: Date.now()
        };
        try {
          localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(payload));
        } catch (e) {}
        renderWeatherData(payload, false);
      })
      .catch(function () {
        if (!loadCachedWeather()) {
          renderWeatherError();
        }
      });
  }

  // =========================================================================
  // 3. Chế độ Đỏ ban đêm (Night Red), Giảm sáng, Kiểu đồng hồ, Khóa ngang 90°
  // =========================================================================
  function applyNightModeState(currentHour) {
    var h = typeof currentHour === 'number' ? currentHour : new Date().getHours();
    var isNight = false;
    if (config.nightMode === 'on') {
      isNight = true;
    } else if (config.nightMode === 'auto') {
      isNight = (h >= 22 || h < 6);
    }

    if (isNight) {
      document.body.setAttribute('data-night', 'true');
      els.btnNight.setAttribute('aria-pressed', 'true');
    } else {
      document.body.removeAttribute('data-night');
      els.btnNight.setAttribute('aria-pressed', 'false');
    }
  }

  function applyConfigToUI() {
    // Location name
    els.locationName.textContent = config.cityName;

    // Clock style
    els.clockDisplay.setAttribute('data-style', config.clockStyle);
    els.clockStyleLabel.textContent = CLOCK_STYLE_LABELS[config.clockStyle] || 'Tối giản';

    // Dimmer
    var dimPct = Number(config.dimmer) || 0;
    els.dimmerRange.value = String(dimPct);
    els.dimmerVal.textContent = dimPct + '%';
    els.dimmerOverlay.style.opacity = (dimPct / 100).toFixed(2);

    // Force landscape 90°
    if (config.forceLandscape) {
      document.body.setAttribute('data-force-landscape', 'true');
      els.btnRotate.setAttribute('aria-pressed', 'true');
    } else {
      document.body.removeAttribute('data-force-landscape');
      els.btnRotate.setAttribute('aria-pressed', 'false');
    }

    // Night mode
    applyNightModeState();

    // Update active segmented buttons in settings
    updateSegmentedButtons('[data-clock-style]', 'data-clock-style', config.clockStyle);
    updateSegmentedButtons('[data-hour-format]', 'data-hour-format', config.hourFormat);
    updateSegmentedButtons('[data-night-mode]', 'data-night-mode', config.nightMode);
    updateActivePresetCity();
  }

  function updateSegmentedButtons(selector, attr, val) {
    var btns = document.querySelectorAll(selector);
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].getAttribute(attr) === String(val)) {
        btns[i].classList.add('active');
      } else {
        btns[i].classList.remove('active');
      }
    }
  }

  function updateActivePresetCity() {
    var chips = els.presetCities.querySelectorAll('.chip-city');
    for (var i = 0; i < chips.length; i++) {
      if (chips[i].getAttribute('data-name') === config.cityName) {
        chips[i].classList.add('active');
      } else {
        chips[i].classList.remove('active');
      }
    }
  }

  // =========================================================================
  // 4. Giữ màn hình luôn sáng (Wake Lock API + NoSleep Video cho iOS 15)
  // =========================================================================
  function createNoSleepVideo() {
    if (noSleepVideo) return noSleepVideo;
    var v = document.createElement('video');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('muted', '');
    v.setAttribute('loop', '');
    v.muted = true;
    v.loop = true;
    v.width = 1;
    v.height = 1;
    v.style.position = 'fixed';
    v.style.top = '-10px';
    v.style.left = '-10px';
    v.style.width = '1px';
    v.style.height = '1px';
    v.style.opacity = '0.01';
    v.style.pointerEvents = 'none';
    // Valid Apple AVFoundation H.264 silent MP4 (cached offline in sw.js) for iOS 15 Safari keep-awake
    v.src = './nosleep.mp4';
    document.body.appendChild(v);
    noSleepVideo = v;
    return v;
  }

  function updateWakeLockUI(active) {
    isWakeLockActive = active;
    if (active) {
      els.wakelockDot.classList.add('active');
      els.wakelockText.textContent = 'Giữ sáng';
    } else {
      els.wakelockDot.classList.remove('active');
      els.wakelockText.textContent = 'Chạm sáng';
    }
  }

  function enableWakeLock() {
    // 1. Standard Screen Wake Lock API (iOS 16.4+ / Chrome / Desktop)
    if ('wakeLock' in navigator && navigator.wakeLock && navigator.wakeLock.request) {
      navigator.wakeLock.request('screen')
        .then(function (sentinel) {
          wakeLockSentinel = sentinel;
          updateWakeLockUI(true);
          sentinel.addEventListener('release', function () {
            if (!noSleepVideo || noSleepVideo.paused) {
              updateWakeLockUI(false);
            }
          });
        })
        .catch(function () {
          enableIos15VideoWakeLock();
        });
    } else {
      enableIos15VideoWakeLock();
    }
  }

  function enableIos15VideoWakeLock() {
    try {
      var v = createNoSleepVideo();
      var playPromise = v.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(function () {
          updateWakeLockUI(true);
        }).catch(function () {
          updateWakeLockUI(false);
        });
      } else {
        updateWakeLockUI(true);
      }
    } catch (e) {
      updateWakeLockUI(false);
    }
  }

  // =========================================================================
  // 5. Pixel Shift bảo vệ tấm nền LCD iPhone 6s khi treo 24/7
  // =========================================================================
  var shiftSteps = [
    { x: '0px', y: '0px' },
    { x: '1px', y: '0px' },
    { x: '1px', y: '1px' },
    { x: '0px', y: '1px' },
    { x: '-1px', y: '0px' },
    { x: '-1px', y: '-1px' }
  ];
  var shiftIndex = 0;

  function runPixelShift() {
    shiftIndex = (shiftIndex + 1) % shiftSteps.length;
    var step = shiftSteps[shiftIndex];
    document.documentElement.style.setProperty('--shift-x', step.x);
    document.documentElement.style.setProperty('--shift-y', step.y);
  }

  // =========================================================================
  // 6. Tương tác & Sự kiện
  // =========================================================================
  function toggleSettings(forceOpen) {
    var isHidden = els.settingsPanel.hasAttribute('hidden');
    var shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : isHidden;

    if (shouldOpen) {
      els.calendarPanel.setAttribute('hidden', '');
      els.envRow.setAttribute('hidden', '');
      els.settingsPanel.removeAttribute('hidden');
      els.btnSettings.setAttribute('aria-expanded', 'true');
    } else {
      els.settingsPanel.setAttribute('hidden', '');
      els.calendarPanel.removeAttribute('hidden');
      els.envRow.removeAttribute('hidden');
      els.btnSettings.setAttribute('aria-expanded', 'false');
    }
  }

  function cycleClockStyle() {
    var idx = CLOCK_STYLES.indexOf(config.clockStyle);
    var nextIdx = (idx + 1) % CLOCK_STYLES.length;
    config.clockStyle = CLOCK_STYLES[nextIdx];
    saveConfig();
    applyConfigToUI();
  }

  function searchCity(query) {
    if (!query || !query.trim()) return;
    var url = 'https://geocoding-api.open-meteo.com/v1/search?name=' +
      encodeURIComponent(query.trim()) +
      '&count=5&language=vi&format=json';

    els.searchResults.removeAttribute('hidden');
    els.searchResults.innerHTML = '<div class="setting-label">Đang tìm kiếm...</div>';

    fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data || !data.results || !data.results.length) {
          els.searchResults.innerHTML = '<div class="setting-label">Không tìm thấy địa điểm phù hợp.</div>';
          return;
        }
        els.searchResults.innerHTML = '';
        for (var i = 0; i < data.results.length; i++) {
          (function (item) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'search-result-btn';
            var sub = item.admin1 ? (', ' + item.admin1) : '';
            var country = item.country ? (' (' + item.country + ')') : '';
            btn.textContent = item.name + sub + country;
            btn.addEventListener('click', function () {
              config.cityName = item.name;
              config.lat = item.latitude;
              config.lon = item.longitude;
              saveConfig();
              applyConfigToUI();
              els.searchResults.setAttribute('hidden', '');
              els.citySearchInput.value = '';
              fetchWeather();
              toggleSettings(false);
            });
            els.searchResults.appendChild(btn);
          })(data.results[i]);
        }
      })
      .catch(function () {
        els.searchResults.innerHTML = '<div class="setting-label">Lỗi kết nối mạng khi tìm thành phố.</div>';
      });
  }

  function bindEvents() {
    // Chạm lần đầu bất kỳ đâu để kích hoạt Wake Lock trên iOS 15
    document.addEventListener('touchstart', function onFirstTouch() {
      if (!isWakeLockActive) enableWakeLock();
    }, { passive: true });

    document.addEventListener('click', function onFirstClick() {
      if (!isWakeLockActive) enableWakeLock();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        enableWakeLock();
        tickClock();
      }
    });

    window.addEventListener('online', function () {
      fetchWeather();
    });

    // Đổi kiểu đồng hồ khi chạm vào đồng hồ
    els.clockDisplay.addEventListener('click', cycleClockStyle);
    els.clockDisplay.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cycleClockStyle();
      }
    });

    // Nút giữ sáng
    els.btnWakelock.addEventListener('click', function (e) {
      e.stopPropagation();
      enableWakeLock();
    });

    // Nút khóa xoay ngang 90°
    els.btnRotate.addEventListener('click', function () {
      config.forceLandscape = !config.forceLandscape;
      saveConfig();
      applyConfigToUI();
    });

    // Nút bật/tắt nhanh chế độ Đỏ ban đêm
    els.btnNight.addEventListener('click', function () {
      var currentlyNight = document.body.getAttribute('data-night') === 'true';
      config.nightMode = currentlyNight ? 'off' : 'on';
      saveConfig();
      applyConfigToUI();
    });

    // Mở cài đặt khi bấm nút Cài đặt hoặc nút Vị trí
    els.btnSettings.addEventListener('click', function () {
      toggleSettings();
    });
    els.btnLocation.addEventListener('click', function () {
      toggleSettings(true);
      setTimeout(function () {
        els.citySearchInput.focus();
      }, 50);
    });
    els.btnCloseSettings.addEventListener('click', function () {
      toggleSettings(false);
    });

    // Chọn nhanh thành phố
    els.presetCities.addEventListener('click', function (e) {
      var target = e.target.closest('.chip-city');
      if (!target) return;
      config.cityName = target.getAttribute('data-name');
      config.lat = parseFloat(target.getAttribute('data-lat'));
      config.lon = parseFloat(target.getAttribute('data-lon'));
      saveConfig();
      applyConfigToUI();
      fetchWeather();
    });

    // Tìm kiếm thành phố
    els.citySearchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      searchCity(els.citySearchInput.value);
    });

    // Lấy vị trí GPS
    els.btnGps.addEventListener('click', function () {
      if (!navigator.geolocation) return;
      els.btnGps.textContent = '...';
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          els.btnGps.textContent = 'GPS';
          config.cityName = 'Vị trí GPS';
          config.lat = Number(pos.coords.latitude.toFixed(4));
          config.lon = Number(pos.coords.longitude.toFixed(4));
          saveConfig();
          applyConfigToUI();
          fetchWeather();
          toggleSettings(false);
        },
        function () {
          els.btnGps.textContent = 'Lỗi';
          setTimeout(function () {
            els.btnGps.textContent = 'GPS';
          }, 1500);
        },
        { timeout: 8000, maximumAge: 600000 }
      );
    });

    // Các nút Segmented Control trong Cài đặt
    var styleBtns = document.querySelectorAll('[data-clock-style]');
    for (var i = 0; i < styleBtns.length; i++) {
      styleBtns[i].addEventListener('click', function () {
        config.clockStyle = this.getAttribute('data-clock-style');
        saveConfig();
        applyConfigToUI();
      });
    }

    var formatBtns = document.querySelectorAll('[data-hour-format]');
    for (var j = 0; j < formatBtns.length; j++) {
      formatBtns[j].addEventListener('click', function () {
        config.hourFormat = this.getAttribute('data-hour-format');
        saveConfig();
        applyConfigToUI();
        tickClock();
      });
    }

    var nightBtns = document.querySelectorAll('[data-night-mode]');
    for (var k = 0; k < nightBtns.length; k++) {
      nightBtns[k].addEventListener('click', function () {
        config.nightMode = this.getAttribute('data-night-mode');
        saveConfig();
        applyConfigToUI();
      });
    }

    // Thanh kéo giảm sáng màn hình
    els.dimmerRange.addEventListener('input', function () {
      config.dimmer = parseInt(this.value, 10) || 0;
      saveConfig();
      applyConfigToUI();
    });

    // Chạm trạng thái cập nhật / thử lại thời tiết
    els.weatherUpdated.addEventListener('click', function () {
      els.weatherUpdated.textContent = '...';
      fetchWeather();
    });
  }

  // =========================================================================
  // 7. Khởi chạy ứng dụng & Đăng ký Service Worker PWA
  // =========================================================================
  function init() {
    applyConfigToUI();
    scheduleClock();
    loadCachedWeather();
    fetchWeather();
    enableWakeLock();
    bindEvents();

    setInterval(fetchWeather, WEATHER_INTERVAL_MS);
    setInterval(runPixelShift, PIXEL_SHIFT_INTERVAL_MS);

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').catch(function () {});
      });
    }
  }

  init();
})();
