
import React from 'react';
import { Button } from '@/components/ui/button';
import { Puzzle } from "lucide-react";

interface GameHeaderProps {
  score: number;
  level: number;
  resetGame: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ score, level, resetGame }) => {
  return (
    <div className="py-4 px-6 flex flex-col md:flex-row justify-between items-center bg-arabic-sand/50 rounded-xl backdrop-filter backdrop-blur-sm shadow-md mb-6 animate-fade-in">
      <div className="flex items-center mb-4 md:mb-0">
        <Puzzle className="h-8 w-8 text-arabic-maroon mr-2 animate-bounce-light" />
        <h1 className="text-3xl arabic-title">ألغاز عربية</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 bg-white/70 rounded-lg shadow-inner border border-arabic-gold/20">
          <span className="text-arabic-maroon font-bold">النقاط: </span>
          <span className="text-arabic-blue font-bold">{score}</span>
        </div>
        
        <div className="px-4 py-2 bg-white/70 rounded-lg shadow-inner border border-arabic-gold/20">
          <span className="text-arabic-maroon font-bold">المستوى: </span>
          <span className="text-arabic-blue font-bold">{level}</span>
        </div>
        
        <Button 
          onClick={resetGame}
          variant="outline" 
          className="border-arabic-gold text-arabic-maroon hover:bg-arabic-gold/10"
        >
          إعادة اللعبة
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;
