export default function Event({
  event,
  sport,
  onLike,
  onDislike,
  clickable = false,
  onOpen,
  variant = 'discover',
}) {
  const showActions = variant === 'discover';
  const isMatchVariant = variant === 'match';

  return (
    <article
      style={{ ...styles.card, ...(clickable ? styles.clickableCard : {}) }}
      onClick={clickable ? onOpen : undefined}
    >
      <div style={styles.headerRow}>
        <h3 style={isMatchVariant ? styles.matchTitle : styles.title}>
          {event.name || sport?.name || event.sportId}
        </h3>
      </div>
      {isMatchVariant ? <div style={styles.meta}>Sport: {sport?.name || event.sportId}</div> : <span style={styles.pill}>{event.sportId}</span>}
      <div style={styles.meta}>Location: {event.location}</div>
      <div style={styles.meta}>Time: {event.time}</div>
      {!isMatchVariant && <div style={styles.meta}>Players: {event.players.length}/{sport?.maxPlayers ?? '-'}</div>}

      {showActions && (
        <div style={styles.actions}>
          <button
            type="button"
            style={{ ...styles.actionButton, ...styles.dislikeButton }}
            onClick={(e) => {
              e.stopPropagation();
              onDislike?.(event.id);
            }}
          >
            Dislike
          </button>
          <button
            type="button"
            style={{ ...styles.actionButton, ...styles.likeButton }}
            onClick={(e) => {
              e.stopPropagation();
              onLike?.(event.id);
            }}
          >
            Like
          </button>
        </div>
      )}
    </article>
  );
}

const styles = {
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
    background: 'linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)',
    boxShadow: '0 8px 28px rgba(14, 42, 71, 0.10)',
    padding: 18,
    boxSizing: 'border-box',
    border: '1px solid #e8f0f9',
  },
  clickableCard: {
    cursor: 'pointer',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    margin: 0,
    fontSize: 20,
    color: '#16324f',
  },
  matchTitle: {
    margin: 0,
    fontSize: 30,
    lineHeight: 1.1,
    color: '#0f2e4a',
    fontWeight: 800,
  },
  pill: {
    fontSize: 12,
    background: '#e7f1ff',
    color: '#1f5d99',
    borderRadius: 999,
    padding: '4px 10px',
    fontWeight: 600,
  },
  meta: {
    color: '#37506b',
    fontSize: 14,
    marginBottom: 6,
  },
  actions: {
    marginTop: 14,
    display: 'flex',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    border: 'none',
    padding: '10px 12px',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
  likeButton: {
    background: '#1f9d55',
    color: '#fff',
  },
  dislikeButton: {
    background: '#e2e8f0',
    color: '#334155',
  },
};
