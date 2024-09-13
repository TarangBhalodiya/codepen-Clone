import { useState, useEffect } from 'react';
import './App.css';
import Editor from './component/Editor';
import useLocalStorage from './hooks/useLocalStorage';
function App() {

  const [html, sethtml] = useLocalStorage('html','')
  const [css, setcss] = useLocalStorage('css','')
  const [js, setjs] = useLocalStorage('js','')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(()=>{
    var timeout = setTimeout(()=>{
      setSrcDoc(`
  <html>
  <body>${html}</body>
  <style>${css}</style>
  <script>${js}</script>
  </html>
  `)
    },250)

    return ()=> clearTimeout(timeout)
  },[html,css,js])

  return (
    <>
      <div className='pane top'>
        <Editor 
        language= "xml"
        displayName= "HTML"
        value = {html} 
        onChange = {sethtml}
        />
        <Editor
        language= "css"
        displayName= "CSS"
        value = {css} 
        onChange = {setcss}
        />
        <Editor
        language= "javascript"
        displayName= "Javascript"
        value = {js} 
        onChange = {setjs}
        />
      </div>
      <div className='pane bottom'>
      <iframe
      srcDoc = {srcDoc}
      title = "output"
      sandbox = "allow-scripts"
      frameBorder= "0"
      width = "100%"
      height = "100%"
      />
      </div>
    </>
  );
}

export default App;
