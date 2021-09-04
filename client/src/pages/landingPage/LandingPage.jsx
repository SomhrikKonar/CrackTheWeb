import React from "react";
import "./landingPage.css";
import Navbar from "../../components/navbar/Navbar";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
export default function LandingPage() {
  return (
    <>
      <div className="landingPageContainer">
        <div className="landingPageArc">
          <img
            src="https://www.linkpicture.com/q/center-image.png"
            alt="HTML"
            className="centerImage"
          />
          <div className="circularImageCarousel">
            <img
              src="https://www.linkpicture.com/q/html5-logo-31822.png"
              alt="CSS"
              className="randomImageOne"
            />
            <img
              src="https://www.linkpicture.com/q/1174949_js_react-js_logo_react_react-native_icon-1.png"
              alt="REACT"
              className="randomImageTwo"
            />
            <img
              src="https://www.linkpicture.com/q/javascript-39413.png"
              alt="NODEJS"
              className="randomImageThree"
              id="CSSImg"
            />

            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="246.000000pt"
              height="205.000000pt"
              viewBox="0 0 246.000000 205.000000"
              preserveAspectRatio="xMidYMid meet"
              className="randomImageFour"
            >
              <g
                transform="translate(0.000000,205.000000) scale(0.100000,-0.100000)"
                fill="#e9a57efa"
                stroke="none"
              >
                <path
                  d="M1078 1910 c-328 -60 -608 -305 -707 -620 -35 -114 -44 -185 -38
-303 12 -237 88 -413 251 -585 121 -128 288 -222 456 -257 92 -19 288 -19 380
0 268 56 511 252 630 507 56 119 73 207 73 373 0 134 -3 160 -27 238 -93 310
-325 541 -631 628 -79 23 -307 34 -387 19z m-61 -566 c58 -28 93 -64 127 -133
25 -49 46 -133 46 -181 l0 -30 -250 0 -250 0 0 -43 c0 -128 134 -216 269 -177
39 11 89 54 102 88 7 19 16 22 64 22 54 0 56 -1 49 -22 -24 -80 -72 -134 -149
-170 -72 -33 -209 -32 -279 2 -65 31 -113 81 -144 149 -37 81 -43 232 -13 313
70 183 257 263 428 182z m444 -84 c45 -67 85 -120 90 -118 5 2 46 55 91 118
l83 115 68 3 c37 2 67 0 67 -4 0 -4 -52 -76 -115 -160 -63 -85 -115 -158 -115
-164 0 -6 59 -91 130 -190 72 -99 130 -183 130 -185 0 -3 -33 -5 -73 -5 l-73
0 -94 140 c-51 77 -97 140 -101 140 -4 0 -49 -63 -100 -140 l-94 -139 -67 -1
c-38 0 -68 3 -68 6 0 4 54 83 120 175 66 93 123 175 126 183 3 8 -44 80 -110
171 -64 86 -116 161 -116 166 0 5 31 9 70 9 l69 0 82 -120z"
                />
                <path
                  d="M855 1275 c-5 -2 -22 -6 -37 -9 -58 -13 -128 -98 -128 -156 0 -19 6
-20 190 -20 105 0 190 4 190 9 0 18 -24 78 -42 104 -30 42 -133 85 -173 72z"
                />
              </g>
            </svg>
            <img
              src="https://www.linkpicture.com/q/mongoDB-removebg-preview.png"
              alt="MONGODB"
              className="randomImageFive"
              id="CSSImg"
            />
            <button className="circularImageCarouselPrev"><ArrowUpwardIcon style={{width:"60%",color:"white"}}/></button>
            <button className="circularImageCarouselNext"><ArrowDownward style={{width:"60%",color:"white"}}/></button>
          </div>
        </div>
        <div className="navbarContainer">
          <Navbar />
        </div>
      </div>
    </>
  );
}
