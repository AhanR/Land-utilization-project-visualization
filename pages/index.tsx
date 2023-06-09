import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Image from '../components/Image'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

class Data {
  values = {
    "Vandalur_NDVI_Data": "",
    "Vandalur_NDBI_Data": "" ,
    "Vandalur_LULC_Data" : "" ,
    "Vandalur_LST_Data": "" ,
    "Vandalur_Census_2001_Data": "" ,
    "Vandalur_Rural_Urban_Data" : "" ,
  }

  // set(key: DataAttributes, value : string) {
  //   this.values[key] = value;
  // }
}

enum DataAttributes {
  ndvi = "Vandalur_NDVI_Data",
  ndbi = "Vandalur_NDBI_Data",
  lulc = "Vandalur_LULC_Data",
  lst = "Vandalur_LST_Data",
  cencus ="Vandalur_Census_2001_Data",
  demographic = "Vandalur_Rural_Urban_Data"
}

export default function Home() {

  // console.log(process.env)
  let imageDirectory = "/data/Vandalur_NDVI";

  const mapGenerator = () => {
    let imagesLinks = []
    for(let i = 0; i < 400; i++){
      imagesLinks.push([imageDirectory+"/"+('000'+i).slice(-4)+".png",i]);
    }
    return imagesLinks;
  }


  const [values, setValues] = useState<Array<Data>>(new Array<Data>(400));
  const [imageLinks, setImageLinks] = useState(mapGenerator());
  const [currentSectionHover, setCurrentSectionHover] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  const data = [DataAttributes.cencus, DataAttributes.demographic, DataAttributes.lst, DataAttributes.lulc, DataAttributes.ndbi, DataAttributes.ndvi]

  useEffect(() => {

    for(let i = 0; i < data.length; i++) {
      let dataFile : DataAttributes = data[i];
      fetch("/data/ProcessedData/"+dataFile+".csv").then(data => data.text()).then(txt => {
        const newData: Array<string> = txt.replace("'","").split(",");
        let dataClone = values;
        for(let i = 0; i < values.length; i++) {
          if(dataClone[i] === undefined) dataClone[i] = new Data()
          dataClone[i].values[dataFile] = newData[i];
        }
        setValues(dataClone);
      });
    }

    setLoaded(true);

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
        <span>{DataAttributes.ndvi}: </span><span>{`${values[currentSectionHover]&&values[currentSectionHover].values[DataAttributes.ndvi]}`}</span>
        <span>{DataAttributes.ndbi}: </span><span>{`${values[currentSectionHover]&&values[currentSectionHover].values[DataAttributes.ndbi]}`}</span>
        <span>{DataAttributes.lst}: </span><span>{`${values[currentSectionHover]&&values[currentSectionHover].values[DataAttributes.lst]}`}</span>
        <span>{DataAttributes.lulc}: </span><span>{`${values[currentSectionHover]&&values[currentSectionHover].values[DataAttributes.lulc]}`}</span>
        <span>{DataAttributes.cencus}: </span><span>{`${values[currentSectionHover]&&values[currentSectionHover].values[DataAttributes.cencus]}`}</span>
        <span>{DataAttributes.demographic}: </span><span>{`${values[currentSectionHover]&&values[currentSectionHover].values[DataAttributes.demographic]}`}</span>
      </div>
      <main className={styles.main}>
        {imageLinks.map(link => <Image src={link[0]} className={styles.imageContainer} key={Number(link[1])} setHoverIndex={setCurrentSectionHover} index={Number(link[1])}/>)}
      </main>
    </>
  )
}
