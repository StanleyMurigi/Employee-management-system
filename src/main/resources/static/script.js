const API_URL = 'http://localhost:8080/api/employees';
const form = document.getElementById('employeeForm');
const tableBody = document.getElementById('employeeTableBody');
const msgDiv = document.getElementById('message');

// Load employees on page load
document.addEventListener('DOMContentLoaded', fetchEmployees);

async function fetchEmployees() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderTable(data);
    } catch (err) {
        showMsg("Could not fetch data", "error");
    }
}

function renderTable(employees) {
    tableBody.innerHTML = '';
    employees.forEach(emp => {
        const row = `<tr>
            <td>${emp.id}</td>
            <td>${emp.firstName} ${emp.lastName}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>$${emp.salary.toLocaleString()}</td>
            <td>
                <button class="btn-edit" onclick="editEmployee(${emp.id})">Edit</button>
                <button class="btn-delete" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('employeeId').value;
    const data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value,
        salary: document.getElementById('salary').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            showMsg(id ? "Updated!" : "Added!", "success");
            resetForm();
            fetchEmployees();
        } else {
            const err = await res.json();
            showMsg(err.message || "Validation Error", "error");
        }
    } catch (err) {
        showMsg("Server Error", "error");
    }
});

async function deleteEmployee(id) {
    if (confirm("Delete this employee?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchEmployees();
    }
}

async function editEmployee(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const emp = await res.json();

    document.getElementById('employeeId').value = emp.id;
    document.getElementById('firstName').value = emp.firstName;
    document.getElementById('lastName').value = emp.lastName;
    document.getElementById('email').value = emp.email;
    document.getElementById('department').value = emp.department;
    document.getElementById('salary').value = emp.salary;

    document.getElementById('formTitle').innerText = "Edit Employee";
    document.getElementById('cancelBtn').style.display = "inline-block";
}

function resetForm() {
    form.reset();
    document.getElementById('employeeId').value = '';
    document.getElementById('formTitle').innerText = "Add New Employee";
    document.getElementById('cancelBtn').style.display = "none";
}

document.getElementById('cancelBtn').onclick = resetForm;

function showMsg(text, type) {
    msgDiv.innerText = text;
    msgDiv.className = type;
    setTimeout(() => msgDiv.className = '', 3000);
}