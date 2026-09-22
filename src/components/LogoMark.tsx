/** The Deep4IT mark: three stacked layers (purple, mint, yellow), inline so it
 *  scales crisp at any size and each layer can float on its own phase. */
export default function LogoMark({
  className = '',
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="60 58 380 404"
      className={`${animated ? 'logo-float ' : ''}${className}`}
      role="img"
      aria-label="Deep4IT"
    >
      <defs>
        <linearGradient
          id="d4-purple"
          gradientUnits="userSpaceOnUse"
          x1="87.327263"
          y1="243.73833"
          x2="370.7439"
          y2="527.15497"
          gradientTransform="matrix(1.2596296,0,0,0.79388419,-40.184292,-121.42424)"
        >
          <stop offset="0" stopColor="#a98cff" />
          <stop offset="0.55" stopColor="#916cf4" />
          <stop offset="1" stopColor="#a98cff" />
        </linearGradient>
        <linearGradient
          id="d4-mint"
          gradientUnits="userSpaceOnUse"
          x1="81.969025"
          y1="549.9577"
          x2="302.55234"
          y2="770.54102"
          gradientTransform="matrix(1.3405149,0,0,0.57495664,-9.0179716,-61.777073)"
        >
          <stop offset="0" stopColor="#66efbe" />
          <stop offset="1" stopColor="#58e7b0" />
        </linearGradient>
      </defs>
      <path
        className="d4-l3"
        fill="#ffcc00"
        d="m 146.84908,366.91072 12.83847,-8.95937 q 5.1354,-3.19976 10.27079,0 l 73.17933,46.07673 q 6.41925,3.83973 12.83848,0 l 73.17934,-46.07673 q 5.13539,-3.19976 10.27078,0 l 13.4804,8.95937 q 6.41924,4.47969 0,8.95936 l -96.93052,72.31486 q -6.41923,4.47968 -12.83848,0 l -96.28859,-72.31486 q -6.41924,-4.47967 0,-8.95936 z"
      />
      <path
        className="d4-l2"
        fill="url(#d4-mint)"
        d="m 105.32944,268.66033 17.86678,-12.07865 q 7.14671,-4.3138 14.29342,0 l 101.84065,62.11878 q 8.93339,5.17657 17.86678,0 l 101.84066,-62.11878 q 7.14671,-4.3138 14.29342,0 l 18.76012,12.07865 q 8.93339,6.03933 0,12.07866 l -134.8942,97.49197 q -8.93339,6.03933 -17.86678,0 L 105.32944,280.73899 q -8.933402,-6.03933 0,-12.07866 z"
      />
      <path
        className="d4-l1"
        fill="url(#d4-purple)"
        fillRule="evenodd"
        d="m 233.81571,76.575759 q 14,-9 28,0 l 158,99.000001 q 14,9 0,18 l -158,99 q -14,9 -28,0 l -157.000002,-99 q -14,-9 0,-18 z m -68,102.000001 q -9,6 0,12 l 73,46 q 9,6 18,0 l 74,-46 q 9,-6 0,-12 l -74,-46 q -9,-6 -18,0 z"
      />
    </svg>
  );
}
