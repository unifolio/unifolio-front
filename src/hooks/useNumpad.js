import React, {forwardRef, useState, useEffect} from 'react'
import { Input } from 'antd';

const useNumpad = forwardRef((Input, ref) => {
  const [value, setValue] = useState(null);
  const $Input = useRef(null);

  return (
    <Input ref={$Input}/>
  )
  const renderInput = () => {
    <Input ref={$Input}/>
  }

  return [ renderInput]
})

export default useNumpad
