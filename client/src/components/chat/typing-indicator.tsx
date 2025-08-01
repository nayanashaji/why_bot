import Logo from "@/components/ui/logo";

export default function TypingIndicator() {
  return (
    <div className="flex items-start space-x-4 animate-fade-in">
      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
        <Logo size="sm" className="w-6 h-6" />
      </div>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-md px-6 py-4 shadow-lg border border-slate-200">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-typing"></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
