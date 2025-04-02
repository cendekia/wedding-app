'use client';

import React from 'react';

interface CoupleInfoProps {
  partner1: string;
  partner2: string;
  decorativeElement?: React.ReactNode;
}

const CoupleInfo: React.FC<CoupleInfoProps> = ({
  partner1,
  partner2,
  decorativeElement = <span className="font-serif text-gold text-3xl">&</span>,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl md:text-5xl font-serif font-light tracking-wide mb-2">
        <span className="block md:inline">{partner1}</span>
        <span className="mx-2 md:mx-4 inline-block">{decorativeElement}</span>
        <span className="block md:inline">{partner2}</span>
      </h1>
      <div className="mt-2 md:mt-4">
        <p className="text-lg md:text-xl font-light tracking-wider uppercase">
          Are getting married
        </p>
      </div>
    </div>
  );
};

export default CoupleInfo; 