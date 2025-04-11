import { createContext, useContext, useRef, useState, useEffect } from 'react';
import '../Style/Jumpscare.css'
const JumpscareContext = createContext();

export const useJumpscare = () => useContext(JumpscareContext);

export function JumpscareProvider({ children }) {
  const [active, setActive] = useState(false);
  const [image, setImage] = useState(null);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  const scareImages = Array.from({ length: 4 }, (_, i) => `/images/scare${i + 1}.png`);
  const scareSound = '/jumpscares/sound.mp3';

  const triggerJumpscare = () => {
    console.log("triggered");

    const randomImg = scareImages[Math.floor(Math.random() * scareImages.length)];
    setImage(randomImg);
    setActive(true);
    console.log("setimg");
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    timeoutRef.current = setTimeout(() => {
      setActive(false);
      setImage(null);
    }, 2000); // stays for 2 seconds
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <JumpscareContext.Provider value={{ triggerJumpscare }}>
      {children}

      {active && (
        <div className="jumpscare-overlay">
          <img src={image} alt="jumpscare" className="jumpscare-image" />
          <audio ref={audioRef} src={scareSound} />
        </div>
      )}


    </JumpscareContext.Provider>
  );
}
