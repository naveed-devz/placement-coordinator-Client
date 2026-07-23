import { technologyMaterials, type MaterialCategory } from "./study-materials-data";

export type TopicLesson = {
  definition: string;
  problem: string;
  whenToUse: string[];
  whenNotToUse: string[];
  internalWorking: string[];
  tradeoffs: string[];
  mistakes: string[];
  practicalExample: string;
  interviewAnswer: string;
  followUps: string[];
  checkpoints: string[];
  diagram: string;
};

type KnowledgeRule = {
  match: RegExp;
  definition: string;
  problem: string;
  use: string[];
  avoid: string[];
  internals: string[];
  tradeoffs: string[];
  mistakes: string[];
  example: string;
  answer: string;
};

const rules: KnowledgeRule[] = [
  {
    match: /JDK|JRE|JVM|bytecode|Core Java/i,
    definition: "The JDK is the development toolkit, the JRE supplies runtime libraries, and the JVM loads and executes Java bytecode. Bytecode is the portable instruction format produced by javac.",
    problem: "This separation lets Java source be compiled once and executed on different operating systems while the JVM handles memory, verification and runtime optimization.",
    use: ["Build portable, strongly typed backend and enterprise applications", "Use mature JVM libraries, profiling tools and concurrency support", "Run long-lived services where runtime optimization is valuable"],
    avoid: ["Tiny utilities where startup time and distribution size dominate", "Hard real-time systems that require deterministic pause behavior", "Choosing Java only because it is familiar when a platform-specific tool is a better fit"],
    internals: ["javac parses and type-checks source before producing .class bytecode", "The class loader loads classes and the verifier rejects unsafe bytecode", "The interpreter starts execution and the JIT compiles frequently executed code to native instructions", "Stack frames hold method-local state while objects normally live on the heap and are reclaimed by GC"],
    tradeoffs: ["Portability and mature tooling versus runtime and memory overhead", "Automatic memory management versus less deterministic reclamation", "Strong static contracts versus more ceremony than dynamic languages"],
    mistakes: ["Saying Java is platform independent without mentioning JVM-specific implementations", "Confusing JDK, JRE and JVM", "Assuming garbage collection prevents every memory leak"],
    example: "Compile Student.java with javac, inspect Student.class as bytecode, then run it through a JVM whose JIT may optimize frequently called eligibility methods.",
    answer: "Java compiles source into platform-neutral bytecode. A platform-specific JVM loads, verifies and executes that bytecode, initially through interpretation and later through JIT-compiled native code. The JVM also manages stack frames, heap allocation and garbage collection.",
  },
  {
    match: /variables|primitive types|types, control flow|numbers, strings|Values, coercion/i,
    definition: "A type describes the values an expression may hold and the operations permitted on them. A variable or binding gives a value a name within a scope.",
    problem: "Types and bindings make state explicit, prevent invalid operations and let readers or tools reason about how data changes.",
    use: ["Represent domain facts with the narrowest useful type", "Use immutable bindings for values that should not change", "Validate data when it crosses from an untrusted external source"],
    avoid: ["Using a broad string or any type for every domain value", "Introducing mutable shared state when a value can be passed explicitly", "Relying on implicit coercion where correctness matters"],
    internals: ["A declaration creates a binding in a scope", "Primitive values are represented directly while object variables usually hold references", "The runtime resolves the binding, evaluates the expression and applies conversion rules", "Static languages reject incompatible operations before execution; dynamic languages check during execution"],
    tradeoffs: ["Narrow types improve safety but require deliberate modeling", "Mutation can simplify local algorithms but complicates shared reasoning", "Implicit conversion is concise but can hide defects"],
    mistakes: ["Comparing values using identity when content equality is required", "Ignoring numeric overflow or floating-point precision", "Confusing an uninitialized value with an intentionally empty value"],
    example: "Model an assessment score as a bounded number rather than a free-form string, reject values outside 0-100, and derive eligibility instead of storing a second mutable flag.",
    answer: "A type defines a set of valid values and operations; a variable is a scoped binding to a value. I prefer narrow domain types, immutable bindings by default and explicit validation at system boundaries because that prevents invalid state from spreading.",
  },
  {
    match: /Classes|objects|OOP|Object-oriented|encapsulation|inheritance|polymorphism/i,
    definition: "Object-oriented programming groups state with the behavior that protects and transforms it. Encapsulation protects invariants, polymorphism lets callers depend on contracts, and inheritance is one possible reuse mechanism.",
    problem: "It helps model long-lived domain concepts whose state must remain valid while implementations evolve behind stable interfaces.",
    use: ["Model entities such as Student, Assessment and Submission with clear invariants", "Hide changeable implementation details behind an interface", "Use polymorphism when several implementations honor the same behavioral contract"],
    avoid: ["Creating classes that only hold unrelated utility functions", "Using inheritance only to reuse code", "Building deep hierarchies where composition expresses the relationship more clearly"],
    internals: ["An object has identity, state and behavior exposed through methods", "A class defines construction and method dispatch rules", "Dynamic dispatch selects an overriding implementation using the runtime object type", "Encapsulation keeps invalid updates behind methods that enforce invariants"],
    tradeoffs: ["Stable boundaries versus extra abstractions", "Inheritance offers substitution but tightly couples parent and child", "Mutable objects are convenient but increase coordination and testing cost"],
    mistakes: ["Calling fields private without actually protecting invariants", "Confusing overloading with overriding", "Using instanceof chains instead of polymorphic behavior"],
    example: "Assessment.submit(answer) can reject submissions after the deadline. The caller cannot directly mutate the internal status and bypass that rule.",
    answer: "OOP organizes state and behavior around objects. Its main value is protecting invariants through encapsulation and allowing callers to depend on stable contracts through polymorphism. I favor composition for reuse and use inheritance only when the child is behaviorally substitutable for the parent.",
  },
  {
    match: /List, Set, Map|Collections|HashMap|hash tables/i,
    definition: "Collections are data structures with different access and ordering guarantees. A List preserves sequence, a Set enforces uniqueness, and a Map associates unique keys with values.",
    problem: "Choosing the correct collection makes required operations clear and avoids accidental performance or correctness problems.",
    use: ["Use a List for ordered values and index-based traversal", "Use a Set for membership checks and uniqueness", "Use a Map for key-based lookup, grouping and counting"],
    avoid: ["Using a List for frequent membership checks over large data", "Using a hash collection when sorted iteration is required", "Using mutable keys whose equality or hash can change after insertion"],
    internals: ["A hash map computes a hash, maps it to a bucket and compares candidate keys for equality", "Collisions place multiple keys in the same bucket and are resolved by chained or tree-like structures", "Resizing allocates a larger table and redistributes entries", "Correct lookup requires equals and hashCode to obey the same equality contract"],
    tradeoffs: ["Hash collections offer average constant-time access but no natural sort order", "Tree collections provide ordering with logarithmic operations", "Array-backed lists give fast indexing while linked structures favor specific insertion patterns"],
    mistakes: ["Overriding equals without hashCode", "Assuming HashMap iteration is sorted", "Choosing LinkedList for general-purpose performance without measuring"],
    example: "Use Map<sectionId, List<Student>> to group students by section and a Set<String> to reject duplicate college email addresses.",
    answer: "I choose a collection from its required operations and guarantees. HashMap gives average O(1) lookup by hashing a key into a bucket and checking equality within collisions. Its key contract and resize behavior matter, while TreeMap is preferable when sorted keys are required.",
  },
  {
    match: /Streams|lambdas|Higher-order functions|array transformations/i,
    definition: "A stream or functional pipeline describes a sequence of transformations such as filter, map, group and reduce without manually controlling each iteration.",
    problem: "It separates what result is required from low-level iteration and supports composable data processing.",
    use: ["Transform collections through clear stateless steps", "Express filtering, grouping and aggregation", "Process values lazily when the runtime supports it"],
    avoid: ["Pipelines with hidden side effects", "Complex branching that is clearer as ordinary control flow", "Parallel execution without proving the work is large, independent and thread-safe"],
    internals: ["Intermediate operations build a pipeline and a terminal operation triggers evaluation", "Each element flows through compatible stages", "Lazy evaluation can fuse work and stop early", "Closures capture surrounding values, which should remain effectively immutable"],
    tradeoffs: ["Concise composition versus harder step-through debugging", "Lazy evaluation can reduce work but hides when execution starts", "Parallel streams add coordination overhead and ordering concerns"],
    mistakes: ["Mutating external state inside map or filter", "Reusing a consumed stream", "Creating a pipeline that is less readable than a loop"],
    example: "Filter eligible students, group them by section and calculate each section's average score as separate, named transformations.",
    answer: "A stream pipeline is a declarative sequence of intermediate transformations followed by a terminal operation. It is useful for stateless collection processing, often with lazy evaluation, but I avoid side effects and do not use parallel execution without measuring workload and thread safety.",
  },
  {
    match: /Exceptions|error handling|Errors/i,
    definition: "Error handling represents failure separately from successful results so callers can recover, translate or terminate deliberately.",
    problem: "Failures cross function and service boundaries. A consistent policy prevents silent corruption and gives users or operators actionable context.",
    use: ["Reject invalid state at the boundary where it is detected", "Catch an error only when you can recover, add context or translate it", "Preserve the original cause for debugging"],
    avoid: ["Catching every exception and continuing", "Using exceptions for expected everyday branching", "Returning internal stack traces or sensitive details to users"],
    internals: ["An error interrupts the normal call path and propagates through stack frames", "Handlers are searched from the current frame outward", "Cleanup must run through finally, defer or a context manager", "Application boundaries translate internal failures into stable API or UI error contracts"],
    tradeoffs: ["Exceptions keep happy paths clean but make control flow non-local", "Result types make failures explicit but require propagation code", "Detailed context aids debugging but must not leak secrets"],
    mistakes: ["Swallowing the error", "Logging and rethrowing at every layer", "Catching a type broader than the recovery policy requires"],
    example: "A submission service rejects a closed assessment with a domain error, while the HTTP boundary translates it to a stable 409 response and logs the correlation ID.",
    answer: "I detect errors close to their cause and handle them at the layer that can make a meaningful decision. Lower layers preserve context; boundaries translate failures into stable contracts. I avoid broad catches, swallowed errors and exposing implementation details.",
  },
  {
    match: /Threads|concurrency|Asyncio|concurrent|event loop|Async I\/O/i,
    definition: "Concurrency coordinates multiple tasks whose lifetimes overlap. Parallelism executes work simultaneously; asynchronous I/O lets a task yield while waiting for external work.",
    problem: "Applications must remain responsive while handling slow networks, files, user requests and CPU work without corrupting shared state.",
    use: ["Use async I/O for many independent network or disk waits", "Use bounded worker pools for controlled parallel work", "Protect shared mutable state with ownership, immutability or synchronization"],
    avoid: ["Adding threads to CPU work without measuring cores and overhead", "Blocking an event-loop thread", "Holding a lock while performing slow external I/O"],
    internals: ["A scheduler chooses which runnable task gets CPU time", "Async runtimes register I/O readiness and resume continuations later", "Threads have independent stacks but share process memory", "Synchronization establishes ordering and visibility for shared state"],
    tradeoffs: ["More throughput versus scheduling and coordination overhead", "Shared memory is fast but increases race risk", "Async code scales I/O waits but can make cancellation and error propagation harder"],
    mistakes: ["Confusing concurrency with parallelism", "Launching unbounded work", "Assuming a single statement is automatically thread-safe"],
    example: "Fetch independent question sets concurrently with a timeout, but limit concurrency so one user cannot exhaust database or network connections.",
    answer: "Concurrency is about overlapping tasks; parallelism is simultaneous execution. I use asynchronous I/O for waiting-heavy workloads, bounded executors for controlled work and explicit ownership or synchronization for shared state. I always design cancellation, timeout and backpressure behavior.",
  },
  {
    match: /Promise|async\/await|fetch|request lifecycle/i,
    definition: "A promise represents the eventual completion or failure of asynchronous work. async/await provides sequential syntax while preserving promise-based execution.",
    problem: "Network and timer operations finish later; promises provide one composable value for success, failure and chaining.",
    use: ["Coordinate API requests and other non-blocking operations", "Run independent operations concurrently with an explicit aggregate", "Propagate cancellation and timeout signals"],
    avoid: ["Awaiting independent operations one by one", "Creating a promise around an already promise-based API", "Ignoring rejection or component cleanup"],
    internals: ["Calling an async function immediately returns a promise", "Await suspends that function, not the JavaScript thread", "Promise reactions enter the microtask queue", "The event loop runs microtasks after the current stack before the next task"],
    tradeoffs: ["Readable sequential syntax versus hidden concurrency if awaits are misplaced", "Promise.all is fast-fail and concurrent but needs a partial-failure policy", "Cancellation is cooperative rather than automatic"],
    mistakes: ["Forgetting to return or await a promise", "Using array forEach with async callbacks", "Updating UI from a stale request"],
    example: "Load profile and roadmap concurrently with Promise.all, pass one AbortSignal to both, and show a recoverable error if either required request fails.",
    answer: "A promise is a stateful handle for a future result. async/await is syntax over promise chaining; await pauses only the async function. Reactions run as microtasks, so I handle rejection, cancellation and whether operations should be sequential or concurrent explicitly.",
  },
  {
    match: /TypeScript|inference|Union|Generics|Utility|mapped types|narrowing/i,
    definition: "TypeScript adds a structural static type system to JavaScript. It checks contracts during development and erases types when emitting JavaScript.",
    problem: "It catches incompatible states and preserves relationships across large JavaScript codebases before those errors reach users.",
    use: ["Model API, component and domain contracts", "Use unions for a finite set of valid states", "Use generics when inputs and outputs share a type relationship"],
    avoid: ["Assuming a TypeScript type validates network data at runtime", "Using any to silence uncertain data", "Encoding business logic in types when runtime code is clearer"],
    internals: ["The compiler builds types from declarations and inference", "Control-flow analysis narrows unions after checks", "Structural compatibility compares members rather than type names", "Types are erased, so external data still needs runtime validation"],
    tradeoffs: ["Earlier feedback and safer refactoring versus compiler and modeling cost", "Structural typing is flexible but may accept accidentally compatible values", "Advanced types can preserve APIs but reduce readability"],
    mistakes: ["Using a type assertion instead of proving a value", "Confusing optional with nullable", "Forgetting exhaustive handling of a discriminated union"],
    example: "Represent assessment loading as idle | loading | success | error, then switch on status so impossible combinations such as loading with stale error text cannot exist.",
    answer: "TypeScript is a compile-time structural type system for JavaScript. Its types are erased, so it improves local contracts and refactoring but does not validate runtime input. I use unknown at boundaries, runtime schemas for external data and discriminated unions for application states.",
  },
  {
    match: /HTML|Semantic|forms|accessibility|ARIA/i,
    definition: "Semantic HTML uses elements according to their meaning so browsers and assistive technology can provide correct structure and interaction behavior.",
    problem: "A visual interface alone does not communicate roles, names, relationships or keyboard behavior to every user and device.",
    use: ["Use headings and landmarks to describe document structure", "Use native buttons, links, inputs and labels for interaction", "Use ARIA only to fill a semantic gap that native HTML cannot cover"],
    avoid: ["Clickable div elements", "ARIA roles that conflict with native behavior", "Placeholder text as the only form label"],
    internals: ["The browser parses markup into the DOM", "Semantics contribute to the accessibility tree", "Native controls expose keyboard, focus and state behavior", "Labels create an accessible name used by assistive technology"],
    tradeoffs: ["Native controls are robust but may require deliberate styling", "Custom widgets offer unique behavior but carry full accessibility responsibility", "Extra markup can aid structure but meaningless wrappers add noise"],
    mistakes: ["Skipping heading levels for appearance", "Using a button for navigation or a link for an action", "Adding tabindex to every element"],
    example: "Use a form with an associated email label, native validation and a submit button; announce server errors beside the field and move focus only when necessary.",
    answer: "Semantic HTML communicates meaning, not appearance. It gives browsers and assistive technology correct roles, names and interaction behavior. I start with native elements, preserve keyboard and focus behavior, and add ARIA only when no native semantic fits.",
  },
  {
    match: /CSS|Flexbox|Grid|responsive|Cascade|specificity|layout/i,
    definition: "CSS is a rule system that resolves the cascade, computes values, lays out boxes and paints them into composited layers.",
    problem: "It separates content structure from responsive visual presentation across screen sizes, input modes and user preferences.",
    use: ["Use Grid for two-dimensional page relationships", "Use Flexbox for one-dimensional alignment and distribution", "Use intrinsic sizing, minmax and wrapping for resilient components"],
    avoid: ["Fixed heights for variable text content", "Increasing specificity to fight unclear ownership", "Viewport-width font scaling that makes text unpredictable"],
    internals: ["Selectors match elements and the cascade resolves competing declarations", "Computed styles feed layout algorithms", "Layout produces geometry, paint creates visual layers and compositing combines them", "Some properties trigger layout and paint while transform and opacity are often composited"],
    tradeoffs: ["Utility classes speed consistent delivery but require conventions", "Component scoping reduces leakage but may duplicate tokens", "Animation improves feedback but can harm performance or motion-sensitive users"],
    mistakes: ["Missing min-width: 0 on grid or flex children", "Creating unintended stacking contexts", "Hiding overflow instead of fixing the sizing cause"],
    example: "Use grid-template-columns: minmax(0,1fr) 18rem and collapse to one column at the content breakpoint; allow long labels to wrap without changing control dimensions.",
    answer: "CSS resolves matching rules through origin, importance, specificity and source order, then performs layout and paint. I choose Grid for two-dimensional structure, Flexbox for one-dimensional alignment and intrinsic constraints to avoid overflow rather than relying on fixed sizes.",
  },
  {
    match: /React|components|props|State and event|Effects|reconciliation|hooks/i,
    definition: "React renders a component tree as a function of props and state, then reconciles the next tree with the previous one to update the host UI.",
    problem: "It makes interactive UI predictable by describing desired output for each state instead of manually synchronizing many DOM mutations.",
    use: ["Build stateful component interfaces", "Compose reusable behavior and presentation", "Represent loading, empty, success and error states explicitly"],
    avoid: ["Using an effect to derive a value that can be calculated during render", "Putting every state value in global context", "Adding memoization before finding an actual render cost"],
    internals: ["A state update schedules rendering", "React calls components to produce a new element tree", "Reconciliation uses element type and keys to preserve or replace state", "The commit phase applies DOM changes; effects run to synchronize external systems"],
    tradeoffs: ["Declarative state improves consistency but rerenders require performance awareness", "Local state is simple while shared state needs clear ownership", "Abstraction through hooks helps reuse but can hide lifecycle behavior"],
    mistakes: ["Mutating state directly", "Using array indexes as keys for reorderable data", "Omitting effect dependencies to suppress reruns"],
    example: "Keep selected roadmap and search text as local state, derive the filtered list during render, and use an effect only if an external browser or network system must be synchronized.",
    answer: "React treats UI as a function of props and state. Updates schedule a render, reconciliation compares element types and keys, and the commit phase applies changes. Effects are for external synchronization, not ordinary derivation, and state should live at the lowest owner shared by its consumers.",
  },
  {
    match: /Node|runtime, modules|Buffers|streams|backpressure/i,
    definition: "Node.js is a JavaScript runtime built around an event loop, non-blocking I/O bindings and a standard library for server and tooling workloads.",
    problem: "It handles many concurrent I/O operations without assigning one blocked thread to every connection.",
    use: ["I/O-heavy APIs, gateways and realtime services", "JavaScript or TypeScript teams sharing contracts across client and server", "Streaming and event-driven integrations"],
    avoid: ["CPU-heavy work on the main event-loop thread", "Choosing Node when a required library or runtime is unsuitable", "Unbounded concurrency that exhausts connections or memory"],
    internals: ["JavaScript callbacks execute on the main event-loop thread", "The runtime delegates supported I/O to the operating system and some work to a thread pool", "Completed operations queue callbacks or promise reactions", "Streams use backpressure so fast producers do not overwhelm slow consumers"],
    tradeoffs: ["High I/O concurrency versus sensitivity to blocking code", "One language across stack versus runtime-specific backend constraints", "Streams reduce memory but require careful error and lifecycle handling"],
    mistakes: ["Blocking with synchronous filesystem or CPU loops", "Ignoring rejected promises", "Reading a large payload fully into memory"],
    example: "Stream a submitted resume into object storage while validating size and content type, and stop reading when the destination applies backpressure.",
    answer: "Node.js runs JavaScript on an event loop and delegates non-blocking I/O to the OS or runtime facilities. It is strong for I/O-bound concurrency, but CPU work can block all requests, so I move heavy work to bounded workers and design backpressure, timeout and shutdown behavior.",
  },
  {
    match: /SQL|SELECT|Joins|Grouping|Window|relational/i,
    definition: "SQL is a declarative language for defining, querying and changing relational data while the database optimizer chooses an execution plan.",
    problem: "It expresses data relationships, constraints and set-based transformations close to durable storage.",
    use: ["Model data with strong relationships and transactional invariants", "Join, aggregate and rank related records", "Let constraints reject invalid data regardless of application path"],
    avoid: ["Fetching all rows to filter in application memory", "Using SELECT * for stable production contracts", "Adding indexes without understanding read and write paths"],
    internals: ["Parsing and binding resolve names and types", "The optimizer estimates row counts and compares access paths", "The executor scans indexes or tables and applies joins, filters and aggregates", "Transactions coordinate visibility and durability through locks or multiversion mechanisms"],
    tradeoffs: ["Normalization protects consistency but may require joins", "Indexes accelerate selected reads but consume space and slow writes", "Stronger isolation prevents anomalies but can reduce concurrency"],
    mistakes: ["Filtering a LEFT JOINed table in WHERE and accidentally making it inner", "Ignoring NULL three-valued logic", "Paginating large changing data with deep OFFSET"],
    example: "Group students by section, calculate placement rate with conditional aggregation, and index the foreign key used to join students to sections.",
    answer: "SQL is declarative: I state the desired relation and the optimizer selects a physical plan using statistics. Correct schema constraints protect invariants, transactions define visibility, and indexes trade write cost and storage for faster access paths.",
  },
  {
    match: /index|Indexes|query plan/i,
    definition: "A database index is an auxiliary ordered or hashed structure that finds rows without scanning the entire table.",
    problem: "Large tables make full scans expensive when queries repeatedly filter, join or order by selective columns.",
    use: ["Columns used in selective filters and joins", "Composite access paths matching query prefix and order", "Covering frequently executed reads after measuring plans"],
    avoid: ["Indexing every column", "Low-selectivity indexes that the optimizer cannot use profitably", "Duplicate indexes whose leading columns provide the same access path"],
    internals: ["A B+ tree keeps sorted keys in internal and leaf pages", "Traversal follows key ranges to leaf entries that identify rows", "Composite indexes are ordered lexicographically, so leading-column order matters", "Writes must update each relevant index and may split pages"],
    tradeoffs: ["Faster reads versus slower writes and more storage", "Wide covering indexes avoid lookups but increase maintenance", "Indexes improve one access pattern and may not help another"],
    mistakes: ["Assuming an index is used without checking EXPLAIN", "Applying a function that makes a predicate non-sargable", "Using the wrong column order in a composite index"],
    example: "For WHERE section_id = ? AND status = ? ORDER BY score DESC, evaluate an index beginning with section_id and status, then score, and confirm it with the actual query plan.",
    answer: "An index is a separate access structure, commonly a B+ tree. It reduces reads by locating matching keys, but every write must maintain it. I design indexes from real filter, join and sort patterns, choose composite order deliberately and verify the result with an execution plan.",
  },
  {
    match: /Transactions|ACID|isolation|locking/i,
    definition: "A transaction groups database operations into one logical unit with atomicity, consistency, isolation and durability guarantees.",
    problem: "Concurrent requests and failures must not expose half-finished updates or violate business invariants.",
    use: ["Multiple writes must succeed or fail together", "Protect invariants such as one submission per attempt", "Coordinate reads and writes that require a stable view"],
    avoid: ["Holding a transaction open across network calls or user input", "Using the strongest isolation without understanding contention", "Assuming transactions automatically span unrelated services"],
    internals: ["The engine records changes in a log before durable data pages", "Locks or MVCC control which versions concurrent transactions can observe", "Commit makes the unit durable and visible according to isolation", "Rollback discards uncommitted effects"],
    tradeoffs: ["Stronger isolation prevents more anomalies but may block or abort more work", "Long transactions preserve a view but retain locks or old versions", "Distributed transactions offer coordination at high availability and latency cost"],
    mistakes: ["Doing HTTP calls inside a transaction", "Not retrying serialization or deadlock victims", "Reading then writing without protecting the invariant"],
    example: "Create an assessment attempt and reserve its unique student-assessment key in one transaction, then publish a notification only after commit.",
    answer: "A transaction is an atomic unit whose changes become durable at commit. Isolation is implemented with locking, MVCC or both and determines which concurrency anomalies are possible. I keep transactions short, protect concrete invariants and handle deadlock or serialization retries.",
  },
  {
    match: /REST|HTTP|API design|status codes|Resources, URLs/i,
    definition: "A REST-style API models addressable resources over HTTP and uses standard methods, status codes, headers and representations to communicate state transitions.",
    problem: "Clients and services need a stable, understandable contract that can evolve independently.",
    use: ["Resource-oriented request-response APIs", "Operations that fit HTTP caching and idempotency semantics", "Public or cross-team contracts that benefit from broad tooling"],
    avoid: ["Forcing every domain command into awkward CRUD", "Using GET for state changes", "Returning 200 for every success and failure"],
    internals: ["A client resolves DNS, creates a secure connection and sends an HTTP request", "Routing selects a handler that authenticates, validates and calls domain logic", "The service reads or changes data and serializes a representation", "Intermediaries may cache or retry only when method semantics allow it"],
    tradeoffs: ["Simple interoperable contracts versus over-fetching or multiple round trips", "Stateless services scale easily but each request needs sufficient context", "Versioning protects clients but increases maintenance"],
    mistakes: ["Confusing PUT and PATCH", "Non-idempotent retry behavior", "Leaking database entities as permanent API contracts"],
    example: "POST /assessments creates and returns 201 with a Location header; GET retrieves it; PATCH updates selected fields; DELETE returns 204 when removal succeeds.",
    answer: "REST uses HTTP semantics around resources and representations. I design stable nouns, correct method and status behavior, consistent errors, validation and pagination. Idempotency matters for retries: PUT and DELETE should have the same intended effect when repeated, while POST usually needs an idempotency strategy.",
  },
  {
    match: /Authentication|JWT|sessions|OAuth|authorization/i,
    definition: "Authentication proves who a principal is; authorization decides what that principal may do. Sessions, signed tokens and delegated identity protocols carry that decision across requests.",
    problem: "A system must establish trust without exposing credentials or allowing one user to act outside granted permissions.",
    use: ["Server sessions for revocable browser login with centralized state", "Short-lived access tokens for distributed API calls", "OAuth/OIDC for delegated access and external identity"],
    avoid: ["Putting secrets or sensitive personal data in a JWT payload", "Using a long-lived token without rotation or revocation policy", "Checking only that a user is logged in without authorizing the resource"],
    internals: ["Credentials are verified against a slow salted password hash or identity provider", "The server creates a session identifier or signs a token", "Each request verifies the credential, expiry and intended audience", "Authorization evaluates role, attributes and resource ownership before domain work"],
    tradeoffs: ["Sessions simplify revocation but require shared state", "Self-contained tokens reduce lookup but make immediate revocation harder", "Fine-grained permissions improve safety but require governance"],
    mistakes: ["Storing browser tokens in a place exposed to XSS", "Treating JWT encoding as encryption", "Skipping CSRF protection for cookie-authenticated state changes"],
    example: "An organization coordinator may view students only in assigned sections; the API checks both the authenticated identity and section ownership on every request.",
    answer: "Authentication establishes identity; authorization enforces permissions. Sessions are easy to revoke and fit browser apps, while short-lived signed tokens fit distributed APIs. In either case I protect transport, rotate credentials, enforce resource-level authorization and audit sensitive actions.",
  },
  {
    match: /Docker|Images, containers|Dockerfile/i,
    definition: "A container packages a process and filesystem view while sharing the host kernel. An image is the immutable layered template used to create containers.",
    problem: "It makes application dependencies and startup behavior reproducible across development, CI and deployment environments.",
    use: ["Package services with controlled runtime dependencies", "Create repeatable CI and local environments", "Deploy stateless processes under an orchestrator"],
    avoid: ["Treating a container as a full virtual machine", "Storing durable data only in the writable container layer", "Putting secrets into image layers"],
    internals: ["Image layers provide a content-addressed filesystem", "Namespaces isolate process, network and mount views", "Cgroups limit and account for resources", "The container runtime creates the isolated process from image configuration"],
    tradeoffs: ["Lightweight process isolation versus sharing the host kernel", "Layer caching speeds builds but poor ordering invalidates cache", "Reproducibility improves while image security and patching become ongoing work"],
    mistakes: ["Running as root", "Using an unpinned oversized base image", "Combining build tools and production runtime in one stage"],
    example: "Use a multi-stage build to compile the React client, copy only static output into a minimal runtime image, run as a non-root user and expose a health check.",
    answer: "An image is an immutable layered filesystem and configuration; a container is an isolated process created from it. Containers share the host kernel and use namespaces and cgroups. I use multi-stage builds, pinned minimal bases, non-root users and external secret injection.",
  },
  {
    match: /Kubernetes|Pod|deployment|service|probes/i,
    definition: "Kubernetes is a declarative control system that continuously reconciles cluster resources toward a desired state. Pods run containers; deployments manage replicated stateless pods; services provide stable discovery.",
    problem: "It automates scheduling, replacement, rollout and connectivity for containerized workloads across multiple machines.",
    use: ["Operate many containerized services with repeatable deployment", "Need self-healing, scaling and controlled rollouts", "Standardize workload and policy management across teams"],
    avoid: ["A small application where operational complexity outweighs value", "Stateful software without understanding storage and failure behavior", "Using orchestration to hide an unreliable application"],
    internals: ["Controllers watch desired objects through the API server", "The scheduler assigns unscheduled pods to suitable nodes", "Node agents start containers and report status", "Services and cluster networking route traffic to ready pod endpoints"],
    tradeoffs: ["Automation and portability versus significant platform complexity", "Declarative reconciliation improves recovery but eventual convergence takes time", "Resource abstraction helps teams but can obscure infrastructure cost"],
    mistakes: ["Making liveness probes depend on fragile downstream services", "Omitting resource requests", "Treating a pod IP as stable"],
    example: "Deploy the assessment API with resource requests, a readiness probe that checks local readiness, a liveness probe for deadlock recovery and a rolling update with a disruption budget.",
    answer: "Kubernetes stores desired state and controllers reconcile actual state toward it. Deployments manage replica sets and pods; services provide stable discovery. I distinguish readiness from liveness, set resources, design graceful termination and avoid Kubernetes when its operating cost is unjustified.",
  },
  {
    match: /Data structures|Arrays|linked lists|Stacks|queues|trees|heaps|graphs/i,
    definition: "A data structure organizes values so required operations have predictable time and space costs.",
    problem: "The same data can be represented in ways that make lookup, insertion, ordering or traversal dramatically cheaper or more expensive.",
    use: ["Choose arrays for compact indexed access", "Choose hashing for fast average membership or lookup", "Choose trees or heaps when order, hierarchy or priority drives operations"],
    avoid: ["Selecting from habit rather than operation requirements", "Ignoring memory overhead and input limits", "Using a sophisticated structure before a simple one fails constraints"],
    internals: ["Representation determines which locations must be visited for each operation", "Contiguous storage improves cache locality", "Pointer-based structures allow flexible links but add indirection", "Invariants such as heap order or tree balance preserve complexity guarantees"],
    tradeoffs: ["Time versus space", "Fast average behavior versus stronger worst-case guarantees", "Simple implementation versus specialized operations"],
    mistakes: ["Quoting complexity without defining the operation", "Ignoring amortized cost", "Using recursion without considering depth"],
    example: "Use a queue for breadth-first prerequisite traversal, a set for visited skills and a map from skill to dependent roadmap nodes.",
    answer: "I choose a data structure from the dominant operations, input size and ordering requirements. I compare expected and worst-case time, memory and implementation risk, then state the invariant that gives the structure its guarantee.",
  },
  {
    match: /Algorithms|sorting|searching|dynamic programming|backtracking|greedy/i,
    definition: "An algorithm is a finite procedure whose correctness and resource cost can be reasoned about independently of a particular input instance.",
    problem: "Interview and production tasks require a method that remains correct and efficient as input size and edge cases grow.",
    use: ["Use pattern recognition after writing constraints and brute force", "Use dynamic programming for overlapping subproblems with reusable state", "Use greedy choice only when a correctness argument supports local decisions"],
    avoid: ["Memorizing code without understanding its invariant", "Optimizing before confirming correctness", "Applying DP when state or transition cannot be defined clearly"],
    internals: ["Define inputs, outputs and invariants", "Prove progress and termination", "Count dominant operations as input grows", "Test boundaries, adversarial cases and overflow"],
    tradeoffs: ["Precomputation can exchange memory for time", "Iterative solutions avoid call depth but may be less direct", "A simpler asymptotically slower approach may be best for small constrained input"],
    mistakes: ["Missing empty and single-element cases", "Using binary search on an invalid search space", "Giving complexity without including sorting or recursion stack"],
    example: "Start with O(n²) pair search, derive the need for fast complement lookup, then use a hash map for expected O(n) time while explaining the added O(n) space.",
    answer: "I begin with constraints and a correct baseline, identify repeated work, choose a structure or pattern, state the invariant and prove complexity. I test boundaries before discussing optimization and include auxiliary space in the analysis.",
  },
  {
    match: /System design|Scale|load balancing|cache|partitioning|reliability/i,
    definition: "System design turns functional requirements and quality goals into components, data ownership, interfaces and failure policies.",
    problem: "A correct single-process feature may fail under traffic, data growth, dependency failure, security constraints or operational limits.",
    use: ["Requirements include scale, reliability or cross-service coordination", "A design must expose explicit data and failure ownership", "Interview questions ask for reasoned tradeoffs rather than one perfect architecture"],
    avoid: ["Starting with microservices before defining requirements", "Adding cache or queues without a concrete bottleneck", "Claiming high availability without a failure and recovery model"],
    internals: ["Estimate traffic, storage and latency budgets", "Define APIs and the source of truth", "Design a simple end-to-end request path", "Scale measured bottlenecks and add resilience, observability and security"],
    tradeoffs: ["Consistency versus availability during partitions", "Synchronous simplicity versus asynchronous resilience", "Operational complexity versus independent scale"],
    mistakes: ["Skipping capacity estimates", "Naming technologies without explaining purpose", "Ignoring retries, idempotency and data migration"],
    example: "For online assessments, define start and submit APIs, a durable attempt store, idempotent submission, autosave, a queue for scoring and metrics for late or duplicate submissions.",
    answer: "I clarify requirements and scale, define APIs and data ownership, draw the simplest working flow, then address bottlenecks and failure. Every added cache, queue or partition needs a purpose, consistency policy, observability and recovery path.",
  },
  {
    match: /LLM|Prompt|RAG|Embeddings|vector|Agents|LangChain|LangGraph|MCP/i,
    definition: "An AI application combines a probabilistic model with deterministic context, tools, policies and evaluation. Retrieval supplies evidence; tool calls perform bounded actions; orchestration controls state and flow.",
    problem: "A language model alone may produce fluent but unsupported output and cannot safely access current private data or take actions without explicit controls.",
    use: ["Use prompting for instruction and output shaping", "Use RAG when answers must be grounded in changing documents", "Use tools or agents only when the task needs external information or action"],
    avoid: ["Using an autonomous loop for a deterministic workflow", "Treating retrieved text as trusted instructions", "Shipping without a representative evaluation set"],
    internals: ["Input is tokenized and the model predicts successive token distributions", "Retrieval embeds or searches a query and returns evidence chunks", "An orchestrator builds context, invokes the model, validates output and optionally executes approved tools", "Traces and evaluators measure quality, safety, latency and cost"],
    tradeoffs: ["More context may improve recall but increase noise, latency and cost", "Agents are flexible but less predictable than workflows", "Stricter output validation improves reliability but needs fallback handling"],
    mistakes: ["Evaluating only a few happy-path examples", "Giving tools excessive permission", "Confusing RAG with model training"],
    example: "Retrieve authorized study chapters, rerank them, ask the model to answer with citations, reject unsupported claims and route low-confidence answers to a normal search or human review path.",
    answer: "I treat the model as one probabilistic component. For knowledge tasks I retrieve scoped evidence, separate data from instructions, require structured output and citations, and evaluate faithfulness. For tools I apply least privilege, approval gates, loop limits and complete tracing.",
  },
];

