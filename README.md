# OVERCLOCK PRO — Real-Time CPU Overclocking & Dynamic CMOS Power Simulator

**Course:** Computer Organization and Architecture (COA) — 3rd Year B.Tech CSE  
**Repository:** `COA_Overclock_Project`

---

## 1. Project Overview
**OVERCLOCK PRO** is an interactive, browser-based CPU architectural simulator designed to demonstrate the real-world physical trade-offs of processor overclocking without risking hardware damage. Users can dynamically adjust Base Clock (BCLK), Core Multiplier, Supply Voltage ($V_{\text{core}}$), and Cooling Solutions to observe live changes in frequency, dynamic CMOS power dissipation, and silicon junction temperature.

---

## 2. Core COA Equations Implemented
1. **Clock Frequency ($f$):**  
   $$f = \text{BCLK} \times \text{Multiplier}$$
2. **Dynamic CMOS Power Dissipation ($P$):**  
   $$P = C \cdot V^2 \cdot f$$
3. **Silicon Junction Temperature ($T_j$):**  
   $$T_j = T_{\text{ambient}} + (P \times R_{\text{th}})$$
4. **Minimum Stability Voltage ($V_{\text{min}}$):**  
   $$V_{\text{min}} = V_{\text{stock}} + \alpha \times (f_{\text{target}} - f_{\text{stock}})$$

---

## 3. Tech Stack
* **Frontend Structure:** HTML5, FontAwesome Icons
* **Styling & UI/UX:** Tailwind CSS (Dark BIOS / Hardware-Monitor Theme)
* **Simulation Engine:** Vanilla JavaScript (ES6+)
* **Live Telemetry Visualization:** Chart.js (Dual-Axis Temperature vs. Power Line Graph)

---

## 4. Team Role Division
| Member | Role | Module / Files | Key Responsibilities |
| :--- | :--- | :--- | :--- |
| **Member 1** | Frontend Developer | `index.html` | Dashboard layout, interactive BCLK/Multiplier/VCore sliders, stock banner, and telemetry cards. |
| **Member 2** | Backend & Logic Developer | `js/coa_engine.js` | Mathematical implementation of $f$, $P = C \cdot V^2 \cdot f$, $T_j$, and $V_{\text{min}}$ stability bounds. |
| **Member 3** | UI/UX & Visualization Developer | `js/telemetry_chart.js` | Tailwind dark theme, Chart.js dual-axis telemetry graph, and `+X%` variance delta badges. |
| **Member 4** | Testing & QA Engineer | `tests/test_scenarios.md` | Validation of under-volt BSOD setup-time crashes, $95^\circ\text{C}$ thermal throttling, and factory reset. |
| **Member 5** | Integration & GitHub Lead | `README.md` | Module integration, GitHub repository management, COA reference modal, and project documentation. |

---

## 5. How to Run Locally
1. Clone the repository:
   ```bash
   git clone [https://github.com/AP24110010085/COA_Overclock_Project.git](https://github.com/AP24110010085/COA_Overclock_Project.git)