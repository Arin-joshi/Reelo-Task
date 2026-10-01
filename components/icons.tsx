import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13 3a10 10 0 0 1 7.8 16.2l6 6a1 1 0 0 1-1.4 1.4l-6-6A10 10 0 1 1 13 3Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HeartIcon({ filled, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        d="M16 28c-.3 0-.5-.1-.7-.3-4.3-3.7-10.6-8.8-11.8-14.2C2.7 9.6 5.4 6 9.5 6c2.3 0 4.3 1.1 5.5 2.9C16.2 7.1 18.2 6 20.5 6c4.1 0 6.8 3.6 6 7.5-1.2 5.4-7.5 10.5-11.8 14.2-.2.2-.4.3-.7.3Z"
        fill={filled ? "#FF385C" : "rgba(0,0,0,0.55)"}
        stroke="#fff"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.28))" }}
      />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" {...props}>
      <path
        d="M6 0l1.7 3.7L12 4.2 8.8 6.9 9.6 11 6 9 2.4 11l.8-4.1L0 4.2l4.3-.5L6 0z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M1.5 8h13M8 1.5c1.8 2 2.7 4.2 2.7 6.5S9.8 12.5 8 14.5C6.2 12.5 5.3 10.3 5.3 8S6.2 3.5 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 26c1.8-4 5.4-6 10-6s8.2 2 10 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 10h20M6 16h20M6 22h20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="40"
        strokeDashoffset="12"
      />
    </svg>
  );
}

export function AirbnbMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M16 29.3c-.4 0-.8-.2-1.1-.5-6.4-6.7-10.4-11.6-10.4-16.4C4.5 7.4 9.4 2.7 16 2.7s11.5 4.7 11.5 9.7c0 4.8-4 9.7-10.4 16.4-.3.3-.7.5-1.1.5Zm0-22.4c-4.6 0-8.2 3.4-8.2 7.5 0 3.6 3.2 7.8 8.2 13.2 5-5.4 8.2-9.6 8.2-13.2 0-4.1-3.6-7.5-8.2-7.5Zm0 10.4a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Z"
      />
    </svg>
  );
}
