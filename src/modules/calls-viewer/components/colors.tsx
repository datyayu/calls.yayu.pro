import * as React from "react";

interface ColorsProps {
  image: string;
  display: boolean;
  colors: Array<string>;
}

interface ColorListProps {
  colors: Array<string>;
}

const ColorList = ({ colors }: ColorListProps) =>
  colors.length === 0 ? (
    <span>None</span>
  ) : (
    <div className="colors-list">
      {colors.map(color => (
        <div className="colors-item" style={{ background: color }} />
      ))}
    </div>
  );

export const Colors = ({ image, colors, display }: ColorsProps) => {
  const displayClass = display ? "colors active" : "colors";

  return (
    <div className={displayClass}>
      <h4>Must-have colors</h4>
      <ColorList colors={colors} />

      <h4>Recommended KB</h4>
      <img src={image} alt="kb colors" className="colors-image" />
    </div>
  );
};
