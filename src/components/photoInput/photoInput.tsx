import React, { ChangeEventHandler } from 'react';
interface IRowProps {
  checked: boolean;
  onChecked: ChangeEventHandler;
}

// const Input = () => {
//   return (
//     <div>
//       <input type="file" className="files" />
//     </div>
//   );
// };

const Row: React.FC<IRowProps> = ({ checked, onChecked }) => {
  return (
    <div style={{ margin: '5px' }}>
      <input type="checkbox" checked={checked} onChange={onChecked} />
      <input type="file" className="files" />
    </div>
  );
};

export default Row;
