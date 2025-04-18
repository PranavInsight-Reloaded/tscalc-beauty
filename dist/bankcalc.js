// Theme Toggle
var themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', themeToggle.checked ? 'enabled' : 'disabled');
});
// Check saved theme preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}
// Tab functionality
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(function (tab) {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.classList.remove('active');
    });
    document.getElementById(tabName).style.display = 'block';
    document.querySelector(".tab-btn[onclick=\"openTab('".concat(tabName, "')")).classList.add('active');
}
// FD Calculation
function calculateFD() {
    var principal = parseFloat(document.getElementById('fdPrincipal').value);
    var rate = parseFloat(document.getElementById('fdRate').value);
    var years = parseFloat(document.getElementById('fdTenure').value);
    if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
        alert("Err");
        return;
    }
    var maturity = principal * Math.pow(1 + rate / 100, years);
    var interest = maturity - principal;
    document.getElementById('fdResult').textContent = formatCurrency(maturity);
    document.getElementById('fdMaturity').textContent = formatCurrency(maturity);
    document.getElementById('fdInterest').textContent = formatCurrency(interest);
}
function resetFD() {
    document.getElementById('fdPrincipal').value = '';
    document.getElementById('fdRate').value = '';
    document.getElementById('fdTenure').value = '';
    document.getElementById('fdResult').textContent = '₹0';
    document.getElementById('fdMaturity').textContent = '₹0';
    document.getElementById('fdInterest').textContent = '₹0';
}
// RD Calculation (Quarterly Compounding)
function calculateRD() {
    var monthly = parseFloat(document.getElementById('rdMonthly').value);
    var rate = parseFloat(document.getElementById('rdRate').value) / 100; // Annual rate as decimal
    var months = parseFloat(document.getElementById('rdTenure').value);
    if (isNaN(monthly) || isNaN(rate) || isNaN(months)) {
        alert("   E   ");
        return;
    }
    var monthlyRate = rate / 12; // Monthly interest rate (decimal)
    var maturity = monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
    var totalDeposit = monthly * months;
    var interest = maturity - totalDeposit;
    document.getElementById('rdResult').textContent = formatCurrency(maturity);
    document.getElementById('rdMaturity').textContent = formatCurrency(maturity);
    document.getElementById('rdInterest').textContent = formatCurrency(interest);
}
function resetRD() {
    document.getElementById('rdMonthly').value = '';
    document.getElementById('rdRate').value = '';
    document.getElementById('rdTenure').value = '';
    document.getElementById('rdResult').textContent = '₹0';
    document.getElementById('rdMaturity').textContent = '₹0';
    document.getElementById('rdInterest').textContent = '₹0';
}
// Helper function for currency formatting
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
}
// Initialize
window.openTab = openTab;
window.calculateFD = calculateFD;
