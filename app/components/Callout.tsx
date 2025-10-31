// components/Callout.tsx
import { ReactNode } from 'react';
import { Info } from 'lucide-react';

interface CalloutProps {
  type?: 'info';
  children: ReactNode;
}

const Callout = ({ children, type = 'info' }: CalloutProps) => {
  const baseClasses = 'my-6 flex items-start rounded-md border p-4';
  const typeClasses = {
    info: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="mr-4">
        {type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
      </div>
      <div className="prose-p:m-0">{children}</div>
    </div>
  );
};

export default Callout;
