import React from "react";
import classnames from "classnames";
export function Hero({ children, className, size }: {
    children: React.ReactElement;
    className?: string;
    size: 'large' | 'medium' | 'small';
}) {
    return <div className={
        classnames("App-hero", `App-hero-${size}`, className)
    }>{children}</div>;
}
