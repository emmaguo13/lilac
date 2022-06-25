import React from 'react';
import cx from 'classnames';

function Layout({
    isWide = false,
    children,
    className,
    ...props
}) {
    return (
        <main className={cx("layout", className, {
            "layout--wide": isWide
        })} {...props}>
            {children}
        </main>
    );
}

export default Layout;