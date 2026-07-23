export type MaterialCategory =
  | "Languages"
  | "Web"
  | "Backend"
  | "Data"
  | "Computer Science"
  | "DevOps & Cloud"
  | "AI"
  | "Career";

export type TechnologyMaterial = {
  category: MaterialCategory;
  purpose: string;
  fundamentals: string[];
  core: string[];
  intermediate: string[];
  advanced: string[];
  production: string[];
  interview: string[];
  coding: string[];
  projects: string[];
  revision: string[];
  code: string;
};

const material = (
  category: MaterialCategory,
  purpose: string,
  fundamentals: string[],
  core: string[],
  intermediate: string[],
  advanced: string[],
  production: string[],
  interview: string[],
  coding: string[],
  projects: string[],
  revision: string[],
  code: string,
): TechnologyMaterial => ({
  category,
  purpose,
  fundamentals,
  core,
  intermediate,
  advanced,
  production,
  interview,
  coding,
  projects,
  revision,
  code,
});

export const technologyMaterials: Record<string, TechnologyMaterial> = {
  Java: material(
    "Languages",
    "Build strongly typed applications on the JVM, from interview programs to reliable backend services.",
    ["JDK, JRE, JVM and bytecode", "Variables, primitive types and operators", "Control flow, methods and arrays", "Strings, input and packages"],
    ["Classes, objects and constructors", "Encapsulation, inheritance and polymorphism", "Interfaces and abstract classes", "Exceptions, generics and collections"],
    ["List, Set, Map, Queue and comparators", "Streams, lambdas and Optional", "Files, serialization and date-time API", "JDBC, annotations and reflection basics"],
    ["Threads, executors and synchronization", "JVM memory model and garbage collection", "Class loading, records and sealed classes", "Performance profiling and design patterns"],
    ["Spring-style layered architecture", "Validation, logging and exception boundaries", "Unit/integration testing and build tools", "Thread safety, observability and JVM tuning"],
    ["String immutability and object contracts", "HashMap internals and collision handling", "Overloading vs overriding", "GC roots, concurrency and SOLID tradeoffs"],
    ["Implement an immutable Student value object", "Build an LRU cache", "Group and rank assessment results", "Create a thread-safe task processor"],
    ["Console placement tracker", "Library management system", "Assessment REST service", "Concurrent notification processor"],
    ["JVM execution path", "equals and hashCode contract", "Collection complexity table", "Checked vs unchecked exceptions"],
    `record Student(String name, int score) {
  Student {
    if (name == null || name.isBlank()) throw new IllegalArgumentException("name");
  }
  boolean isEligible() { return score >= 70; }
}`,
  ),
  Python: material(
    "Languages",
    "Write expressive programs, automate work, build APIs and prepare for data and backend interviews.",
    ["Interpreter, virtual environments and pip", "Names, numbers, strings and booleans", "Lists, tuples, sets and dictionaries", "Conditions, loops and functions"],
    ["Modules, packages and imports", "Classes, dataclasses and inheritance", "Exceptions and context managers", "Iterators, generators and comprehensions"],
    ["Decorators and closures", "Type hints and protocols", "Files, JSON and regular expressions", "Testing with pytest and mocking"],
    ["Asyncio and concurrent execution", "Descriptors, metaclasses and data model", "Memory management and the GIL", "Profiling and performance optimization"],
    ["Dependency isolation and configuration", "Structured logging and error handling", "API validation and database sessions", "Packaging, linting, testing and deployment"],
    ["Mutable default arguments", "Iterator vs generator", "Shallow vs deep copy", "GIL, decorators and method resolution order"],
    ["Flatten nested data safely", "Create a retry decorator", "Process a large file lazily", "Build an async API client"],
    ["CLI expense tracker", "Django placement portal", "FastAPI assessment API", "Data processing pipeline"],
    ["Object identity vs equality", "Scope and LEGB", "Comprehension patterns", "Exception and context-manager flow"],
    `from dataclasses import dataclass

@dataclass(frozen=True)
class Student:
    name: str
    score: int

    def is_eligible(self) -> bool:
        return self.score >= 70`,
  ),
  JavaScript: material(
    "Languages",
    "Master the browser and Node.js language used across modern frontend and full-stack products.",
    ["Values, coercion and operators", "Functions, scope and closures", "Arrays, objects and destructuring", "DOM events and modules"],
    ["Prototype chain and classes", "Promises and async/await", "Map, Set and array transformations", "Errors, modules and fetch"],
    ["Event loop, tasks and microtasks", "Higher-order functions and composition", "Iterators, generators and proxies", "Browser storage and web APIs"],
    ["Rendering and runtime performance", "Memory leaks and garbage collection", "Workers, streams and cancellation", "Security boundaries and module design"],
    ["Error states and request cancellation", "Testing and static analysis", "Bundle budgets and observability", "XSS, CSRF and dependency hygiene"],
    ["Closure and hoisting", "this binding and prototypes", "Promise scheduling", "Debounce, throttle and deep clone tradeoffs"],
    ["Implement debounce", "Write Promise.all behavior", "Group records by key", "Build a cancellable search client"],
    ["Accessible quiz app", "Kanban board", "Realtime interview room", "Offline-first study planner"],
    ["Coercion rules", "Scope chain", "Event-loop order", "Array method complexity"],
    `const rankStudents = (students) =>
  [...students]
    .filter(({ score }) => score >= 70)
    .sort((a, b) => b.score - a.score);`,
  ),
  TypeScript: material(
    "Languages",
    "Add precise, maintainable static contracts to JavaScript applications and APIs.",
    ["Compiler, inference and annotations", "Primitive, array and object types", "Union, literal and intersection types", "Functions, optional fields and narrowing"],
    ["Interfaces vs type aliases", "Generics and constraints", "Utility and mapped types", "Discriminated unions and exhaustive checks"],
    ["Conditional and indexed-access types", "keyof, typeof and template literals", "Declaration files and module typing", "Runtime validation boundaries"],
    ["Variance and generic API design", "Branded types and type predicates", "Advanced inference patterns", "Library authoring and project references"],
    ["Strict compiler configuration", "Schema validation for external data", "Shared client-server contracts", "Safe migrations and type-level tests"],
    ["any vs unknown vs never", "Structural typing", "Generic constraints", "Compile-time vs runtime safety"],
    ["Create a typed event emitter", "Model an async request state", "Write a generic groupBy", "Type a role-based permission map"],
    ["Typed form library", "API client SDK", "Assessment state machine", "Reusable component system"],
    ["Narrow before use", "Prefer unions for states", "Keep external data unknown", "Use generics to preserve relationships"],
    `type Result<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function unwrap<T>(result: Result<T>): T {
  if (result.status === "error") throw new Error(result.message);
  return result.data;
}`,
  ),
  HTML: material(
    "Web",
    "Create semantic, accessible document structure that works across devices and assistive technology.",
    ["Document anatomy and metadata", "Text, links, images and lists", "Tables and embedded media", "Forms, labels and native controls"],
    ["Semantic landmarks", "Accessible names and focus order", "Responsive images", "Validation attributes and autocomplete"],
    ["Dialog, details and interactive semantics", "Structured data and SEO", "Media loading and performance", "Internationalization and language"],
    ["ARIA only when native HTML is insufficient", "Complex form accessibility", "Content security boundaries", "Progressive enhancement"],
    ["Valid document outline", "Keyboard and screen-reader testing", "Performance metadata", "CSP-friendly markup"],
    ["Semantic vs generic elements", "Label association", "Button vs link", "ARIA roles and accessible names"],
    ["Build an accessible registration form", "Create a results table", "Mark up a course article", "Audit keyboard navigation"],
    ["Portfolio", "Assessment form", "Study reader", "Accessible admin table"],
    ["Use native elements first", "Every control needs a name", "Headings describe structure", "Images need purposeful alternatives"],
    `<form>
  <label for="email">College email</label>
  <input id="email" name="email" type="email" autocomplete="email" required />
  <button type="submit">Continue</button>
</form>`,
  ),
  CSS: material(
    "Web",
    "Control layout, visual hierarchy, responsiveness and interaction without fragile styling.",
    ["Cascade, inheritance and specificity", "Box model, units and sizing", "Selectors, colors and typography", "Display, position and overflow"],
    ["Flexbox and Grid", "Responsive media/container queries", "Pseudo classes and states", "Custom properties and design tokens"],
    ["Stacking contexts and containing blocks", "Logical properties and fluid layout", "Transitions and keyframe animation", "Architecture and component scoping"],
    ["Rendering performance", "Subgrid and advanced selectors", "Accessible motion and contrast", "Cross-browser debugging"],
    ["Token-driven design systems", "Visual regression testing", "Critical CSS and loading strategy", "Stable responsive constraints"],
    ["Specificity conflicts", "Flex vs Grid", "Stacking context bugs", "Intrinsic sizing and overflow"],
    ["Build a responsive dashboard shell", "Recreate a pricing table", "Fix an overflow bug", "Create accessible focus states"],
    ["Responsive portfolio", "Dashboard design system", "Email template", "Component theme library"],
    ["Prefer layout primitives", "Use min-width: 0 in grids", "Avoid fixed content heights", "Test zoom and long text"],
    `.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 18rem;
  gap: 1rem;
}
@media (max-width: 48rem) { .layout { grid-template-columns: 1fr; } }`,
  ),
  React: material(
    "Web",
    "Build component-driven interfaces with predictable state, accessible interactions and efficient rendering.",
    ["JSX, components and props", "State and event handling", "Lists, keys and conditional UI", "Forms and lifting state"],
    ["Effects and synchronization", "Context and reducers", "Routing and data fetching", "Reusable hooks and composition"],
    ["Render lifecycle and closures", "Memoization and transitions", "Error boundaries and suspense", "Testing user behavior"],
    ["Server rendering concepts", "State architecture and caching", "Performance profiling", "Design-system patterns"],
    ["Loading, empty and error states", "Accessible component contracts", "Request cancellation and cache invalidation", "Monitoring and bundle analysis"],
    ["State vs props", "Effect dependencies", "Reconciliation and keys", "Controlled inputs and stale closures"],
    ["Create a searchable table", "Build an assessment wizard", "Implement optimistic updates", "Test an async form"],
    ["Study planner", "Placement dashboard", "Collaborative mock interview", "Analytics workspace"],
    ["Render should stay pure", "Effects synchronize external systems", "State belongs at the lowest shared owner", "Stable keys identify data"],
    `function Score({ value }: { value: number }) {
  const status = value >= 70 ? "Eligible" : "Keep preparing";
  return <output aria-label="Assessment result">{value}% · {status}</output>;
}`,
  ),
  "Node.js": material(
    "Backend",
    "Run JavaScript on the server and build event-driven APIs, workers and real-time systems.",
    ["Runtime, modules and npm", "Process, environment and file system", "HTTP server and request lifecycle", "Buffers, events and streams"],
    ["Async I/O and event loop", "Express-style middleware", "Validation and error handling", "Database access and configuration"],
    ["Authentication and authorization", "Streams and backpressure", "Worker threads and child processes", "Testing and dependency injection"],
    ["Clustering and horizontal scaling", "Event-loop diagnostics", "Queues and realtime communication", "Memory and CPU profiling"],
    ["Graceful shutdown", "Structured logs, metrics and traces", "Rate limiting and security headers", "Container health and deployment"],
    ["Event loop phases", "Blocking vs non-blocking work", "Streams and buffers", "Middleware execution order"],
    ["Build an HTTP router", "Stream a large CSV", "Create a job worker", "Implement a rate limiter"],
    ["Assessment API", "Realtime interview room", "Notification worker", "URL shortener"],
    ["Do not block the event loop", "Handle rejected promises", "Validate at boundaries", "Close resources on shutdown"],
    `import { createServer } from "node:http";

createServer((request, response) => {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify({ path: request.url }));
}).listen(3000);`,
  ),
  "Express.js": material(
    "Backend",
    "Design maintainable Node.js HTTP APIs using routing, middleware and clear service boundaries.",
    ["Application and router setup", "Request, response and status codes", "Route parameters and query strings", "Middleware flow"],
    ["Controllers and services", "Validation and centralized errors", "Authentication middleware", "Database repositories"],
    ["Uploads, pagination and filtering", "Testing routes and services", "OpenAPI documentation", "Security and rate limits"],
    ["Async context and tracing", "Idempotency and caching", "Versioning and backward compatibility", "Scaling stateless services"],
    ["Health/readiness endpoints", "Graceful shutdown", "Logs, metrics and correlation IDs", "Secure headers and request limits"],
    ["Middleware order", "Error middleware signature", "REST status choices", "Controller-service-repository separation"],
    ["Create CRUD routes", "Add validated pagination", "Build role authorization", "Test error responses"],
    ["Student API", "Assessment service", "File submission API", "Organization admin backend"],
    ["Thin controllers", "Validate every external input", "One error shape", "Never expose internal exceptions"],
    `router.post("/assessments", validate(createSchema), async (req, res, next) => {
  try {
    const assessment = await service.create(req.body, req.user.id);
    res.status(201).json(assessment);
  } catch (error) { next(error); }
});`,
  ),
  SQL: material(
    "Data",
    "Model relational data and write correct, performant queries for application and analytics work.",
    ["Tables, rows and data types", "SELECT, WHERE and ORDER BY", "INSERT, UPDATE and DELETE", "Keys and constraints"],
    ["Joins and set operations", "Grouping and aggregate functions", "Subqueries and common table expressions", "Normalization and relationships"],
    ["Window functions", "Transactions and isolation", "Indexes and query plans", "Views, procedures and triggers"],
    ["Locking and concurrency", "Partitioning and replication concepts", "Execution-plan optimization", "Data warehousing patterns"],
    ["Migrations and rollback plans", "Least-privilege access", "Backups and recovery", "Slow-query monitoring"],
    ["JOIN types", "Index tradeoffs", "ACID and isolation anomalies", "Nth-highest and ranking queries"],
    ["Rank students by section", "Find duplicate emails", "Calculate placement rate", "Optimize a slow report query"],
    ["Placement database", "Assessment analytics", "Inventory schema", "Interview question warehouse"],
    ["Filter before grouping", "Know row cardinality", "Index access paths, not every column", "Transactions protect invariants"],
    `SELECT section_id, COUNT(*) AS students,
       AVG(CASE WHEN placed THEN 1.0 ELSE 0 END) AS placement_rate
FROM students
GROUP BY section_id
ORDER BY placement_rate DESC;`,
  ),
  MongoDB: material(
    "Data",
    "Model flexible documents and operate MongoDB safely for application workloads.",
    ["Documents, collections and BSON", "CRUD and query operators", "Projection, sorting and pagination", "Embedded vs referenced data"],
    ["Indexes and compound index order", "Aggregation pipeline", "Schema validation", "Atomic updates"],
    ["Transactions and sessions", "Change streams", "Replication and sharding concepts", "Query explain plans"],
    ["Shard-key selection", "Aggregation optimization", "Consistency tradeoffs", "Large-scale schema evolution"],
    ["Backups and monitoring", "Connection pooling", "Role-based access", "Safe migrations and index rollout"],
    ["Embedding vs referencing", "Compound index prefix", "Aggregation stages", "Replication vs sharding"],
    ["Model assessment attempts", "Write a score aggregation", "Add cursor pagination", "Diagnose a collection scan"],
    ["Content catalog", "Activity feed", "Interview session store", "Analytics event service"],
    ["Model for access patterns", "Bound document growth", "Project only needed fields", "Verify queries with explain"],
    `db.attempts.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$studentId", average: { $avg: "$score" } } },
  { $sort: { average: -1 } }
]);`,
  ),
  Redis: material(
    "Data",
    "Use in-memory data structures for caching, coordination, queues and low-latency features.",
    ["Keys, values and expiration", "Strings, hashes, lists and sets", "Sorted sets and streams", "Persistence basics"],
    ["Cache-aside pattern", "Atomic commands and transactions", "Pub/sub and streams", "Pipelining and Lua scripts"],
    ["Distributed locks", "Rate limiting", "Leaderboards and delayed jobs", "Eviction policies"],
    ["Cluster and sentinel", "Hot-key mitigation", "Consistency and failover", "Memory optimization"],
    ["TTL and invalidation strategy", "Metrics and slow log", "Persistence and recovery choice", "ACLs and network isolation"],
    ["Cache invalidation", "RDB vs AOF", "Pub/sub vs streams", "Distributed lock safety"],
    ["Build a sliding-window limiter", "Create a leaderboard", "Implement cache-aside", "Process a consumer group"],
    ["Session store", "Coding leaderboard", "Notification queue", "API response cache"],
    ["Every cache needs an expiry policy", "Redis is not automatically durable", "Avoid unbounded keys", "Measure hit rate"],
    `MULTI
ZADD placement:leaderboard 91 student:42
ZADD placement:leaderboard 88 student:17
ZREVRANGE placement:leaderboard 0 9 WITHSCORES
EXEC`,
  ),
};

