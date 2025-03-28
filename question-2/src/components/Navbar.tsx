import { NavLink } from 'react-router-dom';
import { NUMBER_TYPE_LABELS, NumberType } from '@/types';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const numberTypes: NumberType[] = ['p', 'f', 'e', 'r'];

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex gap-4">
        {numberTypes.map((type) => (
          <NavLink
            key={type}
            to={`/numbers/${type}`}
            className={({ isActive }) =>
              `text-white ${isActive ? 'font-bold' : ''}`
            }
          >
            <Button variant={type === 'e' ? 'default' : 'ghost'}>
              {NUMBER_TYPE_LABELS[type]}
            </Button>
          </NavLink>
  ))}
      </div>
    </nav>
  );
}
