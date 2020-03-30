import React from "react";
import classnames from "classnames";

function Hero({ children, className, size }: {
    children: React.ReactElement;
    className?: string;
    size: 'large' | 'medium' | 'small';
}) {
    const hero = <div className={
        classnames("App-hero", `App-hero-${size}`, className)
    }>
        {children}
    </div>;

    return hero;
};

export default (Hero);