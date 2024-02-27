// Popup.tsx
import React from 'react';

// Define a type for the position prop
interface Position {
    x: number;
    y: number;
}

// Define a type for the props
interface PopupProps {
    position: Position;
    onClose: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ position, onClose, children }) => {
    // Style for the popup container
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
        bottom: `${position.y}px`,
        left: `${position.x}px`,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        zIndex: 1000,
    };

    return (
        <div style={containerStyle}>
            <div>{children}</div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Popup;
