const sportsDb = [
  { id: "s01", name: "Football", minPlayers: 10, maxPlayers: 14 },
  { id: "s02", name: "Tennis", minPlayers: 2, maxPlayers: 4 },
  { id: "s03", name: "Basketball", minPlayers: 6, maxPlayers: 10 },
  { id: "s04", name: "Volleyball", minPlayers: 6, maxPlayers: 12 },
  { id: "s05", name: "Badminton", minPlayers: 2, maxPlayers: 4 },
  { id: "s06", name: "Table Tennis", minPlayers: 2, maxPlayers: 4 }
];

const usersDb = [
  {
    id: "u001",
    name: "Alex Popescu", // Utilizatorul tău principal
    description: "I love football and go out on weekends.",
    username: "alex.popescu",
    password: "Alex1234!",
    email: "alex.popescu@example.com",
    preferences: ["s01", "s03"], // ID-urile de la fotbal și baschet
    skillLevel: "Intermediate",
    isAvailableToday: null // Aici se va schimba în true/false când apeși butonul de pe ecran
  },
  {
    id: "u002",
    name: "Alexandra Dumitrescu", // Dummy user
    description: "Playing tennis for 3 years.",
    username: "alexandra.dumitrescu",
    password: "Alexandra1234!",
    email: "alexandra.dumitrescu@example.com",
    preferences: ["s02"],
    skillLevel: "Advanced",
    isAvailableToday: true // E deja disponibilă în sistem
  },
  {
    id: "u003",
    name: "Mihai Georgescu",
    description: "Passionate about basketball and volleyball.",
    username: "mihai.georgescu",
    password: "Mihai1234!",
    email: "mihai.georgescu@example.com",
    preferences: ["s03", "s04"],
    skillLevel: "Intermediate",
    isAvailableToday: false
  },
  {
    id: "u004",
    name: "Elena Cristescu",
    description: "Playing badminton for 2 years, competitive.",
    username: "elena.cristescu",
    password: "Elena1234!",
    email: "elena.cristescu@example.com",
    preferences: ["s05"],
    skillLevel: "Advanced",
    isAvailableToday: true
  },
  {
    id: "u005",
    name: "Andrei Dumitrescu",
    description: "Beginner in football, want to learn.",
    username: "andrei.dumitrescu",
    password: "Andrei1234!",
    email: "andrei.dumitrescu@example.com",
    preferences: ["s01"],
    skillLevel: "Beginner",
    isAvailableToday: true
  },
  {
    id: "u006",
    name: "Laura Marinescu",
    description: "I love volleyball and table tennis.",
    username: "laura.marinescu",
    password: "Laura1234!",
    email: "laura.marinescu@example.com",
    preferences: ["s04", "s06"],
    skillLevel: "Intermediate",
    isAvailableToday: false
  },
  {
    id: "u007",
    name: "Stefan Popescu",
    description: "Football player by passion, play in local league.",
    username: "stefan.popescu",
    password: "Stefan1234!",
    email: "stefan.popescu@example.com",
    preferences: ["s01"],
    skillLevel: "Advanced",
    isAvailableToday: true
  },
  {
    id: "u008",
    name: "Cristina Moldovan",
    description: "I love team sports, flexible player.",
    username: "cristina.moldovan",
    password: "Cristina1234!",
    email: "cristina.moldovan@example.com",
    preferences: ["s03", "s04", "s01"],
    skillLevel: "Intermediate",
    isAvailableToday: true
  },
  {
    id: "u009",
    name: "Radu Stanescu",
    description: "Serious tennis player with experience.",
    username: "radu.stanescu",
    password: "Radu1234!",
    email: "radu.stanescu@example.com",
    preferences: ["s02"],
    skillLevel: "Advanced",
    isAvailableToday: false
  },
  {
    id: "u010",
    name: "Ioana Tanase",
    description: "Table tennis is my passion, play daily.",
    username: "ioana.tanase",
    password: "Ioana1234!",
    email: "ioana.tanase@example.com",
    preferences: ["s06", "s05"],
    skillLevel: "Advanced",
    isAvailableToday: true
  }
];

const eventsDb = [
  {
    id: "e001",
    sportId: "s01", // Football
    location: "Julius Sports Base",
    time: "19:00",
    captainId: "u001", // Who initiated or was chosen as captain
    players: ["u001", "u002", "u003", "u004"], // Array with IDs of registered players, waiting to reach 10
    chatMessages: [
      { senderId: "u005", text: "Hey guys, who brings the ball?" }
    ]
  },
  {
    id: "e002",
    sportId: "s02", // Tennis
    location: "Central Tennis Court",
    time: "10:00",
    captainId: "u002",
    players: ["u002", "u004", "u009"],
    chatMessages: [
      { senderId: "u002", text: "Looking forward to playing with you all!" }
    ]
  },
  {
    id: "e003",
    sportId: "s03", // Basketball
    location: "Downtown Basketball Arena",
    time: "18:30",
    captainId: "u003",
    players: ["u003", "u001", "u008", "u010"],
    chatMessages: [
      { senderId: "u008", text: "Who's up for a friendly match?" }
    ]
  },
  {
    id: "e004",
    sportId: "s04", // Volleyball
    location: "Sports Complex Bucharest",
    time: "20:00",
    captainId: "u006",
    players: ["u006", "u008", "u003"],
    chatMessages: [
      { senderId: "u006", text: "Need more players for the match!" }
    ]
  },
  {
    id: "e005",
    sportId: "s05", // Badminton
    location: "Recreation Center",
    time: "17:00",
    captainId: "u004",
    players: ["u004", "u005"],
    chatMessages: [
      { senderId: "u004", text: "Beginners welcome, come join us!" }
    ]
  },
  {
    id: "e006",
    sportId: "s06", // Table Tennis
    location: "Club House Fitness",
    time: "19:30",
    captainId: "u010",
    players: ["u010", "u009", "u006"],
    chatMessages: [
      { senderId: "u010", text: "Let's have some fun playing table tennis!" }
    ]
  }
];