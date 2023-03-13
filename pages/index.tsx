import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Image from '../components/Image'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // console.log(process.env)
  let imageDirectory = "/data/Vandalur_NDVI";

  const mapGenerator = () => {
    let imagesLinks = []
    for(let i = 0; i < 400; i++){
      imagesLinks.push([imageDirectory+"/filename_"+i+".png",i]);
    }
    return imagesLinks;
  }


  const [values, setValues] = useState<number[]>([]);
  const [imageLinks, setImageLinks] = useState(mapGenerator());
  const [currentSectionHover, setCurrentSectionHover] = useState<number>(0);

  useEffect(() => {
    fetch("/data/Vandalur_NDVI_Data.csv").then(data => data.text()).then(txt => {
      setValues(txt.split(",").map(n => Number(n)));
      console.log(values);
    });
  },[])

  // useEffect(() => {
  //   console.log(currentSectionHover)
  //   console.log(imageLinks)
  // },[currentSectionHover])

  return (
    <>
      <Head>
        <title>Land utilization Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.stats}>
        <span>Current Value: </span><span>{values[currentSectionHover]}</span>
      </div>
      <main className={styles.main}>
        {imageLinks.map(link => <Image src={link[0]} className={styles.imageContainer} key={Number(link[1])} setHoverIndex={setCurrentSectionHover} index={Number(link[1])}/>)}
      </main>
    </>
  )
}