import React from 'react';

interface JoinNowButtonProps {
    extraClasses?: string,
}

const JoinNowButton: React.FC<JoinNowButtonProps> = ({ extraClasses }) => {
    return (
        <button className={`homeButton ${extraClasses}`}>Join Now</button>
    );
}

export default JoinNowButton;