const categoryDefaults: Record<MaterialCategory, { problem: string; internal: string; avoid: string }> = {
  Languages: { problem: "express application behavior through clear data and control flow", internal: "source is parsed, represented and executed by a compiler, interpreter or runtime", avoid: "the ecosystem or runtime constraints do not match the workload" },
  Web: { problem: "deliver understandable and interactive experiences through browser standards", internal: "the browser parses resources, builds runtime structures, performs layout and handles events", avoid: "a native platform capability offers a simpler and more accessible solution" },
  Backend: { problem: "coordinate requests, business rules, data and integrations behind stable boundaries", internal: "a request crosses routing, validation, domain logic, persistence and response boundaries", avoid: "the added service or protocol creates more operational cost than the requirement justifies" },
  Data: { problem: "store, retrieve and transform information with explicit correctness and performance guarantees", internal: "data is encoded into storage structures and accessed through planned read and write paths", avoid: "its consistency, query or operational model conflicts with the access pattern" },
  "Computer Science": { problem: "reason precisely about computation, resources and system behavior", internal: "invariants and representations determine correctness, execution and complexity", avoid: "a simpler model satisfies the actual constraints" },
  "DevOps & Cloud": { problem: "deliver and operate software repeatably across infrastructure", internal: "declarative configuration and controllers move runtime resources toward a desired state", avoid: "platform complexity exceeds the reliability or scale benefit" },
  AI: { problem: "build useful probabilistic features with grounding, evaluation and controls", internal: "models transform context into outputs while deterministic systems validate, retrieve and execute", avoid: "a normal rule, search or workflow can solve the task more reliably" },
  Career: { problem: "communicate relevant evidence clearly under hiring constraints", internal: "recruiters and interviewers evaluate signals against role-specific criteria", avoid: "generic claims replace specific, verifiable examples" },
};

