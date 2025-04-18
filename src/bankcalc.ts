// Theme Toggle
const themeToggle = document.getElementById('theme-toggle') as HTMLInputElement;
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', themeToggle.checked ? 'enabled' : 'disabled');
});

// Check saved theme preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}

// Tab functionality
function openTab(tabName: string): void {
    document.querySelectorAll('.tab-content').forEach(tab => {
        (tab as HTMLElement).style.display = 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName)!.style.display = 'block';
    document.querySelector(`.tab-btn[onclick="openTab('${tabName}')`)!.classList.add('active');
}

// FD Calculation
function calculateFD(): void {
    const principal = parseFloat((document.getElementById('fdPrincipal') as HTMLInputElement).value);
    const rate = parseFloat((document.getElementById('fdRate') as HTMLInputElement).value);
    const years = parseFloat((document.getElementById('fdTenure') as HTMLInputElement).value);

    if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
        alert("   E   ");
        return;
    }

    const maturity = principal * Math.pow(1 + rate/100, years);
    const interest = maturity - principal;

    (document.getElementById('fdResult') as HTMLElement).textContent = formatCurrency(maturity);
    (document.getElementById('fdMaturity') as HTMLElement).textContent = formatCurrency(maturity);
    (document.getElementById('fdInterest') as HTMLElement).textContent = formatCurrency(interest);
}

function resetFD(): void {
    (document.getElementById('fdPrincipal') as HTMLInputElement).value = '';
    (document.getElementById('fdRate') as HTMLInputElement).value = '';
    (document.getElementById('fdTenure') as HTMLInputElement).value = '';
    (document.getElementById('fdResult') as HTMLElement).textContent = '₹0';
    (document.getElementById('fdMaturity') as HTMLElement).textContent = '₹0';
    (document.getElementById('fdInterest') as HTMLElement).textContent = '₹0';
}

// RD Calculation (Quarterly Compounding)
function calculateRD(): void {
    const monthly = parseFloat((document.getElementById('rdMonthly') as HTMLInputElement).value);
    const rate = parseFloat((document.getElementById('rdRate') as HTMLInputElement).value) / 100; // Annual rate as decimal
    const months = parseFloat((document.getElementById('rdTenure') as HTMLInputElement).value);

    if (isNaN(monthly) || isNaN(rate) || isNaN(months)) {
        alert("    E    ");
        return;
    }

    const monthlyRate = rate / 12; // Monthly interest rate (decimal)
    const maturity = monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
    const totalDeposit = monthly * months;
    const interest = maturity - totalDeposit;

    (document.getElementById('rdResult') as HTMLElement).textContent = formatCurrency(maturity);
    (document.getElementById('rdMaturity') as HTMLElement).textContent = formatCurrency(maturity);
    (document.getElementById('rdInterest') as HTMLElement).textContent = formatCurrency(interest);
}

function resetRD(): void {
    (document.getElementById('rdMonthly') as HTMLInputElement).value = '';
    (document.getElementById('rdRate') as HTMLInputElement).value = '';
    (document.getElementById('rdTenure') as HTMLInputElement).value = '';
    (document.getElementById('rdResult') as HTMLElement).textContent = '₹0';
    (document.getElementById('rdMaturity') as HTMLElement).textContent = '₹0';
    (document.getElementById('rdInterest') as HTMLElement).textContent = '₹0';
}

// Assuming you have a formatCurrency function defined elsewhere in your script or in a separate utility file
declare function formatCurrency(value: number): string;
// Helper function for currency formatting
function formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
}

// Initialize
(window as any).openTab = openTab;
(window as any).calculateFD = calculateFD;
