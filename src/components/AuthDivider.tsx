import React from 'react';

interface AuthDividerProps {
  text?: string;
  className?: string;
}

const AuthDivider: React.FC<AuthDividerProps> = ({ text = "OR", className = "" }) => {
  return (
    <div className={`relative flex items-center py-6 ${className}`} id="auth-divider">
      <div className="flex-grow border-t border-black/10" id="auth-divider-line-left"></div>
      <span className="flex-shrink mx-4 text-black/40 font-bold uppercase tracking-widest text-[10px]" id="auth-divider-text">
        {text}
      </span>
      <div className="flex-grow border-t border-black/10" id="auth-divider-line-right"></div>
    </div>
  );
};

export default AuthDivider;
