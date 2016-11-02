import React, { Component } from 'react';

function SliderInstructionComponent(props) {
  return (
      <svg width="575px" height="234px" viewBox="0 0 575 234">
        <title>Artboard</title>
        <desc>Created with Sketch.</desc>
        <defs>
            <rect id="path-1" x="69" y="50" width="428" height="79" rx="8"></rect>
            <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="428" height="79" fill="white">
                <use xlinkHref="#path-1"></use>
            </mask>
            <rect id="path-3" x="79" y="82" width="397" height="12"></rect>
            <mask id="mask-4" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="397" height="12" fill="white">
                <use xlinkHref="#path-3"></use>
            </mask>
            <rect id="path-5" x="101" y="60" width="25" height="58"></rect>
            <mask id="mask-6" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="25" height="58" fill="white">
                <use xlinkHref="#path-5"></use>
            </mask>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
            <g id="Artboard">
                <use id="Rectangle" stroke="#979797" mask="url(#mask-2)" strokeWidth="2" fill="#F4F4F4" xlinkHref="#path-1"></use>
                <use id="Rectangle-3" stroke="#979797" mask="url(#mask-4)" strokeWidth="2" fill="#3B3B3B" xlinkHref="#path-3"></use>
                <use id="Rectangle-2" stroke="#979797" mask="url(#mask-6)" strokeWidth="2" fill="#FFFFFF" xlinkHref="#path-5"></use>
                <path d="M169.5,158.5 L385.648097,158.5" id="Line" stroke="#000000" strokeLinecap="square" fill="#000000"></path>
                <path id="Line-decoration-1" d="M385.648097,158.5 L374.848097,155.5 L374.848097,161.5 L385.648097,158.5 Z" stroke="#000000" strokeLinecap="square" fill="#000000"></path>
                <text id="Move-slider-to-the-r" fontFamily="Roboto" fontSize="15" font-weight="normal" fill="#626262">
                    <tspan x="113.084229" y="196">Move slider to the right for rooms with more people</tspan>
                </text>
                <text id="Less-people" fontFamily="Roboto" fontSize="15" font-weight="normal" fill="#626262">
                    <tspan x="26.8901367" y="86">Less </tspan>
                    <tspan x="19.8515625" y="104">people</tspan>
                </text>
                <text id="More-people" fontFamily="Roboto" fontSize="15" font-weight="normal" fill="#626262">
                    <tspan x="516.304443" y="86">More </tspan>
                    <tspan x="510.851562" y="104">people</tspan>
                </text>
            </g>
        </g>
    </svg>
  );
}

export default SliderInstructionComponent;
