import React from "react";

function Facebook() {
  return (
    <span className="">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="url(#paint_linear)"></circle>
        <path
          d="M10.9791 10.4467L11.3345 8.18877H9.11141V6.72413C9.11141 6.10625 9.42138 5.50361 10.4171 5.50361H11.4284V3.58128C11.4284 3.58128 10.511 3.42871 9.6343 3.42871C7.80263 3.42871 6.60653 4.51039 6.60653 6.46782V8.18877H4.57129V10.4467H6.60653V15.9056C7.01512 15.9681 7.43314 16.0001 7.85897 16.0001C8.2848 16.0001 8.70282 15.9681 9.11141 15.9056V10.4467H10.9791Z"
          fill="white"
        ></path>
        <defs>
          <linearGradient
            id="paint_linear"
            x1="8"
            y1="0"
            x2="8"
            y2="15.9525"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#18ACFE"></stop>
            <stop offset="1" stopColor="#0163E0"></stop>
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

export default Facebook;
