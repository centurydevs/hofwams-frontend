export const BlogIllustration = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="400"
    height="300"
    viewBox="0 0 400 300"
    className="w-full h-auto max-w-md mx-auto"
  >
    <rect width="400" height="300" className="fill-white dark:fill-gray-900" />
    <circle cx="200" cy="150" r="100" fill="#4ade80" />
    {/* Add a class for dark mode */}
    <rect
      x="150"
      y="120"
      width="100"
      height="60"
      rx="5"
      className="fill-white"
    />
    <rect x="160" y="130" width="80" height="5" rx="2.5" fill="#22c55e" />
    <rect x="160" y="140" width="60" height="5" rx="2.5" fill="#22c55e" />
    <rect x="160" y="150" width="70" height="5" rx="2.5" fill="#22c55e" />
    <path
      d="M240 165 L200 205 L160 165"
      stroke="#ffffff"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
