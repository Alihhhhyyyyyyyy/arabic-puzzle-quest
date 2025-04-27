import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { playCorrectSound } from '@/utils/audio';

interface MemoryPuzzleProps {
  onSolve: () => void;
  difficulty: number;
}

const symbols = ["☀️", "🌙", "⭐", "🌟", "🌈", "🌊", "🔥", "🌪️", "🌱", "🌲", "🌴", "🌵", "🌷", "🌸"];

const MemoryPuzzle: React.FC<MemoryPuzzleProps> = ({ onSolve, difficulty }) => {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  
  useEffect(() => {
    const numPairs = difficulty === 1 ? 4 : difficulty === 2 ? 6 : 8;
    const selectedSymbols = [...symbols].sort(() => 0.5 - Math.random()).slice(0, numPairs);
    const cardArray = [...selectedSymbols, ...selectedSymbols].sort(() => 0.5 - Math.random());
    
    setCards(cardArray);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
  }, [difficulty]);
  
  const handleCardClick = (index: number) => {
    if (flippedIndices.includes(index) || matchedPairs.includes(index)) {
      return;
    }
    
    if (flippedIndices.length === 0) {
      setFlippedIndices([index]);
    } else if (flippedIndices.length === 1) {
      const newFlippedIndices = [...flippedIndices, index];
      setFlippedIndices(newFlippedIndices);
      setMoves(moves + 1);
      
      if (cards[flippedIndices[0]] === cards[index]) {
        const newMatchedPairs = [...matchedPairs, flippedIndices[0], index];
        setMatchedPairs(newMatchedPairs);
        setFlippedIndices([]);
        
        if (newMatchedPairs.length === cards.length) {
          playCorrectSound();
          toast({
            title: "أحسنت!",
            description: `لقد أكملت لعبة الذاكرة في ${moves + 1} محاولات.`,
            variant: "default",
          });
          setTimeout(() => onSolve(), 1500);
        } else {
          toast({
            title: "تطابق!",
            description: "وجدت زوجاً متطابقاً!",
            variant: "default",
          });
        }
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };
  
  const getCardStyle = (index: number) => {
    if (flippedIndices.includes(index) || matchedPairs.includes(index)) {
      return "bg-white text-4xl";
    }
    return "bg-gradient-to-r from-arabic-blue to-arabic-teal text-transparent";
  };
  
  const gridCols = difficulty === 1 ? "grid-cols-4" : "grid-cols-4";
  
  return (
    <div className="puzzle-card p-6 flex flex-col items-center max-w-lg mx-auto animate-scale-in">
      <h2 className="text-xl text-arabic-blue font-bold mb-2">لعبة الذاكرة</h2>
      <Separator className="bg-arabic-gold/30 mb-4" />
      
      <div className="flex justify-between w-full mb-4">
        <p className="text-arabic-maroon font-medium">المحاولات: {moves}</p>
        <p className="text-arabic-blue font-medium">الأزواج: {matchedPairs.length / 2} / {cards.length / 2}</p>
      </div>
      
      <div className={`grid ${gridCols} gap-2 w-full`}>
        {cards.map((symbol, index) => (
          <Button
            key={index}
            className={`h-16 ${getCardStyle(index)} transition-colors duration-300 border border-arabic-gold/20 rounded-lg flex items-center justify-center hover:bg-arabic-gold/10`}
            onClick={() => handleCardClick(index)}
            disabled={flippedIndices.length === 2}
          >
            {flippedIndices.includes(index) || matchedPairs.includes(index) ? symbol : "؟"}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MemoryPuzzle;
