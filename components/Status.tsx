import React from 'react';

interface Props {
  label: string;
  value: string | number | undefined | null;
}

export default function Status({ label, value }: Props) {
  return (
    <div className="flex items-center">
      <p className="flex-1 text-sm text-cyan-50">{label}</p>
      <p className="font-semibold text-cyan-50" >{value}</p>
    </div>
  );
}
