import React from 'react'
import { useState } from 'react';
import styles from "./ThemeSwitcher.module.css";
import { MoonIcon,SunIcon,SwatchIcon,XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import useLocalStorage from './Hooks/useLocalStorage';

const ThemeSwitcher = () => {
    const [hue,setHue]=useLocalStorage('react-todo.color','240');
    const defaultDark=window.matchMedia('(prefers-color-scheme: dark').matches
    const[theme,setTheme]=useLocalStorage('react-todo.theme',defaultDark ? "dark" : "light");
    const[isColorPicking,setIsColorPicking]=useState(false);
    

    useEffect(()=>{
    document.documentElement.setAttribute('color-scheme',theme)
    
    },[theme])


    useEffect(()=>{
      document.documentElement.style.setProperty('--_hue',hue)
        
      },[hue])
        
    
  return (
    <div>
      <aside 
      className={styles.wrapper}
      style={{
        backgroundColor:isColorPicking ? 'hsl(var(--muted) / .6)' : 'transparent'
      }}
      >
       {
        isColorPicking ? (
            <>
              <button 
              className={`btn ${styles.close}`}
              aria-label="close color picking mode"
              onClick={()=>setIsColorPicking(false)}
              >
                <XMarkIcon />
              </button>
              <input
                className={styles.picker}
                type="range" 
                min="0"
                max="360"
                aria-label="change color theme slidere"
                value={hue}
                onInput={(e)=>setHue(e.target.value)}
                />
            </>
        )
        :(
            <div className={styles.btns}>
                <button
                  className='btn'
                  aria-label={`change theme to ${theme=="light"?"dark":"light"}mode`}
                  role="switch"
                 onClick={()=>setTheme(theme=="light"?"dark":"light")}
                >
                    {theme=="dark"?<SunIcon /> : <MoonIcon />}
                </button>
                <button className='btn'
                role="enable color picking"
                onClick={()=>setIsColorPicking(true)}
                >
                    <SwatchIcon />
                </button>
            </div>
        )
       }
      </aside>
    </div>
  )
}

export default ThemeSwitcher
