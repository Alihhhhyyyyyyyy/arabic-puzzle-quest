
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

interface PatternPuzzleProps {
  onSolve: () => void;
  difficulty: number;
}

// أنماط اللغز حسب مستوى الصعوبة
const patterns = {
  1: [
    { sequence: ["🔴", "🔵", "🔴", "🔵", "?"], answer: "🔴" },
    { sequence: ["🔺", "🔻", "🔺", "🔻", "?"], answer: "🔺" },
    { sequence: ["🔶", "🔷", "🔶", "?"], answer: "🔷" },
  ],
  2: [
    { sequence: ["🌕", "🌔", "🌓", "🌒", "?"], answer: "🌑" },
    { sequence: ["1", "3", "5", "7", "?"], answer: "9" },
    { sequence: ["ب", "ت", "ث", "?"], answer: "ج" },
  ],
  3: [
    { sequence: ["1", "2", "4", "8", "?"], answer: "16" },
    { sequence: ["ا", "ب", "د", "ح", "?"], answer: "ط" },
    { sequence: ["2", "3", "5", "9", "17", "?"], answer: "33" },
  ]
};

const options = {
  1: [
    ["🔴", "🔵", "🟡", "🟢"],
    ["🔺", "🔻", "◼️", "⚪"],
    ["🔶", "🔷", "🟥", "🟦"],
  ],
  2: [
    ["🌑", "🌘", "🌗", "🌖"],
    ["9", "11", "6", "8"],
    ["ج", "ح", "خ", "د"],
  ],
  3: [
    ["16", "15", "12", "10"],
    ["ط", "ظ", "ع", "غ"],
    ["33", "32", "29", "24"],
  ]
};

const PatternPuzzle: React.FC<PatternPuzzleProps> = ({ onSolve, difficulty }) => {
  const [currentPattern, setCurrentPattern] = useState(0);
  const [selected, setSelected] = useState('');
  
  // اختيار نمط عشوائي من المستوى الحالي
  useEffect(() => {
    const patternIndex = Math.floor(Math.random() * patterns[difficulty as keyof typeof patterns].length);
    setCurrentPattern(patternIndex);
    setSelected('');
  }, [difficulty]);
  
  const currentPatternData = patterns[difficulty as keyof typeof patterns][currentPattern];
  const currentOptions = options[difficulty as keyof typeof options][currentPattern];
  
  const handleSelect = (option: string) => {
    setSelected(option);
    
    if (option === currentPatternData.answer) {
      toast({
        title: "إجابة صحيحة!",
        description: "أحسنت! لقد وجدت النمط الصحيح.",
        variant: "default",
      });
      
      setTimeout(() => {
        onSolve();
      }, 1000);
    } else {
      toast({
        title: "إجابة خاطئة",
        description: "هذا ليس النمط الصحيح. حاول مرة أخرى!",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="puzzle-card p-6 flex flex-col items-center max-w-lg mx-auto animate-scale-in">
      <h2 className="text-xl text-arabic-blue font-bold mb-2">لغز الأنماط</h2>
      <Separator className="bg-arabic-gold/30 mb-4" />
      
      <div className="bg-arabic-sand/30 rounded-lg p-4 w-full mb-6">
        <p className="text-center mb-2 font-medium">ما هو الرمز التالي في هذا النمط؟</p>
        <div className="flex justify-center items-center gap-4 text-3xl p-2">
          {currentPatternData.sequence.map((item, index) => (
            <div 
              key={index}
              className={`w-12 h-12 flex items-center justify-center ${
                item === '?' ? 'bg-arabic-blue/10 border-2 border-dashed border-arabic-blue rounded-lg' : ''
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mb-4">
        {currentOptions.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleSelect(option)}
            className={`text-2xl h-14 ${
              selected === option ? 'bg-arabic-gold text-white' : 'bg-white text-arabic-blue'
            } border border-arabic-gold/30 hover:bg-arabic-gold/20 hover:border-arabic-gold`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PatternPuzzle;
