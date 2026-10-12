import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { json } from "node:stream/consumers";

process.loadEnvFile("./.env");

const port = process.env.PORT || 3000;

function sendJson(res, statusCode, data) {
   res.statusCode = statusCode;
   res.setHeader("Content-Type", "application/json");
   res.end(JSON.stringify(data));
}

const users = [
   { id: 1, name: "John" },
   { id: 2, name: "Jane" },
   { id: 3, name: "Bob" },
];

const server = createServer(async (req, res) => {
   const { method, url } = req;

   const [pathname, querystring] = url.split("?");
   const searchParams = new URLSearchParams(querystring);

   if (method === "GET") {
      if (pathname === "/users") {
         if (
            Number.isNaN(Number(searchParams.get("limit") || 0)) ||
            Number.isNaN(Number(searchParams.get("offset") || 0))
         ) {
            return sendJson(res, 400, {
               error: "Limit and offset must be numbers",
            });
         }

         const limit = Number(searchParams.get("limit")) || users.length;
         const offset = Number(searchParams.get("offset")) || 0;

         const paginatedUsers = users.slice(offset, offset + limit);

         return sendJson(res, 200, { users: paginatedUsers });
      }

      if (pathname === "/health") {
         return sendJson(res, 200, {
            status: "ok",
            uptime: Math.round(process.uptime()),
         });
      }
   }

   if (method === "POST" && url === "/users") {
      // Create a new user
      const body = await json(req);
      console.log(body);

      if (!body || !body.name) {
         return sendJson(res, 400, { error: "Missing name" });
      }

      const user = { id: randomUUID(), name: body.name };

      users.push(user);

      // Created user
      return sendJson(res, 201, { message: "Usuario creado" });
   }

   return sendJson(res, 404, { error: "Not found" });
});

server.listen(port, () => {
   const address = server.address();
   console.log(
      `Servidor escuchando en http://${address.address}:${address.port}`,
   );
});
