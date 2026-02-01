const API_BASE = '/employee';
let currentmode = 'add'; // add or edit

document.addEventListener('DOMContentLoaded', fetchEmployees);

const employeeForm = document.getElementById('employeeForm');
employeeForm.addEventListener('submit', handleFormSubmit);

async function fetchEmployees() {
    try {
        const response = await fetch(`${API_BASE}/all`);
        if (response.status === 401) {
             // Browser will prompt, or this means cancelled.
             document.getElementById('loading').innerHTML = 'Please log in to view data.';
             return;
        }
        if (!response.ok) throw new Error('Failed to fetch');
        
        const employees = await response.json();
        renderEmployees(employees);
    } catch (error) {
        console.error(error);
        document.getElementById('loading').innerHTML = '<p style="color:var(--danger-color)">Error connecting to server. Is it running?</p>';
    }
}

function renderEmployees(employees) {
    const grid = document.getElementById('employee-grid');
    const loading = document.getElementById('loading');
    
    loading.style.display = 'none';
    grid.innerHTML = '';
    
    if (employees.length === 0) {
       grid.innerHTML = '<p style="color:var(--text-secondary); grid-column: 1/-1; text-align:center;">No employees found.</p>';
       return;
    }

    employees.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'card';
        const avatarUrl = emp.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random&color=fff`;
        // Safe string escape? Basic protection against injection in innerHTML needed but this is a demo.
        // Assuming backend sanitized or we trust input.
        
        card.innerHTML = `
            <div class="card-header">
                <div class="card-avatar-container">
                    <img src="${avatarUrl}" class="card-avatar" alt="Avatar">
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${escapeHtml(emp.name)}</h3>
                <div class="card-subtitle">${escapeHtml(emp.jobTitle)}</div>
                
                <div class="info-row"><i class="fa-regular fa-envelope" style="width:20px"></i> ${escapeHtml(emp.email)}</div>
                <div class="info-row"><i class="fa-solid fa-phone" style="width:20px"></i> ${escapeHtml(emp.phone)}</div>
                
                <div class="card-actions">
                    <button class="btn-edit" onclick="editEmployeeInit(${emp.id})">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                    <button class="btn-danger" onclick="deleteEmployee(${emp.id})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function editEmployeeInit(id) {
    try {
        const response = await fetch(`${API_BASE}/find/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const emp = await response.json();
        
        document.getElementById('empId').value = emp.id;
        document.getElementById('empCode').value = emp.employeeCode;
        document.getElementById('name').value = emp.name;
        document.getElementById('email').value = emp.email;
        document.getElementById('jobTitle').value = emp.jobTitle;
        document.getElementById('phone').value = emp.phone;
        document.getElementById('imageUrl').value = emp.imageUrl || '';
        
        openModal('edit');
    } catch (e) {
        showToast('Error loading details', 'error');
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const emp = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        jobTitle: document.getElementById('jobTitle').value,
        phone: document.getElementById('phone').value,
        imageUrl: document.getElementById('imageUrl').value,
    };

    const id = document.getElementById('empId').value;
    const method = currentmode === 'add' ? 'POST' : 'PUT';
    const url = currentmode === 'add' ? `${API_BASE}/add` : `${API_BASE}/update`;
    
    if (currentmode === 'edit') {
        emp.id = id;
        emp.employeeCode = document.getElementById('empCode').value;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emp)
        });

        if (response.ok) {
            closeModal();
            fetchEmployees();
            showToast(currentmode === 'add' ? 'Employee Added' : 'Updated Successfully', 'success');
        } else if (response.status === 403) {
            showToast('Access Denied: Admins Only', 'error');
        } else {
            showToast('Operation Failed', 'error');
        }
    } catch (e) {
        showToast('Network Error', 'error');
    }
}

async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to remove this employee?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/delete/${id}`, { method: 'DELETE' });
        if (response.ok) {
            showToast('Deleted successfully', 'success');
            fetchEmployees();
        } else if (response.status === 403) {
            showToast('Access Denied: Admins Only', 'error');
        } else {
            showToast('Failed to delete', 'error');
        }
    } catch (e) {
        showToast('Network Error', 'error');
    }
}

function openModal(mode, id = null) {
    currentmode = mode;
    const modal = document.getElementById('employeeModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('employeeForm');
    
    modal.classList.add('active');
    
    if (mode === 'add') {
        title.textContent = 'Add New Employee';
        form.reset();
        document.getElementById('empId').value = '';
    } else {
        title.textContent = 'Edit Employee';
    }
}

function closeModal() {
    document.getElementById('employeeModal').classList.remove('active');
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeft = type === 'success' ? '4px solid #22c55e' : '4px solid #ef4444';
    
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-check' : 'fa-circle-exclamation'}" 
           style="color: ${type === 'success' ? '#22c55e' : '#ef4444'}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('employeeModal');
    if (event.target == modal) {
        closeModal();
    }
}
