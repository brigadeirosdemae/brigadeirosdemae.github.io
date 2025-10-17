import React from 'react';

const spinnerStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  border: '4px solid #ccc',
  borderTop: '4px solid #333',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: 'auto',
  display: 'block',
};

const spinnerKeyframes = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;

const Loading: React.FC = () => (
  <>
    <style>{spinnerKeyframes}</style>
    <div style={spinnerStyle} />
  </>
);

export default Loading;