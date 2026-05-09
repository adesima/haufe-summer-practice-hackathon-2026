// Funcția care mută datele din database.js în LocalStorage la prima rulare
function initDatabase() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("sports", JSON.stringify(sportsDb));
        localStorage.setItem("users", JSON.stringify(usersDb));
        localStorage.setItem("events", JSON.stringify(eventsDb));
        console.log("Baza de date a fost mutată în LocalStorage.");
    }
}

// Funcție pentru a găsi un user la login
function authenticateUser(identifier, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Căutăm după username SAU email
    return users.find(u => 
        (u.username === identifier || u.email === identifier) && u.password === password
    );
}

// Inițializăm imediat
initDatabase();