const compactMaterials: Record<string, TechnologyMaterial> = {};

function addCompact(
  names: string[],
  category: MaterialCategory,
  purpose: string,
  fundamentals: string[],
  core: string[],
  advanced: string[],
  production: string[],
  interview: string[],
) {
  names.forEach((name) => {
    compactMaterials[name] = material(
      category,
      purpose,
      fundamentals,
      core,
      core.map((topic) => `${topic}: applied patterns`),
      advanced,
      production,
      interview,
      [`Implement a focused ${name} exercise`, `Debug a broken ${name} scenario`, `Explain a ${name} tradeoff with evidence`, `Integrate ${name} into a placement feature`],
      [`${name} fundamentals lab`, `${name} placement feature`, `${name} production case study`],
      [...fundamentals.slice(0, 2), ...interview.slice(0, 2)],
      `// ${name} study lab
// 1. Build the smallest working example.
// 2. Add validation and failure handling.
// 3. Test the important boundary cases.
// 4. Explain the production tradeoffs.`,
    );
  });
}

addCompact(["Git & GitHub"], "DevOps & Cloud", "Track code history and collaborate through reviewable changes.", ["Repository, working tree and staging", "Commits, branches and remotes", "Merge and rebase", "Pull requests and reviews"], ["Reset, revert and reflog", "Conflict resolution", "Tags and release flow", "Hooks and ignore rules"], ["Interactive rebase", "Bisect and worktrees", "Signing and protected branches"], ["Trunk-based workflow", "CI checks", "Branch protection", "Secret and history hygiene"], ["Merge vs rebase", "Reset vs revert", "Conflict strategy", "Release workflows"]);
addCompact(["Docker"], "DevOps & Cloud", "Package applications and dependencies into reproducible containers.", ["Images, containers and registries", "Dockerfile layers", "Volumes and networks", "Compose basics"], ["Multi-stage builds", "Environment and secrets", "Health checks", "Container debugging"], ["Build cache", "Rootless containers", "Resource limits", "Supply-chain security"], ["Small pinned images", "Non-root execution", "Observability", "Orchestration readiness"], ["Image vs container", "COPY vs ADD", "CMD vs ENTRYPOINT", "Volume and network behavior"]);
addCompact(["Linux"], "DevOps & Cloud", "Operate development and production systems from the command line.", ["Filesystem and paths", "Users, groups and permissions", "Processes and signals", "Shell, pipes and redirection"], ["Services and logs", "Networking tools", "Packages and environment", "Disk and memory inspection"], ["Namespaces and cgroups", "Performance diagnosis", "Security hardening", "Automation scripts"], ["Least privilege", "Service supervision", "Log rotation", "Capacity monitoring"], ["Permissions", "Process lifecycle", "Symlinks", "CPU, memory and disk debugging"]);
addCompact(["REST APIs"], "Backend", "Design predictable HTTP interfaces between clients and services.", ["Resources, URLs and HTTP methods", "Status codes and headers", "JSON requests and responses", "Idempotency basics"], ["Validation and error contracts", "Pagination, filter and sort", "Authentication and authorization", "Versioning and documentation"], ["Conditional requests", "Caching and rate limits", "Long-running operations", "API evolution"], ["OpenAPI contract", "Observability", "Security controls", "Backward compatibility"], ["PUT vs PATCH", "Idempotency", "Status-code choices", "Pagination strategies"]);
addCompact(["GraphQL"], "Backend", "Expose typed, client-shaped API queries through a single graph schema.", ["Schema, object and scalar types", "Queries, mutations and variables", "Resolvers and context", "Fragments and aliases"], ["Input validation", "Pagination", "Errors and authorization", "Subscriptions"], ["N+1 and DataLoader", "Persisted queries", "Schema federation", "Complexity limits"], ["Tracing", "Depth and cost limits", "Schema governance", "Caching strategy"], ["GraphQL vs REST", "Resolver flow", "N+1 problem", "Schema evolution"]);
addCompact(["Authentication"], "Backend", "Verify identity and enforce permissions without leaking trust across boundaries.", ["Identity, authentication and authorization", "Password hashing", "Sessions and cookies", "Tokens and JWT anatomy"], ["OAuth 2.0 and OpenID Connect", "Role and attribute permissions", "MFA and recovery", "CSRF, XSS and token storage"], ["Key rotation", "Revocation", "Service identity", "Threat modeling"], ["Secure cookies", "Rate limits", "Audit events", "Least privilege"], ["Session vs JWT", "Authentication vs authorization", "OAuth roles", "Common web attacks"]);
addCompact(["OOP"], "Computer Science", "Model behavior and state through cohesive abstractions and clear contracts.", ["Objects, classes and messages", "Encapsulation", "Inheritance", "Polymorphism"], ["Composition", "Interfaces and abstractions", "Object relationships", "SOLID principles"], ["Domain modeling", "Immutability", "Dependency inversion", "Refactoring patterns"], ["Testable boundaries", "Avoiding deep inheritance", "Invariant protection", "API stability"], ["Composition vs inheritance", "Overloading vs overriding", "Abstraction vs encapsulation", "SOLID tradeoffs"]);
addCompact(["Design Patterns"], "Computer Science", "Recognize reusable design structures while avoiding unnecessary abstraction.", ["Pattern intent and tradeoffs", "Creational patterns", "Structural patterns", "Behavioral patterns"], ["Factory, Builder and Strategy", "Adapter, Decorator and Facade", "Observer and Command", "Repository and dependency injection"], ["State machines", "Hexagonal architecture", "Event-driven patterns", "Anti-pattern recognition"], ["Use patterns only for real change pressure", "Test contracts", "Document tradeoffs", "Keep ownership clear"], ["Strategy vs State", "Decorator vs Proxy", "Factory choices", "When patterns become overengineering"]);
addCompact(["Data Structures"], "Computer Science", "Choose representations that make required operations correct and efficient.", ["Complexity and memory", "Arrays and strings", "Linked lists", "Stacks and queues"], ["Hash tables", "Trees and heaps", "Graphs", "Tries and disjoint sets"], ["Augmented trees", "Probabilistic structures", "Cache-aware layout", "Persistent structures"], ["Input constraints", "Memory limits", "Concurrency concerns", "Benchmarking"], ["Operation complexity", "Collision handling", "Tree traversals", "Graph representations"]);
addCompact(["Algorithms"], "Computer Science", "Solve problems systematically using patterns, invariants and complexity analysis.", ["Complexity analysis", "Sorting and searching", "Two pointers and sliding window", "Recursion and backtracking"], ["Greedy algorithms", "Dynamic programming", "Graph traversal", "Shortest paths"], ["Advanced DP", "String algorithms", "Network flow", "Computational complexity"], ["Correctness proofs", "Constraint-driven choice", "Numerical safety", "Testing adversarial cases"], ["Pattern recognition", "Time-space tradeoffs", "BFS vs DFS", "DP state design"]);
addCompact(["Operating Systems"], "Computer Science", "Understand how programs share CPU, memory, storage and devices.", ["Kernel and system calls", "Processes and threads", "CPU scheduling", "Virtual memory"], ["Synchronization and deadlocks", "Filesystems", "I/O and interrupts", "Page replacement"], ["Memory mapping", "Containers and namespaces", "Distributed filesystems", "Performance tracing"], ["Resource limits", "Signal handling", "Capacity diagnosis", "Security boundaries"], ["Process vs thread", "Deadlock conditions", "Paging", "Context switching"]);
addCompact(["Computer Networks"], "Computer Science", "Understand how data moves reliably and securely between machines.", ["OSI and TCP/IP models", "Ethernet, IP and routing", "TCP and UDP", "DNS and HTTP"], ["TLS", "NAT and firewalls", "Load balancing", "Sockets and connection lifecycle"], ["Congestion control", "HTTP/2 and HTTP/3", "CDNs", "Network observability"], ["Timeouts and retries", "TLS management", "DDoS controls", "Latency budgets"], ["TCP handshake", "DNS resolution", "HTTP lifecycle", "TCP vs UDP"]);
addCompact(["DBMS"], "Data", "Understand database architecture, relational theory, transactions and query execution.", ["Data models and schemas", "Relational algebra", "Keys and normalization", "Storage and pages"], ["Transactions and ACID", "Concurrency control", "Indexes", "Query processing"], ["Recovery logs", "Distributed databases", "Replication", "Partitioning"], ["Backup and restore", "Migration safety", "Capacity planning", "Monitoring"], ["Normalization", "Isolation levels", "B+ trees", "Locks and deadlocks"]);
addCompact(["System Design"], "Computer Science", "Design scalable systems by reasoning about requirements, data, traffic and failure.", ["Functional and quality requirements", "Capacity estimation", "API and data model", "Single-service baseline"], ["Load balancing and caching", "Replication and partitioning", "Queues and async work", "Consistency and availability"], ["Multi-region design", "Search and feeds", "Rate limiting", "Observability and resilience"], ["SLOs and failure drills", "Backpressure", "Cost control", "Security and privacy"], ["Scale a URL shortener", "Cache tradeoffs", "SQL vs NoSQL", "Consistency choices"]);
addCompact(["Distributed Systems"], "Computer Science", "Reason about concurrency, partial failure and consistency across networked nodes.", ["Time, order and partial failure", "Replication", "Partitioning", "Consistency models"], ["Consensus", "Leader election", "Distributed transactions", "Idempotency"], ["Logical clocks", "CRDTs", "Gossip", "Multi-region architecture"], ["Failure detection", "Retries and deduplication", "Chaos testing", "SLO-based operation"], ["CAP nuance", "Consensus purpose", "Exactly-once myths", "Split-brain handling"]);
addCompact(["Kafka"], "Backend", "Build durable event streams for decoupled, high-throughput systems.", ["Topics, partitions and records", "Producers and consumers", "Offsets and consumer groups", "Broker persistence"], ["Ordering and delivery semantics", "Retention and compaction", "Rebalancing", "Schema evolution"], ["Transactions", "Kafka Streams", "Cross-cluster replication", "Capacity planning"], ["Partition strategy", "Lag monitoring", "Dead-letter handling", "Schema governance"], ["Partition ordering", "Consumer groups", "At-least-once behavior", "Retention vs compaction"]);
addCompact(["RabbitMQ"], "Backend", "Route messages through queues for reliable asynchronous workflows.", ["Producer, exchange, queue and consumer", "Direct, topic and fanout routing", "Acknowledgements", "Durability and persistence"], ["Retries and dead letters", "Prefetch and fairness", "Publisher confirms", "RPC tradeoffs"], ["Quorum queues", "Clustering", "Flow control", "Federation"], ["Queue depth alerts", "Poison-message handling", "Idempotent consumers", "Connection recovery"], ["Exchange types", "Ack behavior", "RabbitMQ vs Kafka", "Delivery guarantees"]);
addCompact(["Kubernetes"], "DevOps & Cloud", "Deploy and operate containerized workloads declaratively across a cluster.", ["Cluster, node and control plane", "Pod, deployment and service", "ConfigMap and Secret", "Labels and selectors"], ["Probes and resources", "Ingress and networking", "Volumes", "Rolling updates"], ["Autoscaling", "RBAC", "StatefulSet and DaemonSet", "Operators"], ["Policy and security", "Observability", "Disruption budgets", "Backup and recovery"], ["Pod vs deployment", "Service types", "Probe differences", "Scheduling and resource requests"]);
addCompact(["AWS"], "DevOps & Cloud", "Compose cloud compute, storage, networking and managed services securely.", ["Regions, availability zones and IAM", "EC2 and autoscaling", "S3", "VPC basics"], ["RDS and DynamoDB", "Lambda and API Gateway", "Load balancers", "CloudWatch"], ["Event-driven architecture", "Multi-account governance", "High availability", "Cost optimization"], ["Infrastructure as code", "Least privilege", "Backup strategy", "SLO monitoring"], ["EC2 vs Lambda", "S3 consistency", "Security groups vs NACL", "RDS scaling"]);
addCompact(["AI Engineering", "Prompt Engineering", "LLM"], "AI", "Build useful language-model features with clear prompts, evaluation and production controls.", ["Tokens, context and generation", "Instructions and examples", "Model inputs and outputs", "Basic evaluation"], ["Structured output", "Tool calling", "Retrieval grounding", "Prompt and model versioning"], ["Evaluation datasets", "Guardrails", "Latency and cost optimization", "Fallback design"], ["Quality monitoring", "Safety reviews", "Caching and routing", "Human escalation"], ["Temperature and determinism", "Prompt injection", "Evaluation design", "Hallucination control"]);
addCompact(["RAG", "Vector Databases"], "AI", "Ground model answers in retrieved domain knowledge using embeddings and search.", ["Embeddings and similarity", "Chunking", "Indexing", "Retrieve then generate"], ["Metadata filters", "Hybrid search", "Reranking", "Citation construction"], ["Query rewriting", "Multi-step retrieval", "Evaluation", "Index freshness"], ["Access control", "Traceability", "Latency budgets", "Failure and fallback"], ["Chunk-size tradeoffs", "Recall vs precision", "RAG vs fine-tuning", "Retrieval evaluation"]);
addCompact(["LangChain", "LangGraph", "MCP", "AI Agents"], "AI", "Orchestrate model calls, tools and state into inspectable AI workflows.", ["Messages, models and tools", "Prompt and output contracts", "State and context", "Workflow execution"], ["Tool routing", "Graph state", "Memory boundaries", "Human approval"], ["Retries and checkpoints", "Multi-agent coordination", "Protocol-based tools", "Evaluation traces"], ["Permission controls", "Loop limits", "Audit logs", "Cost and latency budgets"], ["Workflow vs agent", "State management", "Tool safety", "Failure recovery"]);
addCompact(["HR Interview"], "Career", "Communicate evidence, motivation and judgment clearly in behavioral interviews.", ["Tell me about yourself", "STAR story structure", "Strengths and growth areas", "Company and role research"], ["Conflict and teamwork stories", "Leadership and ownership", "Failure and learning", "Salary and joining questions"], ["Follow-up probing", "Executive communication", "Offer comparison", "Negotiation"], ["Truthful evidence", "Concise delivery", "Question bank", "Post-interview reflection"], ["Resume walkthrough", "Why this company", "Failure story", "Questions for interviewer"]);
addCompact(["Resume Preparation"], "Career", "Present relevant skills and measurable evidence in a recruiter-readable document.", ["Target role and keyword analysis", "One-page structure", "Contact and education", "Skills grouping"], ["Impact-focused experience bullets", "Project evidence", "Metrics and action verbs", "ATS readability"], ["Role-specific versions", "Portfolio links", "Gap explanation", "Proofreading workflow"], ["Consistent claims", "Accessible PDF", "Version control", "Application tracking"], ["Project explanation", "Metric defense", "Skill evidence", "Resume red flags"]);
addCompact(["Mock Interviews"], "Career", "Turn knowledge into clear answers under realistic time and follow-up pressure.", ["Interview formats", "Preparation checklist", "Think-aloud method", "Clarifying questions"], ["Coding round", "Technical discussion", "System design", "Behavioral round"], ["Pressure handling", "Follow-up depth", "Feedback analysis", "Targeted retry"], ["Recorded sessions", "Rubric scoring", "Weak-topic plan", "Readiness review"], ["Opening explanation", "Tradeoff discussion", "Complexity analysis", "Closing questions"]);

Object.assign(technologyMaterials, compactMaterials);

export const materialCategories: MaterialCategory[] = [
  "Languages",
  "Web",
  "Backend",
  "Data",
  "Computer Science",
  "DevOps & Cloud",
  "AI",
  "Career",
];

export const technologies = Object.keys(technologyMaterials);
