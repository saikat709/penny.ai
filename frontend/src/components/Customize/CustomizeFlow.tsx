import { useState } from 'react';
import ChoiceCard from './ChoiceCard';
import InputField from './InputField';
import RememberList from './RememberList';
import { motion } from 'framer-motion';

type Values = {
  [k: string]: string | string[] | undefined;
  attitude: string;
  voice: string;
  remember: string[];
  about: string;
  income: string;
  incomeType: string;
  autoAddSalary: string;
  additional?: string;
};

type Step = {
  id: keyof Values | 'additional';
  title: string;
  type: 'choice' | 'input';
  options?: string[];
};

export default function CustomizeFlow() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    attitude: 'friendly',
    voice: 'female',
    remember: [],
    about: '',
    income: '',
    incomeType: 'monthly',
    autoAddSalary: 'i will tell',
  });

  const steps: Step[] = [
    { id: 'attitude', title: 'Choose attitude', type: 'choice', options: ['friendly', 'professional', 'playful'] },
    { id: 'voice', title: 'Voice', type: 'choice', options: ['female', 'male', 'neutral'] },
    { id: 'remember', title: "Things to remember", type: 'input' },
    { id: 'about', title: 'About you', type: 'input' },
    { id: 'income', title: 'Income', type: 'input' },
    { id: 'incomeType', title: 'Income type', type: 'choice', options: ['monthly', 'yearly', 'weekly', 'daily'] },
    { id: 'autoAddSalary', title: 'Auto add salary?', type: 'choice', options: ['add', "i'll tell"] },
    { id: 'additional', title: 'Additional info', type: 'input' },
  ];

  const s = steps[step];

  const setVal = (k: keyof Values, v: string) => setValues((c) => ({ ...c, [k]: v }));
  const getVal = (k: keyof Values | 'additional') => {
    if (k === 'additional') return values.additional || '';
  return values[k as string] ?? '';
  };

  const progress = Math.round(((step + 1) / steps.length) * 100);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Customize your Penny agent</h2>
        <p className="text-sm text-gray-500">Make the assistant feel like yours — choose attitude, voice & remember things.</p>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-100 dark:bg-dark-200 rounded-full h-2 overflow-hidden">
          <div style={{ width: `${progress}%` }} className="h-2 bg-primary-500 transition-all" />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <div>Step {step + 1} of {steps.length}</div>
          <div>{progress}%</div>
        </div>
        <div className="text-lg font-semibold mt-3">{s.title}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {s.type === 'choice' ? (
          (s.options ?? []).map((opt) => {
            const isActive = typeof s.id === 'string' && (getVal(s.id as keyof Values) === opt);
            return <ChoiceCard key={opt} label={opt} active={isActive} onClick={() => { if (s.id !== 'additional') setVal(s.id as keyof Values, opt); }} />;
          })
        ) : (
              <div className="md:col-span-3">
                {s.id === 'additional' ? (
                  <InputField label={s.title} value={values.additional || ''} onChange={(v) => setValues((c) => ({ ...c, additional: v }))} placeholder="Any extra info..." />
                ) : s.id === 'remember' ? (
                  // Remember is a list of strings
                  <div>
                    {/* lazy import component usage */}
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <RememberList value={values.remember || []} onChange={(v: string[]) => setValues((c) => ({ ...c, remember: v }))} />
                  </div>
                ) : (
                  <InputField label={s.title} value={getVal(s.id as keyof Values)} onChange={(v) => setVal(s.id as keyof Values, v)} placeholder="Type here..." />
                )}
              </div>
            )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div>
          {step > 0 && <button onClick={() => setStep(step - 1)} className="btn btn-secondary mr-2">Back</button>}
          {step < steps.length - 1 && <button onClick={() => setStep(step + 1)} className="btn btn-primary">Next</button>}
        </div>

        {step === steps.length - 1 && (
          <div>
            <button className="btn btn-primary" onClick={() => alert(JSON.stringify(values, null, 2))}>Finish</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
