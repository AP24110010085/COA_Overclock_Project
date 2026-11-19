/**
 * OVERCLOCK PRO - Core COA Mathematical & Simulation Engine
 * Author: Member 2 (Backend & Logic Developer)
 * Models: Clock Frequency, Dynamic CMOS Power, Junction Temperature, and Setup-Time Stability
 */

const STOCK_SPECS = {
    bclk: 100,          // MHz
    multiplier: 36,     // 3.60 GHz
    voltage: 1.20,      // Volts
    capacitance: 12.0,  // Effective switching capacitance constant (nF equivalent)
    ambientTemp: 25.0,  // °C
    maxTemp: 95.0       // °C Thermal Throttling Ceiling
};

// Baseline Stock Calculations
const STOCK_FREQ_GHZ = (STOCK_SPECS.bclk * STOCK_SPECS.multiplier) / 1000; // 3.60 GHz
const STOCK_POWER_W = STOCK_SPECS.capacitance * Math.pow(STOCK_SPECS.voltage, 2) * STOCK_FREQ_GHZ; // ~62.2 W

/**
 * Computes real-time CPU architectural metrics from user inputs
 * @param {number} bclk - Base Clock in MHz (90 - 120)
 * @param {number} multiplier - Core Multiplier (20 - 60)
 * @param {number} voltage - Core Voltage VCore in Volts (0.80 - 1.60)
 * @param {number} thermalResistance - Cooler R_th in °C/W (0.18, 0.08, or 0.04)
 */
function calculateOverclockMetrics(bclk, multiplier, voltage, thermalResistance) {
    // 1. Target Clock Frequency: f = BCLK * Multiplier
    let targetFreqGHz = (bclk * multiplier) / 1000;

    // 2. Dynamic CMOS Power Dissipation: P = C * V^2 * f
    let dynamicPowerW = STOCK_SPECS.capacitance * Math.pow(voltage, 2) * targetFreqGHz;

    // 3. Junction Temperature: Tj = Ta + (P * R_th)
    let junctionTempC = STOCK_SPECS.ambientTemp + (dynamicPowerW * thermalResistance);

    // 4. Minimum Stability Voltage Threshold (Setup-Time Constraint)
    const freqDelta = Math.max(0, targetFreqGHz - STOCK_FREQ_GHZ);
    const minRequiredVoltage = STOCK_SPECS.voltage + (0.14 * freqDelta);

    // 5. Evaluate Hardware Stability & Guardrails
    let status = "STABLE";
    let effectiveFreqGHz = targetFreqGHz;

    if (voltage < minRequiredVoltage - 0.02) {
        status = "BSOD_UNDERVOLT";
    } else if (junctionTempC >= STOCK_SPECS.maxTemp) {
        status = "THERMAL_THROTTLE";
        effectiveFreqGHz = targetFreqGHz * 0.75; // 25% hardware safety downclock
        dynamicPowerW = STOCK_SPECS.capacitance * Math.pow(voltage, 2) * effectiveFreqGHz;
        junctionTempC = STOCK_SPECS.ambientTemp + (dynamicPowerW * thermalResistance);
    }

    return {
        effectiveFreqGHz: effectiveFreqGHz.toFixed(2),
        dynamicPowerW: dynamicPowerW.toFixed(1),
        junctionTempC: junctionTempC.toFixed(1),
        minRequiredVoltage: minRequiredVoltage.toFixed(2),
        status: status,
        freqDeltaPct: (((effectiveFreqGHz - STOCK_FREQ_GHZ) / STOCK_FREQ_GHZ) * 100).toFixed(1),
        powerDeltaPct: (((dynamicPowerW - STOCK_POWER_W) / STOCK_POWER_W) * 100).toFixed(1)
    };
}