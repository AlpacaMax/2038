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
    <div className="App container is-fluid has-background-light">
      <div className="columns m-0">
        <div className="column">
          <div className="is-size-4 has-text-dark">
            64-bit Version
          </div>
          <div className="is-size-5 has-text-primary">
            { timestamps[0] }
          </div>
          <div className="is-size-3 has-text-weight-bold has-text-dark">
            { dateFormater.format(date64) }
          </div>
          
        </div>
        <div className="column">
          <div className="is-size-4 has-text-dark">
            32-bit Version
          </div>
          <div className="is-size-5 has-text-primary">
            { timestamps[1] }
          </div>
          <div className="is-size-3 has-text-weight-bold has-text-dark">
            { dateFormater.format(date32) }
          </div>
        </div>
      </div>

      <div class="content has-text-dark m-3">
        <p>
          On 03:14:08 UTC 19 January 2038, timestamps that are stored in signed 32-bit integers
          will overflow, causing it to represent 20:45:52 UTC on 13 December 1901. At that point 
          basically every device should be using signed 64-bit integers
          to represent time. The only concerns are some legacy systems, especially embedded systems,
          will still be using signed 32-bit integers, causing potentially fatal errors just like
          the ones in year 2000. If you think the system you are 
          maintaining could have this problem, please fix them as soon as possible before it
          causes any damage.
        </p>
      </div>
    </div>
  );
}

export default App;
