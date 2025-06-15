import React from "react";
import classNames from "classnames";
import styles from "./Text.module.scss";

interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  fw?: string;
  center?: boolean;
  color?: string;
  ellipsis?: boolean;
  type?: string;
  align?: "start" | "center" | "end";
}

const TextDefault: React.FC<IProps> = ({
  children,
  center,
  className,
  color,
  type = "R20",
  align = "start",
  ellipsis = false,
  ...rest
}) => {
  const mergedClassName = classNames(
    styles.Text,
    styles[type as keyof typeof styles],
    {
      [styles["text-center"]]: center,
      [styles[`color-${color}`]]: !!color && styles[`color-${color}`],
    },
    className
  );

  const customStyle: React.CSSProperties = {
    textAlign: align,
    ...(ellipsis && {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "inline-block",
      maxWidth: "100%", 
    }),
  };

  return (
    <span
      className={mergedClassName}
      style={customStyle}
      {...rest}
    >
      {children}
    </span>
  );
};

export default TextDefault;
