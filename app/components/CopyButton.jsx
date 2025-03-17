'use client'
import { useState } from 'react';
import { FaCopy } from 'react-icons/fa'

function CopyButton({ url }) {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href + "/" + url)
      .then(() => {
        setCopied(true);
        console.log('URL copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy URL: ', err);
      });
  };

  return (
    <div className='relative'>
      <button onClick={copyUrl}>
        <FaCopy size={20} />
        {copied && (
        <div className="absolute left-10 -top-2 p-2 z-50 bg-slate-500 text-white text-sm rounded w-max border border-gray-400">
          Copied URL!
        </div>
      )}
      </button>
    </div>
  );
}

export default CopyButton;
