import React, { useState } from 'react'
import styles from "./header.module.scss"
import { Button, Drawer } from 'antd'
import PopOver from './popover';
import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined';
export default function Header() {

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={styles.header}>
                <span><ArrowLeftOutlined /> </span>
                View Audience
            </div>
        </>
    )
}
