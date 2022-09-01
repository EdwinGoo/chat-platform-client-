import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useSelect from "../../hooks/useSelect";
import palette from "../../assets/palette";

const SelectBoxWrapper = styled.div`
  width: ${({ width }) => `${width}`};
`;

const Label = styled.div`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 0.5rem; /* 사이즈 */
    height: 0.5rem; /* 사이즈 */
    border-top: 3px solid ${palette.gray[5]}; /* 선 두께 */
    border-right: 3px solid ${palette.gray[5]}; /* 선 두께 */
    border-radius: 0.125rem;
    cursor: pointer;
    transform: rotate(135deg); /* 각도 */
    top: 13px; /* 기본 0px 값으로 해주세요 */
    right: 20px;
  }
`;

const Select = styled.select`
  padding: 10px 10px;
  font-size: 1rem;
  width: 100%;
  border-radius: 4px;
  appearance: none;
  border: solid 2px ${palette.gray[3]};
  -webkit-appearance: none;
  -moz-appearance: none;
  font-weight: 700;
`;

const SelectItemWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin-top: 0.3rem;
  width: ${({ width }) => `${width}`};
  padding: 0.1rem 0 0.1rem 0;
  border: solid 2px ${palette.gray[3]};
  background-color: white;
  box-sizing: border-box;
`;
const SelectItem = styled.div`
  font-size: 1rem;
  text-align: left;
  font-weight: 400;
  padding: 0.5rem;
  &:hover {
    background-color: ${palette.gray[2]};
    cursor: pointer;
  }
`;

function SelectBox({ options, selectedOption, setSelectedOption, width }) {
  const labelRef = useRef(null);
  const [clickSelectedBox, setClickSelectedBox] = useSelect(labelRef);
  useEffect(() => {}, [clickSelectedBox]);

  const handleOpenSelectBox = (e) => {
    e.preventDefault();
    setClickSelectedBox(true);
  };
  const handleSelectBox = (e, option) => {
    const optionValue = option ? option : e.target.value;
    setSelectedOption(optionValue);
    setClickSelectedBox(false);
  };

  return (
    <>
      <SelectBoxWrapper width={width}>
        <Label ref={labelRef} width={width} onMouseDown={handleOpenSelectBox}>
          <Select value={selectedOption} onChange={handleSelectBox}>
            {options?.map((o) => {
              return (
                <option key={o.id} value={o.value}>
                  {selectedOption.value}
                </option>
              );
            })}
          </Select>
          {clickSelectedBox && (
            <SelectItemWrapper width={width}>
              {options?.map((o) => (
                <SelectItem
                  width={width}
                  key={o.id}
                  value={o.value}
                  onClick={(e) => handleSelectBox(e, o)}
                  // isSelected={option === selectedOption}
                >
                  {o.value}
                </SelectItem>
              ))}
            </SelectItemWrapper>
          )}
        </Label>
      </SelectBoxWrapper>
    </>
  );
}

export default SelectBox;
