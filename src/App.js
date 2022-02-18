import React, { useEffect, useState } from 'react';

function to32bit(val) {
  return val & (2**31 - 1);
}

function getCurrTimestamps() {
  const ts = parseInt(Date.now() / 1000);
  return [ts, to32bit(ts)];
}

function App() {
  const [timestamps, setTimestamps] = useState(getCurrTimestamps());
  const date64 = new Date(timestamps[0] * 1000);
  const date32 = new Date(timestamps[1] * 1000);
  const dateFormater = new Intl.DateTimeFormat(
    'en-GB',
    {
      dateStyle: 'full',
      timeStyle: 'long',
    }
  )

  useEffect(() => {
    setTimeout(() => {
      setTimestamps(getCurrTimestamps());
    }, 1000);
  });

  return (
    <div className="App container is-fluid">
      <div className="columns">
        <div className="column">
          <div className="is-size-4">
            64-bit Version
          </div>
          <div className="is-size-5">
            { timestamps[0] }
          </div>
          <div className="is-size-3 has-text-weight-bold">
            { dateFormater.format(date64) }
          </div>
          
        </div>
        <div className="column">
          <div className="is-size-4">
            32-bit Version
          </div>
          <div className="is-size-5">
            { timestamps[1] }
          </div>
          <div className="is-size-3 has-text-weight-bold">
            { dateFormater.format(date32) }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
