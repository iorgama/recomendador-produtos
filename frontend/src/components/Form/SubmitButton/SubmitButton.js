import React from 'react';

function SubmitButton({ text, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-700'
      } w-full text-white font-bold py-2 px-4 rounded`}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
