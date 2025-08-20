import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LevelCard from '../components/learning/LevelCard';
import useLearning from '../hooks/useLearning';

type LevelDef = {
  id: string;
  title: string;
  summary: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
};

const LEVELS: LevelDef[] = [
  { id: 'basics', title: 'Foundations: Money Mindset & Budgeting', summary: 'Understand needs vs wants, set budgets, and build sustainable habits.', difficulty: 'Beginner' },
  { id: 'saving', title: 'Saving Strategies & Emergency Fund', summary: 'How to save effectively, automate savings, and build emergency cushions.', difficulty: 'Beginner' },
  { id: 'debt', title: 'Debt Management & Interest Optimization', summary: 'Tackle high-interest debt, snowball vs avalanche, and refinance considerations.', difficulty: 'Intermediate' },
  { id: 'investing', title: 'Investing Principles & Risk Management', summary: 'Diversification, time in market vs timing, and simple portfolio construction.', difficulty: 'Intermediate' },
  { id: 'lifecycle', title: 'Financial Lifecycle & Big Decisions', summary: 'Major life expenses, mortgages, insurance, and retirement planning basics.', difficulty: 'Advanced' },
  { id: 'taxes', title: 'Taxes & You', summary: 'Filing basics, credits, and common deductions', difficulty: 'Beginner' },
  { id: 'credit', title: 'Credit & Score', summary: 'How credit works and how to improve your score', difficulty: 'Beginner' },
  { id: 'retirement', title: 'Retirement Deep Dive', summary: 'Accounts, sequencing, and withdrawal strategies', difficulty: 'Advanced' },
  { id: 'insurance', title: 'Insurance Essentials', summary: 'Protecting income, health, and property', difficulty: 'Intermediate' },
  { id: 'real_estate', title: 'Real Estate Basics', summary: 'Buying vs renting, mortgages, and costs', difficulty: 'Intermediate' },
  { id: 'entrepreneurship', title: 'Money for Makers', summary: 'Freelance & small-business finance basics', difficulty: 'Intermediate' },
  { id: 'budgeting_advanced', title: 'Advanced Budgeting', summary: 'Zero-based, rolling, and scenario budgets', difficulty: 'Intermediate' },
  { id: 'behavioral_finance', title: 'Behavioral Finance', summary: 'Biases, nudges, and decision architecture', difficulty: 'Advanced' },
  { id: 'investing_advanced', title: 'Investing: Tools & Tactics', summary: 'Tax-loss harvesting, factor tilts, and asset location', difficulty: 'Advanced' },
  { id: 'financial_planning', title: 'Holistic Planning', summary: 'Bringing savings, taxes, investing, and goals together', difficulty: 'Advanced' },
  { id: 'estate_planning', title: 'Estate Basics', summary: 'Wills, beneficiaries, and simple legacy planning', difficulty: 'Intermediate' },
];

