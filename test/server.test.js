const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { app, shortDb, fullDb } = require('../server');

test('health endpoint responds successfully and chat validates requests without a Gemini key', async () => {
    const server = app.listen(0);
    await once(server, 'listening');
    const baseUrl = `http://127.0.0.1:${server.address().port}`;

    try {
        const healthResponse = await fetch(`${baseUrl}/api/health`);
        assert.equal(healthResponse.status, 200);
        assert.equal((await healthResponse.json()).status, 'OK');

        const emptyResponse = await fetch(`${baseUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: '  ', language: 'uk' })
        });
        assert.equal(emptyResponse.status, 400);

        const languageResponse = await fetch(`${baseUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'headache', language: 'fr' })
        });
        assert.equal(languageResponse.status, 400);

        const missingKeyResponse = await fetch(`${baseUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'headache', language: 'en' })
        });
        assert.equal(missingKeyResponse.status, 503);
    } finally {
        server.close();
        await Promise.all([
            new Promise(resolve => shortDb.close(resolve)),
            new Promise(resolve => fullDb.close(resolve))
        ]);
    }
});
