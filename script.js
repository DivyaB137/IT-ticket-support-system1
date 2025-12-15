let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

// DARK MODE
document.getElementById("darkToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

// GENERATE ID
function generateID() {
    return "TKT-" + Math.floor(Math.random() * 9000 + 1000);
}

// CREATE TICKET
function createTicket() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let priority = document.getElementById("priority").value;

    if (!name || !email || !title || !description) {
        alert("Please fill all fields");
        return;
    }

    let ticket = {
        id: generateID(),
        name,
        email,
        title,
        description,
        priority,
        status: "Open",
        date: new Date().toLocaleString()
    };

    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    renderTickets();
    alert("Ticket Submitted Successfully!");
}

// DISPLAY TICKETS
function renderTickets() {
    let tbody = document.getElementById("ticketBody");
    tbody.innerHTML = "";

    let search = document.getElementById("search").value.toLowerCase();

    tickets
        .filter(t => t.title.toLowerCase().includes(search))
        .forEach((t, index) => {

        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${t.id}</td>
            <td>${t.title}</td>
            <td class="priority-${t.priority}">${t.priority}</td>
            <td>
                <select class="status-select" onchange="updateStatus(${index}, this.value)">
                    <option ${t.status == "Open" ? "selected" : ""}>Open</option>
                    <option ${t.status == "In Progress" ? "selected" : ""}>In Progress</option>
                    <option ${t.status == "Closed" ? "selected" : ""}>Closed</option>
                </select>
            </td>
            <td>${t.date}</td>
            <td><button onclick="deleteTicket(${index})">Delete</button></td>
        `;

        tbody.appendChild(tr);
    });
}

// UPDATE STATUS
function updateStatus(index, newStatus) {
    tickets[index].status = newStatus;
    localStorage.setItem("tickets", JSON.stringify(tickets));
    renderTickets();
}

// DELETE TICKET
function deleteTicket(index) {
    if (confirm("Delete this ticket?")) {
        tickets.splice(index, 1);
        localStorage.setItem("tickets", JSON.stringify(tickets));
        renderTickets();
    }
}

// INITIAL RENDER
renderTickets();
