
import React from 'react';
import GameContainer from '@/components/GameContainer';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* خلفية زخرفية */}
      <div className="fixed inset-0 arabic-pattern -z-10"></div>
      
      {/* زخرفة هندسية */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-arabic-gold opacity-10 rounded-full blur-3xl -z-5"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-arabic-blue opacity-10 rounded-full blur-3xl -z-5"></div>
      
      {/* محتوى اللعبة */}
      <GameContainer />
      
      {/* تذييل الصفحة */}
      <footer className="text-center py-4 text-gray-500 text-sm mt-8">
        <p>ألغاز عربية - لعبة ألغاز بتصميم عربي</p>
      </footer>
    </div>
  );
};

export default Index;
