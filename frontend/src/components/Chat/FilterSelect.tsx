import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdjustmentsVerticalIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';

type Option = 'agent' | 'consultant' | 'learn';

type Props = {
  id?: string;
  value: Option;
  onChange: (v: Option) => void;
};

export default function FilterSelect({ id, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [placeAbove, setPlaceAbove] = useState(false);

  const options: Option[] = ['agent', 'consultant', 'learn'];

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  // estimate available space and flip if needed
  useEffect(() => {
    function update() {
      if (!buttonRef.current) return setPlaceAbove(false);
      const rect = buttonRef.current.getBoundingClientRect();
      const below = window.innerHeight - rect.bottom;
      const above = rect.top;
      const estimatedHeight = Math.min(240, options.length * 44);
      // prefer below unless not enough space and above has more room
      setPlaceAbove(below < estimatedHeight && above > below);
    }
    if (open) {
      update();
      window.addEventListener('resize', update);
      window.addEventListener('scroll', update, true);
    }
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, options.length]);

  return (
    <div ref={rootRef} className="relative w-20 sm:w-28 z-50">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        id={id}
        onClick={() => setOpen((s) => !s)}
        ref={buttonRef}
        className="flex items-center w-full justify-center gap-1 px-2 sm:px-3 bg-gray-50 dark:bg-dark-300 border border-transparent rounded-none text-left text-xs sm:text-sm"
      >
        {value === 'agent' && (
          <AdjustmentsVerticalIcon className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600 mr-1" />
        )}

        <span className="capitalize truncate">{value}</span>

        <ChevronDownIcon className="h-4 w-4 text-gray-400 ml-1" />

        {/* clear button appears inline when not agent */}
        {value !== 'agent' && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange('agent');
            }}
            aria-label="Clear selection"
            title="Clear selection"
            className="ml-1 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-3 w-3" />
          </button>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: placeAbove ? -6 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placeAbove ? -6 : 6 }}
            transition={{ duration: 0.14 }}
            role="listbox"
            aria-activedescendant={value}
            className={`${placeAbove ? 'absolute left-0 bottom-full mb-1' : 'absolute left-0 mt-1'} w-full bg-white dark:bg-dark-200 border border-gray-200 dark:border-dark-100 rounded shadow-md z-50`}
          >
            {options.map((opt) => (
              <li key={opt} role="option">
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-300 capitalize ${opt === value ? 'font-semibold' : 'font-normal'}`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
