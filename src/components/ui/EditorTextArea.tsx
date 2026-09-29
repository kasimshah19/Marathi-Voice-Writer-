const DEFAULT_TEXT = `आज मला पुण्याला जायचं आहे.\nत्यासाठी मी सकाळी लवकर निघणार आहे.\nतिथे कोर्टात एक महत्वाची सुनावणी आहे. सर्व कागदपत्रे मी तयार करून घेतली आहेत.`;

export function EditorTextArea() {
  return (
    <div className="mx-4 mt-5 bg-white rounded-2xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all h-[280px] overflow-hidden">
      <textarea 
        className="w-full h-full p-4 text-[18px] text-slate-900 resize-none outline-none bg-transparent"
        style={{ lineHeight: 1.75 }}
        aria-label="दस्तऐवजाचा मजकूर"
        defaultValue={DEFAULT_TEXT}
      />
    </div>
  );
}
