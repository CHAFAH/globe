const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Utility function to generate a text calendar
function generateCalendarText(year, month) {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const date = new Date(year, month - 1, 1);
  let calendarText = `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}\n`;
  calendarText += days.join(' ') + '\n';

  let line = '   '.repeat(date.getDay());
  while (date.getMonth() === month - 1) {
    line += date.getDate().toString().padStart(2, ' ') + ' ';
    if (date.getDay() === 6) {
      calendarText += line.trimEnd() + '\n';
      line = '';
    }
    date.setDate(date.getDate() + 1);
  }
  if (line.trim()) {
    calendarText += line.trimEnd() + '\n';
  }
  return calendarText.trimEnd();
}

function createServer() {
  const app = express();

  const backgroundColor = process.env.COLOR || 'blue';
  const showCalendar = process.env.CALENDAR === 'true';
  const country = process.env.COUNTRY;

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const calendarOutput = showCalendar ? generateCalendarText(year, month) : 'Calendar not set';
  const countryOutput = country ? country : 'Country not set';

  const logsDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
  const logFilePath = path.join(logsDir, 'app.log');
  const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

  const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${message}`;
    console.log(line);
    logStream.write(line + '\n');
  };

  logMessage('🚀 Starting Color Display Application...');
  logMessage(`🌐 Hostname: ${os.hostname()}`);
  logMessage(`🎨 Background color set to: ${backgroundColor}`);
  logMessage(`📄 Calendar enabled: ${showCalendar}`);
  logMessage(`🌍 Country: ${country || 'not set'}`);
  logMessage(`📁 Logs saved at: ${logFilePath}`);

  app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'index.html');
    fs.readFile(htmlPath, 'utf8', (err, data) => {
      if (err) {
        logMessage(`❌ Error reading HTML: ${err.message}`);
        return res.status(500).send('Internal Server Error');
      }

      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const ua = req.headers['user-agent'] || 'Unknown';
      logMessage(`📥 GET / from ${ip} | UA: ${ua}`);

      const output = data
        .replace(/{{COLOR}}/g, backgroundColor)
        .replace(/{{CALENDAR_OUTPUT}}/g, calendarOutput)
        .replace(/{{COUNTRY_OUTPUT}}/g, countryOutput);

      res.send(output);
    });
  });

  return { app, logStream };
}

module.exports = { createServer };

if (require.main === module) {
  const { app } = createServer();
  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('🛑 Server terminated gracefully');
    });
  });
}
