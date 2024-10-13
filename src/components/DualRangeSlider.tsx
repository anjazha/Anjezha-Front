import MultiRangeSlider from "multi-range-slider-react";

interface DualRangeSliderProps {
  min: number;
  max: number;
  onChangeProp: (minVal: number, maxVal: number) => void;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  min,
  max,
  onChangeProp,
}) => {



  return (
    <div dir="ltr">
      <MultiRangeSlider
        min={min || 0}
        max={max || 10000}
        step={10}
        stepOnly={"10"}
        ruler={false}
        canMinMaxValueSame={true}
        thumbLeftColor="blue"
        thumbRightColor="blue"
        barInnerColor="blue"
        style={{ boxShadow: "none", border: "none" }}
        onChange={(e)=>{
          onChangeProp(e.minValue,e.maxValue)
        }}
      />
    </div>
  );
};

export default DualRangeSlider;
