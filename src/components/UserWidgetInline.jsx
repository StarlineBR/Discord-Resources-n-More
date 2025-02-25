import React from 'react'
import styles from '../css/UserWidgetInline.module.css'
import useThemeContext from '@theme/hooks/useThemeContext'
import Tooltip from "./Tooltip";

export function userAvatar({id, discriminator, avatar}, size=32) {
    const DISCORD_CDN = 'https://cdn.discordapp.com'

    if (avatar) {
        if (avatar.startsWith('a_')) {
            return `${DISCORD_CDN}/avatars/${id}/${avatar}.gif?size=${size}`
        } else {
            return `${DISCORD_CDN}/avatars/${id}/${avatar}.webp?size=${size}`
        }
    } else {
        return `${DISCORD_CDN}/embed/avatars/${parseInt(discriminator ?? id) % 5}.png?size=64`
    }
}

export default function UserWidgetInline({data}) {
    const {isDarkTheme} = useThemeContext();

    return (
        <Tooltip title={data.id} mode="click">
            <span className={styles.container}>
                <span className={styles.widget} style={{backgroundColor: isDarkTheme ? '#2f3136' : '#dadae0'}}>
                        <img src={userAvatar(data)} alt="" className={styles.userAvatar}/>
                        <span className={styles.userTag}>
                            <span className={styles.userUsername}
                                  style={{color: isDarkTheme ? '#fff' : '#000'}}>{data.username ?? 'Unknown User'}</span>
                            <span className={styles.userDiscriminator}>#{data.discriminator ?? '0000'}</span>
                        </span>
                    </span>
            </span>
        </Tooltip>
    )
}