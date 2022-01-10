import React, { ChangeEventHandler } from 'react';
interface IPhotoInputProps {
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

const PhotoInput: React.FC<IPhotoInputProps> = (props) => {
  return (
    <div style={{ margin: '5px' }}>
      <input type="checkbox" checked={props.checked} onChange={props.onChecked} />
      <input type="file" className="files" />
    </div>
  );
};

export default PhotoInput;
