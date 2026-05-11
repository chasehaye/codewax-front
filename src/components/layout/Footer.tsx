import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white backdrop-blur-md select-none">
      <div className="mx-auto flex w-[80%] flex-col justify-between gap-8 py-8 md:flex-row">
        <div>
          <h2 className="text-lg font-normal">CodeWax</h2>

          <p className="mt-2 max-w-md text-sm text-gray-500">
            AI-powered codebase understanding built for developers working with
            large and unfamiliar repositories.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-700">Built With</h3>

          <ul className="grid grid-cols-1 gap-x-8 gap-y-1 text-sm text-gray-500 sm:grid-cols-2">
            <li>Next.js</li>
            <li>React.js</li>
            <li>TypeScript</li>
            <li>CSS</li>
            <li>HTML5</li>
            <li>Tailwind CSS</li>
            <li>PostgreSQL</li>
            <li>Go (GORM)</li>
            <li>Claude AI</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        © 2026 CodeWax. All rights reserved.
      </div>
    </footer>
  );
}
