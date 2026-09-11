import { defineApp } from "convex/server";
import migrations from "@convex-dev/migrations/convex.config.js";
import rag from "@convex-dev/rag/convex.config.js";

const app = defineApp();
app.use(rag);
app.use(migrations);

export default app;
