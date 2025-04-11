import { createContext, useContext, useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Application } from '@splinetool/runtime';
import { useJumpscare } from './Jumpcontext';

const SplineContext = createContext();

export const useSpline = () => useContext(SplineContext);
export function SplineProvider({ children }) {
  const navigate = useNavigate();

  const { triggerJumpscare } = useJumpscare();


  const canvasRef = useRef(null);
  const tooltipContainerRef = useRef(null);
  const hoveredRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const appRef = useRef(null);

  const buildingInfo = {
    cinema: 'Movie Zone – Watch the last films before the world burns. Popcorn not guaranteed.',
    Shop: 'Cursed Shop – Buy haunted relics to protect or doom yourself. No refunds. Ever.',
    Library: 'Zombie Guide – Read fast. The undead don’t wait for slow readers.',
    Cathedral: 'Survivor’s Cathedral – A safe haven… until it’s not. Knock twice. Stay quiet.',
    ghosthouse: 'Ghost Chat – Talk to spirits... or let them talk through you.',
    selfie: 'Selfie Booth – Snap a pic for your “Missing” poster. Filters included.',
    TextGlow: 'Better not Disturb me Or Else ... '
  };

  useEffect(() => {
    if (!canvasRef.current || !tooltipContainerRef.current || !modalRef.current || !modalContentRef.current) {
      return; // wait until all refs are attached
    }

    const canvas = canvasRef.current;
    const app = new Application(canvas);
    appRef.current = app;

    const tooltips = {};


    app.load('https://prod.spline.design/q1Q5uRKc1mweYEM0/scene.splinecode')
      .then(() => {
        console.log('✅ Scene loaded');

        Object.keys(buildingInfo).forEach((name) => {
          const obj = app.findObjectByName(name);
          if (!obj) return;

          const tooltip = document.createElement('div');
          tooltip.className = 'tooltip';
          tooltip.innerText = buildingInfo[name];
          tooltip.style.display = 'none';
          tooltipContainerRef.current.appendChild(tooltip);
          tooltips[name] = { element: tooltip, object: obj };
        });

        app.addEventListener('mouseHover', (e) => {
          const name = e.target?.name;
          if (!name || !tooltips[name]) return;

          hoveredRef.current = name;
          if (name === "Text Glow") {
            name = "TextGlow";
          }
          Object.entries(tooltips).forEach(([tooltipName, { element }]) => {
            if (tooltipName === hoveredRef.current) {
              const { x, y } = mousePosRef.current;
              element.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 5}px)`;
              element.style.display = 'block';
            } else {
              element.style.display = 'none';
            }
          });

          let hoverTimeout;
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            if (hoveredRef.current && tooltips[hoveredRef.current]) {
              tooltips[hoveredRef.current].element.style.display = 'none';
            }
            hoveredRef.current = null;
          }, 3000);
        });

        app.addEventListener('mouseDown', (e) => {
          const name = e.target?.name;
          if (name) {

            if (name === "Text Glow") {
              triggerJumpscare();
              return;
            }
            if (name === "Shop") {
              navigate('/Store');
              return;
            }
            if (name === "Library") {
              navigate('/zombie');
              return;
            }
            if (name === "Cathedral") {
              navigate('/chat');
              return;
            }
            if (name === "ghosthouse") {
              navigate('/ghost');
              return;
            }

            
            modalContentRef.current.innerHTML = `
              <h2>${name}</h2>
              <p>${buildingInfo[name] || 'No description available.'}</p>
            `;
            modalRef.current.style.display = 'block';

          }
        });
      });




    return () => {
      app.dispose();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const closeModal = () => {
    modalRef.current.style.display = 'none';
  };

  return (
    <SplineContext.Provider value={{
      canvasRef,
      tooltipContainerRef,
      modalRef,
      modalContentRef,
      closeModal,
      appRef
    }}>
      {children}
    </SplineContext.Provider>
  );
}