export function buildTopicLesson(tech: string, topic: string, stage: string): TopicLesson {
  const subject = technologyMaterials[tech];
  const rule = rules.find((item) => item.match.test(`${tech} ${topic}`));
  const defaults = categoryDefaults[subject.category];
  const definition = rule?.definition ?? `${topic} is a ${stage.toLowerCase()} part of ${tech} concerned with how engineers ${defaults.problem}. It provides a vocabulary, operating model and constraints for making that part of a system deliberate rather than accidental.`;
  const problem = rule?.problem ?? `Without understanding ${topic}, a ${tech} solution may work on the happy path but become difficult to change, debug or operate. This topic makes ownership, behavior and failure conditions explicit.`;
  const whenToUse = rule?.use ?? [
    `Use ${topic} when it directly supports a required ${tech} behavior`,
    "Use it after identifying the input, output, constraints and failure policy",
    "Use it when the team can test and operate the resulting behavior",
  ];
  const whenNotToUse = rule?.avoid ?? [
    `Do not add ${topic} only because it is popular or appears in an architecture diagram`,
    `Avoid it when ${defaults.avoid}`,
    "Avoid abstraction before the repeated problem and ownership boundary are understood",
  ];
  const internalWorking = rule?.internals ?? [
    `Input enters the ${topic} boundary and is validated against its contract`,
    `${defaults.internal.charAt(0).toUpperCase()}${defaults.internal.slice(1)}`,
    "State changes should preserve a named invariant and produce an observable result",
    "Failures propagate through a defined error, retry or recovery path",
  ];
  const tradeoffs = rule?.tradeoffs ?? [
    "Correctness and clarity versus implementation effort",
    "Runtime performance versus memory or operational complexity",
    "Flexibility versus a smaller, easier-to-test contract",
  ];
  const mistakes = rule?.mistakes ?? [
    `Memorizing the definition of ${topic} without tracing an example`,
    "Ignoring invalid input, failure and cleanup behavior",
    "Choosing an advanced implementation before measuring the simpler one",
  ];
  const practicalExample = rule?.example ?? `In the placement platform, apply ${topic} to one ${tech} workflow such as creating an assessment, loading study content or calculating results. Define the contract, implement the happy path, reject invalid input and record enough context to diagnose failure.`;
  const interviewAnswer = rule?.answer ?? `${topic} is used in ${tech} to ${defaults.problem}. I choose it when its guarantees match the requirement, and avoid it when the simpler alternative already meets the constraints. Internally, ${defaults.internal}. The main tradeoff is ${tradeoffs[0].toLowerCase()}.`;

  return {
    definition,
    problem,
    whenToUse,
    whenNotToUse,
    internalWorking,
    tradeoffs,
    mistakes,
    practicalExample,
    interviewAnswer,
    followUps: [
      `What changes when the input or traffic for ${topic} grows ten times?`,
      `Which failure is most likely in a production ${tech} implementation?`,
      `What simpler alternative could replace ${topic}, and what would be lost?`,
      `How would you test and monitor ${topic}?`,
    ],
    checkpoints: [
      `Define ${topic} without reading the notes`,
      "Draw the internal flow and name the invariant",
      "Give one correct use, one misuse and one tradeoff",
      "Answer the interview summary in under two minutes",
    ],
    diagram: `${topic}\n\nRequirement and constraints\n          |\n          v\nValidate the input contract\n          |\n          v\nExecute: ${defaults.internal}\n          |\n          +--> success -> observable result\n          |\n          +--> failure -> recover, retry or reject\n          |\n          v\nMeasure correctness and cost`,
  };
}
