import React, { useState } from 'react';
import styles from './Payoutbutton.module.css';
import EthereumLogo from '../public/Ethereum_logo.svg';
import Image from 'next/image';
import  {payout}  from '~~/components/Dashboardprofile';

interface PayoutButtonProps {
  isConnected: boolean;
  payoutBalance: number | undefined;
}

const Payoutbutton = ({isConnected, payoutBalance }: PayoutButtonProps) => {
  const [dollars, setDollars] = useState<{ id: number; left: number }[]>([]);

  const createDollar = () => {
    const newDollar = {
      id: Math.random(),
      left: Math.random() * 100, // Random position for variety
    };
    setDollars(prev => [...prev, newDollar]);
    // Remove dollar after animation
    setTimeout(() => {
      setDollars(prev => prev.filter(d => d.id !== newDollar.id));
    }, 1000);
  };

  return (
    <div className={styles.buttonContainer}>
      <button 
        className={styles.payoutButton}
        onClick={() => {
            createDollar()
            payout()
        }}
      >
        Payout: {payoutBalance ? payoutBalance / 1000000000000000000 : 0} ETH
      </button>
      {dollars.map(dollar => (
        <div
          key={dollar.id}
          className={styles.dollar}
          style={{ left: `${dollar.left}%` }}
        >
          <Image 
            src={EthereumLogo} 
            alt="ETH" 
            className={styles.ethereumIcon}
            width={24}
            height={24}
          />
        </div>
      ))}
    </div>
  );
};

export default Payoutbutton;