
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

interface WordPuzzleProps {
  onSolve: () => void;
  difficulty: number;
}

// قائمة بالألغاز لكل مستوى صعوبة
const puzzles = {
  1: [
    { question: "بيت ليس فيه أبواب ولا نوافذ، فما هو؟", answer: "البيضة" },
    { question: "ما هو الشيء الذي يكون أخضر في الأرض وأسود في السوق وأحمر في البيت؟", answer: "الشاي" },
    { question: "ما هو الشيء الذي يسير بلا قدمين ويدخل بلا إذن؟", answer: "الهواء" },
  ],
  2: [
    { question: "ما هو الشيء الذي كلما أخذت منه كبر؟", answer: "الحفرة" },
    { question: "شيء يُرى في الليل ثلاث مرات وفي النهار مرة واحدة، ما هو؟", answer: "حرف اللام" },
    { question: "ينبض بلا قلب ويركض بلا أقدام، فما هو؟", answer: "الساعة" },
  ],
  3: [
    { question: "أخوان يلتقيان كل يوم، ولكنهما لا يتعرفان على بعضهما البعض، من هما؟", answer: "الشمس والقمر" },
    { question: "ما هو الشيء الذي إذا لمسته صرخ؟", answer: "الجرس" },
    { question: "معك يمشي ومع الريح لا يمشي، ما هو؟", answer: "الظل" },
  ]
};

const WordPuzzle: React.FC<WordPuzzleProps> = ({ onSolve, difficulty }) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [answer, setAnswer] = useState('');
  const [hints, setHints] = useState(0);
  const [message, setMessage] = useState('');
  
  // اختيار لغز عشوائي من المستوى الحالي
  useEffect(() => {
    const puzzleIndex = Math.floor(Math.random() * puzzles[difficulty as keyof typeof puzzles].length);
    setCurrentPuzzle(puzzleIndex);
    setAnswer('');
    setHints(0);
    setMessage('');
  }, [difficulty]);
  
  const currentPuzzleData = puzzles[difficulty as keyof typeof puzzles][currentPuzzle];
  
  const handleSubmit = () => {
    const correctAnswer = currentPuzzleData.answer;
    
    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      toast({
        title: "إجابة صحيحة!",
        description: "أحسنت! لقد حللت اللغز بنجاح.",
        variant: "default",
      });
      onSolve();
    } else {
      setMessage('حاول مرة أخرى!');
      toast({
        title: "إجابة خاطئة",
        description: "حاول مرة أخرى!",
        variant: "destructive",
      });
    }
  };
  
  const getHint = () => {
    const correctAnswer = currentPuzzleData.answer;
    if (hints < 2) {
      const hintIndex = Math.floor(hints * correctAnswer.length / 2);
      let hintText = '';
      
      if (hints === 0) {
        hintText = `أول حرف من الإجابة هو: ${correctAnswer[0]}`;
      } else {
        hintText = `الحرف التالي هو: ${correctAnswer[hintIndex]}`;
      }
      
      toast({
        title: "تلميح",
        description: hintText,
        variant: "default",
      });
      
      setHints(hints + 1);
    } else {
      toast({
        title: "لا مزيد من التلميحات",
        description: "لقد استخدمت جميع التلميحات المتاحة!",
        variant: "default",
      });
    }
  };
  
  return (
    <div className="puzzle-card p-6 flex flex-col items-center max-w-lg mx-auto animate-scale-in">
      <h2 className="text-xl text-arabic-blue font-bold mb-2">لغز الكلمات</h2>
      <Separator className="bg-arabic-gold/30 mb-4" />
      
      <div className="bg-arabic-sand/30 rounded-lg p-4 w-full mb-4 min-h-[100px] flex items-center justify-center">
        <p className="text-center text-lg font-medium">{currentPuzzleData.question}</p>
      </div>
      
      <div className="w-full mb-6">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="اكتب إجابتك هنا..."
          className="w-full p-3 border border-arabic-gold/30 rounded-lg focus:ring-2 focus:ring-arabic-gold focus:outline-none text-right"
          dir="rtl"
        />
      </div>
      
      {message && (
        <div className="w-full mb-4 text-center text-arabic-maroon font-bold">
          {message}
        </div>
      )}
      
      <div className="flex flex-wrap gap-3 justify-center">
        <Button 
          onClick={handleSubmit}
          className="puzzle-button bg-arabic-blue hover:bg-arabic-blue/90"
        >
          تحقق من الإجابة
        </Button>
        
        <Button 
          onClick={getHint}
          variant="outline" 
          className="border-arabic-teal text-arabic-teal hover:bg-arabic-teal/10"
          disabled={hints >= 2}
        >
          احصل على تلميح ({2 - hints})
        </Button>
      </div>
    </div>
  );
};

export default WordPuzzle;
