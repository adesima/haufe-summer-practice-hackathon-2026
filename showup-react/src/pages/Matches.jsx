import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Event from '../components/Event';
import { getEvents, getSports, getUserById } from '../utils/firestore-db';

export default function Matches() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [sportsById, setSportsById] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (!storedUser?.id) return;
      const [eventsData, sportsData, userData] = await Promise.all([
        getEvents(),
        getSports(),
        getUserById(storedUser.id),
      ]);
      const mappedSports = sportsData.reduce((acc, sport) => {
        acc[sport.id] = sport;
        return acc;
      }, {});
      setSportsById(mappedSports);
      setEvents(eventsData);
      setCurrentUser(userData || storedUser);
    };
    loadData();
  }, []);

  const matchedEvents = useMemo(() => {
    const matched = new Set(currentUser?.matches || []);
    return events.filter((event) => matched.has(event.id));
  }, [events, currentUser]);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Your Matches</h2>
      <div style={styles.grid}>
        {matchedEvents.map((event) => (
          <Event
            key={event.id}
            event={event}
            sport={sportsById[event.sportId]}
            clickable
            onOpen={() => navigate(`/group/${event.id}`)}
            variant="match"
          />
        ))}
      </div>
      {matchedEvents.length === 0 && <p style={styles.empty}>No matches yet. Go like some events.</p>}
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
