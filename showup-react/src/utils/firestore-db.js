import { db } from '../firebase';
import {
	collection,
	doc,
	setDoc,
	getDocs,
	query,
	where,
	updateDoc,
	arrayUnion
} from 'firebase/firestore';

// Seed the Firestore database with mock data if empty
export async function seedDatabase() {
	try {
		const { sportsDb, usersDb, eventsDb } = await import('./database');
		const usersSnapshot = await getDocs(collection(db, 'users'));
		if (usersSnapshot.empty) {
			// Seed sports
			for (const sport of sportsDb) {
				await setDoc(doc(db, 'sports', sport.id), sport);
			}
			// Seed users
			for (const user of usersDb) {
				await setDoc(doc(db, 'users', user.id), user);
			}
			// Seed events
			for (const event of eventsDb) {
				await setDoc(doc(db, 'events', event.id), event);
			}
		}
	} catch (error) {
		console.error('Error seeding database:', error);
		throw error;
	}
}

// export async function seedDatabase() {
//   try {
//     const usersSnapshot = await getDocs(collection(db, "users"));
    
//     // Verificăm dacă baza de date e goală
//     if (usersSnapshot.empty) {
//       console.log("Începem încărcarea datelor în Firebase...");

//       // 1. Încărcăm Sporturile
//       for (const sport of sportsDb) {
//         await setDoc(doc(db, "sports", sport.id), sport);
//       }
//       console.log("✅ Sporturile au fost adăugate!");

//       // 2. Încărcăm Evenimentele (Aici probabil lipsea la tine)
//       for (const event of eventsDb) {
//         await setDoc(doc(db, "events", event.id), event);
//       }
//       console.log("✅ Evenimentele au fost adăugate!");

//       // 3. Încărcăm Userii la final
//       for (const user of usersDb) {
//         await setDoc(doc(db, "users", user.id), user);
//       }
//       console.log("✅ Utilizatorii au fost adăugați!");

//     } else {
//       console.log("Datele există deja în Firebase. Trecem mai departe.");
//     }
//   } catch (error) {
//     console.error("Eroare la încărcarea datelor: ", error);
//   }
// }

// Authenticate user by username or email and password
export async function authenticateUser(identifier, password) {
	try {
		const usersRef = collection(db, 'users');
		const q = query(
			usersRef,
			where('username', '==', identifier)
		);
		const q2 = query(
			usersRef,
			where('email', '==', identifier)
		);
		let userDoc = null;
		let snapshot = await getDocs(q);
		if (!snapshot.empty) {
			userDoc = snapshot.docs[0];
		} else {
			snapshot = await getDocs(q2);
			if (!snapshot.empty) {
				userDoc = snapshot.docs[0];
			}
		}
		if (userDoc) {
			const userData = userDoc.data();
			if (userData.password === password) {
				return { id: userDoc.id, ...userData };
			}
		}
		return null;
	} catch (error) {
		console.error('Error authenticating user:', error);
		return null;
	}
}

export async function createUserAccount(userData) {
	try {
		const usersRef = collection(db, 'users');
		const usernameQuery = query(usersRef, where('username', '==', userData.username));
		const emailQuery = query(usersRef, where('email', '==', userData.email));

		const [usernameSnap, emailSnap] = await Promise.all([
			getDocs(usernameQuery),
			getDocs(emailQuery)
		]);

		if (!usernameSnap.empty) {
			return { ok: false, message: 'Username already exists.' };
		}
		if (!emailSnap.empty) {
			return { ok: false, message: 'Email already exists.' };
		}

		const id = `u${Date.now()}`;
		const payload = {
			name: userData.name.trim(),
			description: userData.description.trim(),
			username: userData.username.trim(),
			password: userData.password,
			email: userData.email.trim(),
			preferences: userData.preferences,
			skillLevel: userData.skillLevel || '',
			isAvailableToday: null,
			matches: []
		};

		await setDoc(doc(db, 'users', id), payload);
		return { ok: true, user: { id, ...payload } };
	} catch (error) {
		console.error('Error creating user account:', error);
		return { ok: false, message: 'Failed to create account. Please try again.' };
	}
}

// Fetch all events
export async function getEvents() {
	try {
		const eventsRef = collection(db, 'events');
		const snapshot = await getDocs(eventsRef);
		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error('Error fetching events:', error);
		return [];
	}
}

// Fetch all sports
export async function getSports() {
	try {
		const sportsRef = collection(db, 'sports');
		const snapshot = await getDocs(sportsRef);
		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error('Error fetching sports:', error);
		return [];
	}
}

export async function joinEvent(eventId, userId) {
	try {
		const eventRef = doc(db, 'events', eventId);
		const userRef = doc(db, 'users', userId);
		await updateDoc(eventRef, {
			players: arrayUnion(userId)
		});
		await updateDoc(userRef, {
			matches: arrayUnion(eventId)
		});
		return { ok: true };
	} catch (error) {
		console.error('Error joining event:', error);
		return { ok: false, message: 'Failed to join event.' };
	}
}

export async function getUsers() {
	try {
		const usersRef = collection(db, 'users');
		const snapshot = await getDocs(usersRef);
		return snapshot.docs.map(userDoc => ({ id: userDoc.id, ...userDoc.data() }));
	} catch (error) {
		console.error('Error fetching users:', error);
		return [];
	}
}

export async function getUserById(userId) {
	try {
		const users = await getUsers();
		return users.find((user) => user.id === userId) || null;
	} catch (error) {
		console.error('Error fetching user by id:', error);
		return null;
	}
}

export async function updateUserProfile(userId, payload) {
	try {
		const userRef = doc(db, 'users', userId);
		await updateDoc(userRef, payload);
		return { ok: true };
	} catch (error) {
		console.error('Error updating user profile:', error);
		return { ok: false, message: 'Failed to save profile changes.' };
	}
}
