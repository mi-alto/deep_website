/** The Deep4IT mark: three stacked layers — white on top, then magenta fading
 *  into deep violet. Inline so it stays crisp at any size. */
export default function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="60 58 380 404" className={className} role="img" aria-label="Deep4IT">
      <defs>
        <linearGradient id="d4-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d9d4ea" />
        </linearGradient>
        <linearGradient id="d4-mid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e455ff" />
          <stop offset="1" stopColor="#b41fe6" />
        </linearGradient>
        <linearGradient id="d4-bot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a1fd0" />
          <stop offset="1" stopColor="#4a0a80" />
        </linearGradient>
      </defs>
      <path fill="url(#d4-bot)" d="m 146.84908,366.91072 12.83847,-8.95937 q 5.1354,-3.19976 10.27079,0 l 73.17933,46.07673 q 6.41925,3.83973 12.83848,0 l 73.17934,-46.07673 q 5.13539,-3.19976 10.27078,0 l 13.4804,8.95937 q 6.41924,4.47969 0,8.95936 l -96.93052,72.31486 q -6.41923,4.47968 -12.83848,0 l -96.28859,-72.31486 q -6.41924,-4.47967 0,-8.95936 z" />
      <path fill="url(#d4-mid)" d="m 105.32944,268.66033 17.86678,-12.07865 q 7.14671,-4.3138 14.29342,0 l 101.84065,62.11878 q 8.93339,5.17657 17.86678,0 l 101.84066,-62.11878 q 7.14671,-4.3138 14.29342,0 l 18.76012,12.07865 q 8.93339,6.03933 0,12.07866 l -134.8942,97.49197 q -8.93339,6.03933 -17.86678,0 L 105.32944,280.73899 q -8.933402,-6.03933 0,-12.07866 z" />
      <path fill="url(#d4-top)" fillRule="evenodd" d="m 233.81571,76.575759 q 14,-9 28,0 l 158,99.000001 q 14,9 0,18 l -158,99 q -14,9 -28,0 l -157.000002,-99 q -14,-9 0,-18 z m -68,102.000001 q -9,6 0,12 l 73,46 q 9,6 18,0 l 74,-46 q 9,-6 0,-12 l -74,-46 q -9,-6 -18,0 z" />
    </svg>
  );
}
