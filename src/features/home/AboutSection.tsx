export default function AboutSection() {
  return (
    <section className="bg-bg-navbar mx-auto mt-20 mb-60 w-[80%] rounded-xl p-1 px-2 px-6 py-8 shadow select-none">
      <h1 className="ml-2 text-[2rem] font-normal text-gray-700">CodeWax</h1>

      <div className="my-4 rounded-md bg-gray-100 p-4 pb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>

        <h2 className="mb-2 text-sm font-medium text-gray-600">
          Why CodeWax Exists
        </h2>
        <p>
          Understanding a new codebase shouldn't take weeks. CodeWax is designed
          to remove that friction entirely. It ingests your GitHub repositories,
          breaks them down into meaningful chunks, and vectorizes the code so it
          can be semantically understood rather than just searched. This allows
          an AI agent to answer real engineering questions with direct
          references to your actual source code instead of guessing or
          hallucinating.
        </p>
      </div>

      <div className="mb-4 rounded-md bg-gray-100 p-4 pb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288"
          />
        </svg>

        <h2 className="mb-2 text-sm font-medium text-gray-600">
          How It Helps Developers
        </h2>
        <p>
          Whether you're onboarding to a large unfamiliar repo, trying to trace
          how a specific feature is implemented, or generating new code that
          needs to match existing architectural patterns, CodeWax gives the AI
          the full context it needs. It bridges the gap between raw source code
          and meaningful understanding, making large codebases feel instantly
          navigable.
        </p>
      </div>

      <ul className="mb-4 space-y-2 rounded-md bg-gray-100 p-4 pb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>

        <h2 className="mb-2 text-sm font-medium text-gray-600">
          Core Capabilities
        </h2>
        <li>
          Ingests and indexes entire GitHub repositories, preserving structure,
          relationships, and context between files.
        </li>
        <li>
          Chunks and vectorizes code into semantic embeddings for accurate
          retrieval and context-aware search across large projects.
        </li>
        <li>
          Powers an AI agent that answers engineering questions with grounded,
          source-referenced responses directly tied to your codebase.
        </li>
        <li>
          Supports intelligent code generation that follows your existing
          patterns, architecture decisions, and project conventions.
        </li>
      </ul>

      <div className="mb-4 rounded-md bg-gray-100 p-4 pb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>

        <h2 className="mb-2 text-sm font-medium text-gray-600">
          System & Architecture
        </h2>
        <p>
          Built as a full-stack system with a custom authentication layer and a
          suite of internal tools designed to support real usage at scale. This
          includes mailing list management, bug reporting pipelines, and a
          public API that allows external AI agents or services to integrate
          directly into the CodeWax context engine.
        </p>
      </div>

      <div className="mb-4 rounded-md bg-gray-100 p-4 pb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
          />
        </svg>

        <h2 className="mb-2 text-sm font-medium text-gray-600">Built with</h2>

        <ul className="space-y-1 text-sm text-gray-700">
          <li>Next.js</li>
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>TypeScript</li>
          <li>PostgreSQL</li>
          <li>Go (GORM)</li>
          <li>Claude (AI integration)</li>
        </ul>
      </div>
    </section>
  );
}
