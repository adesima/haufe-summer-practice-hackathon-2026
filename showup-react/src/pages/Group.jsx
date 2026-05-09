import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvents, getSports, getUsers } from '../utils/firestore-db';

export default function Group() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [usersById, setUsersById] = useState({});
  const [sportsById, setSportsById] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const [events, users, sports] = await Promise.all([getEvents(), getUsers(), getSports()]);
      const selectedEvent = events.find((item) => item.id === eventId) || null;
      const usersMap = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      const sportsMap = sports.reduce((acc, sport) => {
        acc[sport.id] = sport;
        return acc;
      }, {});
      setEvent(selectedEvent);
      setUsersById(usersMap);
      setSportsById(sportsMap);
    };
    loadData();
  }, [eventId]);

  const memberNames = useMemo(() => {
    if (!event) return [];
    return (event.players || []).map((memberId) => usersById[memberId]?.name || memberId);
  }, [event, usersById]);

  if (!event) {
    return <div style={styles.page}>Loading event...</div>;
  }

  const sportName = sportsById[event.sportId]?.name || event.sportId;

  return (
    <div style={styles.page}>
      <section style={styles.topCard}>
        <h1 style={styles.title}>{event.name || sportName}</h1>
        <div style={styles.detail}>Sport: {sportName}</div>
        <div style={styles.detail}>Location: {event.location}</div>
        <div style={styles.detail}>Time: {event.time}</div>
      </section>

      <section style={styles.columns}>
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Members</h3>
          {memberNames.map((name) => (
            <div key={name} style={styles.row}>{name}</div>
          ))}
        </div>

        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Chat</h3>
          {(event.chatMessages || []).map((msg, index) => (
            <div key={`${msg.senderId}-${index}`} style={styles.chatBubble}>
              <div style={styles.chatAuthor}>{usersById[msg.senderId]?.name || msg.senderId}</div>
              <div>{msg.text}</div>
            </div>
          ))}
        </div>
      </section>
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
  topCard: {
    maxWidth: 960,
    margin: '0 auto 16px',
    background: '#fff',
    borderRadius: 14,
    boxShadow: '0 8px 28px rgba(14, 42, 71, 0.10)',
    padding: 18,
  },
  title: {
    marginTop: 0,
    marginBottom: 8,
    fontSize: 34,
    color: '#0f2e4a',
  },
  detail: {
    color: '#37506b',
    marginBottom: 5,
  },
  columns: {
    maxWidth: 960,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: 12,
  },
  panel: {
    background: '#fff',
    borderRadius: 14,
    boxShadow: '0 8px 28px rgba(14, 42, 71, 0.10)',
    padding: 16,
  },
  panelTitle: {
    marginTop: 0,
    color: '#16324f',
  },
  row: {
    padding: '8px 10px',
    borderRadius: 8,
    background: '#f7fbff',
    marginBottom: 8,
    color: '#1f3850',
  },
  chatBubble: {
    background: '#e7f1ff',
    color: '#1f3850',
    borderRadius: 10,
    padding: 10,
  },
  chatAuthor: {
    fontWeight: 700,
    marginBottom: 4,
  },
};
