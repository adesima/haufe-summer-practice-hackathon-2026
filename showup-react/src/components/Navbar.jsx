import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/home', label: 'Discover', icon: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
  ) },
  { to: '/matches', label: 'Matches', icon: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6" /><circle cx="11" cy="11" r="8" /></svg>
  ) },
  { to: '/profile', label: 'Profile', icon: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
  ) },
];

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            'nav-item' + (isActive ? ' active' : '')
          }
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </NavLink>
      ))}
      <button type="button" className="nav-item nav-button" onClick={handleLogout}>
        <span className="nav-icon">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
        </span>
        <span className="nav-label">Log Out</span>
      </button>
      <style>{`
        .navbar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 60px;
          background: #fff;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 100;
        }
        .nav-item {
          flex: 1;
          text-align: center;
          color: #888;
          text-decoration: none;
          font-size: 13px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 6px 0 2px 0;
          transition: color 0.2s;
        }
        .nav-button {
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .nav-item.active {
          color: #007bff;
        }
        .nav-icon {
          display: block;
          margin-bottom: 2px;
        }
        .nav-label {
          display: block;
        }
        @media (min-width: 768px) {
          .navbar {
            top: 0;
            bottom: unset;
            height: 56px;
            border-top: none;
            border-bottom: 1px solid #eee;
            justify-content: flex-start;
            padding: 0 32px;
          }
          .nav-item {
            flex: unset;
            margin-right: 32px;
            flex-direction: row;
            font-size: 16px;
            padding: 0;
          }
          .nav-icon {
            margin: 0 8px 0 0;
          }
          .nav-label {
            display: inline;
          }
        }
      `}</style>
    </nav>
  );
}
