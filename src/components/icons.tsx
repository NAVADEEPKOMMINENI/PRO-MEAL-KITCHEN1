import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5Z" />
      <path d="M12 2v20" />
      <path d="M17 7a5 5 0 0 0-5-5" />
      <path d="M12 22a5 5 0 0 0 5-5" />
      <path d="M7 17a5 5 0 0 0 5 5" />
      <path d="M12 2a5 5 0 0 0-5 5" />
    </svg>
  );
}
