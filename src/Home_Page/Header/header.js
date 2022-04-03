import React from "react";


export default function Header() {

  const listStyle= {listStyle: 'none',
    margin: '0 60px',
  }

const anchorStyle = {
  textTransform: 'capitalize',
  textDecoration: 'none',
  color: '#fff',
}
  return (
    <header style={{position: 'absolute',
      zIndex: 99,
      width: '100%',
      padding: '60px'}}>
      <div style={{ display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'}}>
      <div style={{fontWeight: 900,
      letterSpacing: '2px',
      color: '#fff',}}>CrySim.</div>
        <nav>
          <ul style= {{margin: 0,
        padding: 0,
        display: 'flex'}}>
            <li style={listStyle}>
              <a style={anchorStyle} href="/">discover</a>
            </li>
            <li style={listStyle}>
              <a  style={anchorStyle}  href="/">CoinMarketCap</a>
            </li>
            <li style={listStyle}>
              <a style={anchorStyle}  href="/">Contact</a>
            </li>
            <li style={listStyle}>
              <a style={anchorStyle}  href="/">About</a>
            </li>
            <li style={{ color: '#fff',
              fontWeight: 600,
              background: '#23232a',
              padding: '16px 24px',
              borderRadius: '10px', ...listStyle}}>
              <a style={anchorStyle}  href="/Login">Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}