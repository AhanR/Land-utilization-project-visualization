import React from 'react'
import styles from '../styles/Home.module.css'

export default function Image(props: any) {
  return (
    <div
    className={props.className}
    onMouseEnter={() => {
      props.setHoverIndex(Number(props.index))
    }}
    >
      <img src={props.src} className={styles.image}/>
    </div>
  )
}