export default function Learning() {
  const { get, set, markComplete, getAll } = useLearning();
  const [openId, setOpenId] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const LESSON_SLIDES: Record<string, string[]> = {
    basics: [
      'Why money goals matter: write 3 specific goals (short, medium, long) and assign dates — clarity improves follow-through.',
      'Values & priorities: list what money enables for you (security, freedom, family, learning) and rank them to guide trade-offs.',
      'Income awareness: calculate your true monthly net income after taxes and regular deductions.',
      'Expense mapping: track 30 days of spending and label each item as Need/Want/Save to spot leaks.',
      'Budget framework: pick a rule (50/30/20 or 55/25/20) and translate it into dollar targets for your net income.',
      'Zero-based budgeting: every dollar gets a job. Try one month and refine next month.',
      'Automatic allocation: schedule transfers for savings and bills on payday so decisions happen automatically.',
      'Cutting friction: identify 3 recurring subscriptions and cancel ones you no longer use.',
      'Boosting income: list 2 realistic side-income ideas or ways to ask for a raise this year.',
      'Behavioral nudges: use envelope apps, spending limits, or a 24-hour rule for large purchases.',
      'Emergency buffer: aim for an initial $500–$1,000 to avoid new debt while building the full fund.',
      'Monthly review habit: set one recurring calendar reminder to review budget and progress.',
      'Small experiments: try a 7-day no-eating-out challenge to redirect money to savings.',
      'Account consolidation: consider linking accounts in one dashboard for a clear picture.',
      'Next steps checklist: finalize goals, pick a budget method, automate one transfer, and set a review date.',
    ],
    saving: [
      'Emergency fund ladder: Stage 1 small buffer, Stage 2 three months, Stage 3 six months+ for irregular income.',
      'High-yield parking: use high-yield savings or money market for easy access emergency funds.',
      'Goal buckets: create labeled accounts for short-term goals (vacation), medium (car), long-term (house).',
      'Automate increases: schedule a 1% savings increase quarterly tied to payroll or reminders.',
      'Percent rule: commit a fixed percent of income to savings (e.g., 10%) before deciding on wants.',
      'Tactical splurge plan: allocate a small “fun” pot so cutting back doesn’t feel punitive.',
      'Windfall allocation: split bonuses into Save/Invest/Treat (e.g., 50/30/20).',
      'Interest awareness: compare rates across banks and move funds when yield is significantly higher.',
      'Tax-advantaged staging: for retirement goals, prioritize accounts like 401(k)/IRA and employer match.',
      'Short-term laddering: for mid-term goals, use laddered CDs or short bond funds to reduce volatility.',
      'Penalty awareness: keep emergency funds liquid — avoid tying them to accounts with withdrawal penalties.',
      'Psychology of saving: make progress visible with goal trackers or visual jars.',
      'Micro-saves techniques: round-ups, spare-change apps, and cashback redirecting to savings.',
      'Automation safety net: pair savings automation with a small buffer to prevent overdrafts.',
      'Action plan: set up one new savings bucket and an automated transfer this week.',
    ],
    debt: [
      'Complete debt list: lender, balance, APR, minimum payment, next due date — clarity first.',
      'Payment psychology: choose Snowball for motivation or Avalanche for interest savings and stick to one.',
      'Budget for repayment: allocate a fixed extra amount each month dedicated to debt principal.',
      'Minimums always paid: ensure autopay for minimums to avoid fees and credit hits.',
      'Refinance check: calculate if refinancing or consolidation reduces net interest after fees.',
      'Negotiation script: prepare a simple call script to ask for lower APR or hardship options.',
      'Emergency buffer: keep $500 to avoid new revolving debt during repayment.',
      'Windfall use: apply a portion of bonuses to principal to shorten payoff timelines.',
      'Credit score care: on-time payments and low utilization maintain or improve score.',
      'Avoid debt traps: beware payday loans and high-fee debt consolidators.',
      'Snowball milestone: celebrate each account paid off to reinforce behavior.',
      'Automate acceleration: increase payment by 1–2% when income rises.',
      'Debt vs invest decision: compare after-tax expected investment return vs interest rate on debt to prioritize.',
      'Record progress: maintain a payoff calendar and update payoff dates monthly.',
      'Next step: pick strategy, set an extra monthly payment, and automate it.',
    ],
    investing: [
      'Investing foundations: time in market beats timing; start early and be consistent.',
      'Cost matters: prioritize low-fee funds and understand expense ratios and transaction costs.',
      'Diversification basics: own broad US, international, and bond exposure to reduce idiosyncratic risk.',
      'Asset allocation: pick a target mix that reflects goals and temperament, then automate contributions.',
      'Index funds vs active: index funds offer diversified exposure at low cost; active managers need to beat fees to justify cost.',
      'Tax-aware placement: use tax-advantaged accounts for tax-inefficient assets and taxable accounts for tax-efficient ones.',
      'Dollar-cost averaging: regular contributions smooth entry over volatility.',
      'Rebalancing mechanics: rebalance annually or when drift exceeds a threshold to maintain risk profile.',
      'Risk tolerance test: assess emotional reactions to drawdowns and adjust allocation accordingly.',
      'Compound interest demo: small monthly contributions grow significantly over decades; run a 20-year example.',
      'Avoid market timing: resist buying/selling on headlines; follow plan.',
      'Simplified portfolio: three-fund portfolio (US equity / Intl equity / Bonds) covers most needs.',
      'Retirement planning: contribute to match, then prioritize accounts by tax efficiency.',
      'Behavioral hacks: automate contributions, set rules to add on market dips, and avoid frequent trading.',
      'Action: open or review investment account, pick 2 low-cost funds, and schedule a recurring contribution.',
    ],
    lifecycle: [
      'Life-stage checklist: list upcoming big decisions (home, kids, education, retirement) and timeline for each.',
      'Total cost thinking: for major buys, model total cost of ownership including insurance, maintenance, taxes, and depreciation.',
      'Housing decision framework: rent vs buy decision depends on horizon, transaction costs, and personal preference.',
      'Mortgage basics: fixed vs variable, amortization, and how extra principal payments shorten term.',
      'Insurance priorities: health, disability, and property; choose coverage to avoid catastrophic risk rather than small losses.',
      'Family planning finance: estimate childcare, education, and dependent-related costs and build savings targets.',
      'Retirement planning steps: estimate target income, check projected savings, and close any contribution gaps.',
      'Investment sequencing in retirement: maintain safe short-term bucket, growth long-term bucket, and a plan for withdrawals.',
      'Tax planning basics: understand tax brackets, tax-advantaged accounts, and simple deferral strategies.',
      'Estate basics: will, beneficiaries, durable power of attorney, and a simple document with account details for trusted contacts.',
      'Career transitions: plan runway (6–12 months savings) and evaluate benefits vs salary when changing jobs.',
      'Major purchase timing: use 60/40/20 planning — 60% cash, 40% financed, 20% maintenance and insurance reserve as a thought exercise.',
      'Long-term care awareness: consider options and basic costs as part of lifelong planning.',
      'Review cadence: set an annual financial checkup and a 5-year strategic plan update.',
      'Action plan: document one big decision, run a three-scenario analysis (best/base/worst), and share it with an advisor or trusted friend.',
    ],
    taxes: [
      'Tax filing basics: know your filing status and common forms (W-2, 1099, 1040).',
      'Understand withholding: adjust W-4 to avoid big refunds or surprises at tax time.',
      'Common credits: earned income credit, child tax credit — check eligibility each year.',
      'Deductions overview: standard vs itemized; track mortgage interest, charitable gifts, and medical expenses.',
      'Tax-advantaged accounts: contributions to traditional vs Roth IRAs have different tax timing.',
      'Self-employed taxes: estimate quarterly payments and track deductible business expenses.',
      'Capital gains basics: short-term vs long-term rates and how holding period impacts taxes.',
      'Harvesting losses: use realized losses to offset gains; be mindful of wash-sale rules.',
      'Tax credits vs deductions: credits reduce tax bill dollar-for-dollar; deductions reduce taxable income.',
      'Recordkeeping: keep receipts and simple spreadsheets — it saves time and stress at tax time.',
      'Filing checklist: gather income docs, last year return, and ID numbers before starting.',
      'When to get help: complex returns, rental income, or many 1099s — consider a preparer.',
      'State vs federal: understand key differences and any residency rules for moving states.',
      'Retirement tax planning: Roth conversions, RMDs, and tax-efficient withdrawal sequencing.',
      'Action: pull last year’s return and identify two items you can improve this year (withholding, retirement contributions).',
    ],
    credit: [
      'Credit score basics: payment history, utilization, length, types, and new accounts are key factors.',
      'Monitor reports: check credit reports annually and dispute errors promptly.',
      'Utilization rule: keep revolving utilization under 30% (ideally under 10%) of limits.',
      'On-time payments: they are the single most important driver of score — autopay where possible.',
      'Building credit: use a secured card or become an authorized user to establish history.',
      'Hard vs soft inquiries: soft checks don’t affect score; hard inquiries do for a short time.',
      'Credit mix: having installment and revolving accounts helps but don’t open accounts just for mix.',
      'Closing accounts: be cautious — it can shorten average account age and affect utilization.',
      'Debt consolidation: can help utilization but ensure the new plan reduces interest or simplifies payments.',
      'Credit freezes: useful if identity theft risk is high — easy to lift when needed.',
      'Negotiating errors: contact creditors and bureaus to fix inaccuracies and remove frivolous collections.',
      'Recovery steps: make on-time payments, reduce balances, and avoid new debt to recover after a hit.',
      'Tools: use alerts, free monitoring services, and at least one credit snapshot per year.',
      'Rental & utility reporting: some services can report on-time rent/payments to help build score.',
      'Action: check your credit reports and set autopay for at least one account this week.',
    ],
    retirement: [
      'Retirement needs: estimate desired replacement income and expected expenses in retirement.',
      'Accounts comparison: 401(k), Roth/Traditional IRA, SEP/SIMPLE for self-employed — know the limits.',
      'Employer match: always capture the full match — it’s an immediate return on your contribution.',
      'Contribution cadence: increase contributions with raises or set automatic annual raises.',
      'Safe withdrawal rates: commonly suggested ranges (3–4%) are rules of thumb, not guarantees.',
      'Tax diversification: hold a mix of tax-deferred, tax-free, and taxable buckets for flexibility.',
      'Sequence risk: plan withdrawals to minimize tax spikes and sequence of returns risk.',
      'Social Security basics: timing affects benefit size — learn break-even points.',
      'Healthcare in retirement: Medicare basics and gaps — plan for premiums and supplemental coverage.',
      'Pension decisions: annuitize vs lump sum — weigh longevity, fees, and spouse protections.',
      'Catch-up contributions: available after certain ages — use them if you’re behind.',
      'Rebalancing in retirement: maintain glidepath and safe allocation as spending begins.',
      'Legacy considerations: beneficiary designations and tax consequences for heirs.',
      'Risk tolerance evolves: reduce equity exposure as the need for capital preservation rises.',
      'Action: estimate retirement savings gap and set a 1-year plan to close part of it.',
    ],
    insurance: [
      'Insurance checklist: health, disability, life (if dependents), auto, and property where applicable.',
      'Assess gaps: map your risks and the financial impact if an event occurs.',
      'Disability focus: protects income — consider long-term disability if you rely on wages.',
      'Term life basics: usually cost-effective to protect dependents for a defined period.',
      'Homeowner vs renter: understand what your policy covers and what it doesn’t.',
      'Deductible trade-offs: higher deductibles lower premiums but increase out-of-pocket risk.',
      'Shop periodically: compare quotes every 1–3 years for potential savings.',
      'Bundle discounts: insuring multiple policies with one carrier can reduce costs.',
      'Policy limits: check caps and exclusions that could leave you exposed.',
      'Umbrella policies: inexpensive additional liability coverage for higher-net-worth situations.',
      'Claims process: document losses and know your insurer’s claims timeline.',
      'Insurance as risk transfer: avoid over-insuring small predictable losses; focus on catastrophic protection.',
      'Employer coverage: evaluate employer-sponsored benefits vs private options carefully.',
      'Prevention lowers cost: safety measures (alarms, defensive driving) can reduce premiums.',
      'Action: list your current policies and verify one key coverage limit today.',
    ],
    real_estate: [
      'Rent vs buy: compare 5–7 year horizons including transaction costs, mobility, and preferences.',
      'Total housing cost: include mortgage, taxes, insurance, HOA, maintenance, and opportunity cost.',
      'Down payment planning: 20% avoids PMI for many lenders; smaller down payments increase interest paid.',
      'Mortgage types: fixed vs adjustable and how amortization affects interest vs principal over time.',
      'Buying math: run worst/base/best scenarios including resale and market downturns.',
      'Location matters: schools, commute, and local taxes affect long-term value and quality of life.',
      'Investment property basics: consider cash flow, cap rate, and landlord responsibilities.',
      'Closing costs: budget for 2–5% of purchase price in many markets.',
      'Home inspection: a must — factor repair estimates into offer strategy.',
      'Refinancing rules: break-even point must justify refinancing costs to lower rate/term.',
      'Leverage caution: using debt amplifies returns and losses — size positions to risk tolerance.',
      'Maintenance reserve: plan 1–3% of property value annually for upkeep.',
      'Tax implications: mortgage interest and property taxes may be deductible; consult a tax professional.',
      'Exit strategy: have a plan for selling, renting, or holding through market cycles.',
      'Action: model an example purchase with your numbers and a conservative resale assumption.',
    ],
    entrepreneurship: [
      'Business basics: separate personal and business finances with a dedicated bank account.',
      'Pricing fundamentals: cost + margin + market — don’t underprice your time.',
      'Cash flow focus: forecast inflows/outflows for 12 months to avoid surprises.',
      'Tax structure: understand LLC vs S-corp vs sole proprietorship impacts on tax and liability.',
      'Invoicing & AR: set clear terms and follow-up routines to minimize late payments.',
      'Expense tracking: automated bookkeeping tools reduce errors and speed tax prep.',
      'Emergency runway: aim for 6–12 months of personal and business burn if possible.',
      'Pricing experiments: test packages and offers to find higher-value segments.',
      'Funding options: bootstrap, loans, angel, or grants — each has trade-offs.',
      'Hiring basics: use contractors first to manage fixed cost risk.',
      'Insurance for business: professional liability and business owner policies may be essential.',
      'Retirement for business owners: SEP/SIMPLE/solo 401(k) options can be tax-efficient.',
      'Vendor contracts: read termination and payment terms carefully before signing.',
      'Exit planning: build value by documenting processes and recurring revenue.',
      'Action: create a 3-month cash forecast and a one-page pricing test plan.',
    ],
    budgeting_advanced: [
      'Rolling budgets: keep the next 12 months updated and adjust as real income/expenses arrive.',
      'Scenario planning: build best/base/worst budgets for income uncertainty.',
      'Zero-based budgeting: assign every dollar a job each month.',
      'Envelope methods: virtual envelopes or buckets for discretionary spending.',
      'Expense forecasting: index variable costs to usage (utilities, groceries) rather than flat values.',
      'Smoothing income: for variable income, create a buffer month and average receipts.',
      'Savings rate targets: connect desired net worth timelines to required savings rate.',
      'Budget KPIs: track saving rate, discretionary spend, and subscription churn monthly.',
      'Automation: automate bills, savings, and investment transfers to reduce decision fatigue.',
      'Behavioral nudges: set penalties/rewards (transfer to fun bucket) for sticking to budget.',
      'Reducing friction: use a single app or dashboard to centralize views.',
      'Reforecast cadence: update the plan weekly for the first three months, then monthly.',
      'Shared finances: create transparent rules for partners about joint vs personal spending.',
      'Emergency adaptations: have a rapid 30-day cost-reduction plan for shocks.',
      'Action: convert your current budget to a rolling 3-month forecast.',
    ],
    behavioral_finance: [
      'Common biases: loss aversion, present bias, confirmation bias — recognize your patterns.',
      'Choice architecture: default options and automatons shape better financial behavior.',
      'Mental accounting: labeling money changes spending — leverage it for savings goals.',
      'Pre-commitment devices: use rules that prevent impulsive selling or overspending.',
      'Anchoring effects: beware using listed prices as absolute references for decisions.',
      'Social proof: be cautious of herd behavior in investment trends.',
      'Emotion & markets: feelings drive short-term market moves; separate feelings from plan.',
      'Loss framing: reframe decisions around long-term goals, not short-term pain.',
      'Nudges: automate, default, and simplify choices to reduce reliance on willpower.',
      'Debiasing tactics: implement checklists and cooling-off periods for big financial moves.',
      'Feedback loops: measure outcomes and iteratively improve financial routines.',
      'Sunk cost fallacy: ignore prior irreversible costs and evaluate marginal future decisions.',
      'Information hygiene: limit sources and avoid sensational headlines for financial decisions.',
      'Design your environment: make the easy action the best action (automatic savings).',
      'Action: pick one bias you struggle with and implement a single nudge to counter it this week.',
    ],
    investing_advanced: [
      'Factor investing overview: value, size, momentum, quality — diversification across factors can help.',
      'Tax-loss harvesting: realize losses to offset gains while respecting wash-sale rules.',
      'Asset location: place tax-inefficient assets in tax-advantaged accounts.',
      'Use of options: understand basics and risks before considering covered strategies.',
      'Leveraged products: understand decay and path-dependency before using leveraged ETFs.',
      'Alternative investments: real assets, private equity, and hedge strategies — consider liquidity and fees.',
      'Portfolio tilt: modest tilts toward factors can be implemented via ETFs or funds.',
      'Tracking error: monitor how strategies deviate from benchmarks and why.',
      'Implementation costs: trading costs and bid-ask spreads matter for active tilts.',
      'Due diligence: evaluate managers on process, fees, and track record before investing.',
      'Risk budgeting: allocate risk rather than capital when mixing strategies.',
      'Rebalancing with taxes: use new contributions and tax-aware trades to rebalance when possible.',
      'Leverage caution: use leverage only with clear risk controls and sizing plans.',
      'Action: review one advanced tool and document fee and liquidity implications for your portfolio.',
      'Case study: run a simple backtest or simulation for a small factor tilt over 10 years to see impact.',
    ],
    financial_planning: [
      'Top-down planning: list goals, timeline, and required annual savings for each.',
      'Net worth statement: track assets minus liabilities quarterly to measure progress.',
      'Cash flow projection: forecast income and expenses for the next 12 months.',
      'Insurance & risk review: ensure catastrophic risks are covered before optimizing returns.',
      'Tax strategy alignment: coordinate retirement, gifting, and charitable plans with tax goals.',
      'Investment policy: define target allocation, rebalancing rules, and risk limits.',
      'Education funding: compare 529s, custodial accounts, and scholarship strategies.',
      'Mortgage vs investing analysis: run case analysis for extra principal payments vs investing.',
      'Succession planning: for business owners, document roles and buy-sell agreements.',
      'Behavioral plan: decide in advance how to react to major market moves (sell, buy, or hold).',
      'Liability management: maintain a schedule for refinancing and loan reviews every 2–3 years.',
      'Goal prioritization: rank goals by impact and timeline to allocate capital efficiently.',
      'Advisor checklist: when to get a fiduciary advisor and what to ask in an initial meeting.',
      'Plan updates: set an annual review date and triggers for interim updates (job change, inheritance).',
      'Action: write a one-page plan summarizing goals, top risks, and three next steps.',
    ],
    estate_planning: [
      'Why estate planning matters: it reduces friction for loved ones and preserves intentions.',
      'Beneficiary basics: check and update beneficiaries on retirement and insurance accounts.',
      'Simple will: create a basic will to name executors and guardians if you have dependents.',
      'Trust basics: when trusts help (privacy, probate avoidance, specific distribution rules).',
      'Powers of attorney: assign durable POA for finances and health directives.',
      'Titling matters: joint accounts and TOD/POD designations bypass probate — understand implications.',
      'Small estate rules: many jurisdictions have simplified paths for small estates.',
      'Digital estate: document logins, subscriptions, and access for trusted contacts.',
      'Gifting strategy: annual gift exclusions and tax considerations for gifting.',
      'Charitable giving: donor-advised funds and planned giving strategies.',
      'Legacy letters: non-legal documents that explain values and wishes to heirs.',
      'Updating cadence: review estate documents after major life events.',
      'Professional help: consult an estate attorney for complex assets or cross-border issues.',
      'Action: set up a beneficiary review and create a simple inventory of accounts this week.',
    ],
  };

  // Generate a 2-4 sentence explanatory description for a slide using keyword heuristics.
  const getSlideDesc = (raw: unknown) => {
    if (!raw) return '';
    if (typeof raw !== 'string') return '';

    const lower = raw.toLowerCase();

    const parts: string[] = [];

    const push = (s: string) => { if (s && parts.length < 4) parts.push(s); };

    if (lower.includes('budget') || lower.includes('spend') || lower.includes('income')) {
      push('This slide helps you understand how money flows in and out: start by measuring your real income and tracking 30 days of spending.');
      push('Categorize each expense as a need, want, or saving goal to reveal areas to reduce or reallocate.');
      push('Turn your findings into a simple monthly plan and revisit at the end of the month to improve.');
    } else if (lower.includes('save') || lower.includes('emergency') || lower.includes('high-yield')) {
      push('Focus on building access to cash for short-term shocks: a starter buffer prevents new high-interest debt.');
      push('Use a dedicated high-yield account for emergency savings and automate transfers right after payday.');
      push('Label buckets for specific goals to make saving feel purposeful and track progress visually.');
    } else if (lower.includes('debt') || lower.includes('snowball') || lower.includes('avalanche') || lower.includes('apr')) {
      push('List each debt with balance, APR, and minimum payment so decisions are based on data, not stress.');
      push('Choose a repayment approach: snowball for momentum, avalanche to minimize interest — commit to one.');
      push('Automate minimums and direct extra payments to your target account to ensure consistent progress.');
    } else if (lower.includes('invest') || lower.includes('portfolio') || lower.includes('rebal')) {
      push('Start with low-cost broad funds that match your time horizon; fees compound over decades.');
      push('Set a simple allocation, automate recurring contributions, and rebalance periodically to maintain risk.');
      push('Focus on behavior: consistency and low churn typically outperform frequent market timing.');
    } else if (lower.includes('tax') || lower.includes('filing') || lower.includes('capital gains')) {
      push('Gather income docs and understand which credits or deductions apply to you to avoid surprises.');
      push('Adjust withholding if necessary and consider tax-advantaged accounts to reduce taxable income.');
      push('Keep clear records and consult a preparer for complex situations like rental or self-employment.');
    } else if (lower.includes('credit') || lower.includes('score') || lower.includes('utilization')) {
      push('Payment history and utilization are the largest drivers of credit score — prioritize on-time payments.');
      push('Lower revolving balances and avoid opening unnecessary accounts to maintain a healthy score.');
      push('Regularly check reports for errors and set up monitoring or freezes if you suspect identity theft.');
    } else if (lower.includes('retire') || lower.includes('401') || lower.includes('rmd')) {
      push('Estimate the income you will need and prioritize capturing employer match as an initial step.');
      push('Diversify tax buckets (Roth, pre-tax, taxable) so you have flexibility when withdrawing later.');
      push('Periodically increase contributions and use catch-up options if available to close gaps.');
    } else if (lower.includes('insurance') || lower.includes('disability') || lower.includes('umbrella')) {
      push('Insurance transfers risk — focus on coverages that prevent catastrophic financial loss.');
      push('Compare policies, check limits and deductibles, and update coverages after major life events.');
      push('Document claims processes and keep key policy numbers in an accessible place.');
    } else if (lower.includes('real estate') || lower.includes('mortgage') || lower.includes('down payment')) {
      push('Model total cost of ownership, not just the monthly payment — include taxes, insurance, and maintenance.');
      push('Plan your down payment and closing costs and run worst/base/best resale scenarios before committing.');
      push('Factor in mobility and local market conditions when choosing to rent or buy.');
    } else if (lower.includes('business') || lower.includes('invoice') || lower.includes('cash flow')) {
      push('Separate business and personal finances and keep a short cash forecast to avoid surprises.');
      push('Automate invoicing, track receivables, and prioritize runway to survive slow months.');
      push('Consider simple tax structures and retirement options for business owners early on.');
    } else if (lower.includes('behavioral') || lower.includes('bias') || lower.includes('nudge')) {
      push('Identify one common bias you face and design a specific nudge (automation, default, or cooling off) to counter it.');
      push('Use default rules and automation to make the better choice the easier choice.');
      push('Measure results and iterate — small changes to choice architecture compound over time.');
    } else {
      // generic fallback: restate and recommend an immediate small step
      push('This slide introduces an important concept; focus on one small, concrete action to practice it.');
      push('Try the suggested action for one week, track the outcome, then adjust based on what you learn.');
    }

    return parts.join(' ');
  };


  const handleClose = () => setOpenId(null);

  const handleOpenAndReset = (id: string) => {
    setSlideIndex(0);
    setOpenId(id);
  };

  const handleProgress = (id: string, delta: number) => {
    const current = get(id);
    const next = Math.min(100, Math.max(0, current.progress + delta));
    set(id, next);
    if (next >= 100) markComplete(id);
  };

  return (
    <div className="min-h-[80vh] py-16 pt-23">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Learning — Financial Essentials</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">A modular course broken down into concise, actionable levels. Track your progress and revisit lessons anytime.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Overall Progress</div>
            <div className="mt-2 w-56 h-3 bg-gray-200 dark:bg-dark-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-width" style={{ width: `${Object.values(getAll()).reduce((s, l) => s + l.progress, 0) / Math.max(1, LEVELS.length)}%` }} />
            </div>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS.map((lvl) => (
            <LevelCard
              key={lvl.id}
              id={lvl.id}
              title={lvl.title}
              summary={lvl.summary}
        difficulty={lvl.difficulty}
        progress={get(lvl.id).progress}
        onOpen={handleOpenAndReset}
            />
          ))}
        </div>

        {/* Drawer / modal for lesson content */}
        <AnimatePresence>
          {openId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-6"
            >
              <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

              <motion.div
                initial={{ y: 30, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="relative w-full md:w-7/12 lg:w-8/12 max-h-[80vh] overflow-auto bg-white dark:bg-dark-100 rounded-2xl p-10 shadow-2xl border border-white/10"
              >
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-600 dark:text-gray-300">Close</button>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{LEVELS.find(l => l.id === openId)?.title}</h2>
                <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">{LEVELS.find(l => l.id === openId)?.summary}</p>

                <div className="mt-6">
                  {/* slide area */}
      <div className="min-h-[340px] flex items-start">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${openId}-${slideIndex}`}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -30, opacity: 0 }}
                        transition={{ duration: 0.32 }}
                        className="w-full"
                      >
        <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 leading-relaxed">{LESSON_SLIDES[openId]?.[slideIndex]}</p>
        <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{getSlideDesc(LESSON_SLIDES[openId]?.[slideIndex])}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* pagination & actions */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSlideIndex((s) => Math.max(0, s - 1))}
                        disabled={slideIndex === 0}
                        className="btn btn-ghost"
                      >
                        Prev
                      </button>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Slide {slideIndex + 1} / {LESSON_SLIDES[openId]?.length || 1}</div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          const slides = LESSON_SLIDES[openId] || [];
                          const steps = Math.max(1, slides.length - 1);
                          const inc = slideIndex < (steps) ? Math.floor(80 / steps) : 0;
                          if (inc > 0) handleProgress(openId, inc);
                          if (slideIndex < slides.length - 1) {
                            setSlideIndex((s) => s + 1);
                          } else {
                            // finish: give final credit and close
                            handleProgress(openId, 100);
                            setTimeout(() => handleClose(), 220);
                          }
                        }}
                        className="btn btn-primary"
                      >
                        {slideIndex < ((LESSON_SLIDES[openId]?.length || 1) - 1) ? 'Next' : 'Finish'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
