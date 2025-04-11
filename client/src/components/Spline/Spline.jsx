import React from 'react';
import { useSpline } from '../../context/splinecontext';

export default function SplineComp() {
  const {
    canvasRef,
    tooltipContainerRef,
    modalRef,
    modalContentRef,
    closeModal
  } = useSpline();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Spline Canvas */}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

      {/* Tooltip Container */}
      <div
        ref={tooltipContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      

      {/* Modal */}
      <div
        ref={modalRef}
        style={{
          display: 'none',
          position: 'absolute',
          zIndex: 20,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.9)',
          color: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 0 15px black',
        }}
      >
        <div ref={modalContentRef} />
        <button
          onClick={closeModal}
          style={{
            marginTop: '1rem',
            background: 'red',
            border: 'none',
            padding: '0.5rem 1rem',
            color: 'white',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
