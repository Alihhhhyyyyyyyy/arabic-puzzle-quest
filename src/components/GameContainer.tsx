
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import GameHeader from './GameHeader';
import WordPuzzle from './WordPuzzle';
import PatternPuzzle from './PatternPuzzle';
import MemoryPuzzle from './MemoryPuzzle';

const puzzleTypes = ['word', 'pattern', 'memory'];

const GameContainer: React.FC = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [puzzleType, setPuzzleType] = useState<string>('');
  const { toast } = useToast();
  
  // اختيار نوع اللغز بشكل عشوائي
  useEffect(() => {
    const randomType = puzzleTypes[Math.floor(Math.random() * puzzleTypes.length)];
    setPuzzleType(randomType);
  }, [level]);
  
  const handlePuzzleSolve = () => {
    // زيادة النقاط
    const newScore = score + (level * 10);
    setScore(newScore);
    
    // التقدم للمستوى التالي
    if (level < 3) {
      setLevel(level + 1);
      toast({
        title: "مستوى جديد!",
        description: `أحسنت! لقد تقدمت إلى المستوى ${level + 1}.`,
        variant: "default",
      });
    } else {
      // أكمل اللعبة
      toast({
        title: "تهانينا!",
        description: `لقد أكملت جميع المستويات! النتيجة النهائية: ${newScore}`,
        variant: "default",
      });
      
      setTimeout(() => {
        resetGame();
      }, 2000);
    }
  };
  
  const resetGame = () => {
    setScore(0);
    setLevel(1);
    const randomType = puzzleTypes[Math.floor(Math.random() * puzzleTypes.length)];
    setPuzzleType(randomType);
    
    toast({
      title: "لعبة جديدة",
      description: "تم إعادة تعيين اللعبة. حظاً موفقاً!",
      variant: "default",
    });
  };
  
  // عرض نوع اللغز المناسب
  const renderPuzzle = () => {
    switch (puzzleType) {
      case 'word':
        return <WordPuzzle onSolve={handlePuzzleSolve} difficulty={level} />;
      case 'pattern':
        return <PatternPuzzle onSolve={handlePuzzleSolve} difficulty={level} />;
      case 'memory':
        return <MemoryPuzzle onSolve={handlePuzzleSolve} difficulty={level} />;
      default:
        return <div>جاري تحميل اللغز...</div>;
    }
  };
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-6">
      <GameHeader score={score} level={level} resetGame={resetGame} />
      
      <div className="relative z-10">
        {renderPuzzle()}
      </div>
    </div>
  );
};

export default GameContainer;
