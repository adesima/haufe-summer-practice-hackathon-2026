import { useEffect, useMemo, useState } from 'react';
import Event from '../components/Event';
import { getEvents, getSports, joinEvent } from '../utils/firestore-db';

const SESSION_DISLIKED_KEY = 'dislikedEvents';

export default function Home() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [events, setEvents] = useState([]);
  const [sportsById, setSportsById] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [eventsData, sportsData] = await Promise.all([getEvents(), getSports()]);
      const mappedSports = sportsData.reduce((acc, sport) => {
        acc[sport.id] = sport;
        return acc;
      }, {});
      setSportsById(mappedSports);
      setEvents(eventsData);
    };
    loadData();
  }, []);

  const visibleEvents = useMemo(() => {
    if (!user) return [];

    const disliked = new Set(JSON.parse(sessionStorage.getItem(SESSION_DISLIKED_KEY) || '[]'));
    const favorites = new Set(user.preferences || []);
    const matches = new Set(user.matches || []);

    return events.filter((event) => {
      const sport = sportsById[event.sportId];
      if (!sport) return false;
      if (!favorites.has(event.sportId)) return false;
      if (disliked.has(event.id) || matches.has(event.id)) return false;
      return event.players.length < sport.maxPlayers;
    });
  }, [events, sportsById, user]);

  const handleDislike = (eventId) => {
    const disliked = new Set(JSON.parse(sessionStorage.getItem(SESSION_DISLIKED_KEY) || '[]'));
    disliked.add(eventId);
    sessionStorage.setItem(SESSION_DISLIKED_KEY, JSON.stringify(Array.from(disliked)));
    setMessage('Event hidden for this session.');
    setEvents((prev) => [...prev]);
  };

  const handleLike = async (eventId) => {
    if (!user) return;
    const result = await joinEvent(eventId, user.id);
    if (!result.ok) {
      setMessage(result.message || 'Could not join this event.');
      return;
    }

    const current = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const nextMatches = Array.from(new Set([...(current.matches || []), eventId]));
    const updatedUser = { ...current, matches: nextMatches };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);

    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId && !event.players.includes(user.id)
          ? { ...event, players: [...event.players, user.id] }
          : event
      )
    );
    setMessage('You matched and joined the group.');
  };

  if (!user) {
    return <div style={styles.page}>Please login first.</div>;
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Available Events For You</h2>
      {message && <div style={styles.message}>{message}</div>}
      <div style={styles.grid}>
        {visibleEvents.map((event) => (
          <Event
            key={event.id}
            event={event}
            sport={sportsById[event.sportId]}
            onLike={handleLike}
            onDislike={handleDislike}
            variant="discover"
          />
        ))}
      </div>
      {visibleEvents.length === 0 && <p style={styles.empty}>No available events right now.</p>}
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f3f7fb',
    padding: '84px 16px 90px',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 14,
    color: '#132f4c',
  },
  message: {
    textAlign: 'center',
    color: '#1f5d99',
    marginBottom: 14,
  },
  grid: {
    display: 'grid',
    justifyItems: 'center',
    gap: 14,
  },
  empty: {
    textAlign: 'center',
    color: '#5b7188',
    marginTop: 30,
  },
};
