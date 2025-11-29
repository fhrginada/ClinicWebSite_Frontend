'use client';

import React from 'react';

const DecorativeShapes = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-24 top-8 w-[620px] h-[620px] rounded-full bg-white/25 blur-3xl opacity-70" />
      <div className="absolute right-10 top-1/2 w-[360px] h-[360px] rounded-[48%] bg-gradient-to-br from-primary-200/50 via-white/10 to-transparent blur-[90px]" />
      <div className="absolute -bottom-20 right-32 w-[320px] h-[320px] border border-white/40 rounded-full opacity-60" />
      <div className="absolute right-1/3 top-1/4 w-[180px] h-[180px] rounded-[42%] bg-white/15 blur-[70px]" />
    </div>
  );
};

export default DecorativeShapes;

