import { useState, useEffect } from 'react';
import styles from '@/styles/Header/CountDown.module.css';

interface CountDownProps {
  initialTime: string;
}

const CountDown: React.FC<CountDownProps> = ({ initialTime }) => {
  const [time, setTime] = useState<string>(initialTime);

  useEffect(() => {
    const [initialHours, initialMinutes, initialSeconds] = initialTime.split(':');
    let hours = parseInt(initialHours);
    let minutes = parseInt(initialMinutes);
    let seconds = parseFloat(initialSeconds);

    const interval = setInterval(() => {
      if (seconds <= 0) {
        if (minutes <= 0) {
          if (hours <= 0) {
            clearInterval(interval);
          } else {
            hours -= 1;
            minutes = 59;
            seconds = 59.99;
          }
        } else {
          minutes -= 1;
          seconds = 59.99;
        }
      } else {
        seconds -= 0.01;
      }

      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;

      setTime(formattedTime);
    }, 10);

    return () => clearInterval(interval);
  }, [initialTime]);

  return( 
    <div className={styles.wrap}>
        <div className={styles.time}>{time}</div>
    </div>
  );
};

export default CountDown;
