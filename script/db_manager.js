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

// Funcție pentru a obține evenimentele compatibile cu preferințele sportive ale userului
function getCompatibleEvents(userId) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const events = JSON.parse(localStorage.getItem("events")) || [];
    
    // Găsim userul
    const user = users.find(u => u.id === userId);
    if (!user || !user.preferences || user.preferences.length === 0) {
        return [];
    }
    
    // Filtrăm evenimentele care sunt pentru sporturile din preferințele userului
    return events.filter(event => user.preferences.includes(event.sportId));
}

// Inițializăm imediat
initDatabase();