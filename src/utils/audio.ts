
// مشغل الصوت للإجابة الصحيحة
const correctAnswerSound = new Audio('/correct-answer.mp3');

export const playCorrectSound = () => {
  correctAnswerSound.currentTime = 0; // إعادة تعيين الصوت للبداية
  correctAnswerSound.play().catch(() => {
    // تجاهل أي أخطاء في تشغيل الصوت
  });
};
