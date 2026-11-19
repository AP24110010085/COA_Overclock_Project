/**
 * OVERCLOCK PRO - Real-Time Dual-Axis Telemetry Visualization & UI Delta Styling
 * Author: Member 3 (UI/UX & Data Visualization Developer)
 */

let telemetryChartInstance = null;

/**
 * Initializes the Chart.js dual-axis line graph tracking Temperature (°C) vs Power (W)
 * @param {HTMLCanvasElement} ctx - Canvas 2D rendering context
 */
function initTelemetryChart(ctx) {
    telemetryChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(15).fill(''),
            datasets: [
                {
                    label: 'Junction Temp (°C)',
                    data: Array(15).fill(36.2),
                    borderColor: '#f43f5e',
                    backgroundColor: 'rgba(244, 63, 94, 0.12)',
                    yAxisID: 'yTemp',
                    tension: 0.35,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Dynamic Power (W)',
                    data: Array(15).fill(62.2),
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.10)',
                    yAxisID: 'yPower',
                    tension: 0.35,
                    fill: true,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 250 },
            scales: {
                yTemp: {
                    type: 'linear',
                    position: 'left',
                    min: 20,
                    max: 115,
                    grid: { color: 'rgba(148, 163, 184, 0.1)' },
                    ticks: { color: '#fda4af' }
                },
                yPower: {
                    type: 'linear',
                    position: 'right',
                    min: 0,
                    max: 250,
                    grid: { drawOnChartArea: false },
                    ticks: { color: '#7dd3fc' }
                }
            }
        }
    });
}

/**
 * Updates live variance delta badge (+X% / -X%) against factory stock baseline
 */
function updateDeltaBadge(elementId, deltaPercent, invertWarning = false) {
    const badge = document.getElementById(elementId);
    if (!badge) return;

    const val = parseFloat(deltaPercent);
    const prefix = val > 0 ? '+' : '';
    badge.textContent = `${prefix}${val}% vs Stock`;

    if (val === 0) {
        badge.className = 'text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400';
    } else if ((!invertWarning && val > 0) || (invertWarning && val < 0)) {
        badge.className = 'text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400';
    } else {
        badge.className = 'text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-400';
    }
}