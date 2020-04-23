import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getVideoUrl } from 'store/selectors/videoSelectors';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { changeVideoUrl } from 'store/actions/videoActions';

const Wrapper = styled.label`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
  }
`;
const InputElement = styled.input`
  width: 100%;
  padding: 10px 10px;
  border: none;
  font-size: ${({ theme }) => theme.fs.m};
  background-color: ${({ theme }) => theme.color.black[1]};
  color: ${({ theme }) => theme.color.brand[1]};
`;

export interface InputProps {}

const Input: React.SFC<InputProps> = () => {
  const dispatch = useDispatch();
  const debounceSearch$ = useRef<any>(
    new Subject<string>().pipe(debounceTime(500)),
  );
  const url = useSelector(getVideoUrl());
  const [value, setValue] = useState(url);

  useEffect(() => {
    debounceSearch$.current.subscribe((value: string) =>
      dispatch(changeVideoUrl(value)),
    );
  }, [dispatch]);

  const changeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue(value);

    debounceSearch$.current.next(value);
  };

  return (
    <Wrapper>
      <span className="sr-only">Past your video url:</span>
      <InputElement
        placeholder="Video url"
        value={value}
        onChange={changeInput}
      />
    </Wrapper>
  );
};

export default Input;
