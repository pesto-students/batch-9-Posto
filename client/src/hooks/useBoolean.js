import { useState } from 'react';

const useBoolean = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = () => setValue(!value);

  return [value, onChange];
};

export default useBoolean;
