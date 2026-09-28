/**
 * คิดก่อนลงทุน | MONEY / LAB
 * Logic for Credit to Investment Calculator
 * Features:
 *  - Comma formatting in inputs & outputs
 *  - Lump sum vs Installment / Minimum Payment (ลดต้นลดดอก)
 *  - Custom monthly principal payment (e.g. select 3 months and enter 200 baht)
 *  - Quick plan chips: หารเท่า, กรอก 200 บ., ขั้นต่ำ 3%, 5%, 8%
 *  - Quick chips 3%, 5%, 7%, 8%, 10% for Return rate and Net ROI
 *  - 7-Column Monthly Schedule Table (ต้นต่องวด, +ดอกเบี้ย, จ่ายบัตร, +กำไร, ยอดรับ, คงเหลือสุทธิ)
 *  - Reverse auto-calculation from Net ROI input
 */

(function () {
  'use strict';

  // DOM Elements - Inputs
  const investAmountInput = document.getElementById('investAmount');
  const cardInterestRateInput = document.getElementById('cardInterestRate');
  const cardFeeInput = document.getElementById('cardFee');
  const withdrawDateInput = document.getElementById('withdrawDate');
  const repayDateInput = document.getElementById('repayDate');
  const investmentDaysInput = document.getElementById('investmentDays');
  const expectedReturnRateInput = document.getElementById('expectedReturnRate');
  const expectedReturnAmountInput = document.getElementById('expectedReturnAmount');
  const taxRateInput = document.getElementById('taxRate');
  const btnReset = document.getElementById('btnReset');
  const btnApplyCashAdvanceFee = document.getElementById('btnApplyCashAdvanceFee');

  // Payment Mode Elements
  const tabLumpSum = document.getElementById('tabLumpSum');
  const tabInstallment = document.getElementById('tabInstallment');
  const sectionLumpSum = document.getElementById('sectionLumpSum');
  const sectionInstallment = document.getElementById('sectionInstallment');
  const installmentMonthsInput = document.getElementById('installmentMonths');
  const customMonthlyPayInput = document.getElementById('customMonthlyPay');
  const installmentTableBody = document.getElementById('installmentTableBody');
  const monthChips = document.querySelectorAll('.month-chip');
  const chipEqualAmount = document.getElementById('chipEqualAmount');

  // Plan Chips
  const btnPlanEqual = document.getElementById('btnPlanEqual');
  const btnPlan200 = document.getElementById('btnPlan200');
  const btnPlanMin3 = document.getElementById('btnPlanMin3');
  const btnPlanMin5 = document.getElementById('btnPlanMin5');
  const btnPlanMin8 = document.getElementById('btnPlanMin8');
  const planChips = [btnPlanEqual, btnPlan200, btnPlanMin3, btnPlanMin5, btnPlanMin8];

  // Checkbox & Formula preview elements
  const chkDivideByMonths = document.getElementById('chkDivideByMonths');
  const labelMonthsInCard = document.getElementById('labelMonthsInCard');
  const samplePrincipalPerMonth = document.getElementById('samplePrincipalPerMonth');
  const miniReceiveText = document.getElementById('miniReceiveText');
  const miniDebtText = document.getElementById('miniDebtText');
  const labelMonthCount = document.getElementById('labelMonthCount');
  const unitIndicator = document.getElementById('unitIndicator');
  const monthlyStatusPill = document.getElementById('monthlyStatusPill');

  // Quick Rate & Quick ROI chips
  const quickRateChips = document.querySelectorAll('.quick-rate-chip');
  const quickRoiChips = document.querySelectorAll('.quick-roi-chip');

  // DOM Elements - Hero & Metrics
  const heroSummaryValues = document.getElementById('heroSummaryValues');
  const heroResultLabel = document.getElementById('heroResultLabel');
  const statusPill = document.getElementById('statusPill');
  const netProfitDisplay = document.getElementById('netProfitDisplay');
  const netProfitUnit = document.getElementById('netProfitUnit');
  const resultHeroMessage = document.getElementById('resultHeroMessage');
  const displayDays = document.getElementById('displayDays');
  const netRoiInput = document.getElementById('netRoiInput');
  const cardInterestTitle = document.getElementById('cardInterestTitle');
  const cardInterestDisplay = document.getElementById('cardInterestDisplay');
  const cardInterestUnit = document.getElementById('cardInterestUnit');
  const cardFeeSubtext = document.getElementById('cardFeeSubtext');
  const netGainTitle = document.getElementById('netGainTitle');
  const netGainDisplay = document.getElementById('netGainDisplay');
  const netGainUnit = document.getElementById('netGainUnit');
  const taxSubtext = document.getElementById('taxSubtext');

  // DOM Elements - Section 02
  const barProfitPreTax = document.getElementById('barProfitPreTax');
  const barInterestValue = document.getElementById('barInterestValue');
  const barFeeValue = document.getElementById('barFeeValue');
  const barTaxValue = document.getElementById('barTaxValue');
  const barProfitFill = document.getElementById('barProfitFill');
  const barInterestFill = document.getElementById('barInterestFill');

  // 3 สรุปรายการตามโจทย์
  const totalDebtToPay = document.getElementById('totalDebtToPay');
  const debtSubMonthly = document.getElementById('debtSubMonthly');
  const debtUnit = document.getElementById('debtUnit');

  const totalReceivedAmount = document.getElementById('totalReceivedAmount');
  const receiveSubMonthly = document.getElementById('receiveSubMonthly');
  const receiveUnit = document.getElementById('receiveUnit');

  const netBalanceAmount = document.getElementById('netBalanceAmount');
  const balanceSubMonthly = document.getElementById('balanceSubMonthly');
  const balanceUnit = document.getElementById('balanceUnit');

  // DOM Elements - 5-Point Summary Dashboard
  const summaryVerdictPill = document.getElementById('summaryVerdictPill');
  const summaryVerdictIcon = document.getElementById('summaryVerdictIcon');
  const summaryVerdictText = document.getElementById('summaryVerdictText');
  const sumPointPrincipal = document.getElementById('sumPointPrincipal');
  const sumPointPrincipalSub = document.getElementById('sumPointPrincipalSub');
  const sumPointDays = document.getElementById('sumPointDays');
  const sumPointMonthsUnit = document.getElementById('sumPointMonthsUnit');
  const sumPointDateRange = document.getElementById('sumPointDateRange');
  const sumPointPaymentType = document.getElementById('sumPointPaymentType');
  const sumPointCard2ReceiveWrap = document.getElementById('sumPointCard2ReceiveWrap');
  const sumPointCard2ReceiveText = document.getElementById('sumPointCard2ReceiveText');
  const sumPointMonthlyPrincipal = document.getElementById('sumPointMonthlyPrincipal');
  const sumPointTotalDebt = document.getElementById('sumPointTotalDebt');
  const sumPointDebtUnit = document.getElementById('sumPointDebtUnit');
  const sumPointDebtMonthly = document.getElementById('sumPointDebtMonthly');
  const sumPointTotalInterest = document.getElementById('sumPointTotalInterest');
  const sumPointInterestMonthly = document.getElementById('sumPointInterestMonthly');
  const sumPointTotalReceive = document.getElementById('sumPointTotalReceive');
  const sumPointReceiveUnit = document.getElementById('sumPointReceiveUnit');
  const sumPointReceiveSub = document.getElementById('sumPointReceiveSub');
  const sumPointNetResult = document.getElementById('sumPointNetResult');
  const sumPointNetUnit = document.getElementById('sumPointNetUnit');
  const sumPointNetMonthly = document.getElementById('sumPointNetMonthly');
  const sumNetResultBox = document.getElementById('sumNetResultBox');
  const breakevenDesc = document.getElementById('breakevenDesc');
  const breakevenRateDisplay = document.getElementById('breakevenRateDisplay');

  // Accordion & UI
  const btnToggleAccordion = document.getElementById('btnToggleAccordion');
  const accordionAssumptions = document.getElementById('accordionAssumptions');
  const toastNotification = document.getElementById('toastNotification');
  const daysChips = document.querySelectorAll('.days-chip');
  const amountChips = document.querySelectorAll('.quick-chip');

  // State
  let currentPaymentMode = 'installment';
  let isReverseCalculating = false;
  let customPayTouched = false;
  let lastEditedReturn = 'rate'; // 'rate' or 'amount'

  // Defaults (เปิดมาทุกอย่างเป็น 0 ยกเว้นดอกเบี้ยบัตรต่อปี เป็น 25)
  const DEFAULTS = {
    amount: 0,
    interestRate: 25,
    fee: 0,
    days: 90,
    months: 3,
    expectedReturnRate: 0,
    tax: 0
  };

  /**
   * Parse float from string with commas
   */
  function parseMoney(val) {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const cleanStr = String(val).replace(/,/g, '').trim();
    const num = parseFloat(cleanStr);
    return isNaN(num) ? 0 : num;
  }

  /**
   * Format numbers to 2 decimal places with comma
   */
  function formatMoney(num) {
    if (isNaN(num)) return '0.00';
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  /**
   * Format integer/decimal string with commas as user types
   */
  function formatInputWithCommas(inputEl) {
    const rawVal = inputEl.value.replace(/,/g, '');
    if (!rawVal) return;
    
    const parts = rawVal.split('.');
    const integerPart = parts[0].replace(/\D/g, '');
    
    if (parts.length > 1) {
      const decimalPart = parts[1].replace(/\D/g, '').slice(0, 2);
      const formattedInt = integerPart ? Number(integerPart).toLocaleString('en-US') : '0';
      inputEl.value = `${formattedInt}.${decimalPart}`;
    } else {
      if (integerPart) {
        inputEl.value = Number(integerPart).toLocaleString('en-US');
      } else {
        inputEl.value = '';
      }
    }
  }

  /**
   * Date ISO helper
   */
  function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  /**
   * Initialize Dates
   */
  function initDates(days = 0) {
    const today = new Date();
    const futureDate = new Date();
    if (days > 0) {
      futureDate.setDate(today.getDate() + days);
    }

    withdrawDateInput.value = formatDateISO(today);
    repayDateInput.value = formatDateISO(futureDate);
    investmentDaysInput.value = days;
  }

  /**
   * Handle Date Range Changes
   */
  function handleDateChange() {
    if (!withdrawDateInput.value || !repayDateInput.value) return;

    const start = new Date(withdrawDateInput.value);
    const end = new Date(repayDateInput.value);

    const diffTime = end.getTime() - start.getTime();
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      diffDays = 1;
      const adjustedEnd = new Date(start);
      adjustedEnd.setDate(adjustedEnd.getDate() + 1);
      repayDateInput.value = formatDateISO(adjustedEnd);
    }

    investmentDaysInput.value = diffDays;
    syncReturnFromRate();
    calculate();
  }

  /**
   * Update Repay Date when Days changed
   */
  function handleDaysInput(days) {
    const d = Math.max(1, parseInt(days, 10) || 1);
    investmentDaysInput.value = d;

    const start = withdrawDateInput.value ? new Date(withdrawDateInput.value) : new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + d);
    repayDateInput.value = formatDateISO(end);

    syncReturnFromRate();
    calculate();
  }

  /**
   * Get active calculation days
   */
  function getActiveDays() {
    if (currentPaymentMode === 'installment') {
      const months = parseInt(installmentMonthsInput.value, 10);
      const m = (months && months > 0) ? months : 3;
      return m * 30; // 30 days per month
    }
    const days = parseInt(investmentDaysInput.value, 10);
    return (days && days > 0) ? days : 90;
  }

  /**
   * Get active months count for division
   */
  function getActiveMonths() {
    if (currentPaymentMode === 'installment') {
      const val = parseInt(installmentMonthsInput.value, 10);
      return (val && val > 0) ? val : 3;
    }
    const days = parseInt(investmentDaysInput.value, 10) || 0;
    const m = Math.round(days / 30);
    return m > 0 ? m : 1;
  }

  /**
   * Two-way sync: When % return changes -> update Baht amount
   */
  function syncReturnFromRate() {
    if (isReverseCalculating || lastEditedReturn === 'amount') return;
    const P = parseMoney(investAmountInput.value);
    const D = getActiveDays();
    const R_inv = Math.max(0, parseFloat(expectedReturnRateInput.value) || 0);

    const amount = (P > 0 && D > 0) ? ((P * (R_inv / 100) / 365) * D) : 0;
    expectedReturnAmountInput.value = (amount > 0) ? formatMoney(amount) : '0.00';
  }

  /**
   * Two-way sync: When Baht return amount changes -> update % return rate
   */
  function syncRateFromReturn() {
    if (isReverseCalculating) return;
    const P = parseMoney(investAmountInput.value);
    const D = getActiveDays();
    const amount = parseMoney(expectedReturnAmountInput.value);

    if (P > 0 && D > 0 && amount > 0) {
      const rate = (amount * 365 * 100) / (P * D);
      expectedReturnRateInput.value = rate.toFixed(2);
    } else {
      expectedReturnRateInput.value = '0';
    }
  }

  /**
   * Reverse calculation from Net ROI % (ผลตอบแทนสุทธิต่อเงินต้น)
   */
  function handleNetRoiInput(val) {
    const cleanStr = String(val).replace(/[%+]/g, '').trim();
    const targetRoi = parseFloat(cleanStr);
    if (isNaN(targetRoi)) return;

    isReverseCalculating = true;

    const P = parseMoney(investAmountInput.value);
    const D = getActiveDays();
    const T = Math.max(0, Math.min(100, parseFloat(taxRateInput.value) || 0));

    const { totalBorrowCost } = calculateBorrowCost(P, D);

    const targetNetProfit = P * (targetRoi / 100);
    const targetGainPostTax = targetNetProfit + totalBorrowCost;

    const taxFactor = (1 - (T / 100));
    const targetGainPreTax = taxFactor > 0 ? (targetGainPostTax / taxFactor) : targetGainPostTax;

    let requiredReturnRate = 0;
    if (P > 0 && D > 0) {
      requiredReturnRate = (targetGainPreTax * 365 * 100) / (P * D);
    }

    expectedReturnRateInput.value = Math.max(0, requiredReturnRate).toFixed(2);
    expectedReturnAmountInput.value = formatMoney(Math.max(0, targetGainPreTax));

    // Update active state of quick return rate chips
    quickRateChips.forEach(chip => {
      if (Math.abs(parseFloat(chip.getAttribute('data-rate')) - requiredReturnRate) < 0.1) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    isReverseCalculating = false;
    calculate();
  }

  /**
   * Calculate Borrow Cost (Lump sum or Installmentลดต้นลดดอก with custom monthly payment)
   */
  function calculateBorrowCost(P, D) {
    const R_card = Math.max(0, parseFloat(cardInterestRateInput.value) || 0);
    const F = parseMoney(cardFeeInput.value);

    if (currentPaymentMode === 'lumpSum') {
      const cardInterest = (P > 0 && D > 0) ? ((P * (R_card / 100) / 365) * D) : 0;
      return {
        cardInterest: cardInterest,
        totalInterest: cardInterest,
        totalBorrowCost: cardInterest + F,
        installmentSchedule: null,
        monthlyPrincipal: P
      };
    }

    // Installment Mode (ลดต้นลดดอก)
    const months = getActiveMonths();
    const userCustomPay = parseMoney(customMonthlyPayInput.value);
    
    if (P === 0) {
      return {
        cardInterest: 0,
        totalInterest: 0,
        totalBorrowCost: F,
        installmentSchedule: [],
        monthlyPrincipal: userCustomPay > 0 ? userCustomPay : 0
      };
    }

    // Default equal payment if 0
    const equalPay = P / months;
    const targetMonthlyPrincipal = userCustomPay > 0 ? userCustomPay : equalPay;

    let remainingPrincipal = P;
    let totalInterest = 0;
    const schedule = [];

    for (let m = 1; m <= months; m++) {
      const startBalance = remainingPrincipal;
      const monthInterest = (startBalance * (R_card / 100) / 365) * 30;
      totalInterest += monthInterest;

      let principalPaid = 0;
      if (m === months) {
        // Last month: Pay off all remaining principal
        principalPaid = startBalance;
      } else {
        principalPaid = Math.min(startBalance, targetMonthlyPrincipal);
      }

      const totalPaidThisMonth = principalPaid + monthInterest;
      remainingPrincipal = Math.max(0, startBalance - principalPaid);

      schedule.push({
        month: m,
        startBalance: startBalance,
        principalPaid: principalPaid,
        interest: monthInterest,
        totalPaid: totalPaidThisMonth,
        endBalance: remainingPrincipal
      });
    }

    return {
      cardInterest: totalInterest,
      totalInterest: totalInterest,
      totalBorrowCost: totalInterest + F,
      installmentSchedule: schedule,
      monthlyPrincipal: targetMonthlyPrincipal
    };
  }

  /**
   * Render 7-Column Installment Schedule Table
   */
  function renderInstallmentTable(schedule, P_month, profit_month, isDivided) {
    if (!installmentTableBody) return;
    
    if (!schedule || schedule.length === 0) {
      installmentTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: #94a3b8; padding: 20px; font-weight: 500;">
            กรอกเงินต้นและเลือกจำนวนงวดเพื่อดูตารางคำนวณการแบ่งจ่าย
          </td>
        </tr>
      `;
      return;
    }
    
    let html = '';
    schedule.forEach(row => {
      const principalThisMonth = isDivided ? row.principalPaid : row.principalPaid;
      const profitThisMonth = isDivided ? profit_month : (row.month === schedule.length ? profit_month * schedule.length : 0);
      const receivedThisMonth = principalThisMonth + profitThisMonth;
      const debtThisMonth = row.totalPaid;
      const netCashflow = receivedThisMonth - debtThisMonth;
      
      const netColor = netCashflow >= 0 ? '#10b981' : '#ef4444';
      const netSign = netCashflow >= 0 ? '+' : '';

      html += `
        <tr>
          <td>${row.month}</td>
          <td>${formatMoney(principalThisMonth)}</td>
          <td style="color:#d97706;">+${formatMoney(row.interest)}</td>
          <td style="font-weight:600; color:#1e293b;">${formatMoney(debtThisMonth)}</td>
          <td style="color:#0f766e;">+${formatMoney(profitThisMonth)}</td>
          <td style="color:#0ea5e9; font-weight:700;">${formatMoney(receivedThisMonth)}</td>
          <td style="color:${netColor}; font-weight:800;">${netSign}${formatMoney(netCashflow)}</td>
        </tr>
      `;
    });
    installmentTableBody.innerHTML = html;
  }

  /**
   * Main calculation function
   */
  function calculate() {
    const P = parseMoney(investAmountInput.value);
    const R_card = Math.max(0, parseFloat(cardInterestRateInput.value) || 0);
    const F = parseMoney(cardFeeInput.value);
    const D = getActiveDays();
    const M = getActiveMonths();
    const isMonthlyAvg = (currentPaymentMode === 'installment') && chkDivideByMonths && chkDivideByMonths.checked;

    // Update equal chip amount
    if (chipEqualAmount) {
      chipEqualAmount.textContent = M > 0 ? formatMoney(P / M) : '0.00';
    }

    // Auto update custom monthly pay if not touched by user
    if (!customPayTouched && customMonthlyPayInput && document.activeElement !== customMonthlyPayInput) {
      customMonthlyPayInput.value = M > 0 ? formatMoney(P / M) : '0';
    }

    const R_inv = Math.max(0, parseFloat(expectedReturnRateInput.value) || 0);
    const T = Math.max(0, Math.min(100, parseFloat(taxRateInput.value) || 0));

    // Update hero top right info
    heroSummaryValues.innerHTML = `${formatMoney(P)} บาท <span class="slash">/</span> ${R_card}% ต่อปี`;

    // 1. Borrowing cost calculation
    const { cardInterest, totalBorrowCost, installmentSchedule, monthlyPrincipal } = calculateBorrowCost(P, D);

    // 2. Pre-tax Gain
    let gainPreTax = 0;
    if (lastEditedReturn === 'amount' && parseMoney(expectedReturnAmountInput.value) > 0) {
      gainPreTax = parseMoney(expectedReturnAmountInput.value);
    } else {
      gainPreTax = (P > 0 && D > 0) ? ((P * (R_inv / 100) / 365) * D) : 0;
    }

    // 3. Tax
    const taxAmount = (gainPreTax > 0) ? gainPreTax * (T / 100) : 0;

    // 4. Post-tax Gain
    const gainPostTax = gainPreTax - taxAmount;

    // 5. Net Profit
    const netProfit = (P === 0 && totalBorrowCost === 0) ? 0 : (gainPostTax - totalBorrowCost);

    // 6. Net ROI %
    const netRoi = (P > 0) ? (netProfit / P) * 100 : 0;

    // 7. Cashflow Totals
    const totalDebtCard = P + totalBorrowCost;
    const totalReceived = P + gainPostTax;
    const balanceRemaining = totalReceived - totalDebtCard;

    // Monthly components based on user custom payment or equal
    const actualMonthlyPrincipal = monthlyPrincipal;
    const profit_month = M > 0 ? (gainPostTax / M) : 0;
    const interest_month = M > 0 ? (totalBorrowCost / M) : 0;
    const received_month = actualMonthlyPrincipal + profit_month;
    const debt_month = actualMonthlyPrincipal + interest_month;
    const balance_month = profit_month - interest_month;

    // Update label month counts & formula example text
    if (labelMonthsInCard) labelMonthsInCard.textContent = M;
    if (labelMonthCount) labelMonthCount.textContent = M;
    if (samplePrincipalPerMonth) samplePrincipalPerMonth.textContent = formatMoney(actualMonthlyPrincipal);

    // Update mini formula notes
    if (miniReceiveText) {
      miniReceiveText.textContent = `${formatMoney(actualMonthlyPrincipal)} (ต้น) + ${formatMoney(profit_month)} (กำไร) = ${formatMoney(received_month)} บ./ด.`;
    }
    if (miniDebtText) {
      miniDebtText.textContent = `${formatMoney(actualMonthlyPrincipal)} (ต้น) + ${formatMoney(interest_month)} (ดอก) = ${formatMoney(debt_month)} บ./ด.`;
    }

    if (installmentSchedule) {
      renderInstallmentTable(installmentSchedule, actualMonthlyPrincipal, profit_month, isMonthlyAvg);
    }

    // 8. Break-even return rate
    let breakevenRate = 0;
    if (P > 0 && D > 0) {
      const taxFactor = (1 - (T / 100));
      const requiredGainPreTax = taxFactor > 0 ? (totalBorrowCost / taxFactor) : totalBorrowCost;
      breakevenRate = (requiredGainPreTax * 365 * 100) / (P * D);
    }

    // ==========================================
    // Render Results: Checkbox Mode Handling
    // ==========================================
    const heroNetVal = isMonthlyAvg ? balance_month : netProfit;
    const formattedHeroNet = formatMoney(heroNetVal);

    if (P === 0) {
      netProfitDisplay.textContent = `0.00`;
      statusPill.textContent = 'เท่าทุนพอดี';
      statusPill.className = 'status-pill status-breakeven';
      resultHeroMessage.textContent = 'กรอกข้อมูลเงินต้นและผลตอบแทนเพื่อเริ่มคำนวณ';
      netRoiInput.className = 'net-roi-inline-input';
    } else if (netProfit > 0) {
      netProfitDisplay.textContent = `+${formattedHeroNet}`;
      statusPill.textContent = isMonthlyAvg ? 'คุ้มทุน / กำไรต่อเดือน' : 'คุ้มทุน / ได้กำไร';
      statusPill.className = 'status-pill status-gain';
      resultHeroMessage.textContent = isMonthlyAvg
        ? `เฉลี่ยกำไรสุทธิเดือนละ ${formattedHeroNet} บาท (จากระยะเวลา ${M} เดือน)`
        : 'ผลตอบแทนครอบคลุมต้นทุนดอกเบี้ยและค่าธรรมเนียมทั้งหมดแล้ว!';
      netRoiInput.className = 'net-roi-inline-input';
    } else if (netProfit < 0) {
      netProfitDisplay.textContent = `${formattedHeroNet}`;
      statusPill.textContent = isMonthlyAvg ? 'ยังไม่คุ้มทุน (ต่อเดือน)' : 'ยังไม่คุ้มทุน';
      statusPill.className = 'status-pill status-loss';
      resultHeroMessage.textContent = isMonthlyAvg
        ? `เฉลี่ยขาดทุนสุทธิเดือนละ ${formattedHeroNet} บาท (จากระยะเวลา ${M} เดือน)`
        : 'ผลตอบแทนยังไม่ครอบคลุมดอกเบี้ยและค่าธรรมเนียม';
      netRoiInput.className = 'net-roi-inline-input is-loss';
    } else {
      netProfitDisplay.textContent = `0.00`;
      statusPill.textContent = 'เท่าทุนพอดี';
      statusPill.className = 'status-pill status-breakeven';
      resultHeroMessage.textContent = 'ผลตอบแทนเท่ากับต้นทุนกู้ยืมพอดี ไม่กำไรและไม่ขาดทุน';
      netRoiInput.className = 'net-roi-inline-input';
    }

    heroResultLabel.textContent = isMonthlyAvg ? 'ผลลัพธ์หลังหักต้นทุน (เฉลี่ยต่อเดือน)' : 'ผลลัพธ์หลังหักต้นทุน';
    netProfitUnit.textContent = isMonthlyAvg ? 'บาท / เดือน' : 'บาท';

    displayDays.textContent = (currentPaymentMode === 'installment')
      ? `${D} วัน (${M} เดือน)`
      : (D >= 30 ? `${D} วัน (~${Math.round(D / 30)} เดือน)` : `${D} วัน`);

    // Update editable Net ROI input (if not actively being typed by user)
    if (!isReverseCalculating && document.activeElement !== netRoiInput) {
      netRoiInput.value = (P > 0) ? `${netRoi >= 0 ? '+' : ''}${netRoi.toFixed(2)}` : '0.00';
    }

    // Render Metric Cards
    if (isMonthlyAvg) {
      cardInterestTitle.textContent = 'ดอกเบี้ยบัตร (เฉลี่ย/เดือน)';
      cardInterestDisplay.textContent = formatMoney(interest_month);
      cardInterestUnit.textContent = 'บาท/เดือน';
      cardFeeSubtext.textContent = `รวมตลอดสัญญา ${formatMoney(cardInterest)} บ.`;

      netGainTitle.textContent = 'กำไรลงทุน (เฉลี่ย/เดือน)';
      netGainDisplay.textContent = formatMoney(profit_month);
      netGainUnit.textContent = 'บาท/เดือน';
      taxSubtext.textContent = `รวมตลอดสัญญา ${formatMoney(gainPostTax)} บ.`;
    } else {
      cardInterestTitle.textContent = 'ดอกเบี้ยบัตร';
      cardInterestDisplay.textContent = formatMoney(cardInterest);
      cardInterestUnit.textContent = 'บาท';
      cardFeeSubtext.textContent = F > 0 ? `+ ค่าธรรมเนียม ${formatMoney(F)} บาท` : (currentPaymentMode === 'installment' ? 'รวมดอกเบี้ยทุกงวด (ลดต้นลดดอก)' : `รวมดอกเบี้ยตลอดระยะเวลา ${D} วัน`);

      netGainTitle.textContent = 'กำไรลงทุนหลังลงทุน';
      netGainDisplay.textContent = formatMoney(gainPostTax);
      netGainUnit.textContent = 'บาท';
      taxSubtext.textContent = T > 0 ? `หักภาษี ${T}% (${formatMoney(taxAmount)} บ.)` : (currentPaymentMode === 'installment' ? `เฉลี่ยเดือนละ ${formatMoney(profit_month)} บ.` : `ตลอดระยะเวลา ${D} วัน`);
    }

    // Render Breakdown Card 02 (Bars)
    barProfitPreTax.textContent = formatMoney(isMonthlyAvg ? profit_month : gainPreTax);
    barInterestValue.textContent = formatMoney(isMonthlyAvg ? interest_month : cardInterest);
    barFeeValue.textContent = formatMoney(isMonthlyAvg ? (M > 0 ? F / M : 0) : F);
    barTaxValue.textContent = formatMoney(isMonthlyAvg ? (M > 0 ? taxAmount / M : 0) : taxAmount);
    unitIndicator.textContent = isMonthlyAvg ? 'บาท / เดือน' : 'บาท';

    const maxBarVal = Math.max(gainPreTax, cardInterest, 0.01);
    const profitWidth = (gainPreTax > 0) ? Math.min(100, Math.max(5, (gainPreTax / maxBarVal) * 100)) : 0;
    const interestWidth = (cardInterest > 0) ? Math.min(100, Math.max(5, (cardInterest / maxBarVal) * 100)) : 0;
    barProfitFill.style.width = `${profitWidth}%`;
    barInterestFill.style.width = `${interestWidth}%`;

    // Render 3 Cashflow Lines in Section 02
    if (isMonthlyAvg) {
      totalDebtToPay.textContent = formatMoney(debt_month);
      debtUnit.textContent = 'บาท / เดือน';
      debtSubMonthly.textContent = `${formatMoney(actualMonthlyPrincipal)} (ต้น) + ${formatMoney(interest_month)} (ดอก) • รวม ${formatMoney(totalDebtCard)} บ.`;

      totalReceivedAmount.textContent = formatMoney(received_month);
      receiveUnit.textContent = 'บาท / เดือน';
      receiveSubMonthly.textContent = `${formatMoney(actualMonthlyPrincipal)} (ต้น) + ${formatMoney(profit_month)} (กำไร) • รวม ${formatMoney(totalReceived)} บ.`;

      netBalanceAmount.textContent = `${balance_month > 0 ? '+' : ''}${formatMoney(balance_month)}`;
      balanceUnit.textContent = 'บาท / เดือน';
      balanceSubMonthly.textContent = `กำไร ${formatMoney(profit_month)} - ดอก ${formatMoney(interest_month)} • รวม ${balanceRemaining > 0 ? '+' : ''}${formatMoney(balanceRemaining)} บ.`;

      if (monthlyStatusPill) {
        monthlyStatusPill.innerHTML = `<span class="status-indicator-dot"></span><span>โหมดคำนวณ: <strong>หารเฉลี่ยรายเดือน (${formatMoney(actualMonthlyPrincipal)} ต้น + ดอก + กำไร)</strong></span>`;
      }
    } else {
      totalDebtToPay.textContent = formatMoney(totalDebtCard);
      debtUnit.textContent = 'บาท';
      debtSubMonthly.textContent = currentPaymentMode === 'installment'
        ? `เฉลี่ยเดือนละ ${formatMoney(debt_month)} บาท (${M} เดือน)`
        : `เงินต้น ${formatMoney(P)} บ. + ดอกเบี้ย ${formatMoney(cardInterest)} บ. (${D} วัน)`;

      totalReceivedAmount.textContent = formatMoney(totalReceived);
      receiveUnit.textContent = 'บาท';
      receiveSubMonthly.textContent = currentPaymentMode === 'installment'
        ? `เฉลี่ยเดือนละ ${formatMoney(received_month)} บาท (${M} เดือน)`
        : `เงินต้น ${formatMoney(P)} บ. + กำไร ${formatMoney(gainPostTax)} บ. (${D} วัน)`;

      netBalanceAmount.textContent = `${balanceRemaining > 0 ? '+' : ''}${formatMoney(balanceRemaining)}`;
      balanceUnit.textContent = 'บาท';
      balanceSubMonthly.textContent = currentPaymentMode === 'installment'
        ? `เฉลี่ยเดือนละ ${balance_month > 0 ? '+' : ''}${formatMoney(balance_month)} บาท (${M} เดือน)`
        : `สุทธิตลอดระยะเวลา ${D} วัน`;

      if (monthlyStatusPill) {
        monthlyStatusPill.innerHTML = currentPaymentMode === 'installment'
          ? `<span class="status-indicator-dot" style="background:#64748b;"></span><span>โหมดคำนวณ: <strong>ยอดรวมทั้งหมดตลอดสัญญา (${M} เดือน)</strong></span>`
          : `<span class="status-indicator-dot" style="background:#0f766e;"></span><span>โหมดคำนวณ: <strong>จ่ายเต็มก้อนเดียวเมื่อครบกำหนด (${D} วัน)</strong></span>`;
      }
    }

    if (balanceRemaining >= 0) {
      netBalanceAmount.className = 'cashflow-val balance-val positive';
    } else {
      netBalanceAmount.className = 'cashflow-val balance-val negative';
    }

    // Render 5-Point Financial Summary Dashboard (Real-Time Synchronized with Top Section)
    renderFinancialSummaryDashboard(P, D, M, T, totalBorrowCost, breakevenRate, R_inv, cardInterest, F, actualMonthlyPrincipal, totalDebtCard, totalReceived, gainPostTax, netProfit, profit_month, interest_month, debt_month, balance_month, balanceRemaining, isMonthlyAvg);

    // Sync active days chip
    daysChips.forEach(chip => {
      const chipDays = parseInt(chip.getAttribute('data-days'), 10);
      if (chipDays === D) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    // Sync active month chip
    monthChips.forEach(chip => {
      const chipMonths = parseInt(chip.getAttribute('data-months'), 10);
      if (chipMonths === parseInt(installmentMonthsInput.value, 10)) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  /**
   * Render Simple & Clear 5-Point Financial Summary Dashboard
   * 100% Real-time and synchronized with top Hero card and cash flow breakdown
   */
  function renderFinancialSummaryDashboard(P, D, M, T, totalBorrowCost, breakevenRate, R_invest, cardInterest, F, actualMonthlyPrincipal, totalDebtCard, totalReceived, gainPostTax, netProfit, profit_month, interest_month, debt_month, balance_month, balanceRemaining, isMonthlyAvg) {
    if (!sumPointPrincipal) return;

    // 1. Verdict Pill (ตรงกับข้างบนเป๊ะ)
    const effectiveNet = isMonthlyAvg ? balance_month : netProfit;
    if (summaryVerdictPill) {
      if (P === 0) {
        summaryVerdictPill.className = 'summary-verdict-pill status-breakeven';
        if (summaryVerdictIcon) summaryVerdictIcon.textContent = '⚖️';
        if (summaryVerdictText) summaryVerdictText.textContent = 'เริ่มต้นการคำนวณ (0.00 บ.)';
      } else if (effectiveNet > 0.01) {
        summaryVerdictPill.className = 'summary-verdict-pill status-gain';
        if (summaryVerdictIcon) summaryVerdictIcon.textContent = '✅';
        if (summaryVerdictText) summaryVerdictText.textContent = isMonthlyAvg
          ? `คุ้มทุน / กำไรเดือนละ +${formatMoney(effectiveNet)} บ.`
          : `คุ้มทุน / กำไรสุทธิ +${formatMoney(effectiveNet)} บ.`;
      } else if (Math.abs(effectiveNet) <= 0.01) {
        summaryVerdictPill.className = 'summary-verdict-pill status-breakeven';
        if (summaryVerdictIcon) summaryVerdictIcon.textContent = '⚖️';
        if (summaryVerdictText) summaryVerdictText.textContent = 'เท่าทุนพอดี (Break-even)';
      } else {
        summaryVerdictPill.className = 'summary-verdict-pill status-loss';
        if (summaryVerdictIcon) summaryVerdictIcon.textContent = '⚠️';
        if (summaryVerdictText) summaryVerdictText.textContent = isMonthlyAvg
          ? `ยังไม่คุ้มทุน (ขาดทุนเดือนละ ${formatMoney(Math.abs(effectiveNet))} บ.)`
          : `ยังไม่คุ้มทุน (ขาดทุนสุทธิ ${formatMoney(Math.abs(effectiveNet))} บ.)`;
      }
    }

    // ข้อ 1: เงินต้น
    if (sumPointPrincipal) sumPointPrincipal.textContent = formatMoney(P);
    if (sumPointPrincipalSub) {
      sumPointPrincipalSub.textContent = (P === 0)
        ? 'ยอดเงินต้นสำหรับนำไปลงทุน'
        : (isMonthlyAvg
            ? `เงินต้นที่เบิก (เฉลี่ยตัดต้นงวดละ ${formatMoney(actualMonthlyPrincipal)} บ.)`
            : `ยอดเงินต้นสำหรับนำไปลงทุน`);
    }

    // ข้อ 2: จำนวนวัน / ระยะเวลา & ประเภทการจ่าย (รวม 2 และ 3 เข้าด้วยกัน)
    if (sumPointDays) sumPointDays.textContent = `${D}`;
    const sumPointDaysUnit = document.getElementById('sumPointDaysUnit');
    if (sumPointDaysUnit) sumPointDaysUnit.textContent = 'วัน';
    if (sumPointMonthsUnit) {
      if (currentPaymentMode === 'installment') {
        sumPointMonthsUnit.textContent = `(${M} เดือน)`;
      } else if (D >= 30) {
        sumPointMonthsUnit.textContent = `(~${Math.round(D / 30)} เดือน)`;
      } else {
        sumPointMonthsUnit.textContent = '';
      }
    }
    if (sumPointPaymentType) {
      if (P === 0) {
        sumPointPaymentType.textContent = currentPaymentMode === 'installment' ? `${M} เดือน 0.00 บ.` : 'จ่ายเต็มก้อนเดียว';
      } else if (currentPaymentMode === 'installment') {
        sumPointPaymentType.textContent = `${M} เดือน ${formatMoney(actualMonthlyPrincipal)} บ.`;
      } else {
        sumPointPaymentType.textContent = 'จ่ายเต็มก้อนเดียว';
      }
    }
    if (sumPointDateRange) {
      if (D === 0 && M === 0) {
        sumPointDateRange.textContent = 'ระบุระยะเวลาที่ต้องการลงทุน';
      } else if (currentPaymentMode === 'installment') {
        sumPointDateRange.textContent = `ระยะเวลาผ่อนชำระรวม ${M} งวด (${D} วัน) • ตัดเงินต้นเดือนละ ${formatMoney(actualMonthlyPrincipal)} บ.`;
      } else {
        sumPointDateRange.textContent = `ถือเงินลงทุนครบ ${D} วันแล้วจ่ายคืนเต็มจำนวน ${formatMoney(P)} บาท`;
      }
    }
    if (sumPointCard2ReceiveText) {
      if (P === 0) {
        sumPointCard2ReceiveText.textContent = '0.00 (ต้น) + 0.00 (กำไร) • รวม 0.00 บ.';
      } else if (currentPaymentMode === 'installment') {
        sumPointCard2ReceiveText.textContent = `${formatMoney(actualMonthlyPrincipal)} (ต้น) + ${formatMoney(profit_month)} (กำไร) • รวม ${formatMoney(totalReceived)} บ.`;
      } else {
        sumPointCard2ReceiveText.textContent = `${formatMoney(P)} (ต้น) + ${formatMoney(gainPostTax)} (กำไร) • รวม ${formatMoney(totalReceived)} บ.`;
      }
    }

    // ข้อ 3: ยอดเรียกเก็บจ่ายบัตร (รวมดอกเบี้ยแล้ว)
    if (sumPointTotalDebt) sumPointTotalDebt.textContent = totalDebtToPay.textContent;
    if (sumPointDebtUnit) sumPointDebtUnit.textContent = debtUnit.textContent;
    if (sumPointDebtMonthly) sumPointDebtMonthly.textContent = debtSubMonthly.textContent;
    if (sumPointTotalInterest) {
      sumPointTotalInterest.textContent = `${formatMoney(cardInterest)} บาท`;
    }
    if (sumPointInterestMonthly) {
      sumPointInterestMonthly.textContent = (P === 0)
        ? 'รวมจ่ายบัตรทั้งหมด 0.00 บ.'
        : (isMonthlyAvg
            ? `(รวมจ่ายบัตรตลอดสัญญา ${formatMoney(totalDebtCard)} บ.)`
            : (currentPaymentMode === 'installment'
                ? `(เฉลี่ยจ่ายบัตรเดือนละ ${formatMoney(debt_month)} บ.)`
                : `(รวมจ่ายบัตรเมื่อครบกำหนด ${D} วัน)`));
    }

    // ข้อ 4: ยอดเรียกเก็บ / รับมา (ยกตัวเลขมาจากส่วนสรุปเงินเข้า-ออกโดยตรง ไม่ต้องคำนวณใหม่)
    if (sumPointTotalReceive) sumPointTotalReceive.textContent = totalReceivedAmount.textContent;
    if (sumPointReceiveUnit) sumPointReceiveUnit.textContent = receiveUnit.textContent;
    if (sumPointReceiveSub) sumPointReceiveSub.textContent = receiveSubMonthly.textContent;
    if (sumPointNetResult) {
      sumPointNetResult.textContent = netBalanceAmount.textContent;
      sumPointNetResult.className = `point-val ${effectiveNet > 0.01 ? 'text-teal' : (effectiveNet < -0.01 ? 'text-orange' : '')}`;
      sumPointNetResult.style.color = (effectiveNet > 0.01) ? '#15803d' : (effectiveNet < -0.01 ? '#b91c1c' : '#334155');
    }
    if (sumPointNetUnit) sumPointNetUnit.textContent = balanceUnit.textContent;
    if (sumPointNetMonthly) sumPointNetMonthly.textContent = balanceSubMonthly.textContent;

    if (sumNetResultBox) {
      if (effectiveNet > 0.01) {
        sumNetResultBox.style.borderColor = '#86efac';
        sumNetResultBox.style.background = '#f0fdf4';
      } else if (effectiveNet < -0.01) {
        sumNetResultBox.style.borderColor = '#fca5a5';
        sumNetResultBox.style.background = '#fef2f2';
      } else {
        sumNetResultBox.style.borderColor = '#e2e8f0';
        sumNetResultBox.style.background = '#f8fafc';
      }
    }

    // สรุป Break-Even Point Banner ด้านล่าง
    if (breakevenDesc) {
      if (P === 0 || totalBorrowCost === 0) {
        breakevenDesc.textContent = 'กรอกข้อมูลต้นทุนบัตรและเงินต้นเพื่อคำนวณจุดคุ้มทุน';
      } else {
        const monthCost = M > 0 ? (totalBorrowCost / M) : 0;
        breakevenDesc.textContent = `หลังหักภาษี ต้องได้กำไรอย่างน้อย ${formatMoney(totalBorrowCost)} บาท ใน ${D} วัน (${formatMoney(monthCost)} บ./เดือน)`;
      }
    }
    if (breakevenRateDisplay) {
      breakevenRateDisplay.textContent = `${breakevenRate.toFixed(2)}%`;
    }
  }

  /**
   * Switch Payment Mode
   */
  function setPaymentMode(mode) {
    currentPaymentMode = mode;
    if (mode === 'installment') {
      tabInstallment.classList.add('active');
      tabLumpSum.classList.remove('active');
      sectionInstallment.classList.remove('hidden');
      sectionLumpSum.classList.add('hidden');
    } else {
      tabLumpSum.classList.add('active');
      tabInstallment.classList.remove('active');
      sectionLumpSum.classList.remove('hidden');
      sectionInstallment.classList.add('hidden');
    }
    syncReturnFromRate();
    calculate();
  }

  /**
   * Reset form to default values
   */
  function resetForm() {
    investAmountInput.value = '0';
    cardInterestRateInput.value = '25';
    cardFeeInput.value = '0';
    expectedReturnRateInput.value = '0';
    expectedReturnAmountInput.value = '0';
    taxRateInput.value = '0';
    installmentMonthsInput.value = '3';
    customPayTouched = false;
    customMonthlyPayInput.value = '0';
    lastEditedReturn = 'rate';

    planChips.forEach(c => c && c.classList.remove('active'));
    quickRateChips.forEach(c => c && c.classList.remove('active'));
    monthChips.forEach(c => {
      if (c && c.getAttribute('data-months') === '3') c.classList.add('active');
      else if (c) c.classList.remove('active');
    });
    daysChips.forEach(c => {
      if (c && c.getAttribute('data-days') === '90') c.classList.add('active');
      else if (c) c.classList.remove('active');
    });
    amountChips.forEach(c => c && c.classList.remove('active'));

    if (chkDivideByMonths) chkDivideByMonths.checked = true;

    setPaymentMode('installment');
    initDates(90);
    syncReturnFromRate();
    calculate();
    showToast('รีเซ็ตข้อมูลเป็น 0 (ยกเว้นดอกเบี้ยบัตร 25%) เรียบร้อย');
  }

  /**
   * Toast helper
   */
  let toastTimer = null;
  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2800);
  }

  /**
   * Event Listeners
   */

  // Comma formatting input listeners
  [investAmountInput, cardFeeInput].forEach(input => {
    input.addEventListener('input', () => {
      formatInputWithCommas(input);
      if (!customPayTouched) {
        const P = parseMoney(investAmountInput.value);
        const M = getActiveMonths();
        customMonthlyPayInput.value = M > 0 ? formatMoney(P / M) : '0.00';
      }
      syncReturnFromRate();
      calculate();
    });
  });

  // Custom Monthly Pay Input (e.g. 200 baht)
  customMonthlyPayInput.addEventListener('input', () => {
    formatInputWithCommas(customMonthlyPayInput);
    customPayTouched = true;
    planChips.forEach(c => c && c.classList.remove('active'));
    calculate();
  });

  // Quick Plan Chips
  btnPlanEqual.addEventListener('click', () => {
    const P = parseMoney(investAmountInput.value);
    const M = getActiveMonths();
    const equalVal = M > 0 ? formatMoney(P / M) : '0.00';
    customMonthlyPayInput.value = equalVal;
    customPayTouched = false;
    planChips.forEach(c => c && c.classList.remove('active'));
    btnPlanEqual.classList.add('active');
    calculate();
    showToast(`เลือกแผน: ผ่อนเงินต้นเท่ากัน (${equalVal} บ./งวด)`);
  });

  btnPlan200.addEventListener('click', () => {
    customMonthlyPayInput.value = '200.00';
    customPayTouched = true;
    planChips.forEach(c => c && c.classList.remove('active'));
    btnPlan200.classList.add('active');
    calculate();
    showToast('เลือกแผน: กรอก 200 บาท/งวด');
  });

  btnPlanMin3.addEventListener('click', () => {
    const P = parseMoney(investAmountInput.value);
    customMonthlyPayInput.value = formatMoney(P * 0.03);
    customPayTouched = true;
    planChips.forEach(c => c && c.classList.remove('active'));
    btnPlanMin3.classList.add('active');
    calculate();
    showToast(`เลือกแผน: จ่ายขั้นต่ำ 3% (${formatMoney(P * 0.03)} บ./งวด)`);
  });

  btnPlanMin5.addEventListener('click', () => {
    const P = parseMoney(investAmountInput.value);
    customMonthlyPayInput.value = formatMoney(P * 0.05);
    customPayTouched = true;
    planChips.forEach(c => c && c.classList.remove('active'));
    btnPlanMin5.classList.add('active');
    calculate();
    showToast(`เลือกแผน: จ่ายขั้นต่ำ 5% (${formatMoney(P * 0.05)} บ./งวด)`);
  });

  btnPlanMin8.addEventListener('click', () => {
    const P = parseMoney(investAmountInput.value);
    customMonthlyPayInput.value = formatMoney(P * 0.08);
    customPayTouched = true;
    planChips.forEach(c => c && c.classList.remove('active'));
    btnPlanMin8.classList.add('active');
    calculate();
    showToast(`เลือกแผน: จ่ายขั้นต่ำ 8% (${formatMoney(P * 0.08)} บ./งวด)`);
  });

  cardInterestRateInput.addEventListener('input', calculate);
  taxRateInput.addEventListener('input', calculate);

  // Expected Return: Two-Way Synchronization with comma support
  expectedReturnRateInput.addEventListener('input', () => {
    lastEditedReturn = 'rate';
    quickRateChips.forEach(c => c.classList.remove('active'));
    syncReturnFromRate();
    calculate();
  });

  expectedReturnAmountInput.addEventListener('input', () => {
    lastEditedReturn = 'amount';
    formatInputWithCommas(expectedReturnAmountInput);
    quickRateChips.forEach(c => c.classList.remove('active'));
    syncRateFromReturn();
    calculate();
  });

  // Quick Return Rate Chips (3%, 5%, 7%, 8%, 10%)
  quickRateChips.forEach(chip => {
    chip.addEventListener('click', () => {
      lastEditedReturn = 'rate';
      const rate = chip.getAttribute('data-rate');
      expectedReturnRateInput.value = rate;
      quickRateChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      syncReturnFromRate();
      calculate();
      showToast(`เลือกผลตอบแทน: ${rate}% ต่อปี`);
    });
  });

  // Quick ROI Chips in Hero Card (3%, 5%, 7%, 8%, 10%)
  quickRoiChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const roi = chip.getAttribute('data-roi');
      netRoiInput.value = `+${roi}.00`;
      handleNetRoiInput(roi);
      showToast(`คำนวณย้อนกลับจากผลตอบแทนสุทธิเป้าหมาย: +${roi}%`);
    });
  });

  // Editable Net ROI Input (Reverse Calculation!)
  netRoiInput.addEventListener('input', (e) => {
    handleNetRoiInput(e.target.value);
  });

  netRoiInput.addEventListener('blur', () => {
    calculate();
  });

  // Checkbox: เฉลี่ยรายเดือนในช่องจำนวนงวด (เดือน)
  if (chkDivideByMonths) {
    chkDivideByMonths.addEventListener('change', () => {
      calculate();
      if (chkDivideByMonths.checked) {
        showToast('เปิดการคำนวณเฉลี่ยรายเดือน (ต้น + ดอก + กำไร)');
      } else {
        showToast('แสดงยอดรวมทั้งหมดตลอดระยะเวลา');
      }
    });
  }

  // Payment Tabs
  tabLumpSum.addEventListener('click', () => setPaymentMode('lumpSum'));
  tabInstallment.addEventListener('click', () => setPaymentMode('installment'));

  // Installment Controls
  installmentMonthsInput.addEventListener('input', () => {
    if (!customPayTouched) {
      const P = parseMoney(investAmountInput.value);
      const M = getActiveMonths();
      customMonthlyPayInput.value = M > 0 ? formatMoney(P / M) : '0.00';
    }
    syncReturnFromRate();
    calculate();
  });

  monthChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const m = chip.getAttribute('data-months');
      installmentMonthsInput.value = m;
      if (!customPayTouched) {
        const P = parseMoney(investAmountInput.value);
        const M = parseInt(m, 10) || 3;
        customMonthlyPayInput.value = M > 0 ? formatMoney(P / M) : '0.00';
      }
      syncReturnFromRate();
      calculate();
    });
  });

  // Date inputs
  withdrawDateInput.addEventListener('change', handleDateChange);
  repayDateInput.addEventListener('change', handleDateChange);

  // Manual days input
  investmentDaysInput.addEventListener('input', (e) => {
    handleDaysInput(e.target.value);
  });

  // Quick Amount Chips
  amountChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const amt = parseInt(chip.getAttribute('data-amount'), 10);
      investAmountInput.value = Number(amt).toLocaleString('en-US');
      if (!customPayTouched) {
        const M = getActiveMonths();
        customMonthlyPayInput.value = M > 0 ? formatMoney(amt / M) : '0.00';
      }
      syncReturnFromRate();
      calculate();
    });
  });

  // Quick Days Chips
  daysChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const days = chip.getAttribute('data-days');
      handleDaysInput(days);
    });
  });

  // Cash Advance Fee Helper (3% + VAT 7% = 3.21%)
  btnApplyCashAdvanceFee.addEventListener('click', () => {
    const P = parseMoney(investAmountInput.value);
    const fee = Math.round(P * 0.0321 * 100) / 100;
    cardFeeInput.value = formatMoney(fee);
    cardInterestRateInput.value = 16;
    calculate();
    showToast(`ปรับอัตราดอกเบี้ย 16% และค่าธรรมเนียม 3.21% (${formatMoney(fee)} บาท) เรียบร้อย`);
  });

  // Reset button
  btnReset.addEventListener('click', resetForm);

  // Accordion toggle
  btnToggleAccordion.addEventListener('click', () => {
    const isOpen = accordionAssumptions.classList.toggle('open');
    btnToggleAccordion.setAttribute('aria-expanded', isOpen);
  });

  // Auto select content on focus if value is 0
  const allNumericInputs = [
    investAmountInput,
    cardInterestRateInput,
    cardFeeInput,
    installmentMonthsInput,
    customMonthlyPayInput,
    expectedReturnRateInput,
    expectedReturnAmountInput,
    taxRateInput,
    investmentDaysInput
  ];

  allNumericInputs.forEach(el => {
    if (!el) return;
    el.addEventListener('focus', () => {
      if (el.value === '0' || el.value === '0.00' || el.value === '0.0') {
        el.select();
      }
    });
  });

  // Initialize (เปิดมาทำทุกอย่างเป็น 0 ยกเว้นดอกเบี้ยบัตรต่อปี เป็น 25)
  initDates(90);
  investAmountInput.value = '0';
  cardInterestRateInput.value = '25';
  cardFeeInput.value = '0';
  installmentMonthsInput.value = '3';
  customMonthlyPayInput.value = '0';
  expectedReturnRateInput.value = '0';
  expectedReturnAmountInput.value = '0';
  taxRateInput.value = '0';
  lastEditedReturn = 'rate';
  quickRateChips.forEach(c => c && c.classList.remove('active'));
  setPaymentMode('installment');
  syncReturnFromRate();
  calculate();
})();
