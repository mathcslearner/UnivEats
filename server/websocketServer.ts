import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type AuthenticatedSocket = WebSocket & { user?: { id: string; email: string } };

export function createWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  const clients = new Map<string, AuthenticatedSocket>();

  wss.on('connection', (ws: AuthenticatedSocket, req) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const token = url.searchParams.get('token');

      if (!token) {
        ws.send(JSON.stringify({ error: 'No token provided' }));
        ws.close();
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
        email: string;
      };

      ws.user = decoded;
      clients.set(decoded.id, ws);

      console.log(`✅ User ${decoded.email} connected`);

      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          handleMessage(decoded.id, message);
        } catch {
          ws.send(JSON.stringify({ error: 'Invalid message format' }));
        }
      });

      ws.on('close', () => {
        console.log(`❌ User ${decoded.email} disconnected`);
        clients.delete(decoded.id);
      });
    } catch {
      ws.send(JSON.stringify({ error: 'Invalid token' }));
      ws.close();
    }
  });

  function handleMessage(senderId: string, message: any) {
    const { recipientId, text } = message;
    const recipient = clients.get(recipientId);
    if (recipient && recipient.readyState === WebSocket.OPEN) {
      recipient.send(
        JSON.stringify({
          from: senderId,
          text,
          timestamp: new Date().toISOString(),
        })
      );
    }
  }

  console.log('🚀 WebSocket server ready at /ws');
}




