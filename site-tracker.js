/**
 * Site Tracker - Visitor Analytics and Device Detection
 * Tracks visitor statistics and device information for GitHub Pages
 */

(function() {
    'use strict';

    // Device detection utilities
    const DeviceDetector = {
        getUserAgent: function() {
            return navigator.userAgent.toLowerCase();
        },

        getPlatform: function() {
            return navigator.platform.toLowerCase();
        },

        detectDevice: function() {
            const ua = this.getUserAgent();
            const platform = this.getPlatform();

            // iOS Detection (iPhone, iPod, iPad on iOS)
            if (/iphone|ipod/.test(ua)) {
                return { type: 'iPhone', icon: '🍎', category: 'Apple' };
            }

            // iPad detection (including iPadOS 13+ which reports as Mac)
            if (/ipad/.test(ua) || (platform.includes('mac') && 'ontouchend' in document)) {
                return { type: 'iPad', icon: '🍏', category: 'Apple' };
            }

            // Mac detection
            if (platform.includes('mac') || /macintosh|mac os x/.test(ua)) {
                return { type: 'Mac', icon: '🍏', category: 'Apple' };
            }

            // Android detection
            if (/android/.test(ua)) {
                return { type: 'Android', icon: '🐶', category: 'Android' };
            }

            // Windows detection
            if (platform.includes('win') || /windows/.test(ua)) {
                return { type: 'Windows', icon: '🪟', category: 'Windows' };
            }

            // Linux detection (not Windows, Android, or Apple)
            if (platform.includes('linux') || /linux/.test(ua)) {
                return { type: 'Linux', icon: '👽', category: 'Other' };
            }

            // Default for unidentified devices
            return { type: 'Other', icon: '👽', category: 'Other' };
        }
    };

    // Visitor tracking utilities
    const VisitorTracker = {
        STORAGE_KEY: 'siteVisitorData',

        getToday: function() {
            const now = new Date();
            return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        },

        getYesterday: function() {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
        },

        getCurrentMonth: function() {
            const now = new Date();
            return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        },

        getLastMonth: function() {
            const now = new Date();
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            return `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
        },

        getData: function() {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (!data) {
                return {
                    uniqueVisitors: [],
                    dailyVisits: {},
                    monthlyVisits: {},
                    deviceVisits: {}
                };
            }
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error('Error parsing visitor data:', e);
                return {
                    uniqueVisitors: [],
                    dailyVisits: {},
                    monthlyVisits: {},
                    deviceVisits: {}
                };
            }
        },

        saveData: function(data) {
            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            } catch (e) {
                console.error('Error saving visitor data:', e);
            }
        },

        generateVisitorId: function() {
            // Generate a simple unique ID for the visitor
            return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },

        getOrCreateVisitorId: function() {
            let visitorId = localStorage.getItem('visitorId');
            if (!visitorId) {
                visitorId = this.generateVisitorId();
                localStorage.setItem('visitorId', visitorId);
            }
            return visitorId;
        },

        trackVisit: function() {
            const data = this.getData();
            const today = this.getToday();
            const currentMonth = this.getCurrentMonth();
            const visitorId = this.getOrCreateVisitorId();
            const device = DeviceDetector.detectDevice();

            // Track unique visitors
            if (!data.uniqueVisitors.includes(visitorId)) {
                data.uniqueVisitors.push(visitorId);
            }

            // Track daily visits
            if (!data.dailyVisits[today]) {
                data.dailyVisits[today] = 0;
            }
            data.dailyVisits[today]++;

            // Track monthly visits
            if (!data.monthlyVisits[currentMonth]) {
                data.monthlyVisits[currentMonth] = 0;
            }
            data.monthlyVisits[currentMonth]++;

            // Track device visits
            if (!data.deviceVisits[device.type]) {
                data.deviceVisits[device.type] = {
                    count: 0,
                    icon: device.icon,
                    category: device.category
                };
            }
            data.deviceVisits[device.type].count++;

            this.saveData(data);
        },

        getStatistics: function() {
            const data = this.getData();
            const today = this.getToday();
            const yesterday = this.getYesterday();
            const currentMonth = this.getCurrentMonth();
            const lastMonth = this.getLastMonth();

            return {
                today: data.dailyVisits[today] || 0,
                yesterday: data.dailyVisits[yesterday] || 0,
                thisMonth: data.monthlyVisits[currentMonth] || 0,
                lastMonth: data.monthlyVisits[lastMonth] || 0,
                totalVisitors: data.uniqueVisitors.length,
                currentDevice: DeviceDetector.detectDevice(),
                deviceBreakdown: data.deviceVisits
            };
        }
    };

    // Modal UI for displaying statistics
    const StatsModal = {
        createModal: function() {
            if (document.getElementById('stats-modal')) {
                return; // Modal already exists
            }

            const modal = document.createElement('div');
            modal.id = 'stats-modal';
            modal.innerHTML = `
                <div class="stats-modal-overlay"></div>
                <div class="stats-modal-content">
                    <div class="stats-modal-header">
                        <h2>📊 Site Analytics</h2>
                        <span class="stats-modal-close">&times;</span>
                    </div>
                    <div class="stats-modal-body">
                        <div class="stats-section">
                            <h3>Visitor Statistics</h3>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <div class="stat-value" id="stat-today">0</div>
                                    <div class="stat-label">Today</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value" id="stat-yesterday">0</div>
                                    <div class="stat-label">Yesterday</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value" id="stat-this-month">0</div>
                                    <div class="stat-label">This Month</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value" id="stat-last-month">0</div>
                                    <div class="stat-label">Last Month</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value" id="stat-total">0</div>
                                    <div class="stat-label">Unique Visitors</div>
                                </div>
                            </div>
                        </div>
                        <div class="stats-section">
                            <h3>Your Device</h3>
                            <div class="current-device" id="current-device">
                                <span class="device-icon">🖥️</span>
                                <span class="device-name">Detecting...</span>
                            </div>
                        </div>
                        <div class="stats-section">
                            <h3>Device Breakdown</h3>
                            <div class="device-breakdown" id="device-breakdown">
                                <p>Loading...</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            this.addStyles();
            this.attachEventListeners();
        },

        addStyles: function() {
            if (document.getElementById('stats-modal-styles')) {
                return; // Styles already added
            }

            const styles = document.createElement('style');
            styles.id = 'stats-modal-styles';
            styles.textContent = `
                #stats-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: none;
                    animation: fadeIn 0.3s ease-in-out;
                }

                #stats-modal.active {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .stats-modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                }

                .stats-modal-content {
                    position: relative;
                    background-color: var(--card-background);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 12px;
                    padding: 30px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    z-index: 10001;
                    animation: slideUp 0.3s ease-out;
                }

                .stats-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                    border-bottom: 2px solid var(--section-separator-color);
                    padding-bottom: 15px;
                }

                .stats-modal-header h2 {
                    font-size: 2em;
                    color: var(--heading-color);
                    margin: 0;
                }

                .stats-modal-close {
                    font-size: 2.5em;
                    color: var(--meta-color);
                    cursor: pointer;
                    line-height: 1;
                    transition: color 0.3s, transform 0.2s;
                    font-weight: 300;
                }

                .stats-modal-close:hover {
                    color: var(--link-color);
                    transform: scale(1.1);
                }

                .stats-modal-body {
                    color: var(--text-color);
                }

                .stats-section {
                    margin-bottom: 30px;
                }

                .stats-section h3 {
                    font-size: 1.5em;
                    color: var(--heading-color);
                    margin-bottom: 15px;
                    margin-top: 0;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .stat-item {
                    text-align: center;
                    padding: 15px;
                    background-color: var(--section-bg-blend);
                    border-radius: 8px;
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .stat-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .stat-value {
                    font-size: 2.5em;
                    font-weight: 700;
                    color: var(--link-color);
                    margin-bottom: 5px;
                    line-height: 1;
                }

                .stat-label {
                    font-size: 0.9em;
                    color: var(--meta-color);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .current-device {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    padding: 20px;
                    background-color: var(--section-bg-blend);
                    border-radius: 8px;
                    font-size: 1.3em;
                }

                .device-icon {
                    font-size: 3em;
                }

                .device-name {
                    font-weight: 500;
                    color: var(--heading-color);
                }

                .device-breakdown {
                    display: grid;
                    gap: 10px;
                }

                .device-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 15px;
                    background-color: var(--section-bg-blend);
                    border-radius: 8px;
                    transition: background-color 0.2s;
                }

                .device-item:hover {
                    background-color: var(--section-separator-color);
                }

                .device-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .device-item .device-icon {
                    font-size: 2em;
                }

                .device-item .device-name {
                    font-size: 1.1em;
                    font-weight: 500;
                    color: var(--text-color);
                }

                .device-count {
                    font-size: 1.3em;
                    font-weight: 700;
                    color: var(--link-color);
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @media screen and (max-width: 768px) {
                    .stats-modal-content {
                        width: 95%;
                        padding: 20px;
                        max-height: 90vh;
                    }

                    .stats-modal-header h2 {
                        font-size: 1.5em;
                    }

                    .stats-modal-close {
                        font-size: 2em;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .stat-value {
                        font-size: 2em;
                    }

                    .current-device {
                        font-size: 1.1em;
                    }

                    .device-icon {
                        font-size: 2.5em !important;
                    }
                }

                @media screen and (max-width: 480px) {
                    .stats-modal-content {
                        width: 98%;
                        padding: 15px;
                    }

                    .stats-modal-header h2 {
                        font-size: 1.3em;
                    }

                    .stats-section h3 {
                        font-size: 1.2em;
                    }

                    .stat-value {
                        font-size: 1.8em;
                    }

                    .stat-label {
                        font-size: 0.8em;
                    }
                }
            `;

            document.head.appendChild(styles);
        },

        attachEventListeners: function() {
            const modal = document.getElementById('stats-modal');
            const closeBtn = modal.querySelector('.stats-modal-close');
            const overlay = modal.querySelector('.stats-modal-overlay');

            closeBtn.addEventListener('click', () => this.hide());
            overlay.addEventListener('click', () => this.hide());

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    this.hide();
                }
            });
        },

        updateContent: function() {
            const stats = VisitorTracker.getStatistics();

            // Update visitor statistics
            document.getElementById('stat-today').textContent = stats.today;
            document.getElementById('stat-yesterday').textContent = stats.yesterday;
            document.getElementById('stat-this-month').textContent = stats.thisMonth;
            document.getElementById('stat-last-month').textContent = stats.lastMonth;
            document.getElementById('stat-total').textContent = stats.totalVisitors;

            // Update current device
            const currentDeviceEl = document.getElementById('current-device');
            currentDeviceEl.innerHTML = `
                <span class="device-icon">${stats.currentDevice.icon}</span>
                <span class="device-name">${stats.currentDevice.type}</span>
            `;

            // Update device breakdown
            const deviceBreakdownEl = document.getElementById('device-breakdown');
            if (Object.keys(stats.deviceBreakdown).length === 0) {
                deviceBreakdownEl.innerHTML = '<p style="text-align: center; color: var(--meta-color);">No device data yet</p>';
            } else {
                const sortedDevices = Object.entries(stats.deviceBreakdown)
                    .sort((a, b) => b[1].count - a[1].count);

                deviceBreakdownEl.innerHTML = sortedDevices.map(([deviceName, data]) => `
                    <div class="device-item">
                        <div class="device-info">
                            <span class="device-icon">${data.icon}</span>
                            <span class="device-name">${deviceName}</span>
                        </div>
                        <span class="device-count">${data.count}</span>
                    </div>
                `).join('');
            }
        },

        show: function() {
            this.updateContent();
            const modal = document.getElementById('stats-modal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        },

        hide: function() {
            const modal = document.getElementById('stats-modal');
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    // Initialize the tracker
    function initializeTracker() {
        // Track the current visit
        VisitorTracker.trackVisit();

        // Create the modal
        StatsModal.createModal();

        // Find the cross icon and attach click handler
        // The cross icon has onclick="easterEgg()" in index.html
        // We need to modify all pages to use the stats modal instead
        const crossIcons = document.querySelectorAll('.nav-icon');
        crossIcons.forEach(icon => {
            if (icon.textContent.trim() === '×' || icon.innerHTML.includes('&#x2716;')) {
                // Remove existing onclick if any
                icon.removeAttribute('onclick');
                icon.style.cursor = 'pointer';
                icon.addEventListener('click', () => {
                    StatsModal.show();
                });
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTracker);
    } else {
        initializeTracker();
    }

    // Export for debugging purposes
    window.SiteTracker = {
        VisitorTracker,
        DeviceDetector,
        StatsModal
    };

})();
