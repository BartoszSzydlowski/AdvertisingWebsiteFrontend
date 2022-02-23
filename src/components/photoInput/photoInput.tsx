import React from 'react';
interface IPhotoInputProps {
  checked: boolean;
  onChecked: React.ChangeEventHandler<HTMLInputElement>;
}

const PhotoInput: React.FC<IPhotoInputProps> = props => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChecked}
      />
      <input type="file" className="files form-control form-control-sm" />
    </div>
  );
};

export default PhotoInput;
